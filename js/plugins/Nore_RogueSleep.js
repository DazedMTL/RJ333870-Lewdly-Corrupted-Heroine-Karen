/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
    Game_Character.prototype.isEnemy = function () {
        return false;
    };
    Game_Event.prototype.sleepTest = function () {
        if ($gameMap.isFixedFloor()) {
            return;
        }
        if (Math.randomInt(12) === 0) {
            this.sleep();
        }
    };
    Game_Event.prototype.isEnemy = function () {
        return this._enemy != null;
    };
    Game_Event.prototype.sleep = function () {
        if (!this.isEnemy()) {
            return;
        }
        this._stepAnime = false;
        this._sleep = true;
        this.requestBalloon(10);
    };
    Game_Event.prototype.isSleep = function () {
        return this._sleep;
    };
    Game_Player.prototype.isEnemy = function () {
        return false;
    };
})(Nore || (Nore = {}));
