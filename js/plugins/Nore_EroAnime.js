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
    var Sprite_EroAnimeBase = /** @class */ (function (_super) {
        __extends(Sprite_EroAnimeBase, _super);
        function Sprite_EroAnimeBase(tachieLayer) {
            var _this = _super.call(this) || this;
            _this._tachieLayer = tachieLayer;
            _this._eroActionList = [];
            _this._spriteMap = {};
            _this._lastTurn = $gamePlayer.turnCount();
            _this._actor = $gameActors.mainActor();
            _this.refresh();
            _this.update();
            return _this;
            //this._actor.addAcce(264);
            //this._actor.addAcce(268);
            //this.addChild(new TemanEroAction(Teman.goblin, Parts.chikubiRight, 2).createSprite())
            //this.addChild(new ShitaEroAction(Shita.goblin, Parts.kiss, 2).createSprite())
        }
        Sprite_EroAnimeBase.prototype.update = function () {
            _super.prototype.update.call(this);
            if ($gameSwitches.value(6)) {
                return;
            }
            if (this._actor.isEroActionChanged()) {
                this._actor.clearEroActionChanged();
                this.refresh();
            }
            this.updateSikyu();
        };
        Sprite_EroAnimeBase.prototype.isSikyuChanged = function () {
            if (this._lastVisible && $gameSwitches.value(995)) {
                return true;
            }
            this._lastVisible = $gameSwitches.value(995);
            var sexType = this._actor.sexType();
            var seieki = this._actor.seiekiCount();
            if (this._currentSexType != sexType) {
                return true;
            }
            if (this._currentSikyuSeieki != seieki) {
                return true;
            }
            if (this._lastInFrame != this._actor.inFrame()) {
                return true;
            }
            if (this._lastOutFrame != this._actor.outFrame()) {
                return true;
            }
            return false;
        };
        Sprite_EroAnimeBase.prototype.updateSikyu = function () {
            /*if (this._actor.breakId < 3 && $gameMap.isRogue()) {
                return;
            }*/
            var sexType = this._actor.sexType();
            var seieki = this._actor.seiekiCount();
            if (this.isSikyuChanged()) {
                this._lastInFrame = this._actor.inFrame();
                this._lastOutFrame = this._actor.outFrame();
                this._currentSexType = sexType;
                this._currentSikyuSeieki = seieki;
                this.refreshSikyuSprite();
            }
            var offset = 0.001;
            //this._tachieLayer.pivot.y = 130;
            //this._tachieLayer.y = 130;
            //this._tachieLayer.pivot.y = 200;
            if (this._sikyuSprite) {
                switch (this._sikyuSprite.index()) {
                    case 3:
                    case 12:
                    case 11:
                        this.scale.y = 1 - offset;
                        this._tachieLayer.scale.y = this.scale.y;
                        break;
                    case 4:
                    case 9:
                    case 10:
                        this.scale.y = 1 - offset * 2;
                        this._tachieLayer.scale.y = this.scale.y;
                        break;
                    case 5:
                    case 7:
                    case 8:
                        this.scale.y = 1 - offset * 3;
                        this._tachieLayer.scale.y = this.scale.y;
                        break;
                    case 6:
                        this.scale.y = 1 - offset * 3.5;
                        this._tachieLayer.scale.y = this.scale.y;
                        break;
                    default:
                        this.scale.y = 1;
                        this._tachieLayer.scale.y = 1;
                    //this.y = 0;
                    //this._tachieLayer.y = 0;
                }
                if (this._sikyuSprite.isPlaySe()) {
                    this.playSe();
                }
            }
        };
        Sprite_EroAnimeBase.prototype.playSe = function () {
            if (this._currentSexType == SexType.sex) {
                this.playSexSe();
            }
            if (this._currentSexType == SexType.shita) {
                this.playShitaSe();
            }
        };
        Sprite_EroAnimeBase.prototype.playSexSe = function () {
            var file = 'pis1';
            switch (Math.randomInt(3)) {
                case 0:
                    file = 'pis2';
                    break;
                case 1:
                    file = 'pis3';
                    break;
            }
            AudioManager.playSe({ name: file, volume: 85, pitch: 100, pan: 0 });
        };
        Sprite_EroAnimeBase.prototype.playShitaSe = function () {
            return;
            p('se');
            var file = 'kunni1';
            switch (Math.randomInt(8)) {
                case 0:
                    file = 'kunni2';
                    break;
                case 1:
                    file = 'kunni3';
                    break;
                default:
                    return;
            }
            AudioManager.playSe({ name: file, volume: 85, pitch: 100, pan: 0 });
        };
        Sprite_EroAnimeBase.prototype.refreshSikyuSprite = function () {
            this.removeSexSprite();
            if (!this.isSikyuVisible()) {
                return;
            }
            var sikyuFileName = '子宮0';
            var chitsuFileName = null;
            if (this._currentSexType == SexType.none) {
                sikyuFileName = '子宮' + this._actor.sikyuSeiekiCount();
            }
            else if (this._currentSexType == SexType.sex || this._currentSexType == SexType.endSyasei) {
                sikyuFileName = '子宮_上_' + this._actor.sikyuSeiekiCount();
                var sexEnemy = this._actor.sexEnemy;
                chitsuFileName = '子宮_' + sexEnemy.enemy().meta['chinpo'];
            }
            else if (this._currentSexType == SexType.shita) {
                sikyuFileName = '子宮_上_' + this._actor.sikyuSeiekiCount();
                chitsuFileName = '子宮_舌_0';
            }
            else {
                sikyuFileName = '子宮_上_' + this._actor.lastSikyuSeiekiCount() + '_射精';
                var sexEnemy = this._actor.sexEnemy;
                chitsuFileName = '子宮_' + sexEnemy.enemy().meta['chinpo'];
                //sikyuFileName = '子宮_' + sexEnemy.enemy().meta['chinpo'] + '_' + this._actor.sikyuSeiekiCount() + '_射精';
            }
            var x = -2;
            var y = -110;
            if (chitsuFileName) {
                this._chitsuSprite = new Sprite_SexEroAnime(chitsuFileName, this._actor.inFrame(), this._actor.outFrame(), this._actor.outStart(), this._currentSexType);
                this._chitsuSprite.x = x;
                this._chitsuSprite.y = y;
                this.addChild(this._chitsuSprite);
            }
            if (!$gameSystem.getEro(1).bote) {
                this._sikyuSprite = new Sprite_SexEroAnime(sikyuFileName, this._actor.inFrame(), this._actor.outFrame(), this._actor.outStart(), this._currentSexType);
                this._sikyuSprite.x = x;
                this._sikyuSprite.y = y;
                if (this._currentSexType == SexType.shita) {
                    this._sikyuSprite.pose();
                }
                this.addChild(this._sikyuSprite);
            }
        };
        Sprite_EroAnimeBase.prototype.removeSexSprite = function () {
            if (this._sikyuSprite) {
                this.removeChild(this._sikyuSprite);
            }
            if (this._chitsuSprite) {
                this.removeChild(this._chitsuSprite);
            }
        };
        Sprite_EroAnimeBase.prototype.isSikyuVisible = function () {
            /*if (SceneManager._scene instanceof Scene_MenuRogue) {
                if (this._currentSikyuSeieki >= 1) {
                    return true;
                }
            }*/
            if ($gameSwitches.value(995)) {
                return false;
            }
            if ($gamePlayer.isDefeat()) {
                if (this._currentSikyuSeieki >= 1) {
                    return true;
                }
            }
            if ($gameSwitches.value(5)) {
                if (this._currentSikyuSeieki >= 1) {
                    return true;
                }
            }
            /*if (! $gameSwitches.value(35)) {
               return false;
           }*/
            if (this._currentSikyuSeieki >= 1) {
                //return true;
            }
            switch (this._currentSexType) {
                case SexType.sex:
                case SexType.syasei:
                case SexType.shita:
                    return true;
            }
            return false;
        };
        Sprite_EroAnimeBase.prototype.refresh = function () {
            for (var _i = 0, _a = this._actor.eroActionList(); _i < _a.length; _i++) {
                var action = _a[_i];
                if (this._eroActionList.contains(action)) {
                    continue;
                }
                var sprite = action.createSprite();
                this._spriteMap[action.id()] = sprite;
                this.addChild(sprite);
                this._eroActionList.push(action);
            }
            var removeList = [];
            for (var _b = 0, _c = this._eroActionList; _b < _c.length; _b++) {
                var action = _c[_b];
                if (!this._actor.eroActionList().contains(action)) {
                    removeList.push(action);
                }
            }
            for (var _d = 0, removeList_1 = removeList; _d < removeList_1.length; _d++) {
                var action = removeList_1[_d];
                var sprite = this._spriteMap[action.id()];
                this.removeChild(sprite);
                delete this._spriteMap[action.id()];
                this._eroActionList.splice(this._eroActionList.indexOf(action), 1);
            }
        };
        Sprite_EroAnimeBase.prototype.destroy = function () {
            if (this._sikyuSprite) {
                this.removeChild(this._sikyuSprite);
            }
            _super.prototype.destroy.call(this);
        };
        return Sprite_EroAnimeBase;
    }(Sprite));
    Nore.Sprite_EroAnimeBase = Sprite_EroAnimeBase;
    var Sprite_EroAnime = /** @class */ (function (_super) {
        __extends(Sprite_EroAnime, _super);
        function Sprite_EroAnime(_fileName) {
            var _this = _super.call(this) || this;
            _this._fileName = _fileName;
            _this._index = -1;
            return _this;
        }
        Sprite_EroAnime.prototype.update = function () {
            _super.prototype.update.call(this);
            this.redraw();
        };
        Sprite_EroAnime.prototype.redraw = function () {
            this.removeChildren();
            var texture = this.nextFile();
            var sprite = new PIXI.Sprite(texture);
            this.addChild(sprite);
        };
        Sprite_EroAnime.prototype.nextFile = function () {
            this._index++;
            var texture = PIXI.utils.TextureCache[this.fileName() + '.png'];
            if (texture) {
                return texture;
            }
            this._index = 0;
            texture = PIXI.utils.TextureCache[this.fileName() + '.png'];
            if (!texture) {
                console.error('ファイルが見つかりません' + this.fileName());
            }
            return texture;
        };
        Sprite_EroAnime.prototype.fileName = function () {
            return 'actor01_' + this._fileName + '_' + this._index;
        };
        Sprite_EroAnime.prototype.index = function () {
            return this._index;
        };
        Sprite_EroAnime.prototype.destroy = function () {
            this.removeChildren();
            _super.prototype.destroy.call(this);
        };
        return Sprite_EroAnime;
    }(Sprite));
    Nore.Sprite_EroAnime = Sprite_EroAnime;
    var Sprite_SexEroAnime = /** @class */ (function (_super) {
        __extends(Sprite_SexEroAnime, _super);
        function Sprite_SexEroAnime(fileName, inFrame, outFrame, outStart, sexType) {
            var _this = _super.call(this, fileName) || this;
            _this._frameIndex = 0;
            _this._lastIndex = 0;
            // p(inFrame + ' ' + outFrame + ' ' + sexType)
            if (fileName.includes('射精') || sexType == SexType.none) {
                return _this;
            }
            if (sexType == SexType.syasei || sexType == SexType.endSyasei) {
                _this._pose = true;
                _this._posing = true;
                _this._frameList = [6];
                return _this;
            }
            if (inFrame > 0 || outFrame > 0) {
                _this._frameList = [];
                if (outStart) {
                    _this.pushOutFrame(outFrame);
                    _this.pushInFrame(inFrame);
                }
                else {
                    _this.pushInFrame(inFrame);
                    _this.pushOutFrame(outFrame);
                }
                if (inFrame == 0 || outFrame == 0) {
                    _this._pose = true;
                }
                _this.update();
            }
            return _this;
        }
        Sprite_SexEroAnime.prototype.pose = function () {
            this._frameList = [0];
            this._posing = true;
            this._pose = true;
        };
        Sprite_SexEroAnime.prototype.pushInFrame = function (inFrame) {
            for (var i = 0; i < inFrame; i++) {
                var index = Math.round(i * 6 / inFrame);
                this._frameList.push(index);
            }
        };
        Sprite_SexEroAnime.prototype.pushOutFrame = function (outFrame) {
            for (var i = 0; i < outFrame; i++) {
                var index = Math.round(i * 8 / outFrame) + 6;
                this._frameList.push(index);
            }
        };
        Sprite_SexEroAnime.prototype.update = function () {
            _super.prototype.update.call(this);
            $gameTemp.sexAnimeIndex = this._index;
        };
        Sprite_SexEroAnime.prototype.nextFile = function () {
            if (!this._frameList) {
                return _super.prototype.nextFile.call(this);
            }
            this._frameIndex++;
            if (this._frameIndex >= this._frameList.length) {
                if (this._pose) {
                    this._frameIndex--;
                    this._posing = true;
                }
                else {
                    this._frameIndex = 0;
                }
            }
            this._lastIndex = this._index;
            this._index = this._frameList[this._frameIndex];
            var texture = PIXI.utils.TextureCache[this.fileName() + '.png'];
            if (!texture) {
                console.error('ファイルが見つかりません' + this.fileName());
            }
            return texture;
        };
        Sprite_SexEroAnime.prototype.isPlaySe = function () {
            if (this._posing) {
                return false;
            }
            return this._index == 6 && this._lastIndex != 6;
        };
        return Sprite_SexEroAnime;
    }(Sprite_EroAnime));
})(Nore || (Nore = {}));
var Parts;
(function (Parts) {
    Parts["chikubiRight"] = "chikubiRight";
    Parts["chikubiLeft"] = "chikubiLeft";
    Parts["kiss"] = "kiss";
    Parts["none"] = "none";
    Parts["manko"] = "manko";
})(Parts || (Parts = {}));
var Shita;
(function (Shita) {
    Shita[Shita["human"] = 0] = "human";
    Shita[Shita["goblin"] = 1] = "goblin";
})(Shita || (Shita = {}));
var Teman;
(function (Teman) {
    Teman[Teman["human"] = 0] = "human";
    Teman[Teman["goblin"] = 1] = "goblin";
})(Teman || (Teman = {}));
var Momi;
(function (Momi) {
    Momi[Momi["human"] = 0] = "human";
    Momi[Momi["goblin"] = 1] = "goblin";
})(Momi || (Momi = {}));
var Sounyu;
(function (Sounyu) {
    Sounyu[Sounyu["human"] = 0] = "human";
    Sounyu[Sounyu["goblin"] = 1] = "goblin";
})(Sounyu || (Sounyu = {}));
var SexType;
(function (SexType) {
    SexType["syasei"] = "syasei";
    SexType["endSyasei"] = "endSyasei";
    SexType["sex"] = "sex";
    SexType["none"] = "none";
    SexType["shita"] = "shita";
})(SexType || (SexType = {}));
var EroAction = /** @class */ (function () {
    function EroAction(_parts, _remainTurn, _subject) {
        this._parts = _parts;
        this._remainTurn = _remainTurn;
        this._subject = _subject;
        this._id = Graphics.frameCount + '_' + this._parts + '_' + this._remainTurn + '_' + this.getType();
    }
    EroAction.prototype.id = function () {
        return this._id;
    };
    EroAction.prototype.parts = function () {
        return this._parts;
    };
    EroAction.prototype.subject = function () {
        return this._subject;
    };
    EroAction.prototype.onTurnEnd = function () {
        this._remainTurn--;
        if (this._remainTurn == 0) {
            return true;
        }
    };
    EroAction.prototype.itemId = function () {
        return -1;
    };
    return EroAction;
}());
var ShitaEroAction = /** @class */ (function (_super) {
    __extends(ShitaEroAction, _super);
    function ShitaEroAction(_type, parts, remainTurn, subject) {
        var _this = _super.call(this, parts, remainTurn, subject) || this;
        _this._type = _type;
        return _this;
    }
    ShitaEroAction.prototype.getType = function () {
        return 'shita';
    };
    ShitaEroAction.prototype.createSprite = function () {
        var sprite;
        switch (this._type) {
            case Shita.human:
                sprite = new Nore.Sprite_EroAnime('舌1');
                break;
            case Shita.goblin:
                sprite = new Nore.Sprite_EroAnime('舌2');
                break;
            default:
                console.error(this._type);
                return;
        }
        switch (this._parts) {
            case Parts.chikubiRight:
                if ($gameActors.mainActor().hasAcce(282)) {
                    sprite.x = 120;
                    sprite.y = -100;
                }
                else {
                    sprite.x = 140;
                    sprite.y = -100;
                }
                break;
            case Parts.chikubiLeft:
                if ($gameActors.mainActor().hasAcce(282)) {
                    sprite.x = 20;
                    sprite.y = -100;
                }
                else {
                    sprite.x = -10;
                    sprite.y = -100;
                }
                break;
            case Parts.manko:
                sprite.x = 120;
                sprite.y = 320;
                break;
            case Parts.kiss:
                sprite.x = 80;
                sprite.y = -240;
                break;
            default:
                console.error(this._type);
                return;
        }
        return sprite;
    };
    return ShitaEroAction;
}(EroAction));
var VibeEroAction = /** @class */ (function (_super) {
    __extends(VibeEroAction, _super);
    function VibeEroAction(_itemId, parts) {
        var _this = _super.call(this, parts, -1, null) || this;
        _this._itemId = _itemId;
        return _this;
    }
    VibeEroAction.prototype.itemId = function () {
        return this._itemId;
    };
    VibeEroAction.prototype.getType = function () {
        return 'vibe';
    };
    VibeEroAction.prototype.createSprite = function () {
        var sprite = new Nore.Sprite_EroAnime('バイブの呪い');
        sprite.y = -100;
        return sprite;
    };
    return VibeEroAction;
}(EroAction));
var SlimeEroAction = /** @class */ (function (_super) {
    __extends(SlimeEroAction, _super);
    function SlimeEroAction(parts, remainTurn, subject) {
        return _super.call(this, parts, remainTurn, subject) || this;
    }
    SlimeEroAction.prototype.getType = function () {
        return 'slime';
    };
    SlimeEroAction.prototype.createSprite = function () {
        var sprite;
        switch (this._parts) {
            case Parts.chikubiRight:
                sprite = new Nore.Sprite_EroAnime('スライム2');
                sprite.x = 140;
                sprite.y = -100;
                break;
            case Parts.chikubiLeft:
                sprite = new Nore.Sprite_EroAnime('スライム1');
                sprite.x = -10;
                sprite.y = -100;
                break;
            case Parts.manko:
                sprite = new Nore.Sprite_EroAnime('スライム3');
                sprite.x = 120;
                sprite.y = 320;
                break;
            default:
                console.error(this._parts);
                return;
        }
        sprite.x = 0;
        sprite.y = -100;
        return sprite;
    };
    return SlimeEroAction;
}(EroAction));
var TemanEroAction = /** @class */ (function (_super) {
    __extends(TemanEroAction, _super);
    function TemanEroAction(_type, parts, remainTurn, subject) {
        var _this = _super.call(this, parts, remainTurn, subject) || this;
        _this._type = _type;
        return _this;
    }
    TemanEroAction.prototype.getType = function () {
        return 'teman';
    };
    TemanEroAction.prototype.createSprite = function () {
        var sprite;
        switch (this._type) {
            case Teman.human:
                sprite = new Nore.Sprite_EroAnime('手マン1');
                break;
            case Teman.goblin:
                sprite = new Nore.Sprite_EroAnime('手マン2');
                break;
            default:
                console.error(this._type);
                return;
        }
        sprite.x = 0;
        sprite.y = -100;
        return sprite;
    };
    return TemanEroAction;
}(EroAction));
