var Nore;
(function (Nore) {
    Scene_Map.prototype.isReady = function () {
        if (!this._mapLoaded && DataManager.isMapLoaded()) {
            if ($gameMap.isRogue()) {
                this._creater = this._creater || new RogueMapCreater($gameMap.mapId());
                if (!this._creater.isLoaded()) {
                    return false;
                }
                this._mapLoaded = true;
                this.onMapLoaded();
            }
            else {
                this._mapLoaded = true;
                this.onMapLoaded();
            }
        }
        return this._mapLoaded && Scene_Message.prototype.isReady.call(this);
    };
    var RogueMapCreater = /** @class */ (function () {
        function RogueMapCreater(mapId) {
            this._mapId = mapId;
            this.searchMaterialMap();
            this.loadMaterialMap();
        }
        RogueMapCreater.prototype.searchMaterialMap = function () {
            this._mapInfoList = [];
            var dungeonId = $gameVariables.value(1);
            for (var _i = 0, $dataMapInfos_1 = $dataMapInfos; _i < $dataMapInfos_1.length; _i++) {
                var data = $dataMapInfos_1[_i];
                if (!data) {
                    continue;
                }
                if (data.name.indexOf('素材') >= 0) {
                    var id = parseInt(data.name.split('_')[1]);
                    if (id == dungeonId) {
                        this._mapInfoList.push(data);
                    }
                }
            }
        };
        RogueMapCreater.prototype.loadMaterialMap = function () {
            this._loadingList = [];
            for (var i = 1; i < 20; i++) {
                window['$dataMap' + i] = null;
            }
            for (var i = 0; i < this._mapInfoList.length; i++) {
                var data = this._mapInfoList[i];
                this._loadingList.push(i + 1);
                DataManager.loadMapData2(data.id, i + 1);
            }
        };
        RogueMapCreater.prototype.createRoom = function (block, minSize, maxWidth, maxHeight) {
            var map = this.selectRoomId(minSize, minSize, maxWidth, maxHeight);
            return new RoomData(map, block);
        };
        RogueMapCreater.prototype.selectRoomId = function (minWidth, minHeight, maxWidth, maxHeight) {
            var candidates = [];
            for (var i = 1; i < 20; i++) {
                var map = window['$dataMap' + i];
                if (!map) {
                    break;
                }
                //p(map.width + ' ' + map.height + ' ' + minWidth + ' ' + minHeight + ' ' + maxWidth + ' ' + maxHeight)
                if (map.width >= minWidth && map.width < maxWidth) {
                    if (map.height >= minHeight && map.height < maxHeight) {
                        candidates.push(map);
                    }
                }
            }
            return candidates[Math.randomInt(candidates.length)];
        };
        RogueMapCreater.prototype.isLoaded = function () {
            if (!this._loadingList) {
                return false;
            }
            for (var _i = 0, _a = this._loadingList; _i < _a.length; _i++) {
                var n = _a[_i];
                if (!window['$dataMap' + n]) {
                    return false;
                }
            }
            return true;
        };
        return RogueMapCreater;
    }());
    Nore.RogueMapCreater = RogueMapCreater;
    var RoomData = /** @class */ (function () {
        function RoomData(dataMap, block) {
            this._exitList = [];
            this._data = JsonEx.makeDeepCopy(dataMap.data);
            //p(this._data)
            this._enemyMin = parseInt(dataMap.meta['enemyMin']);
            this._enemyMax = parseInt(dataMap.meta['enemyMax']);
            this._width = dataMap.width - 2;
            this._height = dataMap.height - 2;
            this._hasPass = new HasPass();
            this._x = block.x + 1 + Math.randomInt(block.w - this._width - 1);
            this._y = block.y + 1 + Math.randomInt(block.h - this._height - 1);
        }
        RoomData.prototype.originalX = function () {
            return this.x - 1;
        };
        RoomData.prototype.originalY = function () {
            return this.y - 1;
        };
        RoomData.prototype.originalWidth = function () {
            return this._width + 2;
        };
        RoomData.prototype.originalHeight = function () {
            return this._height + 2;
        };
        RoomData.prototype.enemyMin = function () {
            return this._enemyMin;
        };
        RoomData.prototype.enemyMax = function () {
            return this._enemyMax;
        };
        Object.defineProperty(RoomData.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomData.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomData.prototype, "w", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomData.prototype, "h", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoomData.prototype, "hasPass", {
            get: function () {
                return this._hasPass;
            },
            enumerable: true,
            configurable: true
        });
        RoomData.prototype.tileId = function (x, y, z) {
            return this._data[(z * this.originalHeight() + y + 1) * this.originalWidth() + x + 1] || 0;
        };
        RoomData.prototype.randomBottomPass = function () {
            return this.randomRegion(1);
        };
        RoomData.prototype.randomLeftPass = function () {
            return this.randomRegion(3);
        };
        RoomData.prototype.randomTopPass = function () {
            return this.randomRegion(2);
        };
        RoomData.prototype.randomRightPass = function () {
            return this.randomRegion(4);
        };
        RoomData.prototype.randomRegion = function (regionId) {
            var candidates = this.findRegionList(regionId);
            var ret = candidates[Math.randomInt(candidates.length)];
            return ret;
        };
        RoomData.prototype.findRegionList = function (regionId) {
            var result = [];
            for (var x = 0; x < this.originalWidth(); x++) {
                for (var y = 0; y < this.originalHeight(); y++) {
                    if (this.regionId(x, y) == regionId) {
                        result.push(new Point(x + this.x - 1, y + this.y - 1));
                    }
                }
            }
            return result;
        };
        RoomData.prototype.regionId = function (x, y) {
            return this.originalTileId(x, y, 5) || 0;
        };
        RoomData.prototype.originalTileId = function (x, y, z) {
            var width = this.originalWidth();
            var height = this.originalHeight();
            return this._data[(z * height + y) * width + x] || 0;
        };
        RoomData.prototype.floorTileId = function () {
            switch ($gameVariables.value(1)) {
                case 1: return 2816;
                case 2: return 2824;
                case 3: return 2816;
                case 4: return 2864;
                case 5: return 3680;
            }
            return 2816;
        };
        RoomData.prototype.wallTileId = function () {
            switch ($gameVariables.value(1)) {
                case 1: return 6474;
                case 2: return 6282;
                case 3: return 7146;
                case 4: return 6426;
                case 5: return 8106;
            }
            return 6474;
        };
        RoomData.prototype.topTileId = function () {
            switch ($gameVariables.value(1)) {
                case 1: return 6088;
                case 2: return 5888;
                case 3: return 6752;
                case 4: return 6032;
                case 5: return 5984;
            }
            return 6088;
        };
        RoomData.prototype.makeTopPass = function (xx, yy) {
            var x = xx - this.x;
            var y = yy - this.y;
            this._data[(y + 1) * this.originalWidth() + x + 1] = this.floorTileId();
            this._data[(y + 1 + 1) * this.originalWidth() + x + 1] = this.floorTileId();
            //this._data[(0 * this.originalHeight() + y + 1 + 2) * this.originalWidth() + x + 1] = this.floorTileId();
            /*for (let z = 1; z <= 1; z++) {
                this._data[(z * this.originalHeight() + y + 1) * this.originalWidth() + x + 1] = 0;
                this._data[(z * this.originalHeight() + y + 1 + 1) * this.originalWidth() + x + 1] = 0;
                this._data[(z * this.originalHeight() + y + 1 + 2) * this.originalWidth() + x + 1] = 0;
            }*/
            this._data[(4 * this.originalHeight() + y + 1 + 1) * this.originalWidth() + x + 1] = 5;
            this._data[(y + 1) * this.originalWidth() + x + 1 - 1] = this.topTileId();
            this._data[(y + 1) * this.originalWidth() + x + 1 + 1] = this.topTileId();
            this._data[(y + 1) * this.originalWidth() + x + 1 - 1] = this.createAutoTileTop(x, y + 1);
            this._data[(y + 1) * this.originalWidth() + x + 1 + 1] = this.createAutoTileTop(x + 2, y + 1);
            this._exitList.push(new Point(xx, yy + 1));
        };
        RoomData.prototype.createAutoTileTop = function (x, y) {
            var base = this.topTileId();
            if (this.isRoof(x - 1, y)) {
                return base + 40 - 1;
            }
            if (this.isRoof(x + 1, y)) {
                return base + 42 - 1;
            }
            if (this.isRoof(x, y + 1)) {
                return base + 33 - 1;
            }
            return base;
        };
        RoomData.prototype.isRoof = function (x, y) {
            var tileId = this._data[y * this.originalWidth() + x];
            return (tileId >= this.topTileId() && tileId < this.topTileId() + 48);
        };
        RoomData.prototype.makeBottomPass = function (xx, yy, passW, passLeft) {
            var x = xx - this.x;
            var y = yy - this.y;
            this._data[(y + 1) * this.originalWidth() + x + 1] = this.floorTileId();
            this._data[(y - 1 + 1) * this.originalWidth() + x + 1] = this.floorTileId();
            /*for (let z = 1; z <= 1; z++) {
                this._data[(z * this.originalHeight() + y + 1) * this.originalWidth() + x + 1] = this.floorTileId();
                this._data[(z * this.originalHeight() + y - 1 + 1) * this.originalWidth() + x + 1] = this.floorTileId();
            }*/
            this._data[(4 * this.originalHeight() + y + 1) * this.originalWidth() + x + 1] = 5;
            this._data[(y + 1) * this.originalWidth() + x + 1 - 1] = this.topTileId() + 32;
            this._data[(y + 1) * this.originalWidth() + x + 1 + 1] = this.topTileId() + 32;
            this._data[(y + 1 - 1) * this.originalWidth() + x + 1 - 1] = this.topTileId();
            this._data[(y + 1 - 1) * this.originalWidth() + x + 1 + 1] = this.topTileId();
            this._data[(y + 1 - 1) * this.originalWidth() + x + 1 - 1] = this.createAutoTileBottom(x, y);
            this._data[(y + 1 - 1) * this.originalWidth() + x + 1 + 1] = this.createAutoTileBottom(x + 2, y);
            this._exitList.push(new Point(xx, yy));
            //p(passW + ' ' + passLeft)
            if (passLeft) {
                if (passW > x) {
                    passW = x;
                    //p('update')
                }
            }
            for (var xx_1 = 0; xx_1 < passW; xx_1++) {
                var xxx = xx_1;
                if (passLeft) {
                    xxx = -xxx;
                }
                if (xx_1 == 0) {
                    if (passLeft) {
                        this._data[(y + 1) * this.originalWidth() + x + 1 - 1 + xxx] = this.topTileId() + 39;
                    }
                    else {
                        this._data[(y + 1) * this.originalWidth() + x + 1 + 1 + xxx] = this.topTileId() + 41;
                    }
                }
                else if (xx_1 == passW - 1) {
                    if (passLeft) {
                        this._data[(y + 1) * this.originalWidth() + x + 1 - 1 + xxx] = this.topTileId() + 35;
                    }
                    else {
                        this._data[(y + 1) * this.originalWidth() + x + 1 + 1 + xxx] = this.topTileId() + 37;
                    }
                }
                else {
                    if (passLeft) {
                        this._data[(y + 1) * this.originalWidth() + x + 1 - 1 + xxx] = this.topTileId() + 33;
                    }
                    else {
                        this._data[(y + 1) * this.originalWidth() + x + 1 + 1 + xxx] = this.topTileId() + 33;
                    }
                }
            }
        };
        RoomData.prototype.createAutoTileBottom = function (x, y) {
            var base = this.topTileId();
            if (this.isRoof(x - 1, y)) {
                return base + 38 - 1;
            }
            if (this.isRoof(x + 1, y)) {
                return base + 36 - 1;
            }
            if (this.isRoof(x, y - 1)) {
                return base + 33 - 1;
            }
            return base;
        };
        RoomData.prototype.makeLeftPass = function (xx, yy, symbolMap) {
            var x = xx - this.x;
            var y = yy - this.y;
            this._data[(0 * this.originalHeight() + y + 1) * this.originalWidth() + x + 1] = this.floorTileId();
            for (var z = 1; z < 4; z++) {
                this._data[(z * this.originalHeight() + y + 1) * this.originalWidth() + x + 1] = this.floorTileId();
            }
            this._data[(4 * this.originalHeight() + y + 1) * this.originalWidth() + x + 2] = 0;
            this._data[(0 * this.originalHeight() + y - 1 + 1) * this.originalWidth() + x + 1] = this.wallTileId() + 4;
            this._exitList.push(new Point(xx, yy));
        };
        RoomData.prototype.makeRightPass = function (xx, yy, symbolMap) {
            var x = xx - this.x;
            var y = yy - this.y;
            for (var z = 0; z < 3; z++) {
                this._data[(z * this.originalHeight() + y + 1) * this.originalWidth() + x + 1] = this.floorTileId();
            }
            this._data[(0 * this.originalHeight() + y - 1 + 1) * this.originalWidth() + x + 1] = this.wallTileId() + 1;
            this._exitList.push(new Point(xx, yy));
        };
        return RoomData;
    }());
    Nore.RoomData = RoomData;
    var HasPass = /** @class */ (function () {
        function HasPass() {
            this.t = false;
            this.b = false;
            this.l = false;
            this.r = false;
        }
        return HasPass;
    }());
    Nore.HasPass = HasPass;
})(Nore || (Nore = {}));
var $dataMap1 = null;
var $dataMap2 = null;
var $dataMap3 = null;
var $dataMap4 = null;
var $dataMap5 = null;
var $dataMap6 = null;
var $dataMap7 = null;
var $dataMap8 = null;
var $dataMap9 = null;
var $dataMap10 = null;
DataManager.loadMapData2 = function (mapId, index) {
    if (mapId > 0) {
        var filename = "Map%1.json".format(mapId.padZero(3));
        this.loadDataFile("$dataMap" + index, filename);
    }
    else {
        this.makeEmptyMap();
    }
};
Game_MapGeneratorRoomAndPass.prototype.makePasses = function () {
    var cache = {};
    //p(this._blocks)
    for (var crntIndex = 0; crntIndex < this._adjacentBlockIndexList.length; crntIndex++) {
        cache[crntIndex] = [];
        var crngBlock = this._blocks[crntIndex];
        for (var direction in this._adjacentBlockIndexList[crntIndex]) {
            var tgetIndexList = this._adjacentBlockIndexList[crntIndex][direction];
            tgetIndexList.forEach(function (tgetIndex) {
                if (cache[tgetIndex] !== undefined && cache[tgetIndex].indexOf(crntIndex) !== -1) {
                    return;
                }
                cache[crntIndex].push(tgetIndex);
                var tgetBlock = this._blocks[tgetIndex];
                var crntRoom = this._rooms[crntIndex];
                var tgetRoom = this._rooms[tgetIndex];
                var crntPass = { x: 0, y: 0, w: 0, h: 0 };
                var tgetPass = { x: 0, y: 0, w: 0, h: 0 };
                var bordPass = { x: 0, y: 0, w: 0, h: 0 };
                switch (direction) {
                    case 't':
                        if (crntRoom.hasPass.t || tgetRoom.hasPass.b) {
                            return;
                        }
                        var topBlock1 = crntRoom.randomTopPass();
                        var bottomBlock1 = tgetRoom.randomBottomPass();
                        crntPass.x = topBlock1.x;
                        crntPass.y = crngBlock.y;
                        crntPass.w = 1;
                        crntPass.h = crntRoom.y - crngBlock.y;
                        crntPass.h++;
                        tgetPass.x = bottomBlock1.x;
                        tgetPass.y = tgetRoom.y + tgetRoom.h;
                        tgetPass.w = 1;
                        tgetPass.h = crngBlock.y - tgetPass.y;
                        bordPass.x = Math.min(crntPass.x, tgetPass.x);
                        bordPass.y = crngBlock.y - 1;
                        bordPass.w = Math.max(crntPass.x, tgetPass.x) - bordPass.x + 1;
                        bordPass.h = 1;
                        crntRoom.makeTopPass(topBlock1.x, topBlock1.y);
                        alert(3);
                        console.error(222);
                        tgetRoom.makeBottomPass(bottomBlock1.x, bottomBlock1.y);
                        crntRoom.hasPass.t = true;
                        tgetRoom.hasPass.b = true;
                        break;
                    case 'b':
                        {
                            if (crntRoom.hasPass.b || tgetRoom.hasPass.t) {
                                return;
                            }
                            var bottomBlock = crntRoom.randomBottomPass();
                            var topBlock = tgetRoom.randomTopPass();
                            crntPass.x = bottomBlock.x;
                            crntPass.y = crntRoom.y + crntRoom.h;
                            crntPass.w = 1;
                            crntPass.h = tgetBlock.y - crntPass.y;
                            tgetPass.x = topBlock.x;
                            tgetPass.y = tgetBlock.y;
                            tgetPass.w = 1;
                            tgetPass.h = tgetRoom.y - tgetBlock.y + 1;
                            bordPass.x = Math.min(crntPass.x, tgetPass.x);
                            bordPass.y = tgetBlock.y - 1;
                            bordPass.w = Math.max(crntPass.x, tgetPass.x) - bordPass.x + 1;
                            bordPass.h = 1;
                            var passW = 0;
                            var passLeft = false;
                            if (crntPass.h == 2) {
                                passW = bordPass.w;
                                passLeft = crntPass.x > tgetPass.x;
                            }
                            crntRoom.makeBottomPass(bottomBlock.x, bottomBlock.y, passW, passLeft);
                            tgetRoom.makeTopPass(topBlock.x, topBlock.y);
                            crntRoom.hasPass.b = true;
                            tgetRoom.hasPass.t = true;
                        }
                        break;
                    case 'l':
                        {
                            if (crntRoom.hasPass.l || tgetRoom.hasPass.r) {
                                return;
                            }
                            var leftBlock1 = crntRoom.randomLeftPass();
                            var rightBlock1 = tgetRoom.randomRightPass();
                            crntPass.x = crngBlock.x - 1;
                            crntPass.y = leftBlock1.y;
                            crntPass.w = crntRoom.x - crntPass.x;
                            crntPass.h = 1;
                            tgetPass.x = tgetRoom.x + tgetRoom.w;
                            tgetPass.y = rightBlock1.y;
                            tgetPass.w = crntPass.x - tgetRoom.x - tgetRoom.w;
                            tgetPass.h = 1;
                            bordPass.x = crngBlock.x - 1;
                            bordPass.y = Math.min(crntPass.y, tgetPass.y);
                            bordPass.w = 1;
                            bordPass.h = Math.max(crntPass.y, tgetPass.y) - bordPass.y + 1;
                            crntRoom.makeLeftPass(leftBlock1.x, leftBlock1.y, this._symbolMap);
                            tgetRoom.makeRightPass(rightBlock1.x, rightBlock1.y, this._symbolMap);
                            crntRoom.hasPass.l = true;
                            tgetRoom.hasPass.r = true;
                        }
                        break;
                    case 'r':
                        {
                            if (crntRoom.hasPass.r || tgetRoom.hasPass.l) {
                                return;
                            }
                            var rightBlock1 = crntRoom.randomRightPass();
                            var leftBlock1 = tgetRoom.randomLeftPass();
                            crntPass.x = crntRoom.x + crntRoom.w;
                            crntPass.w = tgetBlock.x - 1 - crntRoom.x - crntRoom.w;
                            crntPass.y = rightBlock1.y;
                            crntPass.h = 1;
                            tgetPass.x = tgetBlock.x - 1;
                            tgetPass.y = leftBlock1.y;
                            tgetPass.w = tgetRoom.x - tgetPass.x;
                            tgetPass.h = 1;
                            bordPass.x = tgetBlock.x - 1;
                            bordPass.y = Math.min(crntPass.y, tgetPass.y);
                            bordPass.w = 1;
                            bordPass.h = Math.max(crntPass.y, tgetPass.y) - bordPass.y + 1;
                            crntRoom.makeRightPass(rightBlock1.x, rightBlock1.y, this._symbolMap);
                            tgetRoom.makeLeftPass(leftBlock1.x, leftBlock1.y, this._symbolMap);
                            crntRoom.hasPass.r = true;
                            tgetRoom.hasPass.l = true;
                        }
                        break;
                }
                this._passes.push(crntPass);
                this._passes.push(tgetPass);
                this._passes.push(bordPass);
            }, this);
        }
    }
    this._passes.forEach(function (pass) {
        for (var y = 0; y < pass.h; y++) {
            for (var x = 0; x < pass.w; x++) {
                this._symbolMap[pass.x + x][pass.y + y] = 'pass';
            }
        }
    }, this);
    this.printMap();
};
// マップデータ作成
Game_MapGenerator.prototype.makeData = function () {
    var width = $dataMap.width;
    var height = $dataMap.height;
    for (var _i = 0, _a = this._rooms; _i < _a.length; _i++) {
        var room = _a[_i];
        for (var x = 0; x < room.w; x++) {
            for (var y = 0; y < room.h; y++) {
                var xx = x + room.x;
                var yy = y + room.y;
                if (this._data[(0 * height + yy) * width + xx]) {
                    continue;
                }
                for (var z = 0; z < 6; z++) {
                    this._data[(z * height + yy) * width + xx] = room.tileId(x, y, z);
                }
            }
        }
    }
    for (var x = 0; x < this._symbolMap.length; x++) {
        for (var y = 0; y < this._symbolMap[x].length; y++) {
            for (var z = 0; z < 6; z++) {
                if (this._symbolMap[x][y] == 'room2') {
                    continue;
                }
                if (!this._data[(z * height + y) * width + x]) {
                    this._data[(z * height + y) * width + x] = this.autoTileId(x, y, z);
                }
            }
        }
    }
    this.printMap();
};
Scene_Load.prototype.reloadMapIfUpdated = function () {
    var isRogue = $gameMap._rooms && $gameMap._rooms.length > 0;
    if ($gameSystem.versionId() !== $dataSystem.versionId && !isRogue) {
        var mapId = $gameMap.mapId();
        var x = $gamePlayer.x;
        var y = $gamePlayer.y;
        $gamePlayer.reserveTransfer(mapId, x, y);
        $gamePlayer.requestMapReload();
    }
};
