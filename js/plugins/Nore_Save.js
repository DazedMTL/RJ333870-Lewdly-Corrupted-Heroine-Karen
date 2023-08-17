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
    var Window_SavefileList2 = /** @class */ (function (_super) {
        __extends(Window_SavefileList2, _super);
        function Window_SavefileList2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.drawTitle = function (savefileId, x, y) {
                this.changeTextColor(ColorManager.systemColor());
                if (savefileId === 0) {
                    this.drawText(TextManager.autosave, x, y, 180);
                }
                else {
                    this.drawText(TextManager.file, x, y, 180);
                    this.changeTextColor(ColorManager.crisisColor());
                    this.drawText(savefileId, x, y, 120, 'right');
                }
            };
            return _this;
        }
        Window_SavefileList2.prototype.maxCols = function () {
            return 3;
        };
        Window_SavefileList2.prototype.drawItem = function (index) {
            var savefileId = this.indexToSavefileId(index);
            var info = DataManager.savefileInfo(savefileId);
            var rect = this.itemRectWithPadding(index);
            this.resetTextColor();
            this.changePaintOpacity(this.isEnabled(savefileId));
            this.contents.fontSize = 22;
            this.drawTitle(savefileId, rect.x, rect.y + 4);
            this.changeTextColor(ColorManager.normalColor());
            if (info) {
                this.drawDays(info, rect.x + 112, rect.y + 4);
                this.drawMapName(info, rect.x + 12, rect.y + 4);
                this.drawContents(info, rect);
            }
        };
        Window_SavefileList2.prototype.drawContents = function (info, rect) {
            var bottom = rect.y + rect.height;
            this.drawPartyCharacters(info, rect.x + 20, bottom - 8);
            var lineHeight = this.lineHeight();
            var y2 = bottom - lineHeight - 4;
            if (y2 >= lineHeight) {
                this.drawPlaytime(info, rect.x + 4, y2 - 46, rect.width);
            }
        };
        Window_SavefileList2.prototype.drawPartyCharacters = function (info, x, y) {
            if (info.fileList) {
                var characterX = x + 5;
                for (var _i = 0, _a = info.fileList; _i < _a.length; _i++) {
                    var data = _a[_i];
                    //let pp = new Sprite_Player($gamePlayer)
                    this.drawCharacter(data, 0, characterX, y);
                }
            }
        };
        Window_SavefileList2.prototype.drawDays = function (info, x, y) {
            this.drawText(info.days + '日', x, y, 190, 'right');
            this.drawText('LV ' + info.level, x - 70, y, 190, 'right');
            var time = new Date(info.timestamp);
            var mm = (time.getMonth() + 1).padZero(2);
            var d = time.getDate().padZero(2);
            var h = time.getHours().padZero(2);
            var m = time.getMinutes().padZero(2);
            var s = time.getSeconds().padZero(2);
            var str = '%1/%2/%3 %4:%5:%6'.format(time.getFullYear(), mm, d, h, m, s);
            this.drawText(str, x - 152, y + 74, 340, 'right');
        };
        Window_SavefileList2.prototype.drawMapName = function (info, x, y) {
            var mapInfo = $dataMapInfos[info.mapId];
            if (mapInfo) {
                var name_1 = mapInfo.name;
                if (name_1.indexOf('<') > 0) {
                    name_1 = name_1.substr(0, name_1.indexOf('<'));
                }
                this.drawText(name_1, x + 44, y + 40, 140, 'right');
            }
        };
        Window_SavefileList2.prototype.selectSavefile = function (savefileId) {
            var index = Math.max(0, this.savefileIdToIndex(savefileId));
            this.select(index);
            this.setTopRow(Math.floor(index / 3));
        };
        ;
        return Window_SavefileList2;
    }(Window_SavefileList));
    Nore.Window_SavefileList2 = Window_SavefileList2;
    var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function () {
        var info = _DataManager_makeSavefileInfo.call(this);
        info.days = $gameVariables.value(4);
        info.mapId = $gameMap.mapId();
        info.level = $gameActors.mainActor()._level;
        info.fileList = new Sprite_Player($gamePlayer).listFiles();
        var cos = new CostumeSaver(true);
        cos.saveCostume();
        info.cos = cos;
        info.bgId = Nore.getRightBgPath();
        return info;
    };
    Scene_File.prototype.createListWindow = function () {
        var cos = new CostumeSaver(true);
        cos.saveCostume();
        this._lastCos = cos;
        var rect = this.listWindowRect();
        this._listWindow = new Window_SavefileList2(rect);
        this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
        this._listWindow.setHandler("cancel", this.onCancel.bind(this));
        this._listWindow.setHandler("change", this.onChange.bind(this));
        this._listWindow.setMode(this.mode(), this.needsAutosave());
        this._listWindow.selectSavefile(this.firstSavefileId());
        this._listWindow.refresh();
        this.addWindow(this._listWindow);
    };
    Scene_File.prototype.onCancel = function () {
        this._lastCos.restoreCostume(true);
        $gameActors.mainActor().setCacheChanged();
        $gameSwitches.setValue(249, false);
        this.popScene();
    };
    var Scene_Save_prototype_executeSave = Scene_Save.prototype.executeSave;
    Scene_Save.prototype.executeSave = function (savefileId) {
        this._lastCos.restoreCostume(true);
        $gameSwitches.setValue(249, false);
        Scene_Save_prototype_executeSave.call(this, savefileId);
    };
    Scene_File.prototype.onChange = function () {
        if (!this._rightTachie) {
            return;
        }
        var savefileId = this._listWindow.savefileId();
        var info = DataManager.savefileInfo(savefileId);
        if (info && info.cos) {
            //p(info.cos)
            if (this._bgInfo) {
                if (info.bgId) {
                    this._bgInfo.bgId = info.bgId;
                }
                else {
                    this._bgInfo.bgId = '0';
                }
                this._rightTachie.redrawBg();
            }
            info.cos.restoreCostume(true);
            $gameSwitches.setValue(249, false);
        }
        else {
            this._bgInfo.bgId = '0';
            $gameSwitches.setValue(249, true);
            this._rightTachie.redrawBg();
        }
        //this._rightTachie.setActor();
    };
    Scene_File.prototype.listWindowRect = function () {
        var wx = -4;
        var wy = this._helpWindow.height;
        var ww = Graphics.boxWidth - 370;
        var wh = Graphics.boxHeight - this._helpWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };
    var Scene_File_prototype_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function () {
        Scene_File_prototype_create.call(this);
        this.createRightTachie();
    };
    Scene_File.prototype.createRightTachie = function () {
        this._bgInfo = new Nore.BgInfo();
        this._rightTachie = new Nore.Sprite_RightTachie(this._bgInfo);
        this.addChild(this._rightTachie);
        this.onChange();
    };
    Scene_File.prototype.helpWindowRect = function () {
        var wx = -4;
        var wy = 0;
        var ww = Graphics.boxWidth - 370;
        var wh = this.calcWindowHeight(1, false);
        return new Rectangle(wx, wy, ww, wh);
    };
    var _Scene_Load_prototype_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function () {
        _Scene_Load_prototype_onLoadSuccess.call(this);
        Nore.rogueManager = null;
        Nore.phaseManager = null;
    };
    DataManager.maxSavefiles = function () {
        return 21;
    };
})(Nore || (Nore = {}));
// Open Save Screen
Game_Interpreter.prototype.command352 = function () {
    SceneManager.push(Scene_Save);
    return true;
};
