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
    var Scene_Quest = /** @class */ (function (_super) {
        __extends(Scene_Quest, _super);
        function Scene_Quest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Quest.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createWindowLayer();
            this.createQuestWindow();
            this.createRankWindow();
        };
        Scene_Quest.prototype.createQuestWindow = function () {
            this._window = new Window_Quest();
            this.addWindow(this._window);
            this._window.select(0);
            this._window.activate();
            this._window.setHandler('ok', this.itemOk.bind(this));
            this._window.setHandler('cancel', this.popScene.bind(this));
            this._window.setHandler('change', this.onChange.bind(this));
            this._windowDetail = new Window_QuestDetail();
            this.addWindow(this._windowDetail);
            this.onChange();
        };
        Scene_Quest.prototype.createRankWindow = function () {
            this._rankWindow = new Window_GuildRank(new Rectangle(272, 80, 426, 70));
            this.addWindow(this._rankWindow);
        };
        Scene_Quest.prototype.itemOk = function () {
            var item = this._window.item();
            $gameTemp.setNextScenario('ギルドのマスター_受注_' + item.id);
            $gameVariables.setValue(Nore.TEMP_VAR1, item.id);
            this.popScene();
        };
        Scene_Quest.prototype.onChange = function () {
            var item = this._window.item();
            this._windowDetail.showQuest(item);
        };
        return Scene_Quest;
    }(Scene_MenuBase));
    Nore.Scene_Quest = Scene_Quest;
    var Window_Quest = /** @class */ (function (_super) {
        __extends(Window_Quest, _super);
        function Window_Quest() {
            var _this = _super.call(this, new Rectangle(100, 150, 620, 510)) || this;
            _this._data = [];
            _this.initQuest();
            _this.refresh();
            _this.initMask();
            return _this;
        }
        Window_Quest.prototype.initMask = function () {
            var myMask = new PIXI.Graphics();
            myMask.beginFill(999, 1);
            var m = this.margin + 1;
            myMask.drawRect(0, this.y + this.margin + 6, 300, 490);
            myMask.endFill();
            this._windowContentsSprite.mask = myMask;
        };
        Window_Quest.prototype.update = function () {
            _super.prototype.update.call(this);
            this._windowContentsSprite.y = -this.scrollY() + this.scrollBaseY();
        };
        Window_Quest.prototype.initQuest = function () {
            for (var _i = 0, $dataItems_1 = $dataItems; _i < $dataItems_1.length; _i++) {
                var a = $dataItems_1[_i];
                if (a && a.meta['quest']) {
                    var before = parseInt(a.meta['before']);
                    if (isNaN(before)) {
                        this._data.push(a);
                    }
                    else {
                        if ($gameSystem.questManager().isClear(before)) {
                            this._data.push(a);
                        }
                    }
                }
            }
            this._data = this._data.sort(function (a, b) {
                var ra = parseInt(a.meta['rank']);
                var rb = parseInt(b.meta['rank']);
                if (ra != rb) {
                    return ra - rb;
                }
                return a.id - b.id;
            });
        };
        Window_Quest.prototype.maxItems = function () {
            return this._data ? this._data.length : 1;
        };
        Window_Quest.prototype.item = function () {
            return this.itemAt(this.index());
        };
        Window_Quest.prototype.itemAt = function (index) {
            return this._data && index >= 0 ? this._data[index] : null;
        };
        Window_Quest.prototype.refresh = function () {
            this._windowContentsSprite.removeChildren();
            _super.prototype.refresh.call(this);
        };
        Window_Quest.prototype.drawAllItems = function () {
            this._windowContentsSprite.removeChildren();
            _super.prototype.drawAllItems.call(this);
        };
        Window_Quest.prototype.drawItem = function (index) {
            var item = this.itemAt(index);
            this.contents.fontSize = 16;
            if (item) {
                var rect = this.itemLineRect(index);
                if ($gameSystem.questManager().isReceive(item.id)) {
                    this.changePaintOpacity(false);
                    this.drawLabel(4, rect.x + 10, rect.y + 7);
                }
                else if ($gameSystem.questManager().isClear(item.id)) {
                    this.changePaintOpacity(false);
                    this.drawLabel(5, rect.x + 10, rect.y + 7);
                }
                else if (!$gameSystem.questManager().canReveive(item.id)) {
                    this.drawLabel(6, rect.x + 10, rect.y + 7);
                }
                else {
                    this.changePaintOpacity(true);
                }
                //this.drawIcon(20, rect.x, rect.y);
                this.drawItemName(item, rect.x + 100, rect.y, rect.width);
                this.drawItemRank(item, rect.x + 440, rect.y);
                this.changePaintOpacity(true);
            }
        };
        Window_Quest.prototype.drawItemRank = function (item, x, y) {
            var rank = '';
            for (var i = 0; i < parseInt(item.meta['rank']); i++) {
                rank += '★';
            }
            this.drawText(rank, x, y, 200, 'left');
        };
        Window_Quest.prototype.isEnabled = function (item) {
            var questManager = $gameSystem.questManager();
            return !questManager.isReceive(item.id) && !questManager.isClear(item.id);
        };
        Window_Quest.prototype.isCurrentItemEnabled = function () {
            return this.isEnabled(this.item());
        };
        return Window_Quest;
    }(Window_Selectable));
    var Window_GuildRank = /** @class */ (function (_super) {
        __extends(Window_GuildRank, _super);
        function Window_GuildRank() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_GuildRank.prototype.initialize = function (rect) {
            _super.prototype.initialize.call(this, rect);
            this.refresh();
        };
        Window_GuildRank.prototype.refresh = function () {
            var rect = this.itemLineRect(0);
            var x = rect.x;
            var y = rect.y;
            var width = rect.width;
            this.contents.clear();
            var rank = $gameParty.guildRank();
            this.drawCurrentRank(rank, x, y, width);
        };
        Window_GuildRank.prototype.drawCurrentRank = function (value, x, y, width) {
            this.resetTextColor();
            var rank = 'Adventurer Rank ';
            for (var i = 0; i < value; i++) {
                rank += '★';
            }
            this.drawText(rank, x, y, width, "left");
        };
        ;
        return Window_GuildRank;
    }(Window_Selectable));
    var Window_QuestDetail = /** @class */ (function (_super) {
        __extends(Window_QuestDetail, _super);
        function Window_QuestDetail() {
            var _this = _super.call(this, new Rectangle(740, 90, 500, 560)) || this;
            _this._data = [];
            return _this;
        }
        Window_QuestDetail.prototype.showQuest = function (quest) {
            this.contents.clear();
            this.drawHeader(quest);
            this.drawDescription(quest, 160);
            this.drawEnemy(quest, 330);
        };
        Window_QuestDetail.prototype.drawHeader = function (quest) {
            this.contents.fontSize = 34;
            this.drawText(quest.name, 10, 10, 450, 'left');
            this.contents.fontSize = 24;
            var y = 80;
            this.drawText('報酬', 20, y, 450, 'left');
            this.drawText(quest.meta['reward'] + 'Ｇ', 10, y, 420, 'right');
            y += 30;
            var rank = '';
            for (var i = 0; i < parseInt(quest.meta['rank']); i++) {
                rank += '★';
            }
            this.drawText('必要な冒険者ランク', 20, y, 200, 'left');
            this.drawText(rank, 10, y, 420, 'right');
        };
        Window_QuestDetail.prototype.drawDescription = function (quest, y) {
            var params = QUEST_MAP[quest.id];
            if (!params) {
                return;
            }
            this.drawTextEx(params.desc1, 30, y + 0 * 30, 450);
            this.drawTextEx(params.desc2, 30, y + 1 * 30, 450);
            this.drawTextEx(params.desc3, 30, y + 2 * 30, 450);
        };
        Window_QuestDetail.prototype.drawEnemy = function (quest, y) {
            var params = QUEST_MAP[quest.id];
            if (!params) {
                return;
            }
            var enemy = $dataEnemies[parseInt(quest.meta['boss'])];
            if (!enemy) {
                return;
            }
            this.contents.fontSize = 24;
            this.drawText('★敵情報', 10, y, 450, 'left');
            this.contents.fontSize = 28;
            this.drawText(enemy.name, 20, y + 32, 450, 'left');
            y += 70;
            this.contents.fontSize = 23;
            this.drawTextEx(params.boss1 || '', 30, y + 0 * 30, 450);
            this.drawTextEx(params.boss2 || '', 30, y + 1 * 30, 450);
            this.drawTextEx(params.boss3 || '', 30, y + 2 * 30, 450);
        };
        Window_QuestDetail.prototype.resetFontSettings = function () {
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = 22;
            this.resetTextColor();
        };
        return Window_QuestDetail;
    }(Window_Base));
    function receiveQuest() {
        var id = $gameVariables.value(Nore.TEMP_VAR1);
        $gameSystem.questManager().receive(id);
        var item = $dataItems[id];
        var receiveId = parseInt(item.meta['receiveId']);
        if (isNaN(receiveId)) {
            $gameTemp.setNextScenario('ギルドのマスター_受注後_' + id);
        }
        else {
            $gameTemp.setNextScenario('ギルドのマスター_受注後_' + receiveId);
        }
    }
    Nore.receiveQuest = receiveQuest;
    function canReceiveQuest() {
        var id = $gameVariables.value(Nore.TEMP_VAR1);
        if (!$gameSystem.questManager().canReveive(id)) {
            return false;
        }
        return true;
    }
    Nore.canReceiveQuest = canReceiveQuest;
})(Nore || (Nore = {}));
var QuestManager = /** @class */ (function () {
    function QuestManager() {
        this._questList = [];
        this._clearList = [];
        this._rewardList = [];
    }
    QuestManager.prototype.receive = function (id) {
        this._questList.push(new Quest(id));
    };
    QuestManager.prototype.isReceive = function (id) {
        for (var _i = 0, _a = this._questList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (!q) {
                continue;
            }
            if (q.id() == id) {
                return true;
            }
        }
        return false;
    };
    QuestManager.prototype.isReceiveOrClear = function (id) {
        if (this.isReceive(id)) {
            return true;
        }
        if (this.isReward(id)) {
            return true;
        }
        if (this.isClear(id)) {
            return true;
        }
        return false;
    };
    QuestManager.prototype.isReward = function (id) {
        for (var _i = 0, _a = this._rewardList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (!q) {
                continue;
            }
            if (q.id() == id) {
                return true;
            }
        }
        return false;
    };
    QuestManager.prototype.canReveive = function (id) {
        var rank = $gameParty.guildRank();
        return new Quest(id).rank() <= rank;
    };
    QuestManager.prototype.clearList = function () {
        return this._clearList;
    };
    QuestManager.prototype.list = function () {
        return this._questList;
    };
    QuestManager.prototype.placeList = function () {
        var list = this._clearList.concat(this._questList);
        var result = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var q = list_1[_i];
            if (!q) {
                continue;
            }
            if (this._clearList.contains(q)) {
                var sw2 = parseInt(q.item().meta['sw2']);
                if (!isNaN(sw2)) {
                    if (!$gameSwitches.value(sw2)) {
                        continue;
                    }
                }
            }
            if (q.id() == 503) {
                if ($gameSwitches.value(22)) {
                    continue;
                }
            }
            result.push(q);
        }
        return result;
    };
    QuestManager.prototype.isClear = function (id) {
        for (var _i = 0, _a = this._clearList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (!q) {
                continue;
            }
            if (q.id() == id) {
                return true;
            }
        }
        return false;
    };
    QuestManager.prototype.clear = function (id) {
        var q = this.findQuest(id);
        if (!q) {
            return false;
        }
        var index = this._questList.indexOf(q);
        this._questList.splice(index, 1);
        this._clearList.push(q);
        $gameSwitches.setValue(38, true);
        if (q.isMain()) {
            $gameSwitches.setValue(89, true);
        }
        return true;
    };
    QuestManager.prototype.findQuest = function (id) {
        for (var i = 0; i < this._questList.length; i++) {
            var q = this._questList[i];
            if (q.id() == id) {
                return q;
            }
        }
        return null;
    };
    QuestManager.prototype.canGetReward = function () {
        return this._clearList.length > this._rewardList.length;
    };
    QuestManager.prototype.checkReviveQuest = function () {
        var list = this._clearList;
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var q = list_2[_i];
            if (!q) {
                continue;
            }
            var sw1 = parseInt(q.item().meta['sw1']);
            if (isNaN(sw1)) {
                continue;
            }
            $gameSwitches.setValue(sw1, true);
        }
    };
    QuestManager.prototype.nextReviveQuest = function () {
        var list = this._clearList;
        for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
            var q = list_3[_i];
            if (!q) {
                continue;
            }
            var sw1 = parseInt(q.item().meta['sw1']);
            if (isNaN(sw1)) {
                continue;
            }
            if (!$gameSwitches.value(sw1)) {
                continue;
            }
            var sw2 = parseInt(q.item().meta['sw2']);
            if ($gameSwitches.value(sw2)) {
                continue;
            }
            $gameSwitches.setValue(sw2, true);
            return q;
        }
        return null;
    };
    QuestManager.prototype.gainReward = function () {
        var q = this.nextReward();
        if (!q) {
            return;
        }
        this._rewardList.push(q);
        $gameTemp.lastRewardQuest = q;
        $gameParty.gainGold(q.gold());
        $gameParty.earnQuestReward(q.gold());
        $gameMedals.onQuest();
        $gameSwitches.setValue(20, true);
        $gameVariables.setValue(20, q.gold());
        $gameVariables.setValue(98, q.item().name);
        $gameVariables.setValue(97, q.item().id);
    };
    QuestManager.prototype.nextReward = function () {
        for (var _i = 0, _a = this._clearList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (!q) {
                continue;
            }
            if (!this.isGetReward(q)) {
                return q;
            }
        }
        return null;
    };
    QuestManager.prototype.isGetReward = function (argQ) {
        for (var _i = 0, _a = this._rewardList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (!q) {
                continue;
            }
            if (q.id() == argQ.id()) {
                return true;
            }
        }
        return false;
    };
    QuestManager.prototype.onEnemy = function (enemyId) {
        var clearList = [];
        for (var _i = 0, _a = this._questList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (!q) {
                continue;
            }
            q.onEnemy(enemyId);
            if (q.isClear()) {
                clearList.push(q);
            }
        }
        for (var _b = 0, clearList_1 = clearList; _b < clearList_1.length; _b++) {
            var q = clearList_1[_b];
            this.clear(q.id());
        }
    };
    QuestManager.prototype.onMagic = function (itemId) {
        var clearList = [];
        for (var _i = 0, _a = this._questList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (!q) {
                continue;
            }
            q.onMagic(itemId);
            if (q.isClear()) {
                clearList.push(q);
            }
        }
        for (var _b = 0, clearList_2 = clearList; _b < clearList_2.length; _b++) {
            var q = clearList_2[_b];
            this.clear(q.id());
        }
    };
    QuestManager.prototype.onIdentify = function () {
        var clearList = [];
        for (var _i = 0, _a = this._questList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (!q) {
                continue;
            }
            q.onIdentify();
            if (q.isClear()) {
                clearList.push(q);
            }
        }
        for (var _b = 0, clearList_3 = clearList; _b < clearList_3.length; _b++) {
            var q = clearList_3[_b];
            this.clear(q.id());
        }
    };
    QuestManager.prototype.canReceiveMainQuest = function () {
        var list = [];
        for (var _i = 0, $dataItems_2 = $dataItems; _i < $dataItems_2.length; _i++) {
            var a = $dataItems_2[_i];
            if (a && a.meta['quest']) {
                var before = parseInt(a.meta['before']);
                if (isNaN(before)) {
                    list.push(a);
                }
                else {
                    if ($gameSystem.questManager().isClear(before)) {
                        list.push(a);
                    }
                }
            }
        }
        for (var _a = 0, list_4 = list; _a < list_4.length; _a++) {
            var q = list_4[_a];
            var id = q.id;
            if (!q.meta['main']) {
                continue;
            }
            if (this.isClear(id)) {
                continue;
            }
            if (this.isReceive(id)) {
                continue;
            }
            if (!this.canReveive(id)) {
                continue;
            }
            return true;
        }
        return false;
    };
    return QuestManager;
}());
var Quest = /** @class */ (function () {
    function Quest(_id) {
        this._id = _id;
        this._progress = 0;
        var border = parseInt(this.item().meta['border']);
        if (!isNaN(border)) {
            this._border = border;
        }
    }
    Quest.prototype.id = function () {
        return this._id;
    };
    Quest.prototype.item = function () {
        return $dataItems[this._id];
    };
    Quest.prototype.placeItem = function () {
        var item = this.item();
        if (item && item.meta['place']) {
            var id = parseInt(item.meta['place']);
            return $dataItems[id];
        }
        return null;
    };
    Quest.prototype.rank = function () {
        var item = this.item();
        return parseInt(item.meta['rank']);
    };
    Quest.prototype.gold = function () {
        var item = this.item();
        return parseInt(item.meta['reward']);
    };
    Quest.prototype.onEnemy = function (enemyId) {
        if (this.item().meta['enemy']) {
            var type = this.item().meta['enemy'];
            var e_1 = $dataEnemies[enemyId];
            p(e_1.meta['type'] + ' ' + type);
            if (e_1.meta['type'] == type) {
                this._progress++;
            }
        }
    };
    Quest.prototype.onMagic = function (itemId) {
        if (this.item().meta['magic']) {
            this._progress++;
        }
    };
    Quest.prototype.onIdentify = function () {
        if (this.item().meta['identify']) {
            this._progress++;
        }
    };
    Quest.prototype.isClear = function () {
        return this._progress >= this._border;
    };
    Quest.prototype.isMain = function () {
        return this.item().meta['main'];
    };
    return Quest;
}());
