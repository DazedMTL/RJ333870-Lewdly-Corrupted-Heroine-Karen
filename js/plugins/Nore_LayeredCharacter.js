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
var Sprite_Player = /** @class */ (function (_super) {
    __extends(Sprite_Player, _super);
    function Sprite_Player(player) {
        var _this = _super.call(this, player) || this;
        _this._hoppeLayer = new Sprite_LayeredCharacter(player, EquipType.hoppe);
        _this._innerBottomLayer = new Sprite_LayeredCharacter(player, EquipType.innerBottom);
        _this._innerTopLayer = new Sprite_LayeredCharacter(player, EquipType.innerTop);
        _this._legLayer = new Sprite_LayeredCharacter(player, EquipType.leg);
        _this._armLayer = new Sprite_LayeredCharacter(player, EquipType.arm);
        _this._outerLayer = new Sprite_LayeredCharacter(player, EquipType.outer);
        _this._outerBottomLayer = new Sprite_LayeredCharacter(player, EquipType.outerBottom);
        _this._outerTopLayer = new Sprite_LayeredCharacter(player, EquipType.outerTop);
        _this._headLayer = new Sprite_LayeredCharacter(player, EquipType.head);
        _this._headLayer2 = new Sprite_LayeredCharacter(player, EquipType.head2);
        _this.addChild(_this._hoppeLayer);
        _this.addChild(_this._legLayer);
        _this.addChild(_this._armLayer);
        _this.addChild(_this._innerBottomLayer);
        _this.addChild(_this._innerTopLayer);
        _this.addChild(_this._outerTopLayer);
        _this.addChild(_this._outerBottomLayer);
        _this.addChild(_this._outerLayer);
        _this.addChild(_this._headLayer);
        _this.addChild(_this._headLayer2);
        return _this;
    }
    Sprite_Player.prototype.updateBitmap = function () {
        if (this.isImageChanged()) {
            this._initialized = true;
            this._characterName = this.characterName();
            //this._characterName = 'actor01';
            this._characterIndex = 0;
            this.setCharacterBitmap();
        }
    };
    Sprite_Player.prototype.isImageChanged = function () {
        if (this._initialized) {
            return this._characterName != this.characterName();
        }
        return true;
    };
    Sprite_Player.prototype.characterName = function () {
        if ($gameSwitches.value(41)) {
            return 'actor07';
        }
        var actor = $gameActors.mainActor();
        if (actor.boteId > 2) {
            return 'actor01_base-bote';
        }
        else {
            return 'actor01_base';
        }
    };
    Sprite_Player.prototype.updateOther = function () {
        this.opacity = this._character.opacity();
        this.blendMode = this._character.blendMode();
        //this._bushDepth = this._character.bushDepth();
    };
    Sprite_Player.prototype.listFiles = function () {
        var files = [];
        files.push(this.characterName());
        files.push(this._hoppeLayer.fileName());
        files.push(this._innerBottomLayer.fileName());
        files.push(this._innerTopLayer.fileName());
        files.push(this._legLayer.fileName());
        files.push(this._armLayer.fileName());
        files.push(this._outerLayer.fileName());
        files.push(this._outerTopLayer.fileName());
        files.push(this._outerBottomLayer.fileName());
        files.push(this._headLayer.fileName());
        files.push(this._headLayer2.fileName());
        return files;
    };
    return Sprite_Player;
}(Sprite_Character));
var EquipType;
(function (EquipType) {
    EquipType[EquipType["hoppe"] = 0] = "hoppe";
    EquipType[EquipType["outer"] = 1] = "outer";
    EquipType[EquipType["outerTop"] = 2] = "outerTop";
    EquipType[EquipType["outerBottom"] = 3] = "outerBottom";
    EquipType[EquipType["head"] = 4] = "head";
    EquipType[EquipType["head2"] = 5] = "head2";
    EquipType[EquipType["leg"] = 6] = "leg";
    EquipType[EquipType["arm"] = 7] = "arm";
    EquipType[EquipType["innerBottom"] = 8] = "innerBottom";
    EquipType[EquipType["innerTop"] = 9] = "innerTop";
})(EquipType || (EquipType = {}));
var Sprite_LayeredCharacter = /** @class */ (function (_super) {
    __extends(Sprite_LayeredCharacter, _super);
    function Sprite_LayeredCharacter(player, _type) {
        var _this = _super.call(this, player) || this;
        _this._type = _type;
        return _this;
    }
    Sprite_LayeredCharacter.prototype.updateBitmap = function () {
        if (this.isImageChanged()) {
            this._fileName = this.fileName();
            this._characterName = this._fileName;
            this._characterIndex = 0;
            this.setCharacterBitmap();
            //            this.bitmap = ImageManager.loadCharacter(this._fileName);
        }
    };
    Sprite_LayeredCharacter.prototype.updatePosition = function () {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    };
    Sprite_LayeredCharacter.prototype.isImageChanged = function () {
        return this._fileName != this.fileName();
    };
    Sprite_LayeredCharacter.prototype.fileNameActor7 = function () {
        return '';
    };
    Sprite_LayeredCharacter.prototype.fileName = function () {
        var actor = $gameActors.mainActor();
        if ($gameSwitches.value(41)) {
            return this.fileNameActor7();
        }
        var bote = '';
        if (actor.boteId > 1) {
            bote = '-bote';
        }
        switch (this._type) {
            case EquipType.hoppe:
                if (actor.hoppeId == 0) {
                    return '';
                }
                return 'actor01_hoppe';
            case EquipType.outer:
                if (actor.outerId == 'a') {
                    return '';
                }
                return 'actor01_outer_%1'.format(actor.outerId) + bote;
            case EquipType.outerTop:
                if (actor.outerTopId == 'a') {
                    return '';
                }
                if (actor.breakId >= 3) {
                    return '';
                }
                return 'actor01_outerTop_%1'.format(actor.outerTopId);
            case EquipType.outerBottom:
                if (actor.outerBottomId == 'a') {
                    return '';
                }
                if (actor.breakId >= 2) {
                    return '';
                }
                return 'actor01_outerBottom_%1'.format(actor.outerBottomId) + bote;
            case EquipType.head:
                if (actor.headId == 'a') {
                    return '';
                }
                return 'actor01_head_%1'.format(actor.headId);
            case EquipType.head2:
                if (actor.headId2 == 'a') {
                    return '';
                }
                return 'actor01_head_%1'.format(actor.headId2);
            case EquipType.leg:
                if (actor.legId == 'a') {
                    return '';
                }
                return 'actor01_leg_%1'.format(actor.legId);
            case EquipType.arm:
                if (actor.armId == 'a') {
                    return '';
                }
                return 'actor01_arm_%1'.format(actor.armId);
            case EquipType.innerBottom:
                if (actor.innerBottomId == 'a') {
                    return '';
                }
                if (actor.breakId >= 2) {
                    return '';
                }
                return 'actor01_innerBottom_%1'.format(actor.innerBottomId) + bote;
            case EquipType.innerTop:
                if (actor.innerTopId == 'a') {
                    return '';
                }
                if (actor.breakId >= 3) {
                    return '';
                }
                return 'actor01_innerTop_%1'.format(actor.innerTopId);
        }
    };
    return Sprite_LayeredCharacter;
}(Sprite_Character));
Spriteset_Map.prototype.createCharacters = function () {
    this._characterSprites = [];
    for (var _i = 0, _a = $gameMap.events(); _i < _a.length; _i++) {
        var event_1 = _a[_i];
        this._characterSprites.push(new Sprite_Character(event_1));
    }
    for (var _b = 0, _c = $gameMap.vehicles(); _b < _c.length; _b++) {
        var vehicle = _c[_b];
        this._characterSprites.push(new Sprite_Character(vehicle));
    }
    for (var _d = 0, _e = $gamePlayer.followers().reverseData(); _d < _e.length; _d++) {
        var follower = _e[_d];
        this._characterSprites.push(new Sprite_Character(follower));
    }
    this._characterSprites.push(new Sprite_Player($gamePlayer, $gameActors.mainActor()));
    for (var _f = 0, _g = this._characterSprites; _f < _g.length; _f++) {
        var sprite = _g[_f];
        this._tilemap.addChild(sprite);
    }
};
