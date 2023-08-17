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
var Nore;
(function (Nore) {
    var PlayerPutInRogueState = /** @class */ (function (_super) {
        __extends(PlayerPutInRogueState, _super);
        function PlayerPutInRogueState() {
            var _this = _super.call(this) || this;
            _this._item = $gameTemp.targetItem;
            $gameTemp.targetItem = null;
            $gameTemp.command = null;
            return _this;
        }
        PlayerPutInRogueState.prototype.start = function () {
            Nore.$gameMessageRogue.add(Nore.makePutInText(this._item, $gameTemp.toItem));
            this._waitCount = 20;
        };
        PlayerPutInRogueState.prototype.doPutIn = function () {
            AudioManager.playSe({ name: 'box', volume: 100, pitch: 100, pan: 0 });
            $gameParty._inventory.loseItem($gameTemp.toItem);
            if (this._item.realItem().meta['change']) {
                this.identify(this._item);
                this.changeBox();
                Nore.phaseManager.nextPhase();
            }
            else if (this._item.realItem().meta['recover']) {
                this.identify(this._item);
                this.recoverBox();
            }
            else if (this._item.realItem().meta['identify']) {
                if (!$gameTemp.toItem.isIdentified()) {
                    this.identify(this._item);
                    $gameTemp.toItem.identify();
                }
                this._item.box().putIn($gameTemp.toItem);
                Nore.phaseManager.nextPhase();
            }
            else {
                this._item.box().putIn($gameTemp.toItem);
                Nore.phaseManager.nextPhase();
            }
        };
        PlayerPutInRogueState.prototype.changeBox = function () {
            var item = Nore.EventArranger.createRandomItem();
            while (item.isBox()) {
                item = Nore.EventArranger.createRandomItem();
            }
            this._item.box().putIn(item);
        };
        PlayerPutInRogueState.prototype.recoverBox = function () {
            var action = new Game_Action(this.actor());
            var item = new RogueItem($dataItems[8], 1);
            action.setItem(item.itemId);
            var animation = $dataAnimations[item.animationId()];
            action.setAnimation(animation);
            this.showEffectAnimation([this.findPlayerSprite()], action);
            this._item.box().putIn($gameTemp.toItem);
        };
        PlayerPutInRogueState.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._waitCount > 0) {
                this._waitCount--;
                if (this._waitCount == 0) {
                    this.doPutIn();
                }
            }
        };
        return PlayerPutInRogueState;
    }(Nore.RogueState));
    Nore.PlayerPutInRogueState = PlayerPutInRogueState;
    var Sprite_BoxThrow = /** @class */ (function (_super) {
        __extends(Sprite_BoxThrow, _super);
        function Sprite_BoxThrow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sprite_BoxThrow.prototype.update = function () {
            if (this._explode) {
                this.x = $gameMap.adjustX(this._x) * $gameMap.tileWidth();
                this.y = $gameMap.adjustY(this._y) * $gameMap.tileHeight();
                if (!this._animeSprite.isPlaying()) {
                    Nore.EventArranger.spriteset().removeChild(this);
                }
                if (this._itemDropWait > 0) {
                    this._itemDropWait--;
                    if (this._itemDropWait == 0) {
                        this._finish = true;
                        for (var _i = 0, _a = this._item.box().items(); _i < _a.length; _i++) {
                            var item = _a[_i];
                            Nore.EventArranger.putItem(item, this._x, this._y);
                        }
                    }
                }
                return;
            }
            if (this._wait > 0) {
                this._wait--;
                this.move();
                if (this._wait == 0) {
                    this.explode();
                }
                return;
            }
            _super.prototype.update.call(this);
        };
        Sprite_BoxThrow.prototype.onHitWall = function () {
            this._wait = 2;
        };
        Sprite_BoxThrow.prototype.explode = function () {
            this.visible = false;
            if (this._item.realItem().meta['sturdy']) {
                if (!this._item.isIdentified()) {
                    Nore.$gameMessageRogue.add(Nore.makeIdentifyText(this._item));
                    this._item.identify();
                }
                AudioManager.playSe({ name: 'Hammer', volume: 100, pitch: 100, pan: 0 });
                Nore.EventArranger.putItem(this._item, this._x, this._y, true);
                Nore.EventArranger.spriteset().removeChild(this);
                this._finish = true;
                return;
            }
            this._explode = true;
            var sprite = new Sprite_Animation();
            this._animeSprite = sprite;
            sprite.targetObjects = [this];
            sprite.skipEffect = true;
            var animation = $dataAnimations[154];
            sprite.setup(sprite.targetObjects, animation, false, 0, null);
            Nore.EventArranger.spriteset()._effectsContainer.addChild(sprite);
            Nore.EventArranger.spriteset()._animationSprites.push(sprite);
            this._itemDropWait = 20;
        };
        return Sprite_BoxThrow;
    }(Nore.Sprite_ItemThrow));
    Nore.Sprite_BoxThrow = Sprite_BoxThrow;
})(Nore || (Nore = {}));
