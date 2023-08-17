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
    var PlayerDrinkRogueState = /** @class */ (function (_super) {
        __extends(PlayerDrinkRogueState, _super);
        function PlayerDrinkRogueState() {
            var _this = _super.call(this) || this;
            _this._item = $gameTemp.targetItem;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerDrinkRogueState.prototype.start = function () {
            Nore.$gameMessageRogue.add(Nore.makeDrinkText(this._item));
            this._waitCount = 20;
        };
        PlayerDrinkRogueState.prototype.doDrink = function () {
            var action = new Game_Action(this.actor());
            action.setItem(this._item.itemId);
            $gameParty.inventory().loseItem(this._item);
            if (action.item().meta['flame']) {
                this.flameItem(action);
                return;
            }
            var actionList = [];
            actionList.push(new Nore.AnimationAction($gamePlayer.x, $gamePlayer.y, action.item().animationId, 7));
            actionList.push(this.createDamageActionOne(action, $gamePlayer));
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
            /*const animation = $dataAnimations[this._item.animationId()];
            action.setAnimation(animation);
    
    
            this.showEffectAnimation([this.findPlayerSprite()], action);*/
        };
        PlayerDrinkRogueState.prototype.flameItem = function (action) {
            var actionList = [];
            var actionWithDir = new ActionWithDirection(action, $gamePlayer.direction());
            actionWithDir.calcPointListByPoint($gamePlayer.x, $gamePlayer.y);
            var pointList = actionWithDir.pointList();
            var chara = this.findNearestEvent($gamePlayer, pointList);
            var distance;
            if (chara) {
                distance = $gamePlayer.calcDistance(chara.x, chara.y);
            }
            else {
                distance = this.calcRangeByPointList($gamePlayer, pointList);
            }
            for (var i = 0; i < distance; i++) {
                var pos = pointList[i];
                actionList.push(new Nore.AnimationAction(pos.x, pos.y, action.item().animationId, 7));
            }
            if (chara) {
                actionList.push(this.createDamageActionOne(action, chara));
            }
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
        };
        PlayerDrinkRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._waitCount > 0) {
                this._waitCount--;
                if (this._waitCount == 0) {
                    this.identify(this._item);
                    this.doDrink();
                }
            }
        };
        return PlayerDrinkRogueState;
    }(Nore.RogueState));
    Nore.PlayerDrinkRogueState = PlayerDrinkRogueState;
    var _Game_Action_prototype_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function (target) {
        _Game_Action_prototype_applyItemUserEffect.call(this, target);
        // レベルアップ
        if (this.item().meta['levelUp']) {
            if (target.isActor()) {
                target.levelUpByItem(parseInt(this.item().meta['levelUp']));
            }
            else {
                target.levelUp(parseInt(this.item().meta['levelUp']));
            }
        }
        // レベルダウン
        if (this.item().meta['levelDown']) {
            if (target.isActor()) {
                target.levelDownByItem(parseInt(this.item().meta['levelDown']));
            }
            else {
                target.levelDown(parseInt(this.item().meta['levelDown']));
            }
        }
    };
    Game_Enemy.prototype.levelUp = function (count) {
        var enemy = this.findEnemy(this.enemy().meta['type'], this.rank() + 1);
        if (enemy) {
            this.changeEnemy(enemy);
        }
    };
    Game_Enemy.prototype.levelDown = function (count) {
        var enemy = this.findEnemy(this.enemy().meta['type'], Math.max(this.rank() - count, 1));
        if (enemy) {
            this.changeEnemy(enemy);
        }
    };
    Game_Enemy.prototype.changeEnemy = function (enemy) {
        if (enemy) {
            var damage = this.mhp - this.hp;
            var result = this.result();
            result.beforeEnemy = this._enemyId;
            this._enemyId = enemy.id;
            result.afterEnemy = this._enemyId;
            this._hp = Math.max(this.mhp - damage, 1);
            //displayEnemyLevelUp(beforeEnemy, afterEnemy);
        }
    };
    Game_Enemy.prototype.findEnemy = function (type, rank) {
        for (var _i = 0, $dataEnemies_1 = $dataEnemies; _i < $dataEnemies_1.length; _i++) {
            var e_1 = $dataEnemies_1[_i];
            if (!e_1) {
                continue;
            }
            if (e_1.meta['type'] == type && parseInt(e_1.meta['rank']) == rank) {
                return e_1;
            }
        }
        return null;
    };
    Game_Enemy.prototype.rank = function () {
        return parseInt(this.enemy().meta['rank']);
    };
})(Nore || (Nore = {}));
