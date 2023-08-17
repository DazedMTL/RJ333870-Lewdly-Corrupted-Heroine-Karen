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
    Game_BattlerBase.prototype.resetStateCounts = function (stateId) {
        var state = $dataStates[stateId];
        var variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
        this._stateTurns[stateId] = state.minTurns + Math.randomInt(variance);
    };
    var PlayerRodRogueState = /** @class */ (function (_super) {
        __extends(PlayerRodRogueState, _super);
        function PlayerRodRogueState(rogueItem) {
            var _this = _super.call(this) || this;
            if (!rogueItem) {
                console.error('rogueItem not found');
                throw new Error();
            }
            _this._item = rogueItem;
            return _this;
        }
        PlayerRodRogueState.prototype.hitEffect2 = function (target, direction) {
            /*if (! target) {
    
                phaseManager.nextPhase();
                return;
            }*/
            /*if (this._item.realItem().meta['identifyByHit']) {
                if (! this._item.isIdentified()) {
                    $gameMessageRogue.add(makeIdentifyText(this._item));
                    this._item.identifyName();
                }
            }*/
            if (this._item.realItem().meta['blowAway']) {
                this.blowAway([target], direction);
            }
            else if (this._item.realItem().meta['swap']) {
                Nore.phaseManager.setPhase(CharacterSwapRogueState, target, this._item);
            }
            else {
                var action = new Game_Action(this.actor());
                action.setItem(this._item.realItem().id);
                action.setAnimation($dataAnimations[this._item.animationId()]);
                Nore.phaseManager.setPhase(Nore.AnimationRogueState, action, [target.character()]);
            }
        };
        PlayerRodRogueState.prototype.blowAway = function (character, direction) {
            var actionList = [];
            var action = new Game_Action(this.actor(), false);
            action.setItem(this._item.realItem().id);
            var knockback = parseInt(this._item.realItem().meta['blowAway']);
            var damageAction = this.createDamageActionOne(action, character);
            damageAction.setSkipWait(true);
            var knockbackAction = new Nore.CharacterKnockbackAction(character, knockback, $gamePlayer.direction());
            actionList.push(knockbackAction);
            actionList.push(damageAction);
            var point = knockbackAction.hitTargetPos();
            if (point) {
                var character2 = this.findEnemyEvent(point.x, point.y);
                if (character2) {
                    var damageAction2 = this.createDamageActionOne(action, character2);
                    damageAction2.setSkipWait(true);
                    actionList.push(damageAction2);
                }
            }
            return actionList;
        };
        PlayerRodRogueState.prototype.swap = function (character) {
            var actionList = [];
            var action = new Game_Action(this.actor(), false);
            action.setItem(this._item.realItem().id);
            var damageAction = this.createDamageActionOne(action, character);
            damageAction.setSkipWait(true);
            actionList.push(damageAction);
            actionList.push(new Nore.CharacterMoveAction(character, $gamePlayer.x, $gamePlayer.y));
            actionList.push(new Nore.CharacterMoveAction($gamePlayer, character.x, character.y));
            return actionList;
        };
        return PlayerRodRogueState;
    }(Nore.RogueState));
    Nore.PlayerRodRogueState = PlayerRodRogueState;
    var PlayerSwingRogueState = /** @class */ (function (_super) {
        __extends(PlayerSwingRogueState, _super);
        function PlayerSwingRogueState() {
            var _this = _super.call(this, $gameTemp.targetItem) || this;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerSwingRogueState.prototype.start = function () {
            if (this._item.count() == 0) {
                Nore.$gameMessageRogue.add(Nore.makeNoEffectText());
                var actionList_1 = [];
                actionList_1.push(new Nore.WaitAction(25));
                Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList_1);
                return;
            }
            $gameTemp.plusStateTurns = $gameParty.rodPlusTurns();
            p('$gameTemp.plusStateTurns:' + $gameTemp.plusStateTurns);
            this._item.consume();
            if (this._item.count() == 0) {
                $gameParty.inventory().loseItem(this._item);
            }
            AudioManager.playSe({ name: 'Magic1', volume: 100, pitch: 100, pan: 0 });
            var actionList = [];
            var throwAction = new Game_Action($gameActors.actor(1));
            throwAction.setSkill(6);
            var actionWithDir = new ActionWithDirection(throwAction, $gamePlayer.direction());
            actionWithDir.calcPointListByPoint($gamePlayer.x, $gamePlayer.y);
            var pointList = actionWithDir.pointList();
            var chara = this.findNearestEvent($gamePlayer, pointList);
            var magic = new RogueItem($dataItems[4], 1);
            if (chara) {
                var distance = $gamePlayer.calcDistance(chara.x, chara.y);
                actionList.push(new Nore.ThrowAction($gamePlayer, magic, distance));
                var action = new Game_Action($gameActors.actor(1));
                action.setItem(this._item.realItem().id);
                actionList = actionList.concat(this.hitEffect(chara));
            }
            else {
                var range = this.calcRangeByPointList($gamePlayer, pointList);
                actionList.push(new Nore.ThrowAction($gamePlayer, magic, range));
                var lastPoint = pointList[pointList.length - 1];
                if (!lastPoint) {
                    lastPoint = new Point($gamePlayer.x, $gamePlayer.y);
                }
                //actionList.push(new PutItemAction(this._item, lastPoint.x, lastPoint.y));
            }
            actionList.push(new Nore.WaitAction(20));
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
        };
        PlayerSwingRogueState.prototype.hitEffect = function (character) {
            /*if (this._item.realItem().meta['identifyByHit']) {
                if (! this._item.isIdentified()) {
                    $gameMessageRogue.add(makeIdentifyText(this._item));
                    this._item.identifyName();
                }
            }*/
            if (this._item.realItem().meta['blowAway']) {
                return this.blowAway(character, $gamePlayer.direction());
            }
            else if (this._item.realItem().meta['swap']) {
                return this.swap(character);
            }
            else {
                var actionList = [];
                var action = new Game_Action(this.actor(), false);
                action.setItem(this._item.realItem().id);
                actionList.push(new Nore.AnimationAction(character.x, character.y, this._item.animationId(), 60));
                var damageAction = this.createDamageActionOne(action, character);
                damageAction.setSkipWait(true);
                actionList.push(damageAction);
                return actionList;
            }
        };
        return PlayerSwingRogueState;
    }(PlayerRodRogueState));
    Nore.PlayerSwingRogueState = PlayerSwingRogueState;
    var PlayerRodHitState = /** @class */ (function (_super) {
        __extends(PlayerRodHitState, _super);
        function PlayerRodHitState(item, _targetList, _direction) {
            var _this = _super.call(this, item) || this;
            _this._targetList = _targetList;
            _this._direction = _direction;
            return _this;
        }
        PlayerRodHitState.prototype.start = function () {
            if (this._targetList.length == 0) {
                return;
            }
            this.hitEffect(this._targetList[0], this._direction);
        };
        return PlayerRodHitState;
    }(PlayerRodRogueState));
    Nore.PlayerRodHitState = PlayerRodHitState;
})(Nore || (Nore = {}));
