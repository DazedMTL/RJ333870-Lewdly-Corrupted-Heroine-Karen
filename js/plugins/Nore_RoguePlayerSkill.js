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
    var Sprite_PlayerMove = /** @class */ (function (_super) {
        __extends(Sprite_PlayerMove, _super);
        function Sprite_PlayerMove(_maxRange, direction) {
            var _this = _super.call(this, $gamePlayer) || this;
            _this._maxRange = _maxRange;
            _this._frameIndex = 0;
            _this._moveDistance = -1;
            _this._direction = direction;
            _this._x = $gamePlayer.x;
            _this._y = $gamePlayer.y;
            _this.x = $gamePlayer.screenX();
            _this.y = $gamePlayer.screenY();
            _this.checkNext();
            return _this;
        }
        Sprite_PlayerMove.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.finished()) {
                return;
            }
            this.move();
            if (this._frameIndex == 48) {
                this._frameIndex = 0;
                switch (this._direction) {
                    case 1:
                        this._x--;
                        this._y++;
                        break;
                    case 2:
                        this._y++;
                        break;
                    case 3:
                        this._x++;
                        this._y++;
                        break;
                    case 4:
                        this._x--;
                        break;
                    case 6:
                        this._x++;
                        break;
                    case 7:
                        this._x--;
                        this._y--;
                        break;
                    case 8:
                        this._y--;
                        break;
                    case 9:
                        this._x++;
                        this._y--;
                        break;
                }
                this.checkNext();
            }
        };
        Sprite_PlayerMove.prototype.updateVisibility = function () {
            this.visible = true;
        };
        Sprite_PlayerMove.prototype.updatePosition = function () {
        };
        Sprite_PlayerMove.prototype.move = function () {
            var d = this.speed();
            this._frameIndex += d;
            switch (this._direction) {
                case 1:
                    this.x -= d;
                    this.y += d;
                    break;
                case 2:
                    this.y += d;
                    break;
                case 3:
                    this.x += d;
                    this.y += d;
                    break;
                case 4:
                    this.x -= d;
                    break;
                case 6:
                    this.x += d;
                    break;
                case 7:
                    this.x -= d;
                    this.y -= d;
                    break;
                case 8:
                    this.y -= d;
                    break;
                case 9:
                    this.x += d;
                    this.y -= d;
                    break;
            }
        };
        Sprite_PlayerMove.prototype.checkNext = function () {
            var nextX = this._x;
            var nextY = this._y;
            this._moveDistance++;
            if (this._moveDistance == this._maxRange) {
                this.onMoveMax();
                return;
            }
            if (Nore.EventArranger.isEnemy(this._x, this._y)) {
                this.targetList = this.targetList || [];
                this.targetList.push(Nore.EventArranger.enemyEventAt(this._x, this._y));
            }
            switch (this._direction) {
                case 1:
                    nextX--;
                    nextY++;
                    break;
                case 2:
                    nextY++;
                    break;
                case 3:
                    nextX++;
                    nextY++;
                    break;
                case 4:
                    nextX--;
                    break;
                case 6:
                    nextX++;
                    break;
                case 7:
                    nextX--;
                    nextY--;
                    break;
                case 8:
                    nextY--;
                    break;
                case 9:
                    nextX++;
                    nextY--;
                    break;
            }
            if (!$gameMap.isPassable(this._x, this._y, this._direction) ||
                !$gameMap.isPassable(nextX, nextY, this.reverseDir(this._direction))) {
                this.onHitWall();
            }
        };
        Sprite_PlayerMove.prototype.reverseDir = function (d) {
            return 10 - d;
        };
        Sprite_PlayerMove.prototype.speed = function () {
            return 16;
        };
        Sprite_PlayerMove.prototype.finished = function () {
            return this._finish;
        };
        Sprite_PlayerMove.prototype.direction = function () {
            return this._direction;
        };
        Sprite_PlayerMove.prototype.onMoveMax = function () {
            this._finish = true;
            Nore.EventArranger.spriteset().removeChild(this);
        };
        Sprite_PlayerMove.prototype.onHitWall = function () {
            this._finish = true;
            Nore.EventArranger.spriteset().removeChild(this);
        };
        return Sprite_PlayerMove;
    }(Sprite_Character));
    Nore.Sprite_PlayerMove = Sprite_PlayerMove;
    var Sprite_PlayerKnockback = /** @class */ (function (_super) {
        __extends(Sprite_PlayerKnockback, _super);
        function Sprite_PlayerKnockback() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Sprite_PlayerKnockback;
    }(Sprite_PlayerMove));
    Nore.Sprite_PlayerKnockback = Sprite_PlayerKnockback;
    var Sprite_PlayerThrough = /** @class */ (function (_super) {
        __extends(Sprite_PlayerThrough, _super);
        function Sprite_PlayerThrough() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_PlayerThrough.prototype.onHitWall = function () {
            var pos = Nore.calcPosByDirection(this._x, this._y, this._direction);
            if (!Nore.EventArranger.isEnemy(pos.x, pos.y)) {
                if (!$gameMap.isFlyable(pos.x, pos.y)) {
                    this._finish = true;
                }
            }
        };
        return Sprite_PlayerThrough;
    }(Sprite_PlayerMove));
    Nore.Sprite_PlayerThrough = Sprite_PlayerThrough;
})(Nore || (Nore = {}));
