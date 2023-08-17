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
    var RogueState = /** @class */ (function () {
        function RogueState(arg) {
        }
        RogueState.prototype.spriteset = function () {
            return SceneManager._scene._spriteset;
        };
        RogueState.prototype.update = function () {
        };
        RogueState.prototype.start = function () {
        };
        RogueState.prototype.move = function (direction) {
            console.error('今は移動できるステートではありません');
        };
        RogueState.prototype.attack = function (direction) {
            console.error('今は攻撃できるステートではありません');
        };
        RogueState.prototype.useSkill = function (skill) {
            console.error('今はスキルを使えるステートではありません');
        };
        RogueState.prototype.useItem = function (item) {
            console.error('今はアイテムを使えるステートではありません');
        };
        RogueState.prototype.findEnemyEvent = function (x, y) {
            var ret = $gameMap.eventsXyNt(x, y);
            var ret2 = [];
            for (var _i = 0, ret_1 = ret; _i < ret_1.length; _i++) {
                var e_1 = ret_1[_i];
                if (e_1.enemy()) {
                    ret2.push(e_1);
                }
            }
            if (ret2.length > 1) {
                console.error('2つ以上の敵がみつかりました');
                return;
            }
            if (ret2.length > 0) {
                return ret2[0];
            }
            return null;
        };
        RogueState.prototype.findEventList = function (pointList) {
            var result = [];
            for (var _i = 0, pointList_1 = pointList; _i < pointList_1.length; _i++) {
                var point = pointList_1[_i];
                var chara = this.findEvent(point.x, point.y);
                if (chara) {
                    result.push(chara);
                }
            }
            return result;
        };
        RogueState.prototype.findEventListSameRoom = function (pointList) {
            if (!$gamePlayer.room) {
                return this.findEventList(pointList);
            }
            var result = [];
            for (var _i = 0, pointList_2 = pointList; _i < pointList_2.length; _i++) {
                var point = pointList_2[_i];
                if (!$gamePlayer.room.contains(point.x, point.y)) {
                    continue;
                }
                var chara = this.findEvent(point.x, point.y);
                if (chara) {
                    var e_2 = chara;
                    result.push(chara);
                }
            }
            return result;
        };
        RogueState.prototype.findNearestEvent = function (character, pointList) {
            var list = pointList.sort(function (a, b) {
                var da = Math.abs(character.x - a.x) + Math.abs(character.y - a.y);
                var db = Math.abs(character.x - b.x) + Math.abs(character.y - b.y);
                return da - db;
            });
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var point = list_1[_i];
                var chara = this.findEvent(point.x, point.y);
                if (chara) {
                    return chara;
                }
            }
            return null;
        };
        RogueState.prototype.findEventByEnemy = function (enemy) {
            for (var _i = 0, _a = $gameMap._events; _i < _a.length; _i++) {
                var e_3 = _a[_i];
                if (e_3 && e_3 instanceof Game_EnemyEvent) {
                    if (Nore.EventArranger.isAlive(e_3) && e_3.enemy()) {
                        if (e_3.enemy() == enemy) {
                            return e_3;
                        }
                    }
                }
            }
            console.log('EnemyEvent がみつかりませんでした');
            return null;
        };
        RogueState.prototype.findEvent = function (x, y) {
            if (x == $gamePlayer.x && y == $gamePlayer.y) {
                if ($gameActors.actor(1).isAlive()) {
                    return $gamePlayer;
                }
                else {
                    return null;
                }
            }
            var ret = $gameMap.eventsXyNt(x, y);
            var ret2 = [];
            for (var _i = 0, ret_2 = ret; _i < ret_2.length; _i++) {
                var e_4 = ret_2[_i];
                if (e_4.enemy()) {
                    ret2.push(e_4);
                }
            }
            if (ret2.length > 1) {
                console.error('2つ以上の敵がみつかりました');
                return;
            }
            if (ret2.length > 0) {
                var enemy = ret2[0].enemy();
                if (enemy.isAlive()) {
                    return ret2[0];
                }
            }
            return null;
        };
        RogueState.prototype.findPlayerSprite = function () {
            return this.spriteset().findPlayerSprite();
        };
        RogueState.prototype.showEffectAnimation = function (targetList, action) {
            var list = [];
            for (var _i = 0, targetList_1 = targetList; _i < targetList_1.length; _i++) {
                var s = targetList_1[_i];
                list.push(s.character());
            }
            Nore.phaseManager.setPhase(AnimationRogueState, action, list);
        };
        RogueState.prototype.findRoomEnemySprite = function () {
            var result = [];
            if ($gamePlayer.room) {
                for (var _i = 0, _a = $gameMap.events(); _i < _a.length; _i++) {
                    var e_5 = _a[_i];
                    if (Nore.EventArranger.isEnemy(e_5.x, e_5.y)) {
                        if ($gamePlayer.room.equals(e_5._room)) {
                            result.push(Nore.EventArranger.findEnemySprite(e_5));
                        }
                    }
                }
            }
            return result;
        };
        RogueState.prototype.showDamageAnime = function (event, anime) {
            var enemySprite = Nore.EventArranger.findEnemySprite(event);
            if (!enemySprite) {
                return;
            }
            this.showDamageAnimeSprite(enemySprite, anime);
        };
        RogueState.prototype.showDamageAnimeSprite = function (charSprite, animation) {
            var sprite = new Sprite_Animation();
            sprite.targetObjects = [charSprite];
            sprite.setup(sprite.targetObjects, animation, false, 0, null);
            this.spriteset()._effectsContainer.addChild(sprite);
            this.spriteset()._animationSprites.push(sprite);
        };
        RogueState.prototype.actor = function () {
            return $gameActors.mainActor();
        };
        RogueState.prototype.calcInput = function () {
            if (Input.isPressed('up')) {
                if (Input.isPressed('left')) {
                    return 7;
                }
                else if (Input.isPressed('right')) {
                    return 9;
                }
                else {
                    return 8;
                }
            }
            if (Input.isPressed('down')) {
                if (Input.isPressed('left')) {
                    return 1;
                }
                else if (Input.isPressed('right')) {
                    return 3;
                }
                else {
                    return 2;
                }
            }
            if (Input.isPressed('left')) {
                return 4;
            }
            if (Input.isPressed('right')) {
                return 6;
            }
            return 0;
        };
        RogueState.prototype.identify = function (rogueItem) {
            if (rogueItem.isIdentified()) {
                return;
            }
            Nore.$gameMessageRogue.add(Nore.makeIdentifyText(rogueItem));
            rogueItem.identify();
        };
        RogueState.prototype.createItemAction = function (rogueItem) {
            var action = new Game_Action(this.actor(), false);
            action.setDirection($gamePlayer.direction());
            action.setItem(rogueItem.realItem().id);
            action.rogueItem = rogueItem;
            var animation = $dataAnimations[rogueItem.animationId()];
            action.setAnimation(animation);
            return action;
        };
        RogueState.prototype.makeRandomDirectionList = function () {
            var list = [1, 2, 3, 4, 6, 7, 8, 9];
            if (!CAN_8_MOVE) {
                list = [2, 6, 8, 4];
            }
            return Nore.shuffle(list);
        };
        RogueState.prototype.findFrontEnemy = function () {
            if (!$gamePlayer.room) {
                return null;
            }
            var pos = Nore.calcPosByDirection($gamePlayer.x, $gamePlayer.y, $gamePlayer.direction());
            for (var i = 0; i < 10; i++) {
                var event_1 = Nore.EventArranger.enemyEventAt(pos.x, pos.y);
                if (event_1) {
                    if (event_1._room == $gamePlayer.room) {
                        return event_1;
                    }
                }
                pos = Nore.calcPosByDirection(pos.x, pos.y, $gamePlayer.direction());
            }
            return null;
        };
        RogueState.prototype.createDamageAction = function (action, character) {
            var actionList = [];
            var direction = character.direction();
            if (action._direction > 0) {
                direction = action._direction;
            }
            var actionWithDir = new ActionWithDirection(action, direction);
            actionWithDir.calcPointListByPoint(character.x, character.y);
            var pointList = actionWithDir.pointList();
            var charaList = this.findEventListSameRoom(pointList);
            for (var _i = 0, charaList_1 = charaList; _i < charaList_1.length; _i++) {
                var char = charaList_1[_i];
                actionList.push(this.createDamageActionOne(action, char));
                if (action.item().meta['oneHit']) {
                    break;
                }
            }
            if (action.isForRandom()) {
                if (action.numTargets() < actionList.length) {
                    var randomList = Nore.shuffle(actionList);
                    var result = [];
                    for (var i = 0; i < action.numTargets(); i++) {
                        result.push(randomList[i]);
                    }
                    return result;
                }
            }
            return actionList;
        };
        RogueState.prototype.createDamageActionOne = function (action, target) {
            var battler;
            if (target.isEnemy()) {
                var enemyEvent = target;
                battler = enemyEvent.enemy();
            }
            else {
                battler = $gameActors.actor(1);
            }
            return new Nore.DamageAction(action, battler);
        };
        RogueState.prototype.calcRangeByPointList = function (character, pointList) {
            var max = 0;
            for (var _i = 0, pointList_3 = pointList; _i < pointList_3.length; _i++) {
                var point = pointList_3[_i];
                var distance = character.calcDistance(point.x, point.y);
                if (distance > max) {
                    max = distance;
                }
            }
            return max;
        };
        return RogueState;
    }());
    Nore.RogueState = RogueState;
    var PlayerMovableRogueState = /** @class */ (function (_super) {
        __extends(PlayerMovableRogueState, _super);
        function PlayerMovableRogueState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayerMovableRogueState.prototype.move = function (direction) {
            if ($gameTemp.command) {
                return;
            }
            if ($gameMap.isEventRunning()) {
                return;
            }
            var lastX = $gamePlayer.x;
            var lastY = $gamePlayer.y;
            if (this.actor().isConfused()) {
                var list = this.makeRandomDirectionList();
                for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                    var d = list_2[_i];
                    $gamePlayer.moveStraight(d);
                    if (lastX != $gamePlayer.x || lastY != $gamePlayer.y) {
                        $gamePlayer.setDirection(d);
                        $gameTemp.lastAction = new MoveActionHistory(new Point(lastX, lastY));
                        this.onMove();
                        return;
                    }
                }
                $gamePlayer.setDirection(direction);
                return;
            }
            $gamePlayer.moveStraight(direction);
            if (lastX == $gamePlayer.x && lastY == $gamePlayer.y) {
                $gameTemp.isFastMove = false;
                return;
            }
            $gameTemp.lastAction = new MoveActionHistory(new Point(lastX, lastY));
            this.onMove();
        };
        PlayerMovableRogueState.prototype.onMove = function () {
            Nore.$gameMessageRogue.isNewLine = true;
            Nore.$gameMessageRogue.hidden = true;
            this.getItem();
            Nore.phaseManager.nextPhase();
        };
        PlayerMovableRogueState.prototype.getItem = function () {
            var item = $gameMap.itemAt($gamePlayer.x, $gamePlayer.y);
            if (item) {
                var rogueItem = item.item();
                if ($gameTemp.isFastMove) {
                    Nore.$gameMessageRogue.add(Nore.rideOnItemText(rogueItem.name()));
                }
                if (rogueItem.isHammer()) {
                    AudioManager.playSe({ name: 'Hammer', volume: 80, pitch: 100, pan: 0 });
                    Nore.$gameMessageRogue.add('ハンマーで服を修理した！');
                    $gameMap.removeItemAt($gamePlayer.x, $gamePlayer.y);
                    $gameActors.mainActor().recoverArmor();
                }
                else if (rogueItem.isGold()) {
                    AudioManager.playSe({ name: 'Coin', volume: 80, pitch: 100, pan: 0 });
                    $gameParty.gainGold(rogueItem.count());
                    Nore.$gameMessageRogue.add('%1Ｇを手に入れた！'.format(rogueItem.count()));
                    $gameMap.removeItemAt($gamePlayer.x, $gamePlayer.y);
                }
                else if (rogueItem.isEther()) {
                    AudioManager.playSe({ name: 'Item1', volume: 80, pitch: 100, pan: 0 });
                    $gameParty.gainEther(rogueItem.count());
                    Nore.$gameMessageRogue.add('%1%2ccを手に入れた！'.format(rogueItem.name(), rogueItem.count()));
                    $gameMap.removeItemAt($gamePlayer.x, $gamePlayer.y);
                }
                else if ($gameParty._inventory.isMax()) {
                    Nore.$gameMessageRogue.add(Nore.cannotGetText(rogueItem.name()));
                }
                else {
                    AudioManager.playSe({ name: 'Item1', volume: 80, pitch: 100, pan: 0 });
                    $gameMap.removeItemAt($gamePlayer.x, $gamePlayer.y);
                    Nore.$gameMessageRogue.add(Nore.itemGetText(rogueItem));
                    $gameParty.gainItem(rogueItem, 1, false);
                    if (rogueItem.isEventItem()) {
                        $gameTemp.reserveCommonEvent(30);
                    }
                }
                $gameTemp.lastAction = new ItemGetActionHistory(rogueItem);
            }
        };
        return PlayerMovableRogueState;
    }(RogueState));
    Nore.PlayerMovableRogueState = PlayerMovableRogueState;
    var PlayerInputRogueState = /** @class */ (function (_super) {
        __extends(PlayerInputRogueState, _super);
        function PlayerInputRogueState(_turn) {
            var _this = _super.call(this) || this;
            _this._turn = _turn;
            return _this;
        }
        PlayerInputRogueState.prototype.start = function () {
            this.spriteset().showEnemyForecastAll();
            this.spriteset().showPlayerDirection();
            $gameMap.change();
            this._lastInputList = [];
            var initialDirection = this.calcInput();
            if (initialDirection) {
                this._lastInputList.push(initialDirection);
                this._lastInputList.push(initialDirection);
            }
            Nore.rogueManager.setupEnemy();
            if (!this.isValid()) {
                Nore.phaseManager.nextPhase();
                return;
            }
            this.updateBattleRoom();
            this.actor().clearResult();
            this.actor().onTurnEnd();
            Nore.displayStateText(this.actor());
            if (this.hasBadState()) {
                $gameTemp.isFastMove = false;
            }
            if (!this.actor().canMove() || $gamePlayer.isDefeat()) {
                if (this.checkDefeatTurn()) {
                    $gameTemp.reserveCommonEvent(17);
                    return;
                }
                if (this.isStillDefeat() && false) {
                    Nore.phaseManager.setPhase(PlayerCommandSelectRogueState);
                    return;
                }
                this.actor().resetEstrus();
                Nore.displayCurrentState(this.actor());
                if (Nore.$gameMessageRogue.hasText()) {
                    Nore.phaseManager.setPhase(Nore.ActionRogueState, [new Nore.WaitAction(30)]);
                    return;
                }
                Nore.phaseManager.nextPhase();
                return;
            }
            this.actor().clearEroActionList();
            this.actor().clearBattleFaceId();
            if ($gameTemp.isFastMove) {
                if (this.moveAuto()) {
                    return;
                }
            }
            $gameTemp.isFastMove = false;
            $gamePlayer.update(true);
        };
        PlayerInputRogueState.prototype.isStillDefeat = function () {
            return $gameVariables.value(13) > 0;
        };
        PlayerInputRogueState.prototype.checkDefeatTurn = function () {
            var remain = $gameVariables.value(13);
            if (remain <= 0) {
                return false;
            }
            /*if ($gameSwitches.value(32)) {
                $gameSwitches.setValue(32,  false);
                return;
            }*/
            var after = remain - 1;
            $gameSwitches.setValue(30, false);
            $gameVariables.setValue(13, after);
            return after == 0;
        };
        PlayerInputRogueState.prototype.updateBattleRoom = function () {
            if (!$gamePlayer.room) {
                return;
            }
            if (!$gamePlayer.lastBattleRoom) {
                if ($gamePlayer.room.enemyCount() > 0) {
                    if (!$gameSwitches.value(999)) {
                        $gamePlayer.room.displayEmergeMessage();
                        //p($gamePlayer.room.isExit($gamePlayer.x, $gamePlayer.y));
                        Nore.EventArranger.putExitObject($gamePlayer.room);
                        this.playBattleBgm();
                    }
                    $gamePlayer.lastBattleRoom = $gamePlayer.room;
                    this._wait = 30;
                }
            }
            else {
                if ($gamePlayer.lastBattleRoom.enemyCount() == 0) {
                    Nore.EventArranger.removeExitObject($gamePlayer.room);
                    this.endBattleBgm();
                    $gamePlayer.lastBattleRoom = null;
                    $gameMedals.onVictory();
                }
            }
        };
        PlayerInputRogueState.prototype.playBattleBgm = function () {
            $gameSystem.dungeonInfo().nextRoom();
            AudioManager.playSe({ name: 'Door7', volume: 50, pitch: 100, pan: 0 });
            if ($gameSwitches.value(8)) {
                $gameTemp.reserveCommonEvent(125);
            }
            else if ($gamePlayer.room.hasElite()) {
                $gameTemp.reserveCommonEvent(124);
            }
            else {
                $gameTemp.reserveCommonEvent(123);
            }
        };
        PlayerInputRogueState.prototype.endBattleBgm = function () {
            AudioManager.playSe({ name: 'Door7', volume: 50, pitch: 100, pan: 0 });
            $gameTemp.reserveCommonEvent(120);
            var switchId = $gamePlayer.room.clearSwitch();
            if (switchId > 0) {
                $gameSwitches.setValue(switchId, true);
            }
            this.actor().clearBattleFaceId();
            Nore.EventArranger.putTreasure($gamePlayer.room.lastEnemyDeadPosition());
        };
        PlayerInputRogueState.prototype.update = function () {
            if (this._wait > 0) {
                this._wait--;
                if (this._wait > 0) {
                    return;
                }
            }
            _super.prototype.update.call(this);
            if ($gamePlayer.isDefeat()) {
                var remain = $gameVariables.value(13);
                if (remain > 0) {
                    Nore.phaseManager.nextPhase();
                }
                return;
            }
            if ($gameMessage.isBusy()) {
                return;
            }
            if (this.spriteset()._skillWindow.active) {
                return;
            }
            this.updateCommand();
            this.updateChangePhase();
            this.updateMove();
        };
        PlayerInputRogueState.prototype.updateCommand = function () {
            switch ($gameTemp.command) {
                case Nore.ItemCommand.equip:
                    Nore.phaseManager.setPhase(PlayerEquipRogueState);
                    break;
                case Nore.ItemCommand.discardWeapon:
                    Nore.phaseManager.setPhase(PlayerDiscardEquipRogueState, 0);
                    break;
                case Nore.ItemCommand.discardArmor:
                    var item = $gameTemp.targetItem;
                    Nore.phaseManager.setPhase(PlayerDiscardEquipRogueState, item.realItem().etypeId);
                    break;
                case Nore.ItemCommand.throw:
                    Nore.phaseManager.setPhase(PlayerThrowRogueState);
                    break;
                case Nore.ItemCommand.drink:
                    Nore.phaseManager.setPhase(Nore.PlayerDrinkRogueState);
                    break;
                case Nore.ItemCommand.put:
                    Nore.phaseManager.setPhase(PlayerPutRogueState);
                    break;
                case Nore.ItemCommand.pickup:
                    Nore.phaseManager.setPhase(PlayerPickupRogueState);
                    break;
                case Nore.ItemCommand.read:
                    Nore.phaseManager.setPhase(Nore.PlayerReadRogueState);
                    break;
                case Nore.ItemCommand.swing:
                    Nore.phaseManager.setPhase(Nore.PlayerSwingRogueState);
                    break;
                case Nore.ItemCommand.putIn:
                    Nore.phaseManager.setPhase(Nore.PlayerPutInRogueState);
                    break;
                case Nore.ItemCommand.rope:
                    Nore.phaseManager.setPhase(PlayerRopeRogueState);
                    break;
            }
        };
        PlayerInputRogueState.prototype.hasBadState = function () {
            var actor = this.actor();
            // 毒 混乱
            var list = [4, 6];
            if (actor.hasStateList(list)) {
                return true;
            }
            return false;
        };
        PlayerInputRogueState.prototype.updateChangePhase = function () {
            if (!Nore.phaseManager.isPhase(PlayerInputRogueState)) {
                return;
            }
            if ($gamePlayer.isDirectionButtonPressed()) {
                Nore.phaseManager.pushPhase(PlayerDirectionRogueState);
            }
            else if (Input.isPressed('pageup')) {
                this.shootArrow();
            }
            else if (Input.isPressed('pagedown')) {
                Nore.phaseManager.pushPhase(PlayerTiltRogueState);
            }
            else if (Input.isPressed('shift')) {
                if (!Input.dir8) {
                    Nore.phaseManager.pushPhase(PlayerFastMoveRogueState);
                }
            }
            else if (Input.isTriggered('control')) {
                if ($gameTemp.infoEnemy) {
                    $gameTemp.infoEnemy = null;
                }
                else {
                    $gameTemp.infoEnemy = this.findFrontEnemy();
                }
            }
        };
        PlayerInputRogueState.prototype.updateMove = function () {
            if (!Nore.phaseManager.isPhase(PlayerInputRogueState)) {
                return;
            }
            if (Input.isPressed('shift')) {
                return;
            }
            this.spriteset().removeAllForecastPanel();
            this.spriteset().showPlayerDirection();
            var direction = $gamePlayer.getInputDirection();
            if (!direction) {
                this._lastInputList = [];
                return;
            }
            //p(direction)
            this._lastInputList.push(direction);
            if (this._lastInputList.length >= 4) {
                for (var _i = 0, _a = this._lastInputList; _i < _a.length; _i++) {
                    var d = _a[_i];
                    if (d != direction) {
                        this._lastInputList.shift();
                        return;
                    }
                }
                $gamePlayer.setDirection(direction);
                this._lastInputList.shift();
                this.move(direction);
                this.spriteset().removeAllForecastPanel();
                this.spriteset().showPlayerDirection();
                $gameTemp.infoEnemy = this.findFrontEnemy();
            }
        };
        PlayerInputRogueState.prototype.isValid = function () {
            var actor = this.actor();
            switch (this._turn) {
                case 1:
                    return true;
                case 2:
                case 4:
                    return actor.hasState(25);
                case 3:
                    return !actor.hasState(26);
            }
        };
        PlayerInputRogueState.prototype.actor = function () {
            return $gameActors.mainActor();
        };
        PlayerInputRogueState.prototype.moveAuto = function () {
            if (this.isStopFastMove()) {
                return false;
            }
            if ($gamePlayer.canPass($gamePlayer.x, $gamePlayer.y, $gamePlayer.direction())) {
                this.move($gamePlayer.direction());
                return true;
            }
            if ($gamePlayer.room) {
            }
            else {
                var canMoveRight = $gamePlayer.canPass($gamePlayer.x, $gamePlayer.y, $gamePlayer.rightDir());
                var canMoveLeft = $gamePlayer.canPass($gamePlayer.x, $gamePlayer.y, $gamePlayer.leftDir());
                if (canMoveRight && canMoveLeft) {
                    return false;
                }
                if (canMoveRight) {
                    this.move($gamePlayer.rightDir());
                    return true;
                }
                if (canMoveLeft) {
                    this.move($gamePlayer.leftDir());
                    return true;
                }
            }
            return false;
        };
        PlayerInputRogueState.prototype.isStopFastMove = function () {
            return this.isStopFastMoveByChangeRoom() || this.isStopFastMoveByGetItem() || this.isStopFastMoveByEnemy() || this.isStopFastMoveByItem();
        };
        PlayerInputRogueState.prototype.isStopFastMoveByChangeRoom = function () {
            var nextPoint = $gamePlayer.nextPos();
            if ($gamePlayer.room) {
                if (!$gameMap.isRoom(nextPoint.x, nextPoint.y)) {
                    return true;
                }
                if ($gamePlayer.room.isExit($gamePlayer.x, $gamePlayer.y)) {
                    return true;
                }
            }
            else {
                var room = $gameMap.getRoom(nextPoint.x, nextPoint.y);
                if (room) {
                    p('room2');
                    return true;
                }
            }
            return false;
        };
        PlayerInputRogueState.prototype.isStopFastMoveByGetItem = function () {
            //p($gameTemp.lastAction)
            if ($gameTemp.lastAction && $gameTemp.lastAction.type() == HistoryType.ITEM_GET) {
                return true;
            }
            return false;
        };
        PlayerInputRogueState.prototype.isStopFastMoveByEnemy = function () {
            var backPosList = $gamePlayer.backPosList();
            for (var i = -1; i <= 1; i++) {
                for (var k = -1; k <= 1; k++) {
                    if (i == 0 && k == 0) {
                        continue;
                    }
                    if (this.isBackPos($gamePlayer.x + i, $gamePlayer.y + k, backPosList)) {
                        continue;
                    }
                    if (Nore.EventArranger.isEnemy($gamePlayer.x + i, $gamePlayer.y + k)) {
                        return true;
                    }
                }
            }
            return false;
        };
        PlayerInputRogueState.prototype.isBackPos = function (x, y, backPosList) {
            for (var _i = 0, backPosList_1 = backPosList; _i < backPosList_1.length; _i++) {
                var backPos = backPosList_1[_i];
                if (backPos.x == x && backPos.y == y) {
                    return true;
                }
            }
            return false;
        };
        PlayerInputRogueState.prototype.isStopFastMoveByItem = function () {
            var list = $gamePlayer.frontPosList();
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var point = list_3[_i];
                if (Nore.EventArranger.hasFootEvent(point.x, point.y)) {
                    return true;
                }
            }
            /*for (var i = -1; i <= 1; i++) {
                for (var k = -1; k <= 1; k++) {
                    if (i == 0 && k == 0) {
                        continue;
                    }
                    if (EventArranger.hasFootEvent($gamePlayer.x + i, $gamePlayer.y + k)) {
                        return true;
                    }
                }
            }*/
            return false;
        };
        PlayerInputRogueState.prototype.attack = function () {
            if ($gameTemp.command) {
                return;
            }
            $gameTemp.infoEnemy = this.findFrontEnemy();
            $gamePlayer.updateEncounterCount();
            this.showAttackAnimation();
            //this.showSpearAttackAnimation();
        };
        PlayerInputRogueState.prototype.getEnemyAttackInfo = function (action, dir) {
            action.skillId = action.item().id;
            var actionWithDir = new ActionWithDirection(action, dir);
            actionWithDir.calcPointListByPoint($gamePlayer.x, $gamePlayer.y);
            var pointList = actionWithDir.pointList();
            var result = [];
            for (var _i = 0, pointList_4 = pointList; _i < pointList_4.length; _i++) {
                var point = pointList_4[_i];
                var enemy = this.findEnemyEvent(point.x, point.y);
                if (enemy) {
                    result.push(enemy);
                }
            }
            return result;
        };
        PlayerInputRogueState.prototype.getSpearEnemyAttackInfo = function () {
            var result = [];
            var enemyX = $gamePlayer.x;
            var enemyY = $gamePlayer.y;
            var maxRange = 1;
            this.getEnemyInfo(result, enemyX, enemyY, 1, maxRange, $gamePlayer.direction());
            return result;
        };
        PlayerInputRogueState.prototype.getEnemyInfo = function (result, enemyX, enemyY, range, maxRange, direction) {
            switch (direction) {
                case 1:
                    enemyX--;
                    enemyY++;
                    break;
                case 3:
                    enemyX++;
                    enemyY++;
                    break;
                case 7:
                    enemyX--;
                    enemyY--;
                    break;
                case 9:
                    enemyX++;
                    enemyY--;
                    break;
                case 8:
                    enemyY--;
                    break;
                case 4:
                    enemyX--;
                    break;
                case 2:
                    enemyY++;
                    break;
                case 6:
                    enemyX++;
                    break;
            }
            var enemy = this.findEnemyEvent(enemyX, enemyY);
            if (enemy) {
                result.push(enemy);
            }
            if (range < maxRange) {
                this.getEnemyInfo(result, enemyX, enemyY, range + 1, maxRange, direction);
            }
        };
        PlayerInputRogueState.prototype.showAttackAnimation = function () {
            var base = 171 + this.animationIdOffset();
            if (this.actor().weapons().length == 0) {
                //base = 181 + this.animationIdOffset();
                base = 1;
            }
            if (this.actor().isConfused()) {
                $gamePlayer.setDirection(this.makeRandomDirectionList()[0]);
            }
            var action = new Game_Action(this.actor(), false);
            action.setSkill(1);
            var animePos = Nore.calcPosByDirection($gamePlayer.x, $gamePlayer.y, $gamePlayer.direction());
            var actionList = [];
            actionList.push(new Nore.AnimationAction(animePos.x, animePos.y, base, 20));
            actionList = actionList.concat(this.createDamageAction(action, $gamePlayer));
            $gamePlayer.attackAnime();
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
        };
        PlayerInputRogueState.prototype.showSpearAttackAnimation = function () {
            var sprite = new Sprite_Animation();
            sprite.targetObjects = [this.spriteset()._player2Sprite];
            var base = 157 + this.animationIdOffset();
            if (this.actor().isConfused()) {
                $gamePlayer.setDirection(this.makeRandomDirectionList()[0]);
            }
            var action = new Game_Action(this.actor(), false);
            action.setSkill(5);
            var animePos = Nore.calcPosByDirection($gamePlayer.x, $gamePlayer.y, $gamePlayer.direction());
            var actionList = [];
            actionList.push(new Nore.AnimationAction(animePos.x, animePos.y, base, 20));
            actionList = actionList.concat(this.createDamageAction(action, $gamePlayer));
            $gamePlayer.attackAnime();
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
            //AudioManager.playSe({ name: 'Wind7', volume: 100, pitch: 100, pan: 0 });
        };
        PlayerInputRogueState.prototype.useItem = function (item) {
            var subject = $gameActors.actor(1);
            subject.clearResult();
            var action = new Game_Action(subject, false);
            action.setItem(item.id);
            if (action.isForUser()) {
                subject.useItem(item);
                Nore.phaseManager.setPhase(WAIT_SELF_ITEM, action);
            }
            else {
                this.useDamageItem(action);
            }
            this.applyItem(item);
        };
        PlayerInputRogueState.prototype.applyItem = function (item) {
            var subject = $gameActors.actor(1);
            var action = new Game_Action(subject);
            action.setDirection($gamePlayer.direction());
            action.setItemObject(item);
            action.applyGlobal();
        };
        ;
        PlayerInputRogueState.prototype.useSkill = function (skill) {
            //this.actor().paySkillCost(skill);
            if (skill.meta['through']) {
                if (!$gamePlayer._room) {
                    return;
                }
                if ($gamePlayer._room.enemyCount() == 0) {
                    return;
                }
                this.actor().paySkillCost(skill);
                var action = new Game_Action(this.actor(), false);
                action.setDirection($gamePlayer.direction());
                action.setSkill(skill.id);
                var range = parseInt(skill.meta['rangeMax']);
                var actionList = [];
                actionList.push(new Nore.SeAction({ name: 'Wind2', volume: 100, pitch: 100, pan: 0 }));
                actionList.push(new Nore.PlayerMoveAction(range, $gamePlayer.direction()));
                actionList = actionList.concat(this.createDamageAction(action, $gamePlayer));
                Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
                return;
            }
            if (skill.meta['knockback']) {
                this.doKnockbackSkill(skill);
                return;
            }
            if (skill.meta['swap']) {
                this.doSwapSkill(skill);
                return;
            }
            if (skill.meta['manguri']) {
                this.doManguriSkill(skill);
                return;
            }
            var enemyList = this.getSkillTargets(skill);
            if (enemyList.length > 0) {
                var subject = $gameActors.actor(1);
                subject.useItem(skill);
                var action = new Game_Action(subject, false);
                action.setDirection($gamePlayer.direction());
                action.setSkill(skill.id);
                var actionList = [];
                var animeId = action.animation().id;
                for (var _i = 0, enemyList_1 = enemyList; _i < enemyList_1.length; _i++) {
                    var e_6 = enemyList_1[_i];
                    var animePos = Nore.calcPosByDirection(e_6.x, e_6.y, $gamePlayer.direction());
                    actionList.push(new Nore.AnimationAction(e_6.x, e_6.y, animeId, 1));
                }
                actionList = actionList.concat(this.createDamageAction(action, $gamePlayer));
                Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
            }
            else {
                p('skillTargetが存在しません');
            }
        };
        PlayerInputRogueState.prototype.doKnockbackSkill = function (skill) {
            var actionList = [];
            var animationId = 171 + this.animationIdOffset();
            var action = new Game_Action(this.actor(), false);
            action.setSkill(skill.id);
            var knockback = parseInt(skill.meta['knockback']);
            var animePos = Nore.calcPosByDirection($gamePlayer.x, $gamePlayer.y, $gamePlayer.direction());
            actionList.push(new Nore.AnimationAction(animePos.x, animePos.y, animationId, 12));
            actionList.push(new Nore.PlayerMoveAction(knockback, $gamePlayer.reverseDir($gamePlayer.direction())));
            actionList = actionList.concat(this.createDamageAction(action, $gamePlayer));
            actionList.push(new Nore.WaitAction(20));
            Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
        };
        PlayerInputRogueState.prototype.animationIdOffset = function () {
            switch ($gamePlayer.direction()) {
                case 7: return 1;
                case 4: return 2;
                case 1: return 3;
                case 2: return 4;
                case 3: return 5;
                case 6: return 6;
                case 9: return 7;
            }
            return 0;
        };
        PlayerInputRogueState.prototype.doManguriSkill = function (skill) {
            if (!$gamePlayer._room) {
                return;
            }
            if ($gamePlayer._room.enemyCount() == 0) {
                return;
            }
            var actionList = [];
            this.actor().paySkillCost(skill);
            actionList.push(new Nore.ManguriAction());
            Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
        };
        PlayerInputRogueState.prototype.doSwapSkill = function (skill) {
            if (!$gamePlayer._room) {
                return;
            }
            if ($gamePlayer._room.enemyCount() == 0) {
                return;
            }
            var actionList = [];
            var animeId = 181 + this.animationIdOffset();
            var action = new Game_Action(this.actor(), false);
            action.setSkill(skill.id);
            var animePos = Nore.calcPosByDirection($gamePlayer.x, $gamePlayer.y, $gamePlayer.direction());
            if (!this.findEnemyEvent(animePos.x, animePos.y)) {
                return;
            }
            actionList.push(new Nore.AnimationAction(animePos.x, animePos.y, animeId, 1));
            actionList.push(new Nore.SwapAction($gamePlayer.x, $gamePlayer.y, animePos.x, animePos.y));
            actionList = actionList.concat(this.createDamageAction(action, $gamePlayer));
            this.actor().paySkillCost(skill);
            actionList.push(new Nore.WaitAction(20));
            Nore.phaseManager.pushPhase(Nore.ActionRogueState, actionList);
        };
        PlayerInputRogueState.prototype.getSkillTargets = function (skill) {
            var enemyList = [];
            var action = new Game_Action($gameActors.actor(1));
            action.setSkill(skill.id);
            var actionWithDir = new ActionWithDirection(action, $gamePlayer.direction());
            actionWithDir.calcPointList($gamePlayer);
            p(actionWithDir.pointList());
            for (var _i = 0, _a = actionWithDir.pointList(); _i < _a.length; _i++) {
                var point = _a[_i];
                enemyList.push(this.findEnemyEvent(point.x, point.y));
            }
            var c = [];
            for (var _b = 0, enemyList_2 = enemyList; _b < enemyList_2.length; _b++) {
                var e_7 = enemyList_2[_b];
                if (e_7) {
                    c.push(e_7);
                }
            }
            return c;
        };
        PlayerInputRogueState.prototype.shootArrow = function () {
            return;
            if ($gameParty.arrow() == 0) {
                Nore.$gameMessageRogue.isNewLine = true;
                Nore.$gameMessageRogue.add('矢をもっていない');
                Nore.phaseManager.setPhase(Nore.ActionRogueState, [new Nore.WaitAction(30)]);
                return;
            }
            $gameParty.loseArrow(1);
            AudioManager.playSe({ name: 'Wind7', volume: 100, pitch: 100, pan: 0 });
            var actionList = [];
            var action = new Game_Action($gameActors.actor(1));
            action.setSkill(6);
            var actionWithDir = new ActionWithDirection(action, $gamePlayer.direction());
            actionWithDir.calcPointListByPoint($gamePlayer.x, $gamePlayer.y);
            var pointList = actionWithDir.pointList();
            var chara = this.findNearestEvent($gamePlayer, pointList);
            if (chara) {
                var distance = $gamePlayer.calcDistance(chara.x, chara.y);
                actionList.push(new Nore.ThrowAction($gamePlayer, new RogueItem($dataItems[3]), distance));
                actionList.push(this.createDamageActionOne(action, chara));
            }
            else {
                var range = this.calcRangeByPointList($gamePlayer, pointList);
                actionList.push(new Nore.ThrowAction($gamePlayer, new RogueItem($dataItems[3]), range));
            }
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
        };
        return PlayerInputRogueState;
    }(PlayerMovableRogueState));
    Nore.PlayerInputRogueState = PlayerInputRogueState;
    var PlayerCommandSelectRogueState = /** @class */ (function (_super) {
        __extends(PlayerCommandSelectRogueState, _super);
        function PlayerCommandSelectRogueState() {
            return _super.call(this) || this;
        }
        PlayerCommandSelectRogueState.prototype.start = function () {
            this._window = new Window_DefeatCommand(new Rectangle(200, 200, 200, 150));
            this._window.setHandler('endure', this.onEndure.bind(this));
            this.spriteset().addChild(this._window);
        };
        PlayerCommandSelectRogueState.prototype.onEndure = function () {
            this.spriteset().removeChild(this._window);
            Nore.phaseManager.nextPhase();
        };
        PlayerCommandSelectRogueState.prototype.update = function () {
            this._window.update();
        };
        return PlayerCommandSelectRogueState;
    }(RogueState));
    Nore.PlayerCommandSelectRogueState = PlayerCommandSelectRogueState;
    var Window_DefeatCommand = /** @class */ (function (_super) {
        __extends(Window_DefeatCommand, _super);
        function Window_DefeatCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_DefeatCommand.prototype.makeCommandList = function () {
            this.addCommand('耐える', 'endure', true, null);
        };
        return Window_DefeatCommand;
    }(Window_Command));
    var PlayerEquipRogueState = /** @class */ (function (_super) {
        __extends(PlayerEquipRogueState, _super);
        function PlayerEquipRogueState() {
            var _this = _super.call(this) || this;
            _this._item = $gameTemp.targetItem;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerEquipRogueState.prototype.start = function () {
            var lastAtk = this.actor().atk;
            var lastDef = this.actor().def;
            if (this._item.isWeapon()) {
                if (!this.actor().canWeaponChange()) {
                    Nore.$gameMessageRogue.add(Nore.makeCannotEquipWeaponText(this.actor().equips()[0]));
                    return;
                }
                SoundManager.playEquip();
                var identified = this._item.isIdentified();
                if (!identified) {
                    this.identify(this._item);
                    $gameSystem.questManager().onIdentify();
                }
                this.actor().changeEquip(0, this._item);
                var newAtk = this.actor().atk;
                if (!identified) {
                    this.checkCurseDescription();
                }
                this.getMessageObject().add(Nore.makeEquipWeaponText(this._item, lastAtk, newAtk));
            }
            if (this._item.isArmor()) {
                if (!this.actor().canArmorChange(this._item.realItem().etypeId)) {
                    Nore.$gameMessageRogue.add(Nore.makeCannotEquipWeaponText(this.actor().equips()[this._item.realItem().etypeId]));
                    return;
                }
                SoundManager.playEquip();
                var identified = this._item.isIdentified();
                if (!identified) {
                    this.identify(this._item);
                    $gameSystem.questManager().onIdentify();
                }
                var armor = this._item.item();
                if (this._item.realItem().id == 8 && this.actor().hasAcce(221)) {
                    // 呪いの下着をふたなりちんぽでカバー
                }
                else {
                    this.actor().changeEquip(armor.etypeId, this._item);
                }
                var newDef = this.actor().def;
                var newAtk = this.actor().atk;
                if (!identified) {
                    this.checkCurseDescription();
                }
                if (this._item.realItem().id == 8 && this.actor().hasAcce(221)) {
                    this.getMessageObject().add(Nore.makeEquipCursedArmorText(this._item));
                }
                else {
                    this.getMessageObject().add(Nore.makeEquipArmorText(this._item, lastAtk, newAtk, lastDef, newDef));
                }
                if (this._item.realItem().meta['state'] > 0) {
                    var stateId = parseInt(this._item.realItem().meta['state']);
                    var state = $dataStates[stateId];
                    this.getMessageObject().add(state.message1.format(this.actor().name()));
                    var skillId = parseInt(this._item.realItem().meta['ero']);
                    this.actor().addEroAction($dataSkills[skillId], Parts.manko, null);
                    this.actor().addState(stateId);
                    this.actor().updateCursedEquip();
                }
            }
        };
        PlayerEquipRogueState.prototype.checkCurseDescription = function () {
            if (!this._item.isCursed) {
                return;
            }
            this.actor().updateBreakId();
            if (this._item.realItem().id == 8 && this.actor().hasAcce(221)) {
            }
            else {
                this.actor().addCursedEroItem(this._item);
            }
            if ($gameSwitches.value(252)) {
                return;
            }
            $gameTemp.reserveCommonEvent(170);
        };
        PlayerEquipRogueState.prototype.getMessageObject = function () {
            if ($gameMap.isRogue()) {
                return Nore.$gameMessageRogue;
            }
            else {
                return $gameMessage;
            }
        };
        PlayerEquipRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (Nore.$gameMessageRogue.isBusy()) {
                return;
            }
            //$gameMessageRogue.isNewLine = true;
            Nore.phaseManager.nextPhase();
        };
        return PlayerEquipRogueState;
    }(RogueState));
    Nore.PlayerEquipRogueState = PlayerEquipRogueState;
    var PlayerPutRogueState = /** @class */ (function (_super) {
        __extends(PlayerPutRogueState, _super);
        function PlayerPutRogueState() {
            var _this = _super.call(this) || this;
            _this._item = $gameTemp.targetItem;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerPutRogueState.prototype.start = function () {
            if (this._item.isEquip()) {
                if (this.actor().isEquipped(this._item)) {
                    if (this._item.isCursed) {
                        Nore.$gameMessageRogue.add(Nore.makeCannotDiscardEquipText(this._item));
                        return;
                    }
                    this.actor().discardEquip(this._item);
                }
            }
            $gameParty._inventory.loseItem(this._item);
            Nore.EventArranger.putItem(this._item, $gamePlayer.x, $gamePlayer.y);
            this.getMessageObject().add(Nore.makePutItemText(this._item));
        };
        PlayerPutRogueState.prototype.getMessageObject = function () {
            if (!$gameMap.isRogue()) {
                return $gameMessage;
            }
            else {
                return Nore.$gameMessageRogue;
            }
        };
        PlayerPutRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (Nore.$gameMessageRogue.isBusy()) {
                return;
            }
            //$gameMessageRogue.isNewLine = true;
            Nore.phaseManager.nextPhase();
        };
        return PlayerPutRogueState;
    }(RogueState));
    Nore.PlayerPutRogueState = PlayerPutRogueState;
    var PlayerPickupRogueState = /** @class */ (function (_super) {
        __extends(PlayerPickupRogueState, _super);
        function PlayerPickupRogueState() {
            var _this = _super.call(this) || this;
            _this._item = $gameMap.itemAt($gamePlayer.x, $gamePlayer.y);
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerPickupRogueState.prototype.start = function () {
            this.getItem();
        };
        PlayerPickupRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (Nore.$gameMessageRogue.isBusy()) {
                return;
            }
            //$gameMessageRogue.isNewLine = true;
            Nore.phaseManager.nextPhase();
        };
        return PlayerPickupRogueState;
    }(PlayerMovableRogueState));
    Nore.PlayerPickupRogueState = PlayerPickupRogueState;
    var PlayerDiscardEquipRogueState = /** @class */ (function (_super) {
        __extends(PlayerDiscardEquipRogueState, _super);
        function PlayerDiscardEquipRogueState(_slotId) {
            var _this = _super.call(this) || this;
            _this._slotId = _slotId;
            _this._item = $gameTemp.targetItem;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerDiscardEquipRogueState.prototype.start = function () {
            var lastAtk = this.actor().atk;
            var lastDef = this.actor().def;
            if (this._slotId == 0) {
                var weapon = this.actor().equips()[0];
                if (weapon && weapon.isCursed) {
                    Nore.$gameMessageRogue.add(Nore.makeCannotEquipWeaponText(weapon));
                    Nore.phaseManager.nextPhase();
                    return;
                }
                SoundManager.playEquip();
                this.actor().changeEquip(this._slotId, null);
                var newAtk = this.actor().atk;
                this.getMessageObject().add(Nore.makeDiscardEquipWeaponText(weapon, lastAtk, newAtk));
            }
            if (this._slotId >= 1) {
                p(this._slotId);
                var armor = this.actor().equips()[this._slotId];
                if (this._slotId <= 2 && armor && armor.isCursed) {
                    Nore.$gameMessageRogue.add(Nore.makeCannotEquipWeaponText(armor));
                    Nore.phaseManager.nextPhase();
                    return;
                }
                SoundManager.playEquip();
                this.actor().changeEquip(this._slotId, null);
                var newAtk = this.actor().atk;
                var newDef = this.actor().def;
                this.getMessageObject().add(Nore.makeDiscardEquipArmorText(this._item, lastAtk, newAtk, lastDef, newDef));
            }
            Nore.phaseManager.nextPhase();
        };
        PlayerDiscardEquipRogueState.prototype.getMessageObject = function () {
            if ($gameMap.isRogue()) {
                return Nore.$gameMessageRogue;
            }
            else {
                return $gameMessage;
            }
        };
        return PlayerDiscardEquipRogueState;
    }(RogueState));
    Nore.PlayerDiscardEquipRogueState = PlayerDiscardEquipRogueState;
    var PlayerDirectionRogueState = /** @class */ (function (_super) {
        __extends(PlayerDirectionRogueState, _super);
        function PlayerDirectionRogueState() {
            var _this = _super.call(this) || this;
            _this._frameCount = 0;
            _this._autoSelectRemainCount = 0;
            _this._inputQueue = [];
            return _this;
        }
        PlayerDirectionRogueState.prototype.start = function () {
            this._initialDirection = $gamePlayer.direction();
            this.spriteset().addDirectionPanel8();
            $gameTemp.infoEnemy = this.findFrontEnemy();
        };
        PlayerDirectionRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.updateAutoSelect()) {
                return;
            }
            if (!$gamePlayer.isDirectionButtonPressed()) {
                if (this._frameCount < 14 && this._initialDirection == $gamePlayer.direction()) {
                    this.autoSelect();
                }
                else {
                    this.finish();
                }
                return;
            }
            var direction = this.calcInput();
            if (direction == 0) {
                this._inputQueue = [];
            }
            else {
                switch (direction) {
                    case 1:
                    case 3:
                    case 7:
                    case 9:
                        this.changeDirection(direction);
                        break;
                    default:
                        this.checkDir4(direction);
                }
            }
            this._frameCount++;
        };
        PlayerDirectionRogueState.prototype.checkDir4 = function (direction) {
            this._inputQueue.push(direction);
            if (this._inputQueue.length >= 4) {
                for (var _i = 0, _a = this._inputQueue; _i < _a.length; _i++) {
                    var d = _a[_i];
                    if (d != direction) {
                        this._inputQueue = [];
                        return;
                    }
                }
                this.changeDirection(direction);
            }
        };
        PlayerDirectionRogueState.prototype.changeDirection = function (direction) {
            $gamePlayer.setDirection(direction);
            this.spriteset().addDirectionPanel8();
            this._inputQueue = [];
            $gameTemp.infoEnemy = this.findFrontEnemy();
        };
        PlayerDirectionRogueState.prototype.updateAutoSelect = function () {
            if (this._autoSelectRemainCount > 0) {
                this._autoSelectRemainCount--;
                if (this._autoSelectRemainCount == 0) {
                    this.finish();
                }
                return true;
            }
            return false;
        };
        PlayerDirectionRogueState.prototype.autoSelect = function () {
            var checkList;
            switch ($gamePlayer.direction()) {
                case 1:
                    checkList = [2, 3, 6, 7, 8, 9, 4];
                    break;
                case 2:
                    checkList = [3, 6, 7, 8, 9, 4, 1];
                    break;
                case 3:
                    checkList = [6, 7, 8, 9, 4, 1, 2];
                    break;
                case 6:
                    checkList = [7, 8, 9, 4, 1, 2, 3];
                    break;
                case 9:
                    checkList = [8, 7, 4, 1, 2, 3, 6];
                    break;
                case 8:
                    checkList = [7, 4, 1, 2, 3, 6, 9];
                    break;
                case 7:
                    checkList = [4, 1, 2, 3, 6, 9, 8];
                    break;
                case 4:
                    checkList = [1, 2, 3, 6, 9, 8, 7];
                    break;
            }
            if (this.autoSelectList(checkList)) {
                this._autoSelectRemainCount = 10;
            }
            else {
                this.finish();
            }
        };
        PlayerDirectionRogueState.prototype.autoSelectList = function (checkList) {
            for (var _i = 0, checkList_1 = checkList; _i < checkList_1.length; _i++) {
                var c = checkList_1[_i];
                switch (c) {
                    case 1:
                        if (Nore.EventArranger.isEnemy($gamePlayer.x - 1, $gamePlayer.y + 1)) {
                            $gamePlayer.setDirection(c);
                            this.spriteset().addDirectionPanel8();
                            return true;
                        }
                        break;
                    case 2:
                        if (Nore.EventArranger.isEnemy($gamePlayer.x, $gamePlayer.y + 1)) {
                            $gamePlayer.setDirection(c);
                            this.spriteset().addDirectionPanel8();
                            return true;
                        }
                        break;
                    case 3:
                        if (Nore.EventArranger.isEnemy($gamePlayer.x + 1, $gamePlayer.y + 1)) {
                            $gamePlayer.setDirection(c);
                            this.spriteset().addDirectionPanel8();
                            return true;
                        }
                        break;
                    case 7:
                        if (Nore.EventArranger.isEnemy($gamePlayer.x - 1, $gamePlayer.y - 1)) {
                            $gamePlayer.setDirection(c);
                            this.spriteset().addDirectionPanel8();
                            return true;
                        }
                        break;
                    case 8:
                        if (Nore.EventArranger.isEnemy($gamePlayer.x, $gamePlayer.y - 1)) {
                            $gamePlayer.setDirection(c);
                            this.spriteset().addDirectionPanel8();
                            return true;
                        }
                        break;
                    case 9:
                        if (Nore.EventArranger.isEnemy($gamePlayer.x + 1, $gamePlayer.y - 1)) {
                            $gamePlayer.setDirection(c);
                            this.spriteset().addDirectionPanel8();
                            return true;
                        }
                        break;
                    case 4:
                        if (Nore.EventArranger.isEnemy($gamePlayer.x - 1, $gamePlayer.y)) {
                            $gamePlayer.setDirection(c);
                            this.spriteset().addDirectionPanel8();
                            return true;
                        }
                        break;
                    case 6:
                        if (Nore.EventArranger.isEnemy($gamePlayer.x + 1, $gamePlayer.y)) {
                            $gamePlayer.setDirection(c);
                            this.spriteset().addDirectionPanel8();
                            return true;
                        }
                        break;
                }
            }
            return false;
        };
        PlayerDirectionRogueState.prototype.finish = function () {
            $gameTemp.infoEnemy = this.findFrontEnemy();
            this.spriteset().removeAllForecastPanel();
            Nore.phaseManager.popPhase();
        };
        return PlayerDirectionRogueState;
    }(RogueState));
    Nore.PlayerDirectionRogueState = PlayerDirectionRogueState;
    var PlayerTiltRogueState = /** @class */ (function (_super) {
        __extends(PlayerTiltRogueState, _super);
        function PlayerTiltRogueState() {
            return _super.call(this) || this;
        }
        PlayerTiltRogueState.prototype.start = function () {
            $gamePlayer.setDirection(0);
            this.spriteset().addDirectionPanel4();
        };
        PlayerTiltRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!Input.isPressed('pagedown')) {
                this.finish();
                return;
            }
            var direction = this.calcInput();
            switch (direction) {
                case 1:
                case 3:
                case 7:
                case 9:
                    Nore.phaseManager.popPhase();
                    $gamePlayer.setDirection(direction);
                    this.spriteset().addDirectionPanel4();
                    if (Input.isPressed('cancel')) {
                        $gameTemp.isFastMove = true;
                    }
                    this.move(direction);
                    break;
                default:
                    $gamePlayer.setDirection(direction);
                    this.spriteset().addDirectionPanel4();
                    break;
            }
        };
        PlayerTiltRogueState.prototype.finish = function () {
            this.spriteset().removeAllForecastPanel();
            Nore.phaseManager.popPhase();
        };
        return PlayerTiltRogueState;
    }(PlayerMovableRogueState));
    Nore.PlayerTiltRogueState = PlayerTiltRogueState;
    var PlayerFastMoveRogueState = /** @class */ (function (_super) {
        __extends(PlayerFastMoveRogueState, _super);
        function PlayerFastMoveRogueState() {
            var _this = _super.call(this) || this;
            _this._inputQueue = [];
            return _this;
        }
        PlayerFastMoveRogueState.prototype.start = function () {
            $gamePlayer.setDirection(0);
        };
        PlayerFastMoveRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!Input.isPressed('shift')) {
                this.finish();
                return;
            }
            var direction = this.calcInput();
            if (direction == 0) {
                this._inputQueue = [];
            }
            else {
                this._inputQueue.push(direction);
                if (this._inputQueue.length >= 3) {
                    for (var _i = 0, _a = this._inputQueue; _i < _a.length; _i++) {
                        var d = _a[_i];
                        if (direction != d) {
                            this._inputQueue.shift();
                            return;
                        }
                    }
                }
                Nore.phaseManager.popPhase();
                $gamePlayer.setDirection(direction);
                $gameTemp.isFastMove = true;
                this.move(direction);
                $gameTemp.infoEnemy = this.findFrontEnemy();
            }
        };
        PlayerFastMoveRogueState.prototype.finish = function () {
            Nore.phaseManager.popPhase();
        };
        return PlayerFastMoveRogueState;
    }(PlayerMovableRogueState));
    Nore.PlayerFastMoveRogueState = PlayerFastMoveRogueState;
    var PlayerThrowRogueState = /** @class */ (function (_super) {
        __extends(PlayerThrowRogueState, _super);
        function PlayerThrowRogueState() {
            var _this = _super.call(this) || this;
            _this._item = $gameTemp.targetItem;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerThrowRogueState.prototype.start = function () {
            if (this._item.isEquip()) {
                if (this._item.isCursed) {
                    if (this.actor().isEquipped(this._item)) {
                        Nore.$gameMessageRogue.add(Nore.makeCannotDiscardEquipText(this._item));
                        return;
                    }
                }
            }
            $gameParty._inventory.loseItem(this._item);
            AudioManager.playSe({ name: 'Wind7', volume: 100, pitch: 100, pan: 0 });
            var actionList = [];
            var throwAction = new Game_Action($gameActors.actor(1));
            throwAction.setSkill(6);
            var actionWithDir = new ActionWithDirection(throwAction, $gamePlayer.direction());
            actionWithDir.calcPointListByPoint($gamePlayer.x, $gamePlayer.y);
            var pointList = actionWithDir.pointList();
            var chara = this.findNearestEvent($gamePlayer, pointList);
            if (chara) {
                var distance = $gamePlayer.calcDistance(chara.x, chara.y);
                actionList.push(new Nore.ThrowAction($gamePlayer, this._item, distance));
                var action = new Game_Action($gameActors.actor(1));
                if (this._item.isWeapon() || this._item.isArmor()) {
                    action.setSkill(7);
                }
                else {
                    action.setItem(this._item.realItem().id);
                }
                actionList.push(this.createDamageActionOne(action, chara));
            }
            else {
                var range = this.calcRangeByPointList($gamePlayer, pointList);
                actionList.push(new Nore.ThrowAction($gamePlayer, this._item, range));
                var lastPoint = pointList[pointList.length - 1];
                if (lastPoint) {
                    actionList.push(new Nore.PutItemAction(this._item, lastPoint.x, lastPoint.y));
                }
                else {
                    actionList.push(new Nore.PutItemAction(this._item, $gamePlayer.x, $gamePlayer.y));
                }
            }
            Nore.phaseManager.setPhase(Nore.ActionRogueState, actionList);
        };
        PlayerThrowRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._sprite) {
                if (this._sprite.finished()) {
                    if (this._sprite.targetSpriteList) {
                        this.hitEffect(this._sprite.targetSpriteList);
                    }
                    else {
                        Nore.phaseManager.nextPhase();
                    }
                }
            }
            else {
                if (Nore.$gameMessageRogue.isBusy()) {
                    return;
                }
                Nore.phaseManager.nextPhase();
            }
        };
        PlayerThrowRogueState.prototype.hitEffect = function (spriteList) {
            if (this._item.isPotion() || this._item.isArrow()) {
                this.showEffectAnimation(spriteList, this.createItemAction(this._item));
            }
            else if (this._item.isEquip()) {
                this.showEffectAnimation(spriteList, this.createAttackAction());
            }
            else if (this._item.isRod()) {
                Nore.phaseManager.setPhase(Nore.PlayerRodHitState, this._item, spriteList, this._sprite.direction());
            }
        };
        PlayerThrowRogueState.prototype.createAttackAction = function () {
            var action = new Game_Action(this.actor(), false);
            action.setDirection($gamePlayer.direction());
            action.setSkill(2);
            var animation = $dataAnimations[128];
            action.setAnimation(animation);
            return action;
        };
        return PlayerThrowRogueState;
    }(RogueState));
    Nore.PlayerThrowRogueState = PlayerThrowRogueState;
    var AnimationRogueState = /** @class */ (function (_super) {
        __extends(AnimationRogueState, _super);
        function AnimationRogueState(_action) {
            var _this = _super.call(this) || this;
            _this._action = _action;
            _this._animeQueue = [];
            return _this;
        }
        AnimationRogueState.prototype.update = function () {
            this.updateQueue();
            if (this._animeQueue.length > 0) {
                return;
            }
            if (this._action.targetList().length == 0) {
                if (this.spriteset().isAnimationPlaying(this._action.isFastAnime())) {
                    return;
                }
                if ($gamePlayer.inAnimation()) {
                    return;
                }
                if ($gameMap.isMoving()) {
                    return;
                }
                if (this._onFinish) {
                    this._onFinish();
                    return;
                }
                Nore.phaseManager.nextPhase();
                return;
            }
            var target = this._action.nextTarget();
            if (!target) {
                return;
            }
            if (target.isEnemy()) {
                this.damageToEnemy(target);
            }
            else {
                this.damageToActor();
            }
        };
        AnimationRogueState.prototype.updateQueue = function () {
            var removed = [];
            for (var _i = 0, _a = this._animeQueue; _i < _a.length; _i++) {
                var a = _a[_i];
                if (a.update()) {
                    removed.push(a);
                }
            }
            for (var _b = 0, removed_1 = removed; _b < removed_1.length; _b++) {
                var a = removed_1[_b];
                this._animeQueue.splice(this._animeQueue.indexOf(a), 1);
            }
        };
        AnimationRogueState.prototype.damageToEnemy = function (event) {
            //p('damageToEnemy')
            var subject = $gameActors.actor(1);
            var target = null;
            if (event) {
                target = event.enemy();
                target.clearResult();
                subject.clearResult();
            }
            var action = this._action;
            action.prepare();
            var enemySprite = Nore.EventArranger.findEnemySprite(event);
            this._animeQueue.push(new DamageAnime(action, enemySprite, target, event));
            //this.showDamageAnime(event, action.animation());
            if (this._onEffect) {
                this._onEffect(event);
            }
        };
        AnimationRogueState.prototype.damageToActor = function () {
            var subject = $gameActors.actor(1);
            var target = subject;
            target.clearResult();
            subject.clearResult();
            var action = this._action;
            action.prepare();
            var playerSprite = this.findPlayerSprite();
            this._animeQueue.push(new DamageAnime(action, playerSprite, target, null));
            //this.showDamageAnimeSprite(playerSprite, action.animation());
        };
        return AnimationRogueState;
    }(RogueState));
    Nore.AnimationRogueState = AnimationRogueState;
    var BattleAction = /** @class */ (function () {
        function BattleAction(_action) {
            this._action = _action;
            this._targetList = [];
        }
        BattleAction.prototype.addTarget = function (target) {
            this._targetList.push(target);
        };
        BattleAction.prototype.targetList = function () {
            return this._targetList;
        };
        BattleAction.prototype.setTargetList = function (list) {
            this._targetList = list;
        };
        BattleAction.prototype.setOnEffect = function (f) {
            this._onEffect = f;
        };
        BattleAction.prototype.setOnFinish = function (f) {
            this._onFinish = f;
        };
        BattleAction.prototype.nextTarget = function () {
            return this._targetList.shift();
        };
        BattleAction.prototype.isFastAnime = function () {
            return this._action.isSkill() && this._action.item().id == 1;
        };
        return BattleAction;
    }());
    var DamageAnime = /** @class */ (function () {
        function DamageAnime(_action, _targetSprite, _target, _event) {
            this._action = _action;
            this._targetSprite = _targetSprite;
            this._target = _target;
            this._event = _event;
            this._wait = 0;
            var anime = this._action.animation();
            this._wait = 11;
            return;
            if (!anime) {
                this._wait = 1;
                return;
            }
            this._wait = 30;
            for (var _i = 0, _a = anime.soundTimings; _i < _a.length; _i++) {
                var timing = _a[_i];
                if (timing.se.name == 'Damage1' || timing.se.name == 'Damage2') {
                    this._wait = timing.frame;
                    break;
                }
            }
            if (this._action.wait) {
                this._wait = this._action.wait;
            }
        }
        DamageAnime.prototype.update = function () {
            this._wait--;
            if (this._wait === 0) {
                if (!this._target) {
                    return true;
                }
                this.performAction();
                return true;
            }
            return false;
        };
        DamageAnime.prototype.nextAnimationPhase = function () {
        };
        DamageAnime.prototype.performAction = function () {
            var action = this._action;
            action.prepare();
            action.apply(this._target);
            //const subject = $gameActors.actor(1);
            //subject.performAction(action);
            var result = this._target.result();
            if (result.isHit()) {
                this._targetSprite.character().push(action.direction(), action.push());
                if (this._event) {
                    this._event.onDamage(result.hpDamage);
                }
                if (this._action.rogueItem) {
                    if (!this._action.rogueItem.isIdentified()) {
                        Nore.$gameMessageRogue.add(Nore.makeIdentifyText(this._action.rogueItem));
                        this._action.rogueItem.identify();
                    }
                }
                Nore.$gameMessageRogue.add(Nore.makeHpDamageText(this._target, action));
                Nore.displayEnemyLevelUp(result);
                Nore.displayStateText(this._target);
                this.showDamageAnime();
                if (this._target.isDead()) {
                    this._target.performCollapse();
                    if (this._event) {
                        gainEnemyBonus(this._event.enemy());
                        this._event.erase();
                        Nore.EventArranger.onEnemyDead(this._event.x, this._event.y);
                    }
                }
            }
            else {
                Nore.$gameMessageRogue.add(Nore.makeMissText(this._target, action));
                this._target.performEvasion();
            }
            this._targetSprite.showDamage(this._target);
        };
        DamageAnime.prototype.showDamageAnime = function () {
            var animation;
            if (this._action.isDamage()) {
                animation = $dataAnimations[122];
            }
            else {
                animation = $dataAnimations[121];
            }
            var sprite = new Sprite_Animation();
            sprite.targetObjects = [this._targetSprite];
            sprite.setup(sprite.targetObjects, animation, false, 0, null);
            this.spriteset()._effectsContainer.addChild(sprite);
            this.spriteset()._animationSprites.push(sprite);
        };
        DamageAnime.prototype.spriteset = function () {
            return SceneManager._scene._spriteset;
        };
        return DamageAnime;
    }());
    Nore.DamageAnime = DamageAnime;
    function gainEnemyBonus(enemy) {
        if (enemy.exp() == 0) {
            return;
        }
        var text = TextManager.obtainExp.format(enemy.exp(), TextManager.exp, enemy.name());
        Nore.$gameMessageRogue.add(text);
        $gameActors.actor(1).gainExp(enemy.exp());
    }
    Nore.gainEnemyBonus = gainEnemyBonus;
    Game_Battler.prototype.hasState = function (stateId) {
        for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.id == stateId) {
                return true;
            }
        }
        return false;
    };
    Game_Battler.prototype.hasStateList = function (stateIdList) {
        for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (stateIdList.indexOf(a.id) >= 0) {
                return true;
            }
        }
        return false;
    };
    Game_Action.prototype.setAnimation = function (animation) {
        this._animation = animation;
    };
    Game_Action.prototype.animation = function () {
        if (this._animation) {
            return this._animation;
        }
        return $dataAnimations[this.item().animationId];
    };
    var MoveWaitRogueState = /** @class */ (function (_super) {
        __extends(MoveWaitRogueState, _super);
        function MoveWaitRogueState(nextPhase) {
            var _this = _super.call(this) || this;
            _this._nextPhase = nextPhase;
            return _this;
        }
        MoveWaitRogueState.prototype.update = function () {
            if ($gamePlayer.isMoving()) {
                return;
            }
            if ($gameMap.isMoving()) {
                return;
            }
            if (this.spriteset().isAnimationPlaying()) {
                return;
            }
            if (this._nextPhase) {
                Nore.phaseManager.setPhaseInstance(this._nextPhase);
            }
            else {
                Nore.phaseManager.nextPhase();
            }
            /*$gameMap.update(true);
            phaseManager.setPhase(MOVE_WAIT2);
            $gameMap.update(true);
            phaseManager.phase().update()*/
        };
        return MoveWaitRogueState;
    }(RogueState));
    Nore.MoveWaitRogueState = MoveWaitRogueState;
    var PlayerRopeRogueState = /** @class */ (function (_super) {
        __extends(PlayerRopeRogueState, _super);
        function PlayerRopeRogueState() {
            var _this = _super.call(this) || this;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerRopeRogueState.prototype.start = function () {
            $gameSwitches.setValue(52, true);
            $gameTemp.reserveCommonEvent(10);
        };
        PlayerRopeRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!$gameSwitches.value(52)) {
                Nore.phaseManager.nextPhase();
            }
        };
        return PlayerRopeRogueState;
    }(RogueState));
    Nore.PlayerRopeRogueState = PlayerRopeRogueState;
})(Nore || (Nore = {}));
var HistoryType;
(function (HistoryType) {
    HistoryType["ITEM_GET"] = "itemGet";
    HistoryType["MOVE"] = "move";
})(HistoryType || (HistoryType = {}));
var ActionHistory = /** @class */ (function () {
    function ActionHistory(_type) {
        this._type = _type;
    }
    ActionHistory.prototype.type = function () {
        return this._type;
    };
    return ActionHistory;
}());
var ItemGetActionHistory = /** @class */ (function (_super) {
    __extends(ItemGetActionHistory, _super);
    function ItemGetActionHistory(_rogueItem) {
        var _this = _super.call(this, HistoryType.ITEM_GET) || this;
        _this._rogueItem = _rogueItem;
        return _this;
    }
    ItemGetActionHistory.prototype.rogueItem = function () {
        return this._rogueItem;
    };
    return ItemGetActionHistory;
}(ActionHistory));
var MoveActionHistory = /** @class */ (function (_super) {
    __extends(MoveActionHistory, _super);
    function MoveActionHistory(_lastPoint) {
        var _this = _super.call(this, HistoryType.MOVE) || this;
        _this._lastPoint = _lastPoint;
        return _this;
    }
    MoveActionHistory.prototype.lastPoint = function () {
        return this._lastPoint;
    };
    return MoveActionHistory;
}(ActionHistory));
Sprite_Character.prototype.character = function () {
    return this._character;
};
SceneManager.updateMain = function () {
    this.updateFrameCount();
    this.updateInputData();
    this.updateEffekseer();
    this.changeScene();
    this.updateScene();
    if ($gameTemp && $gameTemp.isFastMove) {
        this.updateScene();
        this.updateScene();
        this.updateScene();
        this.updateScene();
        this.updateScene();
        this.updateScene();
    }
};
