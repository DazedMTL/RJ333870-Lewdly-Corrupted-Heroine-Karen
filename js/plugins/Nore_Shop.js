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
    Game_Interpreter.prototype.command302 = function (params) {
        if (!$gameParty.inBattle()) {
            var goods = [params];
            while (this.nextEventCode() === 605) {
                this._index++;
                goods.push(this.currentCommand().parameters);
            }
            SceneManager.push(Scene_NoreShop);
            SceneManager.prepareNextScene(goods, params[4]);
        }
        return true;
    };
    var Window_Lv = /** @class */ (function (_super) {
        __extends(Window_Lv, _super);
        function Window_Lv() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_Lv.prototype.colSpacing = function () {
            return 0;
        };
        Window_Lv.prototype.refresh = function () {
            var rect = this.itemLineRect(0);
            this.contents.clear();
            this.resetFontSettings();
            this.contents.fontSize = 20;
            this.drawText('現在の転送装置のLV', 0, 0, 170, 'left');
            this.drawText('武器LV %1'.format($gameParty.maxStartingWeaponLv()), 20, this.lineHeight(), 170, 'left');
            this.drawText('防具LV %1'.format($gameParty.maxStartingArmorLv()), 20, this.lineHeight() * 2, 170, 'left');
        };
        Window_Lv.prototype.open = function () {
            this.refresh();
            _super.prototype.open.call(this);
        };
        return Window_Lv;
    }(Window_Selectable));
    var Scene_NoreShop = /** @class */ (function (_super) {
        __extends(Scene_NoreShop, _super);
        function Scene_NoreShop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_NoreShop.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createHelpWindow();
            this.createCommandWindow();
            this.createGoldWindow();
            this.createLvWindow();
            this.createSellWindow();
            this.createBuyWindow();
            this.createMsgWindow();
            this.createConfirmWindow();
            this.createConfirmWindow2();
            this.prepareSell();
        };
        Scene_NoreShop.prototype.createLvWindow = function () {
            if ($gameVariables.value(4) <= 1) {
                return;
            }
            var rect = this.goldWindowRect();
            rect.y += rect.height;
            rect.height += 60;
            this._lvWindow = new Window_Lv(rect);
            this._lvWindow.refresh();
            this.addWindow(this._lvWindow);
            if (this._purchaseOnly) {
                this._lvWindow.hide();
            }
        };
        Scene_NoreShop.prototype.prepareSell = function () {
            if (this._purchaseOnly || true) {
            }
            else {
                this._buyWindow.deactivate();
                this._commandWindow.activate();
            }
        };
        Scene_NoreShop.prototype.createMsgWindow = function () {
            this._msgWindow = new Nore.Window_Msg(136);
            this._msgWindow.setHandler('ok', this.onConfirmCancel.bind(this));
            this._msgWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._msgWindow.deactivate();
            this.addWindow(this._msgWindow);
            this._msgWindow.hide();
        };
        Scene_NoreShop.prototype.createConfirmWindow = function () {
            this._confirmWindow = new Nore.Window_Confirm();
            this._confirmWindow.setText('購入しますか？');
            this._confirmWindow.setHandler('ok', this.onConfirmOk.bind(this));
            this._confirmWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._confirmWindow.deactivate();
            this.addWindow(this._confirmWindow);
            this._confirmWindow.hide();
        };
        Scene_NoreShop.prototype.createConfirmWindow2 = function () {
            this._confirmWindow2 = new Nore.Window_Confirm();
            this._confirmWindow2.setText('売却しますか？');
            this._confirmWindow2.setHandler('ok', this.onConfirmSellOk.bind(this));
            this._confirmWindow2.setHandler('cancel', this.onConfirmSellCancel.bind(this));
            this._confirmWindow2.deactivate();
            this.addWindow(this._confirmWindow2);
            this._confirmWindow2.hide();
        };
        Scene_NoreShop.prototype.createBuyWindow = function () {
            var rect = this.buyWindowRect();
            this._buyWindow = new Window_NoreShopBuy(rect);
            this._buyWindow.setupGoods(this._goods);
            this._buyWindow.setHelpWindow(this._helpWindow);
            this._buyWindow.setStatusWindow(this._statusWindow);
            this._buyWindow.show();
            this._buyWindow.activate();
            this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
            this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
            this.addWindow(this._buyWindow);
            this.activateBuyWindow();
        };
        Scene_NoreShop.prototype.activateBuyWindow = function () {
            this._buyWindow.setMoney(this.money());
            this._buyWindow.show();
            this._buyWindow.activate();
        };
        Scene_NoreShop.prototype.helpWindowRect = function () {
            var wy;
            wy = 70;
            var ww = 800;
            var wx = (Graphics.boxWidth - ww) / 2;
            var wh = this.helpAreaHeight();
            return new Rectangle(wx, wy, ww, wh);
        };
        Scene_NoreShop.prototype.helpAreaHeight = function () {
            return this.calcWindowHeight(3, false);
        };
        ;
        Scene_NoreShop.prototype.onBuyCancel = function () {
            if (this._purchaseOnly || true) {
                SceneManager.pop();
            }
            else {
                this._buyWindow.deactivate();
                this._commandWindow.activate();
            }
        };
        Scene_NoreShop.prototype.buyWindowRect = function () {
            var wx = this._helpWindow.x;
            var wy = 100;
            if (this._purchaseOnly || true) {
                wy = this._helpWindow.y + this._helpWindow.height;
            }
            else {
                wy = this._commandWindow.y + this._commandWindow.height;
            }
            var ww = Graphics.boxWidth - 760;
            var wh = 480;
            return new Rectangle(wx, wy, ww, wh);
        };
        Scene_NoreShop.prototype.onBuyOk = function () {
            this._confirmWindow.show();
            this._confirmWindow.activate();
            this._buyWindow.deactivate();
        };
        Scene_NoreShop.prototype.commandBuy = function () {
            this.activateBuyWindow();
        };
        ;
        Scene_NoreShop.prototype.onConfirmOk = function () {
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            if ($gameParty.inventory().isMax() && !this._buyWindow.item().meta['cos']) {
                this._msgWindow.setText('これ以上アイテムを持てません');
                this._msgWindow.setInfo(true);
                this._msgWindow.show();
                this._msgWindow.activate();
                return;
            }
            SoundManager.playShop();
            this._item = this._buyWindow.item();
            this.doBuy(1);
            this._goldWindow.refresh();
            this._buyWindow.refresh();
            this._buyWindow.activate();
            this._buyWindow.setMoney(this.money());
        };
        Scene_NoreShop.prototype.onConfirmCancel = function () {
            this._msgWindow.hide();
            this._msgWindow.deactivate();
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            this._buyWindow.activate();
        };
        Scene_NoreShop.prototype.goldWindowRect = function () {
            var ww = 200;
            var wh = this.calcWindowHeight(1, true);
            var wx = Graphics.boxWidth - ww - 280;
            var wy = this._helpWindow.y + this._helpWindow.height;
            return new Rectangle(wx, wy, ww, wh);
        };
        ;
        Scene_NoreShop.prototype.createCommandWindow = function () {
            var rect = this.commandWindowRect();
            this._commandWindow = new Window_ShopCommand(rect);
            this._commandWindow.setPurchaseOnly(this._purchaseOnly || true);
            this._commandWindow.setHandler("change", this.commandChange.bind(this));
            this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
            this._commandWindow.setHandler("sell", this.commandSell.bind(this));
            this._commandWindow.setHandler("cancel", this.popScene.bind(this));
            if (this._purchaseOnly || true) {
                this._commandWindow.hide();
                this._commandWindow.y = 100;
            }
            else {
                this._commandWindow.y = this._helpWindow.y + this._helpWindow.height;
            }
            this.addWindow(this._commandWindow);
        };
        Scene_NoreShop.prototype.commandChange = function () {
            switch (this._commandWindow.currentSymbol()) {
                case 'buy':
                    this._buyWindow.show();
                    this._itemWindow.hide();
                    this._buyWindow.setMoney(this.money());
                    break;
                case 'sell':
                    this._buyWindow.hide();
                    this._itemWindow.show();
                    break;
            }
        };
        Scene_NoreShop.prototype.commandWindowRect = function () {
            var ww = Graphics.boxWidth - 760;
            var wx = this._helpWindow.x;
            var wy = this.mainAreaTop();
            var wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        ;
        Scene_NoreShop.prototype.createCategoryWindow = function () {
        };
        Scene_NoreShop.prototype.createStatusWindow = function () {
        };
        Scene_NoreShop.prototype.createSellWindow = function () {
            var rect = this.sellWindowRect();
            this._itemWindow = new Nore.Window_ItemList2(rect);
            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.setHandler("ok", this.onSellOk.bind(this));
            this._itemWindow.setHandler("cancel", this.onSellItemCancel.bind(this));
            this._itemWindow.setSell(true);
            this._itemWindow.select(0);
            this.addWindow(this._itemWindow);
            if (this._purchaseOnly || true) {
                this._itemWindow.hide();
                this._itemWindow.deactivate();
            }
        };
        Scene_NoreShop.prototype.onSellItemCancel = function () {
            this._itemWindow.deactivate();
            this._commandWindow.activate();
        };
        Scene_NoreShop.prototype.createDummyWindow = function () {
        };
        Scene_NoreShop.prototype.createNumberWindow = function () {
        };
        Scene_NoreShop.prototype.sellWindowRect = function () {
            var rect = this.buyWindowRect();
            rect.width = 800;
            return rect;
        };
        ;
        Scene_NoreShop.prototype.dummyWindowRect = function () {
            return new Rectangle(0, 0, 1, 1);
        };
        Scene_NoreShop.prototype.commandSell = function () {
            this._itemWindow.show();
            this._itemWindow.activate();
            this._itemWindow.refresh();
        };
        ;
        Scene_NoreShop.prototype.onSellOk = function () {
            this._confirmWindow2.show();
            this._confirmWindow2.activate();
            this._itemWindow.deactivate();
        };
        Scene_NoreShop.prototype.onConfirmSellOk = function () {
            SoundManager.playShop();
            var item = this._itemWindow.item();
            $gameParty.gainGold(item.realItem().price / 2);
            $gameParty.inventory().loseItem(item);
            this._goldWindow.refresh();
            this._confirmWindow2.hide();
            this._confirmWindow2.deactivate();
            this._itemWindow.refresh();
            this._itemWindow.activate();
        };
        Scene_NoreShop.prototype.onConfirmSellCancel = function () {
            this._confirmWindow2.hide();
            this._confirmWindow2.deactivate();
            this._itemWindow.activate();
        };
        return Scene_NoreShop;
    }(Scene_Shop));
    var Window_NoreShopBuy = /** @class */ (function (_super) {
        __extends(Window_NoreShopBuy, _super);
        function Window_NoreShopBuy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_NoreShopBuy.prototype.makeItemList = function () {
            this._data = [];
            this._price = [];
            for (var _i = 0, _a = this._shopGoods; _i < _a.length; _i++) {
                var goods = _a[_i];
                var item = this.goodsToItem(goods);
                if (item && this.isOpenItem(item)) {
                    this._data.push(item);
                    this._price.push(goods[2] === 0 ? item.price : goods[3]);
                }
            }
        };
        Window_NoreShopBuy.prototype.isOpenItem = function (item) {
            if (!item.meta['before']) {
                return true;
            }
            var before = parseInt(item.meta['before']);
            return $gameParty.hasItem($dataArmors[before]);
        };
        Window_NoreShopBuy.prototype.isEnabled = function (item) {
            if (this.isSoldOut(item)) {
                return false;
            }
            return _super.prototype.isEnabled.call(this, item);
        };
        Window_NoreShopBuy.prototype.drawItem = function (index) {
            var item = this.itemAt(index);
            var price = this.price(item);
            var rect = this.itemLineRect(index);
            var priceWidth = this.priceWidth();
            var priceX = rect.x + rect.width - priceWidth;
            var nameWidth = rect.width - priceWidth;
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x + 100, rect.y, nameWidth - 100);
            this.drawText(price, priceX, rect.y, priceWidth, "right");
            this.changePaintOpacity(true);
            if (this.isSoldOut(item)) {
                this.drawText('売り切れ', rect.x, rect.y, priceWidth, "left");
            }
        };
        Window_NoreShopBuy.prototype.isSoldOut = function (item) {
            if ($gameParty.hasItem(item)) {
                return true;
            }
            if ($gameParty.hasItem(item) || $gameParty.inventory().hasArmor(item.id) || $gameParty.inventory().hasWeapon(item.id)) {
                return true;
            }
            return false;
        };
        return Window_NoreShopBuy;
    }(Window_ShopBuy));
})(Nore || (Nore = {}));
