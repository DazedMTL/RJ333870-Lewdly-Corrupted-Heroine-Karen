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
var MAX_ITEM_COUNT = 20;
var ItemType;
(function (ItemType) {
    ItemType[ItemType["weapon"] = 1] = "weapon";
    ItemType[ItemType["armor"] = 11] = "armor";
    ItemType[ItemType["potion"] = 21] = "potion";
    ItemType[ItemType["rod"] = 22] = "rod";
    ItemType[ItemType["scroll"] = 23] = "scroll";
    ItemType[ItemType["arrow"] = 24] = "arrow";
    ItemType[ItemType["box"] = 25] = "box";
    ItemType[ItemType["gold"] = 26] = "gold";
    ItemType[ItemType["eventItem"] = 27] = "eventItem";
    ItemType[ItemType["hammer"] = 28] = "hammer";
    ItemType[ItemType["ether"] = 29] = "ether";
    ItemType[ItemType["magic"] = 30] = "magic";
    ItemType[ItemType["rope"] = 31] = "rope";
    ItemType[ItemType["none"] = 99] = "none";
})(ItemType || (ItemType = {}));
var IdentifyManager = /** @class */ (function () {
    function IdentifyManager() {
        this._identifiedRateMap = {};
        this._alternativeItemIdMap = {};
        this._identifiedItemMap = {};
        this.initAlternativeCandidateItemIdMap();
    }
    IdentifyManager.prototype.initAlternativeCandidateItemIdMap = function () {
        this._alternativeCandidateItemIdMap = {};
        var typeList = [ItemType.potion, ItemType.rod, ItemType.scroll, ItemType.box];
        for (var _i = 0, typeList_1 = typeList; _i < typeList_1.length; _i++) {
            var type = typeList_1[_i];
            this._alternativeCandidateItemIdMap[type] = this.findAlternativeItemList(type);
        }
        //p(this._alternativeItemIdMap)
    };
    IdentifyManager.prototype.findAlternativeItemList = function (type) {
        var result = [];
        for (var i = 1; i < $dataItems.length; i++) {
            var item = $dataItems[i];
            if (!item) {
                continue;
            }
            if (!item.meta['?']) {
                continue;
            }
            switch (type) {
                case ItemType.potion:
                    if (item.meta['potion']) {
                        result.push(item.id);
                    }
                    break;
                case ItemType.rod:
                    if (item.meta['rod']) {
                        result.push(item.id);
                    }
                    break;
                case ItemType.scroll:
                    if (item.meta['scroll']) {
                        result.push(item.id);
                    }
                    break;
                case ItemType.box:
                    if (item.meta['box']) {
                        result.push(item.id);
                    }
                    break;
            }
        }
        return result;
    };
    IdentifyManager.prototype.setIdentifyItem = function (itemType, rate) {
        this._identifiedRateMap[itemType] = rate;
    };
    IdentifyManager.prototype.identifiedItemMap = function (itemType) {
        this._identifiedItemMap[itemType] = this._identifiedItemMap[itemType] || {};
        return this._identifiedItemMap[itemType];
    };
    IdentifyManager.prototype.checkIdentified = function (rogueItem) {
        switch (rogueItem.itemType) {
            case ItemType.none:
            case ItemType.eventItem:
                return true;
        }
        if (rogueItem.isEroItem()) {
            return true;
        }
        if (rogueItem.realItem().meta['identified']) {
            return true;
        }
        var map = this.identifiedItemMap(rogueItem.itemType);
        if (map[rogueItem.realItem().id] === true) {
            return true;
        }
        else if (map[rogueItem.realItem().id] === false) {
            return false;
        }
        var identifyRate = this._identifiedRateMap[rogueItem.itemType];
        if (!identifyRate) {
            return false;
        }
        var identified = Math.randomInt(100) < identifyRate;
        map[rogueItem.realItem().id] = identified;
        return identified;
    };
    IdentifyManager.prototype.alternativeItemId = function (rogueItem) {
        var type = rogueItem.itemType;
        if (type == ItemType.weapon || type == ItemType.armor) {
            return 1;
        }
        var map = this.alternativeItemIdMap(type);
        if (map[rogueItem.realItem().id]) {
            return map[rogueItem.realItem().id];
        }
        var list = this._alternativeCandidateItemIdMap[type];
        var index = Math.randomInt(list.length);
        var itemId = list[index];
        list.splice(index, 1);
        map[rogueItem.realItem().id] = itemId;
        return itemId;
    };
    IdentifyManager.prototype.alternativeItemIdMap = function (itemType) {
        this._alternativeItemIdMap[itemType] = this._alternativeItemIdMap[itemType] || {};
        return this._alternativeItemIdMap[itemType];
    };
    IdentifyManager.prototype.isIdentified = function (rogueItem) {
        switch (rogueItem.itemType) {
            case ItemType.none:
            case ItemType.eventItem:
                return true;
        }
        if (rogueItem.realItem().meta['identified']) {
            return true;
        }
        var map = this.identifiedItemMap(rogueItem.itemType);
        if (map[rogueItem.realItem().id] === true) {
            return true;
        }
        else if (map[rogueItem.realItem().id] === false) {
            return false;
        }
        return false;
    };
    IdentifyManager.prototype.idendify = function (rogueItem) {
        var map = this.identifiedItemMap(rogueItem.itemType);
        map[rogueItem.realItem().id] = true;
    };
    return IdentifyManager;
}());
var RogueItem = /** @class */ (function () {
    function RogueItem(item, count) {
        if (count === void 0) { count = 1; }
        this.alternativeItemId = 0;
        this.id = $gameSystem.nextId();
        this._count = count;
        this._initialCount = count;
        this.itemId = item.id;
        if (DataManager.isItem(item)) {
            if (item.meta['potion']) {
                this.itemType = ItemType.potion;
            }
            else if (item.meta['rod']) {
                this.itemType = ItemType.rod;
            }
            else if (item.meta['arrow']) {
                this.itemType = ItemType.arrow;
            }
            else if (item.meta['scroll']) {
                this.itemType = ItemType.scroll;
            }
            else if (item.meta['gold']) {
                this.itemType = ItemType.gold;
            }
            else if (item.meta['hammer']) {
                this.itemType = ItemType.hammer;
            }
            else if (item.meta['ether']) {
                this.itemType = ItemType.ether;
            }
            else if (item.meta['magic']) {
                this.itemType = ItemType.magic;
            }
            else if (item.meta['rope']) {
                this.itemType = ItemType.rope;
            }
            else if (item.meta['box']) {
                this.itemType = ItemType.box;
                this._box = new Box(count);
            }
            else if (item.meta['eventItem']) {
                this.itemType = ItemType.eventItem;
            }
            else {
                this.itemType = ItemType.none;
            }
        }
        else if (DataManager.isWeapon(item)) {
            this.itemType = ItemType.weapon;
        }
        else if (DataManager.isArmor(item)) {
            this.itemType = ItemType.armor;
        }
        else {
            this.itemType = ItemType.none;
        }
        this.isRogue = true;
        this.checkIdentified();
        this.isCursed = this.checkCursed();
        this.plus = this.calcPlus();
    }
    RogueItem.prototype.atk = function () {
        if (this.isArmor()) {
            return this.item().params[2];
        }
        return this.item().params[2] + this.plus;
    };
    RogueItem.prototype.def = function () {
        if (this.isWeapon()) {
            return this.item().params[3];
        }
        return this.item().params[3] + this.plus;
    };
    RogueItem.prototype.calcPlus = function () {
        if (!this.isEquip()) {
            return 0;
        }
        if (this.isArmor()) {
            return 0;
        }
        var min = $gameMap.minEquipPlus();
        var max = $gameMap.maxEquipPlus();
        return min + Math.randomInt(max - min);
    };
    RogueItem.prototype.checkCursed = function () {
        if (!this.isEquip()) {
            return false;
        }
        if (!$gameSwitches.value(1)) {
            return false;
        }
        if (this.realItem().meta['curse']) {
            return true;
        }
        if (this.realItem().meta['eroItem']) {
            return false;
        }
        return Math.randomInt(9) === 0;
    };
    RogueItem.prototype.removeCurse = function () {
        this.isCursed = false;
    };
    RogueItem.prototype.checkIdentified = function () {
        if (this.isEroItem()) {
            this._identified = true;
            return;
        }
        if (this.isEquip()) {
            if (this.realItem().meta['identified']) {
                this._identified = true;
                return;
            }
            this._identified = false;
            this.alternativeItemId = $gameParty.identifyManager().alternativeItemId(this);
        }
        else {
            $gameParty.identifyManager().checkIdentified(this);
            if (!this.isIdentified()) {
                this.alternativeItemId = $gameParty.identifyManager().alternativeItemId(this);
            }
            else {
                this._countIdentified = true;
            }
        }
    };
    RogueItem.prototype.identify = function () {
        if (this.isEquip()) {
            this._identified = true;
        }
        else {
            $gameParty.identifyManager().idendify(this);
            this._identified = true;
            this._countIdentified = true;
        }
    };
    RogueItem.prototype.identifyName = function () {
        $gameParty.identifyManager().idendify(this);
    };
    RogueItem.prototype.isIdentified = function () {
        if (this.isEquip()) {
            return this._identified;
        }
        else {
            return $gameParty.identifyManager().isIdentified(this);
        }
    };
    RogueItem.prototype.identifyCount = function () {
        this._countIdentified = true;
    };
    RogueItem.prototype.isIdentifiedCount = function () {
        return this._identified;
    };
    RogueItem.prototype.isStay = function () {
        return this.realItem().meta['stay'];
    };
    RogueItem.prototype.isPotion = function () {
        return this.itemType == ItemType.potion;
    };
    RogueItem.prototype.isHammer = function () {
        return this.itemType == ItemType.hammer;
    };
    RogueItem.prototype.isScroll = function () {
        return this.itemType == ItemType.scroll;
    };
    RogueItem.prototype.isBox = function () {
        return this.itemType == ItemType.box;
    };
    RogueItem.prototype.isArrow = function () {
        return this.itemType == ItemType.arrow;
    };
    RogueItem.prototype.isGold = function () {
        return this.itemType == ItemType.gold;
    };
    RogueItem.prototype.isEther = function () {
        return this.itemType == ItemType.ether;
    };
    RogueItem.prototype.isEquip = function () {
        return this.isWeapon() || this.isArmor();
    };
    RogueItem.prototype.isWeapon = function () {
        return this.itemType == ItemType.weapon;
    };
    RogueItem.prototype.isArmor = function () {
        return this.itemType == ItemType.armor;
    };
    RogueItem.prototype.isRod = function () {
        return this.itemType == ItemType.rod;
    };
    RogueItem.prototype.isRope = function () {
        return this.itemType == ItemType.rope;
    };
    RogueItem.prototype.isMagic = function () {
        return this.itemType == ItemType.magic;
    };
    RogueItem.prototype.isEventItem = function () {
        return this.itemType == ItemType.eventItem;
    };
    RogueItem.prototype.isEroItem = function () {
        var item = this.realItem();
        return item.meta['eroItem'] || item.meta['outerTop'] || item.meta['outerBottom'] || item.meta['innerTop'] || item.meta['innerBottom'];
    };
    RogueItem.prototype.animationId = function () {
        return this.realItem().animationId;
    };
    RogueItem.prototype.count = function () {
        return this._count;
    };
    RogueItem.prototype.consume = function () {
        if (this._count == 0) {
            console.error('error 使用回数がマイナスです');
        }
        this._count--;
    };
    RogueItem.prototype.name = function () {
        if (this.isRod()) {
            return '\\C[14]' + this.identifiedName() + this.endText();
        }
        if (this.isIdentified()) {
            var text = '';
            if (this.isCursed) {
                text = '\\C[33]';
            }
            return text + this.identifiedName() + this.endText();
        }
        else {
            return '\\C[32]' + this.item().name + this.endText() + '\\C[0]';
        }
    };
    RogueItem.prototype.endText = function () {
        if (this.isBox()) {
            return '[' + this.box().count() + '/' + this.box().max() + ']';
        }
        if (this.isRod()) {
            if (this._countIdentified) {
                return '(' + this._count + ')\\C[0]';
            }
            else {
                var countText = '?';
                if (this._initialCount != this._count) {
                    countText += this._count - this._initialCount;
                }
                return '\\C[32](' + countText + ')\\C[0]';
            }
        }
        return '';
    };
    RogueItem.prototype.identifiedName = function () {
        if (this.plus > 0) {
            return this.realItem().name + ' +' + Nore.hankaku2Zenkaku(this.plus);
        }
        else {
            return this.realItem().name;
        }
    };
    RogueItem.prototype.getTypeText = function () {
        if (this.isWeapon()) {
            return $dataSystem.equipTypes[1];
        }
        if (this.isArmor()) {
            return $dataSystem.equipTypes[2];
        }
        return '';
    };
    RogueItem.prototype.iconIndex = function () {
        return this.item().iconIndex;
    };
    RogueItem.prototype.item = function () {
        switch (this.itemType) {
            case ItemType.potion:
            case ItemType.rod:
            case ItemType.arrow:
            case ItemType.scroll:
            case ItemType.gold:
            case ItemType.box:
            case ItemType.none:
            case ItemType.eventItem:
            case ItemType.hammer:
            case ItemType.ether:
            case ItemType.magic:
            case ItemType.rope:
                if (this.isIdentified() || !this.alternativeItemId) {
                    return $dataItems[this.itemId];
                }
                else {
                    return $dataItems[this.alternativeItemId];
                }
            case ItemType.weapon:
                if (this.isIdentified() || !this.alternativeItemId) {
                    return $dataWeapons[this.itemId];
                }
                else {
                    return $dataWeapons[this.alternativeItemId];
                }
            case ItemType.armor:
                if (this.isIdentified() || !this.alternativeItemId) {
                    return $dataArmors[this.itemId];
                }
                else {
                    return $dataArmors[this.alternativeItemId];
                }
            default:
                console.error('不正なアイテムタイプです' + this.itemType + ' ' + this.itemId);
        }
    };
    RogueItem.prototype.realItem = function () {
        switch (this.itemType) {
            case ItemType.potion:
            case ItemType.rod:
            case ItemType.arrow:
            case ItemType.scroll:
            case ItemType.box:
            case ItemType.none:
            case ItemType.gold:
            case ItemType.hammer:
            case ItemType.ether:
            case ItemType.magic:
            case ItemType.eventItem:
            case ItemType.rope:
                return $dataItems[this.itemId];
            case ItemType.weapon:
                return $dataWeapons[this.itemId];
            case ItemType.armor:
                return $dataArmors[this.itemId];
            default:
                console.error('不正なアイテムタイプです' + this.itemType + ' ' + this.itemId);
        }
    };
    RogueItem.prototype.compareTo = function (r) {
        if (r.isEquip()) {
            if ($gameActors.actor(1).isEquipped(this)) {
                if (!$gameActors.actor(1).isEquipped(r)) {
                    return -1;
                }
            }
            else if ($gameActors.actor(1).isEquipped(r)) {
                return 1;
            }
        }
        if (this.itemType != r.itemType) {
            return this.itemType - r.itemType;
        }
        return this.itemId - r.itemId;
    };
    RogueItem.prototype.throwIconIndex = function () {
        if (this.isArrow()) {
            return this.realItem().iconIndex;
        }
        return this.fieldIconIndex();
    };
    RogueItem.prototype.fieldIconIndex = function () {
        switch (this.itemType) {
            case ItemType.weapon: return 417;
            case ItemType.armor: return 448;
            case ItemType.potion: return 640;
            case ItemType.rod: return 421;
            case ItemType.scroll: return 511;
            case ItemType.arrow:
                return this.realItem().iconIndex;
            //return 522;
            case ItemType.box: return 530;
            case ItemType.gold: return 1920;
            case ItemType.hammer: return 543;
            case ItemType.ether: return 895;
            case ItemType.magic: return 412;
            case ItemType.eventItem: return this.iconIndex();
        }
        console.error(this.itemType + ': fieldIconIndex');
    };
    RogueItem.prototype.box = function () {
        return this._box;
    };
    return RogueItem;
}());
var Box = /** @class */ (function () {
    function Box(_size) {
        this._size = _size;
        this._items = [];
    }
    Box.prototype.putIn = function (item) {
        this._items.push(item);
    };
    Box.prototype.isMax = function () {
        return this.remain() <= 0;
    };
    Box.prototype.max = function () {
        return this._size;
    };
    Box.prototype.count = function () {
        return this._items.length;
    };
    Box.prototype.remain = function () {
        p(this._size + ' ' + this._items.length);
        return this._size - this._items.length;
    };
    Box.prototype.items = function () {
        return this._items;
    };
    return Box;
}());
var RogueFieldItem = /** @class */ (function () {
    function RogueFieldItem(_item, _x, _y, _visible) {
        this._item = _item;
        this._x = _x;
        this._y = _y;
        this._visible = _visible;
    }
    RogueFieldItem.prototype.isVisible = function () {
        if (this._visible) {
            return true;
        }
        if ($gamePlayer.room) {
            var visible = $gamePlayer.room.contains(this._x, this._y);
            this._visible = visible || Math.abs($gamePlayer.x - this._x) + Math.abs($gamePlayer.y - this._y) <= 2;
        }
        else {
            this._visible = Math.abs($gamePlayer.x - this._x) + Math.abs($gamePlayer.y - this._y) <= 2;
        }
        return this._visible;
    };
    RogueFieldItem.prototype.item = function () {
        return this._item;
    };
    RogueFieldItem.prototype.x = function () {
        return this._x;
    };
    RogueFieldItem.prototype.y = function () {
        return this._y;
    };
    return RogueFieldItem;
}());
function ItemManager() {
    throw new Error("This is a static class");
}
ItemManager.toRogueItem = function (item) {
    if (!item) {
        return null;
    }
    if (ItemManager.isRogueItem(item)) {
        return item;
    }
    return new RogueItem(item);
};
ItemManager.isRogueItem = function (item) {
    if (!item) {
        return false;
    }
    return item.isRogue;
};
var Inventory = /** @class */ (function () {
    function Inventory() {
        this._list = [];
    }
    Inventory.prototype.newList = function (isKeyItem) {
        var result = [];
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.realItem().meta['lv']) {
                if (isKeyItem) {
                    result.push(i);
                }
            }
            else {
                if (!isKeyItem) {
                    result.push(i);
                }
            }
        }
        if (isKeyItem) {
            for (var i = 200; i <= 400; i++) {
                var armor = $dataArmors[i];
                if (!armor) {
                    continue;
                }
                if (!$gameParty.hasItem(armor)) {
                    continue;
                }
                if (armor.meta['cos']) {
                    result.push(new RogueItem(armor));
                }
                /*if (armor.meta['outerBottom'] && armor.meta['outerBottom'] != 'a') {
                    result.push(new RogueItem(armor));
                }
                if (armor.meta['innerTop'] && armor.meta['innerTop'] != 'a') {
                    result.push(new RogueItem(armor));
                }
                if (armor.meta['innerBottom'] && armor.meta['innerBottom'] != 'a') {
                    result.push(new RogueItem(armor));
                }*/
            }
            for (var i = 873; i <= 920; i++) {
                var armor = $dataArmors[i];
                if (armor && armor.meta['eroItem']) {
                    if ($gameParty.hasItem(armor)) {
                        result.push(new RogueItem(armor));
                    }
                }
            }
            for (var i = 551; i <= 560; i++) {
                var armor = $dataArmors[i];
                if (armor) {
                    if ($gameParty.hasItem(armor)) {
                        result.push(new RogueItem(armor));
                    }
                }
            }
        }
        return result;
    };
    Inventory.prototype.add = function (item) {
        this._list.push(item);
    };
    Inventory.prototype.sort = function () {
        this._list = this._list.sort(function (a, b) {
            return a.compareTo(b);
        });
    };
    Inventory.prototype.isMax = function () {
        return this.newList().length >= this.maxCount();
    };
    Inventory.prototype.maxCount = function () {
        return MAX_ITEM_COUNT;
    };
    Inventory.prototype.clear = function () {
        var last = this._list;
        this._list = [];
        for (var _i = 0, last_1 = last; _i < last_1.length; _i++) {
            var i = last_1[_i];
            if (i.realItem().meta['stay']) {
                this._list.push(i);
            }
        }
    };
    Inventory.prototype.findItem = function (id) {
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == id) {
                return item;
            }
        }
        return null;
    };
    Inventory.prototype.hasArmor = function (id) {
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.isArmor() && item.itemId == id) {
                return true;
            }
        }
        return false;
    };
    Inventory.prototype.findArmor = function (id) {
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.isArmor() && item.itemId == id) {
                return item;
            }
        }
        return null;
    };
    Inventory.prototype.findWeapon = function (id) {
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.isWeapon() && item.itemId == id) {
                return item;
            }
        }
        return null;
    };
    Inventory.prototype.hasWeapon = function (id) {
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.isWeapon() && item.itemId == id) {
                return true;
            }
        }
        return false;
    };
    Inventory.prototype.loseItem = function (item) {
        this._list.splice(this._list.indexOf(item), 1);
    };
    return Inventory;
}());
var Nore;
(function (Nore) {
    var Window_ItemList2 = /** @class */ (function (_super) {
        __extends(Window_ItemList2, _super);
        function Window_ItemList2(r, keyItem) {
            var _this = _super.call(this, r) || this;
            _this.cursorUp = function (wrap) {
                var index = Math.max(0, this.index());
                var maxItems = this.maxItems();
                var maxCols = this.maxCols();
                if (index == 0) {
                    if (!this.selectFootWindow()) {
                        this.smoothSelect(Math.min(this.maxItems() - 1, this.lineNum() - 1));
                    }
                }
                else if (index == this.lineNum()) {
                    this.smoothSelect(this.maxItems() - 1);
                }
                else if (index >= 1) {
                    this.smoothSelect(index - 1);
                }
            };
            _this._keyItem = keyItem;
            _this.makeItemList();
            _this.refresh();
            return _this;
        }
        Window_ItemList2.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            this.showTutorialArrow();
        };
        Window_ItemList2.prototype.showTutorialArrow = function () {
            if (!$gameSwitches.value(210)) {
                return;
            }
            if ($gameSwitches.value(220)) {
                return;
            }
            if ($gameActors.mainActor().weapon()) {
                this._arrow = new TutoArrow(100, 44);
            }
            else {
                if ($gameActors.mainActor().armor()) {
                    return;
                }
                this._arrow = new TutoArrow(100, 0);
            }
            this.addChild(this._arrow);
        };
        Window_ItemList2.prototype.setFootWindow = function (footWindow) {
            this._footWindow = footWindow;
        };
        Window_ItemList2.prototype.setBoxHelpWindow = function (boxHelpWindow) {
            this._boxHelpWindow = boxHelpWindow;
        };
        Window_ItemList2.prototype.update = function () {
            _super.prototype.update.call(this);
            if (Input.isTriggered('shift')) {
                $gameParty._inventory.sort();
                SoundManager.playSave();
                this.makeItemList();
                this.refresh();
            }
        };
        Window_ItemList2.prototype.includes = function (item) {
            return true;
        };
        Window_ItemList2.prototype.makeItemList = function () {
            if (this._keyItem) {
                $gameParty._inventory.sort();
            }
            this._data = $gameParty._inventory.newList(this._keyItem);
        };
        Window_ItemList2.prototype.drawItem = function (index) {
            var rogueItem = this.itemAt(index);
            if (rogueItem) {
                var item = rogueItem.item();
                var rect = this.itemLineRect(index);
                var e_1 = this.isEnabled(rogueItem);
                this.changePaintOpacity(e_1);
                this.drawItemName(rogueItem, rect.x + 12, rect.y, 300);
                this.changePaintOpacity(true);
                if (rogueItem.isEquip()) {
                    if (this.actor().isEquipped(rogueItem)) {
                        this.drawText('E', rect.x - 8, rect.y, rect.width, 'left');
                    }
                }
                if (this._sell && e_1) {
                    var price = item.price / 2;
                    var priceWidth = 80;
                    var priceX = rect.x + rect.width - priceWidth;
                    this.drawText(price, priceX, rect.y, priceWidth, "right");
                }
            }
        };
        Window_ItemList2.prototype.drawItemName = function (item, x, y, width) {
            if (item) {
                if (item.isIdentified()) {
                    if (item.isCursed) {
                        this.changeTextColor(ColorManager.cursedColor());
                    }
                    else {
                        this.changeTextColor(ColorManager.normalColor());
                    }
                }
                else {
                    this.changeTextColor(ColorManager.notIdentifiedColor());
                }
                var iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                var textMargin = ImageManager.iconWidth + 4;
                var itemWidth = Math.max(0, width - textMargin);
                this.drawIcon(item.iconIndex(), x, iconY);
                if (item.isEroItem()) {
                    this.drawText(item.name(true), x + textMargin, y, itemWidth, 'left');
                }
                else {
                    this.drawTextEx(item.name(true), x + textMargin, y, itemWidth);
                }
                this.resetTextColor();
            }
        };
        Window_ItemList2.prototype.isEnabled = function (item) {
            if (!item) {
                return false;
            }
            if (item.isBox() && this._useItem && this._useItem.isBox()) {
                return false;
            }
            if (this._sell) {
                return parseInt(item.realItem().meta['lv']) > 0;
            }
            return true;
        };
        Window_ItemList2.prototype.itemRect = function (index) {
            var maxCols = this.maxCols();
            var itemWidth = this.itemWidth();
            var itemHeight = this.itemHeight();
            var colSpacing = this.colSpacing();
            var rowSpacing = this.rowSpacing();
            var col = Math.floor(index / this.lineNum());
            var row = index % this.lineNum();
            var x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
            var y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
            var width = itemWidth - colSpacing;
            var height = itemHeight - rowSpacing;
            return new Rectangle(x, y, width, height);
        };
        Window_ItemList2.prototype.cursorDown = function (wrap) {
            var index = this.index();
            var maxItems = this.maxItems();
            var maxCols = this.maxCols();
            if (index < this.lineNum()) {
                if (index < maxItems - 1) {
                    this.smoothSelect(index + 1);
                }
                else {
                    if (!this.selectFootWindow()) {
                        this.smoothSelect(0);
                    }
                }
            }
            else {
                if (index < maxItems - 1) {
                    this.smoothSelect(index + 1);
                }
                else {
                    this.smoothSelect(this.lineNum());
                }
            }
        };
        Window_ItemList2.prototype.selectFootWindow = function () {
            if (this._footWindow && this._footWindow.visible) {
                this.select(-1);
                this.deactivate();
                this._footWindow.select(0);
                this._footWindow.activate();
                Input.update();
                return true;
            }
        };
        Window_ItemList2.prototype.cursorRight = function (wrap) {
            var index = this.index();
            var maxItems = this.maxItems();
            if (maxItems < this.lineNum()) {
                return;
            }
            if (index >= this.lineNum()) {
                this.smoothSelect(index - this.lineNum());
            }
            else if (index + this.lineNum() < maxItems) {
                this.smoothSelect(index + this.lineNum());
            }
        };
        Window_ItemList2.prototype.lineNum = function () {
            return this._keyItem ? 12 : 10;
        };
        Window_ItemList2.prototype.cursorLeft = function (wrap) {
            var index = Math.max(0, this.index());
            var maxItems = this.maxItems();
            if (maxItems < this.lineNum()) {
                return;
            }
            var maxCols = this.maxCols();
            var horizontal = this.isHorizontal();
            if (index >= this.lineNum()) {
                this.smoothSelect(index - this.lineNum());
            }
            else if (index + this.lineNum() < maxItems) {
                this.smoothSelect(index + this.lineNum());
            }
        };
        ;
        Window_ItemList2.prototype.item = function () {
            return this.itemAt(this.index());
        };
        Window_ItemList2.prototype.updateHelp = function () {
            if (!this._boxHelpWindow || !this._helpWindow) {
                return;
            }
            if (this.active) {
                this._helpWindow.setItem(this.item());
                this._helpWindow.show();
                if (this.item() && this.item().isBox()) {
                    this._boxHelpWindow.setItem(this.item());
                    this._boxHelpWindow.show();
                }
                else {
                    this._boxHelpWindow.hide();
                }
            }
        };
        Window_ItemList2.prototype.selectTarget = function () {
            this._useItem = this.item();
            this.activate();
            this.refresh();
        };
        Window_ItemList2.prototype.clearTarget = function () {
            this._useItem = null;
            this.activate();
            this.refresh();
        };
        Window_ItemList2.prototype.useItem = function () {
            return this._useItem;
        };
        Window_ItemList2.prototype.setSell = function (b) {
            this._sell = b;
            this.refresh();
        };
        return Window_ItemList2;
    }(Window_ItemList));
    Nore.Window_ItemList2 = Window_ItemList2;
    ColorManager.cursedColor = function () {
        return "#Dd80D7";
    };
    ColorManager.notIdentifiedColor = function () {
        return '#00FFFF';
    };
    var _ColorManager_textColor = ColorManager.textColor;
    ColorManager.textColor = function (n) {
        if (n == 32) {
            return ColorManager.notIdentifiedColor();
        }
        if (n == 33) {
            return ColorManager.cursedColor();
        }
        return _ColorManager_textColor.call(this, n);
    };
    var _Window_Help_prototype_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function (item) {
        if (ItemManager.isRogueItem(item)) {
            var desc = item.item().description;
            if (item.realItem().meta['weapon']) {
                var lv = parseInt(item.realItem().meta['lv']);
                if (lv > $gameParty.maxStartingWeaponLv()) {
                    desc += '\n\\C[2]転送装置のLVが足りないため、この武器はもちこめません';
                }
            }
            if (item.realItem().meta['armor']) {
                var lv = parseInt(item.realItem().meta['lv']);
                if (lv > $gameParty.maxStartingArmorLv()) {
                    desc += '\n\\C[2]転送装置のLVが足りないため、この防具はもちこめません';
                }
            }
            this.setText(desc);
        }
        else {
            _Window_Help_prototype_setItem.call(this, item);
        }
    };
})(Nore || (Nore = {}));
