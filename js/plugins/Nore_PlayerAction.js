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
    var ATTACK_ANIME_FRAME = 14;
    Game_Character.prototype.attackAnime = function () {
        this._attackAnime = ATTACK_ANIME_FRAME;
    };
    var _Game_Character_prototype_pattern = Game_Character.prototype.pattern;
    Game_Character.prototype.pattern = function () {
        if (this._attackAnime > 0) {
            return 2;
        }
        return _Game_Character_prototype_pattern.call(this);
    };
    Game_Character.prototype.attackOffsetX = function () {
        if (!this._attackAnime) {
            return 0;
        }
        if (this._lastFrame != Graphics.frameCount) {
            this._attackAnime--;
        }
        this._lastFrame = Graphics.frameCount;
        var offset = 0;
        if (this._attackAnime < ATTACK_ANIME_FRAME / 2) {
            offset = (this._attackAnime);
        }
        else {
            offset = (ATTACK_ANIME_FRAME - this._attackAnime);
        }
        if ($gamePlayer.isDefeat()) {
            offset *= 5;
        }
        switch (this._direction) {
            case 1: return -offset;
            case 2: return 0;
            case 3: return offset;
            case 4: return -offset;
            case 6: return offset;
            case 7: return -offset;
            case 8: return 0;
            case 9: return offset;
        }
        return 0;
    };
    Game_Character.prototype.attackOffsetY = function () {
        if (!this._attackAnime) {
            return 0;
        }
        if (this._lastFrame != Graphics.frameCount) {
            this._attackAnime--;
        }
        this._lastFrame = Graphics.frameCount;
        var offset = 0;
        if (this._attackAnime < ATTACK_ANIME_FRAME / 2) {
            offset = (this._attackAnime);
        }
        else {
            offset = (ATTACK_ANIME_FRAME - this._attackAnime);
        }
        if ($gamePlayer.isDefeat()) {
            offset *= 5;
        }
        switch (this._direction) {
            case 1: return offset;
            case 2: return offset;
            case 3: return offset;
            case 4: return 0;
            case 6: return 0;
            case 7: return -offset;
            case 8: return -offset;
            case 9: return -offset;
        }
        return 0;
    };
    Game_Character.prototype.calcDistance = function (x, y) {
        if (CAN_8_MOVE) {
            return Math.max(Math.abs(this.x - x), Math.abs(this.y - y));
        }
        else {
            return Math.abs(this.x - x) + Math.abs(this.y - y);
        }
    };
    Game_Character.prototype.calcDir = function (x, y) {
        if (this.x < x) {
            if (!CAN_8_MOVE) {
                return 6;
            }
            if (this.y < y) {
                return 3;
            }
            else if (this.y > y) {
                return 9;
            }
            else {
                return 6;
            }
        }
        if (this.x > x) {
            if (!CAN_8_MOVE) {
                return 4;
            }
            if (this.y < y) {
                return 1;
            }
            else if (this.y > y) {
                return 7;
            }
            else {
                return 4;
            }
        }
        if (this.y < y) {
            return 2;
        }
        else if (this.y > y) {
            return 8;
        }
        return 0;
    };
    Game_Character.prototype.nextPos = function () {
        return calcPosByDirection(this.x, this.y, this.direction());
    };
    function calcPosByDirection(x, y, dir) {
        switch (dir) {
            case 1: return new Point(x - 1, y + 1);
            case 3: return new Point(x + 1, y + 1);
            case 7: return new Point(x - 1, y - 1);
            case 9: return new Point(x + 1, y - 1);
            case 2: return new Point(x, y + 1);
            case 4: return new Point(x - 1, y);
            case 8: return new Point(x, y - 1);
            case 6: return new Point(x + 1, y);
        }
        return new Point(-1, -1);
    }
    Nore.calcPosByDirection = calcPosByDirection;
    Game_Character.prototype.backPos = function () {
        var dir = this.reverseDir(this.direction());
        return calcPosByDirection(this.x, this.y, dir);
    };
    Game_Character.prototype.backPosList = function () {
        var dir = this.reverseDir(this.direction());
        var list = [];
        list.push(calcPosByDirection(this.x, this.y, dir));
        switch (dir) {
            case 2:
                list.push(calcPosByDirection(this.x, this.y, 7));
                list.push(calcPosByDirection(this.x, this.y, 9));
                break;
            case 4:
                list.push(calcPosByDirection(this.x, this.y, 3));
                list.push(calcPosByDirection(this.x, this.y, 9));
                break;
            case 8:
                list.push(calcPosByDirection(this.x, this.y, 1));
                list.push(calcPosByDirection(this.x, this.y, 3));
                break;
            case 6:
                list.push(calcPosByDirection(this.x, this.y, 1));
                list.push(calcPosByDirection(this.x, this.y, 7));
                break;
        }
        return list;
    };
    Game_Character.prototype.frontPosList = function () {
        var dir = this.direction();
        var list = [];
        list.push(calcPosByDirection(this.x, this.y, dir));
        switch (dir) {
            case 2:
                list.push(calcPosByDirection(this.x, this.y, 1));
                list.push(calcPosByDirection(this.x, this.y, 3));
                break;
            case 4:
                list.push(calcPosByDirection(this.x, this.y, 1));
                list.push(calcPosByDirection(this.x, this.y, 7));
                break;
            case 8:
                list.push(calcPosByDirection(this.x, this.y, 7));
                list.push(calcPosByDirection(this.x, this.y, 9));
                break;
            case 6:
                list.push(calcPosByDirection(this.x, this.y, 3));
                list.push(calcPosByDirection(this.x, this.y, 9));
                break;
        }
        return list;
    };
    var _Game_Event_prototype_screenX = Game_Event.prototype.screenX;
    Game_Event.prototype.screenX = function () {
        var x = _Game_Event_prototype_screenX.call(this);
        return x + this.attackOffsetX();
    };
    var _Game_Event_prototype_screenY = Game_Event.prototype.screenY;
    Game_Event.prototype.screenY = function () {
        var y = _Game_Event_prototype_screenY.call(this);
        return y + this.attackOffsetY();
    };
    var _Game_EnemyEvent_prototype_screenX = Game_EnemyEvent.prototype.screenX;
    Game_EnemyEvent.prototype.screenX = function () {
        if (this.enemy()) {
            if ($gameActors.actor(1).sexEnemy == this.enemy()) {
                return $gamePlayer.screenX();
            }
        }
        return _Game_EnemyEvent_prototype_screenX.call(this);
    };
    var enemySexYList = [0, 0, 0, 0, -1, -1, -2, -2, -3, -3, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 1];
    var _Game_EnemyEvent_prototype_screenY = Game_EnemyEvent.prototype.screenY;
    Game_EnemyEvent.prototype.screenY = function () {
        if (this.enemy()) {
            if ($gameActors.actor(1).sexEnemy == this.enemy()) {
                var offset = enemySexYList[$gameTemp.sexAnimeIndex];
                return $gamePlayer.screenY() + offset;
            }
        }
        return _Game_EnemyEvent_prototype_screenY.call(this);
    };
    var _Game_EnemyEvent_prototype_screenZ = Game_EnemyEvent.prototype.screenZ;
    Game_EnemyEvent.prototype.screenZ = function () {
        if (this.enemy()) {
            if ($gameActors.actor(1).sexEnemy == this.enemy()) {
                return $gamePlayer.screenZ() + 1;
            }
        }
        return _Game_EnemyEvent_prototype_screenZ.call(this);
    };
    var _Game_EnemyEvent_prototype_direction = Game_EnemyEvent.prototype.direction;
    Game_EnemyEvent.prototype.direction = function () {
        if (this.enemy()) {
            if ($gameActors.actor(1).sexEnemy == this.enemy()) {
                return 8;
            }
        }
        return _Game_EnemyEvent_prototype_direction.call(this);
    };
    var Sprite_ItemThrow = /** @class */ (function (_super) {
        __extends(Sprite_ItemThrow, _super);
        function Sprite_ItemThrow(_item, subject) {
            var _this = _super.call(this) || this;
            _this._item = _item;
            _this._frameIndex = 0;
            _this._direction = subject.direction();
            _this._x = subject.x;
            _this._y = subject.y;
            _this.x = $gameMap.adjustX(_this._x) * $gameMap.tileWidth();
            _this.y = $gameMap.adjustY(_this._y) * $gameMap.tileHeight();
            return _this;
        }
        Sprite_ItemThrow.prototype.start = function () {
            this.initBitmap();
        };
        Sprite_ItemThrow.prototype.initBitmap = function () {
            this.bitmap = new Bitmap(32, 32);
            var iconIndex = this._item.throwIconIndex();
            var bitmap = ImageManager.loadSystem("IconSet");
            var pw = ImageManager.iconWidth;
            var ph = ImageManager.iconHeight;
            var sx = (iconIndex % 16) * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            this.bitmap.blt(bitmap, sx, sy, pw, ph, 10, 0);
        };
        Sprite_ItemThrow.prototype.update = function () {
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
                this.x = $gameMap.adjustX(this._x) * $gameMap.tileWidth();
                this.y = $gameMap.adjustY(this._y) * $gameMap.tileHeight();
            }
        };
        Sprite_ItemThrow.prototype.speed = function () {
            return 16;
        };
        Sprite_ItemThrow.prototype.move = function () {
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
        Sprite_ItemThrow.prototype.reverseDir = function (d) {
            return 10 - d;
        };
        ;
        Sprite_ItemThrow.prototype.checkNext = function () {
            var nextX = this._x;
            var nextY = this._y;
            if (Nore.EventArranger.isEnemy(this._x, this._y)) {
                this._finish = true;
                this.targetSpriteList = this.targetSpriteList || [];
                this.targetSpriteList.push(Nore.EventArranger.enemySpriteAt(this._x, this._y));
                this.onHitEnemy();
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
            if (!$gameMap.isFlyable(this._x, this._y)) {
                this.onHitWall();
            }
        };
        Sprite_ItemThrow.prototype.onHitEnemy = function () {
            this._finish = true;
            Nore.EventArranger.spriteset().removeChild(this);
        };
        Sprite_ItemThrow.prototype.onHitWall = function () {
            this._finish = true;
            /*if (! this._item.isRod() && ! this._item.isArrow()) {
                EventArranger.putItem(this._item, this._x, this._y, true);
            }*/
            Nore.EventArranger.spriteset().removeChild(this);
        };
        Sprite_ItemThrow.prototype.finished = function () {
            return this._finish;
        };
        Sprite_ItemThrow.prototype.direction = function () {
            return this._direction;
        };
        return Sprite_ItemThrow;
    }(Sprite));
    Nore.Sprite_ItemThrow = Sprite_ItemThrow;
})(Nore || (Nore = {}));
