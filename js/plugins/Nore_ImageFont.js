/*:ja
 * @target MZ
 * @author ル
 * @requiredAssets img/system/number.png
 * @requiredAssets img/system/skill_tree.png
 * @requiredAssets img/system/fukidashi.png
 *
 */
var Nore;
(function (Nore) {
    function getBaseTexture() {
        var baseTexture = PIXI.utils.BaseTextureCache['system/number'];
        if (!baseTexture) {
            var bitmap = ImageManager.loadSystem('number');
            if (!bitmap.isReady()) {
                return;
            }
            baseTexture = new PIXI.BaseTexture(bitmap._image);
            baseTexture.resource.url = 'system/number';
            PIXI.utils.BaseTextureCache['system/number'] = baseTexture;
        }
        return baseTexture;
    }
    Nore.getBaseTexture = getBaseTexture;
    Window_Base.prototype.drawNumber = function (num, x, y, w, align, type) {
        drawNumber(num, x, y, w, align, type, this._windowContentsSprite);
    };
    Window_Base.prototype.drawLabel = function (type, x, y) {
        var baseTexture = getBaseTexture();
        if (!baseTexture) {
            return;
        }
        var pw = 96;
        var texture = new PIXI.Texture(baseTexture);
        texture.frame = new PIXI.Rectangle(96 * type, 0, pw, 48);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = x;
        sprite.y = y;
        this._windowContentsSprite.addChild(sprite);
        return sprite;
    };
    var __iconCache = {};
    Window_Base.prototype.drawIcon2 = function (iconIndex, x, y) {
        var baseTexture = PIXI.utils.BaseTextureCache['system/IconSet'];
        if (!baseTexture) {
            var bitmap = ImageManager.loadSystem('IconSet');
            if (!bitmap.isReady()) {
                return;
            }
            baseTexture = new PIXI.BaseTexture(bitmap._image, PIXI.settings.SCALE_MODES);
            baseTexture.imageUrl = 'system/IconSet';
            PIXI.utils.BaseTextureCache['system/IconSet'] = baseTexture;
        }
        var texture;
        if (__iconCache[iconIndex]) {
            texture = __iconCache[iconIndex];
        }
        else {
            var pw = ImageManager.iconWidth;
            var ph = ImageManager.iconHeight;
            var sx = iconIndex % 16 * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            texture = new PIXI.Texture(baseTexture);
            texture.frame = new PIXI.Rectangle(sx, sy, pw, ph);
            texture._cached = true;
        }
        var sprite = new PIXI.Sprite(texture);
        sprite.position.x = x + 10;
        sprite.position.y = y + 10;
        this._windowContentsSprite.addChild(sprite);
        // this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    };
    Window_Base.prototype.drawNumberOne = function (index, x, y, type) {
        var baseTexture = getBaseTexture();
        if (!baseTexture) {
            return;
        }
        switch (type) {
            case 1:
                var pw = 48;
                var ph = 48;
                var yy = 48;
                var ww = 24;
                break;
            case 2:
                var pw = 48;
                var ph = 48;
                var yy = 48 * 2;
                var ww = 24;
                break;
        }
        var texture = new PIXI.Texture(baseTexture);
        texture.frame = new PIXI.Rectangle(index * pw, yy, pw, ph);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = x;
        sprite.y = y;
        if (parent.paintOpacity !== undefined) {
            sprite.alpha = parent.paintOpacity / 256;
        }
        this._windowContentsSprite.addChild(sprite);
    };
    function drawNumber(num, x, y, w, align, type, parent) {
        var baseTexture = getBaseTexture();
        if (!baseTexture) {
            return;
        }
        var xx = 0;
        switch (type) {
            case 1:
                var pw = 48;
                var ph = 48;
                var yy = 48;
                var ww = 21;
                break;
            case 2:
                var pw = 48;
                var ph = 48;
                var yy = 48 * 2;
                var ww = 19;
                break;
            case 3:
                var pw = 48;
                var ph = 48;
                var yy = 48 * 3;
                var ww = 22;
                break;
        }
        var str = num + '';
        if (num < 0) {
            str = Math.abs(num) + '';
        }
        var minusW = 0;
        for (var i = 0; i < str.length; i++) {
            var s;
            if (align == 'right') {
                s = str[str.length - i - 1];
            }
            else {
                s = parseInt(str[i]);
            }
            var c = parseInt(s);
            if (isNaN(c)) {
                if (type == 10) {
                    if (s == '-') {
                        c = 10;
                    }
                    else {
                        c = 11;
                    }
                }
                else {
                    c = 10;
                }
                minusW = -11;
            }
            var texture = new PIXI.Texture(baseTexture);
            texture.frame = new PIXI.Rectangle(c * pw + xx, yy, pw, ph);
            var sprite = new PIXI.Sprite(texture);
            if (align == 'right') {
                sprite.x = x + w - (i + 1) * ww - 8 - minusW;
                if (type == 1 && i == str.length - 1 && c == 1) {
                    sprite.x += 2;
                }
            }
            else {
                sprite.x = x + i * ww;
            }
            if (parent.paintOpacity !== undefined) {
                sprite.alpha = parent.paintOpacity / 256;
            }
            sprite.y = y;
            parent.addChild(sprite);
        }
        if (num < 0) {
            var texture = new PIXI.Texture(baseTexture);
            texture.frame = new PIXI.Rectangle(10 * pw + 2 + xx, yy, pw, ph);
            var sprite = new PIXI.Sprite(texture);
            if (align == 'right') {
                sprite.x = x + w - (i + 1) * ww - 2;
            }
            else {
                sprite.x = x + i * ww;
            }
            sprite.y = y;
            parent.addChild(sprite);
        }
    }
})(Nore || (Nore = {}));
