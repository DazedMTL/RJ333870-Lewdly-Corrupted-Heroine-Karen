Game_System.prototype.getTaikenabnFlag = function () {
    return 0;
};
var Nore;
(function (Nore) {
    var _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_createGameObjects.call(this);
        $gameSwitches.setValue(990, $gameSystem.getTaikenabnFlag() ? true : false);
    };
    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameSwitches.setValue(990, $gameSystem.getTaikenabnFlag() ? true : false);
    };
})(Nore || (Nore = {}));
