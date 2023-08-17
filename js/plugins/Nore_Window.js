/*:ja
 * @target MZ
 */
var Nore;
(function (Nore) {
    Scene_Message.prototype.messageWindowRect = function () {
        var ww = Graphics.boxWidth - 636;
        var wh = Window_NormalMessage.prototype.fittingHeight(3);
        +38;
        var wx = (Graphics.boxWidth - ww) / 2 - 158;
        var wy = 0;
        return new Rectangle(wx, wy, ww, wh);
    };
    var _Window_Message_prototype_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function () {
        _Window_Message_prototype_update.call(this);
        if ($gameSwitches.value(17)) {
            return;
        }
        this.y = 622;
        if ($gameSwitches.value(5)) {
            this.x = 80;
            if ($gameSwitches.value(19)) {
                this.y = 40;
            }
        }
        else {
            var ww = Graphics.boxWidth - 700;
            var wx = (Graphics.boxWidth - ww) / 2;
            this.x = wx - 246;
        }
    };
})(Nore || (Nore = {}));
