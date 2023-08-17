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
    var INVISIBLE_MAP_IDS = [4, 13];
    function getBinSprite(index) {
        if (index === void 0) { index = 0; }
        var baseTexture = PIXI.utils.BaseTextureCache['system/bin'];
        if (!baseTexture) {
            var bitmap = ImageManager.loadSystem('bin');
            if (!bitmap.isReady()) {
                return;
            }
            baseTexture = new PIXI.BaseTexture(bitmap._image);
            baseTexture.resource.url = 'system/bin';
            PIXI.utils.BaseTextureCache['system/bin'] = baseTexture;
        }
        return new PIXI.Sprite(new PIXI.Texture(baseTexture, new Rectangle(index * 30, 0, 30, 36)));
    }
    Nore.getBinSprite = getBinSprite;
    function getYamiSprite() {
        var baseTexture = PIXI.utils.BaseTextureCache['system/yami'];
        if (!baseTexture) {
            var bitmap = ImageManager.loadSystem('yami');
            if (!bitmap.isReady()) {
                return;
            }
            baseTexture = new PIXI.BaseTexture(bitmap._image);
            baseTexture.resource.url = 'system/yami';
            PIXI.utils.BaseTextureCache['system/yami'] = baseTexture;
        }
        return new PIXI.Sprite(new PIXI.Texture(baseTexture));
    }
    Nore.getYamiSprite = getYamiSprite;
    function getSystemBaseTexture(name) {
        var baseTexture = PIXI.utils.BaseTextureCache['system/' + name];
        if (!baseTexture) {
            var bitmap = ImageManager.loadSystem(name);
            if (!bitmap.isReady()) {
                return;
            }
            baseTexture = new PIXI.BaseTexture(bitmap._image);
            baseTexture.resource.url = 'system/' + name;
            PIXI.utils.BaseTextureCache['system/' + name] = baseTexture;
        }
        return baseTexture;
    }
    Nore.getSystemBaseTexture = getSystemBaseTexture;
    var Window_RogueUi = /** @class */ (function (_super) {
        __extends(Window_RogueUi, _super);
        function Window_RogueUi(r) {
            var _this = _super.call(this, r) || this;
            _this.backOpacity = 0;
            _this.y = -0;
            return _this;
        }
        Window_RogueUi.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.isChanged()) {
                this.refresh();
            }
            this.visible = this.isVisible();
        };
        Window_RogueUi.prototype.isVisible = function () {
            if ($gameSwitches.value(18)) {
                return false;
            }
            if ($gameSwitches.value(999) && !$gameSwitches.value(998)) {
                return false;
            }
            if (INVISIBLE_MAP_IDS.indexOf($gameMap.mapId()) >= 0) {
                return false;
            }
            return true;
        };
        Window_RogueUi.prototype.hideBattleGauge = function () {
            if (this._hpGauge) {
                this.removeChild(this._hpGauge);
                this._hpGauge = null;
            }
            if (this._armorGauge) {
                this.removeChild(this._armorGauge);
                this._armorGauge = null;
            }
            if (this._levelGauge) {
                this.removeChild(this._levelGauge);
                this._levelGauge = null;
            }
        };
        Window_RogueUi.prototype._createFrameSprite = function () {
            this._frameSprite = new Sprite();
        };
        Window_RogueUi.prototype._refreshFrame = function () {
        };
        Window_RogueUi.prototype.isChanged = function () {
            if (this._lastTurn != $gamePlayer.turnCount()) {
                return true;
            }
            if (this._lastHp != this.actor().hp) {
                return true;
            }
            if (this._lastZasetsu != this.actor().zasetsu) {
                return true;
            }
            if (this._lastEroPower != this.actor().eroPower) {
                return true;
            }
            /*if (this._lastArmor != this.actor().armor()) {
                return true;
            }*/
            /*if (this._lastMaxArmor != this.actor().maxArmor()) {
                return true;
            }*/
            if (this._lastMp != this.actor().mp) {
                return true;
            }
            if (this._lastLevel != this.actor()._level) {
                return true;
            }
            if (this._lastGold != $gameParty.gold()) {
                return true;
            }
            if (this._lastEther != $gameParty.ether()) {
                return true;
            }
            if (this._lastNight != $gameSwitches.value(12)) {
                return true;
            }
            /*if (this._lastArrow != $gameParty.arrow()) {
                return true;
            }*/
            if (this.isStateChanged()) {
                return true;
            }
            return false;
        };
        Window_RogueUi.prototype.isStateChanged = function () {
            if (!this._lastStates) {
                return false;
            }
            var count1 = 0;
            var count2 = 0;
            for (var s in this.actor()._stateTurns) {
                count1++;
                if (this._lastStates[s] != this.actor()._stateTurns[s]) {
                    return true;
                }
            }
            for (var s in this._lastStates) {
                count2++;
            }
            return count1 != count2;
        };
        Window_RogueUi.prototype.actor = function () {
            return $gameActors.mainActor();
        };
        Window_RogueUi.prototype.refresh = function () {
            this._windowContentsSprite.removeChildren();
            this._lastTurn = $gamePlayer.turnCount();
            this.contents.clear();
            this.drawBg();
            this._lastZasetsu = this.actor().zasetsu;
            this._lastEroPower = this.actor().eroPower;
            this._lastNight = $gameSwitches.value(12);
            this.drawBattleUi();
            /*
            if ($gameSwitches.value(12)) {
                this.hideBattleGauge();
            } else {
                this.drawBattleUi();
            }
            */
        };
        Window_RogueUi.prototype.drawBg = function () {
            var baseTexture = this.getBaseTexture();
            var xx = 0;
            if (!$gameSwitches.value(1)) {
                xx = 150;
            }
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(xx, 0, baseTexture.width - xx, baseTexture.height));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = xx;
            this._windowContentsSprite.addChild(sprite);
        };
        Window_RogueUi.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/ui2'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('ui2');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/ui2';
                PIXI.utils.BaseTextureCache['system/ui2'] = baseTexture;
            }
            return baseTexture;
        };
        Window_RogueUi.prototype.drawZasetsu = function (x) {
            var y = 60;
            this.drawLabel(8, x - 52, y);
            var actor = this.actor();
            this.drawNumber(actor.zasetsu, x + 78, y, 60, 'right', 2);
        };
        Window_RogueUi.prototype.drawBattleUi = function () {
            this.drawDay(0);
            this.drawFloor(10);
            var xxx = 310;
            this.drawLevel(xxx);
            xxx = 430;
            this.drawHp(xxx);
            this.drawMp(xxx);
            //this.drawArmor(xxx);
            this.drawState(xxx + 160);
            //this.drawEroState();
            xxx = 800;
            //if ($gameActors.mainActor()._classId == 2) {
            this.drawEroPower(xxx);
            //}
            //this.drawZasetsu(xxx + 40);
            this.drawGold(xxx);
            this._lastEther = $gameParty.ether();
            if ($gameSwitches.value(74)) {
                this.drawEther(xxx);
            }
        };
        Window_RogueUi.prototype.drawDay = function () {
        };
        Window_RogueUi.prototype.drawFloor = function (x) {
            if (!$gameSwitches.value(1)) {
                return;
            }
            var floor = $gameVariables.value(2);
            this.drawNumber(floor, x, 5, 60, 'right', 3);
        };
        Window_RogueUi.prototype.drawLevel = function (x) {
            this._lastLevel = this.actor()._level;
            var actor = this.actor();
            var yy = 6;
            this.drawNumber(actor.level, x + 28, yy, 60, 'right', 2);
            var sprite2 = new Nore.Sprite_GaugeLevel();
            sprite2.setup(actor, 'hp');
            sprite2.move(x - 21, 58);
            sprite2.show();
            this._levelGauge = sprite2;
            this.addChild(this._levelGauge);
        };
        Window_RogueUi.prototype.drawHp = function (x) {
            this._lastHp = this.actor().hp;
            var actor = this.actor();
            this.contents.fontSize = 32;
            var yy = 4;
            //this.drawText('HP', x, 20, 100, 'left');
            this.drawNumber(Math.floor(actor.hp), x + 110, yy, 60, 'right', 1);
            this.drawNumber(actor.mhp, x + 190, yy, 60, 'right', 1);
            var sprite = new Nore.Sprite_GaugeHp2();
            sprite.setup(actor, 'hp');
            sprite.move(x + 7, 56);
            sprite.show();
            this._hpGauge = sprite;
            this.addChild(this._hpGauge);
        };
        Window_RogueUi.prototype.drawArmor = function (x) {
            this._lastArmor = this.actor().armor();
            this._lastMaxArmor = this.actor().maxArmor();
            var actor = this.actor();
            this.contents.fontSize = 32;
            //this.drawText('HP', x, 20, 100, 'left');
            this.drawLabel(7, x, 80);
            this.drawNumber(Math.floor(actor.armor()), x + 100, 80, 60, 'right', 2);
            this.drawNumberOne(10, x + 154, 80, 2);
            this.drawNumber(actor.maxArmor(), x + 180, 80, 60, 'right', 2);
            var sprite = new Nore.Sprite_GaugeArmor();
            sprite.setup(actor);
            sprite.move(x - 86, 110);
            sprite.show();
            this._armorGauge = sprite;
            this.addChild(this._armorGauge);
        };
        Window_RogueUi.prototype.drawMp = function (x) {
            this._lastMp = this.actor().mp;
            var actor = this.actor();
            this.contents.fontSize = 32;
            var y = 70;
            this.drawNumber(Math.floor(actor.mp), x + 80, y, 60, 'right', 2);
            this.drawNumber(actor.mmp, x + 134, y, 60, 'right', 2);
            var sprite = new Nore.Sprite_GaugeMp();
            sprite.setup(actor, 'mp');
            sprite.move(x + 8, y + 53);
            sprite.show();
            this._mpGauge = sprite;
            this.addChild(this._mpGauge);
        };
        Window_RogueUi.prototype.drawState = function (x) {
            this._lastStates = JsonEx.makeDeepCopy(this.actor()._stateTurns);
            this.contents.fontSize = 15;
            var yy = 79 + 8;
            for (var _i = 0, _a = this.actor().states(); _i < _a.length; _i++) {
                var s = _a[_i];
                if (s.id == 1 || s.meta['ero']) {
                    continue;
                }
                this.drawIcon(s.iconIndex, x, yy);
                var turn = this.actor()._stateTurns[s.id];
                this.drawText(turn, x - 2, yy + 5, 30, 'right');
                x += 32;
            }
        };
        Window_RogueUi.prototype.drawEroState = function () {
            var x = 760;
            var y = 100;
            this.contents.fontSize = 28;
            for (var _i = 0, _a = this.actor().states(); _i < _a.length; _i++) {
                var s = _a[_i];
                if (!s.meta['ero']) {
                    continue;
                }
                this.drawIcon(s.iconIndex, x, y);
                this.drawText(s.name, x + 36, y, 200);
                y += 32;
            }
        };
        Window_RogueUi.prototype.drawArrow = function (x) {
            var n = $gameParty.arrow();
            this._lastArrow = n;
            this.contents.fontSize = 22;
            this.drawIcon(422, x, 20);
            this.drawText(n, x + 6, 20, 60, 'right');
            this.drawText('/', x + 70, 20, 100, 'left');
            this.drawText($gameParty.maxArrow(), x + 50, 20, 60, 'right');
        };
        Window_RogueUi.prototype.drawEroPower = function (x) {
            var actor = this.actor();
            this.drawNumber(actor.eroPower, x + 88, 5, 60, 'right', 2);
        };
        Window_RogueUi.prototype.drawGold = function (x) {
            this._lastGold = $gameParty.gold();
            var y = 45;
            this.contents.fontSize = 22;
            this.drawNumber(this._lastGold, x + 88, y, 60, 'right', 2);
        };
        Window_RogueUi.prototype.drawEther = function (x) {
            var y = 85;
            this.contents.fontSize = 22;
            this.drawNumber(this._lastEther, x + 88, y, 60, 'right', 2);
            var s = getBinSprite();
            s.x = 784;
            s.y = 84;
            this._contentsSprite.addChild(s);
        };
        return Window_RogueUi;
    }(Window_Base));
    Nore.Window_RogueUi = Window_RogueUi;
})(Nore || (Nore = {}));
var TutoArrow = /** @class */ (function (_super) {
    __extends(TutoArrow, _super);
    function TutoArrow(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this._startX = x;
        _this._xDist = 20;
        _this._targetX = x + _this._xDist;
        _this._tutoSprite = _this.drawLabel(10, 160, 10);
        _this._duration = 28;
        _this._wholeDuration = _this._duration;
        return _this;
    }
    TutoArrow.prototype.drawLabel = function (type, x, y) {
        var baseTexture = Nore.getBaseTexture();
        if (!baseTexture) {
            return;
        }
        var pw = 96;
        var texture = new PIXI.Texture(baseTexture);
        texture.frame = new PIXI.Rectangle(96 * type, 0, pw, 48);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = x;
        sprite.y = y;
        this.addChild(sprite);
        return sprite;
    };
    TutoArrow.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateMove();
    };
    TutoArrow.prototype.updateMove = function () {
        if (this._duration > 0) {
            this.x = this.applyEasing(this.x, this._targetX);
            this._duration--;
        }
        if (this._duration == 0) {
            if (this._toLeft) {
                this._toLeft = false;
                this._targetX = this._startX + this._xDist;
            }
            else {
                this._toLeft = true;
                this._targetX = this._startX;
            }
            this._duration = this._wholeDuration;
        }
    };
    ;
    TutoArrow.prototype.applyEasing = function (current, target) {
        var d = this._duration;
        var wd = this._wholeDuration;
        var lt = this.calcEasing((wd - d) / wd);
        var t = this.calcEasing((wd - d + 1) / wd);
        var start = (current - target * lt) / (1 - lt);
        return start + (target - start) * t;
    };
    TutoArrow.prototype.calcEasing = function (t) {
        var exponent = 2;
        switch (3) {
            case 1: // Slow start
                return this.easeIn(t, exponent);
            case 2: // Slow end
                return this.easeOut(t, exponent);
            case 3: // Slow start and end
                return this.easeInOut(t, exponent);
            default:
                return t;
        }
    };
    ;
    TutoArrow.prototype.easeIn = function (t, exponent) {
        return Math.pow(t, exponent);
    };
    TutoArrow.prototype.easeOut = function (t, exponent) {
        return 1 - Math.pow(1 - t, exponent);
    };
    TutoArrow.prototype.easeInOut = function (t, exponent) {
        if (t < 0.5) {
            return this.easeIn(t * 2, exponent) / 2;
        }
        else {
            return this.easeOut(t * 2 - 1, exponent) / 2 + 0.5;
        }
    };
    return TutoArrow;
}(Sprite_Clickable));
