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
 * @command plusSeieki
 * @text 精液追加
 * @des 精液追加
 * @arg enemyId
 * @type number
 * @text enemyId
 * @desc enemyId
 * @arg value
 * @type number
 * @text value
 * @desc value
 *
 * @command clearSeieki
 * @text 精液クリア
 * @des 精液クリア
 *
 * @command taneoya
 * @text 種親
 * @des 種親
 * @arg enemyId
 * @type number
 * @text enemyId
 * @desc enemyId
 *
 * @command taneoyaName
 * @text 種親の名前を設定
 * @des 種親の名前を設定
 * @arg count
 * @type number
 * @text count
 * @desc count
 *
 * @command taneoyaName2
 * @text コレットの種親の名前を設定
 * @des コレットの種親の名前を設定
 * @arg count
 * @type number
 * @text count
 * @desc count
 */
var Nore;
(function (Nore) {
    var pluginName = 'Nore_Ninshin';
    PluginManager.registerCommand(pluginName, 'plusSeieki', function (args) {
        var enemyId = parseInt(args.enemyId);
        var value = parseInt(args.value);
        $gameSystem.info().plusNakadashi(value, enemyId);
    });
    PluginManager.registerCommand(pluginName, 'clearSeieki', function (args) {
        $gameActors.mainActor().sikyu().clear();
    });
    PluginManager.registerCommand(pluginName, 'taneoya', function (args) {
        var sikyu = $gameActors.mainActor().sikyu();
        if (sikyu.taneoyaId > 0) {
            var enemy = $dataEnemies[sikyu.taneoyaId];
            p('すでに%1の種が存在していたため種親を設定できませんでした'.format(getTaneoyaName(enemy)));
            return;
        }
        sikyu.taneoyaId = parseInt(args.enemyId);
    });
    PluginManager.registerCommand(pluginName, 'taneoyaName', function (args) {
        var count = parseInt(args.count) - 1;
        var name = '';
        var type = 0;
        var teoCount = 0;
        $gameSwitches.setValue(76, false);
        var syusanList = $gameSystem.syusanList();
        var index = count;
        var max = 8;
        if (syusanList.length > max) {
            index = syusanList.length - max + count;
        }
        var r = syusanList[index];
        if (r.enemyId == 309) {
            $gameSwitches.setValue(76, true);
            $gameVariables.setValue(80, teoCount);
        }
        var enemy = $dataEnemies[r.enemyId];
        switch (enemy.meta['nakaType']) {
            case 'monster':
                type = 2;
                break;
            case 'enemy':
                type = 1;
                break;
            case 'people':
                type = 0;
                break;
        }
        for (var _i = 0, syusanList_1 = syusanList; _i < syusanList_1.length; _i++) {
            var r_1 = syusanList_1[_i];
            if (r_1.enemyId == 309) {
                teoCount++;
            }
        }
        $gameVariables.setValue(20, getTaneoyaName(enemy));
        $gameVariables.setValue(79, type);
    });
    PluginManager.registerCommand(pluginName, 'taneoyaName2', function (args) {
        var count = parseInt(args.count) - 1;
        //$gameSwitches.setValue(76, false);
        var index = count;
        var max = 8;
        if ($gameSystem.colletList().length > max) {
            index = $gameSystem.colletList().length - max + count;
        }
        var taneoya = $gameSystem.colletList()[index];
        var enemyId = 10;
        switch (taneoya) {
            case 0:
                enemyId = 308;
                break;
            case 1:
                enemyId = 330;
                break;
            case 2:
                enemyId = 331;
                break;
            case 3:
                enemyId = 334;
                break;
        }
        $gameVariables.setValue(20, $dataEnemies[enemyId].name);
        //$gameVariables.setValue(79, type);
    });
    function hasChild() {
        var n = 0;
        for (var _i = 0, _a = $gameSystem.historyList(); _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.isSyusan()) {
                n++;
            }
        }
        $gameVariables.setValue(81, n);
        return n > 0;
    }
    Nore.hasChild = hasChild;
    var Scene_NinshinCheck = /** @class */ (function (_super) {
        __extends(Scene_NinshinCheck, _super);
        function Scene_NinshinCheck() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_NinshinCheck.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createWindowLayer();
            this.createAllWindows();
            this.initScenario();
        };
        Scene_NinshinCheck.prototype.initScenario = function () {
            if ($gameSwitches.value(222)) {
                return;
            }
            $gameSwitches.setValue(222, true);
            this.playScenario('妊娠チェック説明');
        };
        Scene_NinshinCheck.prototype.createAllWindows = function () {
            this.createNinshinWindow();
            _super.prototype.createAllWindows.call(this);
        };
        Scene_NinshinCheck.prototype.createNinshinWindow = function () {
            this._window = new Window_NinshinCheck();
            this.addWindow(this._window);
        };
        Scene_NinshinCheck.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.isInterpreterRunning()) {
                return;
            }
            this._window.drawPushA();
            if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
                this._window.onButton();
            }
            if (this._window.isFinished()) {
                if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isTriggered()) {
                    $gameActors.mainActor().sikyu().reduceSeieki();
                    SceneManager.pop();
                }
            }
        };
        return Scene_NinshinCheck;
    }(Nore.Scene_Talk));
    Nore.Scene_NinshinCheck = Scene_NinshinCheck;
    var NinshinCursor = /** @class */ (function (_super) {
        __extends(NinshinCursor, _super);
        function NinshinCursor(startX, width) {
            var _this = _super.call(this) || this;
            _this._wait = 0;
            _this._max = 60;
            _this.bitmap = new Bitmap(40, 40);
            _this.bitmap.drawText('▲', 0, 0, 40, 40, 'left');
            _this._startX = startX;
            _this._width = width;
            _this.x = _this._startX;
            _this.y = 170;
            return _this;
        }
        NinshinCursor.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this._start) {
                return;
            }
            if (this._stop) {
                return;
            }
            if (this._wait % 5 === 0) {
                AudioManager.playSe({ name: 'Cursor2', volume: 80, pitch: 100, pan: 0 });
            }
            this._wait++;
            this.x = this._startX + this._dice / this._max * this._wait * this._width / 100;
            if (this._wait == this._max) {
                this._stop = true;
            }
        };
        NinshinCursor.prototype.start = function (dice) {
            this._dice = dice;
            this._start = true;
        };
        NinshinCursor.prototype.isStop = function () {
            return this._stop;
        };
        NinshinCursor.prototype.isStart = function () {
            return this._start;
        };
        return NinshinCursor;
    }(Sprite));
    var Game_EnemyCharacter = /** @class */ (function (_super) {
        __extends(Game_EnemyCharacter, _super);
        function Game_EnemyCharacter(_enemyId, _screenX, _screenY) {
            var _this = _super.call(this) || this;
            _this._enemyId = _enemyId;
            _this._screenX = _screenX;
            _this._screenY = _screenY;
            return _this;
        }
        Game_EnemyCharacter.prototype.characterName = function () {
            var enemy = this.enemyData();
            var characterName = enemy.meta['characterName'];
            return characterName;
        };
        Game_EnemyCharacter.prototype.characterIndex = function () {
            var enemy = this.enemyData();
            var characterIndex = parseInt(enemy.meta['characterIndex']);
            return characterIndex;
        };
        Game_EnemyCharacter.prototype.screenX = function () {
            return this._screenX;
        };
        Game_EnemyCharacter.prototype.screenY = function () {
            return this._screenY;
        };
        Game_EnemyCharacter.prototype.enemyData = function () {
            return $dataEnemies[this._enemyId];
            ;
        };
        return Game_EnemyCharacter;
    }(Game_Character));
    Nore.Game_EnemyCharacter = Game_EnemyCharacter;
    var Window_NinshinCheck = /** @class */ (function (_super) {
        __extends(Window_NinshinCheck, _super);
        function Window_NinshinCheck() {
            var _this = this;
            var x = 300;
            _this = _super.call(this, new Rectangle(x, 50, Graphics.width - x * 2, 620)) || this;
            _this._sikyu = $gameActors.mainActor().sikyu();
            var result = _this._sikyu.checkNinshin();
            _this._taneoyaId = result.taneoyaId;
            _this._isNinshin = result.ninshin;
            if (_this._isNinshin) {
                _this._sikyu.taneoyaId = _this._taneoyaId;
                $gameSwitches.setValue(36, true);
                //$gameActors.mainActor().addAcce(208);
                $gameSystem.addNinshinResult(result);
            }
            _this.choiceDice();
            _this.refresh();
            return _this;
        }
        Window_NinshinCheck.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._finished) {
                return;
            }
            if (this._cursor.isStop()) {
                this.drawResult();
                this._finished = true;
            }
        };
        Window_NinshinCheck.prototype.onButton = function () {
            if (!this._cursor.isStart()) {
                if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
                    this._cursor.start(this._dice);
                    this.contents.clearRect(0, 200, this.innerWidth, 40);
                }
            }
        };
        Window_NinshinCheck.prototype.choiceDice = function () {
            var sikyu = $gameActors.mainActor().sikyu();
            var ninshinRate = Math.round(sikyu.calcTotalNinshinRate());
            if (this._isNinshin) {
                this._dice = Math.randomInt(ninshinRate);
            }
            else {
                this._dice = Math.randomInt(100 - ninshinRate) + ninshinRate;
            }
        };
        Window_NinshinCheck.prototype.refresh = function () {
            var sikyu = $gameActors.mainActor().sikyu();
            this.contents.clear();
            this.contents.fontSize = 32;
            this.changeTextColor(ColorManager.systemColor());
            this.drawIcon(2003, 260, 20);
            this.drawText('妊娠判定', 0, 20, this.innerWidth, 'center');
            this.contents.fontSize = 16;
            var rate = sikyu.calcTotalNinshinRate();
            this.changeTextColor(ColorManager.normalColor());
            //  this.drawText('妊娠確率 %1％'.format(rate), 0, 90, this.innerWidth, 'center');
            this.drawText('妊娠確率 %1％'.format(rate), 42, 120, this.innerWidth, 'left');
            this.changeTextColor(ColorManager.crisisColor());
            this.drawAlwaysNinshin(160, 120);
            this.changeTextColor(ColorManager.normalColor());
            var y = 150;
            var x = 40;
            var maxX = this.innerWidth - x * 2;
            this.contents.fillRect(x, y, maxX, 20, '#000');
            this.contents.fillRect(x, y, maxX * rate / 100, 20, '#D48');
            this._cursor = new NinshinCursor(x, maxX);
            this.addChild(this._cursor);
            this.drawSikyu(100, 250);
            this.drawSikyuImage(330, 250);
        };
        Window_NinshinCheck.prototype.drawAlwaysNinshin = function (x, y) {
            if (!$gameActors.mainActor().sikyu().isAlwaysNinshin()) {
                return;
            }
            this.drawText('(子宝のお守りの効果)', x, y, this.innerWidth, 'left');
        };
        Window_NinshinCheck.prototype.drawSikyu = function (x, y) {
            //this.drawIcon(2026, x - 36, y);
            this.contents.fontSize = 20;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText('子宮内の精液', x, y, 200, 'left');
            this.changeTextColor(ColorManager.normalColor());
            var actor = $gameActors.mainActor();
            y += 40;
            var index = 0;
            for (var _i = 0, _a = this._sikyu.seiekiList(); _i < _a.length; _i++) {
                var s = _a[_i];
                var enemy = $dataEnemies[s.enemyId()];
                var sp = new Sprite_MiniCharacter(new Game_EnemyCharacter(s.enemyId(), x + 40, y + 40));
                this.addChild(sp);
                this.drawText(parseEnemyName(enemy), x + 60, y, 200, 'left');
                this.drawText(s.value() + ' ml', x + 90, y, 200, 'right');
                /*
                const rank = enemy.meta['ninshin'];
    
                this.changeTextColor(ColorManager.systemColor());
                this.drawText('繁殖力', x + 270, y, 200, 'left');
                this.changeTextColor(ColorManager.normalColor());
                this.drawText(rank, x + 344, y, 200, 'left');
                */
                y += this.lineHeight();
            }
        };
        Window_NinshinCheck.prototype.drawSikyuImage = function (x, y) {
            var fileName = 'actor01_子宮%1_big'.format(1);
            var texture = PIXI.utils.TextureCache[fileName + '.png'];
            if (!texture) {
                console.error(fileName);
                return;
            }
            var sprite = new PIXI.Sprite(texture);
            sprite.x = x;
            sprite.y = -300;
            this.addChild(sprite);
        };
        Window_NinshinCheck.prototype.drawResult = function () {
            var text;
            if (this._isNinshin) {
                text = '妊娠しました';
                this.changeTextColor(ColorManager.deathColor());
                var y = this._taneoyaIndex * this.lineHeight() + 290;
                //this.setCursorRect(100, y, 380, this.lineHeight());
                AudioManager.playMe({ name: 'Shock1', volume: 95, pitch: 100, pan: 0 });
                this.showTaneoya();
            }
            else {
                text = 'セーフ';
                this.changeTextColor(ColorManager.crisisColor());
            }
            this.contents.fontSize = 35;
            this.drawText(text, 0, 200, this.innerWidth, 'center');
        };
        Window_NinshinCheck.prototype.showTaneoya = function () {
            var y = 250;
            for (var _i = 0, _a = this._sikyu.seiekiList(); _i < _a.length; _i++) {
                var s = _a[_i];
                if (this._taneoyaId == s.enemyId()) {
                    var baseTexture = this.getBaseTexture();
                    var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 36, 66, 36));
                    var sprite = new PIXI.Sprite(texture);
                    sprite.x = 82;
                    sprite.y = y + 50;
                    this._windowContentsSprite.addChild(sprite);
                    break;
                }
                y += this.lineHeight();
            }
        };
        Window_NinshinCheck.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/skill_tree'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('skill_tree');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/skill_tree';
                PIXI.utils.BaseTextureCache['system/skill_tree'] = baseTexture;
            }
            return baseTexture;
        };
        Window_NinshinCheck.prototype.drawPushA = function () {
            if (this._pushLabelDrawn) {
                return;
            }
            this._pushLabelDrawn = true;
            this.contents.fontSize = 30;
            this.changeTextColor(ColorManager.crisisColor());
            this.drawText(TextManager.pressButton, 0, 200, this.innerWidth, 'center');
        };
        Window_NinshinCheck.prototype.isFinished = function () {
            return this._finished;
        };
        return Window_NinshinCheck;
    }(Window_Base));
    function isTaneoyaMonster() {
        var sikyu = $gameActors.mainActor().sikyu();
        var taneoya = sikyu.taneoyaId;
        if (taneoya <= 0) {
            return false;
        }
        var enemy = $dataEnemies[taneoya];
        return enemy.meta['nakaType'] == 'monster';
    }
    Nore.isTaneoyaMonster = isTaneoyaMonster;
})(Nore || (Nore = {}));
