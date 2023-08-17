var Nore;
(function (Nore) {
    Window_ChoiceList.prototype.windowX = function () {
        var offset = 728;
        switch ($gameVariables.value(18)) {
            case 0:
                return 240 + offset - this.windowWidth();
            case 1:
                return 330 + offset - this.windowWidth();
            case 2:
                return 630 + offset - this.windowWidth();
            case 3:
                return 0 + offset - this.windowWidth();
        }
        var positionType = $gameMessage.choicePositionType();
        if (positionType === 1) {
            return (Graphics.boxWidth - this.windowWidth()) / 2;
        }
        else if (positionType === 2) {
            return Graphics.boxWidth - this.windowWidth() - 300;
        }
        else {
            return 0;
        }
    };
    Game_Screen.prototype.maxPictures = function () {
        return 30;
    };
    Window_StatusBase.prototype.drawActorSimpleStatus = function (actor, x, y) {
        var lineHeight = this.lineHeight();
        var x2 = x + 180;
        var x3 = x2 + 180;
        this.drawActorName(actor, x, y);
        this.drawActorLevel(actor, x, y + lineHeight * 1);
        this.drawActorIcons(actor, x, y + lineHeight * 2);
        this.drawActorNickname(actor, x, y - lineHeight, 270);
        this.drawActorClass(actor, x2, y);
        this.placeBasicGauges(actor, x2, y + lineHeight);
    };
    var _Game_Event_prototype_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function () {
        _Game_Event_prototype_update.call(this);
        if (this._noreSameY === undefined) {
            var e_1 = this.event();
            if (e_1 && e_1.meta['same_y']) {
                this._noreSameY = e_1.meta['same_y'];
            }
            else {
                this._noreSameY = false;
            }
        }
    };
    var Game_Event_prototype_isTransparent = Game_Event.prototype.isTransparent;
    Game_Event.prototype.isTransparent = function () {
        if (this._noreSameY) {
            if ($gamePlayer.y == this.y) {
                return false;
            }
            else {
                return true;
            }
        }
        return Game_Event_prototype_isTransparent.call(this);
    };
})(Nore || (Nore = {}));
