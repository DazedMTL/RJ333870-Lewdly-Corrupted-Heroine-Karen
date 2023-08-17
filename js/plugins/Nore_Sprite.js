/*:ja
 * @target MZ
 */
var Nore;
(function (Nore) {
    Sprite_Gauge.prototype.bitmapWidth = function () {
        return 308;
    };
    var _Sprite_Gauge_prototype_currentValue = Sprite_Gauge.prototype.currentValue;
    Sprite_Gauge.prototype.currentValue = function () {
        if (this._battler) {
            switch (this._statusType) {
                case 'fame':
                    return $gameActors.mainActor().fame;
                case 'frustration':
                    return $gameActors.mainActor().zasetsu;
            }
        }
        return _Sprite_Gauge_prototype_currentValue.call(this);
    };
    var _Sprite_Gauge_prototype_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
    Sprite_Gauge.prototype.currentMaxValue = function () {
        if (this._battler) {
            switch (this._statusType) {
                case 'fame':
                    return $gameActors.mainActor().maxFame;
                case 'frustration':
                    return $gameActors.mainActor().maxZasetsu;
            }
        }
        return _Sprite_Gauge_prototype_currentMaxValue.call(this);
    };
    Sprite_Gauge.prototype.drawValue = function () {
        var currentValue = this.currentValue();
        var width = this.bitmapWidth();
        var height = this.bitmapHeight();
        this.setupValueFont();
        this.bitmap.drawText(Math.floor(currentValue), 0, 0, width, height, "right");
    };
    var Sprite_Gauge_prototype_label = Sprite_Gauge.prototype.label;
    Sprite_Gauge.prototype.label = function () {
        switch (this._statusType) {
            case 'fame':
                return TextManager.fame;
            case 'frustration':
                return TextManager.frustration;
        }
        return Sprite_Gauge_prototype_label.call(this);
    };
    Sprite_Gauge.prototype.gaugeX = function () {
        return this._statusType === "time" ? 0 : 100;
    };
})(Nore || (Nore = {}));
