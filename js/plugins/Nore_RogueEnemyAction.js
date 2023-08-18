var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Nore;
(function (Nore) {
    Game_BattlerBase.prototype.isConfused = function () {
        return this.isAppeared() && this.hasStateMeta('confuse');
    };
    Game_BattlerBase.prototype.hasStateMeta = function (meta) {
        for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
            var state = _a[_i];
            if (state.meta[meta]) {
                return true;
            }
        }
        return false;
    };
    var EnemyActionRogueState = /** @class */ (function (_super) {
        __extends(EnemyActionRogueState, _super);
        function EnemyActionRogueState(_turn) {
            var _this = _super.call(this) || this;
            _this._turn = _turn;
            return _this;
        }
        EnemyActionRogueState.prototype.start = function () {
            this.nextAction();
        };
        EnemyActionRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        EnemyActionRogueState.prototype.nextAction = function () {
            if (this.isAllEnemyErased()) {
                Nore.phaseManager.setPhase(Nore.MOVE_WAIT);
                return;
            }
            if (this._currentEvent) {
                this._currentEvent.onTurnEnd();
                this._currentEvent = null;
            }
            var event = Nore.rogueManager.nextEnemy();
            if (!event) {
                Nore.phaseManager.setPhase(Nore.MOVE_WAIT);
                return;
            }
            if (!this.isValid(event)) {
                this.nextAction();
                return;
            }
            event.updateMoveType();
            this._currentEvent = event;
            event.onTurnStart();
            if (!event.canMove() || event.isWakeUp() || event.isWait()) {
                this.nextAction();
                return;
            }
            if (event.enemy().isConfused()) {
                this.confuseMove(event);
                return;
            }
            var currentAction = event.enemy().currentAction();
            if (currentAction && currentAction.waitCount() > 0) {
                this.updateWaitCount(event, currentAction);
                return;
            }
            if (currentAction && currentAction.coolTime() > 0) {
                currentAction.minusCoolTime();
                if (currentAction.coolTime() > 0) {
                    this.nextAction();
                    return;
                }
            }
            var action = this.choiseAction(event);
            if (action && action.isValid()) {
                if (action.item().id == 1 || action.waitCount() > 0 || action.item().meta['ero']) {
                    this.attackAction(event, action);
                }
                else {
                    p(action);
                    if (action._enemyAction.direction() > 0) {
                        event.setDirection(action._enemyAction.direction());
                    }
                    this.doEnemySkill(event, action);
                }
            }
            else {
                this.moveEnemy(event);
            }
        };
        EnemyActionRogueState.prototype.attackAction = function (event, action) {
            if (!action.direction()) {
                action.setDirection(event.calcDir($gamePlayer.x, $gamePlayer.y));
            }
            if (action.waitCount() > 0) {
                event.setDirection(event.calcDir($gamePlayer.x, $gamePlayer.y));
                AudioManager.playSe({ name: 'Up4', volume: 80, pitch: 100, pan: 0 });
                Nore.$gameMessageRogue.add('%1 began preparing %2!'.format(event.enemy().name(), action.item().name));
                action.enemyAction().calcPointList(event);
                this.spriteset().showEnemyForecastAll();
                Nore.phaseManager.pushPhase(WaitRogueState, 30);
            }
            else {
                var actionList = this.attackToPlayer(event, action);
                if (actionList) {
                    $gameTemp.isFastMove = false;
                    Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
                }
                else {
                    this.moveEnemy(event);
                }
            }
        };
        EnemyActionRogueState.prototype.isAllEnemyErased = function () {
            return $gameSwitches.value(15);
        };
        EnemyActionRogueState.prototype.updateWaitCount = function (event, currentAction) {
            currentAction.minusWaitCount();
            if (currentAction.waitCount() == 0) {
                this.doEnemySkill(event, currentAction);
                return;
            }
            var dir = currentAction.enemyAction().direction();
            if (dir) {
                event.setDirection(dir);
            }
            this.nextAction();
        };
        EnemyActionRogueState.prototype.doEnemySkill = function (event, currentAction) {
            var actionList = [];
            event.enemy().useItem(currentAction.item());
            if (currentAction.item().meta['arrow']) {
                var actionWithDir = new ActionWithDirection(currentAction, event.direction());
                actionWithDir.calcPointList(event);
                var pointList = actionWithDir.pointList();
                var chara = this.findNearestEvent(event, pointList);
                var id = 3;
                var img = parseInt(currentAction.item().meta['image']);
                if (!isNaN(img)) {
                    id = img;
                }
                if (chara) {
                    var distance = chara.calcDistance(event.x, event.y);
                    actionList.push(new Nore.ThrowAction(event, new RogueItem($dataItems[id]), distance));
                    actionList.push(this.createDamageActionOne(currentAction, chara));
                }
                else {
                    var range = this.calcRangeByPointList(event, pointList);
                    actionList.push(new Nore.ThrowAction(event, new RogueItem($dataItems[id]), range));
                }
                Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
            }
            else if (currentAction.item().meta['direction']) {
                var push = parseInt(currentAction.item().meta['push']);
                var animePos = new PIXI.Point($gamePlayer.x, $gamePlayer.y); //calcPosByDirection(event.x, event.y, event.direction());
                actionList.push(new Nore.AnimationAction(animePos.x, animePos.y, currentAction.item().animationId, 12));
                var damageAction = this.createDamageAction(currentAction, event);
                if (push > 0 && damageAction.length > 0) {
                    actionList.push(new Nore.PlayerMoveAction(push, event.direction()));
                }
                actionList = actionList.concat(damageAction);
                Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
            }
            else {
                console.error('error');
                p(currentAction.item());
                this.nextAction();
            }
        };
        EnemyActionRogueState.prototype.onAnimation = function () {
            var enemy = this._currentEvent.enemy();
            var enemyAction = enemy.currentAction().enemyAction();
            if (enemyAction.isPlayerContains()) {
                var action = enemy.currentAction();
                action.prepare();
                //action.setTarget(-1);
                var self_1 = this;
                Nore.phaseManager.pushPhase(Nore.AnimationRogueState, action, [$gamePlayer], function () {
                    enemy.clearActions();
                    self_1.nextAction();
                });
            }
            else {
                enemy.clearActions();
                this.nextAction();
            }
        };
        EnemyActionRogueState.prototype.confuseMove = function (event) {
            var list = this.makeRandomDirectionList();
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var d = list_1[_i];
                var success = event.moveConfuse(d);
                if (success) {
                    this.nextAction();
                    return;
                }
                else {
                    var pos = Nore.calcPosByDirection(event.x, event.y, d);
                    var targetSprite = Nore.EventArranger.spriteAt(pos.x, pos.y);
                    if (targetSprite) {
                        var actionList;
                        if (targetSprite.character() == $gamePlayer) {
                            actionList = this.attackToPlayer(event, null);
                        }
                        else {
                            actionList = this.attackToEnemy(event, targetSprite);
                        }
                        Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
                        return;
                    }
                }
            }
            this.nextAction();
        };
        EnemyActionRogueState.prototype.attackToPlayer = function (event, action) {
            var px = $gamePlayer.x;
            var py = $gamePlayer.y;
            if (Math.abs(px - event.x) > 1 || Math.abs(py - event.y) > 1) {
                return null;
            }
            var animeId = 128;
            event.setDirection(event.calcDir($gamePlayer.x, $gamePlayer.y));
            if (!action) {
                action = new Game_Action(event.enemy(), false);
                action.setSkill(1);
            }
            var actionList = [];
            actionList.push(new Nore.AnimationAction(px, py, animeId, 20));
            action.setDirection(event.direction());
            action.setSubject(event.enemy());
            actionList.push(this.createDamageActionOne(action, $gamePlayer));
            event.attackAnime();
            return actionList;
        };
        EnemyActionRogueState.prototype.attackToEnemy = function (event, target) {
            var targetEvent = target.character();
            var px = targetEvent.x;
            var py = targetEvent.y;
            if (Math.abs(px - event.x) > 1 || Math.abs(py - event.y) > 1) {
                return null;
            }
            var animeId = 128;
            event.setDirection(event.calcDir(targetEvent.x, targetEvent.y));
            var action = new Game_Action(event.enemy(), false);
            action.setSkill(1);
            var actionList = [];
            actionList.push(new Nore.AnimationAction(px, py, animeId, 20));
            action.setDirection(event.direction());
            action.setSubject(event.enemy());
            actionList.push(this.createDamageActionOne(action, targetEvent));
            event.attackAnime();
            return actionList;
        };
        EnemyActionRogueState.prototype.attackToCharacter = function (event) {
        };
        EnemyActionRogueState.prototype.isValid = function (event) {
            if (!Nore.EventArranger.isAlive(event)) {
                return false;
            }
            var enemy = event.enemy();
            switch (this._turn) {
                case 1:
                    return this.isSpeedUp(enemy) || !this.isSpeedDown(enemy);
                case 2:
                case 4:
                    return this.isSpeedUp(enemy) && !this.isSpeedDown(enemy);
                case 3:
                    return true;
            }
        };
        EnemyActionRogueState.prototype.isSpeedUp = function (enemy) {
            if (enemy.hasState(25)) {
                return true;
            }
            if (enemy.enemy().meta['２倍速']) {
                return true;
            }
            return false;
        };
        EnemyActionRogueState.prototype.isSpeedDown = function (enemy) {
            if (enemy.hasState(26)) {
                return true;
            }
            if (enemy.enemy().meta['鈍足']) {
                return true;
            }
            return false;
        };
        EnemyActionRogueState.prototype.choiseAction = function (event) {
            if (event.isSleep()) {
                return null;
            }
            var enemy = event.enemy();
            if (enemy.enemy().meta['攻撃は１回']) {
                if (!enemy.hasState(26)) {
                    if (this._turn == 1 || this._turn == 3) {
                        return null;
                    }
                }
            }
            enemy.makeActions(event);
            return enemy.currentAction();
        };
        EnemyActionRogueState.prototype.moveEnemy = function (event) {
            event.move();
            this.nextAction();
        };
        return EnemyActionRogueState;
    }(Nore.RogueState));
    Nore.EnemyActionRogueState = EnemyActionRogueState;
    var Sprite_SkillThrow = /** @class */ (function (_super) {
        __extends(Sprite_SkillThrow, _super);
        function Sprite_SkillThrow(_event) {
            var _this = _super.call(this) || this;
            _this._event = _event;
            _this._frameIndex = 0;
            _this._distance = 0;
            _this._action = _event.enemy().currentAction();
            _this._direction = _this._action.enemyAction().direction();
            _this._range = parseInt(_this._action.item().meta['range']);
            if (isNaN(_this._range)) {
                _this._range = 99;
            }
            _this._x = _event.x;
            _this._y = _event.y;
            _this.x = $gameMap.adjustX(_this._x) * $gameMap.tileWidth();
            _this.y = $gameMap.adjustY(_this._y) * $gameMap.tileHeight();
            return _this;
        }
        Sprite_SkillThrow.prototype.start = function () {
            this.initBitmap();
        };
        Sprite_SkillThrow.prototype.initBitmap = function () {
            this.bitmap = new Bitmap(32, 32);
            var iconIndex = 2;
            var bitmap = ImageManager.loadSystem("IconSet");
            var pw = ImageManager.iconWidth;
            var ph = ImageManager.iconHeight;
            var sx = (iconIndex % 16) * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
        };
        Sprite_SkillThrow.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.finished()) {
                return;
            }
            this.move();
            if (this._frameIndex == 48) {
                this._frameIndex = 0;
                /*switch (this._direction) {
                    case 1: this._x--; this._y++; break;
                    case 2: this._y++; break;
                    case 3: this._x++; this._y++; break;
                    case 4: this._x--; break;
                    case 6: this._x++; break;
                    case 7: this._x--; this._y--; break;
                    case 8: this._y--; break;
                    case 9: this._x++; this._y--; break;
                }*/
                this._x = Math.round(this._x);
                this._y = Math.round(this._y);
                this._distance++;
                this.checkNext();
            }
            this.x = $gameMap.adjustX(this._x) * $gameMap.tileWidth();
            this.y = $gameMap.adjustY(this._y) * $gameMap.tileHeight();
        };
        Sprite_SkillThrow.prototype.speed = function () {
            return 16;
        };
        Sprite_SkillThrow.prototype.move = function () {
            var speed = this.speed();
            this._frameIndex += speed;
            var d = speed / 48;
            switch (this._direction) {
                case 1:
                    this._x -= d;
                    this._y += d;
                    break;
                case 2:
                    this._y += d;
                    break;
                case 3:
                    this._x += d;
                    this._y += d;
                    break;
                case 4:
                    this._x -= d;
                    break;
                case 6:
                    this._x += d;
                    break;
                case 7:
                    this._x -= d;
                    this._y -= d;
                    break;
                case 8:
                    this._y -= d;
                    break;
                case 9:
                    this._x += d;
                    this._y -= d;
                    break;
            }
        };
        Sprite_SkillThrow.prototype.reverseDir = function (d) {
            return 10 - d;
        };
        ;
        Sprite_SkillThrow.prototype.checkNext = function () {
            var nextX = this._x;
            var nextY = this._y;
            if (this._distance == this._range) {
                this.onRange();
                return;
            }
            if (Nore.EventArranger.isEnemy(this._x, this._y)) {
                this._finish = true;
                this.targetSpriteList = this.targetSpriteList || [];
                this.targetSpriteList.push(Nore.EventArranger.enemySpriteAt(this._x, this._y));
                this.onHitEnemy();
            }
            else if ($gamePlayer.x == this._x && $gamePlayer.y == this._y) {
                this._finish = true;
                this.targetSpriteList = this.targetSpriteList || [];
                this.targetSpriteList.push(Nore.EventArranger.findPlayerSprite());
                this.onHitPlayer();
            }
            switch (this._direction) {
                case 1:
                    nextX--;
                    nextY++;
                    break;
                case 2:
                    nextY++;
                    break;
                case 3:
                    nextX++;
                    nextY++;
                    break;
                case 4:
                    nextX--;
                    break;
                case 6:
                    nextX++;
                    break;
                case 7:
                    nextX--;
                    nextY--;
                    break;
                case 8:
                    nextY--;
                    break;
                case 9:
                    nextX++;
                    nextY--;
                    break;
            }
            if (!$gameMap.isPassable(this._x, this._y, this._direction) ||
                !$gameMap.isPassable(nextX, nextY, this.reverseDir(this._direction))) {
                this.onHitWall();
            }
        };
        Sprite_SkillThrow.prototype.onHitEnemy = function () {
            this._finish = true;
            Nore.EventArranger.spriteset().removeChild(this);
        };
        Sprite_SkillThrow.prototype.onHitPlayer = function () {
            this._finish = true;
            Nore.EventArranger.spriteset().removeChild(this);
        };
        Sprite_SkillThrow.prototype.onHitWall = function () {
            this._finish = true;
            Nore.EventArranger.spriteset().removeChild(this);
        };
        Sprite_SkillThrow.prototype.onRange = function () {
            this._finish = true;
            Nore.EventArranger.spriteset().removeChild(this);
        };
        Sprite_SkillThrow.prototype.finished = function () {
            return this._finish;
        };
        Sprite_SkillThrow.prototype.direction = function () {
            return this._direction;
        };
        return Sprite_SkillThrow;
    }(Sprite));
    Nore.Sprite_SkillThrow = Sprite_SkillThrow;
    var WaitRogueState = /** @class */ (function (_super) {
        __extends(WaitRogueState, _super);
        function WaitRogueState(_waitCount) {
            var _this = _super.call(this) || this;
            _this._waitCount = _waitCount;
            return _this;
        }
        WaitRogueState.prototype.update = function () {
            if (this._waitCount > 0) {
                this._waitCount--;
            }
            if (this._waitCount == 0) {
                Nore.phaseManager.nextPhase();
            }
        };
        return WaitRogueState;
    }(Nore.RogueState));
    Nore.WaitRogueState = WaitRogueState;
    Scene_Base.prototype.checkGameover = function () {
    };
    Game_Action.prototype.waitCount = function () {
        if (this._waitCount === undefined) {
            if (!this.item()) {
                return 0;
            }
            if (this.item().meta['wait']) {
                this._waitCount = parseInt(this.item().meta['wait']);
            }
            else {
                this._waitCount = 0;
            }
        }
        return this._waitCount;
    };
    Game_Action.prototype.minusWaitCount = function () {
        this._waitCount--;
    };
    Game_Action.prototype.coolTime = function () {
        if (this._coolTime === undefined) {
            if (!this.item()) {
                return 0;
            }
            if (this.item().meta['coolTime']) {
                this._coolTime = parseInt(this.item().meta['coolTime']);
            }
            else {
                this._coolTime = 0;
            }
        }
        return this._coolTime;
    };
    Game_Action.prototype.minusCoolTime = function () {
        this._coolTime--;
    };
    Game_Action.prototype.direction = function () {
        return this._direction;
    };
    Game_Action.prototype.setDirection = function (d) {
        this._direction = d;
    };
    Game_Action.prototype.nockback = function () {
        return this.item().meta['nockback'];
    };
    Game_Action.prototype.push = function () {
        if (this.item().meta['push']) {
            return parseInt(this.item().meta['push']);
        }
        else {
            return 0;
        }
    };
})(Nore || (Nore = {}));
