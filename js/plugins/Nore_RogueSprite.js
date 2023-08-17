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
Scene_Map.prototype.createSpriteset = function () {
    if (this._spriteset) {
        this.removeChild(this._spriteset);
        this._spriteset.destroy();
    }
    this._spriteset = new Nore.Spriteset_RogueMap();
    this.addChild(this._spriteset);
    this._spriteset.update();
};
var Nore;
(function (Nore) {
    var Sprite_Adjust = /** @class */ (function (_super) {
        __extends(Sprite_Adjust, _super);
        function Sprite_Adjust(x, y) {
            var _this = _super.call(this) || this;
            _this.posX = x;
            _this.posY = y;
            return _this;
        }
        Sprite_Adjust.prototype.update = function () {
            _super.prototype.update.call(this);
            this.x = $gamePlayer.screenX() + this.posX * $gameMap.tileWidth() - 24;
            this.y = $gamePlayer.screenY() + this.posY * $gameMap.tileHeight() - 44;
        };
        return Sprite_Adjust;
    }(Sprite));
    var Sprite_Arrow = /** @class */ (function (_super) {
        __extends(Sprite_Arrow, _super);
        function Sprite_Arrow(x, y, num, direction) {
            var _this = _super.call(this, x, y) || this;
            _this._direction = direction;
            _this.initBitmap(num, direction);
            _this.update();
            return _this;
        }
        Sprite_Arrow.prototype.initBitmap = function (num, direction) {
            this.bitmap = ImageManager.loadCharacter('desti');
            var xx = num % 4;
            if (num > 100) {
                num -= 100;
                xx = num % 4 + 4;
            }
            var yy = Math.floor(num / 4);
            this.setFrame(48 * xx, 48 + yy * 48, 48, 48);
        };
        Sprite_Arrow.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._direction != $gamePlayer.direction()) {
                this.opacity = 110;
            }
            else {
                this.opacity = 210;
            }
        };
        return Sprite_Arrow;
    }(Sprite_Adjust));
    var Sprite_Forecast = /** @class */ (function (_super) {
        __extends(Sprite_Forecast, _super);
        function Sprite_Forecast(x, y, type) {
            var _this = _super.call(this) || this;
            _this.posX = x;
            _this.posY = y;
            _this.initBitmap(type);
            _this.update();
            return _this;
        }
        Sprite_Forecast.prototype.initBitmap = function (type) {
            this.bitmap = ImageManager.loadCharacter('desti');
            this.setFrame(48 * type, 0, 48, 48);
        };
        Sprite_Forecast.prototype.update = function () {
            _super.prototype.update.call(this);
            this.x = $gameMap.adjustX(this.posX) * $gameMap.tileWidth();
            this.y = $gameMap.adjustY(this.posY) * $gameMap.tileHeight();
        };
        return Sprite_Forecast;
    }(Sprite));
    Tilemap.prototype._createLayers = function () {
        /*
         * [Z coordinate]
         *  0 : Lower tiles
         *  1 : Lower characters
         *  3 : Normal characters
         *  4 : Upper tiles
         *  5 : Upper characters
         *  6 : Airship shadow
         *  7 : Balloon
         *  8 : Animation
         *  9 : Destination
         */
        this._lowerLayer = new Tilemap.Layer();
        this._lowerLayer.z = 0;
        this._upperLayer = new Tilemap.Layer();
        this._upperLayer.z = 4;
        this.addChild(this._lowerLayer);
        this.addChild(this._upperLayer);
        this._needsRepaint = true;
    };
    var Spriteset_RogueMap = /** @class */ (function (_super) {
        __extends(Spriteset_RogueMap, _super);
        function Spriteset_RogueMap() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._arrowPanels = [];
            _this._enemyForecastPanels = [];
            return _this;
        }
        Spriteset_RogueMap.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Spriteset_RogueMap.prototype.createCharacters = function () {
            this._characterSprites = [];
            for (var _i = 0, _a = $gameMap.events(); _i < _a.length; _i++) {
                var event_1 = _a[_i];
                if (event_1.isEnemy()) {
                    this._characterSprites.push(new Sprite_Enemy(event_1));
                }
                else {
                    this._characterSprites.push(new Sprite_Character(event_1));
                }
            }
            for (var _b = 0, _c = $gameMap.vehicles(); _b < _c.length; _b++) {
                var vehicle = _c[_b];
                this._characterSprites.push(new Sprite_Character(vehicle));
            }
            for (var _d = 0, _e = $gamePlayer.followers().reverseData(); _d < _e.length; _d++) {
                var follower = _e[_d];
                this._characterSprites.push(new Sprite_Character(follower));
            }
            this._characterSprites.push(new Sprite_Player($gamePlayer));
            for (var _f = 0, _g = this._characterSprites; _f < _g.length; _f++) {
                var sprite = _g[_f];
                this._tilemap.addChild(sprite);
            }
            this._player2Sprite = new Sprite_Character(new Nore.Game_Player2());
            this._characterSprites.push(this._player2Sprite);
            this._tilemap.addChild(this._player2Sprite);
        };
        Spriteset_RogueMap.prototype.createTilemap = function () {
            _super.prototype.createTilemap.call(this);
            this._forecastBase = new Sprite();
            this._tilemap.addChild(this._forecastBase);
            this._forecastBase.z = 1;
            this._itemBase = new Sprite();
            this._itemBase.z = 1;
            this._tilemap.addChild(this._itemBase);
            //this._characterBase = new Sprite();
            //this._tilemap.addChild(this._characterBase);
            var itemList = $gameMap.itemList();
            for (var _i = 0, itemList_1 = itemList; _i < itemList_1.length; _i++) {
                var item = itemList_1[_i];
                var sprite = new Nore.Sprite_Item(item);
                this._itemBase.addChild(sprite);
            }
            this._arrowBase = new Sprite();
            this.addChild(this._arrowBase);
            this._arrowBase.z = 1;
        };
        Spriteset_RogueMap.prototype.createUpperLayer = function () {
            this._mapShadow = new Nore.Sprite_MapShadow();
            this.addChild(this._mapShadow);
            this._miniMap = new Nore.Sprite_MiniMap();
            this.addChild(this._miniMap);
            this.createUiWindow();
            _super.prototype.createUpperLayer.call(this);
            this._bossSprite = new Nore.Sprite_Boss;
            this.addChild(this._bossSprite);
            this.createSkillWindow();
            this.createItemWindow();
            this.createRightTachie();
            this.createPictures2();
        };
        Spriteset_RogueMap.prototype.createPictures = function () {
            var rect = this.pictureContainerRect();
            this._pictureContainer = new Sprite();
            this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
            for (var i = 1; i <= 20; i++) {
                this._pictureContainer.addChild(new Sprite_Picture(i));
            }
            this.addChild(this._pictureContainer);
        };
        Spriteset_RogueMap.prototype.createPictures2 = function () {
            var rect = this.pictureContainerRect();
            this._pictureContainer2 = new Sprite();
            this._pictureContainer2.setFrame(rect.x, rect.y, rect.width, rect.height);
            for (var i = 20; i <= $gameScreen.maxPictures(); i++) {
                this._pictureContainer2.addChild(new Sprite_Picture(i));
            }
            this.addChild(this._pictureContainer2);
        };
        Spriteset_RogueMap.prototype.createUiWindow = function () {
            this._uiWindow = new Nore.Window_RogueUi(new Rectangle(0, 0, 900, 200));
            this.addChild(this._uiWindow);
            this._enemyInfoWindow = new Nore.Window_EnemyInfo();
            this.addChild(this._enemyInfoWindow);
        };
        Spriteset_RogueMap.prototype.createSkillWindow = function () {
            this._helpWindow = new Nore.Window_SkillHelp();
            this.addChild(this._helpWindow);
            this._skillWindow = new Nore.Window_RogueSkill();
            this._skillWindow.hide();
            this._skillWindow.setHandler('ok', this.skillOk.bind(this));
            this._skillWindow.setHandler('cancel', this.skillCancel.bind(this));
            this._skillWindow.setHandler('change', this.skillChange.bind(this));
            this._skillWindow.setHelpWindow(this._helpWindow);
            this._helpWindow.hide();
            this.addChild(this._skillWindow);
            if ($gameTemp.phase == 'skill') {
                this._skillWindow.show();
                this._helpWindow.show();
                this._skillWindow.activate();
                this._skillWindow.select(0);
                $gameTemp.phase = null;
            }
        };
        Spriteset_RogueMap.prototype.skillOk = function () {
            var skill = this._skillWindow.item();
            this.removeAllForecastPanel();
            this._skillWindow.select(-1);
            this._skillWindow.hide();
            this._helpWindow.hide();
            Nore.rogueManager.useSkill(skill);
        };
        Spriteset_RogueMap.prototype.skillCancel = function () {
            this.removeAllForecastPanel();
            this._skillWindow.deactivate();
            this._skillWindow.select(-1);
            this._skillWindow.hide();
            this._helpWindow.hide();
            SceneManager.push(Nore.Scene_MenuRogue);
        };
        Spriteset_RogueMap.prototype.isSkillVisible = function () {
            return this._skillWindow.visible;
        };
        Spriteset_RogueMap.prototype.addDirectionArrow = function (x, y, num, direction) {
            //p(x + " " + y + " " + num)
            var sprite = new Sprite_Arrow(x, y, num, direction);
            this._arrowBase.addChild(sprite);
            this._arrowPanels.push(sprite);
        };
        Spriteset_RogueMap.prototype.addForecastPanelOne = function (x, y, color) {
            if (color === void 0) { color = 1; }
            this._forecastPanels = this._forecastPanels || [];
            var sprite = new Sprite_Forecast(x, y, color);
            this._tilemap.addChild(sprite);
            this._forecastPanels.push(sprite);
        };
        Spriteset_RogueMap.prototype.addDirectionPanel8 = function () {
            if (this._showDirection == $gamePlayer.direction()) {
                return;
            }
            this.removeAllForecastPanel();
            this._showDirection = $gamePlayer.direction();
            var px = $gamePlayer.x;
            var py = $gamePlayer.y;
            var rangeMax = 50;
            switch ($gamePlayer.direction()) {
                case 1:
                    for (var i = 1; i <= rangeMax; i++) {
                        if (!$gameMap.isFloor(px - i, py + i)) {
                            break;
                        }
                        this.addForecastPanelOne(px - i, py + i);
                    }
                    break;
                case 2:
                    for (var i = 1; i <= rangeMax; i++) {
                        if (!$gameMap.isFloor(px, py + i)) {
                            break;
                        }
                        this.addForecastPanelOne(px, py + i);
                    }
                    break;
                case 3:
                    for (var i = 1; i <= rangeMax; i++) {
                        if (!$gameMap.isFloor(px + i, py + i)) {
                            break;
                        }
                        this.addForecastPanelOne(px + i, py + i);
                    }
                    break;
                case 4:
                    for (var i = 1; i <= rangeMax; i++) {
                        if (!$gameMap.isFloor(px - i, py)) {
                            break;
                        }
                        this.addForecastPanelOne(px - i, py);
                    }
                    break;
                case 6:
                    for (var i = 1; i <= rangeMax; i++) {
                        if (!$gameMap.isFloor(px + i, py)) {
                            break;
                        }
                        this.addForecastPanelOne(px + i, py);
                    }
                    break;
                case 7:
                    for (var i = 1; i <= rangeMax; i++) {
                        if (!$gameMap.isFloor(px - i, py - i)) {
                            break;
                        }
                        this.addForecastPanelOne(px - i, py - i);
                    }
                    break;
                case 8:
                    for (var i = 1; i <= rangeMax; i++) {
                        if (!$gameMap.isFloor(px, py - i)) {
                            break;
                        }
                        this.addForecastPanelOne(px, py - i);
                    }
                    break;
                case 9:
                    for (var i = 1; i <= rangeMax; i++) {
                        if (!$gameMap.isFloor(px + i, py - i)) {
                            break;
                        }
                        this.addForecastPanelOne(px + i, py - i);
                    }
                    break;
            }
            this.addDirectionArrow(0, -1, 0, 8);
            this.addDirectionArrow(1, -1, 4, 9);
            this.addDirectionArrow(1, 1, 5, 3);
            this.addDirectionArrow(-1, 1, 6, 1);
            this.addDirectionArrow(-1, -1, 7, 7);
            this.addDirectionArrow(1, 0, 1, 6);
            this.addDirectionArrow(0, 1, 2, 2);
            this.addDirectionArrow(-1, 0, 3, 4);
        };
        Spriteset_RogueMap.prototype.addDirectionArrowOne = function (x, y, d) {
            var num;
            switch (d) {
                case 8:
                    num = 0;
                    break;
                case 9:
                    num = 4;
                    break;
                case 3:
                    num = 5;
                    break;
                case 1:
                    num = 6;
                    break;
                case 7:
                    num = 7;
                    break;
                case 6:
                    num = 1;
                    break;
                case 2:
                    num = 2;
                    break;
                case 4:
                    num = 3;
                    break;
            }
            this.addDirectionArrow(x, y, num, d);
        };
        Spriteset_RogueMap.prototype.addDirectionPanel4 = function () {
            if (this._showDirection == $gamePlayer.direction()) {
                return;
            }
            this.removeAllForecastPanel();
            this.addDirectionArrow(1, -1, 4, 9);
            this.addDirectionArrow(1, 1, 5, 3);
            this.addDirectionArrow(-1, 1, 6, 1);
            this.addDirectionArrow(-1, -1, 7, 7);
        };
        Spriteset_RogueMap.prototype.removeAllForecastPanel = function () {
            this.removeAllArrowPanel();
            if (!this._forecastPanels || this._forecastPanels.length === 0) {
                return;
            }
            for (var _i = 0, _a = this._forecastPanels; _i < _a.length; _i++) {
                var s = _a[_i];
                s.destroy();
                this._tilemap.removeChild(s);
            }
            this._forecastPanels = [];
        };
        Spriteset_RogueMap.prototype.removeAllArrowPanel = function () {
            if (!this._arrowPanels || this._arrowPanels.length === 0) {
                return;
            }
            for (var _i = 0, _a = this._arrowPanels; _i < _a.length; _i++) {
                var s = _a[_i];
                s.destroy();
                this._arrowBase.removeChild(s);
            }
            this._arrowPanels = [];
            this._showDirection = 0;
        };
        Spriteset_RogueMap.prototype.removeAllEnemyForecastPanel = function () {
            if (!this._enemyForecastPanels || this._enemyForecastPanels.length === 0) {
                return;
            }
            for (var _i = 0, _a = this._enemyForecastPanels; _i < _a.length; _i++) {
                var sprite = _a[_i];
                sprite.destroy();
                this._forecastBase.removeChild(sprite);
            }
            this._enemyForecastPanels = [];
        };
        Spriteset_RogueMap.prototype.showEnemyForecast = function (event, action) {
            for (var _i = 0, _a = action.enemyAction().pointList(); _i < _a.length; _i++) {
                var point = _a[_i];
                this.setupEnemyForecast(point.x, point.y, action.waitCount());
            }
        };
        Spriteset_RogueMap.prototype.setupEnemyForecast = function (x, y, turn) {
            this.getEnemyForecast(x, y).setWaitTurn(turn);
        };
        Spriteset_RogueMap.prototype.getEnemyForecast = function (x, y) {
            for (var _i = 0, _a = this._enemyForecastPanels; _i < _a.length; _i++) {
                var s_1 = _a[_i];
                if (s_1.posX() == x && s_1.posY() == y) {
                    return s_1;
                }
            }
            var s = new Sprite_EnemyForecast(x, y);
            this._enemyForecastPanels.push(s);
            this._forecastBase.addChild(s);
            return s;
        };
        Spriteset_RogueMap.prototype.showEnemyForecastAll = function () {
            this.removeAllEnemyForecastPanel();
            for (var _i = 0, _a = $gameMap.events(); _i < _a.length; _i++) {
                var event_2 = _a[_i];
                if (event_2.enemy && event_2.enemy()) {
                    var enemy = event_2.enemy();
                    var action = enemy.currentAction();
                    if (!action || !action.waitCount()) {
                        continue;
                    }
                    this.showEnemyForecast(event_2, action);
                }
            }
        };
        Spriteset_RogueMap.prototype.showPlayerDirection = function () {
            if (!$gameSwitches.value(7)) {
                return;
            }
            if ($gamePlayer.isDefeat()) {
                return;
            }
            var d = $gamePlayer.direction();
            var pos = $gamePlayer.nextPos();
            this.addForecastPanelOne(pos.x, pos.y, 2);
            //\this.addDirectionArrowOne(pos.x - $gamePlayer.x, pos.y - $gamePlayer.y, d);
        };
        Spriteset_RogueMap.prototype.showAttackAnimation = function (x, y, direction, animeId, waitCount, onAnime) {
            if (onAnime === void 0) { onAnime = null; }
            var anime = new Sprite_AttackAnimation(x, y, direction, animeId, waitCount, onAnime);
            anime.start();
            this.addChild(anime);
            this._effectsContainer.addChild(anime.animeSprite());
            //this._animationSprites.push(anime.animeSprite());
        };
        Spriteset_RogueMap.prototype.skillChange = function () {
            var item = this._skillWindow.item();
            this.removeAllForecastPanel();
            if (item) {
                var action = new Game_Action($gameActors.actor(1));
                action.setSkill(item.id);
                var actionWithDir = new ActionWithDirection(action, $gamePlayer.direction());
                actionWithDir.calcPointList($gamePlayer);
                for (var _i = 0, _a = actionWithDir.pointList(); _i < _a.length; _i++) {
                    var point = _a[_i];
                    this.addForecastPanelOne(point.x, point.y, 0);
                }
            }
        };
        Spriteset_RogueMap.prototype.isAnimationPlaying = function (isFast) {
            if (isFast) {
                for (var _i = 0, _a = this._animationSprites; _i < _a.length; _i++) {
                    var s = _a[_i];
                    if (!s.isFastEnd()) {
                        return true;
                    }
                }
                return false;
            }
            else {
                for (var _b = 0, _c = this._animationSprites; _b < _c.length; _b++) {
                    var s = _c[_b];
                    if (!s.skipEffect) {
                        return true;
                    }
                }
                return false;
            }
        };
        Spriteset_RogueMap.prototype.findSprite = function (battler) {
            if (battler.isActor()) {
                return this.findPlayerSprite();
            }
            else {
                return this.findEnemySprite(battler);
            }
        };
        Spriteset_RogueMap.prototype.findPlayerSprite = function () {
            for (var _i = 0, _a = this._characterSprites; _i < _a.length; _i++) {
                var s = _a[_i];
                if (s.checkCharacter($gamePlayer)) {
                    return s;
                }
            }
            return null;
        };
        Spriteset_RogueMap.prototype.findEnemySprite = function (battler) {
            for (var _i = 0, _a = this._characterSprites; _i < _a.length; _i++) {
                var s = _a[_i];
                var c = s.character();
                if (c.isEnemy() && c.enemy() == battler) {
                    return s;
                }
            }
            return null;
        };
        return Spriteset_RogueMap;
    }(Spriteset_Map));
    Nore.Spriteset_RogueMap = Spriteset_RogueMap;
    var Sprite_AttackAnimation = /** @class */ (function (_super) {
        __extends(Sprite_AttackAnimation, _super);
        function Sprite_AttackAnimation(_posX, _posY, _directction, _animationId, _waitCount, _onAnime) {
            var _this = _super.call(this) || this;
            _this._posX = _posX;
            _this._posY = _posY;
            _this._directction = _directction;
            _this._animationId = _animationId;
            _this._waitCount = _waitCount;
            _this._onAnime = _onAnime;
            _this._offsetX = 0;
            _this._offsetY = 0;
            return _this;
        }
        Sprite_AttackAnimation.prototype.start = function () {
            var sprite = new Sprite_Animation();
            this._animeSprite = sprite;
            var animation = $dataAnimations[this._animationId];
            animation = JsonEx.makeDeepCopy(animation);
            /*this._directction = 4
            switch (this._directction) {
                case 7:
                    animation.rotation.z += 45;
                    this._offsetX = -1;
                    this._offsetY = -1;
                    animation.offsetX /= 1.41;
                    animation.offsetY /= 1.41;
                    break;
                case 4:
                    animation.rotation.z += 90;
                    this._offsetX = -1;
                    const t = animation.offsetX;
                    animation.offsetY = animation.offsetX;
                    animation.offsetX = t;
                    break;
                case 1:
                    animation.rotation.z += 135;
                    this._offsetX = -1;
                    this._offsetY = 1;
                    animation.offsetX /= 1.41;
                    animation.offsetY /= -1.41;
                    break;
                case 2:
                    animation.rotation.z += 180;
                    this._offsetY = 1;
                    animation.offsetY /= -1;
                    break;
                case 3:
                    animation.rotation.z += -135;
                    this._offsetX = 1;
                    this._offsetY = 1;
                    break;
                case 6:
                    animation.rotation.z += -90;
                    this._offsetX = 1;
                    break;
                case 9:
                    animation.rotation.z += -45;
                    this._offsetX = 1;
                    this._offsetY = -1;
                    animation.offsetX /= 1.41;
                    animation.offsetY /= 1.41;
                    break;
            }*/
            sprite.setup([this], animation, false, 0, null);
            this.addChild(sprite);
        };
        Sprite_AttackAnimation.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._waitCount > 0) {
                this._waitCount--;
                if (this._waitCount == 0) {
                    this._onAnime();
                    this._onAnime = null;
                    return;
                }
            }
            this.x = $gameMap.adjustX(this._posX + this._offsetX / 2) * $gameMap.tileWidth() + $gameMap.tileWidth() / 2;
            this.y = $gameMap.adjustY(this._posY + this._offsetY / 2) * $gameMap.tileHeight() + $gameMap.tileHeight() / 2;
            if (!this._animeSprite.isPlaying()) {
                if (this._onAnime) {
                    this._onAnime();
                }
                this.parent.removeChild(this);
            }
        };
        Sprite_AttackAnimation.prototype.animeSprite = function () {
            return this._animeSprite;
        };
        return Sprite_AttackAnimation;
    }(Sprite));
    Sprite_Animation.prototype.isFastEnd = function () {
        return this._frameIndex > 15;
    };
    var _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        _Sprite_Character_update.call(this);
        if (!$gameMap.isRogue()) {
            return;
        }
        if (this._character == $gamePlayer && $gamePlayer.isTransparent()) {
            return;
        }
        if (this._character.event) {
            if (this._character.event()) {
                var event_3 = this._character.event();
                if (event_3.name == 'visible') {
                    this.visible = true;
                    return;
                }
                if (event_3.meta['treasure']) {
                    this.visible = true;
                    return;
                }
                if (event_3.meta['stair']) {
                    this.visible = $gameMinimap.isMapping(this._character._x, this._character._y);
                    return;
                }
                if (event_3.meta['door']) {
                    this.visible = false;
                    if ($gamePlayer.room) {
                        if ($gamePlayer.room.isNearExit(this._character.x, this._character.y)) {
                            this.visible = true;
                        }
                    }
                    return;
                }
            }
        }
        var room1 = $gameMap.getRoom($gamePlayer.x, $gamePlayer.y);
        var room2 = $gameMap.getRoom(this._character._x, this._character._y);
        if (room1 && room1 == room2) {
            this.visible = true;
        }
        else {
            if ($gamePlayer.distance(this._character) <= 2) {
                this.visible = true;
                return;
            }
            this.visible = false;
        }
    };
    var Sprite_EnemyForecast = /** @class */ (function (_super) {
        __extends(Sprite_EnemyForecast, _super);
        function Sprite_EnemyForecast(_x, _y) {
            var _this = _super.call(this) || this;
            _this._x = _x;
            _this._y = _y;
            _this._turn = 10;
            _this.update();
            return _this;
        }
        Sprite_EnemyForecast.prototype.setWaitTurn = function (turn) {
            if (this._turn > turn) {
                this._turn = turn;
                this.update();
            }
        };
        Sprite_EnemyForecast.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._turn != this._imageTurn) {
                this.display();
            }
            this.x = $gameMap.adjustX(this._x) * $gameMap.tileWidth();
            this.y = $gameMap.adjustY(this._y) * $gameMap.tileHeight();
            var count = Graphics.frameCount % 60;
            var progress = count;
            if (count > 30) {
                progress = 60 - count;
            }
            this.opacity = 255 - progress * 3;
        };
        Sprite_EnemyForecast.prototype.display = function () {
            this.x = $gameMap.adjustX(this._x) * $gameMap.tileWidth();
            this.y = $gameMap.adjustY(this._y) * $gameMap.tileHeight();
            this.bitmap = ImageManager.loadCharacter('desti');
            var num = this._turn - 1;
            var xx = num % 4;
            var yy = 2;
            this.setFrame(48 * xx, 48 + yy * 48, 48, 48);
            this._imageTurn = this._turn;
        };
        Sprite_EnemyForecast.prototype.posX = function () {
            return this._x;
        };
        Sprite_EnemyForecast.prototype.posY = function () {
            return this._y;
        };
        return Sprite_EnemyForecast;
    }(Sprite));
    var Character_Aura = /** @class */ (function (_super) {
        __extends(Character_Aura, _super);
        function Character_Aura() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Character_Aura.prototype.characterName = function () {
            return 'aura';
        };
        Character_Aura.prototype.characterIndex = function () {
            return 0;
        };
        Character_Aura.prototype.screenX = function () {
            return 0;
        };
        Character_Aura.prototype.screenY = function () {
            return 8;
        };
        Character_Aura.prototype.hasStepAnime = function () {
            return true;
        };
        return Character_Aura;
    }(Game_Character));
    var Sprite_Aura = /** @class */ (function (_super) {
        __extends(Sprite_Aura, _super);
        function Sprite_Aura() {
            return _super.call(this, new Character_Aura()) || this;
        }
        Sprite_Aura.prototype.update = function () {
            this.visible = true;
            _super.prototype.update.call(this);
            this.character().update();
            this.visible = true;
        };
        Sprite_Aura.prototype.updateVisibility = function () {
            this.visible = true;
        };
        return Sprite_Aura;
    }(Sprite_Character));
    Nore.Sprite_Aura = Sprite_Aura;
    var Sprite_Enemy = /** @class */ (function (_super) {
        __extends(Sprite_Enemy, _super);
        function Sprite_Enemy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_Enemy.prototype.update = function () {
            _super.prototype.update.call(this);
            this.updateAura();
        };
        Sprite_Enemy.prototype.event = function () {
            return this.character();
        };
        Sprite_Enemy.prototype.updateAura = function () {
            var event = this.event();
            var enemy = event.enemy();
            if (enemy.currentAction() && enemy.currentAction().waitCount() > 0) {
                this.showAura();
            }
            else {
                this.hideAura();
            }
        };
        Sprite_Enemy.prototype.showAura = function () {
            if (this._auraSprite) {
                this._auraSprite.update();
                return;
            }
            this._auraSprite = new Sprite_Aura();
            this.addChild(this._auraSprite);
        };
        Sprite_Enemy.prototype.hideAura = function () {
            if (this._auraSprite) {
                this._auraSprite.destroy();
                this.removeChild(this._auraSprite);
                this._auraSprite = null;
                return;
            }
        };
        return Sprite_Enemy;
    }(Sprite_Character));
    Nore.Sprite_Enemy = Sprite_Enemy;
})(Nore || (Nore = {}));
