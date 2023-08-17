/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
    var _Scene_Boot_prototype_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function () {
        _Scene_Boot_prototype_loadSystemImages.call(this);
        ImageManager.loadSpriteSheet('img/tachie/actor01_1.json');
        ImageManager.loadSpriteSheet('img/tachie/actor01_2.json');
        for (var i = 2; i <= 3; i++) {
            var file = 'img/tachie/actor' + i.padZero(2) + '.json';
            ImageManager.loadSpriteSheet(file);
        }
        p('loadSystemImages');
        ImageManager.loadSpriteSheet('img/tachie/actor05.json');
        ImageManager.loadSpriteSheet('img/tachie/actor07.json');
        ImageManager.loadSpriteSheet('img/tachie/actor14.json');
        ImageManager.loadSpriteSheet('img/tachie/sikyu.json');
        ImageManager.loadSystem('ui2');
        ImageManager.loadSystem('bar');
        ImageManager.loadSystem('enemyInfo_01');
        ImageManager.loadSystem('mapShadow');
        ImageManager.loadSystem('number');
        ImageManager.loadSystem('fukidashi');
        ImageManager.loadSystem('skill_tree');
        ImageManager.loadSystem('eroStatus');
        ImageManager.loadSystem('IconSet');
        ImageManager.loadSystem('World_B');
        ImageManager.loadSystem('title');
        ImageManager.loadSystem('right_frame');
        ImageManager.loadSystem('right_bg_bar');
        ImageManager.loadSystem('right_bg0');
        ImageManager.loadSystem('right_bg1');
        ImageManager.loadSystem('right_bg1_night');
        ImageManager.loadSystem('right_bg2');
        ImageManager.loadSystem('right_bg2_night');
        ImageManager.loadSystem('right_bg3');
        ImageManager.loadSystem('right_bg3_night');
        ImageManager.loadSystem('bin');
        ImageManager.loadSystem('yami');
        ImageManager.loadSystem('messageWindow');
        ImageManager.loadSystem('messageWindow_normal1');
        ImageManager.loadSystem('messageWindow_normal4');
        ImageManager.loadSystem('messageWindow_normal5');
    };
    var _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_createGameObjects.call(this);
        Nore.Tachie.actorCashedSprites = {};
    };
})(Nore || (Nore = {}));
