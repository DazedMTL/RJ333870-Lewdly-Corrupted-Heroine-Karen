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
var $gameMinimap;
var BLANK = 0; // 空きマップ
var FLOOR = 1; // 床
var WALL = 2; // 壁
var PASSAGE = 3; // 通路
var Game_MiniMap = /** @class */ (function () {
    function Game_MiniMap() {
        this.mapData = {};
        this.events = [];
    }
    Game_MiniMap.prototype.setup = function (map) {
        this.clear();
        for (var x = 0; x < map.width(); x++) {
            for (var y = 0; y < map.height(); y++) {
                this.mapData[x + '_' + y] = BLANK;
            }
        }
    };
    Game_MiniMap.prototype.isMapping = function (x, y) {
        return this.mapData[x + '_' + y] != BLANK;
    };
    Game_MiniMap.prototype.getFloorType = function (x, y) {
        return this.mapData[x + '_' + y];
    };
    Game_MiniMap.prototype.mappingRoom = function (room) {
        if (room.mapping) {
            return;
        }
        var offset = 0;
        room.mapping = true;
        for (var x = room.x; x < (room.x + room.w) + offset; x++) {
            for (var y = room.y; y < (room.y + room.h) + offset; y++) {
                /**if ($gameMap.isFloor(x, y)) {
                     this.mapData[x + '_' + y] = FLOOR;
                } else {
                    //p(x + ' ' + y)
                }*/
                if (room.contains(x, y)) {
                    this.mapData[x + '_' + y] = FLOOR;
                }
            }
        }
        this.mappingExit(room);
        //this.mappingEdge(room);
        this.changedArea = new Rectangle(room.x - 1, room.y - 1, room.w + 2, room.h + 2);
    };
    Game_MiniMap.prototype.mappingExit = function (room) {
        for (var _i = 0, _a = room.exitList(); _i < _a.length; _i++) {
            var r = _a[_i];
            this.mapData[r.x + '_' + r.y] = PASSAGE;
        }
    };
    Game_MiniMap.prototype.mappingEdge = function (room) {
        for (var x = room.x - 1; x < room.x + room.w + 1; x++) {
            this.mappingInternal(x, room.y - 1);
            this.mappingInternal(x, room.y + room.h);
        }
        for (var y = room.y - 1; y < room.y + room.h; y++) {
            this.mappingInternal(room.x - 1, y);
            this.mappingInternal(room.x + room.w, y);
        }
    };
    Game_MiniMap.prototype.mapping = function (x, y) {
        this.mappingInternal(x, y);
        this.mappingInternal(x - 1, y);
        this.mappingInternal(x + 1, y);
        this.mappingInternal(x, y - 1);
        this.mappingInternal(x, y + 1);
        this.mappingInternal(x - 1, y - 1);
        this.mappingInternal(x + 1, y - 1);
        this.mappingInternal(x - 1, y + 1);
        this.mappingInternal(x + 1, y + 1);
        this.changedArea = new Rectangle(x - 1, y - 1, 3, 3);
    };
    Game_MiniMap.prototype.mappingInternal = function (x, y) {
        if (this.isMapping(x, y)) {
            return;
        }
        if ($gameMap.isRoom(x, y)) {
            this.mapData[x + '_' + y] = FLOOR;
            return;
        }
        if ($gameMap.isFloor(x, y)) {
            this.mapData[x + '_' + y] = PASSAGE;
        }
        /*else if ($gameMap.isRoom(x, y)) {
            this.mapData[x + '_' + y] = FLOOR;
        }*/
    };
    Game_MiniMap.prototype.addEvent = function (event) {
        this.events.push(event);
    };
    Game_MiniMap.prototype.clear = function () {
        this.cleared = true;
        this.mapAllFlag = false;
        this.mapData = {};
        this.events = [];
    };
    Game_MiniMap.prototype.mapAll = function () {
        var map = $gameMap;
        for (var x = 0; x < map.width(); x++) {
            for (var y = 0; y < map.height(); y++) {
                if (map.isFloor(x, y)) {
                    this.mapData[x + '_' + y] = PASSAGE;
                }
            }
        }
        for (var _i = 0, _a = map.getRoomList(); _i < _a.length; _i++) {
            var room = _a[_i];
            room.mapping = false;
            this.mappingRoom(room);
        }
        this.changedArea = new Rectangle(0, 0, map.width(), map.height());
        this.mapAllFlag = true;
    };
    return Game_MiniMap;
}());
var Nore;
(function (Nore) {
    var SHOW_ALL = false;
    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = _DataManager_makeSaveContents.call(this);
        contents.minimap = $gameMinimap;
        return contents;
    };
    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameMinimap = contents.minimap;
    };
    var FLOOR_COLOR = '#4444CC';
    var PASSAGE_COLOR = '#AA44AA';
    var WALL_COLOR = '#AAAAAA';
    var SQUARE_SIZE = 10;
    var SHOW_STAIR_SWITCH = 1226;
    var SHOW_ITEM_SWITCH = 1226;
    var MAP_SCALE = 1;
    var Sprite_MiniMap = /** @class */ (function (_super) {
        __extends(Sprite_MiniMap, _super);
        function Sprite_MiniMap() {
            var _this = _super.call(this) || this;
            _this.eventSprites = {};
            _this.createBitmap();
            _this.updatePosition();
            _this.graMap = {};
            _this.backSprite = new PIXI.Sprite();
            _this.itemSprite = new PIXI.Sprite();
            _this.frontSprite = new PIXI.Sprite();
            _this.addChild(_this.backSprite);
            _this.addChild(_this.itemSprite);
            _this.addChild(_this.frontSprite);
            _this.redrawAll();
            _this.update();
            return _this;
        }
        Sprite_MiniMap.prototype.createCharacterSprite = function (color) {
            var hole = false;
            var isStatic = false;
            if (color >= 1000) {
                hole = true;
                color -= 1000;
            }
            if (color >= 100) {
                isStatic = true;
                color -= 100;
            }
            var spriteColor = color;
            return new SpriteMiniMapCharacter(spriteColor, isStatic, hole);
        };
        Sprite_MiniMap.prototype.createBitmap = function () {
            this.alpha = 0.0;
            //this.bitmap.fontSize = 32;
            //this.bitmap.font.color.set(255, 255, 255)
        };
        Sprite_MiniMap.prototype.updatePosition = function () {
            //this.x = (Graphics.boxWidth - SQUARE_SIZE * $gameMap.width() * MAP_SCALE) / 2 * MAP_SCALE;
            //this.y = (Graphics.boxHeight - SQUARE_SIZE * $gameMap.height() * MAP_SCALE) / 2 * MAP_SCALE - 200;
            this.x = -20;
            this.y = 120;
        };
        Sprite_MiniMap.prototype.updateBitmap = function () {
            var rect = $gameMinimap.changedArea;
            if (!rect) {
                return;
            }
            $gameMinimap.changedArea = null;
            for (var x = rect.x; x < (rect.width + rect.x); x++) {
                for (var y = rect.y; y < (rect.height + rect.y); y++) {
                    this.createGraphic(x, y);
                }
            }
        };
        Sprite_MiniMap.prototype.createGraphic = function (x, y) {
            var color;
            switch ($gameMinimap.getFloorType(x, y)) {
                case FLOOR:
                    color = FLOOR_COLOR;
                    break;
                case WALL:
                    color = WALL_COLOR;
                    break;
                case PASSAGE:
                    color = PASSAGE_COLOR;
                    break;
                default:
                    return null;
            }
            if (this.graMap[x + '_' + y]) {
                this.backSprite.removeChild(this.graMap[x + '_' + y]);
            }
            var gra = new PIXI.Graphics();
            var r = parseInt(color.substring(1, 3), 16);
            var g = parseInt(color.substring(3, 5), 16);
            var b = parseInt(color.substring(5, 7), 16);
            var intColor = (r << 16) | (g << 8) | b;
            gra.alpha = 0.7;
            gra.beginFill(intColor);
            gra.drawRect(0, 0, SQUARE_SIZE, SQUARE_SIZE);
            gra.endFill();
            //gra.alpha = 0.5;
            gra.x = x * SQUARE_SIZE;
            gra.y = y * SQUARE_SIZE;
            this.backSprite.addChild(gra);
            this.graMap[x + '_' + y] = gra;
        };
        Sprite_MiniMap.prototype.redrawAll = function () {
            if (!$gameMap.isRogue()) {
                return;
            }
            //this.bitmap.clear();
            for (var x = 0; x < $gameMap.width(); x++) {
                for (var y = 0; y < $gameMap.height(); y++) {
                    this.createGraphic(x, y);
                }
            }
            if (!this.playerSprite) {
                this.playerSprite = this.createCharacterSprite(3);
                this.frontSprite.addChild(this.playerSprite);
            }
        };
        Sprite_MiniMap.prototype.update = function () {
            _super.prototype.update.call(this);
            if ($gamePlayer.isDefeat()) {
                this.visible = false;
                return;
            }
            if (!$gameMap.isRogue()) {
                return;
            }
            if ($gameMinimap.changedArea) {
                this.updateBitmap();
                this.updateVisibility();
            }
            if (this._lastTurn == $gamePlayer.turnCount() && !$gameMap.isChanged()) {
                if (this._lastPlayerX == $gamePlayer.x && this._lastPlayerY == $gamePlayer.y) {
                    return;
                }
            }
            this._lastTurn = $gamePlayer.turnCount();
            $gameMap.clearChange();
            this.updatePlayer();
            this.updateEvents();
        };
        Sprite_MiniMap.prototype.updateVisibility = function () {
            this.visible = !$gameSwitches.value(32);
        };
        Sprite_MiniMap.prototype.updatePlayer = function () {
            if (!this.playerSprite) {
                this.playerSprite = this.createCharacterSprite(3);
                this.frontSprite.addChild(this.playerSprite);
            }
            this._lastPlayerX = $gamePlayer.x;
            this._lastPlayerY = $gamePlayer.y;
            this.playerSprite.x = Math.round($gamePlayer.x) * SQUARE_SIZE;
            this.playerSprite.y = Math.round($gamePlayer.y) * SQUARE_SIZE;
            //this.playerSprite.visible = ! $gameSwitches.value(17);
        };
        Sprite_MiniMap.prototype.updateEvents = function () {
            for (var _i = 0, _a = $gameMap.events(); _i < _a.length; _i++) {
                var event = _a[_i];
                var sprite = null;
                if (event._erased) {
                    sprite = this.eventSprites[event.eventId()];
                }
                if (sprite) {
                    this.frontSprite.removeChild(sprite);
                    delete this.eventSprites[event.eventId()];
                }
                delete $gameMap.events[event.eventId()];
                this.updateEvent(event);
            }
            var itemList = $gameMap.itemList();
            this.itemSprite.removeChildren();
            for (var _b = 0, itemList_1 = itemList; _b < itemList_1.length; _b++) {
                var item = itemList_1[_b];
                if (!$gameMinimap.mapAllFlag) {
                    if (!item.isVisible()) {
                        continue;
                    }
                }
                var sprite_1 = this.createCharacterSprite(4);
                sprite_1.x = item.x() * SQUARE_SIZE;
                sprite_1.y = item.y() * SQUARE_SIZE;
                this.itemSprite.addChild(sprite_1);
            }
            if (SHOW_ALL) {
                for (var _c = 0, _d = $gameMap.events(); _c < _d.length; _c++) {
                    var event = _d[_c];
                    if (event.enemy) {
                        if (event._debugPoint) {
                            var sprite_2 = this.createCharacterSprite(6);
                            sprite_2.x = event._debugPoint.x * SQUARE_SIZE;
                            sprite_2.y = event._debugPoint.y * SQUARE_SIZE;
                            this.itemSprite.addChild(sprite_2);
                        }
                    }
                }
            }
        };
        Sprite_MiniMap.prototype.isStair = function (e) {
            return e.event().meta['stair'];
        };
        Sprite_MiniMap.prototype.updateEvent = function (event) {
            if (event._erased) {
                return;
            }
            if (!event.event()) {
                return;
            }
            var sprite;
            if (this.eventSprites[event.eventId()]) {
                sprite = this.eventSprites[event.eventId()];
            }
            else {
                sprite = this.createCharacterSprite(parseInt(event.event().name));
                this.frontSprite.addChild(sprite);
                this.eventSprites[event.eventId()] = sprite;
            }
            sprite.visible = false;
            //if (sprite.static || $gameMinimap.mapAllFlag) {
            if (this.isStair(event)) {
                sprite.x = event.x * SQUARE_SIZE;
                sprite.y = event.y * SQUARE_SIZE;
                sprite.visible = $gameMinimap.isMapping(event.x, event.y);
            }
            else {
                //sprite.visible = $gameMinimap.isMapping(event.x, event.y);
            }
            //}
            //sprite.visible |= $gamePlayer.distance(event) <= 3 && $game_temp.lamp_step > 0
            if (this.isStair(event)) {
                if ($gameSwitches.value(SHOW_STAIR_SWITCH)) {
                    sprite.visible = true;
                }
                return;
            }
            else {
                if ($gameSwitches.value(SHOW_ITEM_SWITCH)) {
                    sprite.visible = true;
                }
            }
            if ($gamePlayer.room) {
                sprite.visible = $gamePlayer.room.contains(event.x, event.y);
            }
            sprite.visible = sprite.visible || $gamePlayer.distance(event) <= 2;
            if ($gameMinimap.mapAllFlag) {
                sprite.visible = true;
            }
            if (SHOW_ALL) {
                sprite.visible = true;
            }
            var room = $gameMap.getRoom($gamePlayer.x, $gamePlayer.y);
            if (room) {
                sprite.visible = sprite.visible || room === $gameMap.getRoomOrEdge(event.x, event.y);
            }
            if (!event.page()) {
                return;
            }
            //sprite.visible = true if Saba::Dungeon::DEBUG_MODE || $gameSwitches.value(SHOW_ENEMY_SWITCH] || event.name.include?("@")
            if (!event._stepAnime && !event.isObject()) {
                if (!event.list() || event.list().length <= 1) {
                    sprite.visible = false;
                }
            }
            sprite.x = event.x * SQUARE_SIZE;
            sprite.y = event.y * SQUARE_SIZE;
        };
        Sprite_MiniMap.prototype.clear = function () {
        };
        return Sprite_MiniMap;
    }(Sprite_Clickable));
    Nore.Sprite_MiniMap = Sprite_MiniMap;
    var SpriteMiniMapCharacter = /** @class */ (function (_super) {
        __extends(SpriteMiniMapCharacter, _super);
        function SpriteMiniMapCharacter(color, isStatic, hole) {
            var _this = _super.call(this) || this;
            _this.alive = true;
            _this.color = color;
            _this.isStatic = isStatic;
            _this.hole = hole;
            if (color) {
                _this.createBitmap();
                _this.update();
            }
            else {
                _this.visible = false;
            }
            return _this;
        }
        SpriteMiniMapCharacter.prototype.textColor = function (n) {
            if (n == 1) {
                return '#00FFFF';
            }
            if (n == 2) {
                return '#FF0000';
            }
            if (n == 3) {
                return '#FFFF00';
            }
            if (n == 4) {
                return '#00FF00';
            }
            if (n == 5) {
                return '#0099FF';
            }
            var px = 96 + (n % 8) * 12 + 6;
            var py = 144 + Math.floor(n / 8) * 12 + 6;
            return this.windowskin.getPixel(px, py);
        };
        ;
        SpriteMiniMapCharacter.prototype.createBitmap = function () {
            var size = SQUARE_SIZE;
            var color = this.textColor(this.color);
            if (this.hole) {
                var gra = new PIXI.Graphics();
                var r = parseInt(color.substring(1, 3), 16);
                var g = parseInt(color.substring(3, 5), 16);
                var b = parseInt(color.substring(5, 7), 16);
                var intColor = (r << 16) | (g << 8) | b;
                gra.beginFill(intColor);
                var ww = 2;
                gra.drawRect(0, 0, size, ww);
                gra.drawRect(0, ww, ww, size - ww);
                gra.drawRect(size - ww, ww, ww, size - ww);
                gra.drawRect(ww, size - ww, size - ww, ww);
                gra.endFill();
                this.addChild(gra);
            }
            else {
                var gra = new PIXI.Graphics();
                var r = parseInt(color.substring(1, 3), 16);
                var g = parseInt(color.substring(3, 5), 16);
                var b = parseInt(color.substring(5, 7), 16);
                var intColor = (r << 16) | (g << 8) | b;
                gra.beginFill(intColor);
                gra.drawRect(0, 0, size, size);
                gra.endFill();
                this.addChild(gra);
            }
        };
        return SpriteMiniMapCharacter;
    }(Sprite_Clickable));
    var _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        _Spriteset_Map_update.call(this);
        if ($gameMap.isRogue()) {
            this._miniMap.visible = true; //! $gameSwitches.value(502);
            this._miniMap.update();
            this._mapShadow.update();
            this._mapShadow.visible = true;
        }
        else {
            if (this._miniMap) {
                this._miniMap.visible = false;
            }
            if (this._mapShadow) {
                this._mapShadow.visible = false;
            }
        }
    };
})(Nore || (Nore = {}));
