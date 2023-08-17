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
var Game_RogueParty = /** @class */ (function (_super) {
    __extends(Game_RogueParty, _super);
    function Game_RogueParty() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ether = 0;
        _this._tensouPoint = 0;
        _this._questReward = 0;
        _this._guildRank = 1;
        return _this;
    }
    Game_RogueParty.prototype.inventory = function () {
        return this._inventory;
    };
    Game_RogueParty.prototype.ether = function () {
        return this._ether;
    };
    Game_RogueParty.prototype.gainEther = function (n) {
        this._ether += n;
    };
    Game_RogueParty.prototype.upTensouPoint = function (n) {
        this._tensouPoint += n;
    };
    Game_RogueParty.prototype.loseEther = function (n) {
        this._ether -= n;
    };
    Game_RogueParty.prototype.tensouPoint = function () {
        return this._tensouPoint;
    };
    Game_RogueParty.prototype.loseTensouPoint = function (n) {
        this._tensouPoint -= n;
    };
    Game_RogueParty.prototype.etherToPointRate = function () {
        return 300;
    };
    Game_RogueParty.prototype.convertEtherToPoint = function () {
        var up = Math.floor(this._ether / this.etherToPointRate());
        if (up > 0) {
            this._ether -= up * this.etherToPointRate();
            this._tensouPoint += up;
        }
    };
    Game_RogueParty.prototype.gainItem = function (item, amount, includeEquip) {
        if (item && DataManager.isArmor(item) && item.id > 100) {
            _super.prototype.gainItem.call(this, item, amount, includeEquip);
            return;
        }
        var rogueItem = ItemManager.toRogueItem(item);
        if (amount > 0) {
            this._inventory.add(rogueItem);
            if (!$gameSwitches.value(1)) {
                rogueItem.identify();
            }
        }
        else {
            this._inventory.loseItem(rogueItem);
        }
        $gameMap.requestRefresh();
    };
    Game_RogueParty.prototype.gainGold = function (n) {
        _super.prototype.gainGold.call(this, n);
        $gameMedals.onGold(n);
    };
    /*gainGoldItem(ng) {
        if (amount > 0 && $gameSwitches.value(1)) {
            if (! notShowItemLog) {
                //$gameTemp.addItemLog(item);
                Nore.$gameMessageRogue.add(TextManager.obtainGold.format($gameSwitches.value(1)))
            }
        }
        super.gainItem(item, amount, includeEquip);
        */
    Game_RogueParty.prototype.earnQuestReward = function (n) {
        this._questReward += n;
    };
    Game_RogueParty.prototype.setGuildRank = function (n) {
        if (this._guildRank >= n) {
            return;
        }
        this._guildRank = n;
    };
    Game_RogueParty.prototype.guildRank = function () {
        return this._guildRank;
    };
    Game_RogueParty.prototype.hasEquipItem = function (item) {
        for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.armors().indexOf(item) >= 0) {
                return true;
            }
        }
        return false;
    };
    Game_RogueParty.prototype.clearIdentifyManager = function () {
        this._identifyManager = new IdentifyManager();
    };
    ;
    Game_RogueParty.prototype.identifyManager = function () {
        this._identifyManager = this._identifyManager || new IdentifyManager();
        return this._identifyManager;
    };
    Game_RogueParty.prototype.initAllItems = function () {
        _super.prototype.initAllItems.call(this);
        this._inventory = new Inventory();
    };
    Game_RogueParty.prototype.gainStartingItems = function (type) {
        this.gainStartingWeapon(type);
        this.gainStartingArmor(type);
        this.gainStartingItem();
    };
    Game_RogueParty.prototype.gainStartingWeapon = function (type) {
        var found = this.findStartingWeapon();
        if (!found) {
            $gameActors.mainActor().changeEquip(0, null);
            return;
        }
        //p('delete ' + found.id)
        //$gameParty.loseItem($gameParty.inventory().findWeapon(found.id), 1);
        var weaponId = parseInt(found.meta['weapon']);
        var weapon = $dataWeapons[weaponId];
        var item = new RogueItem(weapon, 1);
        item.plus = 0;
        this.gainItem(item, 1);
        $gameActors.mainActor().changeEquip(0, item);
    };
    Game_RogueParty.prototype.gainStartingArmor = function (type) {
        var found = this.findStartingArmor();
        if (!found) {
            $gameActors.mainActor().changeEquip(2, null);
            return;
        }
        //p('delete ' + found.id)
        //$gameParty.loseItem($gameParty.inventory().findArmor(found.id), 1);
        var armorId = parseInt(found.meta['armor']);
        var armor = $dataArmors[armorId];
        var item = new RogueItem(armor, 1);
        this.gainItem(item, 1);
        $gameActors.mainActor().changeEquip(2, item);
    };
    Game_RogueParty.prototype.findStartingWeapon = function () {
        if ($gameVariables.value(4) == 1) {
            return $dataWeapons[16];
        }
        var level = this.maxStartingWeaponLv();
        var max = -1;
        var foundArmor;
        for (var i = 16; i <= 20; i++) {
            var armor = $dataWeapons[i];
            if (this.inventory().hasWeapon(armor.id)) {
                var wLevel = parseInt(armor.meta['lv']);
                if (wLevel <= level) {
                    var weaponId = parseInt(armor.meta['weapon']);
                    if (max <= weaponId) {
                        max = weaponId;
                        foundArmor = armor;
                    }
                }
            }
        }
        return foundArmor;
    };
    Game_RogueParty.prototype.maxStartingWeaponLv = function () {
        var max = 0;
        for (var i = 500; i < 800; i++) {
            var armor = $dataArmors[i];
            if (this.numItems(armor) > 0) {
                var weaponId = parseInt(armor.meta['weaponLv']);
                if (!isNaN(weaponId)) {
                    max = weaponId;
                }
            }
        }
        return max;
    };
    Game_RogueParty.prototype.maxStartingArmorLv = function () {
        var max = 0;
        for (var i = 500; i < 800; i++) {
            var armor = $dataArmors[i];
            if (this.numItems(armor) > 0) {
                var weaponId = parseInt(armor.meta['armorLv']);
                if (!isNaN(weaponId)) {
                    max = weaponId;
                }
            }
        }
        return max;
    };
    Game_RogueParty.prototype.findStartingArmor = function () {
        if ($gameVariables.value(4) == 1) {
            return $dataArmors[60];
        }
        var level = this.maxStartingArmorLv();
        var foundArmor;
        var max = -1;
        for (var i = 60; i < 70; i++) {
            var armor = $dataArmors[i];
            if (this.inventory().hasArmor(armor.id)) {
                var wLevel = parseInt(armor.meta['lv']);
                if (wLevel <= level) {
                    var armorId = parseInt(armor.meta['armor']);
                    if (max <= armorId) {
                        max = armorId;
                        foundArmor = armor;
                    }
                }
            }
        }
        return foundArmor;
    };
    Game_RogueParty.prototype.gainStartingItem = function () {
        for (var i = 500; i < 800; i++) {
            var armor = $dataArmors[i];
            if (this.numItems(armor) > 0) {
                var itemId = parseInt(armor.meta['initialItem']);
                if (itemId) {
                    var rogueItem = new RogueItem($dataItems[itemId], 3);
                    $gameParty.gainItem(rogueItem, 1, false);
                }
            }
        }
    };
    Game_RogueParty.prototype.hasStartingItem = function () {
        var weaponInfo = this.findStartingWeapon();
        if (weaponInfo) {
            return true;
        }
        var armor = this.findStartingArmor();
        if (armor) {
            return true;
        }
        return false;
    };
    Game_RogueParty.prototype.rodPlusTurns = function () {
        var max = 0;
        for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.meta['tueTurn']) {
                max += parseInt(a.meta['tueTurn']);
            }
        }
        return max;
    };
    Game_RogueParty.prototype.seiekiPlus = function () {
        var n = 0;
        for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.meta['seiekiPlus']) {
                n += parseInt(a.meta['seiekiPlus']);
            }
        }
        return n;
    };
    Game_RogueParty.prototype.kusuriTurn = function () {
        var n = 0;
        for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.meta['kusuriTurn']) {
                n += parseInt(a.meta['kusuriTurn']);
            }
        }
        return n;
    };
    Game_RogueParty.prototype.tueTurn = function () {
        var n = 0;
        for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.meta['tueTurn']) {
                n += parseInt(a.meta['tueTurn']);
            }
        }
        return n;
    };
    return Game_RogueParty;
}(Game_Party));
