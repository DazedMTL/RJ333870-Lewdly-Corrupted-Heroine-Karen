/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
    Object.defineProperties(Game_BattlerBase.prototype, {
        def2: {
            get: function () {
                var def = this.def;
                var n = 1;
                for (var i = 0; i < def; i++) {
                    n *= 15 / 16;
                }
                return n;
            },
            configurable: true
        },
    });
    Game_Action.prototype.applyCritical = function (damage) {
        return damage * 2;
    };
    Game_Action.prototype.makeDamageValue = function (target, critical) {
        var item = this.item();
        var baseValue = this.evalDamageFormula(target);
        var value = baseValue * this.calcElementRate(target);
        if (this.isPhysical()) {
            value *= target.pdr;
        }
        if (this.isMagical()) {
            value *= target.mdr;
        }
        if (baseValue < 0) {
            value *= target.rec;
        }
        if (critical) {
            value = this.applyCritical(value);
        }
        value = this.applyVariance(value, item.damage.variance);
        value = this.applyGuard(value, target);
        if ($gameVariables.value(100) == 1) {
            // 簡単
            if (target.isActor()) {
                if (value > 0) {
                    value /= 2;
                }
            }
            else {
                if (value > 0) {
                    //   value *= 2;
                }
            }
        }
        if ($gameVariables.value(100) == 2) {
            // すごく簡単
            if (target.isActor()) {
                if (value > 0) {
                    value /= 4;
                }
            }
            else {
                if (value > 0) {
                    value *= 2;
                }
            }
        }
        value = Math.round(value);
        return value;
    };
})(Nore || (Nore = {}));
