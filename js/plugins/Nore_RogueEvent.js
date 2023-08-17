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
/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
    var PhaseManager = /** @class */ (function () {
        function PhaseManager() {
            this._turnList = [
                new Nore.PlayerInputRogueState(1),
                new Nore.EnemyActionRogueState(1),
                new Nore.PlayerInputRogueState(2),
                new Nore.EnemyActionRogueState(2),
                new Nore.PlayerInputRogueState(3),
                new Nore.EnemyActionRogueState(3),
                new Nore.PlayerInputRogueState(4),
                new Nore.EnemyActionRogueState(4),
            ];
            this._turnIndex = -1;
        }
        PhaseManager.prototype.start = function () {
            this.nextPhase();
        };
        PhaseManager.prototype.restorePhase = function () {
            var phase = this._turnList[this._turnIndex];
            this.setPhaseInstance(phase);
        };
        PhaseManager.prototype.nextPhase = function () {
            if (this._lastPhase) {
                this.popPhase();
                return;
            }
            this._turnIndex++;
            //p('nextPhase:' + this._turnIndex);
            if (this._turnIndex >= this._turnList.length) {
                this._turnIndex = 0;
            }
            var phase = this._turnList[this._turnIndex];
            this.setPhaseInstance(phase);
        };
        PhaseManager.prototype.setPhase = function (phaseClass, arg1, arg2, arg3, arg4) {
            var phase = new phaseClass(arg1, arg2, arg3, arg4);
            this.setPhaseInstance(phase);
        };
        PhaseManager.prototype.pushPhase = function (phaseClass, arg1, arg2, arg3, arg4) {
            this._lastPhase = this._phase;
            var phase = new phaseClass(arg1, arg2, arg3, arg4);
            this.setPhaseInstance(phase);
        };
        PhaseManager.prototype.popPhase = function () {
            this._phase = this._lastPhase;
            this._lastPhase = null;
            this._phase.start();
        };
        PhaseManager.prototype.setPhaseInstance = function (phase, noStart) {
            if (noStart === void 0) { noStart = false; }
            this._phase = phase;
            //p( this._phase)
            if (!noStart) {
                this._phase.start();
                this._phase.update();
            }
        };
        PhaseManager.prototype.phase = function () {
            return this._phase;
        };
        PhaseManager.prototype.isPhase = function (phaseClass) {
            return this._phase instanceof phaseClass;
        };
        PhaseManager.prototype.checkStart = function () {
            if (this._turnIndex === -1) {
                this.start();
            }
        };
        return PhaseManager;
    }());
    var RogueManager = /** @class */ (function () {
        function RogueManager() {
            this._enemyStack = [];
        }
        RogueManager.prototype.setupEnemy = function () {
            this._enemyStack = [];
            for (var _i = 0, _a = $gameMap._events; _i < _a.length; _i++) {
                var e_1 = _a[_i];
                if (e_1 && e_1 instanceof Game_EnemyEvent) {
                    if (Nore.EventArranger.isAlive(e_1) && e_1.enemy()) {
                        e_1.setup();
                        this._enemyStack.push(e_1);
                    }
                }
            }
            //p(this._enemyStack)
        };
        RogueManager.prototype.insertEventStack = function (index, event) {
            if (this._enemyStack.length <= index) {
                this._enemyStack.push(event);
            }
            else {
                this._enemyStack.slice(index, 0, event);
            }
        };
        RogueManager.prototype.nextEnemy = function () {
            return this._enemyStack.pop();
        };
        RogueManager.prototype.spriteset = function () {
            return SceneManager._scene._spriteset;
        };
        RogueManager.prototype.update = function () {
            if ($gameMap.isEventRunning()) {
                $gameTemp.isFastMove = false;
                return;
            }
            if (Nore.phaseManager.phase()) {
                Nore.phaseManager.phase().update();
            }
        };
        RogueManager.prototype.useSkill = function (skill) {
            p('useSkill');
            Nore.phaseManager.phase().useSkill(skill);
        };
        RogueManager.prototype.useItem = function (item) {
            p('useItem');
            Nore.phaseManager.phase().useItem(item);
        };
        RogueManager.prototype.move = function (direction) {
            Nore.phaseManager.phase().move(direction);
        };
        RogueManager.prototype.attack = function (direction) {
            Nore.phaseManager.phase().attack(direction);
        };
        RogueManager.prototype.onTurn = function () {
            $gameVariables.setValue(21, $gameVariables.value(21) + 1);
            /*if (this.isRespawn($gameVariables.value(21))) {
                this.respawn();
            }*/
        };
        RogueManager.prototype.isRespawn = function (step) {
            if (step < 500) {
                switch (step) {
                    case 120:
                    case 200:
                    case 280:
                    case 360:
                    case 430:
                        return true;
                }
                return false;
            }
            return ((step - 500) % 60) == 0;
        };
        RogueManager.prototype.respawn = function () {
            var pos = $gameMap.respawnPos();
            if (pos) {
                $gameMap.respawnEnemy(pos, $gameVariables.value(21) + 1000);
            }
        };
        RogueManager.prototype.clear = function () {
            this._enemyStack = [];
        };
        return RogueManager;
    }());
    Nore.RogueManager = RogueManager;
    var _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_createGameObjects.call(this);
        Nore.$gameMessageRogue = new Game_MessageRogue();
    };
    var EnemySkillRogueState = /** @class */ (function (_super) {
        __extends(EnemySkillRogueState, _super);
        function EnemySkillRogueState(event) {
            var _this = _super.call(this) || this;
            _this._waitCount = 0;
            _this._event = event;
            return _this;
        }
        EnemySkillRogueState.prototype.start = function () {
            var result = this._event.attack();
            if (result) {
                this.showAnimation(result);
            }
        };
        EnemySkillRogueState.prototype.showAnimation = function (result) {
            var sprite = new Sprite_Animation();
            sprite.targetObjects = [this.findPlayerSprite()];
            var animation = $dataAnimations[result.animeId];
            sprite.setup(sprite.targetObjects, animation, false, 0, null);
            this.spriteset()._effectsContainer.addChild(sprite);
            this.spriteset()._animationSprites.push(sprite);
        };
        EnemySkillRogueState.prototype.update = function () {
            if (this.spriteset().isAnimationPlaying()) {
                this._waitCount++;
                if (this._waitCount == 12) {
                    this.damageToPlayer();
                }
                return;
            }
            Nore.phaseManager.setPhase(Nore.ACTION_ENEMY);
        };
        EnemySkillRogueState.prototype.showDamageAnime = function () {
            var animation = $dataAnimations[122];
            var sprite = new Sprite_Animation();
            sprite.targetObjects = [this.findPlayerSprite()];
            sprite.setup(sprite.targetObjects, animation, false, 0, null);
            this.spriteset()._effectsContainer.addChild(sprite);
            this.spriteset()._animationSprites.push(sprite);
        };
        EnemySkillRogueState.prototype.damageToPlayer = function () {
            var subject = this._event.enemy();
            var target = $gameActors.actor(1);
            target.clearResult();
            var action = new Game_Action(target, false);
            action.setAttack();
            action.prepare();
            action.apply(target);
            subject.useItem(action.item());
            subject.performAction(action);
            this.findPlayerSprite().showDamage($gameActors.actor(1));
            if (target.result().isHit()) {
                Nore.$gameMessageRogue.add(Nore.makeHpDamageText(target, action));
                Nore.displayStateText(target);
                this.showDamageAnime();
                if ($gameActors.actor(1).isDead()) {
                    $gameTemp.reserveCommonEvent(16);
                }
            }
            else {
                Nore.$gameMessageRogue.add(Nore.makeMissText(target, action));
                target.performEvasion();
            }
        };
        return EnemySkillRogueState;
    }(Nore.RogueState));
    Game_Action.prototype.isNoEffect = function () {
        var item = this.item();
        return item.meta['noEffect'];
    };
    var MoveEnemyRogueState = /** @class */ (function (_super) {
        __extends(MoveEnemyRogueState, _super);
        function MoveEnemyRogueState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoveEnemyRogueState.prototype.update = function () {
        };
        return MoveEnemyRogueState;
    }(Nore.RogueState));
    var MoveEnemyRogueState2 = /** @class */ (function (_super) {
        __extends(MoveEnemyRogueState2, _super);
        function MoveEnemyRogueState2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoveEnemyRogueState2.prototype.update = function () {
        };
        return MoveEnemyRogueState2;
    }(Nore.RogueState));
    var MoveWaitRogueState2 = /** @class */ (function (_super) {
        __extends(MoveWaitRogueState2, _super);
        function MoveWaitRogueState2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoveWaitRogueState2.prototype.update = function () {
            if ($gamePlayer.isMoving()) {
                return;
            }
            if ($gameMap.isMoving()) {
                //return;
            }
            Nore.phaseManager.setPhase(ATTACK_ENEMY);
        };
        return MoveWaitRogueState2;
    }(Nore.RogueState));
    var AttackEnemyRogueState = /** @class */ (function (_super) {
        __extends(AttackEnemyRogueState, _super);
        function AttackEnemyRogueState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AttackEnemyRogueState.prototype.update = function () {
            var next = $gameMap.nextMovableEvent();
            if (!next) {
                Nore.phaseManager.setPhase(INPUT_PLAYER);
            }
            else {
                next.setDoneFlag(true);
                var result = next.attack();
                if (result) {
                    this.showAnimation(result);
                    Nore.phaseManager.setPhase(ATTACK_ENEMY_WAIT, next);
                }
                else {
                    this.update();
                }
            }
        };
        AttackEnemyRogueState.prototype.showAnimation = function (result) {
            var sprite = new Sprite_Animation();
            sprite.targetObjects = [this.findPlayerSprite()];
            var animation = $dataAnimations[result.animeId];
            sprite.setup(sprite.targetObjects, animation, false, 0, null);
            this.spriteset()._effectsContainer.addChild(sprite);
            this.spriteset()._animationSprites.push(sprite);
        };
        return AttackEnemyRogueState;
    }(Nore.RogueState));
    Game_Action.prototype.setSubject = function (subject) {
        if (subject.isActor()) {
            this._subjectActorId = subject.actorId();
            this._subjectEnemyIndex = -1;
        }
        else {
            this._subjectEnemyIndex = subject.eventId;
            this._subjectActorId = 0;
        }
    };
    Game_Action.prototype.subject = function () {
        if (this._subjectActorId) {
            return $gameActors.actor(this._subjectActorId);
        }
        if (this._subjectEnemyIndex) {
            for (var _i = 0, _a = $gameMap._events; _i < _a.length; _i++) {
                var e_2 = _a[_i];
                if (e_2) {
                    if (this._subjectEnemyIndex == e_2.eventId()) {
                        return e_2.enemy();
                    }
                }
            }
        }
        return null;
    };
    var INPUT_PLAYER = Nore.PlayerInputRogueState;
    Nore.ACTION_ENEMY = Nore.EnemyActionRogueState;
    //const ATTACK_PLAYER = AttackPlayerRogueState;
    var ENEMY_SKILL = EnemySkillRogueState;
    var MOVE_ENEMY = MoveEnemyRogueState;
    var MOVE_ENEMY2 = MoveEnemyRogueState2;
    Nore.MOVE_WAIT = Nore.MoveWaitRogueState;
    var MOVE_WAIT2 = MoveWaitRogueState2;
    var ATTACK_ENEMY = AttackEnemyRogueState;
    var _Scene_Map_prototypes_tart = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _Scene_Map_prototypes_tart.call(this);
        if ($gameMap.isRogue()) {
            // ラスボス
            if ($gameVariables.value(1) == 7 && !$gameSwitches.value(996)) {
                $gamePlayer.followers().show();
                $gamePlayer.followers().refresh();
            }
            else {
                $gamePlayer.hideFollowers();
            }
        }
        else {
        }
        $gamePlayer.refresh();
        if (!Nore.rogueManager) {
            Nore.rogueManager = new RogueManager();
            Nore.phaseManager = new PhaseManager();
            if (!$gameMap.beforeMove) {
                if ($gameMap.isRogue()) {
                    Nore.phaseManager.start();
                }
            }
        }
        else {
            if (this._spriteset) {
                this._spriteset.showEnemyForecastAll();
            }
            if (!$gameMap.isRogue()) {
                this.updateEquip();
            }
        }
    };
    Scene_Map.prototype.updateEquip = function () {
        switch ($gameTemp.command) {
            case Nore.ItemCommand.equip:
                new Nore.PlayerEquipRogueState().start();
                if ($gamePlayer.isEquipTuto()) {
                    if ($gameActors.mainActor().isEquipTuto()) {
                        $gameVariables.setValue(10, 0);
                        $gameSwitches.setValue(220, true);
                    }
                }
                break;
            case Nore.ItemCommand.discardWeapon:
                new Nore.PlayerDiscardEquipRogueState(0).start();
                break;
            case Nore.ItemCommand.discardArmor:
                var item = $gameTemp.targetItem;
                new Nore.PlayerDiscardEquipRogueState(item.realItem().etypeId).start();
                break;
        }
    };
    var _Scene_Map_prototype_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_prototype_update.call(this);
        if (!$gameMap.isRogue()) {
            return;
        }
        if (Nore.rogueManager) {
            Nore.rogueManager.update();
        }
    };
    var _Game_Unit_prototype_inBattle = Game_Unit.prototype.inBattle;
    Game_Unit.prototype.inBattle = function () {
        if ($gameSwitches.value(2)) {
            return _Game_Unit_prototype_inBattle.call(this);
        }
        return $gameMap.isRogue();
    };
    var Game_Player2 = /** @class */ (function (_super) {
        __extends(Game_Player2, _super);
        function Game_Player2() {
            var _this = _super.call(this) || this;
            _this._player2 = true;
            return _this;
        }
        Game_Player2.prototype.screenX = function () {
            if ($gamePlayer.direction() == 4) {
                return $gamePlayer.screenX() - $gameMap.tileWidth();
            }
            if ($gamePlayer.direction() == 6) {
                return $gamePlayer.screenX() + $gameMap.tileWidth();
            }
            return $gamePlayer.screenX();
        };
        Game_Player2.prototype.screenY = function () {
            var offset = 30;
            if ($gamePlayer.direction() == 8) {
                return $gamePlayer.screenY() - $gameMap.tileHeight() - offset;
            }
            if ($gamePlayer.direction() == 2) {
                return $gamePlayer.screenY() + $gameMap.tileHeight() - offset;
            }
            return $gamePlayer.screenY() - offset;
        };
        return Game_Player2;
    }(Game_Player));
    Nore.Game_Player2 = Game_Player2;
    Spriteset_Map.prototype.findPlayerSprite = function () {
        for (var _i = 0, _a = this._characterSprites; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.checkCharacter($gamePlayer)) {
                return s;
            }
        }
        return null;
    };
    Game_Event.prototype.setDoneFlag = function (b) {
        this._done = b;
    };
    var _Game_Event_prototype_updateStop = Game_Event.prototype.updateStop;
    Game_Event.prototype.updateStop = function () {
        if (!$gameMap.isRogue() || !this.enemy()) {
            _Game_Event_prototype_updateStop.call(this);
            return;
        }
        if (Nore.phaseManager.isPhase(MOVE_ENEMY2)) {
            if (this.isDoubleSpeed()) {
                this._done = false;
                var lastX = this.x;
                var lastY = this.y;
                _Game_Event_prototype_updateStop.call(this);
                if (lastX != this.x || lastY != this.y) {
                    this.setDoneFlag(true);
                }
            }
        }
        else if (Nore.phaseManager.isPhase(MOVE_ENEMY)) {
            var lastX = this.x;
            var lastY = this.y;
            _Game_Event_prototype_updateStop.call(this);
            if (lastX != this.x || lastY != this.y) {
                this.setDoneFlag(true);
            }
        }
    };
    var _Game_Player_prototype_moveByInput = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function () {
        if (!$gameMap.isRogue()) {
            _Game_Player_prototype_moveByInput.call(this);
            return;
        }
        if (!Nore.phaseManager) {
            return;
        }
        if (!Nore.phaseManager.isPhase(INPUT_PLAYER)) {
            Nore.phaseManager.checkStart();
            return;
        }
        if (!SceneManager._scene || !SceneManager._scene.isWindowActive) {
            return;
        }
        if (SceneManager._scene.isWindowActive()) {
            return;
        }
        if (!this.isMoving() && this.canMove()) {
            var direction = this.getInputDirection();
            if (direction > 0) {
                $gameTemp.clearDestination();
            }
            else if ($gameTemp.isDestinationValid()) {
                var x = $gameTemp.destinationX();
                var y = $gameTemp.destinationY();
                direction = this.findDirectionTo(x, y);
            }
            if (direction > 0) {
                this.executeMove(direction);
            }
            else if (Input.isTriggered('ok')) {
                this.checkEventTriggerThere([0, 1, 2]);
                if ($gameMap.setupStartingEvent()) {
                    return true;
                }
                this.executeAttack(this.direction());
            }
        }
    };
    var _Sprite_Character_prototype_initMembers = Sprite_Character.prototype.initMembers;
    Sprite_Character.prototype.initMembers = function () {
        _Sprite_Character_prototype_initMembers.call(this);
    };
    var _Sprite_Character_prototype_setCharacter = Sprite_Character.prototype.setCharacter;
    Sprite_Character.prototype.setCharacter = function (character) {
        _Sprite_Character_prototype_setCharacter.call(this, character);
        if (character.enemy) {
            var enemy = character.enemy();
            if (enemy) {
                this.initSprites(enemy);
            }
        }
        if (character == $gamePlayer) {
            this.initSprites($gameActors.actor(1));
        }
    };
    var Sprite_Stun = /** @class */ (function (_super) {
        __extends(Sprite_Stun, _super);
        function Sprite_Stun() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_Stun.prototype.setup = function (battler) {
            this._battler = battler;
            this.bitmap = new Bitmap(100, 40);
            this.refresh();
        };
        Sprite_Stun.prototype.update = function () {
            _super.prototype.update.call(this);
            this.visible = false;
            if (this._battler && this._lastStun != this._battler.stun) {
                this.refresh();
            }
        };
        Sprite_Stun.prototype.refresh = function () {
            this.bitmap.clear();
            this._lastStun = this._battler.stun;
            if (this._battler.isDead()) {
                return;
            }
            this.bitmap.drawText('★' + this._battler.stun, 1, 12, 100, 40, 'left');
        };
        return Sprite_Stun;
    }(Sprite));
    Sprite_Character.prototype.initSprites = function (battler) {
        var sprite = new Nore.Sprite_GaugeMini();
        sprite.setup(battler, 'hp');
        sprite.show();
        this.addChild(sprite);
        var sprite2 = new Sprite_StateIcon(battler);
        if (this == $gamePlayer) {
            sprite.move(-24, -66);
            sprite2.move(-24, -76);
        }
        else {
            sprite.move(-24, -46);
            sprite2.move(-24, -56);
        }
        this.addChild(sprite2);
        if (battler.isActor()) {
            return;
        }
        var stunSprite = new Sprite_Stun();
        stunSprite.setup(battler);
        stunSprite.move(-24, -76);
        this.addChild(stunSprite);
    };
    Sprite_Character.prototype.showDamage = function (battler) {
        var sprite2 = new Sprite_Damage();
        //sprite2.x = this.x + this.damageOffsetX();
        sprite2.y = this.damageOffsetY();
        sprite2.setup(battler);
        this.addChild(sprite2);
        if (this.damageSprite) {
            this.damageSprite.destroy();
            this.removeChild(this.damageSprite);
        }
        this.damageSprite = sprite2;
    };
    Sprite_Character.prototype.damageOffsetX = function () {
        return 0;
    };
    Sprite_Character.prototype.damageOffsetY = function () {
        return -16;
    };
    var Sprite_StateIcon = /** @class */ (function (_super) {
        __extends(Sprite_StateIcon, _super);
        function Sprite_StateIcon(_battler) {
            var _this = _super.call(this) || this;
            _this._battler = _battler;
            _this.bitmap = new Bitmap(40, 30);
            _this.scale.x = 0.6;
            _this.scale.y = 0.6;
            return _this;
        }
        Sprite_StateIcon.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.isChanged()) {
                this.refresh();
            }
            this.visible = $gameSwitches.value(1);
        };
        Sprite_StateIcon.prototype.isChanged = function () {
            if (!this._lastIcons) {
                return true;
            }
            var icons = this._battler.allIcons();
            if (icons.length != this._lastIcons.length) {
                return true;
            }
            for (var i = 0; i < icons.length; i++) {
                if (icons[i] != this._lastIcons[i]) {
                    return true;
                }
            }
            return false;
        };
        Sprite_StateIcon.prototype.refresh = function () {
            this.bitmap.clear();
            if (this._battler.isDead()) {
                return;
            }
            var width = 144;
            var iconWidth = ImageManager.iconWidth;
            var icons = this._battler.allIcons().slice(0, Math.floor(width / iconWidth));
            this._lastIcons = icons;
            var iconX = 0;
            for (var _i = 0, icons_1 = icons; _i < icons_1.length; _i++) {
                var icon = icons_1[_i];
                this.drawIcon(icon, iconX, 0);
                iconX += iconWidth;
            }
        };
        Sprite_StateIcon.prototype.drawIcon = function (iconIndex, x, y) {
            var bitmap = ImageManager.loadSystem("IconSet");
            var pw = ImageManager.iconWidth;
            var ph = ImageManager.iconHeight;
            var sx = (iconIndex % 16) * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
        };
        return Sprite_StateIcon;
    }(Sprite_Clickable));
    Game_Battler.prototype.refresh = function () {
        Game_BattlerBase.prototype.refresh.call(this);
        if (Math.floor(this.hp) === 0) {
            this.addState(this.deathStateId());
        }
        else {
            this.removeState(this.deathStateId());
        }
    };
    Game_Battler.prototype.regenerateHp = function () {
        var minRecover = -this.maxSlipDamage();
        var value = Math.max(Math.floor(this.mhp * this.hrg), minRecover);
        if (value !== 0) {
            this.gainHp(value);
        }
    };
    Game_Battler.prototype.maxSlipDamage = function () {
        return this.hp;
    };
})(Nore || (Nore = {}));
var AtttackResult = /** @class */ (function () {
    function AtttackResult(_animeId) {
        this._animeId = _animeId;
    }
    Object.defineProperty(AtttackResult.prototype, "animeId", {
        get: function () {
            return this._animeId;
        },
        enumerable: true,
        configurable: true
    });
    return AtttackResult;
}());
