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
    var Sprite_Boss = /** @class */ (function (_super) {
        __extends(Sprite_Boss, _super);
        function Sprite_Boss() {
            var _this = _super.call(this) || this;
            _this._yy = 54;
            _this.visible = false;
            _this.x = 300;
            _this.y = 500;
            return _this;
        }
        Sprite_Boss.prototype.init = function () {
            this.bitmap = new Bitmap(600, 200);
            this.bitmap.fillRect(0, 0, 500, 54, '#00000077');
            this.drawBossName();
            this.createGauge();
        };
        Sprite_Boss.prototype.drawBossName = function () {
            var boss = $gameMap.boss();
            this.bitmap.drawText(boss.enemy().name(), 10, 0, 200, 40, 'left');
            var boss2 = $gameMap.boss2();
            if (boss2) {
                this.bitmap.fillRect(0, this._yy, 500, 54, '#00000077');
                this.bitmap.drawText(boss2.enemy().name(), 10, this._yy, 200, 40, 'left');
            }
            else {
                this.bitmap.fillRect(0, this._yy, 500, 10, '#00000077');
            }
        };
        Sprite_Boss.prototype.createGauge = function () {
            var boss = $gameMap.boss();
            var sprite = new Nore.Sprite_GaugeBoss();
            sprite.setup(boss.enemy(), 'hp');
            sprite.move(10, 32);
            sprite.show();
            this._hpGauge = sprite;
            this.addChild(this._hpGauge);
            var boss2 = $gameMap.boss2();
            if (boss2) {
                var sprite2 = new Nore.Sprite_GaugeBoss();
                sprite2.setup(boss2.enemy(), 'hp');
                sprite2.move(10, 32 + this._yy);
                sprite2.show();
                this._hpGauge2 = sprite2;
                this.addChild(this._hpGauge2);
            }
        };
        Sprite_Boss.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!$gameSwitches.value(1) || $gameSwitches.value(14)) {
                this.visible = false;
                return;
            }
            if (!$gamePlayer.room || $gamePlayer.room.enemyCount() == 0) {
                this.visible = false;
                return;
            }
            if ($gamePlayer.isDefeat()) {
                this.visible = false;
                return;
            }
            if ($gameMap.isBossFloor()) {
                this.visible = true;
                if (!this._hpGauge) {
                    this.init();
                }
                else {
                }
            }
            else {
                this.visible = false;
            }
        };
        return Sprite_Boss;
    }(Sprite));
    Nore.Sprite_Boss = Sprite_Boss;
    Game_Enemy.prototype.isBoss = function () {
        return this.enemy().meta['boss'];
    };
})(Nore || (Nore = {}));
var Game_Boss = /** @class */ (function () {
    function Game_Boss(_bossEventId) {
        this._bossEventId = _bossEventId;
    }
    Game_Boss.prototype.initBoss = function () {
        var event = this.bossEvent();
        this._hpBorderList = [25, 50, 75];
        this._lastBorder = 100;
    };
    Game_Boss.prototype.update = function () {
        this.checkBorder();
    };
    Game_Boss.prototype.bossEvent = function () {
        return $gameMap.event(this._bossEventId);
    };
    Game_Boss.prototype.enemy = function () {
        return $gameMap.event(this._bossEventId).enemy();
    };
    Game_Boss.prototype.checkBorder = function () {
        var percent = this.enemy().hpRate() * 100;
        for (var _i = 0, _a = this._hpBorderList; _i < _a.length; _i++) {
            var border = _a[_i];
            if (border >= this._lastBorder && border < percent) {
                this.gainBorderBonus();
            }
        }
    };
    Game_Boss.prototype.gainBorderBonus = function () {
        p('gainBorderBonus');
    };
    Game_Boss.prototype.isDead = function () {
        return this.enemy().isDead();
    };
    return Game_Boss;
}());
