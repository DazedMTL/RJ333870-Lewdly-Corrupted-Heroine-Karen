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
    var Sprite_GaugeMini = /** @class */ (function (_super) {
        __extends(Sprite_GaugeMini, _super);
        function Sprite_GaugeMini() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.gaugeHeight = function () {
                return 5;
            };
            return _this;
        }
        Sprite_GaugeMini.prototype.bitmapWidth = function () {
            return 46;
        };
        Sprite_GaugeMini.prototype.bitmapHeight = function () {
            return 14;
        };
        Sprite_GaugeMini.prototype.gaugeX = function () {
            return 1;
        };
        Sprite_GaugeMini.prototype.label = function () {
            return '';
        };
        Sprite_GaugeMini.prototype.drawValue = function () {
        };
        Sprite_GaugeMini.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.currentValue() <= 0 || !$gameMap.isRogue() || $gameSwitches.value(15)) {
                this.visible = false;
            }
            if ($gamePlayer.isDefeat()) {
                this.visible = false;
            }
        };
        return Sprite_GaugeMini;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeMini = Sprite_GaugeMini;
    var Sprite_GaugeHp = /** @class */ (function (_super) {
        __extends(Sprite_GaugeHp, _super);
        function Sprite_GaugeHp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_GaugeHp.prototype.drawGaugeRect = function (x, y, width, height) {
            y--;
            width = 230;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            var fillH = height;
            var color3 = this.gaugeBackColor2();
            var color0 = this.gaugeBackColor();
            var color1 = this.gaugeColor1();
            var color2 = this.gaugeColor2();
            this.bitmap.fillRect(x - 1, y - 1, width + 2, height + 2, color3);
            this.bitmap.fillRect(x, y, width, height, color0);
            this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
        };
        ;
        Sprite_GaugeHp.prototype.label = function () {
            return '';
        };
        Sprite_GaugeHp.prototype.drawValue = function () {
        };
        Sprite_GaugeHp.prototype.gaugeBackColor = function () {
            return '#442222';
        };
        Sprite_GaugeHp.prototype.gaugeBackColor2 = function () {
            return '#FFFFFF';
        };
        Sprite_GaugeHp.prototype.gaugeColor1 = function () {
            return ColorManager.textColor(3);
        };
        Sprite_GaugeHp.prototype.gaugeColor2 = function () {
            return '#77dd50';
        };
        Sprite_GaugeHp.prototype.bitmapWidth = function () {
            return 350;
        };
        return Sprite_GaugeHp;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeHp = Sprite_GaugeHp;
    var Sprite_GaugeHp2 = /** @class */ (function (_super) {
        __extends(Sprite_GaugeHp2, _super);
        function Sprite_GaugeHp2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.updateTargetValue = function (value, maxValue) {
                this._targetValue = value;
                this._targetMaxValue = maxValue;
                this._value = value;
                this._maxValue = maxValue;
                this.redraw();
            };
            return _this;
        }
        Sprite_GaugeHp2.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/bar'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('bar');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/bar';
                PIXI.utils.BaseTextureCache['system/bar'] = baseTexture;
            }
            return baseTexture;
        };
        Sprite_GaugeHp2.prototype.drawGaugeRect = function (x, y, width, height) {
            y--;
            width = 230;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            this.removeChildren();
            if (fillW <= 1) {
                return;
            }
            this.drawLeft(-3);
            if (fillW <= 6) {
                this.drawRight(2);
                return;
            }
            var w = fillW - 6;
            var baseTexture = this.getBaseTexture();
            var texture2 = new PIXI.Texture(baseTexture, new PIXI.Rectangle(10, 40, 10, 10));
            var sprite2 = new PIXI.Sprite(texture2);
            sprite2.x = 1;
            sprite2.scale.x = w / 10;
            this.addChild(sprite2);
            this.drawRight(fillW - 6);
            /*const fillH = height;
            const color1 = this.gaugeColor1();
            const color2 = this.gaugeColor2();
            this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
            */
        };
        Sprite_GaugeHp2.prototype.drawLeft = function (xx) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 40, 5, 10));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = xx;
            this.addChild(sprite);
        };
        Sprite_GaugeHp2.prototype.drawRight = function (xx) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(226, 40, 3, 10));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = xx;
            this.addChild(sprite);
        };
        Sprite_GaugeHp2.prototype.label = function () {
            return '';
        };
        Sprite_GaugeHp2.prototype.drawValue = function () {
        };
        Sprite_GaugeHp2.prototype.gaugeBackColor = function () {
            return '#442222';
        };
        Sprite_GaugeHp2.prototype.gaugeBackColor2 = function () {
            return '#FFFFFF';
        };
        Sprite_GaugeHp2.prototype.gaugeColor1 = function () {
            return ColorManager.textColor(3);
        };
        Sprite_GaugeHp2.prototype.gaugeColor2 = function () {
            return '#77dd50';
        };
        Sprite_GaugeHp2.prototype.bitmapWidth = function () {
            return 350;
        };
        Sprite_GaugeHp2.prototype.gaugeHeight = function () {
            return 20;
        };
        Sprite_GaugeHp2.prototype.currentValue = function () {
            return $gameActors.mainActor().hp;
        };
        Sprite_GaugeHp2.prototype.currentMaxValue = function () {
            return $gameActors.mainActor().mhp;
        };
        return Sprite_GaugeHp2;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeHp2 = Sprite_GaugeHp2;
    var Sprite_GaugeProgress = /** @class */ (function (_super) {
        __extends(Sprite_GaugeProgress, _super);
        function Sprite_GaugeProgress(b, _current, _max) {
            var _this = _super.call(this, b) || this;
            _this._current = _current;
            _this._max = _max;
            return _this;
        }
        Sprite_GaugeProgress.prototype.drawGaugeRect = function (x, y, width, height) {
            y--;
            width = 180;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            var fillH = height;
            var color3 = this.gaugeBackColor2();
            var color0 = this.gaugeBackColor();
            var color1 = this.gaugeColor1();
            var color2 = this.gaugeColor2();
            this.bitmap.fillRect(x - 1, y - 1, width + 2, height + 2, color3);
            this.bitmap.fillRect(x, y, width, height, color0);
            this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
        };
        ;
        Sprite_GaugeProgress.prototype.label = function () {
            return '';
        };
        Sprite_GaugeProgress.prototype.drawValue = function () {
        };
        Sprite_GaugeProgress.prototype.gaugeRate = function () {
            var r = _super.prototype.gaugeRate.call(this);
            if (r > 1) {
                return 1;
            }
            return r;
        };
        Sprite_GaugeProgress.prototype.currentValue = function () {
            return this._current;
        };
        Sprite_GaugeProgress.prototype.currentMaxValue = function () {
            return this._max;
        };
        Sprite_GaugeProgress.prototype.isValid = function () {
            return true;
        };
        Sprite_GaugeProgress.prototype.gaugeBackColor = function () {
            return '#442222';
        };
        Sprite_GaugeProgress.prototype.gaugeBackColor2 = function () {
            return '#FFFFFF';
        };
        Sprite_GaugeProgress.prototype.gaugeColor1 = function () {
            if (this.gaugeRate() >= 1) {
                return ColorManager.textColor(24);
            }
            return ColorManager.textColor(3);
        };
        Sprite_GaugeProgress.prototype.gaugeColor2 = function () {
            if (this.gaugeRate() >= 1) {
                return ColorManager.textColor(24);
            }
            return '#77dd50';
        };
        Sprite_GaugeProgress.prototype.bitmapWidth = function () {
            return 300;
        };
        return Sprite_GaugeProgress;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeProgress = Sprite_GaugeProgress;
    var Sprite_GaugeArmor = /** @class */ (function (_super) {
        __extends(Sprite_GaugeArmor, _super);
        function Sprite_GaugeArmor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_GaugeArmor.prototype.drawGaugeRect = function (x, y, width, height) {
            y--;
            width = 230;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            var fillH = height;
            var color3 = this.gaugeBackColor2();
            var color0 = this.gaugeBackColor();
            var color1 = this.gaugeColor1();
            var color2 = this.gaugeColor2();
            this.bitmap.fillRect(x - 1, y - 1, width + 2, height + 2, color3);
            this.bitmap.fillRect(x, y, width, height, color0);
            this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
            var rate2 = this.gaugeRate2();
            var fillW2 = Math.floor((width) * rate2);
            var color5 = ColorManager.textColor(8);
            if (!fillW2 || isNaN(fillW2)) {
                return;
            }
            this.bitmap.gradientFillRect(x + width - fillW2, y, fillW2, fillH, color5, color5);
        };
        ;
        Sprite_GaugeArmor.prototype.label = function () {
            return '';
        };
        Sprite_GaugeArmor.prototype.drawValue = function () {
        };
        Sprite_GaugeArmor.prototype.isValid = function () {
            return true;
        };
        Sprite_GaugeArmor.prototype.gaugeRate2 = function () {
            if (!this._battler) {
                return 0;
            }
            return this._battler._minusArmor / this._battler._maxArmor;
        };
        Sprite_GaugeArmor.prototype.currentValue = function () {
            if (this._battler) {
                return this._battler.armor();
            }
            return NaN;
        };
        Sprite_GaugeArmor.prototype.currentMaxValue = function () {
            if (this._battler) {
                return this._battler._maxArmor;
            }
            return NaN;
        };
        Sprite_GaugeArmor.prototype.gaugeBackColor = function () {
            return '#442222';
        };
        Sprite_GaugeArmor.prototype.gaugeBackColor2 = function () {
            return '#FFFFFF';
        };
        Sprite_GaugeArmor.prototype.gaugeColor1 = function () {
            return '#cc00a0';
        };
        Sprite_GaugeArmor.prototype.gaugeColor2 = function () {
            return '#dd44a0';
        };
        Sprite_GaugeArmor.prototype.bitmapWidth = function () {
            return 350;
        };
        return Sprite_GaugeArmor;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeArmor = Sprite_GaugeArmor;
    var Sprite_GaugeMp = /** @class */ (function (_super) {
        __extends(Sprite_GaugeMp, _super);
        function Sprite_GaugeMp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_GaugeMp.prototype.drawGaugeRect = function (x, y, width, height) {
            y--;
            width = 77;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            this.removeChildren();
            if (fillW <= 1) {
                return;
            }
            this.drawLeft(-3);
            if (fillW <= 6) {
                this.drawRight(2);
                return;
            }
            var w = fillW - 6;
            var baseTexture = this.getBaseTexture();
            var texture2 = new PIXI.Texture(baseTexture, new PIXI.Rectangle(10, 0, 10, 10));
            var sprite2 = new PIXI.Sprite(texture2);
            sprite2.x = 1;
            sprite2.scale.x = w / 10;
            this.addChild(sprite2);
            this.drawRight(fillW - 6);
            /*const color3 = this.gaugeBackColor2();
            const color0 = this.gaugeBackColor();
            const color1 = this.gaugeColor1();
            const color2 = this.gaugeColor2();
            this.bitmap.fillRect(x - 1, y - 1, width + 2, height + 2, color3);
            this.bitmap.fillRect(x, y, width, height, color0);
            this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);*/
        };
        Sprite_GaugeMp.prototype.drawLeft = function (xx) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, 5, 10));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = xx;
            this.addChild(sprite);
        };
        Sprite_GaugeMp.prototype.drawRight = function (xx) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(75, 0, 2, 10));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = xx;
            this.addChild(sprite);
        };
        Sprite_GaugeMp.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/bar'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('bar');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/bar';
                PIXI.utils.BaseTextureCache['system/bar'] = baseTexture;
            }
            return baseTexture;
        };
        Sprite_GaugeMp.prototype.gaugeHeight = function () {
            return 20;
        };
        Sprite_GaugeMp.prototype.label = function () {
            return '';
        };
        Sprite_GaugeMp.prototype.drawValue = function () {
        };
        Sprite_GaugeMp.prototype.gaugeBackColor = function () {
            return '#442222';
        };
        Sprite_GaugeMp.prototype.gaugeBackColor2 = function () {
            return '#FFFFFF';
        };
        Sprite_GaugeMp.prototype.gaugeColor1 = function () {
            return '#cc00a0';
        };
        Sprite_GaugeMp.prototype.gaugeColor2 = function () {
            return '#dd44a0';
        };
        return Sprite_GaugeMp;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeMp = Sprite_GaugeMp;
    var Sprite_GaugeEnemyHp = /** @class */ (function (_super) {
        __extends(Sprite_GaugeEnemyHp, _super);
        function Sprite_GaugeEnemyHp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_GaugeEnemyHp.prototype.drawGaugeRect = function (x, y, width, height) {
            x = 0;
            y = 0;
            width = 144;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            var fillH = height;
            var color0 = this.gaugeBackColor();
            var color1 = this.gaugeColor1();
            var color2 = this.gaugeColor2();
            this.bitmap.fillRect(x, y, width, height, color0);
            this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
        };
        ;
        Sprite_GaugeEnemyHp.prototype.label = function () {
            return '';
        };
        Sprite_GaugeEnemyHp.prototype.drawValue = function () {
        };
        Sprite_GaugeEnemyHp.prototype.gaugeBackColor = function () {
            return '#aa2222';
        };
        Sprite_GaugeEnemyHp.prototype.gaugeColor1 = function () {
            return ColorManager.textColor(3);
        };
        Sprite_GaugeEnemyHp.prototype.gaugeColor2 = function () {
            return '#77dd50';
        };
        return Sprite_GaugeEnemyHp;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeEnemyHp = Sprite_GaugeEnemyHp;
    var Sprite_GaugeBoss = /** @class */ (function (_super) {
        __extends(Sprite_GaugeBoss, _super);
        function Sprite_GaugeBoss() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_GaugeBoss.prototype.drawGaugeRect = function (x, y, width, height) {
            x = 0;
            y = 0;
            width = 444;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            var fillH = height;
            var color0 = this.gaugeBackColor();
            var color1 = this.gaugeColor1();
            var color2 = this.gaugeColor2();
            this.bitmap.fillRect(x, y, width, height, color0);
            this.bitmap.gradientFillRect(x, y, fillW, fillH, color1, color2);
        };
        ;
        Sprite_GaugeBoss.prototype.label = function () {
            return '';
        };
        Sprite_GaugeBoss.prototype.drawValue = function () {
        };
        Sprite_GaugeBoss.prototype.gaugeBackColor = function () {
            return '#aa2222';
        };
        Sprite_GaugeBoss.prototype.gaugeColor1 = function () {
            return ColorManager.textColor(3);
        };
        Sprite_GaugeBoss.prototype.gaugeColor2 = function () {
            return '#77dd50';
        };
        Sprite_GaugeBoss.prototype.bitmapWidth = function () {
            return 500;
        };
        return Sprite_GaugeBoss;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeBoss = Sprite_GaugeBoss;
    var Sprite_GaugeLevel = /** @class */ (function (_super) {
        __extends(Sprite_GaugeLevel, _super);
        function Sprite_GaugeLevel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.updateTargetValue = function (value, maxValue) {
                this._targetValue = value;
                this._targetMaxValue = maxValue;
                this._value = value;
                this._maxValue = maxValue;
                this.redraw();
            };
            return _this;
        }
        Sprite_GaugeLevel.prototype.drawGaugeRect = function (x, y, width, height) {
            width = 105;
            height = 8;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            this.removeChildren();
            if (fillW <= 1) {
                return;
            }
            this.drawLeft(-3);
            if (fillW <= 6) {
                this.drawRight(2);
                return;
            }
            var w = fillW - 6;
            var baseTexture = this.getBaseTexture();
            var texture2 = new PIXI.Texture(baseTexture, new PIXI.Rectangle(10, 20, 10, 10));
            var sprite2 = new PIXI.Sprite(texture2);
            sprite2.x = 1;
            sprite2.scale.x = w / 10;
            this.addChild(sprite2);
            this.drawRight(fillW - 6);
        };
        Sprite_GaugeLevel.prototype.gaugeX = function () {
            return 2;
        };
        Sprite_GaugeLevel.prototype.isValid = function () {
            return true;
        };
        Sprite_GaugeLevel.prototype.drawLeft = function (xx) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 20, 5, 10));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = xx;
            this.addChild(sprite);
        };
        Sprite_GaugeLevel.prototype.drawRight = function (xx) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(102, 20, 3, 10));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = xx;
            this.addChild(sprite);
        };
        Sprite_GaugeLevel.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/bar'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('bar');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/bar';
                PIXI.utils.BaseTextureCache['system/bar'] = baseTexture;
            }
            return baseTexture;
        };
        Sprite_GaugeLevel.prototype.gaugeHeight = function () {
            return 20;
        };
        Sprite_GaugeLevel.prototype.currentValue = function () {
            if (this._battler) {
                return this._battler.currentExp() - this._battler.currentLevelExp();
            }
            return NaN;
        };
        Sprite_GaugeLevel.prototype.currentMaxValue = function () {
            if (this._battler) {
                return this._battler.nextLevelExp() - this._battler.currentLevelExp();
            }
            return NaN;
        };
        Sprite_GaugeLevel.prototype.gaugeRate = function () {
            if ($gameActors.mainActor().isMaxLevel()) {
                //return 1;
            }
            return Math.min(1, _super.prototype.gaugeRate.call(this));
        };
        Sprite_GaugeLevel.prototype.label = function () {
            return '';
        };
        Sprite_GaugeLevel.prototype.drawValue = function () {
        };
        Sprite_GaugeLevel.prototype.gaugeBackColor = function () {
            return '#000000';
        };
        Sprite_GaugeLevel.prototype.gaugeColor1 = function () {
            return ColorManager.hpGaugeColor1();
        };
        Sprite_GaugeLevel.prototype.gaugeColor2 = function () {
            return ColorManager.hpGaugeColor2();
        };
        Sprite_GaugeLevel.prototype.bitmapWidth = function () {
            return 88;
        };
        ;
        return Sprite_GaugeLevel;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeLevel = Sprite_GaugeLevel;
    var Sprite_GaugeEro = /** @class */ (function (_super) {
        __extends(Sprite_GaugeEro, _super);
        function Sprite_GaugeEro() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.gaugeRate = function () {
                var value = this._value;
                var maxValue = this._maxValue;
                return maxValue > 0 ? value / maxValue : 0;
            };
            return _this;
        }
        Sprite_GaugeEro.prototype.drawGaugeRect = function (x, y, width, height) {
            width = 368;
            height = 8;
            var rate = this.gaugeRate();
            var fillW = Math.floor((width) * rate);
            var fillH = height;
            var color0 = this.gaugeBackColor();
            var color1 = this.gaugeColor1();
            var color2 = this.gaugeColor2();
            this.bitmap.fillRect(x - 1, y - 1, height + 2, width + 2, '#ffffff');
            this.bitmap.fillRect(x, y, height, width, color0);
            this.bitmap.gradientFillRect(x, y + (width - fillW), fillH, fillW, color1, color2);
        };
        Sprite_GaugeEro.prototype.smoothness = function () {
            if (this.currentValue() == 0) {
                return 20;
            }
            if (this.currentValue() >= 100) {
                return 20;
            }
            return 180;
        };
        Sprite_GaugeEro.prototype.createBitmap = function () {
            var width = this.bitmapWidth();
            var height = this.bitmapHeight();
            this.bitmap = new Bitmap(width, 800);
        };
        ;
        Sprite_GaugeEro.prototype.bitmapWidth = function () {
            return 146;
        };
        Sprite_GaugeEro.prototype.bitmapHeight = function () {
            return 214;
        };
        Sprite_GaugeEro.prototype.gaugeHeight = function () {
            return 25;
        };
        Sprite_GaugeEro.prototype.gaugeX = function () {
            return 11;
        };
        Sprite_GaugeEro.prototype.label = function () {
            return '';
        };
        Sprite_GaugeEro.prototype.drawValue = function () {
        };
        Sprite_GaugeEro.prototype.currentValue = function () {
            var actor = $gameActors.actor(1);
            return Math.min(actor.estrus, 100);
        };
        Sprite_GaugeEro.prototype.currentMaxValue = function () {
            return 100;
        };
        Sprite_GaugeEro.prototype.gaugeBackColor = function () {
            return '#000000';
        };
        Sprite_GaugeEro.prototype.gaugeColor1 = function () {
            return '#cc00a0';
        };
        Sprite_GaugeEro.prototype.gaugeColor2 = function () {
            return '#dd44a0';
        };
        Sprite_GaugeEro.prototype.update = function () {
            this.visible = false;
            return;
            _super.prototype.update.call(this);
        };
        return Sprite_GaugeEro;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeEro = Sprite_GaugeEro;
    var Sprite_GaugeNinshin = /** @class */ (function (_super) {
        __extends(Sprite_GaugeNinshin, _super);
        function Sprite_GaugeNinshin(_param) {
            var _this = _super.call(this) || this;
            _this._param = _param;
            return _this;
        }
        Sprite_GaugeNinshin.prototype.label = function () {
            return '';
        };
        Sprite_GaugeNinshin.prototype.drawValue = function () {
        };
        Sprite_GaugeNinshin.prototype.currentValue = function () {
            return this._param.sanke;
        };
        Sprite_GaugeNinshin.prototype.currentMaxValue = function () {
            return 100;
        };
        Sprite_GaugeNinshin.prototype.gaugeBackColor = function () {
            return '#442222';
        };
        Sprite_GaugeNinshin.prototype.gaugeBackColor2 = function () {
            return '#FFFFFF';
        };
        Sprite_GaugeNinshin.prototype.gaugeColor1 = function () {
            return ColorManager.textColor(3);
        };
        Sprite_GaugeNinshin.prototype.gaugeColor2 = function () {
            return '#77dd50';
        };
        Sprite_GaugeNinshin.prototype.bitmapWidth = function () {
            return 260;
        };
        Sprite_GaugeNinshin.prototype.isValid = function () {
            return true;
        };
        return Sprite_GaugeNinshin;
    }(Sprite_Gauge));
    Nore.Sprite_GaugeNinshin = Sprite_GaugeNinshin;
})(Nore || (Nore = {}));
