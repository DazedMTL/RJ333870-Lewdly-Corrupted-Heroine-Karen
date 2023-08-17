/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
    Game_Event.prototype.isDoubleSpeed = function () {
        var enemy = this.enemy();
        if (enemy) {
            return enemy.enemy().meta['２倍速'];
        }
        return false;
    };
    function isEroActionValid(skill) {
        var actor = $gameActors.actor(1);
        var breakId = parseInt(skill.meta['break']);
        if (breakId > 0) {
            if (actor.breakId < breakId) {
                return false;
            }
        }
        var stateId = parseInt(skill.meta['state']);
        if (stateId > 0) {
            if (!actor.hasState(stateId)) {
                return false;
            }
        }
        var notStateId = parseInt(skill.meta['notState']);
        if (notStateId > 0) {
            if (actor.hasState(notStateId)) {
                return false;
            }
        }
        if (skill.meta['defeat']) {
            if (!$gamePlayer.isDefeat()) {
                return false;
            }
        }
        return true;
    }
    Game_Enemy.prototype.isActionValid = function (actionWithDir, event) {
        //p(action)
        var action = actionWithDir.action();
        var skill = $dataSkills[action.skillId];
        if (skill.meta['ero']) {
            if (!isEroActionValid(skill)) {
                return false;
            }
        }
        if ($gamePlayer.isDefeat()) {
            // 敗北中
            if ($gamePlayer.calcDistance(event.x, event.y) != 1) {
                return false;
            }
            if (skill.meta['ero']) {
                return this.meetsCondition(action) && this.canUse(skill);
            }
            else {
                return false;
            }
        }
        else {
        }
        if (skill.meta['arrow']) {
            if (event._room != $gamePlayer.room) {
                return false;
            }
            //p($gamePlayer.calcDistance(event.x, event.y))
            if ($gamePlayer.calcDistance(event.x, event.y) <= 2) {
                return false;
            }
            var range = parseInt(skill.meta['range']);
            if (!this.isDirectionValid(event.x, event.y, actionWithDir.direction(), range, 1)) {
                return false;
            }
            //p(actionWithDir);
        }
        else if (skill.meta['range']) {
            var range = parseInt(skill.meta['range']);
            if (skill.meta['direction']) {
                if (!this.isDirectionValid(event.x, event.y, actionWithDir.direction(), range, 1)) {
                    return false;
                }
            }
            if (range == 1) {
                if ($gamePlayer.calcDistance(event.x, event.y) != 1) {
                    return false;
                }
            }
        }
        else {
        }
        return (this.meetsCondition(action) && this.canUse(skill));
    };
    Game_Enemy.prototype.isDirectionValid = function (x, y, direction, range, width) {
        var nextX = x;
        var nextY = y;
        for (var i = 0; i < range; i++) {
            switch (direction) {
                case 1:
                    nextX--;
                    nextY++;
                    break;
                case 3:
                    nextX++;
                    nextY++;
                    break;
                case 7:
                    nextX--;
                    nextY--;
                    break;
                case 9:
                    nextX++;
                    nextY--;
                    break;
                case 8:
                    nextY--;
                    break;
                case 4:
                    nextX--;
                    break;
                case 2:
                    nextY++;
                    break;
                case 6:
                    nextX++;
                    break;
            }
            if (!$gameMap.isFlyable(nextX, nextY)) {
                return false;
            }
            //p($gamePlayer.x + ' ' + nextX)
            if ($gamePlayer.x == nextX && $gamePlayer.y == nextY) {
                return true;
            }
        }
        return false;
    };
    function isRangeMatch(enemyX, enemyY, playerX, playerY, range) {
        return Math.abs(enemyY - playerY) <= range && Math.abs(enemyX - playerX) <= range;
    }
    Game_Character.prototype.canAttackRange1 = function (x, y) {
        return this.canPassWithoutCollide(this.x, this.y, this.calcDir(x, y));
    };
    Game_Enemy.prototype.selectAllActions = function (actionList) {
        var eroRate = parseInt(this.enemy().meta['eroRate']);
        var isEro = false;
        if (eroRate > 0) {
            isEro = Math.randomInt(100) < eroRate;
        }
        if ($gamePlayer.isDefeat()) {
            isEro = true;
        }
        var validActionList = [];
        for (var _i = 0, actionList_1 = actionList; _i < actionList_1.length; _i++) {
            var action = actionList_1[_i];
            if (isEro && action.isEro()) {
                validActionList.push(action);
            }
            if (!isEro && !action.isEro()) {
                validActionList.push(action);
            }
        }
        var ratingMax = Math.max.apply(Math, validActionList.map(function (a) { return a.rating; }));
        var ratingZero = ratingMax - 3;
        validActionList = validActionList.filter(function (a) { return a.rating > ratingZero; });
        for (var i = 0; i < this.numActions(); i++) {
            //p(this.selectAction(validActionList, ratingZero))
            this.action(i).setEnemyAction(this.selectAction(validActionList, ratingZero));
        }
    };
})(Nore || (Nore = {}));
Game_Enemy.prototype.makeActions = function (event) {
    var _this = this;
    Game_Battler.prototype.makeActions.call(this);
    var dirList = [2, 3, 6, 9, 8, 7, 4, 1];
    if (!CAN_8_MOVE) {
        dirList = [2, 6, 8, 4];
    }
    if (this.numActions() > 0) {
        var dirActionList = [];
        for (var _i = 0, _a = this.enemy().actions; _i < _a.length; _i++) {
            var action = _a[_i];
            var skill = $dataSkills[action.skillId];
            if (skill.meta['direction']) {
                for (var _b = 0, dirList_1 = dirList; _b < dirList_1.length; _b++) {
                    var dir = dirList_1[_b];
                    dirActionList.push(new ActionWithDirection(action, dir));
                }
            }
            else {
                dirActionList.push(new ActionWithDirection(action, 0));
            }
        }
        var actionList = dirActionList.filter(function (a) {
            return _this.isActionValid(a, event);
        });
        if (actionList.length > 0) {
            this.selectAllActions(actionList);
        }
    }
    this.setActionState("waiting");
};
var _Game_Action_prototype_setEnemyAction = Game_Action.prototype.setEnemyAction;
Game_Action.prototype.setEnemyAction = function (action) {
    _Game_Action_prototype_setEnemyAction.call(this, action);
    this._enemyAction = action;
};
var _Game_Action_prototype_clear = Game_Action.prototype.clear;
Game_Action.prototype.clear = function () {
    _Game_Action_prototype_clear.call(this);
    this._enemyAction = null;
};
Game_Action.prototype.enemyAction = function () {
    return this._enemyAction;
};
Game_Enemy.prototype.makeNormalAttackAction = function () {
    this.clearActions();
    if (this.canMove()) {
        this._actions = [];
        var action = new Game_Action(this);
        action.setSkill(1);
        this._actions.push(action);
    }
};
var ActionWithDirection = /** @class */ (function () {
    function ActionWithDirection(_action, _direction) {
        this._action = _action;
        this._direction = _direction;
        this._posList = [];
    }
    ActionWithDirection.prototype.action = function () {
        return this._action;
    };
    ActionWithDirection.prototype.direction = function () {
        return this._direction;
    };
    ActionWithDirection.prototype.isPlayerContains = function () {
        for (var _i = 0, _a = this._posList; _i < _a.length; _i++) {
            var pos = _a[_i];
            if ($gamePlayer.x == pos.x && $gamePlayer.y == pos.y) {
                return true;
            }
        }
        return false;
    };
    ActionWithDirection.prototype.calcPointList = function (event) {
        return this.calcPointListByPoint(event.x, event.y);
    };
    ActionWithDirection.prototype.calcPointListByPoint = function (x, y) {
        var nextX = x;
        var nextY = y;
        var item = $dataSkills[this._action.skillId] || this._action.item();
        var isDirectionAll = item.meta['directionAll'];
        var range = parseInt(item.meta['range']) || parseInt(item.meta['rangeMax']);
        if (isDirectionAll) {
            return this.calcDirectionAllPoint(x, y, range);
        }
        var width = parseInt(item.meta['width']);
        for (var i = 0; i < range; i++) {
            switch (this.direction()) {
                case 1:
                    nextX--;
                    nextY++;
                    break;
                case 3:
                    nextX++;
                    nextY++;
                    break;
                case 7:
                    nextX--;
                    nextY--;
                    break;
                case 9:
                    nextX++;
                    nextY--;
                    break;
                case 8:
                    nextY--;
                    break;
                case 4:
                    nextX--;
                    break;
                case 2:
                    nextY++;
                    break;
                case 6:
                    nextX++;
                    break;
            }
            if (width > 1) {
                this.addWidePoint(nextX, nextY, width);
            }
            if (!$gameMap.isFlyable(nextX, nextY)) {
                break;
            }
            this.addPoint(nextX, nextY);
        }
    };
    ActionWithDirection.prototype.calcDirectionAllPoint = function (x, y, range) {
        var array = [];
        for (var i = -range; i <= range; i++) {
            for (var k = -range; k <= range; k++) {
                if (i == 0 && k == 0) {
                    continue;
                }
                array.push(new Point(x + i, y + k));
            }
        }
        array.sort(function (a, b) {
            var da = Math.abs(a.x - x) + Math.abs(a.y - y);
            var db = Math.abs(b.x - x) + Math.abs(b.y - y);
            return da - db;
        });
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var point = array_1[_i];
            this.addPoint(point.x, point.y);
        }
    };
    ActionWithDirection.prototype.addWidePoint = function (x, y, width) {
        var w = (width - 1) / 2;
        for (var i = 1; i <= w; i++) {
            switch (this.direction()) {
                case 1:
                    this.addPoint(x, y - i);
                    this.addPoint(x + i, y);
                    break;
                case 2:
                    this.addPoint(x - i, y);
                    this.addPoint(x + i, y);
                    break;
                case 3:
                    this.addPoint(x - i, y);
                    this.addPoint(x, y - i);
                    break;
                case 4:
                    this.addPoint(x, y + 1);
                    this.addPoint(x, y - i);
                    break;
                case 6:
                    this.addPoint(x, y - i);
                    this.addPoint(x, y + i);
                    break;
                case 7:
                    this.addPoint(x + i, y);
                    this.addPoint(x, y + i);
                    break;
                case 8:
                    this.addPoint(x - i, y);
                    this.addPoint(x + i, y);
                    break;
                case 9:
                    this.addPoint(x - i, y);
                    this.addPoint(x, y + 1);
                    break;
            }
        }
    };
    ActionWithDirection.prototype.addPoint = function (x, y) {
        this._posList.push(new Point(x, y));
    };
    ActionWithDirection.prototype.pointList = function () {
        return this._posList;
    };
    ActionWithDirection.prototype.isEro = function () {
        var item = $dataSkills[this._action.skillId] || this._action.item();
        return item.meta['ero'];
    };
    Object.defineProperty(ActionWithDirection.prototype, "rating", {
        get: function () {
            return this._action.rating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionWithDirection.prototype, "skillId", {
        get: function () {
            return this._action.skillId;
        },
        enumerable: true,
        configurable: true
    });
    return ActionWithDirection;
}());
Game_Character.prototype.push = function (direction, distance) {
    var point = new Point(this.x, this.y);
    for (var i = 0; i < distance; i++) {
        var toPoint = Nore.calcPosByDirection(point.x, point.y, direction);
        if (Nore.EventArranger.canEnemyMove(this, point.x, point.y, toPoint.x, toPoint.y, false)) {
            point = toPoint;
            this._x = (point.x);
            this._y = (point.y);
        }
        else {
            return;
        }
    }
};
