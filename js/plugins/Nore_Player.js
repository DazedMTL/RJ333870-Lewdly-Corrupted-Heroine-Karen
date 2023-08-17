var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game_RoguePlayer = /** @class */ (function (_super) {
    __extends(Game_RoguePlayer, _super);
    function Game_RoguePlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Game_RoguePlayer.prototype.onDungeonStart = function () {
        this.lastBattleRoom = null;
    };
    Object.defineProperty(Game_RoguePlayer.prototype, "room", {
        get: function () {
            return this._room;
        },
        enumerable: true,
        configurable: true
    });
    Game_RoguePlayer.prototype.setRoom = function (r) {
        if (this._lastTurn == this.turnCount()) {
            this._room = r;
            return;
        }
        this._lastTurn = this.turnCount();
        if (r && !this._room) {
            this.isEnterRoom = true;
            $gameTemp.isFastMove = false;
        }
        else {
            this.isEnterRoom = false;
        }
        this._room = r;
    };
    Game_RoguePlayer.prototype.isAlwaysNinshin = function () {
        var armor = $gameActors.mainActor().equips()[5];
        return armor && armor.itemId == 21;
    };
    Game_RoguePlayer.prototype.setTransparent = function (b) {
        _super.prototype.setTransparent.call(this, b);
    };
    Game_RoguePlayer.prototype.turnCount = function () {
        return $gameVariables.value(21);
    };
    Game_RoguePlayer.prototype.locate = function (x, y) {
        _super.prototype.locate.call(this, x, y);
        $gameMap.mapping(x, y);
    };
    Game_RoguePlayer.prototype.isDefeat = function () {
        return $gameSwitches.value(14);
    };
    ;
    Game_RoguePlayer.prototype.moveStraight = function (d) {
        if (this.callReservedCommonEvent()) {
            return;
        }
        _super.prototype.moveStraight.call(this, d);
        $gameMap.mapping(this.x, this.y);
    };
    Game_RoguePlayer.prototype.callReservedCommonEvent = function () {
        if ($gameVariables.value(10) > 0) {
            $gameTemp.reserveCommonEvent($gameVariables.value(10));
            return true;
        }
        return false;
    };
    Game_RoguePlayer.prototype.isEquipTuto = function () {
        return $gameVariables.value(10) == 211;
    };
    /*characterIndex() {
        const actor = $gameActors.actor(1);
        if (actor.outerId == 'c') {
            if (actor.breakId >= 3) {
                return 3;
            }
            return 1;
        }
        if (actor.innerBottomId == 'b') {
            if (actor.breakId >= 3) {
                return 3;
            }
            return 1;
        }
        if (actor.innerBottomId == 'a') {
            return 3;
        }

        return super.characterIndex();
    }*/
    Game_RoguePlayer.prototype.updateDashing = function () {
        if ($gameSwitches.value(1)) {
            return;
        }
        _super.prototype.updateDashing.call(this);
    };
    Game_RoguePlayer.prototype.onDamage = function (n) {
    };
    Game_RoguePlayer.prototype.getInputDirection = function () {
        return Input.dir8;
    };
    Game_RoguePlayer.prototype.screenX = function () {
        var x = _super.prototype.screenX.call(this);
        return x + this.attackOffsetX();
    };
    Game_RoguePlayer.prototype.screenY = function () {
        var y = _super.prototype.screenY.call(this);
        return y + this.attackOffsetY();
    };
    Game_RoguePlayer.prototype.inAnimation = function () {
        return this._attackAnime > 0;
    };
    Game_RoguePlayer.prototype.isContact = function (x, y) {
        return Math.abs(this.x - x) <= 1 && Math.abs(this.y - y) <= 1;
    };
    Game_RoguePlayer.prototype.rightDir = function () {
        switch (this.direction()) {
            case 2: return 4;
            case 4: return 8;
            case 8: return 6;
            case 6: return 2;
        }
        return 0;
    };
    Game_RoguePlayer.prototype.leftDir = function () {
        switch (this.direction()) {
            case 2: return 6;
            case 4: return 2;
            case 8: return 4;
            case 6: return 8;
        }
        return 0;
    };
    Game_RoguePlayer.prototype.hasStepAnime = function () {
        if (!$gameMap.isRogue()) {
            return _super.prototype.hasStepAnime.call(this);
        }
        if (!$gameActors.actor(1).canMove()) {
            return false;
        }
        return true;
    };
    ;
    Game_RoguePlayer.prototype.realMoveSpeed = function () {
        if (this._moveSpeed == 5) {
            return 7.2;
        }
        if ($gameMap.isRogue()) {
            return 4.2;
        }
        else {
            if (this.isDashing()) {
                return 6;
            }
            else {
                return 5;
            }
        }
    };
    Game_RoguePlayer.prototype.executeAttack = function (direction) {
        Nore.$gameMessageRogue.isNewLine = true;
        Nore.rogueManager.attack(direction);
    };
    Game_RoguePlayer.prototype.isDirectionButtonPressed = function () {
        return Input.isPressed("control") || Input.isPressed("menu");
    };
    Game_RoguePlayer.prototype.distance = function (e) {
        return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
    };
    Game_RoguePlayer.prototype.distancePoint = function (p) {
        return Math.abs(this.x - p.x) + Math.abs(this.y - p.y);
    };
    Game_RoguePlayer.prototype.updateEncounterCount = function () {
        _super.prototype.updateEncounterCount.call(this);
        if ($gameSwitches.value(1)) {
            var actor = $gameActors.actor(1);
            /*if (! actor.hasState(4)) {
                actor.gainHp(Math.min(actor.mhp / 50), 2);
            }*/
            Nore.rogueManager.onTurn();
        }
    };
    Game_RoguePlayer.prototype.triggerButtonAction = function () {
        if (this.isSkillVisible()) {
            return;
        }
        return _super.prototype.triggerButtonAction.call(this);
    };
    Game_RoguePlayer.prototype.isSkillVisible = function () {
        if ($gameMap.isRogue()) {
            return false;
        }
        return SceneManager._scene._spriteset.isSkillVisible();
    };
    Game_RoguePlayer.prototype.executeMove = function (direction) {
        if (this.isSkillVisible()) {
            return;
        }
        if (!$gameMap.isRogue()) {
            _super.prototype.executeMove.call(this, direction);
            return;
        }
        return;
    };
    return Game_RoguePlayer;
}(Game_Player));
