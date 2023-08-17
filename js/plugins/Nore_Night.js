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
var MAP_SCALE = 1;
var Sprite_NightShadow = /** @class */ (function (_super) {
    __extends(Sprite_NightShadow, _super);
    function Sprite_NightShadow() {
        var _this = _super.call(this) || this;
        var map = $gameMap;
        if (!map.isRogue() && $gameSwitches.value(11)) {
            return _this;
        }
        _this.refresh();
        return _this;
    }
    Sprite_NightShadow.prototype.fill = function (x, y, w, h) {
        var gra = new PIXI.Graphics();
        gra.beginFill(0, 1);
        gra.drawRect(x, y, w, h);
        gra.endFill();
        this.addChild(gra);
    };
    Sprite_NightShadow.prototype.isVisible = function () {
        if (!$gameMap.isRogue() && $gameSwitches.value(11)) {
            return false;
        }
        return true;
    };
    Sprite_NightShadow.prototype.refresh = function () {
        if (!this.isVisible()) {
            return;
        }
        this.destroyAndRemoveChildren();
        var w = 52 * 48;
        var h = 40 * 40;
        var baseTexture = PIXI.utils.BaseTextureCache['system/mapShadow'];
        if (!baseTexture) {
            var bitmap = ImageManager.loadSystem('mapShadow');
            baseTexture = new PIXI.BaseTexture(bitmap._image);
            baseTexture.resource.url = 'system/mapShadow';
            PIXI.utils.BaseTextureCache['system/mapShadow'] = baseTexture;
        }
        var offset = 0;
        var rect = new Rectangle(0, 0, 0, 0);
        if (this.lastRoom) {
            var tileX = 48 * MAP_SCALE;
            var room = this.lastRoom;
            rect.x = w / 2 - ($gamePlayer.x - room.x - offset) * tileX;
            rect.y = h / 2 - ($gamePlayer.y - room.y - offset) * tileX;
            rect.width = (room.w + 2 - offset) * tileX;
            rect.height = (room.h + 2 - offset) * tileX;
            this.fill(0, 0, 52 * 48, rect.y);
            this.fill(0, rect.y, rect.x + 1, rect.height);
            this.fill(rect.x + rect.width, rect.y, rect.x, rect.height);
            this.fill(0, rect.y + rect.height, 52 * 48, h - rect.y - rect.height);
            var px = $gamePlayer.x;
            var py = $gamePlayer.y;
            if ($gameMap.isLoopHorizontal()) {
                if ($gameMap.displayX() > px) {
                    px += $gameMap.width();
                }
            }
            if ($gameMap.isLoopVertical()) {
                if ($gameMap.displayY() > py) {
                    py += $gameMap.height();
                }
            }
            this.startX = $gameMap.displayX() * tileX - w / 2 + (px - $gameMap.displayX() - 1) * tileX;
            this.startY = $gameMap.displayY() * tileX - h / 2 + (py - $gameMap.displayY() - 1) * tileX;
            var img = ImageManager.loadSystem('mapShadow');
            var w2 = img.width / 2;
            var h2 = img.height / 2;
            this.addShadow(baseTexture, 0, 0, w2, h2, rect.x + 1, rect.y);
            this.addShadow(baseTexture, w2, 0, w2, h2, rect.x + rect.width - w2, rect.y);
            this.addShadow(baseTexture, 0, h2, w2, h2, rect.x + 1, rect.y + rect.height - h2);
            this.addShadow(baseTexture, w2, h2, w2, h2, rect.x + rect.width - w2, rect.y + rect.height - h2);
            /*
            this.bitmap.blt(img, 0,  0,  w2, h2, rect.x, rect.y);
            this.bitmap.blt(img, w2, 0,  w2, h2, rect.x + rect.width - w2, rect.y);
            this.bitmap.blt(img, 0,  h2, w2, h2x, rect.x, rect.y + rect.height - h2);
            this.bitmap.blt(img, w2, h2, w2, h2, rect.x + rect.width - w2, rect.y + rect.height - h2);*/
            //this.bitmap.blt(rect.x, rect.y, edge, edge.rect)
        }
        else {
            rect.x = w / 2 - 68;
            rect.y = h / 2 - 65;
            rect.width = 127;
            rect.height = 127;
            this.fill(0, 0, 52 * 48, rect.y);
            this.fill(0, rect.y, rect.x, rect.height);
            this.fill(rect.x + rect.width, rect.y, rect.x, rect.height);
            this.fill(0, rect.y + rect.height, w, h - rect.y - rect.height);
            this.startX = $gameMap.displayX() * tileX - w / 2 + ($gamePlayer.x - $gameMap.displayX() - 1) * tileX;
            this.startY = $gameMap.displayY() * tileX - h / 2 + ($gamePlayer.y - $gameMap.displayY() - 1) * tileX;
            //this.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
            var img = ImageManager.loadSystem('mapShadow');
            var texture = new PIXI.Texture(baseTexture);
            texture.frame = new PIXI.Rectangle(0, 0, img.width, img.height);
            var sprite = new PIXI.Sprite(texture);
            sprite.position.x = rect.x;
            sprite.position.y = rect.y;
            this.addChild(sprite);
            //            this.bitmap.blt(img, 0, 0, img.width, img.height, rect.x, rect.y);
            //this.bitmap.blt(rect.x, rect.y, edge, edge.rect)
        }
        this._lastDx = $gameMap.displayX();
        this._lastDy = $gameMap.displayY();
        this.alpha = 0.9;
        //this.lastRoom = $gameMap.getRoom($gamePlayer.x, $gamePlayer.y);
    };
    Sprite_NightShadow.prototype.addShadow = function (baseTexture, sx, sy, sw, sh, dx, dy) {
        var img = ImageManager.loadSystem('mapShadow');
        var texture = new PIXI.Texture(baseTexture);
        texture.frame = new PIXI.Rectangle(sx, sy, sw, sh);
        var sprite = new PIXI.Sprite(texture);
        sprite.position.x = dx;
        sprite.position.y = dy;
        this.addChild(sprite);
    };
    Sprite_NightShadow.prototype.update = function () {
        if (!this.isVisible()) {
            return;
        }
        _super.prototype.update.call(this);
        var room = $gameMap.getRoom($gamePlayer.x, $gamePlayer.y);
        if (this.lastRoom != room) {
            this.lastRoom = room;
            this.refresh();
        }
        var w = 52 * 48;
        var h = 40 * 40;
        if (this.lastRoom) {
            var dx = $gameMap.displayX();
            if (Math.abs(this._lastDx - dx) > 20) {
                if (dx < this._lastDx) {
                    this.startX -= $gameMap.width() * 48;
                }
                else {
                    this.startX += $gameMap.width() * 48;
                }
            }
            var dy = $gameMap.displayY();
            if (Math.abs(this._lastDy - dy) > 20) {
                if (dx < this._lastDy) {
                    this.startY -= $gameMap.height() * 48;
                }
                else {
                    this.startY += $gameMap.height() * 48;
                }
            }
            this.x = this.startX - dx * 48 * MAP_SCALE;
            this.y = this.startY - dy * 48 * MAP_SCALE;
            this._lastDx = dx;
            this._lastDy = dy;
        }
        else {
            this.x = $gamePlayer.screenX() * MAP_SCALE - w / 2;
            this.y = $gamePlayer.screenY() * MAP_SCALE - h / 2 - 32;
        }
    };
    return Sprite_NightShadow;
}(Sprite_Clickable));
