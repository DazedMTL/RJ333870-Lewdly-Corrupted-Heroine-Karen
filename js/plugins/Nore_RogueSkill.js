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
 * @requiredAssets img/character/disti.png
 */
var Nore;
(function (Nore) {
    Spriteset_Map.prototype.createItemWindow = function () {
        this._itemWindow = new Window_RogueItem();
        this._itemWindow.hide();
        this._itemWindow.setHandler('ok', this.itemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.itemCancel.bind(this));
        this._itemWindow.setHandler('change', this.itemChange.bind(this));
        this.addChild(this._itemWindow);
    };
    Spriteset_Map.prototype.itemOk = function () {
        var item = this._itemWindow.item();
        this.removeAllForecastPanel();
        this._itemWindow.select(-1);
        Nore.rogueManager.useItem(item);
    };
    Spriteset_Map.prototype.itemChange = function () {
        /*const item = this._itemWindow.item();
        this.removeAllForecastPanel();
        if (item) {
            let rangeMin = 0;
            let rangeMax = 0;
            if (item.meta['rangeMin']) {
                rangeMin = parseInt(item.meta['rangeMin']);
            }
            if (item.meta['rangeMax']) {
                rangeMax = parseInt(item.meta['rangeMax']);
            }
            this.addForecastPanel(rangeMin, rangeMax)
        }*/
    };
    Spriteset_Map.prototype.itemCancel = function () {
        this.removeAllForecastPanel();
        this._itemWindow.deactivate();
        this._itemWindow.select(-1);
    };
    /*
    const _Scene_Map_prototype_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        _Scene_Map_prototype_updateScene.call(this);
        if (!SceneManager.isSceneChanging()) {
            if (Input.isTriggered('pagedown')) {
                SoundManager.playOk();
                this._spriteset._itemWindow.deactivate();
                this._spriteset._itemWindow.select(-1);
    
                this._spriteset._skillWindow.activate();
                this._spriteset._skillWindow.select(0);
            }
            else if (Input.isTriggered('pageup')) {
                SoundManager.playOk();
                this._spriteset._skillWindow.deactivate();
                this._spriteset._skillWindow.select(-1);
    
                this._spriteset._itemWindow.activate();
                this._spriteset._itemWindow.select(0);
            }
        }
    };
    */
    var _Scene_Map_prototype_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map.prototype.isMenuEnabled = function () {
        if (this.isWindowActive()) {
            return false;
        }
        return _Scene_Map_prototype_isMenuEnabled.call(this);
    };
    Scene_Map.prototype.isWindowActive = function () {
        if (!this._spriteset) {
            return false;
        }
        return this._spriteset._skillWindow.active || this._spriteset._itemWindow.active;
    };
    var Window_RogueSkill = /** @class */ (function (_super) {
        __extends(Window_RogueSkill, _super);
        function Window_RogueSkill() {
            var _this = _super.call(this, new Rectangle(0, Graphics.height - 308, 380, 248)) || this;
            _this._data = [];
            _this.includes = function (item) {
                return item && item.stypeId === this._stypeId;
            };
            _this._actor = $gameActors.actor(1);
            _this._stypeId = 2;
            _this.refresh();
            return _this;
        }
        Window_RogueSkill.prototype.setHelpWindow = function (window) {
            this._helpWindow = window;
        };
        Window_RogueSkill.prototype.update = function () {
            //this.visible =  $gameMap.isRogue();
            _super.prototype.update.call(this);
            if (this.isChanged()) {
                this.refresh();
            }
        };
        Window_RogueSkill.prototype.makeItemList = function () {
            var _this = this;
            if (this._actor) {
                this._data = this._actor.skills().filter(function (item) { return _this.includes(item); });
                this._data = this._data.sort(function (a, b) {
                    var orderA = 0;
                    var orderB = 0;
                    if (a.meta['order']) {
                        orderA = parseInt(a.meta['order']);
                    }
                    if (b.meta['order']) {
                        orderB = parseInt(b.meta['order']);
                    }
                    return orderA - orderB;
                });
            }
            else {
                this._data = [];
            }
        };
        ;
        Window_RogueSkill.prototype.updateHelp = function () {
            if (this._helpWindow) {
                this._helpWindow.setItem(this.item());
            }
        };
        Window_RogueSkill.prototype.isChanged = function () {
            return false;
        };
        Window_RogueSkill.prototype.itemWidth = function () {
            return Math.floor(this.innerWidth / this.maxCols());
        };
        Window_RogueSkill.prototype.maxCols = function () {
            return 1;
        };
        Window_RogueSkill.prototype.colSpacing = function () {
            return 16;
        };
        Window_RogueSkill.prototype.maxItems = function () {
            return this._data ? 5 : 1;
        };
        Window_RogueSkill.prototype.item = function () {
            return this.itemAt(this.index());
        };
        Window_RogueSkill.prototype.select = function (index) {
            _super.prototype.select.call(this, index);
            this.updateHelp();
        };
        Window_RogueSkill.prototype.isCurrentItemEnabled = function () {
            return this.isEnabled(this.itemAt(this.index()));
        };
        Window_RogueSkill.prototype.isEnabled = function (item) {
            if (!item) {
                return false;
            }
            if (item.meta['manguri']) {
                if ($gameSwitches.value(8)) {
                    return false;
                }
            }
            return this._actor && this._actor.canUse(item);
        };
        Window_RogueSkill.prototype.refresh = function () {
            this.makeItemList();
            _super.prototype.refresh.call(this);
            this.updateHelp();
        };
        return Window_RogueSkill;
    }(Window_SkillList));
    Nore.Window_RogueSkill = Window_RogueSkill;
    Game_Interpreter.prototype.character = function (param) {
        if (param < 0) {
            return $gamePlayer;
        }
        else if (this.isOnCurrentMap()) {
            return $gameMap.event(param > 0 ? param : this._eventId);
        }
        else {
            return null;
        }
    };
    var Window_SkillHelp = /** @class */ (function (_super) {
        __extends(Window_SkillHelp, _super);
        function Window_SkillHelp() {
            return _super.call(this, new Rectangle(0, Graphics.height - 60, 920, 60)) || this;
        }
        Window_SkillHelp.prototype.setItem = function (skill) {
            this.contents.clear();
            if (!skill) {
                return;
            }
            this.drawText(skill.description, 10, 0, 900, 'left');
        };
        return Window_SkillHelp;
    }(Window_Help));
    Nore.Window_SkillHelp = Window_SkillHelp;
    var Window_RogueItem = /** @class */ (function (_super) {
        __extends(Window_RogueItem, _super);
        function Window_RogueItem() {
            var _this = _super.call(this, new Rectangle(0, Graphics.height - 200, 474, 200)) || this;
            _this._data = [];
            _this._lastItemCount = {};
            _this.includes = function (item) {
                return DataManager.isItem(item) && item.itypeId === 1 && this.isEnabled(item);
            };
            _this._actor = $gameActors.actor(1);
            _this._stypeId = 2;
            _this.refresh();
            return _this;
        }
        Window_RogueItem.prototype.update = function () {
            //this.visible = $gameMap.isRogue();
            _super.prototype.update.call(this);
            if (this.isChanged()) {
                this.refresh();
            }
        };
        Window_RogueItem.prototype.isChanged = function () {
            if (!this._lastItemCount) {
                return true;
            }
            for (var k in this._lastItemCount) {
                var item = $dataItems[k];
                if ($gameParty.numItems(item) != this._lastItemCount[k]) {
                    return true;
                }
            }
            return false;
        };
        Window_RogueItem.prototype.maxCols = function () {
            return 2;
        };
        Window_RogueItem.prototype.colSpacing = function () {
            return 16;
        };
        Window_RogueItem.prototype.maxItems = function () {
            return this._data ? this._data.length : 1;
        };
        Window_RogueItem.prototype.item = function () {
            return this.itemAt(this.index());
        };
        Window_RogueItem.prototype.itemAt = function (index) {
            return this._data && index >= 0 ? this._data[index] : null;
        };
        Window_RogueItem.prototype.isCurrentItemEnabled = function () {
            return this.isEnabled(this._data[this.index()]);
        };
        Window_RogueItem.prototype.isEnabled = function (item) {
            return this._actor && this._actor.canUse(item);
        };
        Window_RogueItem.prototype.refresh = function () {
            this.makeItemList();
            _super.prototype.refresh.call(this);
        };
        Window_RogueItem.prototype.makeItemList = function () {
            var _this = this;
            this._data = $gameParty.allItems().filter(function (item) { return _this.includes(item); });
            if (this.includes(null)) {
                this._data.push(null);
            }
            this._lastItemCount = {};
            for (var i = 7; i < 14; i++) {
                this._lastItemCount[i] = 0;
            }
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                var d = _a[_i];
                this._lastItemCount[d.id] = $gameParty.numItems(d);
            }
        };
        Window_RogueItem.prototype.selectLast = function () {
            var index = this._data.indexOf($gameParty.lastItem());
            this.forceSelect(index >= 0 ? index : 0);
        };
        Window_RogueItem.prototype.drawItem = function (index) {
            var item = this.itemAt(index);
            if (item) {
                var numberWidth = this.numberWidth();
                var rect = this.itemLineRect(index);
                this.changePaintOpacity(this.isEnabled(item));
                this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
                this.drawItemNumber(item, rect.x, rect.y, rect.width);
                this.changePaintOpacity(true);
            }
        };
        Window_RogueItem.prototype.numberWidth = function () {
            return this.textWidth("000");
        };
        Window_RogueItem.prototype.drawItemNumber = function (item, x, y, width) {
            this.drawText(":", x, y, width - this.textWidth("00"), "right");
            this.drawText($gameParty.numItems(item), x, y, width, "right");
        };
        Window_RogueItem.prototype.costWidth = function () {
            return this.textWidth("00");
        };
        return Window_RogueItem;
    }(Window_Selectable));
    Nore.Window_RogueItem = Window_RogueItem;
})(Nore || (Nore = {}));
