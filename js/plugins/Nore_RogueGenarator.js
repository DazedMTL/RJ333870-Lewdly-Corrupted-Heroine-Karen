/*:ja
 * @target MZ
 * @author ル
 *
 * @command Generate
 * @text 生成
 * @des 生成
 *
 * @command SetupEvent
 * @text イベントセットアップ
 * @des イベントセットアップ
 *
 * @command BeforeMove
 * @text 移動前
 * @des 移動前
 */
var Nore;
(function (Nore) {
    Scene_Map.prototype.createDisplayObjects = function () {
        if ($gameMap.beforeMove) {
            this.createWindowLayer();
            this.createMapNameWindow();
            //this.createAllWindows();
        }
        else {
            this.createSpriteset();
            this.createWindowLayer();
            this.createAllWindows();
            this.createButtons();
        }
    };
    var pluginName = 'Nore_RogueGenarator';
    PluginManager.registerCommand(pluginName, 'Generate', function (args) {
        $gameMap.generateMap('RoomAndPass');
        for (var _i = 0, _a = $gameMap._mapGenerator._rooms; _i < _a.length; _i++) {
            var r = _a[_i];
            var room = new Game_Room(new RoomDataArea(new Rectangle(r.x, r.y, r.w, r.h), r));
            $gameMap._rooms.push(room);
        }
    });
    PluginManager.registerCommand(pluginName, 'SetupEvent', function (args) {
        $gameMap.beforeMove = false;
        $gameMap.setupRogueEvents();
        SceneManager._scene.createDisplayObjects();
        if ($gameMap.isRogue()) {
            Nore.phaseManager.start();
        }
    });
    PluginManager.registerCommand(pluginName, 'BeforeMove', function (args) {
        $gameMap.beforeMove = true;
    });
    Game_MapGeneratorRoomAndPass.prototype.generateMap = function () {
        this._wallHeight = 1;
        this._showOuterWall = true;
        this._minRoomSize = 10;
        this._maxRoomSize = 17;
        if (this._maxRoomSize < this._minRoomSize) {
            this._maxRoomSize = this._minRoomSize;
        }
        this._minBlockSize = this._minRoomSize + (this._wallHeight + 1) * 2 + 2;
        this._minRooms = $gameMap.roomCount();
        this._maxRooms = 10;
        this._adjacentBlockIndexList = [];
        /*
        var block = {
            x:6,
            y:1,
            w:$dataMap.width - 14,
            h:$dataMap.height - 2
        };
        this._blocks.push(block);
        this.splitBlock(this._blocks[0]);
        p(this._blocks)
    */
        var y = 1;
        var maxY = $dataMap.height - 2;
        var minH = 15;
        for (var i = 0; i < this._minRooms; i++) {
            var h = Math.randomInt(8) + minH;
            if (y + h > maxY) {
                p('max');
                break;
            }
            var block = {
                x: 6,
                y: y,
                w: $dataMap.width - 14,
                h: h
            };
            this._blocks.push(block);
            y += h + 1;
        }
        //this.splitBlock(this._blocks[0]);
        p(this._blocks);
        this.makeAdjacentBlockIndexList();
        this.makeRooms();
        this.makePasses();
        p('マップを生成しました');
    };
})(Nore || (Nore = {}));
