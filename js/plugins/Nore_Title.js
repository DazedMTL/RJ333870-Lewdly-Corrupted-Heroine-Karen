Window_TitleCommand.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.backOpacity = 0;
    this.frameVisible = false;
    this.selectLast();
};
var Window_TitleCommand_prototype_itemRect = Window_TitleCommand.prototype.itemRect;
Window_TitleCommand.prototype.itemRect = function (index) {
    var rect = Window_TitleCommand_prototype_itemRect.call(this, index);
    rect.height += 10;
    return rect;
};
Window_TitleCommand.prototype.windowWidth = function () {
    return 860;
};
Window_TitleCommand.prototype.lineHeight = function () {
    return 44;
};
Window_TitleCommand.prototype.drawBackgroundRect = function (rect) {
};
Scene_Title.prototype.commandWindowRect = function () {
    var offsetX = $dataSystem.titleCommandWindow.offsetX;
    var offsetY = $dataSystem.titleCommandWindow.offsetY;
    var ww = this.mainCommandWidth() + 40;
    var wh = this.calcWindowHeight(5, true) + 40;
    var wx = (Graphics.boxWidth - ww) / 2 + offsetX + 240;
    var wy = 457;
    return new Rectangle(wx, wy, ww, wh);
};
Window_TitleCommand.prototype.setCursorRect = function (x, y, width, height) {
    var baseTexture = PIXI.utils.BaseTextureCache['system/title'];
    if (!baseTexture) {
        var bitmap = ImageManager.loadSystem('title');
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = 'system/title';
        PIXI.utils.BaseTextureCache['system/title'] = baseTexture;
    }
    this._windowContentsSprite.removeChildren();
    var rect = new Rectangle(x, y, width, height);
    var sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture, rect));
    sprite.x = 14;
    sprite.y = this.index() * 52 + 11;
    this._windowContentsSprite.addChild(sprite);
};
