/*:ja
 * @target MZ
 */
var Nore;
(function (Nore) {
    Game_Player.prototype.centerX = function () {
        if ($gameSwitches.value(6)) {
            return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 + 1;
        }
        else {
            if ($gameSwitches.value(1)) {
                return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 - 2;
            }
            else {
                return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 - 1;
            }
        }
    };
    Game_Player.prototype.centerY = function () {
        return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0 + 1;
    };
    Game_Interpreter.prototype.command204 = function (params) {
        if ($gameMap.isScrolling()) {
            this.setWaitMode("scroll");
            return false;
        }
        $gameMap.startScroll(params[0], params[1], params[2]);
        if (params[3]) {
            this.setWaitMode("scroll");
        }
        return true;
    };
})(Nore || (Nore = {}));
