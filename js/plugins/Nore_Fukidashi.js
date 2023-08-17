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
var _Game_Message_prototype_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function () {
    _Game_Message_prototype_clear.call(this);
    this._gizagiza = false;
};
Game_Message.prototype.gizagiza = function () {
    return this._gizagiza;
};
Game_Message.prototype.setGizagiza = function (b) {
    this._gizagiza = b;
    ;
};
Game_Interpreter.prototype.command101 = function (params) {
    if ($gameMessage.isBusy()) {
        return false;
    }
    $gameMessage.setFaceImage(params[0], params[1]);
    $gameMessage.setBackground(params[2]);
    $gameMessage.setPositionType(params[3]);
    $gameMessage.setSpeakerName(params[4]);
    $gameMessage.setGizagiza(params[5]);
    while (this.nextEventCode() === 401) {
        // Text data
        this._index++;
        $gameMessage.add(this.currentCommand().parameters[0]);
    }
    switch (this.nextEventCode()) {
        case 102: // Show Choices
            this._index++;
            this.setupChoices(this.currentCommand().parameters);
            break;
        case 103: // Input Number
            this._index++;
            this.setupNumInput(this.currentCommand().parameters);
            break;
        case 104: // Select Item
            this._index++;
            this.setupItemChoice(this.currentCommand().parameters);
            break;
    }
    this.setWaitMode("message");
    return true;
};
Window_Message.prototype.setMessageVisible = function (b) {
    if (b) {
        this._choiceListWindow.active = this._choiceListActive;
        this._choiceListWindow.visible = this._choiceListVisible;
    }
    if (b && this._lastVisible) {
        this.visible = true;
        this._messageVisible = b;
        this._nameBoxWindow.visible = this._nameBoxWindowVisible;
        return;
    }
    this._messageVisible = b;
    if (this.visible) {
        this._lastVisible = true;
    }
    this._nameBoxWindowVisible = this._nameBoxWindow.visible;
    this.visible = false;
    this._nameBoxWindow.visible = false;
    this._choiceListActive = this._choiceListWindow.active;
    this._choiceListVisible = this._choiceListWindow.visible;
    this._choiceListWindow.active = false;
    this._choiceListWindow.visible = false;
};
Window_Message.prototype.synchronizeNameBox = function () {
    if (!this.visible) {
        return;
    }
    this._nameBoxWindow.openness = this.openness;
    this._nameBoxWindow.visible = true;
};
Window_Message2.prototype.setMessageVisible = function (b) {
    this._messageVisible = b;
};
var Window_NormalMessage = /** @class */ (function (_super) {
    __extends(Window_NormalMessage, _super);
    function Window_NormalMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._refreshPauseSign = function () {
            var sx = 144;
            var sy = 96;
            var p = 24;
            this._pauseSignSprite.bitmap = this._windowskin;
            this._pauseSignSprite.anchor.x = 0.5;
            this._pauseSignSprite.anchor.y = 1;
            this._pauseSignSprite.move(this._width / 2 + 7, this._height + 2);
            this._pauseSignSprite.setFrame(sx, sy, p, p);
            this._pauseSignSprite.alpha = 0;
        };
        return _this;
    }
    Window_NormalMessage.prototype.update = function () {
        if ($gameSwitches.value(17)) {
            Window_Base.prototype.update.call(this);
            this.visible = false;
            this._lastInvisible = true;
            this._nameBoxWindow.visible = false;
            return;
        }
        if (this._lastInvisible) {
            this._lastInvisible = false;
            this.visible = true;
        }
        this.frameVisible = false;
        _super.prototype.update.call(this);
        this.updateX();
        this.updateWidth();
    };
    Window_NormalMessage.prototype.newLineX = function (textState) {
        return _super.prototype.newLineX.call(this, textState) + 20;
    };
    ;
    Window_NormalMessage.prototype._createBackSprite = function () {
        if (!this._backSprite) {
            this._backSprite = new Sprite();
            this._container.addChild(this._backSprite);
        }
        else {
            this._backSprite.removeChildren();
        }
        var baseTexture = Nore.getSystemBaseTexture(this.getWindowImage());
        var texture = new PIXI.Texture(baseTexture);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = -20;
        sprite.y = -26;
        this._backSprite.addChild(sprite);
    };
    Window_NormalMessage.prototype.getWindowImage = function () {
        switch ($gameVariables.value(18)) {
            case 0:
            case 1:
            case 2:
                return 'messageWindow_normal1';
            case 3:
                return 'messageWindow_normal5';
            //           return 600;
            case 4:
                return 'messageWindow_normal4';
            //\\\                return 528;
            case 5:
                return 'messageWindow_normal5';
        }
        return 'messageWindow_normal1';
    };
    Window_NormalMessage.prototype._refreshBack = function () {
    };
    Window_NormalMessage.prototype.updateInput = function () {
        if (this.isAnySubWindowActive()) {
            return true;
        }
        if (this.pause) {
            if (this.isTriggered()) {
                Input.update();
                this.pause = false;
                if (!this._textState) {
                    this.terminateMessage();
                }
            }
            return true;
        }
        return false;
    };
    ;
    Window_NormalMessage.prototype.updateX = function () {
        switch ($gameVariables.value(18)) {
            case 0:
                if ($gameSwitches.value(1) && ConfigManager.displayOperation) {
                    this.x = 234;
                }
                else {
                    if (!$gameSwitches.value(1) && $gameSwitches.value(6)) {
                        this.x = 304;
                    }
                    else {
                        this.x = 214;
                    }
                }
                break;
            case 1:
                this.x = 330;
                break;
            case 2:
                this.x = 610;
                break;
            case 3:
                this.x = 0;
                break;
            case 4:
                this.x = 830;
                break;
            case 5:
                this.x = 711;
                break;
        }
    };
    Window_NormalMessage.prototype.updateWidth = function () {
        if (this.width != this.windowWidth()) {
            this.width = this.windowWidth();
            this._createBackSprite();
        }
    };
    Window_NormalMessage.prototype.lineHeight = function () {
        return 34;
    };
    Window_NormalMessage.prototype.windowWidth = function () {
        switch ($gameVariables.value(18)) {
            case 0:
            case 1:
            case 2:
                return 728;
            case 3:
                return 600;
            case 4:
                return 528;
            case 5:
                return 628;
        }
    };
    Window_NormalMessage.prototype.resetFontSettings = function () {
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = 24;
        this.resetTextColor();
    };
    Window_NormalMessage.prototype.updateWait = function () {
        if (this._messageVisible === false) {
            return true;
        }
        return _super.prototype.updateWait.call(this);
    };
    return Window_NormalMessage;
}(Window_Message));
var BitmapNoOutline = /** @class */ (function (_super) {
    __extends(BitmapNoOutline, _super);
    function BitmapNoOutline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BitmapNoOutline.prototype._drawTextOutline = function (text, tx, ty, maxWidth) {
    };
    ;
    return BitmapNoOutline;
}(Bitmap));
var Window_Fukidashi = /** @class */ (function (_super) {
    __extends(Window_Fukidashi, _super);
    function Window_Fukidashi() {
        var _this = _super.call(this, new Rectangle(800, 0, 400, 200)) || this;
        _this._refreshPauseSign = function () {
            var sx = 144;
            var sy = 96;
            var p = 24;
            this._pauseSignSprite.bitmap = this._windowskin;
            this._pauseSignSprite.anchor.x = 0.5;
            this._pauseSignSprite.anchor.y = 1;
            this._pauseSignSprite.move(this._width / 2 + 7, this._height - 92);
            this._pauseSignSprite.setFrame(sx, sy, p, p);
            this._pauseSignSprite.alpha = 0;
            p(this._pauseSignSprite);
        };
        _this.backOpacity = 0;
        _this.frameVisible = false;
        _this.refreshBack(null);
        _this.createFadeSprite();
        return _this;
    }
    Window_Fukidashi.prototype.createFadeSprite = function () {
        this._fadeSprite = new ScreenSprite();
        this.addChild(this._fadeSprite);
    };
    Window_Fukidashi.prototype.createContents = function () {
        var width = this.contentsWidth();
        var height = this.contentsHeight();
        this.destroyContents();
        this.contents = new BitmapNoOutline(width, height);
        this.contentsBack = new Bitmap(width, height);
        this.resetFontSettings();
    };
    ;
    Window_Fukidashi.prototype._createFrameSprite = function () {
        _super.prototype._createFrameSprite.call(this);
        this._bgSprite = new Sprite();
        this._container.addChild(this._bgSprite);
    };
    Window_Fukidashi.prototype.resetFontSettings = function () {
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = 20;
        this.contents.fontBold = true;
        this.resetTextColor();
    };
    Window_Fukidashi.prototype.resetTextColor = function () {
        this.changeTextColor(ColorManager.textColor(15));
        this.changeOutlineColor(ColorManager.normalColor());
    };
    Window_Fukidashi.prototype.refreshBack = function (text) {
        this._bgSprite.removeChildren();
        var baseTexture = this.getBaseTexture();
        var texture = new PIXI.Texture(baseTexture);
        var type = 0;
        if ($gameMessage.gizagiza()) {
            type = 3;
        }
        else if (!$gameMessage.speakerName()) {
            type = 2;
        }
        else if (text && text.indexOf('（') == 0) {
            type = 1;
            this.changeOutlineColor('#bbb');
        }
        else {
            if (this.convertEscapeCharacters($gameMessage.speakerName()) == $gameActors.mainActor().name()) {
            }
            else {
                type = 2;
            }
            this.changeOutlineColor(ColorManager.normalColor());
        }
        texture.frame = new PIXI.Rectangle(512 * (type % 2), 384 * Math.floor(type / 2), 512, 384);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = -80;
        sprite.y = -80;
        this._bgSprite.addChild(sprite);
    };
    Window_Fukidashi.prototype.getBaseTexture = function () {
        var baseTexture = PIXI.utils.BaseTextureCache['system/fukidashi'];
        if (!baseTexture) {
            var bitmap = ImageManager.loadSystem('fukidashi');
            if (!bitmap.isReady()) {
                return;
            }
            baseTexture = new PIXI.BaseTexture(bitmap._image);
            baseTexture.resource.url = 'system/fukidashi';
            PIXI.utils.BaseTextureCache['system/fukidashi'] = baseTexture;
        }
        return baseTexture;
    };
    Window_Fukidashi.prototype.updatePlacement = function () {
        this._pauseSignSprite.move(this._width / 2 - 7, this._height - 42);
    };
    Window_Fukidashi.prototype.update = function () {
        if (!$gameSwitches.value(17)) {
            this.visible = false;
            return;
        }
        if ($gameSwitches.value(69)) {
            _super.prototype.update.call(this);
            this.visible = false;
            return;
        }
        _super.prototype.update.call(this);
        if ($gameMessage.isBusy()) {
            this.visible = true;
        }
        this._nameBoxWindow.visible = false;
        //this.opacity = $gameScreen.brightness();
        this._fadeSprite.opacity = 255 - $gameScreen.brightness();
        this.updateX();
    };
    Window_Fukidashi.prototype.updateX = function () {
        if ($gameMessage.speakerName().length > 0) {
            if (this.convertEscapeCharacters($gameMessage.speakerName()) == $gameActors.mainActor().name()) {
                this.updateMainX();
            }
            else {
                this.updateSubX();
            }
        }
        else {
            // this.x = 800;
        }
    };
    Window_Fukidashi.prototype.updateMainX = function () {
        switch ($gameVariables.value(18)) {
            case 0:
                this.x = 800;
                break;
            case 1:
                this.x = 900;
                break;
            case 2:
                this.x = 900;
                break;
        }
    };
    Window_Fukidashi.prototype.updateSubX = function () {
        switch ($gameVariables.value(18)) {
            case 0:
                this.x = 80;
                break;
            case 1:
                this.x = 180;
                break;
            case 2:
                this.x = 320;
                break;
        }
    };
    Window_Fukidashi.prototype.synchronizeNameBox = function () {
    };
    Window_Fukidashi.prototype.isAnySubWindowActive = function () {
        return false;
    };
    Window_Fukidashi.prototype.updateSpeakerName = function () {
        if (this.visible) {
            this._nameBoxWindow.visible = false;
        }
    };
    Window_Fukidashi.prototype.startMessage = function () {
        var text = $gameMessage.allText();
        if (this.convertEscapeCharacters($gameMessage.speakerName()) == $gameActors.mainActor().name()) {
        }
        else {
            if ($gameMessage.speakerName().length > 0) {
                text = '[' + $gameMessage.speakerName() + ']\n' + text;
            }
        }
        var textState = this.createTextState(text, 0, 0, 0);
        textState.x = this.newLineX(textState);
        textState.startX = textState.x;
        this._textState = textState;
        this.newPage(this._textState);
        this.updatePlacement();
        this.updateBackground();
        this.refreshBack(text);
        this.open();
    };
    Window_Fukidashi.prototype.terminateMessage = function () {
        //this.close();
        $gameMessage.clear();
    };
    return Window_Fukidashi;
}(Window_Message));
Window_NameBox.prototype.updatePlacement = function () {
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    var messageWindow = this._messageWindow;
    if ($gameMessage.isRTL()) {
        this.x = messageWindow.x + messageWindow.width - this.width;
    }
    else {
        this.x = messageWindow.x;
    }
    if (messageWindow.y > 0) {
        this.y = messageWindow.y - this.height - 20;
    }
    else {
        this.y = messageWindow.y + messageWindow.height - 20;
    }
};
