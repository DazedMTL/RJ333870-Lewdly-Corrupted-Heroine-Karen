var Nore;
(function (Nore) {
    var _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function (params) {
        $gameTemp.getItem = null;
        if (!$gameSwitches.value(1)) {
            return _Game_Interpreter_command302.call(this, params);
        }
        if (!params[4]) {
            return _Game_Interpreter_command302.call(this, params);
        }
        var goods = [params];
        while (this.nextEventCode() === 605) {
            this._index++;
            goods.push(this.currentCommand().parameters);
        }
        while (this.nextEventCode() === 302) {
            this._index++;
            goods.push(this.currentCommand().parameters);
            while (this.nextEventCode() === 605) {
                this._index++;
                goods.push(this.currentCommand().parameters);
            }
        }
        var item2;
        /*if ($gameSwitches.value(11)) {
            var newGoods = [];
            for (var item of goods) {
                switch (item[0]) {
                    case 0:  item2 = $dataItems[item[1]]; break;
                    case 1:  item2 = $dataWeapons[item[1]]; break;
                    case 2:  item2 = $dataArmors[item[1]]; break;
                }
                if ($gameParty.numItems(item2) === 0 && ! $gameParty.hasEquipItem(item2)) {
                    newGoods.push(item);
                }
            }
            goods = newGoods;
        }*/
        var item = goods[Math.randomInt(goods.length)];
        if (!item) {
            return true;
        }
        switch (item[0]) {
            case 0:
                item2 = $dataItems[item[1]];
                break;
            case 1:
                item2 = $dataWeapons[item[1]];
                break;
            case 2:
                item2 = $dataArmors[item[1]];
                break;
        }
        /*if $game_party.item_number(item2) > 0
          $game_switches[543] = true
        end*/
        $gameVariables.setValue(10, '\x1bI[' + item2.iconIndex + ']' + item2.name);
        $gameParty.gainItem(item2, 1, false);
        $gameTemp.getItem = item2;
        return true;
    };
    Game_Interpreter.prototype.calcTreasureType = function (valId) {
        var min = parseInt($dataMap.meta['箱min']);
        var max = parseInt($dataMap.meta['箱max']) + 1;
        var num = Math.randomInt(max - min) + min;
        var copyEvents = [];
        var boxEvents = [];
        for (var i = 0; i < $gameMap._events.length; i++) {
            var e = $gameMap._events[i];
            if (!e) {
                continue;
            }
            if (e && e.event().name == '箱') {
                var key = [$gameMap._mapId, i, 'A'];
                $gameSelfSwitches.setValue(key, false);
                boxEvents.push(e);
            }
            if (e && e.event().name == 'コピー箱') {
                copyEvents.push(e);
            }
        }
        var okEvents = [];
        for (var i = 0; i < num; i++) {
            if (boxEvents.length === 0) {
                break;
            }
            var index = Math.randomInt(boxEvents.length);
            okEvents.push(boxEvents[index]);
            boxEvents.splice(index, 1);
        }
        for (var i = 0; i < boxEvents.length; i++) {
            boxEvents[i].erase();
        }
        for (var i = 0; i < okEvents.length; i++) {
            var e = okEvents[i];
            var index = Math.randomInt(copyEvents.length);
            e.copyEvent = copyEvents[index].event();
            e._pageIndex = -2;
            e.refresh();
        }
        for (var i = 0; i < copyEvents.length; i++) {
            copyEvents[i].erase();
        }
    };
    var Game_Event_event = Game_Event.prototype.event;
    Game_Event.prototype.event = function () {
        if (this.copyEvent) {
            return this.copyEvent;
        }
        return Game_Event_event.call(this);
    };
    var _Game_Troop_makeDropItems = Game_Troop.prototype.makeDropItems;
    Game_Troop.prototype.makeDropItems = function () {
        if ($gameVariables.value(1) === 0) {
            return _Game_Troop_makeDropItems.call(this);
        }
        if (!$gameSwitches.value(183)) {
            return _Game_Troop_makeDropItems.call(this);
        }
        if (!$gameSwitches.value(11)) {
            var rate = 0.8;
            if (this.hasNamed()) {
                rate -= 0.2;
            }
            if (Math.random() < rate) {
                return _Game_Troop_makeDropItems.call(this);
            }
        }
        //this._interpreter.setup($dataCommonEvents[304].list);
        //this._interpreter.update();
        //
        if (!$gameSwitches.value(13)) {
            $gameSwitches.setValue(13, true);
            return [$dataArmors[498]];
        }
        var list = [];
        for (var i = 1; i < $dataArmors.length; i++) {
            var armor = $dataArmors[i];
            if (!armor) {
                continue;
            }
            if (parseInt(armor.meta.drop) <= $gameVariables.value(1)) {
                if (!$gameMedals.hasMedal(armor.id)) {
                    list.push(armor);
                }
            }
        }
        if (list.length === 0) {
            return [];
        }
        $gameTemp.getItem = list[Math.floor(Math.random() * list.length)];
        if ($gameTemp.getItem) {
            return [$gameTemp.getItem];
        }
        else {
            return [];
        }
    };
    BattleManager.displayDropItems = function () {
        var items = this._rewards.items;
        if (items.length > 0) {
            $gameMessage.newPage();
            items.forEach(function (item) {
                $gameMessage.add(TextManager.obtainItem.format('\x1bI[' + item.iconIndex + ']' + item.name));
            });
        }
    };
})(Nore || (Nore = {}));
function choiceDropItem(level, typeList) {
    typeList = typeList || [ItemType.potion, ItemType.rod, ItemType.scroll, ItemType.weapon, ItemType.armor];
    switch (level) {
        case 0: return choiceDropItemLevel0(typeList);
        case 1: return choiceDropItemLevel1(typeList);
        case 2: return choiceDropItemLevel2(typeList);
        case 3: return choiceDropItemLevel2(typeList);
    }
}
function choiceDropItemLevel0(typeList) {
    var candidatesPotion = {
        7: 3,
        //         8: 3,      // ハイポーション
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
    };
    var candidatesScroll = {
        60: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 1,
    };
    var candidatesRod = {
        41: 1,
        42: 1,
        43: 1,
        44: 1,
        45: 1,
        46: 31,
        47: 31,
    };
    var candidatesBox = {
        81: 1,
        82: 1,
        83: 1,
        84: 1,
        85: 1,
    };
    var candidatesWeapon = {
        2: 2,
        3: 1,
    };
    var candidatesArmor = {
        2: 1,
        3: 1,
    };
    var allList = [];
    if (typeList.includes(ItemType.potion)) {
        for (var key in candidatesPotion) {
            for (var i = 0; i < candidatesPotion[key]; i++) {
                allList.push($dataItems[key]);
            }
        }
    }
    for (var key in candidatesWeapon) {
        for (var i = 0; i < candidatesWeapon[key]; i++) {
            allList.push($dataWeapons[key]);
        }
    }
    for (var key in candidatesArmor) {
        for (var i = 0; i < candidatesWeapon[key]; i++) {
            allList.push($dataArmors[key]);
        }
    }
    return allList[Math.randomInt(allList.length)];
}
function choiceDropItemLevel1(typeList) {
    var candidatesItem = {
        5: 5,
        10: 2,
        11: 2,
        41: 1,
        42: 1,
        43: 1,
        44: 1,
        45: 1,
        46: 1,
    };
    var candidatesWeapon = {
        2: 2,
        3: 2,
    };
    var candidatesArmor = {
        2: 2,
        3: 2,
        4: 1,
        5: 1,
    };
    var allList = [];
    for (var key in candidatesItem) {
        for (var i = 0; i < candidatesItem[key]; i++) {
            allList.push($dataItems[key]);
        }
    }
    for (var key in candidatesWeapon) {
        for (var i = 0; i < candidatesWeapon[key]; i++) {
            allList.push($dataWeapons[key]);
        }
    }
    for (var key in candidatesArmor) {
        for (var i = 0; i < candidatesWeapon[key]; i++) {
            allList.push($dataArmors[key]);
        }
    }
    return allList[Math.randomInt(allList.length)];
}
function choiceDropItemLevel2(typeList) {
    var candidatesItem = {
        5: 5,
        10: 2,
        11: 2,
        41: 1,
        42: 1,
        43: 1,
        44: 1,
        45: 1,
        46: 1,
    };
    var candidatesWeapon = {
        2: 2,
        3: 2,
        4: 2,
    };
    var candidatesArmor = {
        2: 2,
        3: 2,
        3: 2,
    };
    var allList = [];
    for (var key in candidatesItem) {
        for (var i = 0; i < candidatesItem[key]; i++) {
            allList.push($dataItems[key]);
        }
    }
    for (var key in candidatesWeapon) {
        for (var i = 0; i < candidatesWeapon[key]; i++) {
            allList.push($dataWeapons[key]);
        }
    }
    for (var key in candidatesArmor) {
        for (var i = 0; i < candidatesWeapon[key]; i++) {
            allList.push($dataArmors[key]);
        }
    }
    return allList[Math.randomInt(allList.length)];
}
function choiceArrowCount(item) {
    return Math.randomInt(8) + 3;
}
function choiceRodCount(item) {
    return Math.randomInt(3) + 1;
}
function choiceBoxCount(item) {
    return Math.randomInt(5) + 2;
}
function choiceGoldCount(item) {
    return Math.randomInt($gameVariables.value(27) - $gameVariables.value(26)) + $gameVariables.value(26);
}
var RandomItem = /** @class */ (function () {
    function RandomItem() {
        this._candidatesItem = {};
        this._candidatesWeapon = {};
        this._candidatesArmor = {};
        //typeList = typeList || [ItemType.potion, ItemType.rod, ItemType.scroll, ItemType.weapon, ItemType.armor];
    }
    RandomItem.prototype.choice = function () {
        var allList = [];
        for (var key in this._candidatesItem) {
            for (var i = 0; i < this._candidatesItem[key]; i++) {
                allList.push($dataItems[key]);
            }
        }
        for (var key in this._candidatesWeapon) {
            for (var i = 0; i < this._candidatesWeapon[key]; i++) {
                allList.push($dataWeapons[key]);
            }
        }
        for (var key in this._candidatesArmor) {
            for (var i = 0; i < this._candidatesArmor[key]; i++) {
                allList.push($dataArmors[key]);
            }
        }
        var item = allList[Math.randomInt(allList.length)];
        if (item) {
            return new RogueItem(item, 1);
        }
        else {
            return null;
        }
    };
    RandomItem.prototype.addPotion = function (level) {
        var map = {};
        switch (level) {
            case 1:
                map = {
                    0: 8,
                    10: 2,
                    11: 2,
                    16: 2,
                };
                break;
            case 2:
                map = {
                    0: 6,
                    10: 2,
                    17: 2,
                    11: 2,
                    21: 1,
                };
                break;
            case 3:
                map = {
                    0: 5,
                    10: 2,
                    18: 2,
                    11: 2,
                    19: 1,
                    21: 1,
                };
                break;
            case 4:
                map = {
                    0: 2,
                    20: 2,
                    18: 2,
                    11: 2,
                    19: 1,
                    21: 1,
                };
                break;
        }
        this.addItemMap(map);
        return this;
    };
    RandomItem.prototype.addRod = function (level) {
        var map = {};
        switch (level) {
            case 1:
                map = {
                    0: 4,
                    41: 1,
                    42: 1,
                    43: 1,
                    44: 1,
                    45: 1,
                    46: 1,
                };
                break;
            case 2:
                map = {
                    0: 7,
                    41: 1,
                    42: 1,
                    43: 1,
                    44: 1,
                    45: 1,
                    46: 1,
                };
            case 2:
                map = {
                    0: 4,
                    41: 1,
                    43: 1,
                    44: 1,
                    45: 1,
                    46: 1,
                };
                break;
        }
        this.addItemMap(map);
        return this;
    };
    RandomItem.prototype.addScroll = function (level) {
        var map = {};
        switch (level) {
            case 1:
                map = {
                    0: 3,
                    60: 1,
                    62: 1,
                };
                break;
            case 2:
                map = {
                    0: 3,
                    60: 1,
                    62: 1,
                    64: 1,
                    63: 1,
                };
                break;
            case 3:
                map = {
                    0: 2,
                    60: 1,
                    64: 1,
                    63: 1,
                };
                break;
        }
        this.addItemMap(map);
        return this;
    };
    RandomItem.prototype.addWeapon = function (level) {
        var map = {};
        switch (level) {
            case 1:
                map = {
                    0: 2,
                    2: 1,
                    3: 1,
                };
                break;
            case 2:
                map = {
                    0: 3,
                    2: 1,
                    3: 1,
                    4: 1,
                    12: 1,
                };
                break;
            case 3:
                map = {
                    0: 3,
                    4: 1,
                    5: 1,
                    6: 1,
                    12: 1,
                };
                break;
            case 4:
                map = {
                    0: 3,
                    6: 1,
                    7: 1,
                    8: 1,
                    12: 1,
                };
                break;
            case 5:
                map = {
                    0: 3,
                    8: 1,
                    9: 1,
                    10: 1,
                    12: 1,
                };
                break;
            case 6:
                map = {
                    0: 3,
                    8: 1,
                    9: 1,
                    10: 1,
                };
                break;
        }
        this.addWeaponMap(map);
        return this;
    };
    RandomItem.prototype.addArmor = function (level) {
        var map = {};
        switch (level) {
            case 1:
                map = {
                    0: 3,
                    2: 1,
                    3: 1,
                };
                break;
            case 2:
                map = {
                    0: 3,
                    2: 2,
                    5: 1,
                    3: 2,
                    8: 1,
                };
                break;
            case 3:
                map = {
                    0: 5,
                    5: 1,
                    15: 2,
                    16: 2,
                    27: 2,
                    8: 1,
                };
                break;
            case 4:
                map = {
                    0: 7,
                    15: 2,
                    16: 2,
                    17: 2,
                    27: 2,
                    28: 2,
                    8: 1,
                };
                break;
            case 5:
                map = {
                    0: 5,
                    15: 2,
                    16: 2,
                    17: 2,
                    27: 2,
                    28: 2,
                    8: 1,
                };
                break;
            case 6:
                map = {
                    0: 5,
                    15: 2,
                    16: 2,
                    17: 2,
                    27: 2,
                    28: 2,
                };
                break;
        }
        this.addArmorMap(map);
        return this;
    };
    RandomItem.prototype.addItemMap = function (map) {
        for (var i in map) {
            this._candidatesItem[i] = this._candidatesItem[i] || 0;
            this._candidatesItem[i] += map[i];
        }
    };
    RandomItem.prototype.addWeaponMap = function (map) {
        for (var i in map) {
            this._candidatesWeapon[i] = this._candidatesWeapon[i] || 0;
            this._candidatesWeapon[i] += map[i];
        }
    };
    RandomItem.prototype.addArmorMap = function (map) {
        for (var i in map) {
            this._candidatesArmor[i] = this._candidatesArmor[i] || 0;
            this._candidatesArmor[i] += map[i];
        }
    };
    RandomItem.prototype.randomItem = function (list) {
        return list[Math.randomInt(list.length)];
    };
    return RandomItem;
}());
