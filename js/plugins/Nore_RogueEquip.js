/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
    Game_Actor.prototype.paramPlus = function (paramId) {
        var value = Game_Battler.prototype.paramPlus.call(this, paramId);
        for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
            var item = _a[_i];
            if (item) {
                if (paramId == 2) {
                    value += item.atk();
                }
                else if (paramId == 3) {
                    value += item.def();
                }
            }
        }
        return value;
    };
    Game_Actor.prototype.initEquips = function (equips) {
        var slots = this.equipSlots();
        var maxSlots = slots.length;
        this._equips = [];
        for (var i = 0; i < maxSlots; i++) {
            this._equips[i] = new Game_Item();
        }
        for (var j = 0; j < equips.length; j++) {
            if (j < maxSlots) {
                //this._equips[j].setObject(new RogueItem(equips[j]));
            }
        }
        this.releaseUnequippableItems(true);
        this.refresh();
    };
    Game_Actor.prototype.canWeaponChange = function () {
        var e = this.equips()[0];
        if (!e || !e.isCursed) {
            return true;
        }
        return false;
    };
    Game_Actor.prototype.canArmorChange = function (slotId) {
        var e = this.equips()[slotId];
        if (!e || !e.isCursed) {
            return true;
        }
        return false;
    };
    /*Game_Actor.prototype.currentEquippedItem = function() {
    
    };*/
    Window_ShopStatus.prototype.currentEquippedItem = function (actor, etypeId) {
        var list = [];
        var equips = actor.equips();
        var slots = actor.equipSlots();
        for (var i = 0; i < slots.length; i++) {
            if (slots[i] === etypeId) {
                list.push(equips[i]);
            }
        }
        var paramId = this.paramId();
        var worstParam = Number.MAX_VALUE;
        var worstItem = null;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item && item.realItem().params[paramId] < worstParam) {
                worstParam = item.realItem().params[paramId];
                worstItem = item.realItem();
            }
        }
        return worstItem;
    };
    var _Game_Item_prototype_object = Game_Item.prototype.object;
    Game_Item.prototype.object = function () {
        if (this._objectId) {
            return $gameParty._inventory.findItem(this._objectId);
        }
        else {
            return _Game_Item_prototype_object.call(this);
        }
    };
    var _Game_Item_prototype_setObject = Game_Item.prototype.setObject;
    Game_Item.prototype.setObject = function (item) {
        if (item && item.isRogue) {
            this._objectId = item.id;
        }
        else {
            this._objectId = 0;
            _Game_Item_prototype_setObject.call(this, item);
        }
    };
    Game_Actor.prototype.changeEquip = function (slotId, item) {
        this._equips[slotId].setObject(item);
        this.refresh();
    };
    Game_Actor.prototype.traitObjects = function () {
        var objects = Game_Battler.prototype.traitObjects.call(this);
        objects.push(this.actor(), this.currentClass());
        for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
            var item = _a[_i];
            if (item) {
                objects.push(item.item());
            }
        }
        return objects;
    };
})(Nore || (Nore = {}));
