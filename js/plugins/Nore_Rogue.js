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
 * @requiredAssets img/system/mapShadow.png
 *
 */
var Nore;
(function (Nore) {
    Window_Base.prototype.actor = function () {
        return $gameActors.mainActor();
    };
    Game_Map.prototype.respawnEnemy = function (pos, idBase) {
        var events = $dataMap.events.filter(function (event) { return !!event; });
        var candidates = [];
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            if (event_1.meta['enemy']) {
                candidates.push(event_1);
            }
        }
        var classEvent = candidates[Math.randomInt(candidates.length)];
        var clone = JsonEx.makeDeepCopy(classEvent);
        clone.x = pos.x;
        clone.y = pos.y;
        clone.id = idBase + INITIAL_EVENT_ID;
        var gameEvent = new Game_EnemyEvent(this.mapId(), clone.id, clone);
        gameEvent.refresh();
        this._events[gameEvent.eventId()] = gameEvent;
        var sprite = new Sprite_Character(gameEvent);
        SceneManager._scene._spriteset._characterSprites.push(sprite);
        SceneManager._scene._spriteset._tilemap.addChild(sprite);
    };
    Nore.shuffle = function (_a) {
        var _b;
        var arr = _a.slice(0);
        var m = arr.length;
        while (m) {
            var i = Math.floor(Math.random() * m--);
            _b = [arr[i], arr[m]], arr[m] = _b[0], arr[i] = _b[1];
        }
        return arr;
    };
    var MAP_SCALE = 1;
    var Sprite_MapShadow = /** @class */ (function (_super) {
        __extends(Sprite_MapShadow, _super);
        function Sprite_MapShadow() {
            var _this = _super.call(this) || this;
            var map = $gameMap;
            if (!map.isRogue()) {
                return _this;
            }
            _this.refresh();
            return _this;
        }
        Sprite_MapShadow.prototype.fill = function (x, y, w, h) {
            var gra = new PIXI.Graphics();
            gra.beginFill(0, 1);
            gra.drawRect(x, y, w, h);
            gra.endFill();
            this.addChild(gra);
        };
        Sprite_MapShadow.prototype.refresh = function () {
            if (!$gameMap.isRogue()) {
                return;
            }
            this.destroyAndRemoveChildren();
            var w = 52 * 48;
            var h = 40 * 40;
            var baseTexture = PIXI.utils.BaseTextureCache['system/mapShadow'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('mapShadow');
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/mapShadow';
                PIXI.utils.BaseTextureCache['system/mapShadow'] = baseTexture;
            }
            var offset = 0;
            var rect = new Rectangle(0, 0, 0, 0);
            if (this.lastRoom) {
                var tileX = 48 * MAP_SCALE;
                var room = this.lastRoom;
                rect.x = w / 2 - ($gamePlayer.x - room.x - offset) * tileX;
                rect.y = h / 2 - ($gamePlayer.y - room.y - offset) * tileX;
                rect.width = (room.w + 2 - offset) * tileX;
                rect.height = (room.h + 2 - offset) * tileX;
                this.fill(0, 0, 52 * 48, rect.y);
                this.fill(0, rect.y, rect.x + 1, rect.height);
                this.fill(rect.x + rect.width, rect.y, rect.x, rect.height);
                this.fill(0, rect.y + rect.height, 52 * 48, h - rect.y - rect.height);
                var px = $gamePlayer.x;
                var py = $gamePlayer.y;
                if ($gameMap.isLoopHorizontal()) {
                    if ($gameMap.displayX() > px) {
                        px += $gameMap.width();
                    }
                }
                if ($gameMap.isLoopVertical()) {
                    if ($gameMap.displayY() > py) {
                        py += $gameMap.height();
                    }
                }
                this.startX = $gameMap.displayX() * tileX - w / 2 + (px - $gameMap.displayX() - 1) * tileX;
                this.startY = $gameMap.displayY() * tileX - h / 2 + (py - $gameMap.displayY() - 1) * tileX;
                var img = ImageManager.loadSystem('mapShadow');
                var w2 = img.width / 2;
                var h2 = img.height / 2;
                this.addShadow(baseTexture, 0, 0, w2, h2, rect.x + 1, rect.y);
                this.addShadow(baseTexture, w2, 0, w2, h2, rect.x + rect.width - w2, rect.y);
                this.addShadow(baseTexture, 0, h2, w2, h2, rect.x + 1, rect.y + rect.height - h2);
                this.addShadow(baseTexture, w2, h2, w2, h2, rect.x + rect.width - w2, rect.y + rect.height - h2);
                /*
                this.bitmap.blt(img, 0,  0,  w2, h2, rect.x, rect.y);
                this.bitmap.blt(img, w2, 0,  w2, h2, rect.x + rect.width - w2, rect.y);
                this.bitmap.blt(img, 0,  h2, w2, h2x, rect.x, rect.y + rect.height - h2);
                this.bitmap.blt(img, w2, h2, w2, h2, rect.x + rect.width - w2, rect.y + rect.height - h2);*/
                //this.bitmap.blt(rect.x, rect.y, edge, edge.rect)
            }
            else {
                rect.x = w / 2 - 68;
                rect.y = h / 2 - 65;
                rect.width = 127;
                rect.height = 127;
                this.fill(0, 0, 52 * 48, rect.y);
                this.fill(0, rect.y, rect.x, rect.height);
                this.fill(rect.x + rect.width, rect.y, rect.x, rect.height);
                this.fill(0, rect.y + rect.height, w, h - rect.y - rect.height);
                this.startX = $gameMap.displayX() * tileX - w / 2 + ($gamePlayer.x - $gameMap.displayX() - 1) * tileX;
                this.startY = $gameMap.displayY() * tileX - h / 2 + ($gamePlayer.y - $gameMap.displayY() - 1) * tileX;
                //this.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
                var img = ImageManager.loadSystem('mapShadow');
                var texture = new PIXI.Texture(baseTexture);
                texture.frame = new PIXI.Rectangle(0, 0, img.width, img.height);
                var sprite = new PIXI.Sprite(texture);
                sprite.position.x = rect.x;
                sprite.position.y = rect.y;
                this.addChild(sprite);
                //            this.bitmap.blt(img, 0, 0, img.width, img.height, rect.x, rect.y);
                //this.bitmap.blt(rect.x, rect.y, edge, edge.rect)
            }
            this._lastDx = $gameMap.displayX();
            this._lastDy = $gameMap.displayY();
            this.alpha = 0.5;
            //this.lastRoom = $gameMap.getRoom($gamePlayer.x, $gamePlayer.y);
        };
        Sprite_MapShadow.prototype.addShadow = function (baseTexture, sx, sy, sw, sh, dx, dy) {
            var img = ImageManager.loadSystem('mapShadow');
            var texture = new PIXI.Texture(baseTexture);
            texture.frame = new PIXI.Rectangle(sx, sy, sw, sh);
            var sprite = new PIXI.Sprite(texture);
            sprite.position.x = dx;
            sprite.position.y = dy;
            this.addChild(sprite);
        };
        Sprite_MapShadow.prototype.update = function () {
            if (!$gameMap.isRogue()) {
                return;
            }
            _super.prototype.update.call(this);
            var room = $gameMap.getRoom($gamePlayer.x, $gamePlayer.y);
            if (this.lastRoom != room) {
                this.lastRoom = room;
                this.refresh();
            }
            var w = 52 * 48;
            var h = 40 * 40;
            if (this.lastRoom) {
                var dx = $gameMap.displayX();
                if (Math.abs(this._lastDx - dx) > 20) {
                    if (dx < this._lastDx) {
                        this.startX -= $gameMap.width() * 48;
                    }
                    else {
                        this.startX += $gameMap.width() * 48;
                    }
                }
                var dy = $gameMap.displayY();
                if (Math.abs(this._lastDy - dy) > 20) {
                    if (dx < this._lastDy) {
                        this.startY -= $gameMap.height() * 48;
                    }
                    else {
                        this.startY += $gameMap.height() * 48;
                    }
                }
                this.x = this.startX - dx * 48 * MAP_SCALE;
                this.y = this.startY - dy * 48 * MAP_SCALE;
                this._lastDx = dx;
                this._lastDy = dy;
            }
            else {
                this.x = $gamePlayer.screenX() * MAP_SCALE - w / 2;
                this.y = $gamePlayer.screenY() * MAP_SCALE - h / 2 - 32;
            }
        };
        return Sprite_MapShadow;
    }(Sprite_Clickable));
    Nore.Sprite_MapShadow = Sprite_MapShadow;
})(Nore || (Nore = {}));
var Game_Room = /** @class */ (function () {
    function Game_Room(_area) {
        this._area = _area;
        this.mapping = false;
    }
    Object.defineProperty(Game_Room.prototype, "x", {
        get: function () {
            return this._area.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_Room.prototype, "y", {
        get: function () {
            return this._area.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_Room.prototype, "w", {
        get: function () {
            return this._area.w;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_Room.prototype, "h", {
        get: function () {
            return this._area.h;
        },
        enumerable: true,
        configurable: true
    });
    Game_Room.prototype.hasElite = function () {
        if (!this._enemyList) {
            this.createEnemyList();
        }
        for (var _i = 0, _a = this._enemyList; _i < _a.length; _i++) {
            var id = _a[_i];
            var event_2 = $gameMap.event(id);
            if (!event_2.enemy()) {
                continue;
            }
            if (event_2.enemy().enemy().meta['elite']) {
                return true;
            }
        }
        return false;
    };
    Game_Room.prototype.contains = function (x, y) {
        if (!this._area) {
            return false;
        }
        return this._area.contains(x, y);
    };
    Game_Room.prototype.add = function (x, y) {
        this._area.add(x, y);
    };
    Game_Room.prototype.randomExit = function (currentPoint) {
        return this._area.randomExit(currentPoint);
    };
    Game_Room.prototype.isExit = function (x, y) {
        return this._area.isExit(x, y);
    };
    Game_Room.prototype.isNearExit = function (x, y) {
        return this._area.isNearExit(x, y);
    };
    Game_Room.prototype.randomPlace = function (nearEntrance) {
        return this._area.randomPlace(nearEntrance);
    };
    Game_Room.prototype.exitList = function () {
        return this._area.exitList();
    };
    Game_Room.prototype.equals = function (room) {
        if (!room) {
            return false;
        }
        return this.x == room.x && this.y == room.y;
    };
    Game_Room.prototype.nearestEnemyId = function () {
        if (!this._enemyList) {
            this.createEnemyList();
        }
        var enemy = null;
        for (var _i = 0, _a = this._enemyList; _i < _a.length; _i++) {
            var id = _a[_i];
            var event_3 = $gameMap.event(id);
            if (!event_3) {
                continue;
            }
            if (event_3.event().meta['stair']) {
                continue;
            }
            if (!event_3.enemy().isDead() && !event_3.isObject()) {
                if (!enemy) {
                    enemy = event_3.enemy();
                }
                else {
                    var distance1 = $gamePlayer.calcDistance(enemy.x, enemy.y);
                    var distance2 = $gamePlayer.calcDistance(event_3.enemy().x, event_3.enemy().y);
                    if (distance2 < distance1) {
                        enemy = event_3.enemy();
                    }
                }
            }
        }
        if (enemy) {
            return enemy.enemyId();
        }
        else {
            return 0;
        }
    };
    Game_Room.prototype.enemyCount = function () {
        if (!this._enemyList) {
            this.createEnemyList();
        }
        var count = 0;
        for (var _i = 0, _a = this._enemyList; _i < _a.length; _i++) {
            var id = _a[_i];
            var event_4 = $gameMap.event(id);
            if (!event_4) {
                continue;
            }
            if (event_4.event().meta['stair']) {
                continue;
            }
            if (!event_4.enemy().isDead() && !event_4.isObject()) {
                count++;
            }
        }
        return count;
    };
    Game_Room.prototype.initialEnemyCount = function () {
        var min = this._area.enemyMin();
        var max = this._area.enemyMax();
        return Math.randomInt(max - min) + min;
    };
    Game_Room.prototype.createEnemyList = function () {
        this._enemyList = [];
        for (var i = 0; i < this.w; i++) {
            for (var k = 0; k < this.h; k++) {
                var x = this.x + i;
                var y = this.y + k;
                var event_5 = Nore.EventArranger.enemyEventAt(x, y);
                if (event_5) {
                    this._enemyList.push(event_5.eventId());
                }
            }
        }
    };
    Game_Room.prototype.displayEmergeMessage = function () {
        for (var _i = 0, _a = this._enemyList; _i < _a.length; _i++) {
            var id = _a[_i];
            var event_6 = $gameMap.event(id);
            if (event_6.enemy().enemy().meta['type'] == 'taru') {
                continue;
            }
            Nore.$gameMessageRogue.add(TextManager.emerge.format(event_6.enemy().name()));
        }
        if ($gameMap.isBossFloor()) {
            Nore.$gameMessageRogue.add("\\C[2]Boss Encountered!!");
        }
        else if (this.hasElite()) {
            Nore.$gameMessageRogue.add('\\C[2]Elite Encountered!!');
        }
    };
    Game_Room.prototype.onEnemyDead = function (x, y) {
        this._lastEnemyDeadPosition = new Point(x, y);
    };
    Game_Room.prototype.lastEnemyDeadPosition = function () {
        return this._lastEnemyDeadPosition;
    };
    Game_Room.prototype.findTreasureEvent = function () {
        for (var i = 0; i < this.w; i++) {
            for (var k = 0; k < this.h; k++) {
                var x = this.x + i - 2;
                var y = this.y + k - 2;
                var events = $gameMap.eventsXy(x, y);
                for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
                    var event_7 = events_2[_i];
                    if (event_7.event() && event_7.event().meta['treasure']) {
                        return event_7;
                    }
                }
            }
        }
        return null;
    };
    Game_Room.prototype.clearSwitch = function () {
        return this._area.clearSwitch();
    };
    Game_Room.prototype.removeAllEnemy = function (gainBonus) {
        if (gainBonus === void 0) { gainBonus = false; }
        if (!this._enemyList) {
            this.createEnemyList();
        }
        for (var _i = 0, _a = this._enemyList; _i < _a.length; _i++) {
            var id = _a[_i];
            var event_8 = $gameMap.event(id);
            if (!event_8) {
                continue;
            }
            if (event_8.event().meta['stair']) {
                continue;
            }
            if (!$gameSwitches.value(718) && event_8.event().meta['notErase']) {
                continue;
            }
            if (event_8.isObject()) {
                continue;
            }
            this.removeEnemy(event_8, gainBonus);
        }
    };
    Game_Room.prototype.removeEnemy = function (event, gainBonus) {
        if (event._erased) {
            return;
        }
        if (gainBonus) {
            Nore.gainEnemyBonus(event.enemy());
        }
        event.erase();
        this.onEnemyDead(event.x, event.y);
        Nore.EventArranger.onEnemyDead(event.x, event.y);
        event.enemy().gainHp(-999);
    };
    return Game_Room;
}());
var RoomArea = /** @class */ (function () {
    function RoomArea() {
    }
    RoomArea.prototype.randomExit = function (currentPoint) {
        if (this.exitList().length <= 1) {
            return this.exitList()[0];
        }
        var candidates = [];
        for (var _i = 0, _a = this.exitList(); _i < _a.length; _i++) {
            var e_1 = _a[_i];
            if (e_1.x != currentPoint.x || e_1.y != currentPoint.y) {
                candidates.push(e_1);
            }
        }
        return candidates[Math.randomInt(candidates.length)];
    };
    RoomArea.prototype.randomPlace = function (nearEntrance) {
        this.createPlaceList();
        var posList = this._posList;
        if (nearEntrance) {
            posList = this._posListEnstance;
        }
        var index = Math.randomInt(posList.length);
        var pos = posList[index];
        posList.splice(index, 1);
        return pos;
    };
    /*removePos(list: Array<Point>, pos: Point) {

        let index = -1;
        let i = 0;
        for (const l of list) {
            if (l.x == pos.x && l.y == pos.y) {
                index = i;
                break;
            }
            i++;
        }
        if (index >= 0) {
            list.splice(index, 1);
        }
    }*/
    RoomArea.prototype.createPlaceList = function () {
        if (this._posList && this._posList.length > 0) {
            return;
        }
        this._posList = [];
        this._posListEnstance = [];
        for (var i = 0; i < this.w; i++) {
            for (var k = 0; k < this.h; k++) {
                var xx = i + this.x;
                var yy = k + this.y;
                //if (this.isNearExit(xx, yy)) {
                if (!this.contains(xx, yy)) {
                    continue;
                }
                if (this.isInvalidArea(xx, yy)) {
                    continue;
                }
                if (this.isNearEntrance(xx, yy)) {
                    this._posListEnstance.push(new Point(xx, yy));
                }
                else {
                    this._posList.push(new Point(xx, yy));
                }
            }
        }
    };
    RoomArea.prototype.isInvalidArea = function (x, y) {
        var e = this.findEntrance();
        if (Math.abs(x - e.x) <= 1 && Math.abs(y - e.y) <= 2) {
            return true;
        }
        return false;
    };
    RoomArea.prototype.findEntrance = function () {
        if (this._entrance) {
            return this._entrance;
        }
        var exit = null;
        for (var _i = 0, _a = this.exitList(); _i < _a.length; _i++) {
            var e_2 = _a[_i];
            if (exit == null) {
                exit = e_2;
            }
            else {
                if (exit.y < e_2.y) {
                    exit = e_2;
                }
            }
        }
        this._entrance = exit;
        return this._entrance;
    };
    RoomArea.prototype.exitList = function () {
        if (this._exitList) {
            return this._exitList;
        }
        this.createExitList();
        return this._exitList;
    };
    RoomArea.prototype.isExit = function (x, y) {
        for (var _i = 0, _a = this.exitList(); _i < _a.length; _i++) {
            var e_3 = _a[_i];
            if (e_3.x == x && e_3.y == y) {
                return true;
            }
        }
        return false;
    };
    RoomArea.prototype.isNearExit = function (x, y) {
        for (var _i = 0, _a = this.exitList(); _i < _a.length; _i++) {
            var e_4 = _a[_i];
            if (e_4.x == x && e_4.y == y) {
                return true;
            }
            if (Math.abs(x - e_4.x) <= 4 && Math.abs(y - e_4.y) <= 3) {
                return true;
            }
        }
        return false;
    };
    RoomArea.prototype.isNearEntrance = function (x, y) {
        var e = this.findEntrance();
        if (Math.abs(x - e.x) <= 3 && Math.abs(y - e.y) <= 4) {
            return true;
        }
        return false;
    };
    RoomArea.prototype.createExitList = function () {
        this._exitList = [];
        for (var i = 0; i < this.w; i++) {
            for (var k = 0; k < this.h; k++) {
                var x = this.x + i;
                var y = this.y + k;
                if (this.checkExit(x, y)) {
                    this._exitList.push(new Point(x, y));
                }
            }
        }
    };
    RoomArea.prototype.checkExit = function (x, y) {
        if ($gameMap.isBlank(x, y)) {
            return false;
        }
        var posList = [new Point(x - 1, y), new Point(x + 1, y), new Point(x, y - 1), new Point(x, y + 1)];
        for (var _i = 0, posList_1 = posList; _i < posList_1.length; _i++) {
            var point = posList_1[_i];
            if (this.contains(point.x, point.y)) {
                continue;
            }
            if ($gameMap.isFloor(point.x, point.y)) {
                return true;
            }
        }
        return false;
    };
    RoomArea.prototype.enemyMin = function () {
        return 0;
    };
    RoomArea.prototype.enemyMax = function () {
        return this._enemyMax;
    };
    RoomArea.prototype.clearSwitch = function () {
        return -1;
    };
    return RoomArea;
}());
var RegionArea = /** @class */ (function (_super) {
    __extends(RegionArea, _super);
    function RegionArea(_regionId) {
        var _this = _super.call(this) || this;
        _this._regionId = _regionId;
        _this._left = 999;
        _this._top = 999;
        _this._right = -999;
        _this._bottom = -999;
        return _this;
    }
    RegionArea.prototype.contains = function (x, y) {
        return $gameMap.regionId(x, y) == this._regionId;
    };
    Object.defineProperty(RegionArea.prototype, "x", {
        get: function () {
            return this._left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionArea.prototype, "y", {
        get: function () {
            return this._top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionArea.prototype, "w", {
        get: function () {
            return this._right - this._left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionArea.prototype, "h", {
        get: function () {
            return this._bottom - this._top;
        },
        enumerable: true,
        configurable: true
    });
    RegionArea.prototype.add = function (x, y) {
        if (x <= this._left) {
            this._left = x;
        }
        if (x >= this._right) {
            this._right = x + 1;
        }
        if (y <= this._top) {
            this._top = y;
        }
        if (y >= this._bottom) {
            this._bottom = y + 1;
        }
    };
    RegionArea.prototype.clearSwitch = function () {
        return this._regionId + 300;
    };
    return RegionArea;
}(RoomArea));
var RoomDataArea = /** @class */ (function (_super) {
    __extends(RoomDataArea, _super);
    function RoomDataArea(rect, room) {
        var _this = _super.call(this) || this;
        _this._rect = new Rectangle(rect.x + 1, rect.y + 2, rect.width - 2, rect.height - 3);
        _this._exitList = room._exitList;
        _this._enemyMin = room.enemyMin();
        _this._enemyMax = room.enemyMax();
        return _this;
    }
    RoomDataArea.prototype.enemyMin = function () {
        return this._enemyMin;
    };
    RoomDataArea.prototype.enemyMax = function () {
        return this._enemyMax;
    };
    RoomDataArea.prototype.add = function (x, y) {
    };
    RoomDataArea.prototype.contains = function (x, y) {
        if (!this._rect.contains(x, y)) {
            return false;
        }
        if ($gameMap.isBlank(x, y)) {
            return false;
        }
        return true;
    };
    Object.defineProperty(RoomDataArea.prototype, "x", {
        /*exitList(): Array<Point> {
            return this._exitList;
        }*/
        get: function () {
            return this._rect.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomDataArea.prototype, "y", {
        get: function () {
            return this._rect.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomDataArea.prototype, "w", {
        get: function () {
            return this._rect.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomDataArea.prototype, "h", {
        get: function () {
            return this._rect.height;
        },
        enumerable: true,
        configurable: true
    });
    return RoomDataArea;
}(RoomArea));
var RectArea = /** @class */ (function (_super) {
    __extends(RectArea, _super);
    function RectArea(_rect) {
        var _this = _super.call(this) || this;
        _this._rect = _rect;
        return _this;
    }
    RectArea.prototype.add = function (x, y) {
    };
    RectArea.prototype.contains = function (x, y) {
        if (!this._rect.contains(x, y)) {
            return false;
        }
        if ($gameMap.isBlank(x, y)) {
            return false;
        }
        return true;
    };
    Object.defineProperty(RectArea.prototype, "x", {
        get: function () {
            return this._rect.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectArea.prototype, "y", {
        get: function () {
            return this._rect.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectArea.prototype, "w", {
        get: function () {
            return this._rect.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectArea.prototype, "h", {
        get: function () {
            return this._rect.height;
        },
        enumerable: true,
        configurable: true
    });
    return RectArea;
}(RoomArea));
