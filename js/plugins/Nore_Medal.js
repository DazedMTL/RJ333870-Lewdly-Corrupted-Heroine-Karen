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
 *
 * @command Check
 * @text チェック
 * @des チェック
 *
 * @command Add
 * @text 追加
 * @des 追加
 * @arg armorId
 * @text 称号ID
 * @arg change
 * @type boolean
 * @text change
 * @desc 強制セット？
 *
 * @command Change
 * @text 変更
 * @des 変更
 * @arg armorId
 * @text 称号ID
 */
var $gameMedals;
var MEDAL_IFNO = {
    601: ['level', 1],
    602: ['level', 10],
    603: ['level', 30],
    604: ['level', 50],
    605: ['level', 75],
    606: ['level', 99],
    608: ['victory', 1],
    609: ['victory', 10],
    610: ['victory', 30],
    614: ['quest', 1],
    615: ['quest', 3],
    616: ['quest', 5],
    620: ['gold', 10000],
    621: ['gold', 50000],
    622: ['gold', 100000],
    630: ['keiken', 10],
    631: ['keiken', 50],
    632: ['keiken', 100],
    633: ['syusan', 1],
    634: ['syusan', 5],
    639: ['syusan', 10],
    638: ['fela', 20],
    545: ['hScene', 10],
    551: ['death', 1],
    552: ['death', 5],
    560: ['maxDamage', 50],
    561: ['maxDamage', 80],
    562: ['maxDamage', 100],
    565: ['critical', 5],
    566: ['critical', 10],
    567: ['critical', 20],
    568: ['critical', 40],
    591: ['medal', 30],
    592: ['medal', 50],
    598: ['damage', 1000],
    641: ['skill1', 10],
    648: ['junyuuMan', 1],
    649: ['junyuuMan', 5],
    651: ['junyuuMan', 10],
    652: ['junyuu', 1],
    653: ['junyuu', 5],
    655: ['ninshin', 1],
    656: ['ninshin', 3],
    657: ['ninshin', 5],
    950: ['ninshin', 1],
    667: ['gokkun', 1000],
    668: ['bukkake', 1000],
    669: ['syusanMonster', 1],
    672: ['nakadashi', 100],
    673: ['acme', 200],
    674: ['analSex', 50],
};
var Game_Medal = /** @class */ (function () {
    function Game_Medal() {
        this._selectedId = 600;
        this._medalParamMap = {};
        this.updateName();
    }
    Game_Medal.prototype.selectedId = function () {
        return this._selectedId;
    };
    Game_Medal.prototype.setSelectedId = function (id) {
        this._selectedId = id;
        this.updateName();
    };
    Game_Medal.prototype.updateName = function () {
        var name = $dataArmors[this._selectedId].name;
        $gameVariables.setValue(99, name);
    };
    Game_Medal.prototype.update = function () {
        this._text = '';
        this.checkMedal();
        this.checkAcme();
        this.checkManko();
        this.checkNakadashi();
        this.checkChitsu();
        this.checkAnal();
        this.checkNinshin();
        this.checkKeiken();
        this.checkGokkun();
        this.checkBukkake();
        this.checkSyusanMonster();
        this.checkAnalSex();
        this.checkFela();
        this.checkBurusera();
    };
    Game_Medal.prototype.checkBurusera = function () {
        if ($gameActors.mainActor().outerBottomId != 'g') {
            return;
        }
        if ($gameActors.mainActor().outerTopId != 'd') {
            return;
        }
        this.addMedal(663);
    };
    Game_Medal.prototype.checkMedal = function () {
        this.checkGet('fela');
    };
    Game_Medal.prototype.medalList = function () {
        var ret = [];
        //for (var id in this._medalMap) {
        for (var i = 501; i < 999; i++) {
            var armor = $dataArmors[i];
            if (armor && armor.atypeId == 12) {
                ret.push(armor);
            }
        }
        return ret;
    };
    Game_Medal.prototype.getEro = function () {
        return $gameSystem.getEro(1);
    };
    Game_Medal.prototype.checkAcme = function () {
        var n = this.getEro().acme;
        if (n >= 100) {
            this.addMedal(918);
        }
        if (n >= 200) {
            this.addMedal(673);
        }
    };
    Game_Medal.prototype.checkManko = function () {
        var n = this.getEro().chitsuTightening;
        if (n < 0) {
            this.addMedal(937);
        }
        if (n <= -100) {
            this.addMedal(938);
        }
    };
    Game_Medal.prototype.checkChitsu = function () {
        /*const n = this.getEro().chitsuStatus;
        if (n >= 1000) {
            this.addMedal(943);
        }*/
    };
    Game_Medal.prototype.checkNakadashi = function () {
        var n = this.getEro().nakadashiTotal;
        if (n >= 100) {
            this.addMedal(672);
        }
    };
    Game_Medal.prototype.checkAnal = function () {
        var n = this.getEro().anal;
        if (n >= 20) {
            this.addMedal(948);
        }
        var n2 = this.getEro().analTightening;
        if (n2 < 0) {
            this.addMedal(939);
        }
        if (n2 <= -100) {
            this.addMedal(940);
        }
    };
    Game_Medal.prototype.checkNinshin = function () {
        var n = $gameVariables.value(86);
        if (n >= 1) {
            //this.addMedal(950);
        }
        if (n >= 2) {
            //this.addMedal(952)
        }
    };
    Game_Medal.prototype.checkGokkun = function () {
        var n = this.getEro().seiekiNomu;
        if (n >= 1000) {
            this.addMedal(667);
        }
    };
    Game_Medal.prototype.checkBukkake = function () {
        var n = this.getEro().bukkake;
        if (n >= 1000) {
            this.addMedal(668);
        }
    };
    Game_Medal.prototype.checkSyusanMonster = function () {
        var n = $gameSystem.getEro(1).syusanMonster;
        if (n >= 1) {
            this.addMedal(669);
        }
        if (n >= 5) {
            this.addMedal(670);
        }
    };
    Game_Medal.prototype.checkAnalSex = function () {
        var n = $gameSystem.getEro(1).anal;
        if (n >= 50) {
            this.addMedal(674);
        }
    };
    Game_Medal.prototype.checkFela = function () {
        var n = this.getEro().fela;
        if (n >= 20) {
            this.addMedal(945);
        }
    };
    Game_Medal.prototype.checkKeiken = function () {
        var n = $gameSystem.getEro(1).keikenPeople();
        for (var m in MEDAL_IFNO) {
            var info = MEDAL_IFNO[m];
            if (info[0] == 'keiken') {
                if (info[1] <= n) {
                    this.addMedal(parseInt(m));
                }
            }
        }
        if (this.getEro().keikenPeople() >= 5) {
            this.addMedal(917);
        }
        if (this.getEro().keikenMonster() >= 10) {
            this.addMedal(947);
        }
    };
    Game_Medal.prototype.addMedal = function (medalId) {
        if ($gameSwitches.value(999)) {
            return;
        }
        var armor = $dataArmors[medalId];
        if ($gameParty.hasItem(armor)) {
            return;
        }
        if (medalId >= 900) {
            $gameSwitches.setValue(medalId - 100, true);
        }
        $gameSwitches.setValue(852, false);
        $gameParty.gainItem(armor, 1);
        var typeText = $dataSystem.armorTypes[armor.atypeId];
        this._text += typeText + ':' + armor.name + ' を獲得した！\n';
        $gameTemp.addItemLog(armor);
        if (medalId < 900) {
            $gameMedals.setSelectedId(medalId);
        }
    };
    Game_Medal.prototype.getProgress = function (medalId) {
        if (this.hasMedal(medalId)) {
            return 100;
        }
        var info = MEDAL_IFNO[medalId];
        if (!info) {
            return 0;
        }
        //p(this.getCurrent(medalId)  + ' ' + this.getMax(medalId))
        return this.getCurrent(medalId) * 100 / this.getMax(medalId);
    };
    Game_Medal.prototype.hasMedal = function (medalId) {
        var armor = $dataArmors[medalId];
        return $gameParty.hasItem(armor);
    };
    Game_Medal.prototype.getCurrent = function (medalId) {
        if (this.hasMedal(medalId)) {
            return 1;
        }
        var info = MEDAL_IFNO[medalId];
        if (!info) {
            return 0;
        }
        return this.getParam(info[0]) || 0;
    };
    Game_Medal.prototype.getParam = function (key) {
        switch (key) {
            case 'level':
                if ($gameActors.mainActor().currentClass() == $dataClasses[1]) {
                    return 0;
                }
                return $gameActors.mainActor()._level;
            case 'keiken':
                return $gameSystem.getEro(1).keikenPeople();
            case 'fela':
                return $gameSystem.getEro(1).fela;
            case 'gold':
                return $gameParty.gold();
            case 'gokkun':
                return $gameSystem.getEro(1).seiekiNomu;
            case 'bukkake':
                return $gameSystem.getEro(1).bukkake;
            case 'syusanMonster':
                return $gameSystem.getEro(1).syusanMonster;
            case 'nakadashi':
                return $gameSystem.getEro(1).nakadashiTotal;
            case 'acme':
                return $gameSystem.getEro(1).acme;
            case 'analSex':
                return $gameSystem.getEro(1).anal;
        }
        return this._medalParamMap[key];
    };
    Game_Medal.prototype.getMax = function (medalId) {
        if (this.hasMedal(medalId)) {
            return 1;
        }
        var info = MEDAL_IFNO[medalId];
        if (!info) {
            return 0;
        }
        return info[1];
    };
    Game_Medal.prototype.calcProgress = function (type, max, beforeValue) {
        var n = this._updateParam(type, 0);
        var per = Math.floor((n - beforeValue) * 100 / (max - beforeValue));
        if (per > 100) {
            per = 100;
        }
        if (per < 0) {
            per = 0;
        }
        return per;
    };
    Game_Medal.prototype.checkGet = function (type) {
        for (var key in MEDAL_IFNO) {
            var info = MEDAL_IFNO[key];
            if (info[0] != type) {
                continue;
            }
            var armorId = parseInt(key);
            if (this.getProgress(armorId) >= 100) {
                this.addMedal(armorId);
            }
        }
    };
    Game_Medal.prototype.onVictory = function () {
        this._updateParam('victory', 1);
    };
    Game_Medal.prototype.onQuest = function () {
        this._updateParam('quest', 1);
    };
    Game_Medal.prototype.onGold = function (n) {
        this.checkGet('gold');
    };
    Game_Medal.prototype.onNinshin = function () {
        this._updateParam('ninshin', 1);
    };
    Game_Medal.prototype.onJunyuuMan = function () {
        this._updateParam('junyuuMan', 1);
    };
    Game_Medal.prototype.onSyusanSodom = function () {
        this._updateParam('syusan', 1);
    };
    Game_Medal.prototype.onJunyuu = function () {
        this._updateParam('junyuu', 1);
    };
    Game_Medal.prototype._updateParam = function (name, plus) {
        var map = this._medalParamMap;
        map[name] = map[name] || 0;
        map[name] += plus;
        if (plus > 0) {
            this.checkGet(name);
        }
        return map[name];
    };
    Game_Medal.prototype.isSetEroMedal = function () {
        var medal = $dataArmors[this._selectedId];
        if (!medal) {
            return false;
        }
        if (medal.meta['eroMedal']) {
            return true;
        }
        else {
            return false;
        }
    };
    Game_Medal.prototype.isSetAnalMedal = function () {
        var medal = $dataArmors[this._selectedId];
        if (!medal) {
            return false;
        }
        if (medal.meta['analMedal']) {
            return true;
        }
        else {
            return false;
        }
    };
    Game_Medal.prototype.isSetYowaiMedal = function () {
        var medal = $dataArmors[this._selectedId];
        if (!medal) {
            return false;
        }
        if (medal.meta['yowai']) {
            return true;
        }
        else {
            return false;
        }
    };
    Game_Medal.prototype.isSetRokudenashiMedal = function () {
        var medal = $dataArmors[this._selectedId];
        if (!medal) {
            return false;
        }
        if (medal.meta['rokudenashi']) {
            return true;
        }
        else {
            return false;
        }
    };
    return Game_Medal;
}());
var Nore;
(function (Nore) {
    var pluginName = 'Nore_Medal';
    PluginManager.registerCommand(pluginName, 'Check', function (args) {
        $gameMedals.update();
    });
    PluginManager.registerCommand(pluginName, 'Add', function (args) {
        $gameMedals.addMedal(parseInt(args.armorId));
        /*const change = args.change == 'true';
        if (change) {
            $gameMedals.setSelectedId(parseInt(args.armorId));
        }*/
    });
    PluginManager.registerCommand(pluginName, 'Change', function (args) {
        $gameMedals.setSelectedId(parseInt(args.armorId));
    });
    var _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_createGameObjects.call(this);
        $gameMedals = new Game_Medal();
    };
    function getMedalDescription(armor) {
        var text = armor.description;
        if (armor.meta['gold']) {
            text += '\\C[16]取得効果:\\C[0] ' + armor.meta['gold'] + 'G を取得する';
        }
        if (armor.meta['hint']) {
            text += '\n' + TextManager.condition + armor.meta['hint'];
        }
        return text;
    }
    Nore.getMedalDescription = getMedalDescription;
    function getMedalHintDescription(armor) {
        var text = TextManager.condition + armor.meta['hint'] + '\n';
        return text;
    }
    Nore.getMedalHintDescription = getMedalHintDescription;
    var Scene_Medal = /** @class */ (function (_super) {
        __extends(Scene_Medal, _super);
        function Scene_Medal() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Medal.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createHelpWindow();
            this.createMedalWindow();
        };
        Scene_Medal.prototype.createHelpWindow = function () {
            var rect = this.helpWindowRect();
            this._helpWindow = new Window_Help(rect);
            this.addWindow(this._helpWindow);
        };
        Scene_Medal.prototype.helpWindowRect = function () {
            return new Rectangle(0, 0, Graphics.boxWidth, 100);
        };
        Scene_Medal.prototype.createMedalWindow = function () {
            var rect = new Rectangle(0, this._helpWindow.height, Graphics.boxWidth, Graphics.boxHeight - this._helpWindow.height);
            this._medalWindow = new Window_Medal(rect);
            this.addWindow(this._medalWindow);
            this._medalWindow.activate();
            this._medalWindow.refresh();
            this._medalWindow.setHandler('ok', this.onOk.bind(this));
            this._medalWindow.setHandler('change', this.onChange.bind(this));
            this._medalWindow.setHandler('cancel', this.popScene.bind(this));
            this._medalWindow.select(0);
        };
        Scene_Medal.prototype.onChange = function () {
            var item = this._medalWindow.item();
            var hint = item.meta['hintId'];
            if ($gameMedals.hasMedal(item.id)) {
                this._helpWindow.setText(getMedalDescription(item));
            }
            else if (hint && $gameMedals.hasMedal(hint)) {
                if (item.meta['hidden'] && !$gameSwitches.value(123)) {
                    this._helpWindow.setText('？？？');
                }
                else {
                    this._helpWindow.setText(getMedalHintDescription(item));
                }
            }
            else {
                this._helpWindow.setText('？？？');
            }
        };
        Scene_Medal.prototype.onOk = function () {
            var item = this._medalWindow.item();
            if (!this._medalWindow.isEnabled(item)) {
                this._medalWindow.activate();
                return;
            }
            $gameMedals.setSelectedId(item.id);
            this._medalWindow.refresh();
            this._medalWindow.activate();
        };
        return Scene_Medal;
    }(Scene_MenuBase));
    Nore.Scene_Medal = Scene_Medal;
    var Window_Medal = /** @class */ (function (_super) {
        __extends(Window_Medal, _super);
        function Window_Medal() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._medalList = [];
            return _this;
        }
        Window_Medal.prototype.initialize = function (rect) {
            Window_Selectable.prototype.initialize(rect);
        };
        Window_Medal.prototype.refresh = function () {
            var myMask = new PIXI.Graphics();
            myMask.beginFill(999, 1);
            var m = this.margin + 1;
            myMask.drawRect(0, 100, this.width, this.height);
            myMask.endFill();
            this._windowContentsSprite.mask = myMask;
            this.makeItems();
            _super.prototype.refresh.call(this);
        };
        Window_Medal.prototype.drawAllItems = function () {
            this._windowContentsSprite.removeChildren();
            _super.prototype.drawAllItems.call(this);
        };
        Window_Medal.prototype.makeItems = function () {
            this._medalList = $gameMedals.medalList();
            this._medalList = this._medalList.sort(function (a, b) {
                var orderA = a.meta['order'] ? a.meta['order'] : a.id;
                var orderB = b.meta['order'] ? b.meta['order'] : b.id;
                return orderA - orderB;
            });
        };
        Window_Medal.prototype.maxItems = function () {
            return this._medalList.length;
        };
        Window_Medal.prototype.maxCols = function () {
            return 2;
        };
        Window_Medal.prototype.lineHeight = function () {
            return 45;
        };
        Window_Medal.prototype.spacing = function () {
            return 4;
        };
        Window_Medal.prototype.textPadding = function () {
            return 5;
        };
        Window_Medal.prototype.drawItem = function (index) {
            var item = this._medalList[index];
            if (item) {
                var rect = this.itemRect(index);
                rect.width -= this.textPadding();
                var enabled = this.isEnabled(item);
                this.changePaintOpacity(enabled);
                this.contents.fontSize = 28;
                var xx = rect.x + 40;
                var yy = rect.y + 2;
                if (enabled) {
                    this.drawItemName(item, xx, yy, rect.width - 0);
                }
                else {
                    this.drawItemName2(item, xx, yy, rect.width - 0);
                }
                if ($gameMedals.selectedId() == item.id) {
                    /* this.changePaintOpacity(true);
                     this.contents.fontSize = 20;
                     this.contents.fontBold = true;
                     this.changeTextColor('#F20');
                     this.drawText('セット',  rect.x + 10, rect.y + 2, 40, 'left');
                     this.contents.fontBold = false;*/
                    this.drawEquip(rect.x + 10, rect.y + 2);
                }
                this.changePaintOpacity(true);
                this.drawProgress(item, xx, rect.y + 16, rect.width + 0);
            }
        };
        Window_Medal.prototype.drawEquip = function (x, y) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 36, 66, 36));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = x + 10;
            sprite.y = y + 17 + this.scrollBaseY();
            this._windowContentsSprite.addChild(sprite);
        };
        Window_Medal.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/skill_tree'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('skill_tree');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/skill_tree';
                PIXI.utils.BaseTextureCache['system/skill_tree'] = baseTexture;
            }
            return baseTexture;
        };
        Window_Medal.prototype.isCurrentItemEnabled = function () {
            return this.isEnabled(this.item());
        };
        Window_Medal.prototype.itemRect = function (index) {
            var rect = new Rectangle(0, 0, 0, 0);
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.spacing()) - this.scrollBaseX() + 20;
            rect.y = Math.floor(index / maxCols) * rect.height - this.scrollBaseY();
            return rect;
        };
        Window_Medal.prototype.isEnabled = function (item) {
            return $gameMedals.hasMedal(item.id);
        };
        Window_Medal.prototype.item = function () {
            return this._medalList[this._index];
        };
        Window_Medal.prototype.drawItemName = function (item, x, y, width) {
            width = 290;
            if (item) {
                var iconBoxWidth = this.lineHeight();
                var padding = (iconBoxWidth - ImageManager.iconWidth) / 2;
                this.resetTextColor();
                this.drawIcon(item.iconIndex, x + padding, y + padding);
                //this.drawIcon2(item, x, y, width)
                this.drawText(item.name, x + iconBoxWidth + 6, y, width - iconBoxWidth, 'left');
            }
        };
        Window_Medal.prototype.drawItemName2 = function (item, x, y, width) {
            width = 290;
            if (item) {
                var iconBoxWidth = this.lineHeight();
                var padding = (iconBoxWidth - ImageManager.iconWidth) / 2;
                this.resetTextColor();
                this.drawIcon(item.iconIndex, x + padding, y + padding);
                //this.drawIcon2(item, x, y, width)
                var name = '';
                for (var i = 0; i < item.name.length; i++) {
                    name += '？';
                }
                this.drawText(name, x + iconBoxWidth + 6, y, width - iconBoxWidth, 'left');
            }
        };
        Window_Medal.prototype.update = function () {
            _super.prototype.update.call(this);
            this._windowContentsSprite.y = -this._scrollY;
        };
        Window_Medal.prototype.drawProgress = function (item, x, y, width) {
            var current = $gameMedals.getCurrent(item.id);
            var max = $gameMedals.getMax(item.id);
            var xx = 232;
            var gauge = new Nore.Sprite_GaugeProgress(null, current, max);
            gauge.x = x + xx;
            gauge.y = y + this.scrollBaseY();
            this._windowContentsSprite.addChild(gauge);
            gauge.update();
            //this.drawGauge(x + xx, y - 10, 370, progress / 100, color1, color2);
            this.contents.fontSize = 20;
            if (gauge.gaugeRate() >= 1) {
                this.changeTextColor(ColorManager.crisisColor());
            }
            else {
                this.changeTextColor(ColorManager.normalColor());
            }
            this.drawText('' + Math.floor(gauge.gaugeRate() * 100) + '%', x + 470, y - 20, 90, 'right');
        };
        return Window_Medal;
    }(Window_Selectable));
    var _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_prototype_createCommandWindow.call(this);
        this._commandWindow.setHandler('medal', function () {
            SceneManager.push(Scene_Medal);
        });
    };
    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameMedals = contents.medals;
    };
    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = _DataManager_makeSaveContents.call(this);
        contents.medals = $gameMedals;
        return contents;
    };
})(Nore || (Nore = {}));
