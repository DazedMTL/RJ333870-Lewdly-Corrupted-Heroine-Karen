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
 *
 *
 * @command PlusNakadashi
 * @text 中出し回数増加
 * @des 中出し回数増加
 * @arg value
 * @type number
 * @text 回数
 * @desc 回数
 * @arg enemyId
 * @type number
 * @text エネミーID
 * @desc エネミーID
 *
 * @command PlusIku
 * @text アクメ回数増加
 * @des アクメ回数増加
 * @arg value
 * @type number
 * @text 回数
 * @desc 回数
 *
 * @command PlusGokkun
 * @text 飲んだ精液増加
 * @des 飲んだ精液増加
 * @arg value
 * @type number
 * @text cc
 * @desc cc
 *
 * @command PlusKiss
 * @text キス増加
 * @des キス増加
 * @arg value
 * @type number
 * @text 回数
 * @desc 回数
 *
 * @command PlusFela
 * @text フェラ増加
 * @des フェラ増加
 * @arg value
 * @type number
 * @text 回数
 * @desc 回数
 * @arg enemyId
 * @type number
 * @text エネミーID
 * @desc エネミーID
 *
 * @command plusCount
 * @text 回数増加
 * @des 回数増加
 * @arg enemyId
 * @type number
 * @text エネミー
 * @desc エネミー
 * @arg fela
 * @type number
 * @default 0
 * @text フェラ
 * @desc フェラ
 * @default 0
 * @arg anal
 * @type number
 * @default 0
 * @text アナル
 * @desc アナル
 * @default 0
 * @arg seiekiNaka
 * @type number
 * @text 中出しされた回数
 * @desc 中出しされた回数
 * @default 0
 * @arg kiss
 * @type number
 * @text キス
 * @desc キス
 * @default 0
 * @arg bukkake
 * @type number
 * @text ぶっかけ
 * @desc ぶっかけ
 * @default 0
 * @arg plusAcme
 * @type boolean
 * @default false
 * @text アクメ回数を自動で増やす
 * @desc アクメ回数を自動で増やす
 * @arg random
 * @type boolean
 * @default false
 * @text ランダムで回数増減
 * @desc ランダムで回数増減
 *
 * @command plusSyusan
 * @text 出産回数増加
 * @des 出産回数増加
 * @arg enemyId
 * @type number
 * @text エネミー
 * @desc エネミー
 * @arg count
 * @type number
 * @text 回数
 * @desc 回数
 *
 * @command plusSyusanAuto
 * @text 出産回数増加自動
 * @des 出産回数増加自動
 *
 * @command addArmor
 * @text 防具追加
 * @des 防具追加
 * @arg armorId
 * @type number
 * @text 防具ID
 * @desc 防具ID
 * @arg partsId
 * @type number
 * @text パーツID
 * @desc パーツID
 *
 * @command addBaisyun
 * @text 買春回数増加
 * @des 買春回数増加
 * @arg count
 * @type number
 *
 *
 * @command plusRandomNakadashi
 * @text ランダムに中出し追加
 * @des ランダムに中出し追加
 * @arg count
 * @type number
 * @text 回数
 * @desc 回数
 * @arg enemy1
 * @type number
 * @text エネミーID
 * @desc エネミーID
 * @arg enemy2
 * @type number
 * @text エネミーID
 * @desc エネミーID
 * @arg enemy3
 * @type number
 * @text エネミーID
 * @desc エネミーID
 * @arg enemy4
 * @type number
 * @text エネミーID
 * @desc エネミーID
 * @arg enemy5
 * @type number
 * @text エネミーID
 * @desc エネミーID
 * @arg enemy6
 * @type number
 * @text エネミーID
 * @desc エネミーID
 */
var Nore;
(function (Nore) {
    var pluginName = 'Nore_RogueResult';
    PluginManager.registerCommand(pluginName, 'PlusNakadashi', function (args) {
        var enemyId = parseInt(args.enemyId);
        $gameSystem.info().plusNakadashi(parseInt(args.value), enemyId);
    });
    PluginManager.registerCommand(pluginName, 'PlusIku', function (args) {
        $gameSystem.info().plusIku(parseInt(args.value));
    });
    PluginManager.registerCommand(pluginName, 'PlusGokkun', function (args) {
        $gameSystem.info().plusKounai(parseInt(args.value));
    });
    PluginManager.registerCommand(pluginName, 'PlusKiss', function (args) {
        $gameSystem.info().plusKiss(parseInt(args.value));
    });
    PluginManager.registerCommand(pluginName, 'PlusFela', function (args) {
        var enemyId = parseInt(args.enemyId);
        $gameSystem.info().plusFela(parseInt(args.value), enemyId);
    });
    PluginManager.registerCommand(pluginName, 'plusSyusanAuto', function (args) {
        var taneoyaId = $gameActors.mainActor().sikyu().taneoyaId;
        $gameSystem.info().plusSyusan(Math.floor(taneoyaId), 1);
        var enemy = $dataEnemies[taneoyaId];
        if (!enemy) {
            console.error(taneoyaId);
        }
        if (enemy.meta['nakaType'] == 'monster') {
            $gameSystem.getEro(1).syusanMonster++;
        }
        else {
            $gameSystem.getEro(1).syusanHuman++;
        }
    });
    PluginManager.registerCommand(pluginName, 'addBaisyun', function (args) {
        $gameSystem.info().plusBaisyun(parseInt(args.value));
        $gameSystem.getEro(1).baisyun += parseInt(args.value);
    });
    PluginManager.registerCommand(pluginName, 'plusRandomNakadashi', function (args) {
        var count = parseInt(args.count);
        var enemyId1 = parseInt(args.enemy1);
        var enemyId2 = parseInt(args.enemy2);
        var enemyId3 = parseInt(args.enemy3);
        var enemyId4 = parseInt(args.enemy4);
        var enemyId5 = parseInt(args.enemy5);
        var enemyId6 = parseInt(args.enemy6);
        var enemyList = [];
        if (enemyId1) {
            enemyList.push(enemyId1);
        }
        if (enemyId2) {
            enemyList.push(enemyId2);
        }
        if (enemyId3) {
            enemyList.push(enemyId3);
        }
        if (enemyId4) {
            enemyList.push(enemyId4);
        }
        if (enemyId5) {
            enemyList.push(enemyId5);
        }
        if (enemyId6) {
            enemyList.push(enemyId6);
        }
        enemyList = Nore.shuffle(enemyList);
        var info = $gameSystem.info();
        for (var i = 0; i < count; i++) {
            var enemyId = enemyList[i];
            var seiekiNaka = (Math.randomInt(4) + 2);
            var plusAcme = Math.floor(acmeRate() * seiekiNaka);
            info.plusIku(plusAcme);
            info.plusNakadashi(seiekiNaka, enemyId);
        }
    });
    PluginManager.registerCommand(pluginName, 'addArmor', function (args) {
        var armorId = parseInt(args.armorId);
        var partsId = parseInt(args.partsId);
        if ($gameSystem.info()) {
            $gameSystem.info().addArmor(armorId);
        }
        else {
            //console.error('$gameSystem.info() が存在しません');
        }
        if (partsId > 0) {
            $gameSystem.addAcce(partsId);
        }
        if (armorId >= 900) {
            $gameSwitches.setValue(armorId - 100, true);
        }
        AudioManager.playSe({ name: 'Chime2', volume: 90, pitch: 100, pan: 0 });
        var armor = $dataArmors[armorId];
        $gameParty.gainItem(armor, 1);
        if (partsId) {
            $gameMessage.add('\\C[2]' + armor.name + '\\C[0] をつけられてしまった！');
            $gameParty.gainItem($dataArmors[partsId], 1);
        }
        else {
            $gameMessage.add('\\C[6]' + armor.name + '\\C[0] の性癖を獲得した！');
        }
    });
    PluginManager.registerCommand(pluginName, 'plusCount', function (args) {
        var seiekiNaka = parseInt(args.seiekiNaka);
        var anal = parseInt(args.anal);
        var bukkake = parseInt(args.bukkake);
        var enemyId = parseInt(args.enemyId);
        var fela = parseInt(args.fela);
        var kiss = parseInt(args.kiss);
        var acme = args.plusAcme == 'true';
        var random = args.random == 'true';
        if (random) {
            seiekiNaka = Math.round(seiekiNaka * (80 + Math.randomInt(40) / 100));
        }
        var info = $gameSystem.info();
        if (enemyId) {
            info.plusNakadashi(seiekiNaka, enemyId);
            info.plusFela(fela, enemyId);
        }
        info.plusBukkake(bukkake);
        info.plusKiss(kiss);
        info.plusAnal(anal);
        if (acme) {
            var plusAcme = Math.floor(acmeRate() * seiekiNaka);
            info.plusIku(plusAcme);
        }
    });
    PluginManager.registerCommand(pluginName, 'plusSyusan', function (args) {
        var count = parseInt(args.count);
        var enemyId = parseInt(args.enemyId);
        var info = $gameSystem.info();
        info.plusSyusan(enemyId, count);
    });
    function acmeRate() {
        var ero = $gameSystem.getEro(1);
        var chitsuRank = calcKaihatsuRank(ero.chitsuStatus);
        switch (chitsuRank) {
            case 'G': return 0.2;
            case 'F': return 0.4;
            case 'E': return 0.9;
            case 'D': return 1.1;
            case 'C': return 1.4;
            case 'B': return 2.4;
            case 'A': return 4.6;
        }
    }
    var _Scene_Message_prototype_update = Scene_Message.prototype.update;
    Scene_Message.prototype.update = function () {
        _Scene_Message_prototype_update.call(this);
    };
    var Scene_Talk = /** @class */ (function (_super) {
        __extends(Scene_Talk, _super);
        function Scene_Talk() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Talk.prototype.playScenario = function (id) {
            this._lastScenario = id;
            this._interpreter = new Game_Interpreter;
            this._interpreter._list = [];
            this._interpreter._list.push({ 'code': 357, 'indent': 0, 'parameters': ['Nore_Tes', 'Run', null, { 'id': id }] });
            this._interpreter._list.push({ code: 0, indent: 0, parameters: [] });
        };
        Scene_Talk.prototype.update = function () {
            _super.prototype.update.call(this);
            this.updateInterpreter();
        };
        Scene_Talk.prototype.updateInterpreter = function () {
            if (!this._interpreter) {
                return;
            }
            this._interpreter.update();
            if (!this._interpreter.isRunning()) {
                this._interpreter = null;
                this.finishScenario();
            }
        };
        Scene_Talk.prototype.finishScenario = function () {
        };
        Scene_Talk.prototype.isInterpreterRunning = function () {
            if (!this._interpreter) {
                return false;
            }
            return this._interpreter.isRunning();
        };
        return Scene_Talk;
    }(Scene_Message));
    Nore.Scene_Talk = Scene_Talk;
    var Scene_Result = /** @class */ (function (_super) {
        __extends(Scene_Result, _super);
        function Scene_Result() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._wait = 60;
            return _this;
        }
        Scene_Result.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createWindowLayer();
            this.createResultWindow();
            this.createAllWindows();
            this.createFadeSprite();
            $gameScreen._brightness = 0;
            $gameScreen.startFadeIn(40);
            this._fadeSprite.opacity = 255 - $gameScreen.brightness();
            this.initScenario();
        };
        Scene_Result.prototype.initScenario = function () {
            if ($gameVariables.value(17)) {
                var id = $gameVariables.value(17);
                $gameVariables.setValue(17, 0);
                this.playScenario(id);
            }
        };
        Scene_Result.prototype.createFadeSprite = function () {
            this._fadeSprite = new ScreenSprite();
            this.addChild(this._fadeSprite);
        };
        Scene_Result.prototype.createResultWindow = function () {
            this._window = new Window_Result();
            this.addWindow(this._window);
            this._window.activate();
            this._window.setup($gameSystem.lastDungeonResult());
        };
        Scene_Result.prototype.update = function () {
            _super.prototype.update.call(this);
            $gameScreen.update();
            this._fadeSprite.opacity = 255 - $gameScreen.brightness();
            if (this._wait > 0) {
                this._wait--;
            }
            if (this._wait > 0) {
                return;
            }
            if ($gameScreen.brightness() <= 0) {
                // リザルト画像を設定しないとき
                SceneManager.pop();
                $gameActors.mainActor().setCacheChanged();
                $gameScreen._brightness = 0;
            }
            if (this.isInterpreterRunning()) {
                return;
            }
            if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
                $gameScreen.startFadeOut(40);
            }
        };
        return Scene_Result;
    }(Scene_Talk));
    Nore.Scene_Result = Scene_Result;
    var Scene_History = /** @class */ (function (_super) {
        __extends(Scene_History, _super);
        function Scene_History() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_History.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createWindowLayer();
            this.createResultWindow();
            this.createAllWindows();
            this.createCommandWindow();
            $gameVariables.setValue(18, 0);
        };
        Scene_History.prototype.createResultWindow = function () {
            this._window = new Window_Result();
            this._window.x += 180;
            this.addWindow(this._window);
            this._window.activate();
        };
        Scene_History.prototype.createCommandWindow = function () {
            this._commandWndow = new Window_HistoryCommand();
            this.addWindow(this._commandWndow);
            this._commandWndow.setHandler('change', this.onChange.bind(this));
            this._commandWndow.setHandler('cancel', this.onCancel.bind(this));
            this._commandWndow.setHandler('ok', this.onOk.bind(this));
            $gameTemp.lastHistoryIndex = $gameTemp.lastHistoryIndex || 0;
            this._commandWndow.select($gameTemp.lastHistoryIndex);
            this._commandWndow.activate();
        };
        Scene_History.prototype.onChange = function () {
            $gameTemp.lastHistoryIndex = this._commandWndow.index();
            p(this._commandWndow.currentItem());
            this._window.setup(this._commandWndow.currentItem());
        };
        Scene_History.prototype.onOk = function () {
            $gameTemp.currentHistory = this._commandWndow.currentItem();
            var loadFile = 'load_' + $gameTemp.currentHistory.eroId();
            p(loadFile);
            if (!$dataScenario[loadFile]) {
                this.playScenario('リザルトHの画像変更できない');
                return;
            }
            $gameSystem._reservedEvent['99'] = [];
            $gameSystem.reserveEvent('99', loadFile);
            $gameTemp.inChangePicture = true;
            $gameTemp.captureTemp = $gameTemp.currentHistory.captureTemp();
            this.playScenario('リザルトHの画像変更');
        };
        Scene_History.prototype.onCancel = function () {
            $gameTemp.currentHistory = null;
            $gameActors.mainActor().setCacheChanged();
            SceneManager.pop();
            $gameActors.mainActor().setCacheChanged();
        };
        Scene_History.prototype.update = function () {
            _super.prototype.update.call(this);
            $gameScreen.update();
            if (this.isInterpreterRunning()) {
                return;
            }
            if ($gameTemp.inChangePicture) {
                $gameTemp.currentHistory.save();
                $gameTemp.inChangePicture = false;
                var loadFile = 'load_' + $gameTemp.currentHistory.eroId();
                this.playScenario(loadFile + '_');
                return;
            }
            if (!this._commandWndow.active) {
                this._commandWndow.activate();
            }
        };
        return Scene_History;
    }(Scene_Talk));
    Nore.Scene_History = Scene_History;
    var Window_HistoryCommand = /** @class */ (function (_super) {
        __extends(Window_HistoryCommand, _super);
        function Window_HistoryCommand() {
            var _this = _super.call(this, new Rectangle(5, 5, 365, 750)) || this;
            _this._data = [];
            _this.initHistory();
            _this.refresh();
            return _this;
        }
        Window_HistoryCommand.prototype.initHistory = function () {
            var list = $gameSystem.historyList();
            this._data = [];
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var c = list_1[_i];
                if (c.eroId() == -1) {
                    continue;
                }
                if (c.eroId() == -3) {
                    continue;
                }
                this._data.push(c);
            }
        };
        Window_HistoryCommand.prototype.maxItems = function () {
            return this._data ? this._data.length : 1;
        };
        Window_HistoryCommand.prototype.item = function () {
            return this.itemAt(this.index());
        };
        Window_HistoryCommand.prototype.itemAt = function (index) {
            return this._data && index >= 0 ? this._data[index] : null;
        };
        Window_HistoryCommand.prototype.drawItem = function (index) {
            var item = this.itemAt(index);
            if (item) {
                this.changeTextColor(ColorManager.normalColor());
                var rect = this.itemLineRect(index);
                this.contents.fontSize = 18;
                var text = 'D' + item.day;
                if (item.morning) {
                    text += ' 🌑︎';
                }
                else if (item.night) {
                    text += ' ☽︎';
                }
                this.drawText(text, rect.x, rect.y, rect.width, 'left');
                this.contents.fontSize = 24;
                if (item.isDungeon()) {
                    if (item.isClear()) {
                        this.changeTextColor(ColorManager.crisisColor());
                    }
                    else if (item.isRope()) {
                        this.changeTextColor(ColorManager.normalColor());
                    }
                    else {
                        this.changeTextColor(ColorManager.deathColor());
                    }
                }
                this.drawText(item.title(), rect.x + 60, rect.y, 230, 'left');
                //this.drawItemRank(item, rect.x + 390, rect.y);
            }
        };
        Window_HistoryCommand.prototype.drawItemRank = function (item, x, y) {
            var rank = '';
            for (var i = 0; i < parseInt(item.meta['rank']); i++) {
                rank += '★';
            }
            this.drawText(rank, x, y, 100, 'left');
        };
        Window_HistoryCommand.prototype.isEnabled = function (item) {
            var questManager = $gameSystem.questManager();
            return !questManager.isReceive(item.id) && !questManager.isClear(item.id);
        };
        Window_HistoryCommand.prototype.isCurrentItemEnabled = function () {
            return this.isEnabled(this.item());
        };
        Window_HistoryCommand.prototype.currentItem = function () {
            return this.item();
        };
        Window_HistoryCommand.prototype.resetFontSettings = function () {
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = 24;
            this.resetTextColor();
        };
        return Window_HistoryCommand;
    }(Window_Selectable));
    var Window_Result = /** @class */ (function (_super) {
        __extends(Window_Result, _super);
        function Window_Result() {
            var _this = this;
            var x = 190;
            _this = _super.call(this, new Rectangle(x, -3, Graphics.width - x * 2, Graphics.height)) || this;
            return _this;
        }
        Window_Result.prototype.setup = function (result) {
            if (this._result == result) {
                return;
            }
            this._result = result;
            if (this._result) {
                this.refresh();
            }
        };
        Window_Result.prototype.refresh = function () {
            this.contents.clear();
            this._windowContentsSprite.removeChildren();
            this.resetFontSettings();
            this.drawTitle(5);
            this.drawLine(45);
            this.drawResultText(73);
            // エロ詳細開放
            //this.drawLine2(140);
            this.drawDetailText(40, 160);
            this.drawEroStatus(640, 100);
            //this.drawEroEquip(720, 300);
            this.drawSikyu(640, 480, this._result.sikyuSeieki(), !this._result.morning);
            this.drawImage();
        };
        Window_Result.prototype.drawTitle = function (y) {
            if (this._result.isDungeon()) {
                this.drawText('Adventure Results', 0, y, this.width, 'center');
            }
            else {
                this.drawText('H Results:', 0, y, this.width, 'center');
            }
        };
        Window_Result.prototype.drawResultText = function (y) {
            if (this._result.isDungeon()) {
                this.drawDungeonResult(this._result, -200, y);
            }
            else if (this._result.eroId() < 0) {
                this.drawEroResult(this._result, -200, y);
            }
            else {
                //this.drawEroResult(<EroResult> this._result, -200, y);
            }
        };
        Window_Result.prototype.drawDetailText = function (x, y) {
            if (!this._result.imageFile()) {
                if (!this._result.isDungeon()) {
                    this.drawEroDetail(this._result, x, y - 80);
                }
                return;
            }
            if (this._result.isDungeon()) {
                this.drawDefeatText(this._result, x, y);
            }
            else {
                this.drawEroDetail(this._result, x, y - 80);
            }
        };
        Window_Result.prototype.drawEroResult = function (result, x, y) {
            var enemy = $dataEnemies[result.enemyId];
            var name = '';
            if (enemy) {
                name = enemy.name;
            }
            var actorName = $gameActors.mainActor().name();
            var width1;
            var width2;
            var texts = getEroTitles(result.eroId(), result);
            var text1 = texts[0].format('\\C[6]' + actorName + '\\C[0]', '\\C[2]' + name + '\\C[0]');
            var text2 = texts[1];
            width1 = this.calcTextWidth(text1.format(actorName, name));
            width2 = this.calcTextWidth(text2);
            this.drawTextEx(text1, x + (this.width - width1) / 2, y, this.width);
            if (text2) {
                this.drawTextEx(text2, x + (this.width - width2) / 2, y + 32, this.width);
            }
        };
        Window_Result.prototype.calcTextWidth = function (arg) {
            if (!arg) {
                return 0;
            }
            var text = arg.replace(/(\\C\[\d+\])/gi, '');
            return this.textWidth(text);
        };
        Window_Result.prototype.drawEroDetail = function (result, x, y) {
            var text = getEroText(result);
            this.drawTextEx(text, x, y, 400);
        };
        Window_Result.prototype.drawDungeonResult = function (result, x, y) {
            var dungeonName = result.dungeonName();
            var text1;
            var text2;
            var width1;
            var width2;
            var actorName = $gameActors.mainActor().name();
            if (result.isClear()) {
                var base1 = '%1 at %2\\C[0] Results:';
                text1 = base1.format('\\C[6]' + actorName + '\\C[0]', '\\C[2]' + dungeonName);
                text2 = this.getClearText(result);
                width1 = this.textWidth(base1.format(actorName, dungeonName));
                width2 = this.textWidth(text2);
            }
            else if (result.isRope()) {
                var base1 = '%1 has withdrawn from %2!';
                text1 = base1.format('\\C[6]' + actorName + '\\C[0]', '\\C[2]' + dungeonName);
                text2 = '';
                width1 = this.textWidth(base1.format(actorName, dungeonName));
                width2 = this.textWidth(text2);
            }
            else {
                var base1 = '%1 is on layer %3 of %2.';
                var floor = Nore.hankaku2Zenkaku(result.floor);
                text1 = base1.format('\\C[6]' + actorName + '\\C[0]', '\\C[2]' + dungeonName, '\\C[16]' + floor + '\\C[0]');
                width1 = this.textWidth(base1.format(actorName, dungeonName, floor));
                var enemyName = this.enemyName(result);
                var base2 = "I fell down after being hit by %1's attack.";
                text2 = base2.format('\\C[6]' + enemyName + '\\C[0]');
                width2 = this.textWidth(base2.format(enemyName));
            }
            this.drawTextEx(text1, x + (this.width - width1) / 2, y, this.width);
            this.drawTextEx(text2, x + (this.width - width2) / 2, y + 32, this.width);
        };
        Window_Result.prototype.getClearText = function (result) {
            if (result.defeatCount() == 0) {
                return 'Successfully Cleared!';
            }
            else {
                return 'I cleared it despite losing %1 times.'.format(result.defeatCount());
            }
        };
        Window_Result.prototype.lineHeight = function () {
            return 32;
        };
        Window_Result.prototype.enemyName = function (result) {
            var enemy = $dataEnemies[result.enemyId];
            if (!enemy) {
                enemy = $dataEnemies[10];
            }
            return enemy.name;
        };
        Window_Result.prototype.drawEroEquip = function (x, y) {
            this.contents.fontSize = 20;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText('エロ装備', x, y, 200, 'left');
            this.contents.fontSize = 18;
            this.changeTextColor(ColorManager.normalColor());
            y += 30;
            x += 30;
            this.drawText('なし', x, y, 200, 'left');
        };
        Window_Result.prototype.drawEroStatus = function (x, y) {
            this.contents.fontSize = 20;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText('H Activity:', x, y, 200, 'left');
            this.contents.fontSize = 18;
            this.changeTextColor(ColorManager.normalColor());
            x += 30;
            this.drawItem(x, y, 1, 'Creampie', 2031, 'nakadashiCount');
            this.drawItem(x, y, 2, 'Anal', 2021, 'anal');
            this.drawItem(x, y, 3, 'Fellatio', 2004, 'fela');
            this.drawItem(x, y, 4, TextManager.bukkake, 2026, 'bukkake', 'ml');
            this.drawItem(x, y, 5, 'Creampie Amount', 2031, 'nakaSeieki', 'ml');
            this.drawItem(x, y, 6, 'Swallowed', 2028, 'kounaiSeieki', 'ml');
            this.drawItem(x, y, 7, 'Kiss', 2096, 'kiss');
            this.drawItem(x, y, 8, 'Orgasms', 2090, 'iku');
            this.drawItem(x, y, 9, 'Births (Human)', 2048, 'syusanHuman');
            this.drawItem(x, y, 10, 'Births (Monster)', 2052, 'syusanMonster');
        };
        Window_Result.prototype.drawLine = function (y) {
            this.contents.fillRect(10, y, this.width - 20 - this.padding * 2, 2, ColorManager.normalColor());
        };
        Window_Result.prototype.drawLine2 = function (y) {
            this.contents.fillRect(410, y, this.width - 420 - this.padding * 2, 2, ColorManager.normalColor());
        };
        Window_Result.prototype.resetFontSettings = function () {
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = 16;
            this.resetTextColor();
        };
        Window_Result.prototype.drawDefeatText = function (result, x, y) {
            if (this._result.eroId() == 0) {
                return;
            }
            this.drawTextEx(result.defeatText(), x, y, 400);
        };
        Window_Result.prototype.drawItem = function (x, yy, index, label, icon, prop, unit) {
            if (unit === void 0) { unit = ''; }
            var y = index * 32 + yy;
            this.drawText(label, x + 38, y, 110, 'left');
            this.drawIcon(icon, x, y);
            var value = this._result[prop];
            var up = value;
            x += 10;
            this.drawText(up, x + 32, y, 170, 'right');
            if (unit) {
                this.drawText(unit, x + 204, y, 120, 'left');
            }
        };
        Window_Result.prototype.drawImage = function () {
            if (this._result.imageFile()) {
                this.drawEroImage();
            }
            else {
                this.drawActor();
            }
        };
        Window_Result.prototype.drawEroImage = function () {
            var g = new PIXI.Graphics();
            g.beginFill(0xFFFFFF, 1);
            var m = this.margin + 1;
            var w = 604;
            var h = 404;
            g.x = 20;
            g.y = 338;
            //g.drawRect(0, 0, w, h);
            g.endFill();
            g.lineStyle(4, 0xe2b750, 1);
            g.drawRect(0, 0, w, h);
            this._windowContentsSprite.addChild(g);
            var file = this._result.imageFile();
            var sprite = new Sprite();
            sprite.x = g.x + 2;
            sprite.y = g.y + 2;
            sprite.bitmap = ImageManager.loadHistory(file, true);
            this._windowContentsSprite.addChild(sprite);
        };
        Window_Result.prototype.drawActor = function () {
            var actor = $gameActors.mainActor();
            var copy = JsonEx.makeDeepCopy(actor);
            copy.acceMap = this._result.acceMap;
            copy.setBreakId(this._result.breakId);
            copy.setOuterId(this._result.outerId);
            copy.setOuterTopId(this._result.outerTopId);
            copy.setOuterBottomId(this._result.outerBottomId);
            copy.setInnerTopId(this._result.innerTopId);
            copy.setInnerBottomId(this._result.innerBottomId);
            copy.setPoseId(this._result.poseId);
            copy.setArmId(this._result.armId);
            copy.setLegId(this._result.legId);
            if (this._result.stateIds()) {
                for (var _i = 0, _a = this._result.stateIds(); _i < _a.length; _i++) {
                    var id = _a[_i];
                    copy.addState(id);
                }
            }
            copy.setHoppeId(this._result.hoppeId);
            copy.setBoteId(this._result.boteId);
            var faceId = this._result.faceId;
            //copy.setPoseId(2);
            var y = 180;
            switch (copy.bodyType()) {
                case 'c':
                    y += 75;
                    break;
            }
            this.drawTachieActor(copy, this._windowContentsSprite, 50, y, null, faceId, 0.9, undefined, undefined, undefined, 10);
        };
        return Window_Result;
    }(Window_Base));
})(Nore || (Nore = {}));
ImageManager.loadHistory = function (filename, noCache) {
    return this.loadBitmap("history/", filename, noCache);
};
var Info = /** @class */ (function () {
    function Info() {
        this._nakadashi = {};
        this._bukkake = 0;
        this._iku = 0;
        this._kiss = 0;
        this._fela = 0;
        this._anal = 0;
        this._kounaiSeieki = 0;
        this._nakaSeieki = 0;
        this._syusan = 0;
        this._taneoya = 0;
        this._baisyun = 0;
        this._armorId = 0;
    }
    Object.defineProperty(Info.prototype, "nakadashi", {
        get: function () {
            return this._nakadashi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "bukkake", {
        get: function () {
            return this._bukkake;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "iku", {
        get: function () {
            return this._iku;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "kiss", {
        get: function () {
            return this._kiss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "fela", {
        get: function () {
            return this._fela;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "anal", {
        get: function () {
            return this._anal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "kounaiSeieki", {
        get: function () {
            return this._kounaiSeieki;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "nakaSeieki", {
        get: function () {
            return this._nakaSeieki;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "syusan", {
        get: function () {
            return this._syusan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "taneoya", {
        get: function () {
            return this._taneoya;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Info.prototype, "baisyun", {
        get: function () {
            return this._baisyun;
        },
        enumerable: true,
        configurable: true
    });
    Info.prototype.armorList = function () {
        var result = [];
        if (this._armorId > 0) {
            result.push($dataArmors[this._armorId]);
        }
        return result;
    };
    Info.prototype.plusBukkake = function (value) {
        var n = value * (10 + Math.randomInt(15));
        this._bukkake += n;
        $gameSystem.getEro(1).bukkake += n;
    };
    Info.prototype.plusBaisyun = function (value) {
        this._baisyun += value;
    };
    Info.prototype.plusSyusan = function (enemyId, value) {
        this._syusan += value;
        this._taneoya = enemyId;
    };
    Info.prototype.plusNakadashi = function (n, enemyId) {
        if (n <= 0) {
            return;
        }
        this._nakadashi[enemyId] = this._nakadashi[enemyId] || 0;
        this._nakadashi[enemyId] += n;
        var enemy = $dataEnemies[enemyId];
        if (!enemy) {
            console.error(enemyId);
        }
        var rate = enemy.meta['seieki'];
        //p(enemyId + ' rate' + rate)
        if (isNaN(rate)) {
            rate = 9;
        }
        var plus = rate * n;
        if (Math.randomInt(2) == 0) {
            plus += 1;
        }
        this._nakaSeieki += plus;
        //p('plusNakadashi:' + plus)
        var e = new Game_Enemy(enemyId, 0, 0);
        $gameActors.mainActor().sikyu().plusSeieki(e, plus);
    };
    Info.prototype.plusIku = function (n) {
        this._iku += n;
    };
    Info.prototype.plusKiss = function (n) {
        this._kiss += n;
    };
    Info.prototype.plusAnal = function (n) {
        this._anal += n;
    };
    Info.prototype.plusFela = function (n, enemyId) {
        if (n <= 0) {
            return;
        }
        this._fela += n;
        var enemy = $dataEnemies[enemyId];
        var rate = enemy.meta['seieki'];
        if (isNaN(rate)) {
            rate = 4;
        }
        this._kounaiSeieki += rate * n;
        if (Math.randomInt(2) == 0) {
            this._kounaiSeieki += 1;
        }
    };
    Info.prototype.addArmor = function (armorId) {
        this._armorId = armorId;
        $gameParty.gainItem($dataArmors[armorId], 1);
    };
    Info.prototype.plusKounai = function (n) {
        this._kounaiSeieki += n;
    };
    return Info;
}());
var EroInfo = /** @class */ (function (_super) {
    __extends(EroInfo, _super);
    function EroInfo(_eroId) {
        var _this = _super.call(this) || this;
        _this._eroId = _eroId;
        return _this;
    }
    EroInfo.prototype.eroId = function () {
        return this._eroId;
    };
    return EroInfo;
}(Info));
var DungeonInfo = /** @class */ (function (_super) {
    __extends(DungeonInfo, _super);
    function DungeonInfo(_dungeonId) {
        var _this = _super.call(this) || this;
        _this._dungeonId = _dungeonId;
        _this._startGold = 0;
        _this._ether = 0;
        _this._room = 0;
        _this._defeatEnemyList = [];
        _this._startGold = $gameParty.gold();
        _this._totalCount = $gameVariables.value(15);
        return _this;
    }
    DungeonInfo.prototype.finishEro = function (enemyId) {
        this._defeatEnemyList.push(enemyId);
        var upEro = $gameTemp.upEroInfo();
        this._lastIku = upEro.iku;
    };
    DungeonInfo.prototype.finish = function () {
        this._gold = $gameParty.gold() - this._startGold;
    };
    DungeonInfo.prototype.nextRoom = function () {
        this._room++;
    };
    Object.defineProperty(DungeonInfo.prototype, "totalCount", {
        get: function () {
            return this._totalCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonInfo.prototype, "dungeonId", {
        get: function () {
            return this._dungeonId;
        },
        enumerable: true,
        configurable: true
    });
    DungeonInfo.prototype.calcEroPower = function () {
        /*let n = 0;
        n += this._iku * Math.randomInt(100) + 50;
        return n;*/
        return 0;
    };
    return DungeonInfo;
}(Info));
var Result = /** @class */ (function () {
    function Result(eroId) {
        this._eroId = eroId;
        var actor = $gameActors.mainActor();
        this._acceMap = JsonEx.makeDeepCopy(actor.acceMap);
        this._outerId = actor.outerId;
        this._outerTopId = actor.outerTopId;
        this._outerBottomId = actor.outerBottomId;
        this._innerTopId = actor.innerTopId;
        this._innerBottomId = actor.innerBottomId;
        this._armId = actor.armId;
        this._legId = actor.legId;
        this._breakId = actor.breakId;
        this._poseId = actor.poseId;
        this._faceId = actor.faceId;
        this._hoppeId = actor.hoppeId;
        this._boteId = actor.boteId;
        this._gold = $gameVariables.value(64);
        this._stateIds = [];
        for (var _i = 0, _a = actor.states(); _i < _a.length; _i++) {
            var s = _a[_i];
            this._stateIds.push(s.id);
        }
        this._sikyuSeieki = JsonEx.makeDeepCopy(actor.sikyu().seiekiList());
        this._day = $gameVariables.value(4);
        this._night = $gameSwitches.value(12);
    }
    Result.prototype.save = function () {
        $gameTemp.ignoreFiles2 = $gameTemp.ignoreFiles2 || [];
        this._ignoreFiles = JsonEx.makeDeepCopy($gameTemp.ignoreFiles2);
        this._captureTemp = JsonEx.makeDeepCopy($gameTemp.captureTemp);
        //p('save')
        //p(this);
    };
    Result.prototype.captureTemp = function () {
        return JsonEx.makeDeepCopy(this._captureTemp);
    };
    Object.defineProperty(Result.prototype, "nakadashiCount", {
        get: function () {
            var c = 0;
            for (var n in this.nakadashi) {
                c += this.nakadashi[n];
            }
            return c;
        },
        enumerable: true,
        configurable: true
    });
    Result.prototype.isShojoSoushitsu = function () {
        return this._shojoSoushitsu;
    };
    Result.prototype.gold = function () {
        return this._gold;
    };
    Result.prototype.checkShojoSoushitsu = function () {
        if ($gameSwitches.value(3)) {
            return;
        }
        for (var key in this.nakadashi) {
            if (this.nakadashi[key] > 0) {
                this._shojoSoushitsu = true;
            }
        }
    };
    Result.prototype.isClear = function () {
        return false;
    };
    Result.prototype.isRope = function () {
        return false;
    };
    Result.prototype.upEro = function (ero) {
        for (var key in this.nakadashi) {
            ero.upNakadashi(parseInt(key), this.nakadashi[key]);
        }
        ero.acme += this.iku;
        ero.seiekiNakadashi += this.nakaSeieki;
        ero.seiekiNomu += this.kounaiSeieki;
        ero.fela += this.fela;
        ero.anal += this.anal;
        for (var i = 0; i < this._syusan; i++) {
            var enemy = $dataEnemies[this._taneoya];
            if (enemy.meta['nakaType'] == 'monster') {
                ero.syusanMonster++;
            }
            else if (enemy.meta['nakaType'] == 'human') {
                ero.syusanHuman++;
            }
            else {
                ero.syusanHuman++;
            }
        }
    };
    Result.prototype.sikyuSeieki = function () {
        return this._sikyuSeieki;
    };
    Result.prototype.setEroId = function (eroId) {
        this._eroId = eroId;
    };
    Result.prototype.eroId = function () {
        return this._eroId;
    };
    Result.prototype.imageFile = function () {
        return this._imageFile;
    };
    Result.prototype.setImageFile = function (image) {
        this._imageFile = image;
    };
    Object.defineProperty(Result.prototype, "syusanMonster", {
        get: function () {
            var n = 0;
            for (var i = 0; i < this._syusan; i++) {
                var enemy = $dataEnemies[this._taneoya];
                if (enemy.meta['nakaType'] == 'monster') {
                    n++;
                }
            }
            return n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "syusanHuman", {
        get: function () {
            var n = 0;
            for (var i = 0; i < this._syusan; i++) {
                var enemy = $dataEnemies[this._taneoya];
                if (enemy.meta['nakaType'] != 'monster') {
                    n++;
                }
            }
            return n;
        },
        enumerable: true,
        configurable: true
    });
    Result.prototype.stateIds = function () {
        return [];
    };
    Object.defineProperty(Result.prototype, "acceMap", {
        get: function () {
            return this._acceMap || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "outerId", {
        get: function () {
            return this._outerId || 'a';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "outerTopId", {
        get: function () {
            return this._outerTopId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "outerBottomId", {
        get: function () {
            return this._outerBottomId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "innerTopId", {
        get: function () {
            return this._innerTopId || 'a';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "innerBottomId", {
        get: function () {
            return this._innerBottomId || 'a';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "breakId", {
        get: function () {
            return this._breakId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "armId", {
        get: function () {
            return this._armId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "legId", {
        get: function () {
            return this._legId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "poseId", {
        get: function () {
            return this._poseId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "faceId", {
        get: function () {
            return this._faceId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "hoppeId", {
        get: function () {
            return this._hoppeId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "boteId", {
        get: function () {
            return this._boteId || 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "day", {
        get: function () {
            return this._day || 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "night", {
        get: function () {
            return this._night;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "morning", {
        get: function () {
            return this._morning;
        },
        enumerable: true,
        configurable: true
    });
    Result.prototype.isSyusan = function () {
        return false;
    };
    Result.prototype.taneoyaName = function () {
        return '';
    };
    return Result;
}());
var NinshinEroResult = /** @class */ (function (_super) {
    __extends(NinshinEroResult, _super);
    function NinshinEroResult(result) {
        var _this = _super.call(this, -1) || this;
        _this._result = result;
        _this._faceId = 10;
        _this._hoppeId = 2;
        _this._night = true;
        _this._morning = true;
        _this._count = $gameVariables.value(36) + 1;
        $gameVariables.setValue(36, _this._count);
        return _this;
    }
    Object.defineProperty(NinshinEroResult.prototype, "enemyId", {
        get: function () {
            return this._result.taneoyaId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult.prototype, "bukkake", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult.prototype, "iku", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult.prototype, "kiss", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult.prototype, "fela", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult.prototype, "anal", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult.prototype, "kounaiSeieki", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult.prototype, "nakaSeieki", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult.prototype, "boteId", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    NinshinEroResult.prototype.isDungeon = function () {
        return false;
    };
    NinshinEroResult.prototype.title = function () {
        return getNinshinTitle(this._count);
    };
    Object.defineProperty(NinshinEroResult.prototype, "nakadashi", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    NinshinEroResult.prototype.setFaceId = function (faceId) {
        this._faceId = faceId;
    };
    NinshinEroResult.prototype.taneoyaId = function () {
        if (this._sikyuSeieki.length == 0) {
            return 0;
        }
        var enemyId = this._sikyuSeieki[0]._enemyId;
        for (var _i = 0, _a = this._sikyuSeieki; _i < _a.length; _i++) {
            var n = _a[_i];
            if (n._enemyId != enemyId) {
                return 0;
            }
        }
        return enemyId;
    };
    return NinshinEroResult;
}(Result));
var NinshinEroResult2 = /** @class */ (function (_super) {
    __extends(NinshinEroResult2, _super);
    function NinshinEroResult2() {
        var _this = _super.call(this, -3) || this;
        _this._faceId = 10;
        _this._hoppeId = 2;
        _this._night = true;
        _this._morning = true;
        _this._count = $gameVariables.value(36) + 1;
        _this._taneoya = $gameActors.mainActor().sikyu().taneoyaId;
        $gameVariables.setValue(36, _this._count);
        return _this;
    }
    Object.defineProperty(NinshinEroResult2.prototype, "enemyId", {
        get: function () {
            return this._taneoya;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult2.prototype, "bukkake", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult2.prototype, "iku", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult2.prototype, "kiss", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult2.prototype, "fela", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult2.prototype, "anal", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult2.prototype, "kounaiSeieki", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult2.prototype, "nakaSeieki", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NinshinEroResult2.prototype, "boteId", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    NinshinEroResult2.prototype.isDungeon = function () {
        return false;
    };
    NinshinEroResult2.prototype.title = function () {
        return getNinshinTitle2(this._count);
    };
    Object.defineProperty(NinshinEroResult2.prototype, "nakadashi", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    NinshinEroResult2.prototype.setFaceId = function (faceId) {
        this._faceId = faceId;
    };
    NinshinEroResult2.prototype.taneoyaId = function () {
        if (this._sikyuSeieki.length == 0) {
            return 0;
        }
        var enemyId = this._sikyuSeieki[0]._enemyId;
        for (var _i = 0, _a = this._sikyuSeieki; _i < _a.length; _i++) {
            var n = _a[_i];
            if (n._enemyId != enemyId) {
                return 0;
            }
        }
        return enemyId;
    };
    return NinshinEroResult2;
}(Result));
var PlayId;
(function (PlayId) {
    PlayId[PlayId["fela"] = 0] = "fela";
    PlayId[PlayId["rinkan"] = 1] = "rinkan";
    PlayId[PlayId["teman"] = 2] = "teman";
})(PlayId || (PlayId = {}));
var EroResult = /** @class */ (function (_super) {
    __extends(EroResult, _super);
    function EroResult(eroInfo, enemyId, faceId, count) {
        var _this = _super.call(this, eroInfo.eroId()) || this;
        _this._bukkake = 0;
        _this._iku = 0;
        _this._kiss = 0;
        _this._fela = 0;
        _this._anal = 0;
        _this._kounaiSeieki = 0;
        _this._nakaSeieki = 0;
        _this._enemyId = enemyId;
        _this._faceId = faceId;
        _this._count = count;
        _this._nakadashi = eroInfo.nakadashi;
        _this._bukkake = eroInfo.bukkake;
        _this._iku = eroInfo.iku;
        _this._anal = eroInfo.anal;
        _this._kounaiSeieki = eroInfo.kounaiSeieki;
        _this._nakaSeieki = eroInfo.nakaSeieki;
        _this._kiss = eroInfo.kiss;
        _this._fela = eroInfo.fela;
        _this._syusan = eroInfo.syusan;
        _this._taneoya = eroInfo.taneoya;
        var map = ERO_UP_MAP[$gameVariables.value(16)];
        if (!map) {
            p($gameVariables.value(16));
        }
        _this._anal += Math.randomInt(parseInt(map.analMax) - parseInt(map.analMin)) + parseInt(map.analMin);
        _this._kiss += Math.randomInt(parseInt(map.kissMax) - parseInt(map.kissMin)) + parseInt(map.kissMin);
        _this._fela += Math.randomInt(parseInt(map.felaMax) - parseInt(map.felaMin)) + parseInt(map.felaMin);
        if (_this._fela > 0 && $gameMedals.hasMedal(945)) {
            $gameActors.mainActor().plusEroPower(20);
        }
        if (map['acme'] != 0) {
            var ero = $gameSystem.getEro(1);
            _this._iku += Math.randomInt(2) + 1;
            if (ero.chikubiStatus > 1000) {
                _this._iku += Math.randomInt(1);
            }
            if (ero.chikubiStatus > 2000) {
                _this._iku += Math.randomInt(2);
            }
            if (ero.chikubiStatus > 3500) {
                _this._iku += Math.randomInt(2);
            }
        }
        _this.checkShojoSoushitsu();
        return _this;
    }
    Object.defineProperty(EroResult.prototype, "enemyId", {
        get: function () {
            return this._enemyId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "nakadashi", {
        get: function () {
            return this._nakadashi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "bukkake", {
        get: function () {
            return this._bukkake;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "iku", {
        get: function () {
            return this._iku;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "kiss", {
        get: function () {
            return this._kiss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "anal", {
        get: function () {
            return this._anal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "fela", {
        get: function () {
            return this._fela;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "kounaiSeieki", {
        get: function () {
            return this._kounaiSeieki;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EroResult.prototype, "nakaSeieki", {
        get: function () {
            return this._nakaSeieki;
        },
        enumerable: true,
        configurable: true
    });
    EroResult.prototype.isDungeon = function () {
        return false;
    };
    EroResult.prototype.title = function () {
        return getEroTitle(this._eroId, this._count);
    };
    EroResult.prototype.isSyusan = function () {
        if (this._eroId == 44) {
            return true;
        }
        return false;
    };
    EroResult.prototype.taneoyaName = function () {
        return getTaneoyaName($dataEnemies[this._enemyId]);
    };
    return EroResult;
}(Result));
var SyusanResult = /** @class */ (function (_super) {
    __extends(SyusanResult, _super);
    function SyusanResult(eroId, taneoyaId) {
        var _this = _super.call(this, eroId) || this;
        _this._bukkake = 0;
        _this._nakaSeieki = 0;
        _this._taneoyaId = taneoyaId;
        _this._taneoya = taneoyaId;
        _this._count = $gameVariables.value(37) + 1;
        $gameVariables.setValue(37, _this._count);
        _this._faceId = 9;
        var eroInfo = $gameSystem.info();
        _this._nakadashi = eroInfo.nakadashi;
        _this._bukkake = eroInfo.bukkake;
        _this._nakaSeieki = eroInfo.nakaSeieki;
        _this._syusan = 1;
        return _this;
    }
    Object.defineProperty(SyusanResult.prototype, "enemyId", {
        get: function () {
            return this._taneoyaId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "nakadashi", {
        get: function () {
            return this._nakadashi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "bukkake", {
        get: function () {
            return this._bukkake;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "iku", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "kiss", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "anal", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "fela", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "kounaiSeieki", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "nakaSeieki", {
        get: function () {
            return this._nakaSeieki;
        },
        enumerable: true,
        configurable: true
    });
    SyusanResult.prototype.isDungeon = function () {
        return false;
    };
    SyusanResult.prototype.title = function () {
        return getSyusanTitle(this.eroId(), this._count);
    };
    SyusanResult.prototype.taneoyaName = function () {
        return $dataEnemies[this._taneoyaId].name;
    };
    SyusanResult.prototype.isSyusan = function () {
        return true;
    };
    Object.defineProperty(SyusanResult.prototype, "syusanMonster", {
        get: function () {
            if ($dataEnemies[this._taneoyaId].meta['nakaType'] == 'monster') {
                return 1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyusanResult.prototype, "syusanHuman", {
        get: function () {
            if ($dataEnemies[this._taneoyaId].meta['nakaType'] != 'monster') {
                return 1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return SyusanResult;
}(Result));
var DungeonResult = /** @class */ (function (_super) {
    __extends(DungeonResult, _super);
    function DungeonResult(_info, _clear, _defeatEnemyId, eroId, faceId) {
        var _this = _super.call(this, eroId) || this;
        _this._info = _info;
        _this._clear = _clear;
        _this._defeatEnemyId = _defeatEnemyId;
        _this._day = $gameVariables.value(4);
        _this._floor = $gameVariables.value(2);
        _this._faceId = faceId;
        var map = ERO_UP_MAP[$gameVariables.value(16)];
        if (map) {
            _this._info._anal += Math.randomInt(parseInt(map.analMax) - parseInt(map.analMin)) + parseInt(map.analMin);
            _this._info._kiss += Math.randomInt(parseInt(map.kissMax) - parseInt(map.kissMin)) + parseInt(map.kissMin);
            _this._info._fela += Math.randomInt(parseInt(map.felaMax) - parseInt(map.felaMin)) + parseInt(map.felaMin);
        }
        _this._syusan = _info.syusan;
        if (_this._syusan > 0) {
            _this._taneoya = _info.taneoya;
        }
        _this.checkShojoSoushitsu();
        return _this;
    }
    DungeonResult.prototype.defeatText = function () {
        if (this._eroId > 0) {
            return getEroText(this);
        }
        else {
            return getDefeatText(this.dungeonId);
        }
    };
    DungeonResult.prototype.defeatCount = function () {
        return this._info._defeatEnemyList.length;
    };
    DungeonResult.prototype.isClear = function () {
        return this._clear;
    };
    DungeonResult.prototype.isRope = function () {
        return this._defeatEnemyId == -1;
    };
    Object.defineProperty(DungeonResult.prototype, "nakadashi", {
        get: function () {
            return this._info.nakadashi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "bukkake", {
        get: function () {
            return this._info.bukkake;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "iku", {
        get: function () {
            return this._info.iku;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "kiss", {
        get: function () {
            return this._info.kiss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "anal", {
        get: function () {
            return this._info.anal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "fela", {
        get: function () {
            return this._info.fela;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "kounaiSeieki", {
        get: function () {
            return this._info.kounaiSeieki;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "nakaSeieki", {
        get: function () {
            return this._info.nakaSeieki;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "dungeonId", {
        get: function () {
            return this._info.dungeonId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "floor", {
        get: function () {
            return this._floor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DungeonResult.prototype, "enemyId", {
        get: function () {
            return this._defeatEnemyId;
        },
        enumerable: true,
        configurable: true
    });
    DungeonResult.prototype.title = function () {
        if (this.isClear()) {
            return this.dungeonName() + ' (Cleared)';
        }
        else if (this.isRope()) {
            return this.dungeonName() + ' (Withdrew)';
        }
        else {
            return this.dungeonName() + ' (Defeated)';
        }
    };
    DungeonResult.prototype.dungeonName = function () {
        for (var i = 300; i < 600; i++) {
            var item = $dataItems[i];
            if (item && item.meta['dungeonId']) {
                var id = parseInt(item.meta['dungeonId']);
                if (id == this.dungeonId) {
                    return item.name;
                }
            }
        }
        return '';
    };
    DungeonResult.prototype.stateIds = function () {
        return this._stateIds;
    };
    DungeonResult.prototype.isDungeon = function () {
        return true;
    };
    DungeonResult.prototype.isSyusan = function () {
        if (this._eroId == 824) {
            return true;
        }
        return false;
    };
    return DungeonResult;
}(Result));
