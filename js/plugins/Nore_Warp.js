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
    var PLACE_VAR = 9;
    var CHURCH_SW = 115;
    var SEIIKI_SW = 143;
    var WarpCommand;
    (function (WarpCommand) {
        WarpCommand["go"] = "go";
        WarpCommand["go2"] = "go2";
        WarpCommand["go3"] = "go3";
        WarpCommand["upgrade"] = "upgrade";
        WarpCommand["cancel"] = "cancel";
    })(WarpCommand = Nore.WarpCommand || (Nore.WarpCommand = {}));
    var Window_DestCommand = /** @class */ (function (_super) {
        __extends(Window_DestCommand, _super);
        function Window_DestCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_DestCommand.prototype.setup = function (item) {
            this._item = item;
            this.refresh();
            if (this._list.length == 4) {
                this.height = 200;
            }
            else {
                this.height = 160;
            }
        };
        Window_DestCommand.prototype.makeCommandList = function () {
            if (!this._item) {
                return;
            }
            var departureItemId = this._item.meta['departure'];
            var armor = $dataArmors[departureItemId];
            var canGo = $gameParty.hasItem(armor, false);
            if (this._item.id == 487) {
                this.addCommand('Depart Final Battle', WarpCommand.go, canGo, null);
            }
            else {
                this.addCommand('Start Floor 1(' + armor.name + ')', WarpCommand.go, canGo, null);
            }
            var departureItemId2 = this._item.meta['departure2'];
            if (departureItemId2) {
                var armor2 = $dataArmors[departureItemId2];
                var canGo2 = $gameParty.hasItem(armor2, false);
                this.addCommand('Start Floor 2(' + armor2.name + ')', WarpCommand.go2, canGo2, null);
            }
            var departureItemId3 = this._item.meta['departure3'];
            if (departureItemId3) {
                var armor3 = $dataArmors[departureItemId3];
                var canGo3 = $gameParty.hasItem(armor3, false);
                this.addCommand('Start Floor 3(' + armor3.name + ')', WarpCommand.go3, canGo3, null);
            }
            this.addCommand('Adjust Equipment', WarpCommand.upgrade, true, null);
        };
        return Window_DestCommand;
    }(Window_Command));
    var Scene_DestSelect = /** @class */ (function (_super) {
        __extends(Scene_DestSelect, _super);
        function Scene_DestSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_DestSelect.prototype.create = function () {
            _super.prototype.create.call(this);
            this.createBackground();
            this.createDestWindow();
            this.createPictures();
            this.createRightTachie();
            this.createPlayer();
            this.createWindowLayer();
            this.createAllWindows();
            this.createFadeSprite();
            this.startInitialScenario();
        };
        Scene_DestSelect.prototype.createGoldWindow = function () {
            this._goldWindow = new Nore.Window_TensouGold(new Rectangle(50, 10, 200, 70));
            this.addChild(this._goldWindow);
            this.updateGoldWindow();
        };
        Scene_DestSelect.prototype.finishScenario = function () {
            this.startInitialScenario();
        };
        Scene_DestSelect.prototype.startInitialScenario = function () {
            if (this.startQuestScenario()) {
                return;
            }
            if ($gameSwitches.value(206)) {
                return;
            }
            if ($gameParty.ether() < 100) {
                return;
            }
            if (!$gameParty.hasItem($dataArmors[501])) {
                return;
            }
            $gameSwitches.setValue(206, true);
            this.playScenario('エリス_転送装置強化');
            this._destWindow.visible = false;
            this._hideDest = true;
        };
        Scene_DestSelect.prototype.startQuestScenario = function () {
            var questManager = $gameSystem.questManager();
            var quest = questManager.nextReviveQuest();
            if (quest) {
                var placeId = parseInt(quest.item().meta['place']);
                var place = $dataItems[placeId];
                var file = place.meta['file'];
                this.playScenario(file + '復活');
                this._destWindow.visible = false;
                this._hideDest = true;
                this._destWindow.clearDestList();
                return true;
            }
            return false;
        };
        Scene_DestSelect.prototype.createRightTachie = function () {
            this._rightTachie = new Nore.Sprite_RightTachie();
            this.addChild(this._rightTachie);
        };
        Scene_DestSelect.prototype.createFadeSprite = function () {
            this._fadeSprite = new ScreenSprite();
            this.addChild(this._fadeSprite);
        };
        Scene_DestSelect.prototype.update = function () {
            _super.prototype.update.call(this);
            $gameScreen.update();
            this._player.update();
            this._goldWindow.openness = 255;
            this.updateGoldWindow();
            this._fadeSprite.opacity = 255 - $gameScreen.brightness();
        };
        Scene_DestSelect.prototype.updateGoldWindow = function () {
            if ($gameVariables.value(4) == 1) {
                this._goldWindow.y = -100;
            }
            else {
                this._goldWindow.y = 10;
            }
        };
        Scene_DestSelect.prototype.createBackground = function () {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadSystem('map');
            this.addChild(this._backgroundSprite);
        };
        Scene_DestSelect.prototype.createPlayer = function () {
            this._player = new Game_PlayerDest();
            this._player.refresh();
            this._playerSprite = new Sprite_Player(this._player);
            this.addChild(this._playerSprite);
        };
        Scene_DestSelect.prototype.createPictures = function () {
            var width = Graphics.width;
            var height = Graphics.height;
            var x = (Graphics.width - width) / 2;
            var y = (Graphics.height - height) / 2;
            this._pictureContainer = new Sprite();
            this._pictureContainer.setFrame(x, y, width, height);
            for (var i = 0; i <= $gameScreen.maxPictures(); i++) {
                this._pictureContainer.addChild(new Sprite_Picture(i));
            }
            this.addChild(this._pictureContainer);
        };
        Scene_DestSelect.prototype.updateInterpreter = function () {
            if (!this._interpreter) {
                return;
            }
            this._interpreter.update();
            if (!this._interpreter.isRunning()) {
                this._destWindow.show();
                this._interpreter = null;
                if ($gameSwitches.value(Nore.TEMP_SWITCH1)) {
                    SceneManager.pop();
                }
                else {
                    if ($gameSwitches.value(CHURCH_SW)) {
                        this._destWindow.activate();
                        this._commandWindow.hide();
                        this.finishScenario();
                        return;
                    }
                    if ($gameVariables.value(4) == 1 || this._destWindow.item().id == 493 || this._destWindow.item().id == 491 || this._destWindow.item().id == 489 || this._hideDest) {
                        this._destWindow.activate();
                        this._commandWindow.hide();
                        this.finishScenario();
                        return;
                    }
                    this._commandWindow.show();
                    this._commandWindow.activate();
                    this._commandWindow.select($gameTemp.selectedIndex);
                    this._destWindow.deactivate();
                }
            }
        };
        Scene_DestSelect.prototype.createDestWindow = function () {
            this._destWindow = new Window_DestSelect();
            this._destWindow.setHandler('ok', this.onOk.bind(this));
            this._destWindow.setHandler('change', this.onChange.bind(this));
            this._destWindow.setHandler('cancel', this.onCancel.bind(this));
            this.addChild(this._destWindow);
            this._commandWindow = new Window_DestCommand(new Rectangle(400, 150, 330, 160));
            this._commandWindow.setHandler(WarpCommand.go, this.onWarp.bind(this));
            this._commandWindow.setHandler(WarpCommand.go2, this.onWarp2.bind(this));
            this._commandWindow.setHandler(WarpCommand.go3, this.onWarp3.bind(this));
            this._commandWindow.setHandler(WarpCommand.upgrade, this.onUpgrade.bind(this));
            this._commandWindow.setHandler(WarpCommand.cancel, this.onWarpCancel.bind(this));
            this._commandWindow.hide();
            this.addChild(this._commandWindow);
        };
        Scene_DestSelect.prototype.onWarpCancel = function () {
            this._commandWindow.hide();
            this._commandWindow.deactivate();
            this._destWindow.activate();
        };
        Scene_DestSelect.prototype.checkFromUpgrade = function () {
            if (!$gameTemp.selectedPlace) {
                return;
            }
            this._commandWindow.show();
            this._commandWindow.activate();
            this._commandWindow.setup($gameTemp.selectedPlace);
            this._commandWindow.select($gameTemp.selectedIndex);
            this._destWindow.deactivate();
            this._destWindow.selectItem($gameTemp.selectedPlace);
        };
        Scene_DestSelect.prototype.onOk = function () {
            $gameTemp.selectedIndex = 0;
            var item = this._destWindow.item();
            if (this._destWindow.isCurrentPlace(item)) {
                this.onCancel();
                return;
            }
            if (!this._destWindow.isEnabled(item)) {
                this.playScenario('教会に行こう');
                return;
            }
            var type = parseInt(item.meta['upgrade']);
            if (type > 0) {
                $gameTemp.upgradeType = type;
                this._commandWindow.show();
                this._commandWindow.activate();
                this._commandWindow.setup(item);
                this._commandWindow.select($gameTemp.selectedIndex);
                this._destWindow.deactivate();
            }
            else {
                this.onWarp();
            }
        };
        Scene_DestSelect.prototype.onUpgrade = function () {
            $gameTemp.selectedIndex = this._commandWindow.maxItems() - 1;
            var item = this._destWindow.item();
            $gameTemp.upgradeType = parseInt(item.meta['upgrade']);
            $gameTemp.selectedPlace = item;
            SceneManager.push(Nore.Scene_Upgrade);
        };
        Scene_DestSelect.prototype.onWarp = function () {
            var item = this._destWindow.item();
            $gameTemp.selectedIndex = 0;
            var id = item.id;
            $gameVariables.setValue(20, id);
            $gameVariables.setValue(75, 1);
            this._destWindow.deactivate();
            var file = item.meta['file'];
            if (file) {
                if ($gameSwitches.value(CHURCH_SW) && item.id == 493) {
                    this._file = '教会に行こう_2';
                    $gameSwitches.setValue(CHURCH_SW, false);
                    this.playScenario(this._file);
                }
                else {
                    this._file = file;
                    this.playScenario(this._file + '確認');
                }
                return;
            }
            this.popScene();
        };
        Scene_DestSelect.prototype.onWarp2 = function () {
            var item = this._destWindow.item();
            $gameTemp.selectedIndex = 1;
            var id = item.id;
            $gameVariables.setValue(20, id);
            $gameVariables.setValue(75, 2);
            this._destWindow.deactivate();
            var file = item.meta['file'];
            if (file) {
                this._file = file;
                this.playScenario(this._file + '確認');
                return;
            }
            this.popScene();
        };
        Scene_DestSelect.prototype.onWarp3 = function () {
            var item = this._destWindow.item();
            $gameTemp.selectedIndex = 2;
            var id = item.id;
            $gameVariables.setValue(20, id);
            $gameVariables.setValue(75, 3);
            this._destWindow.deactivate();
            var file = item.meta['file'];
            if (file) {
                this._file = file;
                this.playScenario(this._file + '確認');
                return;
            }
            this.popScene();
        };
        Scene_DestSelect.prototype.onCancel = function () {
            $gameVariables.setValue(20, 0);
            $gameActors.mainActor().calcArmor();
            $gameTemp.selectedPlace = null;
            $gameTemp.selectedIndex = 0;
            this.popScene();
        };
        Scene_DestSelect.prototype.onChange = function () {
            var item = this._destWindow.item();
            if (item) {
                this._player._x = parseInt(item.meta['x']);
                this._player._y = parseInt(item.meta['y']);
            }
        };
        Scene_DestSelect.prototype.start = function () {
            _super.prototype.start.call(this);
            this._destWindow.refresh();
            this._destWindow.activate();
            this._destWindow.select(0);
            this.checkFromUpgrade();
        };
        ;
        return Scene_DestSelect;
    }(Nore.Scene_Talk));
    Nore.Scene_DestSelect = Scene_DestSelect;
    var Game_PlayerDest = /** @class */ (function (_super) {
        __extends(Game_PlayerDest, _super);
        function Game_PlayerDest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Game_PlayerDest.prototype.screenX = function () {
            return this._x;
        };
        Game_PlayerDest.prototype.screenY = function () {
            return this._y;
        };
        Game_PlayerDest.prototype.direction = function () {
            return 2;
        };
        Game_PlayerDest.prototype.isTransparent = function () {
            return false;
        };
        Game_PlayerDest.prototype.hasStepAnime = function () {
            return true;
        };
        Game_PlayerDest.prototype.characterName = function () {
            return $gamePlayer.characterName();
        };
        Game_PlayerDest.prototype.characterIndex = function () {
            return $gamePlayer.characterIndex();
        };
        Game_PlayerDest.prototype.update = function (sceneActive) {
            var lastScrolledX = this.scrolledX();
            var lastScrolledY = this.scrolledY();
            var wasMoving = this.isMoving();
            this.updateDashing();
            if (sceneActive) {
                this.moveByInput();
            }
            Game_Character.prototype.update.call(this);
            this._followers.update();
        };
        return Game_PlayerDest;
    }(Game_Player));
    var Window_DestSelect = /** @class */ (function (_super) {
        __extends(Window_DestSelect, _super);
        function Window_DestSelect() {
            var _this = _super.call(this, new Rectangle(50, 90, 300, 490)) || this;
            _this.clearDestList();
            return _this;
        }
        Window_DestSelect.prototype.clearDestList = function () {
            this._windowContentsSprite.removeChildren();
            this._destList = null;
            this.makeDestList();
            this.height = this.windowHeight();
        };
        Window_DestSelect.prototype.makeDestList = function () {
            $gameSwitches.setValue(18, false);
            if (this._destList) {
                return;
            }
            this._destList = [];
            var d = this._destList;
            d.push($dataItems[497]);
            if ($gameSwitches.value(961)) {
                d.push($dataItems[493]);
            }
            if (Nore.hasChild()) {
                d.push($dataItems[491]);
            }
            //d.push(Destination.Forest);
            var questManager = $gameSystem.questManager();
            //p(questManager.placeList())
            for (var _i = 0, _a = questManager.placeList(); _i < _a.length; _i++) {
                var q = _a[_i];
                var item = q.placeItem();
                if (item) {
                    d.push(item);
                }
            }
            if ($gameSwitches.value(998)) {
                d.push($dataItems[489]);
            }
            if ($gameParty.guildRank() >= 5) {
                d.push($dataItems[487]);
            }
            this.refresh();
        };
        Window_DestSelect.prototype.canWandering = function () {
            return false;
        };
        Window_DestSelect.prototype.isEroEventExists = function (area) {
            switch (area) {
                case Destination.Town:
                    return $gameSystem.isEroEventReserved(5) || $gameSystem.isEroEventReserved(4);
            }
        };
        Window_DestSelect.prototype.windowHeight = function () {
            return this._destList.length * (this.lineHeight() + 8) + 14 * 2;
        };
        
        Window_DestSelect.prototype.selectedId = function () {
            return this.item().id;
        };
        Window_DestSelect.prototype.item = function () {
            return this._destList[this.index()];
        };
        Window_DestSelect.prototype.selectItem = function (item) {
            this.select(this.itemAt(item));
        };
        Window_DestSelect.prototype.lineHeight = function () {
            return 50;
        };
        Window_DestSelect.prototype.itemAt = function (item) {
            for (var i = 0; i < this._destList.length; i++) {
                if (this._destList[i] == item) {
                    return i;
                }
            }
            return -1;
        };
        Window_DestSelect.prototype.drawItem = function (index) {
            var item = this._destList[index];
            var rect = this.itemRect(index);
            if (this.isCurrentPlace(item)) {
                this.changePaintOpacity(false);
            }
            else {
                if (this.isEnabled(item)) {
                    this.changePaintOpacity(true);
                }
                else {
                    this.changePaintOpacity(false);
                }
            }
            this.drawText(item.name, rect.x + 54, rect.y, 200, 310, 'left');
            this.changePaintOpacity(true);
            var iconX = parseInt(item.meta['iconX']);
            var iconY = parseInt(item.meta['iconY']);
            this.drawIconImg(iconX, iconY, rect.x + 10, rect.y + 14);
            /*if (this.isEroEventExists(destId)) {
                this.drawIcon(84, rect.x, rect.y + 2);
            }*/
            //  this.drawIcon(90, rect.x + 28, rect.y + 2);
        };
        Window_DestSelect.prototype.isEnabled = function (item) {
            if (!$gameSwitches.value(CHURCH_SW)) {
                return true;
            }
            return item.id == 493;
        };
        Window_DestSelect.prototype.drawIconImg = function (iconX, iconY, x, y) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture);
            texture.frame = new PIXI.Rectangle(iconX * 48, iconY * 48, 48, 48);
            var sprite = new PIXI.Sprite(texture);
            sprite.x = x;
            sprite.y = y;
            this._windowContentsSprite.addChild(sprite);
        };
        Window_DestSelect.prototype.isCurrentPlace = function (item) {
            return $gameVariables.value(PLACE_VAR) == item.id;
        };
        Window_DestSelect.prototype.getDestName = function (destId) {
            return getPlaceName(destId);
        };
        Window_DestSelect.prototype.maxItems = function () {
            if (!this._destList) {
                return 0;
            }
            return this._destList.length;
        };
        Window_DestSelect.prototype.maxCols = function () {
            return 1;
        };
        Window_DestSelect.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/World_B'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('World_B');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/World_B';
                PIXI.utils.BaseTextureCache['system/World_B'] = baseTexture;
            }
            return baseTexture;
        };
        return Window_DestSelect;
    }(Window_Selectable));
    Nore.Window_DestSelect = Window_DestSelect;
})(Nore || (Nore = {}));
var Destination;
(function (Destination) {
    Destination[Destination["Town"] = 0] = "Town";
    Destination[Destination["Forest"] = 1] = "Forest";
    Destination[Destination["Dungeon"] = 2] = "Dungeon";
    Destination[Destination["Goblin"] = 3] = "Goblin";
    Destination[Destination["Tower"] = 4] = "Tower";
})(Destination || (Destination = {}));
