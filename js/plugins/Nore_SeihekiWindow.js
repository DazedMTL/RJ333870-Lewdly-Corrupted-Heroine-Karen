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
 *
 *
 * @command Show
 * @arg id
 * @text 表示
 * @des 表示
 */
var Nore;
(function (Nore) {
    var SeihekiWindow;
    (function (SeihekiWindow) {
        var pluginName = 'Nore_Seiheki';
        PluginManager.registerCommand(pluginName, 'Show', function (args) {
            var id = args.id;
            $gameTemp.addSeiheki(parseInt(id));
        });
        var Window_Seiheki = /** @class */ (function (_super) {
            __extends(Window_Seiheki, _super);
            function Window_Seiheki(item, y, callback) {
                if (y === void 0) { y = 300; }
                var _this = this;
                var x = 180;
                if ($gameSwitches.value(259)) {
                    x = 80;
                }
                _this = _super.call(this, new Rectangle(x, y, 380, 90)) || this;
                _this.padding = 3;
                _this._updateContents();
                _this._item = item;
                _this.backOpacity = 255;
                _this.opacity = 0;
                _this.contentsOpacity = 0;
                _this.refresh();
                _this.appearFrame = 12;
                _this.waitFrame = 150;
                _this.eraseFrame = 30;
                _this._callback = callback;
                _this.frameVisible = false;
                return _this;
            }
            Window_Seiheki.prototype.loadWindowskin = function () {
                this.windowskin = ImageManager.loadSystem('Window');
            };
            Window_Seiheki.prototype.refresh = function () {
                this.contents.clear();
                var item = this._item;
                var xx = 40;
                var yy = 30;
                this.contents.textColor = '#ff88aa';
                this.contents.fontSize = 24;
                var name = item.name;
                AudioManager.playSe({ name: 'Chime2', volume: 80, pitch: 100, pan: 0 });
                if (item.id < 500) {
                    this.contents.drawText('アクセ差分発動‼︎', xx - 20, 0, 300, 30, 'left');
                }
                else {
                    this.contents.drawText('スキル発動‼︎', xx - 20, 0, 300, 30, 'left');
                }
                this.contents.textColor = '#ffffff';
                this.contents.fontSize = 30;
                this.drawIcon(item.iconIndex, 2 + xx, 1 + yy);
                this.drawTextEx(name, 43 + xx, 1 + yy, 280);
                var text = item.description;
                if (item.meta && item.meta.get) {
                    text = item.meta.get;
                }
                this.drawTextEx(text, 343 + xx, 1 + yy, 600);
            };
            Window_Seiheki.prototype.update = function () {
                _super.prototype.update.call(this);
                this.appearFrame--;
                if (this.appearFrame > 0) {
                    this.opacity += 25;
                    this.contentsOpacity += 25;
                    return;
                }
                this.waitFrame--;
                if (this.waitFrame > 0) {
                    return;
                }
                this.eraseFrame--;
                this.opacity -= 25;
                this.contentsOpacity -= 25;
                this.y -= 3;
                if (this.eraseFrame === 0) {
                    this._callback();
                }
            };
            return Window_Seiheki;
        }(Window_Base));
        Game_Temp.prototype.addSeiheki = function (id) {
            this._seihekiLog = this._seihekiLog || [];
            this._seihekiLog.push($dataArmors[id]);
        };
        Game_Temp.prototype.nextSeihekiLog = function () {
            this._seihekiLog = this._seihekiLog || [];
            if (this._seihekiLog.length === 0) {
                return null;
            }
            return this._seihekiLog.shift();
        };
        var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
        Scene_Map.prototype.updateMain = function () {
            _Scene_Map_updateMain.call(this);
            var armor = $gameTemp.nextSeihekiLog();
            this._seihekiWindowCount = this._seihekiWindowCount || 0;
            if (armor) {
                var self = this;
                var window_1;
                var onFinish = function () {
                    //window.returnCanvas();
                    self._windowLayer.removeChild(window_1);
                    window_1.destroy({ texture: true, children: true });
                    self._seihekiWindowCount--;
                };
                window_1 = new Window_Seiheki(armor, 480 - self._seihekiWindowCount * 90, onFinish);
                this._seihekiWindowCount++;
                this.addWindow(window_1);
            }
        };
        Scene_Map.prototype.getLogWindowY = function () {
            for (var i = 0; i < 6; i++) {
                var found = false;
                for (var _i = 0, _a = this._logWindowList; _i < _a.length; _i++) {
                    var log = _a[_i];
                    if (log.yIndex === i) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    return i;
                }
            }
            return 0;
        };
    })(SeihekiWindow || (SeihekiWindow = {}));
})(Nore || (Nore = {}));
