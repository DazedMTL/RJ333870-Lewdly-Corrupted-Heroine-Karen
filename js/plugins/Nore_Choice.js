Window_ChoiceList.prototype.makeCommandList = function () {
    var choices = $gameMessage.choices();
    var index = 0;
    for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
        var choice = choices_1[_i];
        var enabled = this.isCommandEnabled(index);
        this.addCommand(choice, "choice", enabled);
        index++;
    }
};
Window_ChoiceList.prototype.drawItem = function (index) {
    var rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawTextEx(this.commandName(index), rect.x, rect.y, rect.width);
};
Window_ChoiceList.prototype.isCommandEnabled = function (index) {
    var zasetsuPoint = $gameVariables.value(40);
    if (index == 0 && zasetsuPoint > $gameActors.mainActor().zasetsu) {
        //    return false;
    }
    return !$gameSwitches.value(121 + index);
};
