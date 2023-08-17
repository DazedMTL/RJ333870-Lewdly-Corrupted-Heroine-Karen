/*:ja
 * @target MZ
 * @author ル
 * @requiredAssets img/system/mapShadow.png
 *
 */
var Nore;
(function (Nore) {
    Game_Party.prototype.arrow = function () {
        return this._arrow || 0;
    };
    Game_Party.prototype.maxArrow = function () {
        return this._maxArrow || 20;
    };
    Game_Party.prototype.isMaxArrow = function () {
        return this.maxArrow() <= this.arrow();
    };
    Game_Party.prototype.gainArrow = function (n) {
        var getCount = Math.max(this.maxArrow() - this.arrow(), n);
        this._arrow = Math.min(this.arrow() + n, this.maxArrow());
        return getCount;
    };
    Game_Party.prototype.loseArrow = function (n) {
        this.gainArrow(-n);
    };
    Game_Party.prototype.canGetAllArrow = function (n) {
        return this.maxArrow() >= this.arrow() + n;
    };
})(Nore || (Nore = {}));
