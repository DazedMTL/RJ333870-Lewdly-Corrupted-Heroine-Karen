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
var Nore;
(function (Nore) {
    var Window_TensouGold = /** @class */ (function (_super) {
        __extends(Window_TensouGold, _super);
        function Window_TensouGold() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_TensouGold.prototype.value = function () {
            return $gameParty.ether();
        };
        ;
        Window_TensouGold.prototype.drawCurrencyValue = function (value, unit, x, y, width) {
            var unitWidth = Math.min(80, this.textWidth(unit));
            this.resetTextColor();
            this.drawText(value, x, y, width - 6, "right");
            this.changeTextColor(ColorManager.systemColor());
            //this.drawIcon(895, x + width - unitWidth, y);
            var s = Nore.getBinSprite();
            s.x = 4;
            s.y = 4;
            this._contentsSprite.addChild(s);
        };
        return Window_TensouGold;
    }(Window_Gold));
    Nore.Window_TensouGold = Window_TensouGold;
    var _Window_Help_prototype_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function (item) {
        if (item && item.meta['skill']) {
            var skill = $dataSkills[parseInt(item.meta['skill'])];
            this.setText('\\C[6]' + skill.name + '\\C[16]  消費MP:' + '\\C[0]' + skill.mpCost + '\n' + skill.description);
        }
        else {
            _Window_Help_prototype_setItem.call(this, item);
        }
    };
    var Scene_Upgrade = /** @class */ (function (_super) {
        __extends(Scene_Upgrade, _super);
        function Scene_Upgrade() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Upgrade.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createGoldWindow();
            this.createHelpWindow();
            this.createUpgradeWindow();
            this.createConfirmWindow();
            this.createMsgWindow();
            this.createTutoArrow();
        };
        Scene_Upgrade.prototype.isTuto = function () {
            return !$gameSwitches.value(23);
        };
        Scene_Upgrade.prototype.createTutoArrow = function () {
            if (!this.isTuto()) {
                return;
            }
            this._arrow = new TutoArrow(70, 50);
            this._upgradeWindow.addInnerChild(this._arrow);
        };
        Scene_Upgrade.prototype.createHelpWindow = function () {
            _super.prototype.createHelpWindow.call(this);
            this._helpWindow.x = this._goldWindow.width - 4;
            this._helpWindow.y = -4;
            this._helpWindow.width = Graphics.boxWidth - this._goldWindow.width + 8;
        };
        Scene_Upgrade.prototype.createUpgradeWindow = function () {
            this._upgradeWindow = new Window_Upgrade($gameTemp.upgradeType);
            this._upgradeWindow.setHandler('ok', this.onOk.bind(this));
            this._upgradeWindow.setHandler('change', this.onChange.bind(this));
            this._upgradeWindow.setHandler('cancel', this.onCancel.bind(this));
            this._upgradeWindow.activate();
            this.addWindow(this._upgradeWindow);
        };
        Scene_Upgrade.prototype.createGoldWindow = function () {
            if ($gameTemp.upgradeType == UpGrade.KAREN) {
                this._goldWindow = new Window_EroGold(new Rectangle(-4, -4, 196, 96));
            }
            else {
                this._goldWindow = new Window_TensouGold(new Rectangle(-4, -4, 196, 96));
            }
            this.addWindow(this._goldWindow);
        };
        Scene_Upgrade.prototype.createConfirmWindow = function () {
            this._confirmWindow = new Nore.Window_Confirm();
            this._confirmWindow.setText('決定しますか？');
            this._confirmWindow.setHandler('ok', this.onConfirmOk.bind(this));
            this._confirmWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._confirmWindow.deactivate();
            this.addWindow(this._confirmWindow);
            this._confirmWindow.hide();
        };
        Scene_Upgrade.prototype.createMsgWindow = function () {
            this._msgWindow = new Nore.Window_Msg(136);
            this._msgWindow.setHandler('ok', this.onConfirmCancel.bind(this));
            this._msgWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._msgWindow.deactivate();
            this.addWindow(this._msgWindow);
            this._msgWindow.hide();
        };
        Scene_Upgrade.prototype.onConfirmCancel = function () {
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            this._msgWindow.hide();
            this._msgWindow.deactivate();
            this._upgradeWindow.activate();
        };
        Scene_Upgrade.prototype.onConfirmOk = function () {
            if (!this._upgradeWindow.canBuy()) {
                this._confirmWindow.hide();
                var text = TextManager.notEnoughMoney;
                if ($gameTemp.upgradeType >= 2) {
                    text = TextManager.notEnoughSeieki;
                }
                this._msgWindow.setText(text);
                this._msgWindow.setInfo(true);
                this._msgWindow.show();
                this._msgWindow.activate();
                return;
            }
            this._upgradeWindow.decide();
            this._upgradeWindow.refresh();
            this._upgradeWindow.activate();
            $gameSwitches.setValue(23, true);
            if (this._arrow) {
                this._arrow.visible = false;
            }
            SoundManager.playShop();
            this._goldWindow.refresh();
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            if (this._upgradeWindow.selectedItem().meta['room']) {
                SceneManager.pop();
            }
        };
        Scene_Upgrade.prototype.onCancel = function () {
            if (!$gameSwitches.value(23)) {
                this._upgradeWindow.activate();
                return;
            }
            this.popScene();
        };
        Scene_Upgrade.prototype.onOk = function () {
            if (!this._upgradeWindow.canSelect()) {
                SoundManager.playBuzzer();
                this._upgradeWindow.activate();
                return;
            }
            SoundManager.playOk();
            this._upgradeWindow.deactivate();
            var item = this._upgradeWindow.selectedItem();
            var text = item.name + 'を選択しますか？';
            if (item.meta['reset']) {
                var texts = ['ポイントを振り直します。', 'よろしいですか？'];
                this._confirmWindow.setTexts(texts);
            }
            else {
                this._confirmWindow.setText(text);
            }
            this._confirmWindow.setInfo(true);
            this._confirmWindow.show();
            this._confirmWindow.activate();
        };
        Scene_Upgrade.prototype.onChange = function () {
            this._helpWindow.setItem(this._upgradeWindow.selectedItem());
        };
        return Scene_Upgrade;
    }(Scene_MenuBase));
    Nore.Scene_Upgrade = Scene_Upgrade;
    function findSkillTree(type) {
        switch (type) {
            case UpGrade.NONE:
                return null;
            case UpGrade.KAREN:
                return SKILL_TREE1;
            case UpGrade.TENSOU1:
            case UpGrade.TENSOU2:
                return SKILL_TREE2;
            default:
                console.error('アップグレードタイプが不正です' + type);
        }
    }
    Nore.findSkillTree = findSkillTree;
    function findLines(type) {
        switch (type) {
            case UpGrade.NONE:
                return null;
            case UpGrade.KAREN:
                return LINES1;
            case UpGrade.TENSOU1:
            case UpGrade.TENSOU2:
                return LINES2;
            default:
                console.error('アップグレードタイプが不正です' + type);
        }
    }
    Nore.findLines = findLines;
    var LINE_WIDTH = 8;
    var MARGIN_TOP = 50;
    var MARGIN_LEFT = 50;
    var BLOCK_WIDTH = 185;
    var BLOCK_HEIGHT = 70;
    var INTERVAL_X = 205;
    var INTERVAL_Y = 120;
    var Window_Upgrade = /** @class */ (function (_super) {
        __extends(Window_Upgrade, _super);
        function Window_Upgrade(type) {
            var _this = this;
            var y = 92;
            var rect = new Rectangle(-4, y, Graphics.boxWidth + 8, 760 - y + 4);
            _this = _super.call(this, rect) || this;
            _this._type = type;
            _this.choiceData(type);
            _this.refresh();
            _this.activate();
            _this.select(0);
            return _this;
        }
        Window_Upgrade.prototype.choiceData = function (type) {
            this._lines = findLines(type);
            this._trees = findSkillTree(type);
        };
        Window_Upgrade.prototype.selectedItem = function () {
            var skill = this._trees[this.index()];
            if (!skill) {
                return null;
            }
            var armor = $dataArmors[skill.armor];
            return armor;
        };
        Window_Upgrade.prototype.decide = function () {
            var armor = this.selectedItem();
            if (armor.meta['reset']) {
                this.doReset();
                return;
            }
            $gameParty.gainItem(armor, 1, false);
            if (armor.meta['skill']) {
                var skillId = parseInt(armor.meta['skill']);
                $gameActors.mainActor().learnSkill(skillId);
            }
            if (this._type == UpGrade.KAREN) {
                $gameActors.mainActor().minusEroPower(armor.price);
            }
            else {
                $gameParty.loseEther(armor.price);
            }
        };
        Window_Upgrade.prototype.doReset = function () {
            for (var _i = 0, _a = this._trees; _i < _a.length; _i++) {
                var tree = _a[_i];
                var armor = $dataArmors[tree.armor];
                if ($gameParty.hasItem(armor)) {
                    $gameParty.loseItem(armor, 1);
                    $gameParty.gainEther(armor.price);
                }
            }
        };
        Window_Upgrade.prototype.canSelect = function () {
            var armor = this.selectedItem();
            return !$gameParty.hasItem(armor, false) && this.isOpenSkill(armor);
        };
        Window_Upgrade.prototype.canBuy = function () {
            if (!this.canSelect()) {
                return false;
            }
            var armor = this.selectedItem();
            if (this._type >= 2) {
                return $gameParty.ether() >= armor.price;
            }
            else {
                return $gameActors.mainActor().eroPower >= armor.price;
            }
        };
        Window_Upgrade.prototype.refresh = function () {
            this.redrawItem();
        };
        Window_Upgrade.prototype.drawAllItems = function () {
            this.redrawItem();
        };
        Window_Upgrade.prototype.redrawItem = function () {
            if (!this._lines) {
                return;
            }
            this.contents.clear();
            for (var _i = 0, _a = this._lines; _i < _a.length; _i++) {
                var line = _a[_i];
                this.drawLine(line);
            }
            for (var _b = 0, _c = this._trees; _b < _c.length; _b++) {
                var skill = _c[_b];
                this.drawItem(skill);
            }
        };
        Window_Upgrade.prototype.drawLine4 = function (line) {
        };
        Window_Upgrade.prototype.disableColor = function () {
            return '#6a6f75';
        };
        Window_Upgrade.prototype.drawLine = function (line) {
            var armor = $dataArmors[line.from];
            if (!armor) {
                return;
            }
            var color;
            if (this.isOpenSkill(armor)) {
                color = 'rgba(250, 250, 250, 1)';
            }
            else {
                color = this.disableColor();
            }
            if (line.type == 'right') {
                var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
                var y = MARGIN_TOP + line.y * INTERVAL_Y + BLOCK_HEIGHT / 2 - LINE_WIDTH / 2 - this.scrollBaseY();
                this.contents.fillRect(x, y, INTERVAL_X - BLOCK_WIDTH, LINE_WIDTH, color);
            }
            if (line.type == 'horizontal') {
                var x = MARGIN_LEFT + line.x * INTERVAL_X;
                var y = MARGIN_TOP + line.y * INTERVAL_Y + BLOCK_HEIGHT / 2 - LINE_WIDTH / 2 - this.scrollBaseY();
                this.contents.fillRect(x, y, INTERVAL_X, LINE_WIDTH, color);
            }
            if (line.type == 'rightAndBottom') {
                this.drawLine4(line);
                var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
                var y = MARGIN_TOP + line.y * INTERVAL_Y + BLOCK_HEIGHT / 2 - LINE_WIDTH / 2 - this.scrollBaseY();
                this.contents.fillRect(x, y, INTERVAL_X + 20, LINE_WIDTH, color);
                this.contents.fillRect(x + INTERVAL_X / 2 + 4, y, LINE_WIDTH, INTERVAL_Y - 20, color);
            }
            if (line.type == 'rightBottom') {
                var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
                var y = MARGIN_TOP + line.y * INTERVAL_Y + BLOCK_HEIGHT / 2 - LINE_WIDTH / 2 - this.scrollBaseY();
                this.contents.fillRect(x, y, INTERVAL_X / 2 + 5, LINE_WIDTH, color);
                this.contents.fillRect(x + INTERVAL_X / 2 + 4, y, LINE_WIDTH, INTERVAL_Y - 20, color);
            }
            if (line.type == 'bottom') {
                var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH / 2 - LINE_WIDTH / 2;
                var y = MARGIN_TOP + line.y * INTERVAL_Y + BLOCK_HEIGHT - this.scrollBaseY();
                this.contents.fillRect(x, y, LINE_WIDTH, INTERVAL_Y - BLOCK_HEIGHT, color);
            }
        };
        Window_Upgrade.prototype.findSkill = function (x, y) {
            for (var _i = 0, _a = this._trees; _i < _a.length; _i++) {
                var s = _a[_i];
                if (s.x == x && s.y == y) {
                    return s;
                }
            }
        };
        Window_Upgrade.prototype.drawItem = function (skill) {
            var x = MARGIN_LEFT + skill.x * INTERVAL_X;
            var y = MARGIN_TOP + skill.y * INTERVAL_Y - this.scrollBaseY();
            var armor = $dataArmors[skill.armor];
            if (!armor) {
                return;
            }
            var isLock = false;
            if ($gameParty.hasItem(armor, false)) {
                var lw = 5;
                this.contents.fillRect(x - lw, y - lw, BLOCK_WIDTH + lw * 2, BLOCK_HEIGHT + lw * 2, 'rgba(150, 50, 50, 1)');
                this.contents.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, 'rgba(50, 50, 120, 1)');
                this.changeTextColor(ColorManager.textColor(8));
            }
            else if (this.isOpenSkill(armor)) {
                if (this.canBuyItem(armor)) {
                    this.contents.fillRect(x - 2, y - 2, BLOCK_WIDTH + 4, BLOCK_HEIGHT + 4, 'rgba(10, 10, 13, 1)');
                    this.contents.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, 'rgba(100, 100, 200, 0.8)');
                    this.changeTextColor(ColorManager.normalColor());
                }
                else {
                    this.contents.fillRect(x - 2, y - 2, BLOCK_WIDTH + 4, BLOCK_HEIGHT + 4, 'rgba(10, 10, 13, 1)');
                    this.contents.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, 'rgba(100, 100, 230, 0.4)');
                    this.changeTextColor(ColorManager.textColor(8));
                }
            }
            else {
                var color = this.disableColor();
                this.contents.fillRect(x - 2, y - 2, BLOCK_WIDTH + 4, BLOCK_HEIGHT + 4, 'rgba(10, 10, 13, 1)');
                this.contents.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, color);
                this.changeTextColor(ColorManager.textColor(8));
                isLock = true;
            }
            this.drawIcon(armor.iconIndex, x, y);
            this.contents.fontSize = 20;
            this.contents.drawText(armor.name, x + 34, y, 150, 32, 'left');
            if (this._type == UpGrade.KAREN) {
                this.contents.fontSize = 18;
                this.contents.drawText((armor.price) + ' Pt', x, y + 30, 150, 32, 'right');
            }
            else {
                var icon = 864;
                var index = 1;
                if ($gameParty.hasItem(armor, false)) {
                    icon = 895;
                    index = 0;
                }
                this.contents.drawText((armor.price) + '', x - 10, y + 34, 150, 32, 'right');
                var s = Nore.getBinSprite(index);
                s.x = x + 146;
                s.y = y + 31;
                this._contentsSprite.addChild(s);
                //this.drawIcon(icon, x  + 142, y + 31);
            }
            if (isLock) {
                this.drawIcon(1922, x - 10, y - 10);
            }
        };
        Window_Upgrade.prototype.canBuyItem = function (armor) {
            if (this._type == UpGrade.KAREN) {
                return armor.price <= $gameActors.mainActor().eroPower;
            }
            else {
                return armor.price <= $gameParty.ether();
            }
        };
        Window_Upgrade.prototype.isOpenSkill = function (armor) {
            if (!armor) {
                return false;
            }
            if (armor.meta['before']) {
                var before = parseInt(armor.meta['before']);
                var beforeArmor = $dataArmors[before];
                if (!$gameParty.hasItem(beforeArmor, false)) {
                    return false;
                }
            }
            return true;
        };
        Window_Upgrade.prototype.itemRect = function (index) {
            var skill = this._trees[index];
            if (!skill) {
                return new Rectangle(0, 0, 0, 0);
            }
            var offset = 10;
            var x = MARGIN_LEFT + skill.x * INTERVAL_X - offset;
            var y = MARGIN_LEFT + skill.y * INTERVAL_Y - offset - this.scrollBaseY();
            return new Rectangle(x, y, BLOCK_WIDTH + offset * 2, BLOCK_HEIGHT + offset * 2);
        };
        Window_Upgrade.prototype.maxItems = function () {
            return 25;
        };
        Window_Upgrade.prototype.maxCols = function () {
            return 5;
        };
        Window_Upgrade.prototype.maxPageRows = function () {
            return 9;
        };
        Window_Upgrade.prototype.itemHeight = function () {
            return INTERVAL_Y;
        };
        Window_Upgrade.prototype.playOkSound = function () {
        };
        Window_Upgrade.prototype.row = function () {
            if (!this._trees) {
                return 0;
            }
            var skill = this._trees[this.index()];
            if (skill) {
                return skill.y;
            }
            return 0;
        };
        Window_Upgrade.prototype.ensureCursorVisible = function (smooth) {
            if (this._cursorAll) {
                this.scrollTo(0, 0);
            }
            else if (this.innerHeight > 0 && this.row() >= 0) {
                var scrollY_1 = this.scrollY();
                var itemTop = this.row() * this.itemHeight();
                var itemBottom = itemTop + this.itemHeight();
                var scrollMin = itemBottom - this.innerHeight;
                if (scrollY_1 > itemTop) {
                    if (smooth) {
                        this.smoothScrollTo(0, itemTop);
                    }
                    else {
                        this.scrollTo(0, itemTop);
                    }
                }
                else if (scrollY_1 < scrollMin) {
                    if (smooth) {
                        this.smoothScrollTo(0, scrollMin);
                    }
                    else {
                        this.scrollTo(0, scrollMin);
                    }
                }
            }
        };
        Window_Upgrade.prototype.cursorDown = function (wrap) {
            var index = this.index();
            var skill = this._trees[this.index()];
            var next = this.findSkill(skill.x, skill.y + 1);
            if (!next) {
                var next = this.findSkill(skill.x, skill.y + 2);
                if (!next) {
                    var next = this.findSkill(skill.x, skill.y + 4);
                    if (!next) {
                        return;
                    }
                }
            }
            this.select(this._trees.indexOf(next));
        };
        Window_Upgrade.prototype.contentsHeight = function () {
            return this.innerHeight + this.itemHeight();
        };
        Window_Upgrade.prototype.cursorUp = function (wrap) {
            var index = this.index();
            var skill = this._trees[this.index()];
            var next = this.findSkill(skill.x, skill.y - 1);
            if (!next) {
                next = this.findSkill(skill.x, skill.y - 2);
                if (!next) {
                    if (index != 8 && index != 14) {
                        return;
                    }
                    next = this.findSkill(5, 0);
                }
            }
            this.select(this._trees.indexOf(next));
        };
        Window_Upgrade.prototype.cursorRight = function (wrap) {
            var skill = this._trees[this.index()];
            for (var i = 1; i < 6; i++) {
                var next = this.findSkill(skill.x + i, skill.y);
                if (next) {
                    this.select(this._trees.indexOf(next));
                    return;
                }
            }
        };
        Window_Upgrade.prototype.cursorLeft = function (wrap) {
            var skill = this._trees[this.index()];
            for (var i = 1; i < 6; i++) {
                var next = this.findSkill(skill.x - i, skill.y);
                if (next) {
                    this.select(this._trees.indexOf(next));
                    return;
                }
            }
        };
        Window_Upgrade.prototype.select = function (index) {
            /*const last = this.index();
            if (last < index && index >= 3) {
                this.scrollTo(0, INTERVAL_Y * (index - 2));
            }*/
            _super.prototype.select.call(this, index);
            this.ensureCursorVisible(true);
        };
        return Window_Upgrade;
    }(Window_Selectable));
    var Window_EroGold = /** @class */ (function (_super) {
        __extends(Window_EroGold, _super);
        function Window_EroGold() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_EroGold.prototype.drawCurrencyValue = function (value, unit, x, y, width) {
            var unitWidth = Math.min(80, this.textWidth(unit));
            this.resetTextColor();
            this.drawText(value, x + 4, y + 10, width, "right");
            var s = Nore.getYamiSprite();
            s.x = 4;
            s.y = 8;
            this._contentsSprite.addChild(s);
        };
        Window_EroGold.prototype.value = function () {
            return $gameActors.mainActor().eroPower;
        };
        return Window_EroGold;
    }(Window_Gold));
})(Nore || (Nore = {}));
var UpGrade;
(function (UpGrade) {
    UpGrade[UpGrade["NONE"] = 0] = "NONE";
    UpGrade[UpGrade["KAREN"] = 1] = "KAREN";
    UpGrade[UpGrade["TENSOU1"] = 2] = "TENSOU1";
    UpGrade[UpGrade["TENSOU2"] = 3] = "TENSOU2";
})(UpGrade || (UpGrade = {}));
