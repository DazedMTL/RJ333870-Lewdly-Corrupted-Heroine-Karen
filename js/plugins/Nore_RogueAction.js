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
    var Action = /** @class */ (function () {
        function Action() {
        }
        Action.prototype.update = function (manager) {
        };
        Action.prototype.start = function (manager) {
        };
        Action.prototype.terminate = function (manager) {
        };
        return Action;
    }());
    Nore.Action = Action;
    var AnimationAction = /** @class */ (function (_super) {
        __extends(AnimationAction, _super);
        function AnimationAction(_posX, _posY, _animationId, _frame) {
            var _this = _super.call(this) || this;
            _this._posX = _posX;
            _this._posY = _posY;
            _this._animationId = _animationId;
            _this._frame = _frame;
            return _this;
        }
        AnimationAction.prototype.start = function (manager) {
            manager.spriteset().showAttackAnimation(this._posX, this._posY, 0, this._animationId, this._frame, this.onAnimeFinish.bind(this));
        };
        AnimationAction.prototype.onAnimeFinish = function () {
            this._finished = true;
        };
        AnimationAction.prototype.update = function (manager) {
        };
        AnimationAction.prototype.isFinished = function () {
            return this._finished;
        };
        return AnimationAction;
    }(Action));
    Nore.AnimationAction = AnimationAction;
    var WaitAction = /** @class */ (function (_super) {
        __extends(WaitAction, _super);
        function WaitAction(_waitFrame) {
            var _this = _super.call(this) || this;
            _this._waitFrame = _waitFrame;
            return _this;
        }
        WaitAction.prototype.start = function (manager) {
        };
        WaitAction.prototype.update = function (manager) {
            this._waitFrame--;
        };
        WaitAction.prototype.isFinished = function () {
            return this._waitFrame <= 0;
        };
        return WaitAction;
    }(Action));
    Nore.WaitAction = WaitAction;
    var SeAction = /** @class */ (function (_super) {
        __extends(SeAction, _super);
        function SeAction(_se) {
            var _this = _super.call(this) || this;
            _this._se = _se;
            return _this;
        }
        SeAction.prototype.start = function (manager) {
            AudioManager.playSe(this._se);
        };
        SeAction.prototype.isFinished = function () {
            return true;
        };
        return SeAction;
    }(Action));
    Nore.SeAction = SeAction;
    var ThrowAction = /** @class */ (function (_super) {
        __extends(ThrowAction, _super);
        function ThrowAction(_subject, _item, _range) {
            var _this = _super.call(this) || this;
            _this._subject = _subject;
            _this._item = _item;
            return _this;
        }
        ThrowAction.prototype.start = function (manager) {
            AudioManager.playSe({ name: 'Wind7', volume: 100, pitch: 100, pan: 0 });
            var sprite = new Nore.Sprite_ItemThrow(this._item, this._subject);
            sprite.start();
            manager.spriteset().addChild(sprite);
            this._sprite = sprite;
        };
        ThrowAction.prototype.isFinished = function () {
            return this._sprite.finished();
        };
        ThrowAction.prototype.terminate = function (manager) {
            manager.spriteset().removeChild(this._sprite);
        };
        return ThrowAction;
    }(Action));
    Nore.ThrowAction = ThrowAction;
    var PlayerMoveAction = /** @class */ (function (_super) {
        __extends(PlayerMoveAction, _super);
        function PlayerMoveAction(_distance, _direction) {
            var _this = _super.call(this) || this;
            _this._distance = _distance;
            _this._direction = _direction;
            return _this;
        }
        PlayerMoveAction.prototype.start = function (manager) {
            $gamePlayer.setTransparent(true);
            var sprite = new Nore.Sprite_PlayerThrough(this._distance, this._direction);
            manager.spriteset().addChild(sprite);
            this._sprite = sprite;
        };
        PlayerMoveAction.prototype.update = function (manager) {
        };
        PlayerMoveAction.prototype.isFinished = function () {
            return this._sprite.finished();
        };
        PlayerMoveAction.prototype.terminate = function (manager) {
            $gamePlayer.setPosition(this._sprite._x, this._sprite._y);
            $gamePlayer.setTransparent(false);
            manager.spriteset().removeChild(this._sprite);
            manager.unshiftAction(new PlayerJumpAction());
        };
        return PlayerMoveAction;
    }(Action));
    Nore.PlayerMoveAction = PlayerMoveAction;
    var CharacterKnockbackAction = /** @class */ (function (_super) {
        __extends(CharacterKnockbackAction, _super);
        function CharacterKnockbackAction(_character, _distance, _direction) {
            var _this = _super.call(this) || this;
            _this._character = _character;
            _this._distance = _distance;
            _this._direction = _direction;
            _this.calcHitTargetPos();
            return _this;
        }
        CharacterKnockbackAction.prototype.calcHitTargetPos = function () {
            var xx = this._character.x;
            var yy = this._character.y;
            for (var i = 0; i < this._distance; i++) {
                if (!this._character.canPass(xx, yy, this._direction)) {
                    var point2 = Nore.calcPosByDirection(xx, yy, this._direction);
                    xx = point2.x;
                    yy = point2.y;
                    this._hitTargetPos = new PIXI.Point(xx, yy);
                    break;
                }
                var point = Nore.calcPosByDirection(xx, yy, this._direction);
                xx = point.x;
                yy = point.y;
            }
        };
        CharacterKnockbackAction.prototype.hitTargetPos = function () {
            return this._hitTargetPos;
        };
        CharacterKnockbackAction.prototype.start = function (manager) {
            this._lastSpeed = this._character.moveSpeed();
            this._character.setMoveSpeed(5);
            for (var i = 0; i < this._distance; i++) {
                var point = Nore.calcPosByDirection(this._character.x, this._character.y, this._direction);
                if (!this._character.canPass(this._character.x, this._character.y, this._direction)) {
                    break;
                }
                this._character._x = point.x;
                this._character._y = point.y;
            }
        };
        CharacterKnockbackAction.prototype.update = function (manager) {
            if (!$gameMap.isMoving()) {
                this._finished = true;
            }
        };
        CharacterKnockbackAction.prototype.isFinished = function () {
            return this._finished;
        };
        CharacterKnockbackAction.prototype.terminate = function (manager) {
            this._character.setMoveSpeed(this._lastSpeed);
        };
        return CharacterKnockbackAction;
    }(Action));
    Nore.CharacterKnockbackAction = CharacterKnockbackAction;
    var CharacterMoveAction = /** @class */ (function (_super) {
        __extends(CharacterMoveAction, _super);
        function CharacterMoveAction(_character, _x, _y) {
            var _this = _super.call(this) || this;
            _this._character = _character;
            _this._x = _x;
            _this._y = _y;
            return _this;
        }
        CharacterMoveAction.prototype.start = function (manager) {
            this._lastSpeed = this._character.moveSpeed();
            this._character.setMoveSpeed(5);
            this._character._x = this._x;
            this._character._y = this._y;
        };
        CharacterMoveAction.prototype.update = function (manager) {
            if (!$gameMap.isMoving()) {
                this._finished = true;
            }
        };
        CharacterMoveAction.prototype.isFinished = function () {
            return this._finished;
        };
        CharacterMoveAction.prototype.terminate = function (manager) {
            this._character.setMoveSpeed(this._lastSpeed);
        };
        return CharacterMoveAction;
    }(Action));
    Nore.CharacterMoveAction = CharacterMoveAction;
    var PlayerJumpAction = /** @class */ (function (_super) {
        __extends(PlayerJumpAction, _super);
        function PlayerJumpAction() {
            return _super.call(this) || this;
        }
        PlayerJumpAction.prototype.start = function (manager) {
            var x = $gamePlayer.x;
            var y = $gamePlayer.y;
            var newPosition = Nore.EventArranger.getPlayerPutPosition(x, y);
            var jumpX = newPosition.x - x;
            var jumpY = newPosition.y - y;
            if (jumpX != 0 || jumpY != 0) {
                $gamePlayer.jump(jumpX, jumpY);
            }
            else {
                this._finished = true;
            }
        };
        PlayerJumpAction.prototype.update = function (manager) {
            if (!$gamePlayer.isJumping()) {
                this._finished = true;
            }
        };
        PlayerJumpAction.prototype.isFinished = function () {
            return this._finished;
        };
        return PlayerJumpAction;
    }(Action));
    Nore.PlayerJumpAction = PlayerJumpAction;
    var SwapAction = /** @class */ (function (_super) {
        __extends(SwapAction, _super);
        function SwapAction(_sx, _sy, _tx, _ty) {
            var _this = _super.call(this) || this;
            _this._sx = _sx;
            _this._sy = _sy;
            _this._tx = _tx;
            _this._ty = _ty;
            return _this;
        }
        SwapAction.prototype.start = function (manager) {
            var sEvent = manager.findEvent(this._sx, this._sy);
            var tEvent = manager.findEvent(this._tx, this._ty);
            if (sEvent) {
                sEvent._x = this._tx;
                sEvent._y = this._ty;
            }
            if (tEvent) {
                tEvent._x = this._sx;
                tEvent._y = this._sy;
            }
        };
        SwapAction.prototype.update = function (manager) {
            if (!$gameMap.isMoving()) {
                this._finished = true;
            }
        };
        SwapAction.prototype.isFinished = function () {
            return this._finished;
        };
        return SwapAction;
    }(Action));
    Nore.SwapAction = SwapAction;
    var ManguriAction = /** @class */ (function (_super) {
        __extends(ManguriAction, _super);
        function ManguriAction() {
            return _super.call(this) || this;
        }
        ManguriAction.prototype.start = function (manager) {
            $gameTemp.reserveCommonEvent(826);
        };
        ManguriAction.prototype.update = function (manager) {
        };
        ManguriAction.prototype.isFinished = function () {
            return true;
        };
        return ManguriAction;
    }(Action));
    Nore.ManguriAction = ManguriAction;
    var CosBreakAction = /** @class */ (function (_super) {
        __extends(CosBreakAction, _super);
        function CosBreakAction() {
            return _super.call(this) || this;
        }
        CosBreakAction.prototype.start = function (manager) {
            var actor = $gameActors.mainActor();
            var lastMinus = actor.minusArmor();
            var changed = actor.updateBreakId();
            if (changed) {
                AudioManager.playSe({ name: 'Slash10', volume: 100, pitch: 100, pan: 0 });
                Nore.$gameMessageRogue.add("Karen's clothes were damaged by one level!");
                var minus = actor.minusArmor();
                if (minus != lastMinus) {
                    Nore.$gameMessageRogue.add("Karen's maximum clothing value has decreased!");
                }
            }
        };
        CosBreakAction.prototype.update = function (manager) {
        };
        CosBreakAction.prototype.isFinished = function () {
            return true;
        };
        return CosBreakAction;
    }(Action));
    var PlayerDeathAction = /** @class */ (function (_super) {
        __extends(PlayerDeathAction, _super);
        function PlayerDeathAction(enemyId) {
            var _this = _super.call(this) || this;
            if (enemyId != 10) {
                $gameVariables.setValue(3, enemyId);
            }
            else if ($gameVariables.value(3) == 0) {
                $gameVariables.setValue(3, enemyId);
            }
            return _this;
        }
        PlayerDeathAction.prototype.start = function (manager) {
            Nore.rogueManager.setupEnemy();
            $gameTemp.reserveCommonEvent(16);
        };
        PlayerDeathAction.prototype.update = function (manager) {
        };
        PlayerDeathAction.prototype.isFinished = function () {
            return true;
        };
        return PlayerDeathAction;
    }(Action));
    var IkiAction = /** @class */ (function (_super) {
        __extends(IkiAction, _super);
        function IkiAction() {
            return _super.call(this) || this;
        }
        IkiAction.prototype.start = function (manager) {
            var reaction = selectIkuReaction(1);
            $gameActors.mainActor().setBattleFaceId(reaction.face);
            $gameActors.mainActor().addState(27);
            Nore.$gameMessageRogue.add(reaction.desc, false);
            Nore.$gameMessageRogue.add('Karen was possessed by a monster.', false);
            if ($gameTemp.isCommonEventReserved()) {
                p('skipReserve');
                return;
            }
            $gameTemp.reserveCommonEvent(36);
        };
        IkiAction.prototype.update = function (manager) {
        };
        IkiAction.prototype.isFinished = function () {
            return true;
        };
        return IkiAction;
    }(Action));
    var RemoveAcceAction = /** @class */ (function (_super) {
        __extends(RemoveAcceAction, _super);
        function RemoveAcceAction(_acceId) {
            var _this = _super.call(this) || this;
            _this._acceId = _acceId;
            return _this;
        }
        RemoveAcceAction.prototype.start = function (manager) {
            $gameActors.actor(1).removeAcce(this._acceId);
        };
        RemoveAcceAction.prototype.isFinished = function () {
            return true;
        };
        return RemoveAcceAction;
    }(Action));
    var AddAcceAction = /** @class */ (function (_super) {
        __extends(AddAcceAction, _super);
        function AddAcceAction(_acceId) {
            var _this = _super.call(this) || this;
            _this._acceId = _acceId;
            return _this;
        }
        AddAcceAction.prototype.start = function (manager) {
            $gameActors.actor(1).addAcce(this._acceId);
        };
        AddAcceAction.prototype.isFinished = function () {
            return true;
        };
        return AddAcceAction;
    }(Action));
    var ChangeFaceAction = /** @class */ (function (_super) {
        __extends(ChangeFaceAction, _super);
        function ChangeFaceAction(_faceId) {
            var _this = _super.call(this) || this;
            _this._faceId = _faceId;
            return _this;
        }
        ChangeFaceAction.prototype.start = function (manager) {
            $gameActors.actor(1).setBattleFaceId(this._faceId);
        };
        ChangeFaceAction.prototype.isFinished = function () {
            return true;
        };
        return ChangeFaceAction;
    }(Action));
    var EndSexAction = /** @class */ (function (_super) {
        __extends(EndSexAction, _super);
        function EndSexAction() {
            return _super.call(this) || this;
        }
        EndSexAction.prototype.start = function (manager) {
            $gameActors.mainActor().endSex();
            AudioManager.playSe({ name: 'sounyu1', volume: 100, pitch: 100, pan: 0 });
        };
        EndSexAction.prototype.update = function (manager) {
        };
        EndSexAction.prototype.isFinished = function () {
            return true;
        };
        return EndSexAction;
    }(Action));
    var DamageAction = /** @class */ (function (_super) {
        __extends(DamageAction, _super);
        function DamageAction(_action, _target) {
            var _this = _super.call(this) || this;
            _this._action = _action;
            _this._target = _target;
            return _this;
        }
        DamageAction.prototype.setSkipWait = function (b) {
            this._skipWait = b;
        };
        DamageAction.prototype.target = function () {
            return this._target;
        };
        DamageAction.prototype.actor = function () {
            return $gameActors.mainActor();
        };
        DamageAction.prototype.start = function (manager) {
            if ($gamePlayer.isDefeat() || this._action.item().meta['ero']) {
                this.applyAction(manager);
                this.doEroAction(manager);
                return;
            }
            if (this._target.isDead()) {
                return;
            }
            this.applyAction(manager);
            var result = this._target.result();
            if (result.isHit()) {
                this.hitAction(manager, result);
            }
            else {
                this.evasionAction(manager);
            }
        };
        DamageAction.prototype.doEroAction = function (manager) {
            var action = this._action;
            var item = action.item();
            var parts = this.parseParts(item);
            this.actor().addEroAction(item, parts, action.subject());
            var addedStates = this.actor().result().addedStates;
            if (addedStates.includes(31) || addedStates.includes(33)) {
                this.actor().setCacheChanged();
            }
            Nore.$gameMessageRogue.add(Nore.makeEroDamageText(this._target, action), false);
            var reaction = selectEroReaction(item, 1);
            if (reaction) {
                Nore.$gameMessageRogue.add(reaction.desc, false);
                this.actor().setBattleFaceId(reaction.face);
            }
            else {
                this.changeActorFace(this.actor(), item);
            }
            Nore.displayStateText(this._target, false);
            this._targetSprite = manager.spriteset().findSprite(this._target);
            //this._targetSprite.showDamage(this._target);
            this._target.result().hpDamage = 1;
            this.showDamageAnime(manager);
            if (item.meta['oshitaoshi'] || item.meta['kaikyaku']) {
                manager.unshiftAction(new WaitAction(35));
            }
            var upEro = parseInt(item.meta['ero']);
            if (this.actor().upEstrus(upEro, item.id == 111)) {
                //manager.unshiftAction(new WaitAction(30));
                //manager.unshiftAction(new IkiAction());
            }
            /*if (item.meta['sex']) {
                const event = manager.findEventByEnemy(action.subject());
                rogueManager.insertEventStack(2, event);
            }*/
            if (item.meta['syasei']) {
                if (!$gameTemp.isCommonEventReserved()) {
                    $gameTemp.reserveCommonEvent(37);
                }
                this.actor().removeState(34);
                manager.unshiftAction(new EndSexAction());
                manager.unshiftAction(new WaitAction(30));
            }
            if (item.meta['sounyu']) {
                manager.unshiftAction(new WaitAction(50));
            }
            if (item.meta['fella']) {
                manager.unshiftAction(new ChangeFaceAction(13));
                manager.unshiftAction(new RemoveAcceAction(294));
                manager.unshiftAction(new WaitAction(30));
                manager.unshiftAction(new AddAcceAction(294));
                manager.unshiftAction(new ChangeFaceAction(27));
                manager.unshiftAction(new RemoveAcceAction(292));
                manager.unshiftAction(new WaitAction(30));
            }
            manager.unshiftAction(new WaitAction(5));
            this._target.clearResult();
        };
        DamageAction.prototype.changeActorFace = function (actor, item) {
            var candidates = [];
            if (item.meta['oshitaoshi']) {
                actor.setBattleFaceId(17);
            }
            if (item.meta['kaikyaku']) {
                actor.setBattleFaceId(22);
            }
            if (item.meta['chikubiLeft'] || item.meta['chikubiRighr'] || item.meta['teman'] || item.meta['bukkake']) {
                candidates.push(12);
                candidates.push(13);
                candidates.push(20);
                candidates.push(21);
                candidates.push(23);
                candidates.push(24);
                candidates.push(25);
                candidates.push(26);
            }
            if (item.meta['kiss']) {
                if (actor.hasState(33)) {
                    candidates.push(27);
                    candidates.push(28);
                    candidates.push(29);
                }
                else {
                    candidates.push(20);
                    candidates.push(21);
                }
            }
            if (item.meta['syasei']) {
                candidates.push(12);
                candidates.push(13);
                candidates.push(16);
                candidates.push(19);
                candidates.push(22);
                candidates.push(23);
            }
            if (item.meta['sex']) {
                candidates.push(22);
                candidates.push(24);
                candidates.push(26);
            }
            if (candidates.length > 0) {
                var id = candidates[Math.randomInt(candidates.length)];
                actor.setBattleFaceId(id);
            }
        };
        DamageAction.prototype.parseParts = function (item) {
            var candidates = [];
            if (item.meta['chikubiRight']) {
                candidates.push(Parts.chikubiRight);
            }
            if (item.meta['chikubiLeft']) {
                candidates.push(Parts.chikubiLeft);
            }
            if (item.meta['kiss'] || item.meta['fella'] || item.meta['shikko']) {
                candidates.push(Parts.kiss);
            }
            if (item.meta['manko'] || item.meta['teman'] || item.meta['sex']) {
                candidates.push(Parts.manko);
            }
            if (item.meta['bukkake']) {
                candidates.push(Parts.none);
            }
            return candidates[Math.randomInt(candidates.length)];
        };
        DamageAction.prototype.applyAction = function (manager) {
            var action = this._action;
            this._targetSprite = manager.spriteset().findSprite(this._target);
            action.prepare();
            if (this.isIsAlwaysEvasion()) {
                return;
            }
            action.apply(this._target);
        };
        DamageAction.prototype.isIsAlwaysEvasion = function () {
            if (this._action.subject().isActor()) {
                return false;
            }
            if ($gameVariables.value(1) != 1) {
                return false;
            }
            if ($gameSwitches.value(8)) {
                return false;
            }
            var actor = $gameActors.mainActor();
            if (actor.hp > 10) {
                return false;
            }
            return true;
        };
        DamageAction.prototype.hitAction = function (manager, result) {
            if (this._targetSprite.character()) {
                this._targetSprite.character().onDamage(result.hpDamage);
            }
            if (this._target.isEnemy()) {
                $gameActors.mainActor().cancelEroAction(this._target);
            }
            this.identifyItem();
            this.displayHpDamageText();
            Nore.displayEnemyLevelUp(result);
            Nore.displayStateText(this._target);
            if (result.hpDamage != 0) {
                this._targetSprite.showDamage(this._target);
            }
            this.showDamageAnime(manager);
            if (this._target.isDead()) {
                this.deathAction(manager);
            }
            else {
                this.breakCostume(manager);
                if (!this._skipWait) {
                    manager.unshiftAction(new WaitAction(30));
                }
            }
            manager.spriteset().showEnemyForecastAll();
        };
        DamageAction.prototype.displayHpDamageText = function () {
            var action = this._action;
            Nore.$gameMessageRogue.add(Nore.makeHpDamageText(this._target, action));
        };
        DamageAction.prototype.identifyItem = function () {
            if (!this._action.rogueItem) {
                return;
            }
            if (this._action.rogueItem.isIdentified()) {
                return;
            }
            Nore.$gameMessageRogue.add(Nore.makeIdentifyText(this._action.rogueItem));
            this._action.rogueItem.identify();
        };
        DamageAction.prototype.deathAction = function (manager) {
            if (this._target.isActor()) {
                var c = this._action.subject();
                var enemyId = 10;
                if (c instanceof Game_Enemy) {
                    enemyId = c.enemyId();
                }
                manager.clearActions();
                manager.unshiftAction(new WaitAction(30));
                manager.unshiftAction(new PlayerDeathAction(enemyId));
                manager.unshiftAction(new WaitAction(30));
                manager.unshiftAction(new CosBreakAction());
                return;
            }
            manager.unshiftAction(new EnemyDeathAction(this._targetSprite, this._target));
            if (!this._skipWait) {
                manager.unshiftAction(new WaitAction(20));
            }
        };
        DamageAction.prototype.evasionAction = function (manager) {
            var action = this._action;
            Nore.$gameMessageRogue.add(Nore.makeMissText(this._target, action));
            this._target.performEvasion();
            if (!this._skipWait) {
                manager.unshiftAction(new WaitAction(30));
            }
        };
        DamageAction.prototype.breakCostume = function (manager) {
            if (!this._target.isActor()) {
                return;
            }
            var actor = this._target;
            $gameVariables.setValue(12, $gameVariables.value(12) + actor.result().hpDamage);
            manager.unshiftAction(new CosBreakAction());
        };
        DamageAction.prototype.showDamageAnime = function (manager) {
            var animation;
            if (this._action.item().meta['damageAnime']) {
                var id = parseInt(this._action.item().meta['damageAnime']);
                animation = $dataAnimations[id];
            }
            else if (this._action.isDamage()) {
                animation = $dataAnimations[122];
            }
            else {
                animation = $dataAnimations[121];
            }
            if (this._target.result().hpDamage > 0) {
                this._targetSprite.inDamageFrame = 10;
            }
            var sprite = new Sprite_Animation();
            sprite.targetObjects = [this._targetSprite];
            sprite.setup(sprite.targetObjects, animation, false, 0, null);
            manager.spriteset()._effectsContainer.addChild(sprite);
            manager.spriteset()._animationSprites.push(sprite);
        };
        DamageAction.prototype.isFinished = function () {
            return true;
        };
        return DamageAction;
    }(Action));
    Nore.DamageAction = DamageAction;
    Game_Action.prototype.testLifeAndDeath = function (target) {
        if (this.isForOpponent() || this.isForAliveFriend()) {
            return target.isAlive() || target.isActor();
        }
        else if (this.isForDeadFriend()) {
            return target.isDead();
        }
        else {
            return true;
        }
    };
    var EnemyDeathAction = /** @class */ (function (_super) {
        __extends(EnemyDeathAction, _super);
        function EnemyDeathAction(_targetSprite, _target) {
            var _this = _super.call(this) || this;
            _this._targetSprite = _targetSprite;
            _this._target = _target;
            return _this;
        }
        EnemyDeathAction.prototype.start = function (manager) {
            this._target.performCollapse();
            $gameSystem.questManager().onEnemy(this._target.enemyId());
            var event = this._targetSprite.character();
            if (event) {
                var gainBonus = true;
                if (event.isBoss() && $gameMap.isAllBossDefeated()) {
                    Nore.gainEnemyBonus(this._target);
                    $gamePlayer.room.removeAllEnemy(gainBonus);
                }
                else {
                    $gamePlayer.room.removeEnemy(event, gainBonus);
                }
            }
            if (this._target.isEnemy()) {
                var deathSkill = parseInt(this._target.enemy().meta['deathSkill']);
                if (deathSkill > 0) {
                    this.doDeathSkill(manager, event, deathSkill);
                }
                else {
                    manager.unshiftAction(new WaitAction(10));
                }
            }
        };
        EnemyDeathAction.prototype.eraseEnemy = function (event) {
        };
        EnemyDeathAction.prototype.doDeathSkill = function (manager, event, skillId) {
            var actionList = [];
            var skill = $dataSkills[skillId];
            actionList.push(new AnimationAction(event.x, event.y, skill.animationId, 20));
            var action = new Game_Action(event.enemy());
            action.setSkill(skillId);
            actionList = actionList.concat(manager.createDamageAction(action, event));
            manager.unshiftActionList(actionList);
        };
        EnemyDeathAction.prototype.isFinished = function () {
            return true;
        };
        return EnemyDeathAction;
    }(Action));
    Nore.EnemyDeathAction = EnemyDeathAction;
    var PutItemAction = /** @class */ (function (_super) {
        __extends(PutItemAction, _super);
        function PutItemAction(_rogueItem, _x, _y) {
            var _this = _super.call(this) || this;
            _this._rogueItem = _rogueItem;
            _this._x = _x;
            _this._y = _y;
            return _this;
        }
        PutItemAction.prototype.start = function (manager) {
            Nore.EventArranger.putItem(this._rogueItem, this._x, this._y, true);
        };
        PutItemAction.prototype.isFinished = function () {
            return true;
        };
        return PutItemAction;
    }(Action));
    Nore.PutItemAction = PutItemAction;
    var ActionRogueState = /** @class */ (function (_super) {
        __extends(ActionRogueState, _super);
        function ActionRogueState(_actionList) {
            var _this = _super.call(this) || this;
            _this._actionList = _actionList;
            return _this;
        }
        ActionRogueState.prototype.pushAction = function (action) {
            this._actionList.push(action);
        };
        ActionRogueState.prototype.clearActions = function () {
            this._actionList = [];
        };
        ActionRogueState.prototype.unshiftActionList = function (list) {
            for (var i = list.length - 1; i >= 0; i--) {
                this.unshiftAction(list[i]);
            }
        };
        ActionRogueState.prototype.unshiftAction = function (action) {
            this._actionList.unshift(action);
        };
        ActionRogueState.prototype.start = function () {
            this._currentAction = this._actionList.shift();
            this._currentAction.start(this);
        };
        ActionRogueState.prototype.update = function () {
            this._currentAction.update(this);
            while (this._currentAction.isFinished()) {
                this._currentAction.terminate(this);
                this._currentAction = this._actionList.shift();
                if (!this._currentAction) {
                    break;
                }
                this._currentAction.start(this);
            }
            if (!this._currentAction) {
                Nore.phaseManager.nextPhase();
                return;
            }
        };
        return ActionRogueState;
    }(Nore.RogueState));
    Nore.ActionRogueState = ActionRogueState;
    var _Game_ActionResult_prototype_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function () {
        _Game_ActionResult_prototype_clear.call(this);
        this.mhpPlus = 0;
    };
    var _Sprite_Character_prototype_updatePosition = Sprite_Character.prototype.updatePosition;
    Sprite_Character.prototype.updatePosition = function () {
        _Sprite_Character_prototype_updatePosition.call(this);
        if (this.inDamageFrame > 0) {
            this.x += Math.randomInt(10) - 5;
            this.y += Math.randomInt(10) - 5;
            this.inDamageFrame--;
        }
    };
})(Nore || (Nore = {}));
