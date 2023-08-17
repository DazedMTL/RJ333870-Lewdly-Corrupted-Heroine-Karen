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
var MoveType;
(function (MoveType) {
    MoveType["CHASE"] = "chase";
    MoveType["WANDER"] = "wander";
    MoveType["WAIT"] = "wait";
    MoveType["SLEEP"] = "sleep";
    MoveType["NONE"] = "none";
    MoveType["WAKEUP"] = "wakeup";
})(MoveType || (MoveType = {}));
var _Sprite_Character_prototype_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function () {
    _Sprite_Character_prototype_update.call(this);
    if (this.character().enemy) {
        if (this._stateIconSprite) {
            if (!this.character().isSleep()) {
                this.removeChild(this._stateIconSprite);
                this._stateIconSprite = null;
            }
        }
        else {
            if (this.character().isSleep()) {
                this._stateIconSprite = new Sprite_StateOverlaySleep();
                this.addChild(this._stateIconSprite);
            }
        }
    }
};
var Sprite_StateOverlaySleep = /** @class */ (function (_super) {
    __extends(Sprite_StateOverlaySleep, _super);
    function Sprite_StateOverlaySleep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sprite_StateOverlaySleep.prototype.update = function () {
        _super.prototype.update.call(this);
        this.scale.x = 0.6;
        this.scale.y = 0.6;
        this.y = -10;
    };
    ;
    Sprite_StateOverlaySleep.prototype.updatePattern = function () {
        this._pattern++;
        this._pattern %= 8;
        this._overlayIndex = 7;
    };
    return Sprite_StateOverlaySleep;
}(Sprite_StateOverlay));
Game_Character.prototype.isObject = function () {
    return false;
};
var Game_RogueEnemy = /** @class */ (function (_super) {
    __extends(Game_RogueEnemy, _super);
    function Game_RogueEnemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Game_RogueEnemy.prototype, "stun", {
        get: function () {
            return this._stun;
        },
        enumerable: true,
        configurable: true
    });
    Game_RogueEnemy.prototype.initAfter = function () {
        this._stun = this.luk;
    };
    Game_RogueEnemy.prototype.gainHp = function (value) {
        _super.prototype.gainHp.call(this, value);
        if (value < 0) {
            this._stun--;
        }
    };
    Game_RogueEnemy.prototype.toutekiRate = function () {
        return 1;
    };
    Game_RogueEnemy.prototype.resetStateCounts = function (stateId) {
        var state = $dataStates[stateId];
        var variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
        var turns = state.minTurns + Math.randomInt(variance);
        if (state.meta['potion']) {
            turns += $gameParty.kusuriTurn();
        }
        if (state.meta['rod']) {
            turns += $gameParty.tueTurn();
        }
        if (this.isBoss()) {
            this._stateTurns[stateId] = Math.floor(turns / 2);
        }
        else {
            this._stateTurns[stateId] = turns;
        }
    };
    return Game_RogueEnemy;
}(Game_Enemy));
Game_Event.prototype.enemy = function () {
    return null;
};
var Game_EnemyEvent = /** @class */ (function (_super) {
    __extends(Game_EnemyEvent, _super);
    function Game_EnemyEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._lastPosition = new Point(-1, -1);
        return _this;
    }
    Game_EnemyEvent.prototype.initialize = function (mapId, eventId, event) {
        this._mapId = mapId;
        this._eventId = eventId;
        this._event = event;
        _super.prototype.initialize.call(this, mapId, eventId);
        this.locate(this.event().x, this.event().y);
        this.refresh();
        this._moveType = this.initMoveType();
    };
    Game_EnemyEvent.prototype.isObject = function () {
        if (!this.enemy()) {
            return false;
        }
        return this.enemy().enemy().meta['object'] != null;
    };
    Game_EnemyEvent.prototype.isBoss = function () {
        return this.enemy().isBoss();
    };
    Game_EnemyEvent.prototype.canMove = function () {
        if (this.isObject()) {
            return false;
        }
        return this.enemy().canMove();
    };
    Game_EnemyEvent.prototype.isDirectionFixed = function () {
        if (this._characterName.includes('$BigMonster')) {
            return true;
        }
        return _super.prototype.isDirectionFixed.call(this);
    };
    Game_EnemyEvent.prototype.initMoveType = function () {
        if (this._event.meta['stair']) {
            return;
        }
        if (this._event.meta['treasure']) {
            return;
        }
        if (this._event.meta['door']) {
            return;
        }
        if (this.isObject()) {
            return;
        }
        if ($gameSwitches.value(8)) {
            // ボスフロア
            return MoveType.WAIT;
        }
        if ($gameMap.isFixedFloor()) {
            return MoveType.WAIT;
        }
        switch (Math.randomInt(12)) {
            case 0: return MoveType.WAIT;
            case 1: return MoveType.WAIT;
            case 2: return MoveType.SLEEP;
            default:
                return MoveType.WAIT;
        }
    };
    Game_EnemyEvent.prototype.characterName = function () {
        if (this.enemy()) {
            if (this._erased) {
                return '';
            }
            if ($gameSwitches.value(15)) {
                this.erase();
                return '';
            }
            if (this.enemy().isDead()) {
                //    return '';
            }
            return this.enemy().enemy().meta['characterName'];
        }
        return _super.prototype.characterName.call(this);
    };
    Game_EnemyEvent.prototype.characterIndex = function () {
        if (this.enemy()) {
            return this.enemy().enemy().meta['characterIndex'];
        }
        return _super.prototype.characterIndex.call(this);
    };
    Game_EnemyEvent.prototype.event = function () {
        return this._event;
    };
    Game_EnemyEvent.prototype.isSleep = function () {
        return this._moveType == MoveType.SLEEP;
    };
    Game_EnemyEvent.prototype.isWait = function () {
        return this._moveType == MoveType.WAIT;
    };
    Game_EnemyEvent.prototype.isWakeUp = function () {
        return this._moveType == MoveType.WAKEUP;
    };
    Game_EnemyEvent.prototype.setup = function () {
        if (this._nextPoint) {
            if (this._nextPoint.equals(this.point())) {
                this._nextPoint = null;
            }
        }
        this._moveSucceeded = false;
        this._room = $gameMap.getRoom(this.x, this.y);
    };
    Game_EnemyEvent.prototype.onTurnStart = function () {
        this.enemy().regenerateAll();
        if (this.enemy().isDead()) {
            this.enemy().performCollapse();
            if (!this.event().meta['notErase']) {
                this.erase();
            }
            $gamePlayer.room.onEnemyDead(this.x, this.y);
            Nore.EventArranger.onEnemyDead(this.x, this.y);
            if (this.enemy().isBoss()) {
                $gamePlayer.room.removeAllEnemy(true);
            }
        }
    };
    Game_EnemyEvent.prototype.onTurnEnd = function () {
        this.enemy().updateStateTurns();
        this.enemy().removeStatesAuto(1);
    };
    Game_EnemyEvent.prototype.onDamage = function (hpDamage) {
        if (hpDamage > 0) {
            if (this.isSleep()) {
                this._moveType = MoveType.CHASE;
            }
        }
    };
    Game_EnemyEvent.prototype.move = function () {
        if (this._moveSucceeded) {
            return MoveType.NONE;
        }
        //p(this._moveType)
        //this.updateMoveType();
        switch (this._moveType) {
            case MoveType.WAIT:
                this.moveWait();
                break;
            case MoveType.WANDER:
                this.moveWander();
                break;
            case MoveType.CHASE:
                this.moveChase();
                break;
            case MoveType.SLEEP:
                this.moveSleep();
                break;
        }
    };
    Game_EnemyEvent.prototype.moveConfuse = function (d) {
        this.moveStraight(d);
        return this.isMovementSucceeded();
    };
    Game_EnemyEvent.prototype.updateMoveType = function () {
        //p('updateMoveType')
        switch (this._moveType) {
            case MoveType.SLEEP:
                //p($gamePlayer.distancePoint(this.point()))
                //if ($gamePlayer.isContact(this.x, this.y) || $gamePlayer.isEnterRoom) {
                if ($gamePlayer.isContact(this.x, this.y)) {
                    if (Math.randomInt(2) === 1) {
                        this._moveType = MoveType.WAKEUP;
                    }
                }
                else {
                    if ($gamePlayer.room == this._room) {
                        if (Math.randomInt(3) === 1) {
                            this._moveType = MoveType.WAKEUP;
                        }
                    }
                }
                break;
            case MoveType.WANDER:
                if ($gamePlayer.room && this._room) {
                    if ($gamePlayer.room == this._room) {
                        this._moveType = MoveType.CHASE;
                    }
                }
                if ($gamePlayer.distancePoint(this.point()) <= 2) {
                    this._moveType = MoveType.CHASE;
                }
                break;
            case MoveType.WAIT:
                if ($gamePlayer.room && this._room) {
                    if ($gamePlayer.room == this._room) {
                        $gameTemp.requestBalloon(this, 1);
                        this._moveType = MoveType.WAKEUP;
                    }
                }
                /*if ($gamePlayer.room && this._room) {
                    if ($gamePlayer.room == this._room) {
                        this._moveType = MoveType.CHASE;
                    }
                }
                if ($gamePlayer.distancePoint(this.point()) <= 2) {
                    this._moveType = MoveType.CHASE;
                }*/
                break;
            case MoveType.WAKEUP:
                this.r;
                this._moveType = MoveType.CHASE;
                break;
        }
    };
    Game_EnemyEvent.prototype.moveWait = function () {
    };
    Game_EnemyEvent.prototype.moveSleep = function () {
    };
    Game_EnemyEvent.prototype.moveChase = function () {
        this._nextPoint = new Point($gamePlayer.x, $gamePlayer.y);
        this.moveToNextPoint();
    };
    Game_EnemyEvent.prototype.moveWander = function () {
        if (!this._nextPoint) {
            this.createNextPoint();
        }
        this.moveToNextPoint();
    };
    Game_EnemyEvent.prototype.moveToNextPoint = function () {
        if (!this._nextPoint) {
            return;
        }
        this._debugPoint = this._nextPoint;
        var d = this.choiceMoveDirection();
        this._lastPosition = new Point(this.x, this.y);
        //p('[' + this.x + " " + this.y + '] → [' + this._nextPoint.x + " " + this._nextPoint.y + '] ' + d)
        if (d) {
            this.moveStraight(d);
            this._moveSucceeded = this.isMovementSucceeded();
        }
    };
    Game_EnemyEvent.prototype.choiceMoveDirection = function () {
        var dijkstra = new Dijkstra(this, new Point(this._x, this._y), this._nextPoint);
        return dijkstra.start();
    };
    Game_EnemyEvent.prototype.createNextPoint = function () {
        if (this._room) {
            if (this.isExit()) {
                if (this.isEnterRoom()) {
                    //p('isExit createNextExit')
                    this.createNextExit();
                }
                else {
                    //p('isExit createExitRoom')
                    this.createExitRoom();
                }
            }
            else {
                //p('createNextExit')
                this.createNextExit();
            }
        }
        else {
            //p('createNextPassage')
            this.createNextPassage();
        }
    };
    Game_EnemyEvent.prototype.point = function () {
        return new Point(this.x, this.y);
    };
    Game_EnemyEvent.prototype.isExit = function () {
        return this._room.isExit(this.x, this.y);
    };
    Game_EnemyEvent.prototype.isEnterRoom = function () {
        return !$gameMap.isRoom(this._lastPosition.x, this._lastPosition.y);
    };
    Game_EnemyEvent.prototype.createNextExit = function () {
        this._nextPoint = this._room.randomExit(this.point());
    };
    Game_EnemyEvent.prototype.createExitRoom = function () {
        this._nextPoint = null;
        var candidates = [new Point(this.x - 1, this.y),
        new Point(this.x + 1, this.y),
        new Point(this.x, this.y - 1),
        new Point(this.x, this.y + 1)
        ];
        for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
            var c = candidates_1[_i];
            if (c.equals(this._lastPosition)) {
                continue;
            }
            if ($gameMap.isRoom(c.x, c.y)) {
                continue;
            }
            if (!$gameMap.isFloor(c.x, c.y)) {
                continue;
            }
            this._nextPoint = new Point(c.x, c.y);
            return;
        }
    };
    Game_EnemyEvent.prototype.createNextPassage = function () {
        this._nextPoint = null;
        if (this.canPass(this.x, this.y, this.direction())) {
            this._nextPoint = this.nextPos();
            return;
        }
        var candidates = [new Point(this.x - 1, this.y),
        new Point(this.x + 1, this.y),
        new Point(this.x, this.y - 1),
        new Point(this.x, this.y + 1)
        ];
        var lastPosition = this._lastPosition;
        candidates = candidates.sort(function (a, b) {
            if (a.x == lastPosition.x) {
                return -1;
            }
            if (b.x == lastPosition.x) {
                return 1;
            }
            if (a.y == lastPosition.y) {
                return -1;
            }
            if (b.y == lastPosition.y) {
                return 1;
            }
            return 1;
        });
        for (var _i = 0, candidates_2 = candidates; _i < candidates_2.length; _i++) {
            var c = candidates_2[_i];
            if (c.equals(this._lastPosition)) {
                continue;
            }
            if (!$gameMap.isFloor(c.x, c.y)) {
                continue;
            }
            this._nextPoint = new Point(c.x, c.y);
            return;
        }
    };
    Game_EnemyEvent.prototype.hasStepAnime = function () {
        if (this._moveType == MoveType.SLEEP) {
            return false;
        }
        if (this.enemy() && this.enemy().enemy().meta['object']) {
            return false;
        }
        if (this.enemy() && !this.enemy().canMove()) {
            return false;
        }
        return _super.prototype.hasStepAnime.call(this);
    };
    Game_EnemyEvent.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        if (this._enemy) {
            return;
        }
        var enemy = this.event().meta['enemy'];
        if (enemy) {
            /*if (parseInt(enemy) == 111) {
                if ($gameSwitches.value(997)) {
                    enemy = 112;
                }
            }*/
            this._enemy = new Game_RogueEnemy(parseInt(enemy), 0, 0);
            this._enemy.eventId = this.eventId();
            this._enemy.initAfter();
        }
    };
    Game_EnemyEvent.prototype.enemy = function () {
        return this._enemy;
    };
    Game_EnemyEvent.prototype.isDashing = function () {
        return $gamePlayer.isDashing();
    };
    return Game_EnemyEvent;
}(Game_Event));
var DikPoint = /** @class */ (function () {
    function DikPoint(_x, _y) {
        this._x = _x;
        this._y = _y;
        this._d = 9999;
    }
    DikPoint.prototype.x = function () {
        return this._x;
    };
    DikPoint.prototype.y = function () {
        return this._y;
    };
    DikPoint.prototype.d = function () {
        return this._d;
    };
    DikPoint.prototype.setD = function (d) {
        this._d = d;
    };
    DikPoint.prototype.setBefore = function (p) {
        this._before = p;
    };
    DikPoint.prototype.before = function () {
        return this._before;
    };
    return DikPoint;
}());
var Dijkstra = /** @class */ (function () {
    function Dijkstra(_event, _current, _goal) {
        this._event = _event;
        this._current = _current;
        this._goal = _goal;
        this._start = new Point(this._current.x, this._current.y);
    }
    Dijkstra.prototype.createMap = function () {
        this._floorMap = [];
        for (var x = -20; x < 20; x++) {
            var xx = this._current.x + x;
            if (xx < 0) {
                continue;
            }
            if (xx >= $gameMap.width()) {
                continue;
            }
            var list = [];
            this._floorMap[xx] = list;
            for (var y = -20; y < 20; y++) {
                var yy = this._current.y + y;
                if (yy < 0) {
                    continue;
                }
                if (yy >= $gameMap.height()) {
                    continue;
                }
                if ($gameMap.isBlank(xx, yy)) {
                    continue;
                }
                list[yy] = new DikPoint(xx, yy);
            }
        }
        var gx = this._goal.x;
        var gy = this._goal.y;
        this._floorMap[gx] = this._floorMap[gx] || [];
        this._floorMap[gx][gy] = this._floorMap[gx][gy] || new DikPoint(gx, gy);
        //p(this._floorMap)
    };
    Dijkstra.prototype.start = function () {
        this.createMap();
        var start = this._floorMap[this._current.x][this._current.y];
        var goal = this._floorMap[this._goal.x][this._goal.y];
        if (!start) {
            //p(this)
            return 0;
        }
        start.setD(0);
        this._checkList = [start];
        while (this._checkList.length > 0) {
            this.run();
        }
        var point = goal;
        var route = [];
        while (point) {
            route.push(point);
            point = point.before();
        }
        //this.showDebug();
        //p(route)
        var next = route[route.length - 2];
        if (!next) {
            return 0;
        }
        if (this._current.x < next.x()) {
            if (this._current.y < next.y()) {
                return 3;
            }
            if (this._current.y > next.y()) {
                return 9;
            }
            return 6;
        }
        if (this._current.x > next.x()) {
            if (this._current.y < next.y()) {
                return 1;
            }
            if (this._current.y > next.y()) {
                return 7;
            }
            return 4;
        }
        if (this._current.y < next.y()) {
            return 2;
        }
        if (this._current.y > next.y()) {
            return 8;
        }
        return 0;
    };
    Dijkstra.prototype.run = function () {
        var p = this._checkList.shift();
        var list = [
            this.findPoint(p.x() - 1, p.y() - 1),
            this.findPoint(p.x() - 1, p.y() + 1),
            this.findPoint(p.x() + 1, p.y() - 1),
            this.findPoint(p.x() + 1, p.y() + 1),
            this.findPoint(p.x() - 1, p.y()),
            this.findPoint(p.x() + 1, p.y()),
            this.findPoint(p.x(), p.y() - 1),
            this.findPoint(p.x(), p.y() + 1)
        ];
        if (!CAN_8_MOVE) {
            list = [
                this.findPoint(p.x() - 1, p.y()),
                this.findPoint(p.x() + 1, p.y()),
                this.findPoint(p.x(), p.y() - 1),
                this.findPoint(p.x(), p.y() + 1)
            ];
        }
        var dBase = p.d() + 10;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var n = list_1[_i];
            if (!n) {
                continue;
            }
            var d = dBase;
            var isGoal = this._goal.x == n.x() && this._goal.y == n.y();
            if (!Nore.EventArranger.canEnemyMove(this._event, p.x(), p.y(), n.x(), n.y(), isGoal)) {
                if (Nore.EventArranger.canEnemyMove(this._event, p.x(), p.y(), n.x(), n.y(), true)) {
                    d += 200;
                }
                else {
                    continue;
                }
            }
            if (this.isOutOfRoute(n)) {
                d += 5;
            }
            if (this.isWrongDirection(p, n, this._goal)) {
                d += 5;
            }
            if (n.d() > d) {
                n.setD(d);
                n.setBefore(p);
                this._checkList.push(n);
                if (this._goal.x == n.x() && this._goal.y == n.y()) {
                    this._checkList = [];
                    return;
                }
            }
        }
        this._checkList = this._checkList.sort(function (a, b) {
            return a.d() - b.d();
        });
    };
    Dijkstra.prototype.isWrongDirection = function (from, to, goal) {
        var difX = Math.abs(goal.x - from.x());
        var difY = Math.abs(goal.y - from.y());
        if (difX == difY) {
            return Math.randomInt(2) == 0;
        }
        if (difX > difY) {
            return from.x() == to.x();
        }
        else {
            return from.y() == to.y();
        }
    };
    Dijkstra.prototype.isOutOfRoute = function (point) {
        var minX = Math.min(this._start.x, this._goal.x);
        var maxX = Math.max(this._start.x, this._goal.x);
        var minY = Math.min(this._start.y, this._goal.y);
        var maxY = Math.max(this._start.y, this._goal.y);
        if (point.x() < minX) {
            return true;
        }
        if (point.x() > maxX) {
            return true;
        }
        if (point.y() < minY) {
            return true;
        }
        if (point.y() > maxY) {
            return true;
        }
        return false;
    };
    Dijkstra.prototype.showDebug = function () {
        for (var _i = 0, _a = this._floorMap; _i < _a.length; _i++) {
            var list = _a[_i];
            if (!list) {
                continue;
            }
            for (var _b = 0, list_2 = list; _b < list_2.length; _b++) {
                var pos = list_2[_b];
                if (pos) {
                    p(pos.x() + '_' + pos.y() + ' ' + pos.d());
                }
            }
        }
    };
    Dijkstra.prototype.findPoint = function (x, y) {
        if (!this._floorMap[x]) {
            return null;
        }
        return this._floorMap[x][y];
    };
    return Dijkstra;
}());
Game_Character.prototype.blowAway = function (d) {
    this.setMovementSuccess(this.canPass(this._x, this._y, d));
    if (this.isMovementSucceeded()) {
        this._x = $gameMap.roundXWithDirection(this._x, d);
        this._y = $gameMap.roundYWithDirection(this._y, d);
        //this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
        //this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
        //this.increaseSteps();
    }
    else {
    }
};
