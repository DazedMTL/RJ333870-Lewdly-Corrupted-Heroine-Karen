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
 * @desc 右に立ち絵表示
 *
 */
var Nore;
(function (Nore) {
    var INVISIBLE_MAP_IDS = [4];
    Spriteset_Map.prototype.createRightTachie = function () {
        this._rightTachie = new Sprite_RightTachie();
        this.addChild(this._rightTachie);
    };
    var BgInfo = /** @class */ (function () {
        function BgInfo() {
            this.bgId = '0';
        }
        return BgInfo;
    }());
    Nore.BgInfo = BgInfo;
    function getRightBgPath() {
        var bgId;
        if ($dataMap) {
            bgId = $dataMap.meta['bg'];
            if ($gameSwitches.value(12) && $dataMap.meta['bg2']) {
                bgId = $dataMap.meta['bg2'];
            }
            if (bgId) {
                if ($gameSwitches.value(150)) {
                    bgId = '_bar';
                }
                if ($gameSwitches.value(152)) {
                    bgId = '_world';
                }
                if ($gameActors.mainActor().hasState(32)) {
                    bgId += '_defeat';
                }
            }
        }
        if (!bgId) {
            bgId = 0;
        }
        return bgId;
    }
    Nore.getRightBgPath = getRightBgPath;
    var Sprite_EroStatus = /** @class */ (function (_super) {
        __extends(Sprite_EroStatus, _super);
        function Sprite_EroStatus() {
            var _this = _super.call(this) || this;
            _this.x = 130;
            _this.bitmap = new Bitmap(250, 800);
            _this._gauge = new Nore.Sprite_GaugeEro();
            _this._gauge.x = 228;
            _this._gauge.y = 78;
            _this.addChild(_this._gauge);
            _this.update();
            _this.refresh();
            return _this;
        }
        Sprite_EroStatus.prototype.refresh = function () {
            this._lastBreakId = this.actor().breakId;
            //this.bitmap.fillRect(20, 20, 300, 300, '#fff');
            this.bitmap.clear();
            //this.drawEroState();
            //this.drawIcon(2090, 227, 640);
            if ($gamePlayer.isDefeat()) {
                this.drawEroStatus();
            }
        };
        Sprite_EroStatus.prototype.actor = function () {
            return $gameActors.actor(1);
        };
        Sprite_EroStatus.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!$gameMap.isRogue()) {
                //this.visible = false;
                //return;
            }
            if (this.isChanged()) {
                this.refresh();
            }
        };
        Sprite_EroStatus.prototype.isChanged = function () {
            if (this.isStateChanged()) {
                return true;
            }
            /*if (! this._lastUpEroInfo || this._lastUpEroInfo.isChanged($gameTemp.upEroInfo())) {
                return true;
            }*/
            if (this._lastBreakId != this.actor().breakId) {
                return true;
            }
            return false;
        };
        Sprite_EroStatus.prototype.isStateChanged = function () {
            if (!this._lastStates) {
                return false;
            }
            var count1 = 0;
            var count2 = 0;
            for (var s in this.actor()._stateTurns) {
                count1++;
                if (this._lastStates[s] != this.actor()._stateTurns[s]) {
                    return true;
                }
            }
            for (var s in this._lastStates) {
                count2++;
            }
            return count1 != count2;
        };
        Sprite_EroStatus.prototype.drawEroState = function () {
            this._lastStates = JsonEx.makeDeepCopy(this.actor()._stateTurns);
            var x = 60;
            var y = 100;
            this.bitmap.fontSize = 25;
            for (var _i = 0, _a = this.actor().states(); _i < _a.length; _i++) {
                var s = _a[_i];
                if (!s.meta['ero']) {
                    continue;
                }
                this.drawIcon(s.iconIndex, x, y);
                this.bitmap.drawText(s.name, x + 36, y, 200, 40, 'left');
                y += 32;
            }
        };
        Sprite_EroStatus.prototype.drawEroStatus = function () {
            this._lastUpEroInfo = JsonEx.makeDeepCopy($gameTemp.upEroInfo());
            this.bitmap.fontSize = 22;
            var upEroInfo = $gameTemp.upEroInfo();
            this.drawItem(0, '妊娠率', 2003, 'ninshinRate', '%');
            this.drawItem(1, '中出し', 2031, 'nakadashi');
            this.drawItem(2, 'フェラ', 2004, 'fela');
            this.drawItem(3, TextManager.bukkake, 2026, 'bukkake');
            this.drawItem(4, '飲んだ精液', 2028, 'kounaiSeieki', 'ml');
            this.drawItem(5, 'キス', 2096, 'kiss');
            this.drawItem(6, 'アクメ', 2090, 'iku');
        };
        Sprite_EroStatus.prototype.drawItem = function (index, label, icon, prop, unit) {
            if (unit === void 0) { unit = ''; }
            var y = index * 32 + 520;
            var x = 0;
            this.bitmap.drawText(label, x + 38, y, 80, 30, 'left');
            this.drawIcon(icon, x, y);
            var up = $gameTemp.upEroInfo()[prop];
            this.bitmap.drawText(up, x + 32, y, 170, 30, 'right');
            if (unit) {
                this.bitmap.drawText(unit, x + 204, y, 120, 30, 'left');
            }
        };
        Sprite_EroStatus.prototype.drawIcon = function (iconIndex, x, y) {
            var bitmap = ImageManager.loadSystem("IconSet");
            var pw = ImageManager.iconWidth;
            var ph = ImageManager.iconHeight;
            var sx = (iconIndex % 16) * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
        };
        ;
        return Sprite_EroStatus;
    }(Sprite));
    var Sprite_RightTachie = /** @class */ (function (_super) {
        __extends(Sprite_RightTachie, _super);
        function Sprite_RightTachie(bgInfo) {
            if (bgInfo === void 0) { bgInfo = null; }
            var _this = _super.call(this, null) || this;
            _this._lastParams = [0, 0];
            _this._bgInfo = bgInfo;
            return _this;
        }
        Sprite_RightTachie.prototype.initialize = function () {
            var x = Graphics.width - this.contentsWidth();
            _super.prototype.initialize.call(this, new Rectangle(x, 0, this.contentsWidth(), this.contentsHeight()));
            this.frameVisible = false;
            //this.backOpacity = 0;
            this.margin = 0;
            this.padding = 0;
            this.createGauge();
            this.createEroSprite();
            this.redraw();
        };
        Sprite_RightTachie.prototype.update = function () {
            _super.prototype.update.call(this);
            if ($gameSwitches.value(6)) {
                this.visible = false;
                return;
            }
            if ($gameSwitches.value(249)) {
                this._actorLayer.visible = false;
            }
            else {
                this._actorLayer.visible = true;
            }
            var actor = $gameActors.actor(1);
            if (this.changed()) {
                this.redraw();
            }
            else if (actor.isCacheChanged()) {
                this.drawActor();
            }
            if (this._reloadBg) {
                this.redrawBg();
            }
            if (SceneManager._scene instanceof Scene_MenuBase) {
                this.show();
                return;
            }
            var offset = 30;
            switch (actor.bodyType()) {
                case 'a':
                case 'b':
                case 'c':
                case 'e':
                    if (actor.hasState(32)) {
                        this._actorLayer.y = 40 + offset;
                    }
                    else {
                        this._actorLayer.y = 0 + offset;
                    }
                    break;
                case 'd':
                    this._actorLayer.y = 80 + offset;
                    break;
            }
            if ($gameMap.isRogue()) {
                this.show();
                /*if (this.changed()) {
                    this.redraw();
                }*/
                return;
            }
            if ($gameSwitches.value(5)) {
                this.show();
            }
            else {
                if ($gameMap.mapId() == 28 || $gameMap.mapId() == 4) {
                    this.visible = false;
                    return;
                }
                /*if (INVISIBLE_MAP_IDS.indexOf($gameMap.mapId()) >= 0　|| $gameMap.isEventRunning()) {
                    if (this._wait > 0) {
                        this._wait--;
                        if (this._wait === 0) {
                            this.visible = false;
                        }
                    } else if (this.visible) {
                        this._wait = 5;
                    } else {
    
                    }
                } else {
                    this.show();
                }*/
                this.show();
            }
            if (actor.isDirty()) {
                this.redraw();
            }
        };
        Sprite_RightTachie.prototype.show = function () {
            if (!this.visible) {
                $gameActors.mainActor().setCacheChanged();
                this.redraw();
            }
            this.visible = true;
        };
        Sprite_RightTachie.prototype.changed = function () {
            if (!this._lastParams) {
                return true;
            }
            if ($gameSwitches.value(151)) {
                $gameSwitches.setValue(151, false);
                return true;
            }
            if ($gameActors.mainActor().hasState(32)) {
                if (!this._lastTentou) {
                    this._lastTentou = true;
                    return true;
                }
            }
            else {
                if (this._lastTentou) {
                    this._lastTentou = false;
                    return true;
                }
            }
            //p($gameActors.actor(1).calcBattleFaceId())
            var actor = $gameActors.actor(1);
            if ($gameSwitches.value(4) || true) {
                if (!this._lastSwitch) {
                    this._lastSwitch = true;
                    return true;
                }
                if (this._lastFaceId != actor.faceId) {
                    return true;
                }
            }
            else {
                if (this._lastSwitch) {
                    this._lastSwitch = false;
                    return true;
                }
                if (this._lastFaceId != actor.calcBattleFaceId()) {
                    return true;
                }
            }
            if (this._lastBreakId != actor.breakId) {
                return true;
            }
            return false;
        };
        Sprite_RightTachie.prototype.getBaseTexture = function () {
            var bgId;
            if (this._bgInfo) {
                bgId = this._bgInfo.bgId;
            }
            else {
                bgId = getRightBgPath();
            }
            return this.getBaseTexture2('right_bg' + bgId);
        };
        Sprite_RightTachie.prototype.getBaseTexture2 = function (bgId) {
            var baseTexture = PIXI.utils.BaseTextureCache['system/' + bgId];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem(bgId);
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/' + bgId;
                PIXI.utils.BaseTextureCache['system/' + bgId] = baseTexture;
            }
            return baseTexture;
        };
        Sprite_RightTachie.prototype.redrawBg = function () {
            this._bgLayer.removeChildren();
            var baseTexture = this.getBaseTexture();
            if (baseTexture) {
                var texture = new PIXI.Texture(baseTexture);
                var sprite = new PIXI.Sprite(texture);
                this._bgLayer.addChild(sprite);
                this._reloadBg = false;
                if (!$gameActors.mainActor().hasState(32)) {
                    var baseTexture2 = this.getBaseTexture2('right_frame');
                    var texture2 = new PIXI.Texture(baseTexture2);
                    var sprite2 = new PIXI.Sprite(texture2);
                    sprite2.x = 3;
                    this._bgLayer.addChild(sprite2);
                }
                var gra = new PIXI.Graphics();
                gra.beginFill(0, 1);
                gra.drawRect(0, 0, 3, 768);
                gra.endFill();
                this._bgLayer.addChild(gra);
            }
            else {
                this._reloadBg = true;
            }
        };
        Sprite_RightTachie.prototype.redraw = function () {
            this.contents.clear();
            this.contentsBack.clear();
            this.redrawBg();
            /*const color = "#000000";
            this.contentsBack.clear();
            this.contentsBack.paintOpacity = 255;
            this.contentsBack.fillRect(5, 0, 440, 768, color);*/
            this.drawActor();
            if ($gameMap.isRogue()) {
                this._nakadashiSprite.visible = false;
                this._keikenSprite.visible = false;
                this._hpGauge.visible = false;
                this._fameGauge.visible = false;
                this._frustrationGauge.visible = false;
                // this.drawRogueStatus();
            }
            else if ($gameSwitches.value(5)) {
                this._nakadashiSprite.visible = false;
                this._keikenSprite.visible = false;
                this._hpGauge.visible = false;
                this._fameGauge.visible = false;
                this._frustrationGauge.visible = false;
            }
            else {
                this._nakadashiSprite.visible = false;
                this._keikenSprite.visible = false;
                this._hpGauge.visible = false;
                this._fameGauge.visible = false;
                this._frustrationGauge.visible = false;
            }
        };
        Sprite_RightTachie.prototype.createEroSprite = function () {
            this._bgLayer = new Sprite();
            this.addChild(this._bgLayer);
            this._actorLayer = new Sprite();
            this._actorLayer.x = -120;
            this._actorLayer.y = 30;
            this.addChild(this._actorLayer);
            this._tachieBackLayer = new Sprite();
            this._actorLayer.addChild(this._tachieBackLayer);
            this._tachieLayer = new Sprite();
            this._actorLayer.addChild(this._tachieLayer);
            this._eroAnimeSprite = new Nore.Sprite_EroAnimeBase(this._tachieLayer);
            this._actorLayer.addChild(this._eroAnimeSprite);
            this._eroSprite = new Sprite_EroStatus();
            this.addChild(this._eroSprite);
        };
        Sprite_RightTachie.prototype.drawRogueStatus = function () {
            this.contents.fontSize = 22;
            var actor = $gameActors.actor(1);
            var y = 650;
            this.drawText(TextManager.param(2), 20, y, 200, 'left');
            this.drawText(actor.atk, 30, y, 100, "right");
            var weapon = actor.equips()[0];
            if (weapon) {
                //this.drawIcon(weapon.iconIndex(), 155, y)
                this.drawText(weapon.name(), 155, y, 200, 'left');
            }
            y += 50;
            this.drawText(TextManager.param(3), 20, y, 200, 'left');
            this.drawText(actor.def, 30, y, 100, "right");
            var armor = actor.equips()[1];
            if (armor) {
                //this.drawIcon(armor.iconIndex(), 155, y)
                this.drawText(armor.name(), 155, y, 200, 'left');
            }
            this._lastParams = [];
            this._lastParams[0] = actor.atk;
            this._lastParams[1] = actor.def;
        };
        Sprite_RightTachie.prototype.drawActor = function () {
            this._tachieLayer.removeChildren();
            var actor = $gameActors.mainActor();
            var hMinus = 0;
            if ($gameSwitches.value(4)) {
                hMinus = 0;
            }
            var rect = new Rectangle(120, -100, 600, 1000);
            var faceId = actor.faceId;
            if ($gameSwitches.value(5)) {
                if (faceId === 1 && this._lastFaceId > 1) {
                    faceId = this._lastFaceId;
                }
            }
            if ($gameSwitches.value(4) || true) {
                //if (actor.faceId != 1) {
                this._lastFaceId = faceId;
                //}
            }
            else {
                this._lastFaceId = actor.calcBattleFaceId();
            }
            this._lastBreakId = actor.breakId;
            var y = 0;
            var x = 0;
            this.drawTachieBack(1, this._tachieBackLayer, x, y, rect, this._lastFaceId);
            this.drawTachie(1, this._tachieLayer, x, y, rect, this._lastFaceId);
        };
        Sprite_RightTachie.prototype.drawSexInfo = function () {
            var ero = $gameSystem.getEro(1);
            //this.contents.fillRect(4,  this.contentsHeight() - 140, this.contentsWidth() - 8, 140 - 4, ColorManager.textColor(7));
            var sprite = this.createInnerSprite('hp', Sprite_Gauge);
            sprite.setup($gameActors.actor(1), 'hp');
            sprite.move(20, 640);
            sprite.show();
            var sprite3 = this.createInnerSprite('frustration', Sprite_Gauge);
            sprite3.setup($gameActors.actor(1), 'frustration');
            sprite3.move(20, 720);
            sprite3.show();
        };
        Sprite_RightTachie.prototype.createGauge = function () {
            var ero = $gameSystem.getEro(1);
            //this.contents.fillRect(4,  this.contentsHeight() - 140, this.contentsWidth() - 8, 140 - 4, ColorManager.textColor(7));
            var sprite = this.createInnerSprite('hp', Sprite_Gauge);
            sprite.setup($gameActors.actor(1), 'hp');
            sprite.move(20, 640);
            sprite.show();
            this._hpGauge = sprite;
            var sprite2 = this.createInnerSprite('fame', Sprite_Gauge);
            sprite2.setup($gameActors.actor(1), 'fame');
            sprite2.move(20, 680);
            sprite2.show();
            this._fameGauge = sprite2;
            var sprite3 = this.createInnerSprite('frustration', Sprite_Gauge);
            sprite3.setup($gameActors.actor(1), 'frustration');
            sprite3.move(20, 720);
            sprite3.show();
            this._frustrationGauge = sprite3;
            var sprite4 = this.createInnerSprite('nakadashi', Sprite_EroCount);
            sprite4.setup('nakadashi');
            sprite4.move(20, 680);
            sprite4.show();
            this._nakadashiSprite = sprite4;
            var type = 'keikenPerson';
            switch ($gameVariables.value(8)) {
                case 1:
                    type = 'keikenGoblin';
                    break;
            }
            var sprite5 = this.createInnerSprite(type, Sprite_EroCount);
            sprite5.setup(type);
            sprite5.move(20, 720);
            sprite5.show();
            this._keikenSprite = sprite5;
        };
        Sprite_RightTachie.prototype.contentsWidth = function () {
            return 378;
        };
        Sprite_RightTachie.prototype.contentsHeight = function () {
            return Graphics.height;
        };
        return Sprite_RightTachie;
    }(Window_StatusBase));
    Nore.Sprite_RightTachie = Sprite_RightTachie;
    var Sprite_EroCount = /** @class */ (function (_super) {
        __extends(Sprite_EroCount, _super);
        function Sprite_EroCount() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_EroCount.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.initMembers();
            this.createBitmap();
        };
        Sprite_EroCount.prototype.initMembers = function () {
            this._ero = $gameSystem.getEro(1);
            this._statusType = "";
            this._lastValue = 0;
        };
        Sprite_EroCount.prototype.createBitmap = function () {
            var width = this.bitmapWidth();
            var height = this.bitmapHeight();
            this.bitmap = new Bitmap(width, height);
        };
        Sprite_EroCount.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._lastValue != this.currentValue()) {
                this.refresh();
            }
        };
        Sprite_EroCount.prototype.bitmapWidth = function () {
            return 328;
        };
        Sprite_EroCount.prototype.bitmapHeight = function () {
            return 24;
        };
        Sprite_EroCount.prototype.setup = function (statusType) {
            this._statusType = statusType;
            this._lastValue = this.currentValue();
            this.refresh();
        };
        Sprite_EroCount.prototype.currentValue = function () {
            return this._ero[this._statusType];
        };
        Sprite_EroCount.prototype.refresh = function () {
            this.bitmap.clear();
            this.drawLabel();
            var value = this.currentValue();
            for (var i = 0; i < value; i++) {
            }
            this._lastValue = value;
            this.bitmap.textColor = ColorManager.normalColor();
            this.bitmap.drawText('+' + value, 20, this.labelY(), 280, this.bitmapHeight(), "right");
        };
        Sprite_EroCount.prototype.drawLabel = function () {
            var label = this.label();
            var x = this.labelOutlineWidth() / 2;
            var y = this.labelY();
            var width = this.bitmapWidth();
            var height = this.bitmapHeight();
            this.setupLabelFont();
            this.bitmap.paintOpacity = this.labelOpacity();
            this.bitmap.drawText(label, x, y, width, height, "left");
            this.bitmap.paintOpacity = 255;
        };
        Sprite_EroCount.prototype.label = function () {
            switch (this._statusType) {
                case 'nakadashi':
                    return TextManager.nakadashi;
                case 'keikenGoblin':
                    return TextManager.keikenGoblin;
                default:
                    return "";
            }
        };
        Sprite_EroCount.prototype.labelColor = function () {
            return ColorManager.systemColor();
        };
        Sprite_EroCount.prototype.labelOutlineColor = function () {
            return ColorManager.outlineColor();
        };
        Sprite_EroCount.prototype.labelOutlineWidth = function () {
            return 3;
        };
        Sprite_EroCount.prototype.labelY = function () {
            return 3;
        };
        Sprite_EroCount.prototype.setupLabelFont = function () {
            this.bitmap.fontFace = this.labelFontFace();
            this.bitmap.fontSize = this.labelFontSize();
            this.bitmap.textColor = this.labelColor();
            this.bitmap.outlineColor = this.labelOutlineColor();
            this.bitmap.outlineWidth = this.labelOutlineWidth();
        };
        Sprite_EroCount.prototype.labelFontFace = function () {
            return $gameSystem.mainFontFace();
        };
        Sprite_EroCount.prototype.labelFontSize = function () {
            return $gameSystem.mainFontSize() - 2;
        };
        Sprite_EroCount.prototype.labelOpacity = function () {
            return 255;
        };
        return Sprite_EroCount;
    }(Sprite));
})(Nore || (Nore = {}));
