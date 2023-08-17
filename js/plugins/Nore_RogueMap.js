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
var _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
    _DataManager_createGameObjects.call(this);
    $gameMap = new Game_RogueMap();
    $gameMinimap = new Game_MiniMap();
};
var Game_RogueMap = /** @class */ (function (_super) {
    __extends(Game_RogueMap, _super);
    function Game_RogueMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._rooms = [];
        _this._bossList = [];
        return _this;
    }
    Game_RogueMap.prototype.setup = function (mapId) {
        this._rooms = [];
        this._bossList = [];
        _super.prototype.setup.call(this, mapId);
        if (!this.isRogue()) {
            return;
        }
        $gameMinimap.setup(this);
        if (this.isFixedFloor()) {
            this.initRooms();
        }
    };
    Game_RogueMap.prototype.isAllBossDefeated = function () {
        for (var _i = 0, _a = this._bossList; _i < _a.length; _i++) {
            var b = _a[_i];
            if (!b.isDead()) {
                return false;
            }
        }
        return true;
    };
    Game_RogueMap.prototype.setupEvents = function () {
        if (!this.isRogue()) {
            _super.prototype.setupEvents.call(this);
        }
    };
    Game_RogueMap.prototype.setupRogueEvents = function () {
        var placer;
        if ($gameMap.isFixedFloor()) {
            placer = new FixedEnemyEventPlacer(this, $dataMap.events.filter(function (event) { return !!event; }));
        }
        else {
            placer = new EnemyEventPlacer(this, $dataMap.events.filter(function (event) { return !!event; }));
        }
        this._events = [];
        this._commonEvents = [];
        for (var _i = 0, _a = placer.getAllEvents(); _i < _a.length; _i++) {
            var event_1 = _a[_i];
            this._events[event_1.eventId()] = event_1;
        }
        for (var _b = 0, _c = this.parallelCommonEvents(); _b < _c.length; _b++) {
            var commonEvent = _c[_b];
            this._commonEvents.push(new Game_CommonEvent(commonEvent.id));
        }
        this.refreshTileEvents();
        this.initBossFloor();
    };
    Game_RogueMap.prototype.initRooms = function () {
        this._rooms = [];
        var regionMap = {};
        var regionExitMap = {};
        var w = this.width();
        var h = this.height();
        for (var x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                var regionId = this.regionId(x, y);
                if (regionId == 0) {
                    continue;
                }
                if (regionId > 100) {
                    regionExitMap[regionId] = regionExitMap[regionId] || [];
                    regionExitMap[regionId].push(new Point(x, y));
                    return;
                }
                if (regionMap[regionId]) {
                    var room_1 = regionMap[regionId];
                    room_1.add(x, y);
                    continue;
                }
                var room = new Game_Room(new RegionArea(regionId));
                regionMap[regionId] = room;
                this._rooms.push(room);
            }
        }
        /*for (const regionId in regionExitMap) {
            const room: Game_Room = regionMap[parseInt(regionId) - 100];
            if (room) {
                for (const point of regionMap[regionId]) {
                    room.addExitPoint(point.x, point.y);
                }
            }
        }*/
    };
    Game_RogueMap.prototype.initBossFloor = function () {
        this._bossList = this.findBossList();
    };
    Game_RogueMap.prototype.isBossFloor = function () {
        return this._bossList.length > 0 && $gameSwitches.value(8);
    };
    Game_RogueMap.prototype.boss = function () {
        if (this._bossList.length > 0) {
            return this._bossList[0];
        }
        return null;
    };
    Game_RogueMap.prototype.boss2 = function () {
        if (this._bossList.length > 1) {
            return this._bossList[1];
        }
        return null;
    };
    Game_RogueMap.prototype.bossList = function () {
        return this._bossList;
    };
    Game_RogueMap.prototype.findBossList = function () {
        var ret = [];
        for (var _i = 0, _a = this.events(); _i < _a.length; _i++) {
            var event_2 = _a[_i];
            if (event_2 && event_2.isEnemy()) {
                if (event_2.enemy().isBoss()) {
                    ret.push(new Game_Boss(event_2.eventId()));
                }
            }
        }
        return ret;
    };
    Game_RogueMap.prototype.isChanged = function () {
        return this._changed;
    };
    Game_RogueMap.prototype.change = function () {
        this._changed = true;
    };
    Game_RogueMap.prototype.clearChange = function () {
        this._changed = false;
    };
    Game_RogueMap.prototype.isRogue = function () {
        if (!$dataMap) {
            return false;
        }
        if (!$dataMap.meta) {
            return false;
        }
        if (!$gameSwitches.value(1)) {
            return false;
        }
        return $dataMap.meta['rogue'] || false;
    };
    Game_RogueMap.prototype.roomCount = function () {
        if (!$dataMap) {
            return 0;
        }
        return parseInt($dataMap.meta['roomCount']);
    };
    Game_RogueMap.prototype.initialEnemyCount = function () {
        if (!$dataMap) {
            return 0;
        }
        return parseInt($dataMap.meta['enemyCount']);
    };
    Game_RogueMap.prototype.minTreasureCount = function () {
        if (!$dataMap) {
            return 0;
        }
        return parseInt($dataMap.meta['treasureMin']);
    };
    Game_RogueMap.prototype.maxTreasureCount = function () {
        if (!$dataMap) {
            return 0;
        }
        return parseInt($dataMap.meta['treasureMax']);
    };
    Game_RogueMap.prototype.minEquipPlus = function () {
        if (!$dataMap) {
            return 0;
        }
        var n = parseInt($dataMap.meta['minPlus']);
        if (isNaN(n)) {
            return 0;
        }
        return n;
    };
    Game_RogueMap.prototype.maxEquipPlus = function () {
        if (!$dataMap) {
            return 0;
        }
        var n = parseInt($dataMap.meta['maxPlus']);
        if (isNaN(n)) {
            return 0;
        }
        return n;
    };
    Game_RogueMap.prototype.isFixedFloor = function () {
        var info = $dataMapInfos[this.mapId()];
        if (info.isFixedFloor !== undefined) {
            return info.isFixedFloor;
        }
        info.isFixedFloor = info.name.contains('fixed');
        return info.isFixedFloor;
    };
    Game_RogueMap.prototype.respawnPos = function () {
        if (this.isFixedFloor()) {
            var events = $dataMap.events.filter(function (event) { return !!event; });
            var candidates = [];
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event_3 = events_1[_i];
                if (event_3.meta['enemyPlace']) {
                    candidates.push(event_3);
                }
            }
            var list = Nore.shuffle(candidates);
            for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
                var e_1 = list_1[_a];
                if (this.eventsXy(e_1.x, e_1.y).length == 0) {
                    return { x: e_1.x, y: e_1.y };
                }
            }
        }
        else {
            var rooms = Nore.shuffle(this._rooms.concat());
            for (var _b = 0, rooms_1 = rooms; _b < rooms_1.length; _b++) {
                var room = rooms_1[_b];
                if ($gamePlayer.room == room) {
                    continue;
                }
                for (var i = 0; i < 20; i++) {
                    var xx = room.x + Math.randomInt(room.w);
                    var yy = room.y + Math.randomInt(room.h);
                    if (this.eventsXy(xx, yy).length == 0) {
                        return { x: xx, y: yy };
                    }
                }
            }
        }
        return null;
    };
    Game_RogueMap.prototype.isMoving = function () {
        for (var _i = 0, _a = this.events(); _i < _a.length; _i++) {
            var event_4 = _a[_i];
            if (event_4.isMoving()) {
                return true;
            }
        }
        return false;
    };
    /**
     * 部屋
     */
    Game_RogueMap.prototype.getRoom = function (x, y) {
        for (var _i = 0, _a = this._rooms; _i < _a.length; _i++) {
            var room = _a[_i];
            if (room.contains(x, y)) {
                return room;
            }
        }
        return null;
    };
    Game_RogueMap.prototype.isRoom = function (x, y) {
        return this.getRoom(x, y) != null;
    };
    Game_RogueMap.prototype.getRoomList = function () {
        return this._rooms;
    };
    Game_RogueMap.prototype.getRoomOrEdge = function (x, y) {
        return this.roomByXY3(x, y);
    };
    Game_RogueMap.prototype.roomByXY3 = function (x, y) {
        var result;
        this._rooms.forEach(function (room) {
            if (room.x <= x + 1 && x - 1 < room.x + room.w && room.y <= y + 1 && y - 1 < room.y + room.h) {
                return result = room;
            }
        }, this);
        if (result) {
            return result;
        }
        return undefined;
    };
    Game_RogueMap.prototype.isPassableNotWall = function (x, y, d) {
        var point = Nore.calcPosByDirection(x, y, d);
        //p('isWall ' + x + ' ' + y + ' ' + this.isWall(point.x, point.y))
        return !this.isWall(point.x, point.y);
    };
    Game_RogueMap.prototype.isBlank = function (x, y) {
        /*if (! this.isFixedFloor()) {
            return false;
        }*/
        var tileId = this.tileId(x, y, 0);
        /*if (tileId >= 5984 && tileId <= 6029) {
            return !this.isPassable(x, y, 2) && !this.isPassable(x, y, 4) && !this.isPassable(x, y, 6) && !this.isPassable(x, y, 8);
        }*/
        if (tileId >= 5914 && tileId <= 8158) {
            //p(tileId)
            return true;
        }
        if (tileId == 1536) {
            return true;
        }
        if (tileId >= 2353 && tileId <= 2379) {
            //return true;
        }
        if (tileId >= 2816 && tileId <= 2996) {
            //return false;
        }
        if (tileId >= 5000) {
            //p(tileId)
        }
        return !this.isPassable(x, y, 2) && !this.isPassable(x, y, 4) && !this.isPassable(x, y, 6) && !this.isPassable(x, y, 8);
    };
    ;
    Game_RogueMap.prototype.isPass = function (x, y) {
        if (this.isFixedFloor()) {
            return !this.isBlank(x, y);
        }
        var isFloor = false;
        if (!this._mapGenerator) {
            return false;
        }
        this._mapGenerator._passes.forEach(function (pass) {
            for (var yy = pass.y; yy < (pass.y + pass.h); yy++) {
                for (var xx = pass.x; xx < (pass.x + pass.w); xx++) {
                    if (xx == x && yy == y) {
                        isFloor = true;
                        return;
                    }
                }
            }
        }, this);
        return isFloor;
    };
    Game_RogueMap.prototype.isFloor = function (x, y) {
        return (this.isRoom(x, y) || this.isPass(x, y));
    };
    Game_RogueMap.prototype.isFlyable = function (x, y) {
        if (this.isFloor(x, y)) {
            return true;
        }
        var tileId = this.tileId(x, y, 0);
        if (this.isBetween(tileId, 2048, 2280)) {
            return true;
        }
        //p(tileId)
        if ($gameVariables.value(1) == 3) {
            var tileId2 = this.tileId(x, y, 3);
            if (tileId2 == 248) {
                return true;
            }
        }
        return false;
    };
    Game_RogueMap.prototype.isBetween = function (n, start, end) {
        return n >= start && n <= end;
    };
    Game_RogueMap.prototype.isWall = function (x, y) {
        var tileId = this.tileId(x, y, 0);
        if (tileId >= 5890 && tileId <= 8158) {
            //p(tileId)
            return true;
        }
        if (tileId == 1536) {
            return true;
        }
        if (tileId >= 2353 && tileId <= 2379) {
            //return true;
        }
        if (tileId >= 2816 && tileId <= 2996) {
            //return false;
        }
        if (tileId >= 5000) {
            //p(tileId)
        }
        return false;
    };
    ;
    Game_RogueMap.prototype.mapping = function (x, y) {
        if (!this.isRogue()) {
            return;
        }
        $gamePlayer.isEnterRoom = false;
        var room = this.getRoom(x, y);
        $gamePlayer.setRoom(room);
        if (room) {
            $gameMinimap.mappingRoom(room);
            //p('$gamePlayer.isEnterRoom: ' + $gamePlayer.isEnterRoom)
            return;
        }
        if (this.isFloor(x, y)) {
            $gameMinimap.mapping(x, y);
            return;
        }
    };
    /**
     * アイテム
     */
    Game_RogueMap.prototype.clearItemMap = function () {
        this._itemMap = {};
    };
    Game_RogueMap.prototype.putItem = function (rogueItem, x, y, visible) {
        if (visible === void 0) { visible = false; }
        this._itemMap = this._itemMap || {};
        //p(x + ' ' + y)
        if (this._itemMap[x + '_' + y]) {
            console.error('すでにアイテムが配置されています');
            return;
        }
        var newItem = new RogueFieldItem(rogueItem, x, y, visible);
        this._itemMap[x + '_' + y] = newItem;
        return newItem;
    };
    Game_RogueMap.prototype.itemAt = function (x, y) {
        this._itemMap = this._itemMap || {};
        return this._itemMap[x + '_' + y];
    };
    Game_RogueMap.prototype.removeItemAt = function (x, y) {
        this._itemMap = this._itemMap || {};
        var item = this._itemMap[x + '_' + y];
        if (item) {
            item.gotten = true;
        }
        return delete this._itemMap[x + '_' + y];
    };
    Game_RogueMap.prototype.itemList = function () {
        var result = [];
        this._itemMap = this._itemMap || {};
        for (var key in this._itemMap) {
            var item = this._itemMap[key];
            result.push(item);
        }
        return result;
    };
    return Game_RogueMap;
}(Game_Map));
