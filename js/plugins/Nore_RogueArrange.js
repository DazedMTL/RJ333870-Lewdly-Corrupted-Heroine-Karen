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
    function putEventItem(itemId) {
        var point = new Point($gamePlayer.x, $gamePlayer.y);
        var item = new RogueItem($dataItems[itemId], 1);
        EventArranger.putTreasureItem(point, item, point.x, point.y);
    }
    Nore.putEventItem = putEventItem;
    function putTreasureItem() {
        var point = $gamePlayer.nextPos();
        var item = EventArranger.createRandomItem();
        EventArranger.putTreasureItem(point, item, point.x, point.y);
    }
    Nore.putTreasureItem = putTreasureItem;
    var treasureItems = [];
    function goldStack() {
        switch ($gameVariables.value(1)) {
            case Dungeon.MORI:
                return 35;
            case Dungeon.GOBLIN:
                return 40;
            case Dungeon.SANZOKU:
                return 80;
            case Dungeon.TOWER:
                return 240;
            case Dungeon.CASTLE:
                return 120;
            case Dungeon.HELL:
                return 120;
        }
        return 35;
    }
    function treasureRate() {
        var n = 1;
        if ($gameParty.hasItem($dataArmors[517])) {
            n += 0.2;
        }
        if ($gameParty.hasItem($dataArmors[516])) {
            n += 0.2;
        }
        return n;
    }
    function calcTreasureItems() {
        var list = [];
        var getCount = $gameVariables.value(11);
        var gold = Math.round(calcTreasureGold() * treasureRate());
        while (gold > 0) {
            var n_1 = Math.randomInt(35) + goldStack();
            if (gold <= n_1) {
                n_1 = gold;
            }
            var rogueItem = new RogueItem($dataItems[5], n_1);
            gold -= n_1;
            list.push(rogueItem);
        }
        var n = 1;
        // if (getCount == 0) {
        plusInitialTreasure(list);
        /*} else {
            for (var i = 0; i < n; i++) {
                let rogueItem = EventArranger.createRandomItem();
                while (rogueItem.isGold()) {
                    rogueItem = EventArranger.createRandomItem();
                }
                list.push(rogueItem);
            }
        }*/
        //list.push(new RogueItem($dataItems[6], 1));
        var ether = calcTreasureEther();
        if (ether > 0) {
            if ($gameParty.seiekiPlus() > 0) {
                ether += ether * $gameParty.seiekiPlus() / 100;
            }
            if ($gameVariables.value(100) == 2) {
                // すごく簡単
                ether *= 2;
            }
            list.push(new RogueItem($dataItems[7], Math.floor(ether)));
        }
        treasureItems = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var i = list_1[_i];
            if (i) {
                treasureItems.push(i);
            }
        }
    }
    Nore.calcTreasureItems = calcTreasureItems;
    var Dungeon;
    (function (Dungeon) {
        Dungeon[Dungeon["MORI"] = 1] = "MORI";
        Dungeon[Dungeon["GOBLIN"] = 2] = "GOBLIN";
        Dungeon[Dungeon["SANZOKU"] = 3] = "SANZOKU";
        Dungeon[Dungeon["TOWER"] = 4] = "TOWER";
        Dungeon[Dungeon["CASTLE"] = 5] = "CASTLE";
        Dungeon[Dungeon["HELL"] = 6] = "HELL";
    })(Dungeon || (Dungeon = {}));
    function hasNextTreasure() {
        return treasureItems.length > 0;
    }
    Nore.hasNextTreasure = hasNextTreasure;
    function calcTreasureGold() {
        switch ($gameVariables.value(1)) {
            case Dungeon.MORI:
                return 50 + Math.randomInt(50);
            case Dungeon.GOBLIN:
                return 60 + Math.randomInt(50);
            case Dungeon.SANZOKU:
                return 100 + Math.randomInt(280);
            case Dungeon.TOWER:
                return 500 + Math.randomInt(580);
            case Dungeon.CASTLE:
                return 200 + Math.randomInt(380);
            case Dungeon.HELL:
                return 100 + Math.randomInt(80);
        }
    }
    function calcTreasureEther() {
        switch ($gameVariables.value(1)) {
            case Dungeon.GOBLIN:
                return 15 + Math.randomInt(10);
            case Dungeon.SANZOKU:
                return 15 + Math.randomInt(10);
            case Dungeon.TOWER:
                return 25 + Math.randomInt(20);
            case Dungeon.CASTLE:
                return 25 + Math.randomInt(20);
            case Dungeon.HELL:
                return 25 + Math.randomInt(25);
        }
        return 0;
    }
    function plusInitialTreasure(treasureItems) {
        switch ($gameVariables.value(1)) {
            case Dungeon.MORI:
                treasureItems.push(new RandomItem().addWeapon(1).choice());
                treasureItems.push(new RandomItem().addArmor(1).choice());
                treasureItems.push(new RandomItem().addPotion(1).choice());
                break;
            case Dungeon.GOBLIN:
                if ($gameVariables.value(41) >= 1) {
                    treasureItems.push(new RandomItem().addWeapon(2).choice());
                    treasureItems.push(new RandomItem().addArmor(2).choice());
                }
                treasureItems.push(new RandomItem().addScroll(1).choice());
                treasureItems.push(new RandomItem().addRod(1).choice());
                treasureItems.push(new RandomItem().addPotion(2).choice());
                break;
            case Dungeon.SANZOKU:
                treasureItems.push(new RandomItem().addWeapon(3).choice());
                treasureItems.push(new RandomItem().addArmor(3).choice());
                treasureItems.push(new RandomItem().addPotion(2).choice());
                treasureItems.push(new RandomItem().addScroll(1).choice());
                treasureItems.push(new RandomItem().addRod(1).choice());
                break;
            case Dungeon.TOWER:
                treasureItems.push(new RandomItem().addWeapon(6).choice());
                treasureItems.push(new RandomItem().addArmor(6).choice());
                treasureItems.push(new RandomItem().addPotion(3).choice());
                treasureItems.push(new RandomItem().addScroll(3).choice());
                treasureItems.push(new RandomItem().addRod(3).choice());
                break;
            case Dungeon.CASTLE:
                treasureItems.push(new RandomItem().addWeapon(5).choice());
                treasureItems.push(new RandomItem().addArmor(5).choice());
                treasureItems.push(new RandomItem().addPotion(3).choice());
                treasureItems.push(new RandomItem().addScroll(2).choice());
                treasureItems.push(new RandomItem().addRod(2).choice());
                break;
        }
    }
    function putTreasureItemOne() {
        var point = $gamePlayer.nextPos();
        var item = treasureItems.shift();
        //if (item.isGold()) {
        AudioManager.playSe({ name: 'Coin', volume: 100, pitch: 100, pan: 0 });
        //}
        /*if (item.isEquip()) {
            AudioManager.playSe({ name: 'Coin', volume: 100, pitch: 100, pan: 0 });
        }*/
        EventArranger.putTreasureItem(point, item, point.x, point.y);
    }
    Nore.putTreasureItemOne = putTreasureItemOne;
    var EventArranger = /** @class */ (function () {
        function EventArranger() {
        }
        EventArranger.putTreasureItem = function (from, rogueItem, x, y) {
            var candidates = EventArranger.createTreasureCandidates(x, y);
            for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
                var c = candidates_1[_i];
                if (EventArranger.canPutTreasure(c.x, c.y)) {
                    var newItem = $gameMap.putItem(rogueItem, c.x, c.y, true);
                    var sprite = null;
                    //if (EventArranger.itemBaseSprite()) {
                    sprite = new Sprite_Item(newItem);
                    //p('put' + rogueItem.item())
                    EventArranger.spriteset()._tilemap.addChild(sprite);
                    sprite.jump(from);
                    //}
                    $gameMap.change();
                    return;
                }
            }
            console.error('アイテムを配置できませんでした');
        };
        EventArranger.putItem = function (rogueItem, x, y, visible) {
            if (visible === void 0) { visible = false; }
            var candidates = EventArranger.createCandidates(x, y);
            for (var _i = 0, candidates_2 = candidates; _i < candidates_2.length; _i++) {
                var c = candidates_2[_i];
                if (EventArranger.canPut(c.x, c.y)) {
                    var newItem = $gameMap.putItem(rogueItem, c.x, c.y, visible);
                    var sprite = null;
                    if (EventArranger.itemBaseSprite()) {
                        sprite = new Sprite_Item(newItem);
                        //p('put' + rogueItem.item())
                        EventArranger.itemBaseSprite().addChild(sprite);
                    }
                    $gameMap.change();
                    return sprite;
                }
            }
            console.error('アイテムを配置できませんでした');
            return null;
        };
        EventArranger.createCandidates = function (x, y) {
            var candidates = [
                { x: x, y: y },
                { x: x - 1, y: y }, { x: x + 1, y: y }, { x: x, y: y - 1 }, { x: x, y: y + 1 },
                { x: x - 1, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y + 1 },
                { x: x - 2, y: y }, { x: x + 2, y: y }, { x: x, y: y - 2 }, { x: x, y: y + 2 },
                { x: x - 2, y: y - 1 }, { x: x - 1, y: y - 2 }, { x: x + 2, y: y + 1 }, { x: x + 1, y: y + 2 }, { x: x + 1, y: y + 2 }, { x: x + 2, y: y + 1 }, { x: x - 1, y: y + 2 }, { x: x - 2, y: y + 1 },
                { x: x - 3, y: y }, { x: x + 3, y: y }, { x: x, y: y - 3 }, { x: x, y: y + 3 },
                { x: x - 2, y: y - 2 }, { x: x + 2, y: y - 2 }, { x: x - 2, y: y + 2 }, { x: x + 2, y: y + 2 },
            ];
            return candidates;
        };
        EventArranger.createTreasureCandidates = function (x, y) {
            var candidates = [
                { x: x, y: y + 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y + 1 },
                { x: x, y: y + 2 }, { x: x - 1, y: y + 2 }, { x: x + 1, y: y + 2 },
                { x: x - 1, y: y }, { x: x + 1, y: y },
                { x: x - 2, y: y + 1 }, { x: x + 2, y: y + 1 },
                { x: x - 2, y: y + 2 }, { x: x + 2, y: y + 2 },
                { x: x - 3, y: y + 1 }, { x: x + 3, y: y + 1 },
                { x: x - 3, y: y + 2 }, { x: x + 3, y: y + 2 },
                { x: x - 1, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y + 1 },
                { x: x - 2, y: y }, { x: x + 2, y: y }, { x: x, y: y - 2 }, { x: x, y: y + 2 },
                { x: x - 2, y: y - 1 }, { x: x - 1, y: y - 2 }, { x: x + 2, y: y + 1 }, { x: x + 1, y: y + 2 }, { x: x + 1, y: y + 2 }, { x: x + 2, y: y + 1 }, { x: x - 1, y: y + 2 }, { x: x - 2, y: y + 1 },
                { x: x - 3, y: y }, { x: x + 3, y: y }, { x: x, y: y - 3 }, { x: x, y: y + 3 },
                { x: x - 2, y: y - 2 }, { x: x + 2, y: y - 2 }, { x: x - 2, y: y + 2 }, { x: x + 2, y: y + 2 },
            ];
            return candidates;
        };
        EventArranger.createRandomItem = function () {
            var item = choiceDropItem($gameVariables.value(23));
            var count = 1;
            if (item.meta['arrow']) {
                count = choiceArrowCount(item);
            }
            if (item.meta['rod']) {
                count = choiceRodCount(item);
            }
            if (item.meta['box']) {
                count = choiceBoxCount(item);
            }
            if (item.meta['gold']) {
                count = choiceGoldCount(item);
            }
            return new RogueItem(item, count);
        };
        EventArranger.canPutTreasure = function (x, y) {
            if (!EventArranger.canPut(x, y)) {
                return false;
            }
            if ($gamePlayer.x == x && $gamePlayer.y == y) {
                return false;
            }
            for (var _i = 0, _a = $gameMap.eventsXy(x, y); _i < _a.length; _i++) {
                var e_1 = _a[_i];
                if (e_1.event().meta['treasure']) {
                    return false;
                }
                if (e_1 instanceof Game_EnemyEvent) {
                    var ev = e_1;
                    if (ev.isEnemy() && ev.enemy().isAlive()) {
                        return false;
                    }
                }
            }
            return true;
        };
        EventArranger.putTreasure = function (point) {
            if (!point) {
                return;
            }
            //$gameSwitches.setValue(9, true);
            var event = $gamePlayer.room.findTreasureEvent();
            if (event) {
                event._erased = false;
                event._x = point.x;
                event._realX = point.x;
                event._y = point.y;
                event._realY = point.y;
            }
        };
        EventArranger.canPut = function (x, y) {
            if (!EventArranger.canPassable(x, y)) {
                return false;
            }
            if ($gameMap.itemAt(x, y)) {
                return false;
            }
            return true;
        };
        EventArranger.getPlayerPutPosition = function (x, y) {
            var candidates = EventArranger.createCandidates(x, y);
            for (var _i = 0, candidates_3 = candidates; _i < candidates_3.length; _i++) {
                var c = candidates_3[_i];
                if (!EventArranger.canPassable(c.x, c.y)) {
                    continue;
                }
                if (EventArranger.enemyEventAt(c.x, c.y)) {
                    continue;
                }
                return c;
            }
            return candidates[0];
        };
        EventArranger.enemySpriteAt = function (x, y) {
            var list = $gameMap.eventsXy(x, y);
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var e_2 = list_2[_i];
                if (e_2.isEnemy() && EventArranger.isAlive(e_2)) {
                    return EventArranger.findEnemySprite(e_2);
                }
            }
            return null;
        };
        EventArranger.enemyEventAt = function (x, y) {
            var list = $gameMap.eventsXy(x, y);
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var e_3 = list_3[_i];
                if (e_3.isEnemy() && EventArranger.isAlive(e_3)) {
                    return e_3;
                }
            }
            return null;
        };
        EventArranger.findEnemySprite = function (e) {
            for (var _i = 0, _a = EventArranger.spriteset()._characterSprites; _i < _a.length; _i++) {
                var s = _a[_i];
                if (s.checkCharacter(e)) {
                    return s;
                }
            }
            return null;
        };
        EventArranger.isEnemy = function (x, y) {
            var list = $gameMap.eventsXy(x, y);
            for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                var e_4 = list_4[_i];
                if (e_4.isEnemy() && EventArranger.isAlive(e_4)) {
                    return true;
                }
            }
            return false;
        };
        EventArranger.isAlive = function (e) {
            if (e._erased) {
                return false;
            }
            return true;
            /*const switchList = ['B', 'C', 'D'];
            for (const s of switchList) {
                const key = [$gameMap.mapId(), e.eventId(), s];
                if ($gameSelfSwitches.value(key)) {
                    return false;
                }
            }
            return true;*/
        };
        EventArranger.spriteset = function () {
            return SceneManager._scene._spriteset;
        };
        EventArranger.itemBaseSprite = function () {
            if (EventArranger.spriteset()) {
                return EventArranger.spriteset()._itemBase;
            }
            else {
                return false;
            }
        };
        EventArranger.canPassable = function (x, y) {
            return $gameMap.isAirshipLandOk(x, y);
        };
        EventArranger.onEnemyDead = function (x, y) {
            return;
            EventArranger.putItem(EventArranger.createRandomItem(), x, y);
        };
        EventArranger.canEnemyMove = function (event, fromX, fromY, toX, toY, skipEnemy) {
            var direction = EventArranger.checkDirection(fromX, fromY, toX, toY);
            if (skipEnemy) {
                return event.canPassWithoutCollide(fromX, fromY, direction);
            }
            else {
                return event.canPass(fromX, fromY, direction);
            }
        };
        EventArranger.checkDirection = function (fromX, fromY, toX, toY) {
            if (fromX < toX) {
                if (fromY < toY) {
                    return 3;
                }
                if (fromY > toY) {
                    return 9;
                }
                return 6;
            }
            if (fromX > toX) {
                if (fromY < toY) {
                    return 1;
                }
                if (fromY > toY) {
                    return 7;
                }
                return 4;
            }
            if (fromY < toY) {
                return 2;
            }
            if (fromY > toY) {
                return 8;
            }
        };
        EventArranger.isStair = function (x, y) {
            var events = $gameMap.eventsXy(x, y);
            if (events.length > 0) {
                if (events[0].event().meta['stair']) {
                    return true;
                }
            }
            return false;
        };
        EventArranger.hasFootEvent = function (x, y) {
            var item = $gameMap.itemAt(x, y);
            if (item) {
                return true;
            }
            if (EventArranger.isStair(x, y)) {
                return true;
            }
            return false;
        };
        EventArranger.characterAt = function (x, y) {
            if ($gamePlayer.x == x && $gamePlayer.y == y) {
                return $gamePlayer;
            }
            return EventArranger.enemyEventAt(x, y);
        };
        EventArranger.spriteAt = function (x, y) {
            if ($gamePlayer.x == x && $gamePlayer.y == y) {
                return EventArranger.spriteset().findPlayerSprite();
            }
            return this.enemySpriteAt(x, y);
        };
        EventArranger.findPlayerSprite = function () {
            return EventArranger.spriteset().findPlayerSprite();
        };
        EventArranger.putExitObject = function (room) {
            $gameSwitches.setValue(7, true);
        };
        EventArranger.removeExitObject = function (room) {
            $gameSwitches.setValue(7, false);
        };
        EventArranger.putEnemies = function (candidates) {
            var x = $gamePlayer.x;
            var y = $gamePlayer.y;
            var posList = [{ x: x - 1, y: y }, { x: x + 1, y: y }, { x: x, y: y - 1 }, { x: x, y: y + 1 },
            { x: x - 1, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y + 1 }];
            var room = $gamePlayer.room;
            if (!room) {
                console.error('room がみつかりません');
                return;
            }
            var eventId = EventArranger.maxEventId() + 1;
            for (var _i = 0, posList_1 = posList; _i < posList_1.length; _i++) {
                var pos = posList_1[_i];
                if (!room.contains(pos.x, pos.y)) {
                    continue;
                }
                if (EventArranger.isEnemy(pos.x, pos.y)) {
                    continue;
                }
                var enemyId = candidates[Math.randomInt(candidates.length)];
                EventArranger.putEnemy(pos.x, pos.y, enemyId, eventId);
                eventId++;
            }
            room.createEnemyList();
        };
        EventArranger.maxEventId = function () {
            var maxId = 0;
            var events = $dataMap.events.filter(function (event) { return !!event; });
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event_1 = events_1[_i];
                if (event_1.id > maxId) {
                    maxId = event_1.id;
                }
            }
            return maxId;
        };
        EventArranger.putEnemy = function (x, y, enemyId, eventId) {
            var event = {
                "id": eventId,
                "name": "EV001",
                "note": "<enemy:" + enemyId + ">",
                "pages": [{
                    "conditions": { "actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0 },
                    "directionFix": false, "image": { "characterIndex": 0, "characterName": "", "direction": 2, "pattern": 0, "tileId": 0 },
                    "list": [{ "code": 0, "indent": 0, "parameters": [] }], "moveFrequency": 3, "moveRoute": { "list": [{ "code": 0, "parameters": [] }], "repeat": true, "skippable": false, "wait": false }, "moveSpeed": 3, "moveType": 0, "priorityType": 1, "stepAnime": true, "through": false, "trigger": 0, "walkAnime": true
                }], "x": x, "y": y, "meta": {}
            };
            DataManager.extractMetadata(event);
            var gameEvent = new Game_EnemyEvent($gameMap.mapId(), event.id, event);
            gameEvent._moveType = MoveType.CHASE;
            gameEvent.refresh();
            $gameMap._events[gameEvent.eventId()] = gameEvent;
            gameEvent.setDirection($gamePlayer.reverseDir($gamePlayer.calcDir(x, y)));
            p(gameEvent);
            var sprite = new Sprite_Character(gameEvent);
            SceneManager._scene._spriteset._characterSprites.push(sprite);
            SceneManager._scene._spriteset._tilemap.addChild(sprite);
        };
        return EventArranger;
    }());
    Nore.EventArranger = EventArranger;
    var Sprite_Item = /** @class */ (function (_super) {
        __extends(Sprite_Item, _super);
        function Sprite_Item(_item) {
            var _this = _super.call(this) || this;
            _this._item = _item;
            _this._x = 0;
            _this._y = 0;
            _this._frameIndex = 0;
            _this._jumpCount = 0;
            _this._jumpPeak = 0;
            _this._moveSpeed = 4;
            _this._realX = 0;
            _this._realY = 0;
            _this.screenY = function () {
            };
            _this._x = _this._item.x();
            _this._y = _this._item.y();
            _this._item.gotten = false;
            _this.initBitmap();
            _this.x = $gameMap.adjustX(_this._x) * $gameMap.tileWidth();
            _this.y = $gameMap.adjustY(_this._y) * $gameMap.tileHeight();
            return _this;
        }
        Sprite_Item.prototype.jump = function (from) {
            var xPlus = this._x - from.x;
            var yPlus = this._y - from.y;
            var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
            this._jumpPeak = 16;
            this._jumpCount = this._jumpPeak * 2;
            this._realX = from.x;
            this._realY = from.y;
            this.update();
        };
        ;
        Sprite_Item.prototype.updateJump = function () {
            this._jumpCount--;
            this._realX = (this._realX * this._jumpCount + this._x) / (this._jumpCount + 1.0);
            this._realY = (this._realY * this._jumpCount + this._y) / (this._jumpCount + 1.0);
            if (this._jumpCount === 0) {
                this._realX = this._x = $gameMap.roundX(this._x);
                this._realY = this._y = $gameMap.roundY(this._y);
                var itemBase = this.parent.parent.parent._itemBase;
                this.parent.removeChild(this);
                itemBase.addChild(this);
                return;
            }
            this.x = $gameMap.adjustX(this._realX) * $gameMap.tileWidth();
            var th = $gameMap.tileHeight();
            this.y = Math.floor($gameMap.adjustY(this._realY) * th - this.jumpHeight());
        };
        ;
        Sprite_Item.prototype.initBitmap = function () {
            this.bitmap = new Bitmap(48, 48);
            var iconIndex = this._item.item().fieldIconIndex();
            var bitmap = ImageManager.loadSystem("IconSet");
            var pw = ImageManager.iconWidth;
            var ph = ImageManager.iconHeight;
            var sx = (iconIndex % 16) * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            this.bitmap.blt(bitmap, sx, sy, pw, ph, 6, 8);
        };
        Sprite_Item.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.isJumping()) {
                this.updateJump();
                return;
            }
            this.x = $gameMap.adjustX(this._x) * $gameMap.tileWidth();
            this.y = $gameMap.adjustY(this._y) * $gameMap.tileHeight();
            if (this._item.gotten) {
                this.visible = false;
            }
            else {
                this.visible = this._item.isVisible();
                return;
                if ($gamePlayer.room) {
                    this.visible = $gamePlayer.room.contains(this._x, this._y);
                    this.visible = this.visible || Math.abs($gamePlayer.x - this._x) + Math.abs($gamePlayer.y - this._y) <= 2;
                }
                else {
                    this.visible = Math.abs($gamePlayer.x - this._x) + Math.abs($gamePlayer.y - this._y) <= 2;
                }
            }
        };
        Sprite_Item.prototype.reverseDir = function (d) {
            return 10 - d;
        };
        Sprite_Item.prototype.isJumping = function () {
            return this._jumpCount > 0;
        };
        ;
        Sprite_Item.prototype.jumpHeight = function () {
            return ((this._jumpPeak * this._jumpPeak -
                Math.pow(Math.abs(this._jumpCount - this._jumpPeak), 2)) /
                2);
        };
        return Sprite_Item;
    }(Sprite));
    Nore.Sprite_Item = Sprite_Item;
})(Nore || (Nore = {}));
var INITIAL_EVENT_ID = 1001;
var EnemyEventPlacer = /** @class */ (function () {
    function EnemyEventPlacer(_map, _eventList) {
        this._map = _map;
        this._eventList = _eventList;
        this._enemyEvents = [];
        this._enemyPlaceEvents = [];
        this._treasurePlaceEvents = [];
        this._otherEvents = [];
        this._generatedEvents = [];
        $gameMap.clearItemMap();
        this.sortingEvent();
        this.createRoomPosMap();
        this.arrangePlayer();
        this.arrangeStair();
        this.arrangeDoors();
        this.arrangeEvents();
    }
    EnemyEventPlacer.prototype.createRoomPosMap = function () {
        if ($gameMap.isFixedFloor()) {
            return;
        }
        var rooms = $gameMap.getRoomList();
        this._roomPosMap = {};
        for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
            var room = rooms_1[_i];
            if ($gameVariables.value(2) == 1) {
                if (room == $gamePlayer.room) {
                    continue;
                }
            }
            var posList = [];
            for (var i = 0; i < room.w; i++) {
                for (var k = 0; k < room.h; k++) {
                    var x = room.x + i;
                    var y = room.y + k;
                    if ($gameMap.isFloor(x, y) && !$gamePlayer.isContact(x, y)) {
                        posList.push(new Point(x, y));
                    }
                }
            }
            this._roomPosMap[room.x + '_' + room.y] = posList;
        }
    };
    EnemyEventPlacer.prototype.getAllEvents = function () {
        var id = INITIAL_EVENT_ID;
        var result = [];
        for (var _i = 0, _a = this._generatedEvents; _i < _a.length; _i++) {
            var e_5 = _a[_i];
            var gameEvent = new Game_EnemyEvent(this._map.mapId(), id, e_5);
            if (e_5.meta['tresure']) {
                gameEvent._erased = true;
            }
            gameEvent.refresh();
            result.push(gameEvent);
            id++;
        }
        for (var _b = 0, _c = this._otherEvents; _b < _c.length; _b++) {
            var event_2 = _c[_b];
            var gameEvent = new Game_Event(this._map.mapId(), event_2.id);
            result.push(gameEvent);
        }
        return result;
    };
    EnemyEventPlacer.prototype.sortingEvent = function () {
        for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
            var event_3 = _a[_i];
            if (event_3.meta['enemy']) {
                this._enemyEvents.push(event_3);
            }
            else if (event_3.meta['enemyPlace']) {
                this._enemyPlaceEvents.push(event_3);
            }
            else if (event_3.meta['treasurePlace']) {
                this._treasurePlaceEvents.push(event_3);
            }
            else if (event_3.meta['treasure']) {
                this._treasurEvent = event_3;
            }
            else if (event_3.meta['stair']) {
                this._stairEvent = event_3;
            }
            else if (event_3.meta['door']) {
                this._doorEvent = event_3;
            }
            else {
                this._otherEvents.push(event_3);
            }
        }
        if (!$gameMap.isFixedFloor()) {
        }
        if (this._enemyEvents.length == 0) {
            console.error('敵イベントが存在しません');
        }
    };
    EnemyEventPlacer.prototype.arrangeEvents = function () {
        var enemyCount = this._map.initialEnemyCount();
        var roomList = this.selectEnemyRooms();
        var level = 1;
        var dungeonEnemy = ENEMY_PARAMS[$gameVariables.value(1)];
        var floor = $gameVariables.value(2);
        var floorMap = dungeonEnemy['FLOOR' + floor];
        for (var _i = 0, roomList_1 = roomList; _i < roomList_1.length; _i++) {
            var room = roomList_1[_i];
            var candidates = floorMap['LEVEL' + level];
            if (!candidates) {
                console.error(dungeonEnemy);
                console.error($gameVariables.value(1) + ' floor:' + floor + ' level' + level);
            }
            var dice = Math.randomInt(candidates.length);
            var enemies = candidates[dice];
            for (var _a = 0, enemies_1 = enemies; _a < enemies_1.length; _a++) {
                var enemyId = enemies_1[_a];
                var enemy = $dataEnemies[enemyId];
                var pos = room.randomPlace(enemy.meta['object']);
                this.arrangeEnemyEventOne(pos, enemyId);
            }
            level++;
            /*let roomEnemyCount = room.initialEnemyCount() + enemyCount;
            for (let i = 0; i < roomEnemyCount; i++) {
                const pos = room.randomPlace();
                this.arrangeEnemyEventOne(pos);
            }*/
        }
        /*const min = this._map.minTreasureCount();
        const max = this._map.maxTreasureCount();
        const count = Math.randomInt(max - min) + min;
        if (isNaN(count)) {
            console.error('箱の数が不正です');
        }
        for (let i = 0; i < count; i++) {
            this.arrangeTreasureEvent();
        }*/
    };
    EnemyEventPlacer.prototype.arrangeEnemyEvent = function () {
        var place = this.selectRandomPlace(this._enemyPlaceEvents);
        if (!place) {
            console.error('これ以上敵を配置できません');
            return;
        }
        var classEvent = this.selectRandomEnemy();
        var clone = JsonEx.makeDeepCopy(classEvent);
        clone.x = place.x;
        clone.y = place.y;
        clone.id = place.id;
        this._generatedEvents.push(clone);
    };
    EnemyEventPlacer.prototype.arrangeEnemyEventOne = function (place, enemyId) {
        var classEvent = this.selectRandomEnemy();
        var clone = JsonEx.makeDeepCopy(classEvent);
        clone.x = place.x;
        clone.y = place.y;
        clone.id = place.x * 1000 + place.y;
        if (enemyId) {
            clone.meta['enemy'] = enemyId;
        }
        this._generatedEvents.push(clone);
    };
    EnemyEventPlacer.prototype.selectRandomEnemy = function () {
        if (this._enemyEvents.length === 0) {
            console.error('敵が配置されていません');
        }
        var index = Math.randomInt(this._enemyEvents.length);
        return this._enemyEvents[index];
    };
    EnemyEventPlacer.prototype.arrangeTreasureEvent = function () {
        var place = this.selectRandomPlace(this._treasurePlaceEvents);
        if (!place) {
            console.error('これ以上箱を配置できません');
            return;
        }
        var item = Nore.EventArranger.createRandomItem();
        Nore.EventArranger.putItem(item, place.x, place.y);
    };
    EnemyEventPlacer.prototype.selectRandomPlace = function (list) {
        if (!$gameMap.isFixedFloor()) {
            return this.selectRandomRoomAndPlace();
        }
        if (list.length == 0) {
            return null;
        }
        var index = Math.randomInt(list.length);
        var result = list[index];
        list.splice(index, 1);
        return result;
    };
    EnemyEventPlacer.prototype.selectRandomRoomAndPlace = function () {
        var rooms = [];
        for (var key in this._roomPosMap) {
            rooms.push(this._roomPosMap[key]);
        }
        var index = Math.randomInt(rooms.length);
        var list = rooms[index];
        var index2 = Math.randomInt(list.length);
        var result = list[index2];
        list.splice(index2, 1);
        return result;
    };
    EnemyEventPlacer.prototype.arrangeStair = function () {
        if (!this._stairEvent) {
            return;
        }
        var room = this.selectTopRoom();
        this._topRoom = room;
        var point = room.randomPlace();
        this._stairEvent.x = point.x;
        this._stairEvent.y = point.y;
        this._stairEvent.id = 1234;
        //this._generatedEvents.push(this._stairEvent);
    };
    EnemyEventPlacer.prototype.arrangeDoors = function () {
        if (!this._doorEvent) {
            return;
        }
        for (var _i = 0, _a = $gameMap.getRoomList(); _i < _a.length; _i++) {
            var room = _a[_i];
            for (var _b = 0, _c = room.exitList(); _b < _c.length; _b++) {
                var exit = _c[_b];
                var clone_1 = JsonEx.makeDeepCopy(this._doorEvent);
                clone_1.x = exit.x;
                clone_1.y = exit.y;
                this._generatedEvents.push(clone_1);
            }
            if (room == $gamePlayer.room) {
                continue;
            }
            if (room == this._topRoom) {
                continue;
            }
            var clone = JsonEx.makeDeepCopy(this._treasurEvent);
            clone.x = room.x - 2;
            clone.y = room.y - 2;
            this._generatedEvents.push(clone);
        }
        this._generatedEvents.push(this._stairEvent);
    };
    EnemyEventPlacer.prototype.selectRandomRoom = function () {
        var rooms = $gameMap.getRoomList();
        return rooms[Math.randomInt(rooms.length)];
    };
    EnemyEventPlacer.prototype.selectEnemyRooms = function () {
        var enemyRooms = [];
        var rooms = $gameMap.getRoomList();
        for (var _i = 0, rooms_2 = rooms; _i < rooms_2.length; _i++) {
            var room = rooms_2[_i];
            if (room == $gamePlayer.room) {
                continue;
            }
            if (room == this._topRoom) {
                continue;
            }
            enemyRooms.push(room);
        }
        enemyRooms = enemyRooms.sort(function (a, b) {
            return b.y - a.y;
        });
        return enemyRooms;
    };
    EnemyEventPlacer.prototype.selectBottomRoom = function () {
        var bottom = null;
        var rooms = $gameMap.getRoomList();
        for (var _i = 0, rooms_3 = rooms; _i < rooms_3.length; _i++) {
            var room = rooms_3[_i];
            if (!bottom) {
                bottom = room;
                continue;
            }
            if (bottom.y < room.y) {
                bottom = room;
            }
        }
        return bottom;
    };
    EnemyEventPlacer.prototype.selectTopRoom = function () {
        var top = null;
        var rooms = $gameMap.getRoomList();
        for (var _i = 0, rooms_4 = rooms; _i < rooms_4.length; _i++) {
            var room = rooms_4[_i];
            if (!top) {
                top = room;
                continue;
            }
            if (top.y > room.y) {
                top = room;
            }
        }
        return top;
    };
    EnemyEventPlacer.prototype.arrangePlayer = function () {
        var room = this.selectBottomRoom();
        var point = room.randomPlace();
        $gamePlayer.locate(point.x, point.y);
        //$gamePlayer.reserveTransfer($gameMap.mapId(), point.x, point.y);
        $gamePlayer.room = $gameMap.getRoom(point.x, point.y);
        //$gameMap._interpreter.setWaitMode('transfer')
        /*for (var i = 0; i < 3; i++) {
            const point2 = room.randomPlace();
            const item = Nore.EventArranger.createRandomItem();
            Nore.EventArranger.putItem(item, point2.x, point2.y);
        }*/
    };
    return EnemyEventPlacer;
}());
var FixedEnemyEventPlacer = /** @class */ (function () {
    function FixedEnemyEventPlacer(_map, _eventList) {
        this._map = _map;
        this._eventList = _eventList;
        this._enemyEvents = [];
        this._normalEvents = [];
        this._generatedEvents = [];
        this.sortingEvent();
        //this.arrangePlayer();
        //this.createRoomPosMap();
        //this.arrangeStair();
        //this.arrangeDoors();
        this.arrangeEnemyEvent();
    }
    FixedEnemyEventPlacer.prototype.sortingEvent = function () {
        for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
            var event_4 = _a[_i];
            if (event_4.meta['enemy']) {
                this._enemyEvents.push(event_4);
            }
            if (event_4.meta['door']) {
                this._normalEvents.push(event_4);
            }
            if (event_4.meta['event']) {
                this._normalEvents.push(event_4);
            }
            if (event_4.meta['stair']) {
                this._normalEvents.push(event_4);
            }
            if (event_4.meta['treasure']) {
                this._normalEvents.push(event_4);
            }
        }
        if (!$gameMap.isFixedFloor()) {
        }
        if (this._enemyEvents.length == 0) {
            console.error('敵イベントが存在しません');
        }
    };
    FixedEnemyEventPlacer.prototype.arrangeEnemyEvent = function () {
        for (var _i = 0, _a = this._enemyEvents; _i < _a.length; _i++) {
            var event_5 = _a[_i];
            var clone = JsonEx.makeDeepCopy(event_5);
            this._generatedEvents.push(clone);
        }
    };
    FixedEnemyEventPlacer.prototype.getAllEvents = function () {
        var id = INITIAL_EVENT_ID;
        var result = [];
        for (var _i = 0, _a = this._generatedEvents; _i < _a.length; _i++) {
            var e_6 = _a[_i];
            var gameEvent = new Game_EnemyEvent(this._map.mapId(), id, e_6);
            gameEvent.refresh();
            result.push(gameEvent);
            id++;
        }
        for (var _b = 0, _c = this._normalEvents; _b < _c.length; _b++) {
            var event_6 = _c[_b];
            var gameEvent = new Game_Event(this._map.mapId(), event_6.id);
            result.push(gameEvent);
        }
        return result;
    };
    return FixedEnemyEventPlacer;
}());
