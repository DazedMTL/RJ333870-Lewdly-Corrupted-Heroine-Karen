/*:ja
 * @target MZ
 * @author ル
 */
Game_CharacterBase.prototype.isMapPassableNotWall = function (x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    var d2 = this.reverseDir(d);
    return $gameMap.isPassableNotWall(x, y, d);
};
var CAN_8_MOVE = true;
Game_CharacterBase.prototype.canPass = function (x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (!$gameMap.isValid(x2, y2)) {
        return false;
    }
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    }
    if (this.isCollidedWithCharacters(x2, y2)) {
        return false;
    }
    if (!this.isMapPassable(x, y, d)) {
        return false;
    }
    /*if (d == 1 || d == 3 || d == 7 || d == 9) {
        if (! CAN_8_MOVE) {
            return false;
        }
        if ($gameMap.isFloor(x2, y2)) {
            return true;
        }
        if ($gamePlayer.room) {
            if ($gamePlayer.room.contains(x2, y2)) {
                return true;
            }
         
            return false;
        }
    }*/
    if (d == 1 || d == 3) {
        if (!this.isMapPassableNotWall(x, y, 2)) {
            return false;
        }
    }
    if (d == 3 || d == 9) {
        if (!this.isMapPassableNotWall(x, y, 6)) {
            return false;
        }
    }
    if (d == 7 || d == 9) {
        if (!this.isMapPassableNotWall(x, y, 8)) {
            return false;
        }
    }
    if (d == 1 || d == 7) {
        if (!this.isMapPassableNotWall(x, y, 4)) {
            return false;
        }
    }
    return true;
};
Game_CharacterBase.prototype.canPassWithoutCollide = function (x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (!$gameMap.isValid(x2, y2)) {
        return false;
    }
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    }
    if (!this.isMapPassableNotWall(x, y, d)) {
        return false;
    }
    if (d == 1 || d == 3) {
        if (!this.isMapPassableNotWall(x, y, 2)) {
            return false;
        }
    }
    if (d == 3 || d == 9) {
        if (!this.isMapPassableNotWall(x, y, 6)) {
            return false;
        }
    }
    if (d == 7 || d == 9) {
        if (!this.isMapPassableNotWall(x, y, 8)) {
            return false;
        }
    }
    if (d == 1 || d == 7) {
        if (!this.isMapPassableNotWall(x, y, 4)) {
            return false;
        }
    }
    return true;
};
Game_Map.prototype.roundXWithDirection = function (x, d) {
    if (d == 9 || d == 3) {
        d = 6;
    }
    if (d == 7 || d == 1) {
        d = 4;
    }
    return this.roundX(x + (d === 6 ? 1 : d === 4 ? -1 : 0));
};
Game_Map.prototype.roundYWithDirection = function (y, d) {
    if (d == 7 || d == 9) {
        d = 8;
    }
    if (d == 1 || d == 3) {
        d = 2;
    }
    return this.roundY(y + (d === 2 ? 1 : d === 8 ? -1 : 0));
};
Game_Map.prototype.xWithDirection = function (x, d) {
    if (d == 9 || d == 3) {
        d = 6;
    }
    if (d == 7 || d == 1) {
        d = 4;
    }
    return x + (d === 6 ? 1 : d === 4 ? -1 : 0);
};
Game_Map.prototype.yWithDirection = function (y, d) {
    if (d == 7 || d == 9) {
        d = 8;
    }
    if (d == 1 || d == 3) {
        d = 2;
    }
    return y + (d === 2 ? 1 : d === 8 ? -1 : 0);
};
Sprite_Character.prototype.characterPatternY = function () {
    var direction = this._character.direction();
    if (direction == 1 || direction == 3) {
        direction = 2;
    }
    if (direction == 7 || direction == 9) {
        direction = 8;
    }
    return (direction - 2) / 2;
};
Game_CharacterBase.prototype.updateMove = function () {
    if (this._x < this._realX) {
        this._realX = Math.max(this._realX - this.distancePerFrame(), this._x);
    }
    if (this._x > this._realX) {
        this._realX = Math.min(this._realX + this.distancePerFrame(), this._x);
    }
    if (this._y < this._realY) {
        this._realY = Math.max(this._realY - this.distancePerFrame(), this._y);
    }
    if (this._y > this._realY) {
        this._realY = Math.min(this._realY + this.distancePerFrame(), this._y);
    }
    if (!this.isMoving()) {
        //p(this._realX + " " + this._realY)
        this.refreshBushDepth();
    }
};
var _Game_CharacterBase_prototype_realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
Game_CharacterBase.prototype.realMoveSpeed = function () {
    if (!$gameMap.isRogue()) {
        return _Game_CharacterBase_prototype_realMoveSpeed.call(this);
    }
    if (this._moveSpeed == 4) {
        return 4.2;
    }
    if (this._moveSpeed == 5) {
        return 7.2;
    }
    return this._moveSpeed + (this.isDashing() ? 1 : 0);
};
Game_Map.prototype.isPassable = function (x, y, d) {
    var tileId = $gameMap.tileId(x, y, 0);
    if (tileId >= 5912 && tileId <= 5929) {
        return false;
    }
    if (d == 1) {
        return this.checkPassage(x, y, (1 << (2 / 2 - 1)) & 0x0f) && this.checkPassage(x, y, (1 << (4 / 2 - 1)) & 0x0f);
    }
    else if (d == 3) {
        return this.checkPassage(x, y, (1 << (2 / 2 - 1)) & 0x0f) && this.checkPassage(x, y, (1 << (6 / 2 - 1)) & 0x0f);
    }
    else if (d == 7) {
        return this.checkPassage(x, y, (1 << (8 / 2 - 1)) & 0x0f) && this.checkPassage(x, y, (1 << (4 / 2 - 1)) & 0x0f);
    }
    else if (d == 9) {
        return this.checkPassage(x, y, (1 << (8 / 2 - 1)) & 0x0f) && this.checkPassage(x, y, (1 << (6 / 2 - 1)) & 0x0f);
    }
    else {
        return this.checkPassage(x, y, (1 << (d / 2 - 1)) & 0x0f);
    }
};
