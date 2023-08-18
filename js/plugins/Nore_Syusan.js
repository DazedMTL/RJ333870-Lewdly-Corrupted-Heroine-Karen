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
    var ERO_SAVE_SW = 981;
    var pluginName = 'Nore_Syusan';
    PluginManager.registerCommand(pluginName, 'showLayer', function (args) {
        var id = args.id;
        var file;
        switch (actorId) {
            case 1:
                file = '01_50_' + id;
                break;
        }
        $gameTemp.ignoreFiles[file] = false;
    });
    PluginManager.registerCommand(pluginName, 'hideLayer', function (args) {
        var id = args.id;
        var file;
        switch (actorId) {
            case 1:
                file = '01_50_' + id;
                break;
        }
        $gameTemp.ignoreFiles[file] = true;
    });
    PluginManager.registerCommand(pluginName, 'plusSanke', function (args) {
        var n = parseInt(args.value);
        syusanParams.plusSanke(n);
    });
    PluginManager.registerCommand(pluginName, 'setTaneoya', function (args) {
        var n = parseInt(args.id);
        $gameActors.mainActor().sikyu().taneoyaId = n;
    });
    PluginManager.registerCommand(pluginName, 'plusSeieki', function (args) {
        syusanParams.syusanSeieki = 1;
    });
    PluginManager.registerCommand(pluginName, 'face', function (args) {
        var n = parseInt(args.face);
        var actor = $gameActors.mainActor();
        p(n);
        actor._faceId = n;
    });
    var allImageList = [];
    var actorId = 0;
    var actorHoppeId = 0;
    var syusanParams;
    var SyusanParams = /** @class */ (function () {
        function SyusanParams(aid) {
            this.criPoint = 0;
            this.syusanSeieki = 0;
            this.sanke = 0;
            this.actorId = aid;
        }
        SyusanParams.prototype.faceId = function () {
            var actor = $gameActors.mainActor();
            var id = actor.faceId;
            if (id == actor.defaultFaceId && this.sanke >= 50) {
                return 12;
            }
            return id;
        };
        SyusanParams.prototype.plusSanke = function (n) {
            this.sanke += n;
            this.sanke = Math.min(this.sanke, 100);
        };
        SyusanParams.prototype.isMaxSanke = function () {
            return this.sanke >= 100;
        };
        return SyusanParams;
    }());
    Nore.SyusanParams = SyusanParams;
    var Scene_Syusan = /** @class */ (function (_super) {
        __extends(Scene_Syusan, _super);
        function Scene_Syusan() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._levelMap = {};
            _this._runTaneoyaOpening = false;
            return _this;
        }
        Scene_Syusan.prototype.update = function () {
            _super.prototype.update.call(this);
            $gameScreen.update();
        };
        Scene_Syusan.prototype.create = function () {
            _super.prototype.create.call(this);
            actorId = $gameVariables.value(82);
            this._params = new SyusanParams(actorId);
            syusanParams = this._params;
            this.initTaneoyaName();
            this.initImages(actorId);
            this.createSprite();
            this.createWindowLayer();
            this.createStatusWindow();
            this.createMenuWindow();
            this.createAllWindows();
            this.playScenario('出産1_オープニング_01');
        };
        Scene_Syusan.prototype.initTaneoyaName = function () {
            this._taneoyaName = $gameVariables.value(20);
            switch (this._taneoyaName) {
                case $dataEnemies[305].name: // マーク
                case $dataEnemies[308].name: // 神父
                case $dataEnemies[307].name: // 浮浪者
                case 'テオ':
                case 'アンドレイ':
                    break;
                case $dataEnemies[311].name: // ブタA:
                case $dataEnemies[312].name: //'ブタB':
                case $dataEnemies[313].name: //'ブタC':
                case $dataEnemies[314].name: //'ブタD':
                case $dataEnemies[315].name: //'ブタE':
                case $dataEnemies[316].name: //'ブタF':
                    this._taneoyaName = $dataEnemies[304].name; //'メイヴィス';
                    break;
                default:
                    this._taneoyaName = '不明';
            }
        };
        Scene_Syusan.prototype.playScenario = function (id) {
            _super.prototype.playScenario.call(this, id);
            $gameSwitches.setValue(69, false);
            this._menuWindow.deactivate();
        };
        Scene_Syusan.prototype.finishScenario = function () {
            if (!this._runTaneoyaOpening) {
                this.runTaneoyaOpening();
                return;
            }
            $gameSwitches.setValue(69, true);
            this._menuWindow.activate();
            if (this._finished) {
                SceneManager.pop();
            }
            else if (this._params.isMaxSanke()) {
                this._menuWindow.hide();
                this._statusWindow.hide();
                this._finished = true;
                this.playScenario('出産1_出産_%1'.format(this._taneoyaName));
            }
            else {
                p('finishScenario');
                this._menuWindow._itemList = null;
                this._menuWindow.makeItemList();
                this._menuWindow.refresh();
            }
        };
        Scene_Syusan.prototype.runTaneoyaOpening = function () {
            this._runTaneoyaOpening = true;
            var taneoyaId = $gameVariables.value(76);
            var count = $gameVariables.value(taneoyaId - 200);
            p('count' + count);
            switch (taneoyaId) {
                case 303:
                    if (count >= 2) {
                        this.playScenario('出産1_アンドレイ_オープニング_02');
                    }
                    else {
                        this.playScenario('出産1_アンドレイ_オープニング_01');
                    }
                    break;
                case 305:
                    if (count >= 2) {
                        this.playScenario('出産1_マーク_オープニング_02');
                    }
                    else {
                        this.playScenario('出産1_マーク_オープニング_01');
                    }
                    break;
                case 307:
                    if (count >= 2) {
                        this.playScenario('出産1_浮浪者_オープニング_02');
                    }
                    else {
                        this.playScenario('出産1_浮浪者_オープニング_01');
                    }
                    break;
                case 308:
                    if (count >= 2) {
                        this.playScenario('出産1_神父_オープニング_02');
                    }
                    else {
                        this.playScenario('出産1_神父_オープニング_01');
                    }
                    break;
                case 309:
                    if (count >= 2) {
                        this.playScenario('出産1_テオ_オープニング_02');
                    }
                    else {
                        this.playScenario('出産1_テオ_オープニング_01');
                    }
                    break;
                case 311:
                case 312:
                case 313:
                case 314:
                case 315:
                case 316:
                    if (count >= 2) {
                        this.playScenario('出産1_メイヴィス_オープニング_02');
                    }
                    else {
                        this.playScenario('出産1_メイヴィス_オープニング_01');
                    }
                    break;
                default:
                    var c2 = $gameVariables.value(120);
                    if (c2 >= 2) {
                        this.playScenario('出産1_不明_オープニング_02');
                    }
                    else {
                        this.playScenario('出産1_不明_オープニング_01');
                    }
            }
        };
        Scene_Syusan.prototype.initImages = function (actorId) {
            var actor = $gameActors.actor(actorId);
            if (actorId == 1) {
                allImageList = actor1EroList.concat();
                for (var _i = 0, ero1First_1 = ero1First; _i < ero1First_1.length; _i++) {
                    var f = ero1First_1[_i];
                    $gameTemp.ignoreFiles[f] = true;
                }
                if (actor.hasAcce(208)) {
                    $gameTemp.ignoreFiles['01_50_淫紋'] = false;
                }
                if (actor.hasAcce(210)) {
                    $gameTemp.ignoreFiles['01_50_乳首ピアス'] = false;
                }
                if (actor.hasAcce(224)) {
                    $gameTemp.ignoreFiles['01_50_黒乳首'] = false;
                }
                if (actor.hasAcce(214)) {
                    $gameTemp.ignoreFiles['01_50_焼印1'] = false;
                }
                if (actor.hasAcce(215)) {
                    $gameTemp.ignoreFiles['01_50_焼印2'] = false;
                }
            }
        };
        Scene_Syusan.prototype.createMenuWindow = function () {
            this._menuWindow = new Window_ChokyoMenu(this._statusWindow.height, this._params, this);
            this.addWindow(this._menuWindow);
            this._menuWindow.setHandler('ok', this.onOk.bind(this));
        };
        Scene_Syusan.prototype.createStatusWindow = function () {
            this._statusWindow = new Window_EroStatus(this._params);
            this.addWindow(this._statusWindow);
        };
        Scene_Syusan.prototype.createSprite = function () {
            this._sprite = new Sprite_Chokyo(this._params);
            this.addChild(this._sprite);
        };
        Scene_Syusan.prototype.onOk = function () {
            var id = this._menuWindow.selectedId();
            switch (id) {
                case SyusanCommad.VIBE:
                    this.doVibe();
                    break;
                case SyusanCommad.CHIKUBI:
                    this.doChikubi();
                    break;
                case SyusanCommad.CHIKUBI2:
                    this.doChikubi2();
                    break;
                case SyusanCommad.KUPAA:
                    this.doKupaa();
                    break;
                case SyusanCommad.BUKKAKE:
                    this.doBukkake();
                    break;
                case SyusanCommad.SEX:
                    this.doSex();
                    break;
                case SyusanCommad.MUCHI:
                    this.doMuchi();
                    break;
                case SyusanCommad.ANAL:
                    this.doAnal();
                    break;
                case SyusanCommad.TEMAN:
                    this.doTeman();
                    break;
            }
            this._menuWindow.makeItemList();
            this._menuWindow.refresh();
        };
        Scene_Syusan.prototype.doVibe = function () {
            this.playScenario('出産' + actorId + '_手マン_LV' + 1);
        };
        Scene_Syusan.prototype.doSex = function () {
            $gameSystem.info().plusNakadashi(1, $gameActors.mainActor().sikyu().taneoyaId);
            this.playScenario('出産' + actorId + '_セックス_%1_LV%2'.format(this._taneoyaName, this.getLevel('セックス')));
        };
        Scene_Syusan.prototype.getLevel = function (str) {
            this._levelMap[str] = this._levelMap[str] || 0;
            this._levelMap[str]++;
            var total = 0;
            for (var i in this._levelMap) {
                total += this._levelMap[i];
            }
            if (total >= 6) {
                return 6;
            }
            else {
                return this._levelMap[str];
            }
        };
        Scene_Syusan.prototype.isCommandExists = function (type) {
            this._levelMap[type] = this._levelMap[type] || 0;
            var nextLevel = this._levelMap[type] + 1;
            var scenarioId = '出産' + actorId + '_%3_%1_LV%2'.format(this._taneoyaName, nextLevel, type);
            p(scenarioId);
            return $dataScenario[scenarioId] != null;
        };
        Scene_Syusan.prototype.doMuchi = function () {
            this.playScenario('出産' + actorId + '_ムチ_%1_LV%2'.format(this._taneoyaName, this.getLevel('ムチ')));
        };
        Scene_Syusan.prototype.doKupaa = function () {
            this._params.kupaa = true;
            this.playScenario('出産' + actorId + '_くぱぁ_%1_LV%2'.format(this._taneoyaName, 1));
        };
        Scene_Syusan.prototype.doBukkake = function () {
            $gameSystem.info().plusBukkake(1);
            this.playScenario('出産' + actorId + '_ぶっかけ_%1_LV%2'.format(this._taneoyaName, this.getLevel('ぶっかけ')));
        };
        Scene_Syusan.prototype.doChikubi = function () {
            this.playScenario('出産' + actorId + '_乳首つまみ_%1_LV%2'.format(this._taneoyaName, this.getLevel('乳首つまみ')));
        };
        Scene_Syusan.prototype.doChikubi2 = function () {
            this.playScenario('出産' + actorId + '_乳首舐め_%1_LV%2'.format(this._taneoyaName, this.getLevel('乳首舐め')));
        };
        Scene_Syusan.prototype.doTeman = function () {
            this.playScenario('出産' + actorId + '_手マン_%1_LV%2'.format(this._taneoyaName, this.getLevel('手マン')));
        };
        Scene_Syusan.prototype.doAnal = function () {
            this.playScenario('出産' + actorId + '_アナル_LV' + 1);
        };
        return Scene_Syusan;
    }(Nore.Scene_Talk));
    Nore.Scene_Syusan = Scene_Syusan;
    var SyusanCommad;
    (function (SyusanCommad) {
        SyusanCommad[SyusanCommad["VIBE"] = 1] = "VIBE";
        SyusanCommad[SyusanCommad["MUCHI"] = 2] = "MUCHI";
        SyusanCommad[SyusanCommad["SEX"] = 3] = "SEX";
        SyusanCommad[SyusanCommad["KUPAA"] = 4] = "KUPAA";
        SyusanCommad[SyusanCommad["CHIKUBI"] = 5] = "CHIKUBI";
        SyusanCommad[SyusanCommad["CHIKUBI2"] = 6] = "CHIKUBI2";
        SyusanCommad[SyusanCommad["ANAL"] = 7] = "ANAL";
        SyusanCommad[SyusanCommad["BUKKAKE"] = 10] = "BUKKAKE";
        SyusanCommad[SyusanCommad["TEMAN"] = 11] = "TEMAN";
    })(SyusanCommad = Nore.SyusanCommad || (Nore.SyusanCommad = {}));
    var Window_ChokyoMenu = /** @class */ (function (_super) {
        __extends(Window_ChokyoMenu, _super);
        function Window_ChokyoMenu() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isCurrentItemEnabled = function () {
                var id = this.selectedId();
                return this.isItemEnabled(id);
            };
            return _this;
        }
        Window_ChokyoMenu.prototype.initialize = function (y, params, scene) {
            this._params = params;
            this._actorId = params.actorId;
            this._scene = scene;
            _super.prototype.initialize.call(this, new Rectangle(0, y, 260, this.windowHeight()));
            this.select(0);
            this.deactivate();
            this.makeItemList();
            this.refresh();
        };
        Window_ChokyoMenu.prototype.makeItemList = function () {
            if (this._itemList) {
                return;
            }
            this._itemList = [];
            var d = this._itemList;
            if (this.isCommandExists('vive')) {
                d.push(SyusanCommad.VIBE);
            }
            if (this.isCommandExists('セックス')) {
                d.push(SyusanCommad.SEX);
            }
            if (this.isCommandExists('アナル')) {
                d.push(SyusanCommad.ANAL);
            }
            if (this.isCommandExists('乳首つまみ')) {
                d.push(SyusanCommad.CHIKUBI);
            }
            if (this.isCommandExists('乳首舐め')) {
                d.push(SyusanCommad.CHIKUBI2);
            }
            if (this.isCommandExists('ムチ')) {
                d.push(SyusanCommad.MUCHI);
            }
            if (this.isCommandExists('くぱぁ')) {
                d.push(SyusanCommad.KUPAA);
            }
            if (this.isCommandExists('ぶっかけ')) {
                d.push(SyusanCommad.BUKKAKE);
            }
            if (this.isCommandExists('手マン')) {
                d.push(SyusanCommad.TEMAN);
            }
            this.height = this._itemList.length * (this.lineHeight() + 6) + 40;
        };
        Window_ChokyoMenu.prototype.isCommandExists = function (type) {
            return this._scene.isCommandExists(type);
        };
        Window_ChokyoMenu.prototype.drawItem = function (index) {
            var rect = this.itemRect(index);
            var id = this._itemList[index];
            var enabled = this.isItemEnabled(id);
            this.changePaintOpacity(enabled);
            this.drawText(getEroName(id), 12, rect.y, 170, 'left');
        };
        Window_ChokyoMenu.prototype.isItemEnabled = function (id) {
            if (id == SyusanCommad.KUPAA) {
                return !this._params.kupaa;
            }
            if (id == SyusanCommad.BUKKAKE) {
                return !this._params.bukkake;
            }
            return true;
        };
        Window_ChokyoMenu.prototype.isConditionMatches = function (params, state) {
            var ero = $gameSystem.getEro(this._actorId);
            var level = Math.floor(ero[state + 'Lv'] / 10);
            for (var i = 10; i >= 0; i--) {
                if (this.conditionMatch(params[level], i, ero)) {
                    return true;
                }
            }
            return false;
        };
        Window_ChokyoMenu.prototype.conditionMatch = function (params, level, ero) {
            level = Math.floor(level / 10);
            if (!params) {
                return false;
            }
            if (!params[level]) {
                return false;
            }
            var condition = params[level][0];
            for (var con in condition) {
                if (ero[con] < condition[con]) {
                    return false;
                }
            }
            return true;
        };
        Window_ChokyoMenu.prototype.windowHeight = function () {
            return 9 * (this.lineHeight() + 10) + 12 * 2;
        };
        Window_ChokyoMenu.prototype.selectedId = function () {
            return this._itemList[this.index()];
        };
        Window_ChokyoMenu.prototype.maxItems = function () {
            if (!this._itemList) {
                return 0;
            }
            return this._itemList.length;
        };
        Window_ChokyoMenu.prototype.maxCols = function () {
            return 1;
        };
        return Window_ChokyoMenu;
    }(Window_Selectable));
    var temanYList = [0, 10, 18, 24, 18, 10, 0, -10, -18, -24, -18, -10];
    var Sprite_Chokyo = /** @class */ (function (_super) {
        __extends(Sprite_Chokyo, _super);
        function Sprite_Chokyo(param) {
            var _this = _super.call(this) || this;
            _this._temanIndex = 0;
            _this._param = param;
            _this._actorId = param.actorId;
            _this._flashSprite = new ScreenSprite();
            _this._fadeSprite = new ScreenSprite();
            _this._frameBase = new Sprite_Clickable();
            _this.refresh();
            return _this;
        }
        Sprite_Chokyo.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.isChanged()) {
                this.refresh();
            }
            this.moveSprite();
            var color = $gameScreen.flashColor();
            this._flashSprite.setColor(color[0], color[1], color[2]);
            this._flashSprite.opacity = color[3];
            this._fadeSprite.opacity = 255 - $gameScreen.brightness();
        };
        Sprite_Chokyo.prototype.moveSprite = function () {
            if (!this._denmaSprite) {
                return;
            }
            this._temanIndex++;
            if (temanYList.length <= this._temanIndex) {
                this._temanIndex = 0;
            }
            var y = temanYList[this._temanIndex] / 2;
            this._denmaSprite.y = y;
        };
        Sprite_Chokyo.prototype.isChanged = function () {
            if (this._lastFaceId != this._param.faceId()) {
                return true;
            }
            if (this._lastHoppeId != actorHoppeId) {
                return true;
            }
            var param = this._param;
            if (this._lastBukkake != param.bukkake) {
                return true;
            }
            if (this._lastSeieki != param.syusanSeieki) {
                return true;
            }
            if (this._lastKupaa != param.kupaa) {
                return true;
            }
            if (!this._lastIgnoreImages) {
                return true;
            }
            for (var i in this._lastIgnoreImages) {
                if ($gameTemp.ignoreFiles[i] != this._lastIgnoreImages[i]) {
                    return true;
                }
            }
        };
        Sprite_Chokyo.prototype.savelastCondition = function () {
            this._lastFaceId = this._param.faceId();
            this._lastHoppeId = actorHoppeId;
            var param = this._param;
            this._lastIgnoreImages = {};
            this._lastBukkake = param.bukkake;
            this._lastSeieki = param.syusanSeieki;
            this._lastKupaa = param.kupaa;
            for (var i in $gameTemp.ignoreFiles) {
                this._lastIgnoreImages[i] = $gameTemp.ignoreFiles[i];
            }
        };
        Sprite_Chokyo.prototype.refresh = function () {
            this.savelastCondition();
            this._denmaSprite = null;
            this.removeChildren();
            var s = new PIXI.Sprite();
            var list = allImageList;
            var param = this._param;
            if ($gameSwitches.value(ERO_SAVE_SW)) {
                this._captureList = [];
            }
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var file = list_1[_i];
                this.drawEro(file, param);
            }
            if ($gameSwitches.value(ERO_SAVE_SW)) {
                $gameTemp.pushSyusanList(this._captureList);
                $gameSwitches.setValue(ERO_SAVE_SW, false);
            }
            this.addChild(this._flashSprite);
            this.addChild(this._fadeSprite);
            this.addChild(this._frameBase);
        };
        Sprite_Chokyo.prototype.drawEro = function (file, param) {
            if ($gameTemp.ignoreFiles[file]) {
                return;
            }
            var faceId = parseInt(file.substr(file.length - 2, 2));
            if (faceId > 0) {
                if (faceId != this._lastFaceId) {
                    return;
                }
            }
            if (file.indexOf('hoppe') > 0) {
                var hoppeId = parseInt(file.substr(file.length - 1, 1));
                if (hoppeId != this._lastHoppeId) {
                    return;
                }
            }
            var texture = PIXI.utils.TextureCache[file + '.png'];
            if (!texture) {
                return;
            }
            if (file.indexOf('マンコ') > 0) {
                if (param.kupaa) {
                    if (file.indexOf('マンコ1') > 0) {
                        return;
                    }
                    if (file.indexOf('マンコ2中出し') > 0) {
                        if (param.syusanSeieki == 0) {
                            return;
                        }
                    }
                }
                else {
                    if (file.indexOf('マンコ2') > 0) {
                        return;
                    }
                    if (file.indexOf('マンコ1中出し') > 0) {
                        if (param.syusanSeieki == 0) {
                            return;
                        }
                    }
                    else if (file.indexOf('マンコ1') > 0) {
                        if (param.syusanSeieki > 0) {
                            return;
                        }
                    }
                }
            }
            if (file.indexOf('精液') > 0) {
                if (file.indexOf('精液1') > 0) {
                    if (param.syusanSeieki <= 1) {
                        return;
                    }
                }
                if (file.indexOf('精液2') > 0) {
                    if (param.syusanSeieki <= 2) {
                        return;
                    }
                }
            }
            if ($gameSwitches.value(ERO_SAVE_SW)) {
                this._captureList.push(file);
            }
            var sprite = new PIXI.Sprite(texture);
            this.addChild(sprite);
            if (file.indexOf('手マン') > 0) {
                this._denmaSprite = sprite;
                this._angle = 0;
            }
        };
        Sprite_Chokyo.prototype.destroy = function () {
            this.removeChildren();
            _super.prototype.destroy.call(this);
        };
        return Sprite_Chokyo;
    }(Sprite_Clickable));
    var ERO_STATUS_SKILL_IDS = [16, 13, 20, 17];
    var Window_EroStatus = /** @class */ (function (_super) {
        __extends(Window_EroStatus, _super);
        function Window_EroStatus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_EroStatus.prototype.initialize = function (param) {
            this._param = param;
            this._actorId = param.actorId;
            _super.prototype.initialize.call(this, new Rectangle(-4, -4, 280, 70));
            this.createGauge(param);
            this.refresh();
            this.margin = 0;
            this._interval = 5;
            this._frameSprite.opacity = 0;
        };
        Window_EroStatus.prototype.createGauge = function (param) {
            this._gauge = new Nore.Sprite_GaugeNinshin(param);
            this._gauge.x = 10;
            this._gauge.y = 10;
            this.addChild(this._gauge);
        };
        Window_EroStatus.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.isChanged()) {
                this.refresh();
            }
        };
        Window_EroStatus.prototype.isChanged = function () {
            if (this._lastSanke != this._param.sanke) {
                return true;
            }
            return false;
        };
        Window_EroStatus.prototype.saveParams = function () {
            this._lastSanke = this._param.sanke;
        };
        Window_EroStatus.prototype.refresh = function () {
            //this.saveParams();
            this.contents.clear();
            this.drawIcon(404, 0, 0);
            this.contents.fontSize = 18
            this.drawText('Labor', 35, -2, 150, 'left');
        };
        Window_EroStatus.prototype.standardPadding = function () {
            return 10;
        };
        ;
        return Window_EroStatus;
    }(Window_Base));
})(Nore || (Nore = {}));
