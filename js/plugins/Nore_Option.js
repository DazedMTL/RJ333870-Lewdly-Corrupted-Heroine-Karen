Window_Options.prototype.volumeOffset = function () {
    return 5;
};
Scene_Options.prototype.optionsWindowRect = function () {
    var n = 8;
    var ww = 500;
    var wh = this.calcWindowHeight(n, true);
    var wx = (Graphics.boxWidth - ww) / 2;
    var wy = (Graphics.boxHeight - wh) / 2;
    return new Rectangle(wx, wy, ww, wh);
};
Window_Options.prototype.addGeneralOptions = function () {
    //this.addCommand(TextManager.touchUI, "touchUI");
};
Window_Options.prototype.statusWidth = function () {
    return 220;
};
var _Window_Options_prototype_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
    _Window_Options_prototype_addGeneralOptions.call(this);
    this.addCommand(TextManager.skipKey, "skipKey");
    this.addCommand(TextManager.displayOperation, "displayOperation");
};
AudioManager._bgmVolume = 30;
AudioManager._bgsVolume = 30;
AudioManager._meVolume = 30;
AudioManager._seVolume = 30;
ConfigManager.skipKey = 0;
ConfigManager.displayOperation = true;
var _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    _ConfigManager_applyData.call(this, config);
    this.displayOperation = this.readFlag(config, "displayOperation");
    this.skipKey = this.readSkip(config, "skipKey", 0);
};
ConfigManager.readSkip = function (config, name, defaultValue) {
    if (name in config) {
        var num = parseInt(config[name]);
        if (isNaN(num)) {
            return 0;
        }
        return num;
    }
    else {
        return defaultValue;
    }
};
var ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
    var config = ConfigManager_makeData.call(this);
    config.displayOperation = this.displayOperation;
    config.skipKey = this.skipKey;
    return config;
};
var _Window_Options_prototype_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function (index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (symbol == 'skipKey') {
        switch (value) {
            case 0:
                return 'Shift(Dash)';
            case 1:
                return 'A(Movement)';
            case 2:
                return 'Ctrl';
        }
    }
    return _Window_Options_prototype_statusText.call(this, index);
};
var _Window_Options_prototype_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function () {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol == 'skipKey') {
        var type = this.getConfigValue(symbol);
        type++;
        if (type > 2) {
            type = 0;
        }
        this.changeValue(symbol, type);
    }
    else {
        _Window_Options_prototype_processOk.call(this);
    }
};
var _Window_Options_prototype_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function () {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol == 'skipKey') {
        var type = this.getConfigValue(symbol);
        type++;
        if (type > 2) {
            type = 0;
        }
        this.changeValue(symbol, type);
    }
    else {
        _Window_Options_prototype_cursorRight.call(this);
    }
};
var _Window_Options_prototype_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function () {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol == 'skipKey') {
        var type = this.getConfigValue(symbol);
        type--;
        if (type < 0) {
            type = 2;
        }
        this.changeValue(symbol, type);
    }
    else {
        _Window_Options_prototype_cursorLeft.call(this);
    }
};
Game_Picture.prototype.opacity = function () {
    if (this._name == 'tuto_01') {
        if (!ConfigManager.displayOperation) {
            return 0;
        }
        if (!$gameSwitches.value(1)) {
            return 0;
        }
    }
    return this._opacity;
};
