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
    var PlayerReadRogueState = /** @class */ (function (_super) {
        __extends(PlayerReadRogueState, _super);
        function PlayerReadRogueState() {
            var _this = _super.call(this) || this;
            _this._item = $gameTemp.targetItem;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerReadRogueState.prototype.start = function () {
            Nore.$gameMessageRogue.add(Nore.makeReadText(this._item));
            this._waitCount = 20;
        };
        PlayerReadRogueState.prototype.doMagic = function () {
            if (this._item.item().consumable) {
                $gameParty._inventory.loseItem(this._item);
                $gameSystem.questManager().onMagic(this._item.itemId);
            }
            var action = new Game_Action(this.actor());
            action.setItem(this._item.itemId);
            if (action.isDamage()) {
                this.doAttackMagic(action);
                return;
            }
            var animation = $dataAnimations[this._item.animationId()];
            action.setAnimation(animation);
            var targets;
            if (action.isForOpponent()) {
                targets = this.findRoomEnemySprite();
            }
            else {
                targets = [this.findPlayerSprite()];
            }
            var actionList = [];
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var t = targets_1[_i];
                actionList.push(new Nore.AnimationAction(t.x, t.y, this._item.animationId(), 20));
            }
            actionList.push(this.createDamageActionOne(action, $gamePlayer));
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
            //this.showEffectAnimation(targets, action);
        };
        PlayerReadRogueState.prototype.doAttackMagic = function (action) {
            var actionList = [];
            var damageList = this.createDamageAction(action, $gamePlayer);
            if (action.isForAll()) {
                actionList.push(new Nore.AnimationAction($gamePlayer.x, $gamePlayer.y, action.item().animationId, 60));
            }
            else {
                for (var _i = 0, damageList_1 = damageList; _i < damageList_1.length; _i++) {
                    var damage = damageList_1[_i];
                    var target = damage.target();
                    var targetSprite = this.spriteset().findSprite(target).character();
                    actionList.push(new Nore.AnimationAction(targetSprite.x, targetSprite.y, action.item().animationId, 20));
                }
            }
            for (var _a = 0, damageList_2 = damageList; _a < damageList_2.length; _a++) {
                var damage = damageList_2[_a];
                actionList.push(damage);
            }
            actionList.push(new Nore.WaitAction(20));
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
        };
        PlayerReadRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._waitCount > 0) {
                this._waitCount--;
                if (this._waitCount == 0) {
                    this.identify(this._item);
                    this.doMagic();
                }
            }
        };
        return PlayerReadRogueState;
    }(Nore.RogueState));
    Nore.PlayerReadRogueState = PlayerReadRogueState;
    var _Game_Action_prototype_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function (target) {
        _Game_Action_prototype_applyItemUserEffect.call(this, target);
        // 解呪の巻物
        if (this.item().meta['dispel']) {
            Nore.$gameMessageRogue.add(Nore.makeDispelText());
            for (var _i = 0, _a = $gameActors.actor(1).equips(); _i < _a.length; _i++) {
                var e_1 = _a[_i];
                if (e_1) {
                    e_1.removeCurse();
                }
            }
        }
        // 武器強化の巻物
        if (this.item().meta['weaponUp']) {
            var weapon = $gameActors.mainActor().weapon();
            if (weapon) {
                weapon.plus++;
                Nore.$gameMessageRogue.add(Nore.makePowerUpText(weapon));
                weapon.isCursed = false;
            }
            else {
                Nore.$gameMessageRogue.add(Nore.makeNoEffectText());
            }
        }
        // 盾強化の巻物
        if (this.item().meta['shieldUp']) {
            var shield = $gameActors.mainActor().shield();
            if (shield) {
                shield.plus++;
                Nore.$gameMessageRogue.add(Nore.makePowerUpText(shield));
                shield.isCursed = false;
            }
            else {
                Nore.$gameMessageRogue.add(Nore.makeNoEffectText());
            }
        }
        // 識別の巻物
        if (this.item().meta['identify']) {
            if ($gameTemp.toItem.isIdentified()) {
                Nore.$gameMessageRogue.add(Nore.makeNoEffectToIdentifyText());
            }
            else {
                Nore.$gameMessageRogue.add(Nore.makeIdentifyText($gameTemp.toItem));
                $gameTemp.toItem.identify();
            }
        }
        // 白旗
        if (this.item().meta['shirohata'] && $gamePlayer.room && $gamePlayer.room.enemyCount() > 0) {
            $gameActors.mainActor().addState(1);
            $gameActors.mainActor().gainHp(-999);
            var enemyId = $gamePlayer.room.nearestEnemyId();
            p('enemyId' + enemyId);
            $gameVariables.setValue(3, enemyId);
        }
    };
})(Nore || (Nore = {}));
