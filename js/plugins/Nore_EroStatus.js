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
    var Scene_EroStatus = /** @class */ (function (_super) {
        __extends(Scene_EroStatus, _super);
        function Scene_EroStatus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_EroStatus.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createWindowLayer();
            this.createStatusWindow();
            this.createHelpWindow();
            this.onChange();
        };
        Scene_EroStatus.prototype.createStatusWindow = function () {
            this._window = new Window_EroStatus();
            this._window.setHandler('change', this.onChange.bind(this));
            this._window.setHandler('ok', this.onOk.bind(this));
            this.addWindow(this._window);
        };
        Scene_EroStatus.prototype.onChange = function () {
            var item = this._window.item();
            if (this._window.isOpened(item)) {
                this._helpWindow.setItem(item);
                this._window.updateEroItem();
            }
            else {
                var hint = item.meta['hint'];
                if (hint) {
                    this._helpWindow.setText(TextManager.condition + hint);
                }
                else {
                    this._helpWindow.setItem(null);
                }
                this._window.updateEroItem();
            }
        };
        Scene_EroStatus.prototype.onOk = function () {
            var item = this._window.item();
            this._window.activate();
            if (item.atypeId == 9) {
                this.changeAcce(item);
                return;
            }
            if (!this._window.isOpened(item)) {
                return;
            }
            var sw = item.id - 100;
            var value = $gameSwitches.value(sw);
            $gameSwitches.setValue(sw, !value);
            this._window.refresh();
        };
        Scene_EroStatus.prototype.changeAcce = function (item) {
            var acceId = parseInt(item.meta['armor']);
            var eroItem = findEroItem(acceId);
            if (eroItem && $gameParty.hasItem(eroItem)) {
                var actor = $gameActors.mainActor();
                if (actor.hasAcce(acceId)) {
                    actor.removeAcce(acceId);
                }
                else {
                    actor.addAcce(acceId);
                }
                this._window.refresh();
            }
            else {
                SoundManager.playBuzzer();
            }
        };
        Scene_EroStatus.prototype.createHelpWindow = function () {
            var rect = this.helpWindowRect();
            this._helpWindow = new Window_HelpBig(rect);
            this.addWindow(this._helpWindow);
        };
        Scene_EroStatus.prototype.helpWindowRect = function () {
            var rect = _super.prototype.helpWindowRect.call(this);
            rect.x = 300;
            rect.y = 20;
            rect.width = 700;
            rect.height = 132;
            return rect;
        };
        Scene_EroStatus.prototype.update = function () {
            _super.prototype.update.call(this);
            if (Input.isTriggered('cancel') || TouchInput.rightButton) {
                SoundManager.playCancel();
                $gameActors.mainActor().setCacheChanged();
                SceneManager.pop();
            }
        };
        return Scene_EroStatus;
    }(Scene_MenuBase));
    Nore.Scene_EroStatus = Scene_EroStatus;
    function findEroItem(before) {
        for (var i = 881; i <= 900; i++) {
            var armor = $dataArmors[i];
            if (armor && (parseInt(armor.meta['before']) == before)) {
                return armor;
            }
        }
        return null;
    }
    var Window_HelpBig = /** @class */ (function (_super) {
        __extends(Window_HelpBig, _super);
        function Window_HelpBig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_HelpBig.prototype.setItem = function (item) {
            if (!item) {
                this.setText('');
                return;
            }
            var text = item.description;
            var acceId = parseInt(item.meta['armor']);
            var eroItem = findEroItem(acceId);
            if (eroItem && $gameParty.hasItem(eroItem)) {
                text += '\n' + TextManager.hasItemToDisable.format(eroItem.name);
            }
            else {
                if (item.meta['hint']) {
                    text += '\n' + TextManager.condition + item.meta['hint'];
                }
            }
            this.setText(text);
        };
        return Window_HelpBig;
    }(Window_Help));
    Window_Help.prototype.resetFontSettings = function () {
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = 22;
        this.resetTextColor();
    };
    var Window_EroStatus = /** @class */ (function (_super) {
        __extends(Window_EroStatus, _super);
        function Window_EroStatus() {
            var _this = this;
            var x = -4;
            _this = _super.call(this, new Rectangle(x, -4, Graphics.width, Graphics.height)) || this;
            _this.createEroSprite();
            _this.refresh();
            _this.select(0);
            _this.activate();
            return _this;
        }
        Window_EroStatus.prototype.createEroSprite = function () {
            this._actorLayer = new Sprite();
            this._actorLayer.x = 870;
            this.addChild(this._actorLayer);
            this._tachieBackLayer = new Sprite();
            this._actorLayer.addChild(this._tachieBackLayer);
            this._tachieLayer = new Sprite();
            this._tachieLayer.y = 20;
            this._actorLayer.addChild(this._tachieLayer);
            this._eroAnimeSprite = new Nore.Sprite_EroAnimeBase(this._tachieLayer);
            this._actorLayer.addChild(this._eroAnimeSprite);
        };
        Window_EroStatus.prototype.resetNormalFont = function () {
            this.changeTextColor(ColorManager.normalColor());
            this.contents.fontSize = 18;
            this.changePaintOpacity(true);
        };
        Window_EroStatus.prototype.refresh = function () {
            this.makeItems();
            _super.prototype.refresh.call(this);
            this.drawActor();
            this.setupEroMarker();
            this._valueWidth = 184;
            var actor = $gameActors.mainActor();
            var x = 20;
            var y = 20;
            this.draHatsutaiken(x, y - 4);
            this.drawKeiken(x, y + 75);
            this.drawCount(x, y + 180);
            this.drawStatus(x, y + 486);
            var xx = x + 650;
            this.drawHarami(xx, y + 486);
            this.drawBust(xx + 220, y + 486);
            this.drawTightening(x, y + 624);
            var taneoya = $gameActors.mainActor().sikyu().taneoyaId;
            if ($dataEnemies[taneoya]) {
                this.drawTaneoya($dataEnemies[taneoya], xx, y + 546);
            }
            else {
                this.drawSikyu(xx, y + 546, actor.sikyu().seiekiListMini());
            }
            this.drawSkills(x + 300, y + 128);
            this.drawChitsu(x + 300, y + 400);
            this.updateEroItem();
        };
        Window_EroStatus.prototype.drawTaneoya = function (enemy, x, y) {
            this.contents.fontSize = 20;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText('Mother of Offspring', x, y, 200, 'left');
            this.resetFontSettings();
            this.contents.fontSize = 20;
            this.drawText(getTaneoyaName(enemy), x + 60, y + 30, 200, 'left');
            var sp = new Sprite_MiniCharacter(new Nore.Game_EnemyCharacter(enemy.id, x + 52, y + 72));
            this.addChild(sp);
        };
        Window_EroStatus.prototype.updateEroItem = function () {
            if (!this._eroMarker) {
                return;
            }
            this._eroMarker.visible = false;
            var item = this.item();
            if (!item) {
                return;
            }
            if (!this.isOpened(item)) {
                return;
            }
            var armorId = parseInt(item.meta['armor']);
            if (isNaN(armorId)) {
                return;
            }
            var armor = $dataArmors[armorId];
            var x = parseInt(armor.meta['x']);
            var y = parseInt(armor.meta['y']);
            if (isNaN(x) || isNaN(y)) {
                return;
            }
            this._eroMarker.x = x;
            this._eroMarker.y = y;
            this._eroMarker.visible = true;
        };
        Window_EroStatus.prototype.drawKeiken = function (x, y) {
            var actor = $gameActors.mainActor();
            this.drawLabel('Total Experiences', x, y, 2080);
            var list = ['people', 'enemy', 'monster'];
            var xx = x + 40;
            var yy = y;
            this.resetNormalFont();
            var ero = $gameSystem.getEro(actor.actorId());
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var type = list_1[_i];
                yy += this.lineHeight();
                var name_1 = getNakadashiTarget(type);
                this.drawText(name_1, xx, yy, 200, 'left');
                var nakadashi = ero.keiken(type);
                var unit = ' x';
                if (type == 'monster') {
                    unit = ' x';
                }
                this.drawText(nakadashi + unit, xx, yy, this._valueWidth, 'right');
            }
        };
        Window_EroStatus.prototype.drawCount = function (x, y) {
            var actor = $gameActors.mainActor();
            this.drawLabel('Sex Experiences', x, y, 2103);
            var list = ['nakadashiTotal', 'anal', 'fela', 'acme', 'baisyun', 'bukkake',
                'seiekiNomu', 'seiekiNakadashi', 'syusanHuman', 'syusanMonster'];
            var xx = x + 40;
            var yy = y;
            this.resetNormalFont();
            var ero = $gameSystem.getEro(actor.actorId());
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var type = list_2[_i];
                yy += this.lineHeight();
                var name_2 = getEroParamTitle(type);
                this.drawText(name_2, xx, yy, 120, 'left');
                var value = ero[type];
                if (type.indexOf('seieki') >= 0 || type.indexOf('bukkake') >= 0) {
                    this.drawText(value + ' ml', xx, yy, this._valueWidth, 'right');
                }
                else {
                    if (type == 'syusanMonster') {
                        this.drawText(value + ' x', xx, yy, this._valueWidth, 'right');
                    }
                    else if (type == 'syusanHuman') {
                        this.drawText(value + ' x', xx, yy, this._valueWidth, 'right');
                    }
                    else {
                        this.drawText(value + ' x', xx, yy, this._valueWidth, 'right');
                    }
                }
            }
        };
        Window_EroStatus.prototype.lineHeight = function () {
            return 24;
        };
        Window_EroStatus.prototype.drawHarami = function (x, y) {
            var actor = $gameActors.mainActor();
            this.drawLabel('Stomach', x, y, 2003);
            this.resetNormalFont();
            var yy = y;
            var xx = x + 40;
            yy += this.lineHeight();
            var text = 'Normal';
            switch (actor.boteId) {
                case 2:
                    text = 'Early';
                    break;
                case 3:
                    text = 'Mid';
                    break;
                case 4:
                    text = 'Late';
                    break;
            }
            this.drawText(text, xx, yy, this._valueWidth, 'left');
            /*
            const taneoya = $gameActors.mainActor().sikyu().taneoyaId;
            if ($dataEnemies[taneoya]) {
                const taneoyaName = $dataEnemies[taneoya].name;
                this.drawText('(' + taneoyaName + ')', xx + 74, yy, this._valueWidth, 'left');
            }*/
        };
        Window_EroStatus.prototype.drawBust = function (x, y) {
            var actor = $gameActors.mainActor();
            this.drawLabel('Chest', x, y, 2000);
            this.resetNormalFont();
            var yy = y;
            var xx = x + 40;
            yy += this.lineHeight();
            var text = 'Normal';
            switch (actor.breastsId) {
                case 2:
                    text = 'Pretty';
                    break;
                case 3:
                    text = 'Huge';
                    break;
                case 4:
                    text = 'Small';
                    break;
            }
            this.drawText(text, xx, yy, this._valueWidth, 'left');
        };
        Window_EroStatus.prototype.drawStatus = function (x, y) {
            var actor = $gameActors.mainActor();
            this.drawLabel('Development', x, y, 2090);
            var list = ['chitsu', 'anal', 'kuchi', 'chikubi'];
            var xx = x + 40;
            var yy = y;
            this.resetNormalFont();
            var ero = $gameSystem.getEro(actor.actorId());
            var list2 = [CHITSU_LV, ANAL_LV, KUCHI_LV, CHIKUBI_LV];
            for (var i = 0; i < list.length; i++) {
                var type = list[i];
                var map = list2[i];
                yy += this.lineHeight();
                var name_3 = getEroStatusTitle(type);
                this.drawText(name_3, xx, yy, 200, 'left');
                var value = ero[type + 'Status'];
                this.drawText(value, xx, yy, this._valueWidth, 'right');
                var rank = calcKaihatsuRank(value);
                this.drawText(Nore.hankaku2Zenkaku(rank), xx + 110, yy, this._valueWidth, 'left');
                this.drawText(map[rank], xx + 200, yy, 400, 'left');
            }
        };
        Window_EroStatus.prototype.drawTightening = function (x, y) {
            var actor = $gameActors.mainActor();
            this.drawLabel('Tightness', x, y, 2020);
            var list = ['chitsu', 'anal'];
            var xx = x + 40;
            var yy = y;
            this.resetNormalFont();
            var ero = $gameSystem.getEro(actor.actorId());
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var type = list_3[_i];
                yy += this.lineHeight();
                var name_4 = getEroStatusTitle(type);
                this.drawText(name_4, xx, yy, 200, 'left');
                var value = ero[type + 'Tightening'];
                this.drawTighteningGauge(x + 102, yy + 6, value);
                if (value > 0) {
                    value = '+' + value;
                }
                else if (value == 0) {
                    value = '±' + value;
                }
                else {
                    value = Math.max(value, -99);
                }
                this.drawText(value, xx, yy, this._valueWidth, 'right');
                var rank = this.calcTightenRank(value);
                if (type == 'chitsu') {
                    this.drawText(CHITSU_TIGHTENING[rank], xx + 200, yy, 400, 'left');
                }
                else {
                    this.drawText(ANAL_TIGHTENING[rank], xx + 200, yy, 400, 'left');
                }
            }
        };
        Window_EroStatus.prototype.drawTighteningGauge = function (x, y, value) {
            var xx = 40;
            this.contents.fillRect(x, y, xx * 2 + 1, 10, '#333');
            this.contents.fillRect(x + xx, y, Math.max(value, -99) * xx / 100, 10, '#BB4444');
            this.contents.fillRect(x + xx, y, 1, 10, '#FFFFFF');
        };
        Window_EroStatus.prototype.calcTightenRank = function (value) {
            if (value >= 75) {
                return '1';
            }
            if (value >= 25) {
                return '2';
            }
            if (value <= -25) {
                return '4';
            }
            if (value <= -75) {
                return '5';
            }
            return '3';
        };
        Window_EroStatus.prototype.drawChitsu = function (x, y) {
        };
        Window_EroStatus.prototype.drawActor = function () {
            this._tachieLayer.removeChildren();
            var actor = JsonEx.makeDeepCopy($gameActors.mainActor());
            actor.setOuterBottomId('a');
            actor.setOuterTopId('a');
            actor.setOuterId('a');
            actor.setInnerTopId('a');
            actor.setInnerBottomId('a');
            actor.setArmId('a');
            actor.setLegId('a');
            var faceId = actor.calcBattleFaceId();
            this.drawTachieActor(actor, this._tachieLayer, 0, 0, null, faceId);
        };
        Window_EroStatus.prototype.setupEroMarker = function () {
            if (this._eroMarker) {
                this._tachieLayer.removeChild(this._eroMarker);
            }
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture);
            var sprite = new PIXI.Sprite(texture);
            sprite.x = 100;
            sprite.y = 100;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this._eroMarker = sprite;
            this._tachieLayer.addChild(sprite);
        };
        Window_EroStatus.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/eroStatus'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('eroStatus');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/eroStatus';
                PIXI.utils.BaseTextureCache['system/eroStatus'] = baseTexture;
            }
            return baseTexture;
        };
        Window_EroStatus.prototype.draHatsutaiken = function (x, y) {
            this.resetNormalFont();
            this.drawLabel('First Experience', x, y, 404);
            this.resetNormalFont();
            var enemyId = $gameActors.mainActor().sikyu().hatsutaiken;
            if (enemyId > 0) {
                var enemy = $dataEnemies[enemyId];
                this.drawText(getTaneoyaName(enemy), x + 60, y + 30, 200, 'left');
                var sp = new Sprite_MiniCharacter(new Nore.Game_EnemyCharacter(enemyId, x + 52, y + 72));
                this.addChild(sp);
            }
            else {
                this.drawText('Virgin', x + 40, y + 30, 200, 'left');
            }
        };
        Window_EroStatus.prototype.drawLabel = function (text, x, y, iconIndex) {
            this.contents.fontSize = 22;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(text, x + 34, y, 300, 'left');
            if (iconIndex > 0) {
                this.drawIcon(iconIndex, x, y - 4);
            }
        };
        Window_EroStatus.prototype.drawSkills = function (x, y) {
            var actor = $gameActors.mainActor();
            this.drawLabel('Equipped Curse', x, y);
            this.drawLabel('Fetish/Characteristic', x, y + 148);
            //this.drawLabel('肉体改造', x, y + 362);
            this.resetNormalFont();
            x += 20;
            y += 40;
            var lh = this.lineHeight();
        };
        Window_EroStatus.prototype.makeItems = function () {
            this._data = [];
            for (var id = 900; id <= 999; id++) {
                var armor = $dataArmors[id];
                if (!armor) {
                    continue;
                }
                if (armor.atypeId == 9) {
                    this._data.push(armor);
                }
            }
            for (var id = 900; id <= 999; id++) {
                var armor = $dataArmors[id];
                if (!armor) {
                    continue;
                }
                if (armor.atypeId == 10 || armor.atypeId == 11) {
                    this._data.push(armor);
                }
            }
            this._data = this._data.sort(function (a, b) {
                var orderA = a.id;
                var orderB = b.id;
                if (a.meta['order']) {
                    orderA = parseInt(a.meta['order']);
                }
                if (b.meta['order']) {
                    orderB = parseInt(b.meta['order']);
                }
                return orderA - orderB;
            });
        };
        Window_EroStatus.prototype.maxCols = function () {
            return 4;
        };
        Window_EroStatus.prototype.drawItem = function (index) {
            var rect = this.itemRect(index);
            this.resetNormalFont();
            var item = this.itemAt(index);
            if (item) {
                var opened = this.isOpened(item);
                var enabled = this.isEnabled(item);
                var text = item.name;
                if (opened && enabled) {
                    this.changeTextColor(ColorManager.crisisColor());
                }
                else {
                    this.changeTextColor(ColorManager.textColor(8));
                }
                if (!opened) {
                    var text2 = '';
                    for (var i = 0; i < text.length; i++) {
                        text2 += '？';
                    }
                    text = text2;
                }
                this.changePaintOpacity(opened);
                this.drawText(text, rect.x + 10, rect.y + 4, 126, 'left');
            }
        };
        Window_EroStatus.prototype.isEnabled = function (item) {
            if (item.atypeId == 9) {
                var armor = parseInt(item.meta['armor']);
                if (!isNaN(armor)) {
                    return $gameActors.mainActor().hasAcce(armor);
                }
                return true;
            }
            return $gameSwitches.value(item.id - 100);
        };
        Window_EroStatus.prototype.isOpened = function (item) {
            return $gameParty.hasItem(item);
        };
        Window_EroStatus.prototype.item = function () {
            return this.itemAt(this.index());
        };
        Window_EroStatus.prototype.itemAt = function (index) {
            return this._data[index];
        };
        Window_EroStatus.prototype.itemWidth = function () {
            return 140;
        };
        Window_EroStatus.prototype.spacing = function () {
            return 4;
        };
        Window_EroStatus.prototype.itemRect = function (index) {
            var rect = new Rectangle(0, 0, 0, 0);
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX + 340;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 176;
            if (index >= 12) {
                rect.y += 50;
            }
            if (index >= 36) {
                rect.y += 250;
            }
            return rect;
        };
        Window_EroStatus.prototype.maxItems = function () {
            return this._data ? this._data.length : 1;
        };
        return Window_EroStatus;
    }(Window_Selectable));
})(Nore || (Nore = {}));
var Sprite_MiniCharacter = /** @class */ (function (_super) {
    __extends(Sprite_MiniCharacter, _super);
    function Sprite_MiniCharacter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sprite_MiniCharacter.prototype.updateCharacterFrame = function () {
        var pw = this.patternWidth();
        var ph = this.patternHeight();
        var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
        var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
        this.updateHalfBodySprites();
        var offset = this.imageOffsetY();
        this.setFrame(sx, sy, pw, ph - offset);
    };
    Sprite_MiniCharacter.prototype.imageOffsetY = function () {
        if (this.character() instanceof Nore.Game_EnemyCharacter) {
            var enemy = this.character();
            if (enemy.enemyData().meta['charaOffset']) {
                return parseInt(enemy.enemyData().meta['charaOffset']);
            }
        }
        if (this._characterName.includes('actor') || this._characterName.includes('mob')) {
            return 30;
        }
        else {
            return 0;
        }
    };
    Sprite_MiniCharacter.prototype.updatePosition = function () {
        this.x = this._character.screenX();
        this.y = this._character.screenY();
        this.z = this._character.screenZ();
    };
    ;
    return Sprite_MiniCharacter;
}(Sprite_Character));
Window_Base.prototype.drawSikyu = function (x, y, sikyuSeieki, showNew) {
    if (showNew === void 0) { showNew = false; }
    this.contents.fontSize = 20;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText('Semen in Womb', x, y, 200, 'left');
    this.contents.fontSize = 16;
    this.changeTextColor(ColorManager.normalColor());
    if (sikyuSeieki.length == 0) {
        this.changeTextColor(ColorManager.normalColor());
        this.drawText('None', x + 44, y + 30, 200, 'left');
        return;
    }
    y += 40;
    var index = 0;
    for (var _i = 0, sikyuSeieki_1 = sikyuSeieki; _i < sikyuSeieki_1.length; _i++) {
        var s = sikyuSeieki_1[_i];
        var enemy = $dataEnemies[s.enemyId()];
        var sp = new Sprite_MiniCharacter(new Nore.Game_EnemyCharacter(s.enemyId(), x + 40, y + 40));
        this._windowContentsSprite.addChild(sp);
        this.drawText(parseEnemyName(enemy), x + 60, y, 200, 'left');
        if (showNew && s.isNew()) {
            this.contents.fontSize = 11;
            this.drawText('NEW', x + 200, y, 200, 'left');
        }
        this.contents.fontSize = 16;
        var rank = enemy.meta['ninshin'];
        this.drawText(s.value() + ' ml', x + 90, y, 200, 'right');
        /*this.changeTextColor(ColorManager.systemColor());
        this.drawText('繁殖力', x + 270, y, 200, 'left');
        this.changeTextColor(ColorManager.normalColor());
        this.drawText(rank, x + 344, y, 200, 'left');*/
        y += this.lineHeight();
        index++;
        if (index >= 7) {
            break;
        }
    }
};
function parseEnemyName(enemy) {
    var name = enemy.name;
    if (name.indexOf('(') > 0) {
        return name.substr(0, name.indexOf('('));
    }
    else {
        return name;
    }
}
function calcKaihatsuRank(value) {
    if (value <= 200) {
        return 'G';
    }
    if (value <= 500) {
        return 'F';
    }
    if (value <= 1000) {
        return 'E';
    }
    if (value <= 2000) {
        return 'D';
    }
    if (value <= 3500) {
        return 'C';
    }
    if (value <= 5000) {
        return 'B';
    }
    return 'A';
}
