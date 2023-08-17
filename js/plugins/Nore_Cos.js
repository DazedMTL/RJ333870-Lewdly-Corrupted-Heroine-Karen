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
/*:ja
 * @target MZ
 * @author ル
 *
 * @help
 * ・コス変更
 * ・アクセON
 * ・アクセOFF
 * ・ポーズ変更
 * ・胸変更
 * ・ボテ
 *
 * @desc コス変更
 *
 * @command change
 * @text コス変更
 * @des コス変更
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg outerId
 * @type string
 * @text outerId
 * @desc outerId
 *
 * @arg outerTopId
 * @type string
 * @text outerTopId
 * @desc outerTopId
 *
 * @arg outerBottomId
 * @type string
 * @text outerBottomId
 * @desc outerBottomId
 *
 * @arg armId
 * @type string
 * @text armId
 * @desc armId
 *
 * @arg legId
 * @type string
 * @text legId
 * @desc legId
 *
 * @arg innerTopId
 * @type string
 * @text innerTopId
 * @desc innerTopId
 *
 * @arg innerBottomId
 * @type string
 * @text innerBottomId
 * @desc innerBottomId
 *
 *
 * @command acceOn
 * @text アクセON
 * @des アクセON
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg acceId
 * @type number
 * @text acceId
 * @desc acceId
 *
 *
 * @command acceOff
 * @text アクセOFF
 * @des アクセOFF
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg acceId
 * @type number
 * @text acceId
 * @desc acceId
 *
 * @command pose
 * @text ポーズ変更
 * @des ポーズ変更
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg poseId
 * @type number
 * @text poseId
 * @desc poseId
 *
 * @command breasts
 * @text 胸変更
 * @des 胸変更
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg breastsId
 * @type number
 * @text breastsId
 * @desc breastsId
 *
 * @command bote
 * @text ボテ
 * @des ボテ
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg boteId
 * @type number
 * @text boteId
 * @desc boteId
 */
var Nore;
(function (Nore) {
    var pluginName = 'Nore_Cos';
    PluginManager.registerCommand(pluginName, 'change', function (args) {
        var actorId = args.actorId;
        var actor = $gameActors.actor(actorId);
        var outerId = args.outerId;
        if (outerId && outerId.length > 0) {
            actor.setOuterId(outerId);
        }
        var outerTopId = args.outerTopId;
        if (outerTopId && outerTopId.length > 0) {
            actor.setOuterTopId(outerTopId);
        }
        var outerBottomId = args.outerBottomId;
        if (outerBottomId && outerBottomId.length > 0) {
            actor.setOuterBottomId(outerBottomId);
        }
        var armId = args.armId;
        if (armId && armId.length > 0) {
            actor.setArmId(armId);
        }
        var legId = args.legId;
        if (legId && legId.length > 0) {
            actor.setLegId(legId);
        }
        var innerTopId = args.innerTopId;
        if (innerTopId && innerTopId.length > 0) {
            actor.setInnerTopId(innerTopId);
        }
        var innerBottomId = args.innerBottomId;
        if (innerBottomId && innerBottomId.length > 0) {
            actor.setInnerBottomId(innerBottomId);
        }
    });
    PluginManager.registerCommand(pluginName, 'acceOn', function (args) {
        var actorId = args.actorId;
        var actor = $gameActors.actor(actorId);
        actor.addAcce(args.acceId);
    });
    PluginManager.registerCommand(pluginName, 'acceOff', function (args) {
        var actorId = args.actorId;
        var actor = $gameActors.actor(actorId);
        actor.removeAcce(args.acceId);
    });
    PluginManager.registerCommand(pluginName, 'pose', function (args) {
        var actorId = args.actorId;
        var actor = $gameActors.actor(actorId);
        actor.setPoseId(args.poseId);
    });
    PluginManager.registerCommand(pluginName, 'breasts', function (args) {
        var actorId = args.actorId;
        var actor = $gameActors.actor(actorId);
        actor.setBreastsId(args.breastsId);
    });
    PluginManager.registerCommand(pluginName, 'bote', function (args) {
        var actorId = args.actorId;
        var actor = $gameActors.actor(actorId);
        actor.setBoteId(parseInt(args.boteId));
    });
    Game_Item.prototype.isOuter = function () {
        return this.outerId() != null;
    };
    Game_Item.prototype.isInnerTop = function () {
        return this.innerTopId() != null;
    };
    Game_Item.prototype.isInnerBottom = function () {
        return this.innerBottomId() != null;
    };
    Game_Item.prototype.outerId = function () {
        return this.object().meta['outer'];
    };
    Game_Item.prototype.innerTopId = function () {
        return this.object().meta['innerTop'];
    };
    Game_Item.prototype.innerBottomId = function () {
        return this.object().meta['innerBottom'];
    };
})(Nore || (Nore = {}));
var Game_CostumeActor = /** @class */ (function (_super) {
    __extends(Game_CostumeActor, _super);
    function Game_CostumeActor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._eroEquipCount = 0;
        _this._defaultFaceIdMorning = 6;
        _this._defaultFaceIdNight = 6;
        _this._defaultHoppeIdMorning = 0;
        _this._defaultHoppeIdNight = 0;
        return _this;
    }
    Game_CostumeActor.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._outerId = 'a';
        this._outerTopId = 'a';
        this._outerBottomId = 'a';
        this._outerItemId = 0;
        this._armItemId = 0;
        this._legItemId = 0;
        this._innerTopItemId = 0;
        this._innerBottomItemId = 0;
        this._castOffInnerTop = false;
        this._castOffInnerBottom = false;
        this._castOffOuter = false;
        this.acceMap = {};
        this._acceZ = [];
        this._chikubiId = 1;
        this._faceId = 1;
        this._poseId = 1;
        this._hoppeId = 0;
        this._boteId = 1;
        this._namidaId = 0;
        this._cacheChanged = true;
        this._breakId = 0;
        this.setDirty();
    };
    Game_CostumeActor.prototype.listFile = function () {
        p('outer: ' + this.outerTopMainFile());
        p('innerTop: ' + this.innerTopFile());
        p('innerBottom: ' + this.innerBottomFile());
        p('chikubi: ' + this.chikubiFile());
        p('breasts: ' + this.breastsFile());
    };
    Game_CostumeActor.prototype.resetFace = function () {
        if ($gameSwitches.value(70)) {
            // 出産中
            return;
        }
        var faceId = 1;
        var hoppeId = 0;
        if ($gameSwitches.value(1)) {
            faceId = this.calcBattleFaceId();
        }
        else {
            if ($gameSwitches.value(42)) {
                // 奴隷中
                faceId = 10;
            }
            else {
                faceId = this.defaultFaceId;
                hoppeId = Math.max(0, this.defaultHoppeId - 1);
            }
        }
        this.setFaceId(faceId);
        this.setHoppeId(hoppeId);
    };
    Game_CostumeActor.prototype.setDefaultHoppeId = function (hoppeId) {
        if ($gameSwitches.value(12)) {
            // 夜
            this._defaultHoppeIdNight = hoppeId;
        }
        else {
            this._defaultHoppeIdMorning = hoppeId;
        }
    };
    Object.defineProperty(Game_CostumeActor.prototype, "defaultHoppeId", {
        get: function () {
            if ($gameSwitches.value(12)) {
                // 夜
                return this._defaultHoppeIdNight;
            }
            return this._defaultHoppeIdMorning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "defaultPoseId", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "defaultFaceId", {
        get: function () {
            if ($gameSwitches.value(12)) {
                // 夜
                return this._defaultFaceIdNight;
            }
            return this._defaultFaceIdMorning;
        },
        enumerable: true,
        configurable: true
    });
    Game_CostumeActor.prototype.setDefaultFaceId = function (faceId) {
        if ($gameSwitches.value(12)) {
            // 夜
            this._defaultFaceIdNight = faceId;
        }
        else {
            this._defaultFaceIdMorning = faceId;
        }
    };
    Object.defineProperty(Game_CostumeActor.prototype, "baseId", {
        get: function () {
            return 'actor0' + this.actorId() + '_';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "breakId", {
        get: function () {
            return this._breakId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "poseId", {
        get: function () {
            if (this._boteId >= 3 && this._poseId == 1) {
                return 2;
            }
            return this._poseId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "boteId", {
        get: function () {
            return this._boteId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "faceId", {
        get: function () {
            if (!this._faceId) {
                return 0;
            }
            return this._faceId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "hoppeId", {
        get: function () {
            if (this.breakId >= 2) {
                return 2;
            }
            if (this._eroEquipCount > 0) {
                return Math.max(1, this._hoppeId);
            }
            if (this.breakId == 1) {
                return Math.max(1, this._hoppeId);
            }
            return this._hoppeId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "namidaId", {
        get: function () {
            return this._namidaId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "chikubiId", {
        get: function () {
            return this._chikubiId || 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "outerId", {
        get: function () {
            if (this._castOffOuter) {
                return 'a';
            }
            if (this._outerId != null) {
                return this._outerId;
            }
            if (this._outerItemId === 0) {
                return 'a';
            }
            return $dataArmors[this._outerItemId].meta['outer'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "outerTopId", {
        get: function () {
            if (this._castOffOuter) {
                return 'a';
            }
            if (this.outerId != 'a') {
                return 'a';
            }
            if (this._outerTopId != null) {
                return this._outerTopId;
            }
            if (this._outerItemId === 0) {
                return 'a';
            }
            return $dataArmors[this._outerItemId].meta['outerTop'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "outerBottomId", {
        get: function () {
            if (this._castOffOuter) {
                return 'a';
            }
            if (this.outerId != 'a') {
                return 'a';
            }
            if (this._outerBottomId != null) {
                return this._outerBottomId;
            }
            if (this._outerItemId === 0) {
                return 'a';
            }
            var id = $dataArmors[this._outerItemId].meta['outerBottom'];
            if (id == 'c' && !this.hasInnerBottom()) {
                return 'a';
            }
            return id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "legId", {
        get: function () {
            if (this._castOffOuter) {
                return 'a';
            }
            if (this._legId != null) {
                return this._legId;
            }
            if (this._legItemId === 0) {
                return 'a';
            }
            return $dataArmors[this._armItemId].meta['leg'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "armId", {
        get: function () {
            if (this._castOffOuter) {
                return 'a';
            }
            if (this._armId != null) {
                return this._armId;
            }
            if (this._armItemId === 0) {
                return 'a';
            }
            return $dataArmors[this._armItemId].meta['arm'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "innerBottomId", {
        get: function () {
            if (this._castOffOuter) {
                return 'a';
            }
            if (this._innerBottomId != null) {
                return this._innerBottomId;
            }
            if (this._innerBottomItemId === 0) {
                return 'a';
            }
            if (this._castOffInnerBottom) {
                return 'a';
            }
            return $dataArmors[this._innerBottomItemId].meta['innerBottom'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "innerTopId", {
        get: function () {
            if (this._castOffOuter) {
                return 'a';
            }
            if (this._innerTopId != null) {
                return this._innerTopId;
            }
            if (this._innerTopItemId === 0) {
                return 'a';
            }
            if (this._castOffInnerTop) {
                return 'a';
            }
            return $dataArmors[this._innerTopItemId].meta['innerTop'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "outerArmor", {
        get: function () {
            if (this._outerItemId === 0) {
                return null;
            }
            return $dataArmors[this._outerItemId];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "innerBottomArmor", {
        get: function () {
            if (this._innerBottomItemId === 0) {
                return null;
            }
            return $dataArmors[this._innerBottomItemId];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_CostumeActor.prototype, "innerTopArmor", {
        get: function () {
            if (this._innerTopItemId === 0) {
                return null;
            }
            return $dataArmors[this._innerTopItemId];
        },
        enumerable: true,
        configurable: true
    });
    Game_CostumeActor.prototype.setBoteId = function (n) {
        this._boteId = n;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.hoppeAcceId = function () {
        var ret = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['hoppe']) {
                return parseInt(acceItem.meta['hoppe']);
            }
        }
        return 0;
    };
    Game_CostumeActor.prototype.recoverBreakId = function () {
        this._breakId = 0;
        this.setDirty();
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.castOffOuter = function () {
        if (this._castOffOuter) {
            return;
        }
        this._castOffOuter = true;
        this.setDirty();
    };
    Game_CostumeActor.prototype.putOnOuter = function () {
        if (!this._castOffOuter) {
            return;
        }
        this._castOffOuter = false;
        this.setDirty();
    };
    Game_CostumeActor.prototype.isDirty = function () {
        return this._dirty;
    };
    Game_CostumeActor.prototype.setDirty = function () {
        this._dirty = true;
    };
    Game_CostumeActor.prototype.clearDirty = function () {
        this._dirty = false;
    };
    Game_CostumeActor.prototype.isCacheChanged = function () {
        return this._cacheChanged;
    };
    Game_CostumeActor.prototype.setCacheChanged = function () {
        Nore.Tachie.actorCashedSprites[this.actorId()] = false;
        if (this._cacheChanged) {
            return;
        }
        this._cacheChanged = true;
        this.setDirty();
        $gamePlayer.refresh();
    };
    Game_CostumeActor.prototype.clearCacheChanged = function () {
        this._cacheChanged = false;
    };
    Game_CostumeActor.prototype.castOffInnerBottom = function () {
        if (this._castOffInnerBottom) {
            return;
        }
        this._castOffInnerBottom = true;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.castOffInnerTop = function () {
        if (this._castOffInnerTop) {
            return;
        }
        this._castOffInnerTop = true;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.isCastOffOuter = function () {
        return this._castOffOuter;
    };
    Game_CostumeActor.prototype.isCastOffInnerTop = function () {
        return this._castOffInnerTop;
    };
    Game_CostumeActor.prototype.isCastOffInnerBottom = function () {
        return this._castOffInnerBottom;
    };
    Game_CostumeActor.prototype.tachieArrayString = function () {
        return [this.faceId, this.hoppeId, this.outerId, this.innerBottomId, this.innerTopId].toString();
    };
    Game_CostumeActor.prototype.hasOuter = function () {
        return true;
    };
    Game_CostumeActor.prototype.hasInnerBottom = function () {
        for (var key in this.acceMap) {
            if ($dataArmors[key].meta['noBottom']) {
                return false;
            }
        }
        return true;
    };
    Game_CostumeActor.prototype.hasInnerTop = function () {
        for (var key in this.acceMap) {
            if ($dataArmors[key].meta['noTop']) {
                return false;
            }
        }
        return true;
    };
    Game_CostumeActor.prototype.setFaceId = function (n) {
        if (this._faceId === n) {
            return;
        }
        this._faceId = n;
        this.setDirty();
    };
    Game_CostumeActor.prototype.setHoppeId = function (n) {
        if (this._hoppeId === n) {
            return;
        }
        this._hoppeId = n;
        this.setDirty();
    };
    Game_CostumeActor.prototype.setNamidaId = function (n) {
        if (this._namidaId === n) {
            return;
        }
        this._namidaId = n;
        this.setDirty();
    };
    Game_CostumeActor.prototype.setPoseId = function (n) {
        if (this._poseId === n) {
            return;
        }
        this._poseId = n;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setOuterId = function (newId) {
        if (this._outerId === newId) {
            return;
        }
        this._outerId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setOuterTopId = function (newId) {
        if (this._outerTopId === newId) {
            return;
        }
        this._outerTopId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setOuterBottomId = function (newId) {
        if (this._outerBottomId === newId) {
            return;
        }
        this._outerBottomId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setOuterItemId = function (newId) {
        if (this._outerItemId === newId) {
            return;
        }
        this._outerItemId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setBreakId = function (newId) {
        if (this._breakId === newId) {
            return;
        }
        this._breakId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setArmId = function (newId) {
        if (this._armId === newId) {
            return;
        }
        this._armId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setArmItemId = function (newId) {
        if (this._armItemId === newId) {
            return;
        }
        this._armItemId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setLegId = function (newId) {
        if (this._legId === newId) {
            return;
        }
        this._legId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setLegItemId = function (newId) {
        if (this._legItemId === newId) {
            return;
        }
        this._legItemId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setInnerBottomId = function (newId) {
        if (this._innerBottomId === newId) {
            return;
        }
        this._innerBottomId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setNaked = function (b) {
        if (this._naked === b) {
            return false;
        }
        this._naked = b;
        this.setCacheChanged();
        return true;
    };
    Game_CostumeActor.prototype.setInnerBottomItemId = function (newId) {
        if (this._innerBottomItemId === newId) {
            return;
        }
        this._innerBottomItemId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setInnerTopId = function (newId) {
        if (this._innerTopId === newId) {
            return;
        }
        this._innerTopId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setInnerTopItemId = function (newId) {
        if (this._innerTopItemId === newId) {
            return;
        }
        this._innerTopItemId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.setChikubiId = function (newId) {
        if (this._chikubiId === newId) {
            return;
        }
        this._chikubiId = newId;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.chikubiFile = function () {
        return this.baseId + 'chikubi_' + this.breastId() + '_' + this.nyurinId() + '_' + this.kuroId() + '_1';
    };
    Game_CostumeActor.prototype.nyurinId = function () {
        var nyurinId = 1;
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var armor = $dataArmors[i];
            if (armor.meta['nyurin']) {
                nyurinId = parseInt(armor.meta['nyurin']);
                break;
            }
        }
        return nyurinId;
    };
    Game_CostumeActor.prototype.kuroId = function () {
        var kuroId = 1;
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var armor = $dataArmors[i];
            if (armor.meta['kuro']) {
                kuroId = parseInt(armor.meta['kuro']);
                break;
            }
        }
        return kuroId;
    };
    Game_CostumeActor.prototype.removeChinpoCos = function () {
        this.setInnerBottomId('a');
        if (this.outerBottomId == 'c') {
            this.setOuterBottomId('a');
        }
        if (this.outerTopId == 'i') {
            this.setOuterTopId('a');
        }
        if (this.innerTopId == 'h') {
            this.setInnerTopId('a');
        }
    };
    Game_CostumeActor.prototype.breastId = function () {
        var breastId = 1;
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var armor = $dataArmors[i];
            if (armor.meta['breast']) {
                breastId = parseInt(armor.meta['breast']);
                break;
            }
        }
        return breastId;
    };
    Game_CostumeActor.prototype.legMainFile = function () {
        var id = this.legId;
        /*if (this._naked) {
            id = 'a';
        }*/
        var ero = $gameSystem.getEro(this.actorId());
        var bodyType = this.bodyType();
        if (bodyType != 'd') {
            bodyType = 'a';
        }
        return this.baseId + 'leg_' + id + '_main_' + bodyType;
    };
    Game_CostumeActor.prototype.armMainFile = function () {
        var id = this.armId;
        /*if (this._naked) {
            id = 'a';
        }*/
        var ero = $gameSystem.getEro(this.actorId());
        return this.baseId + 'arm_' + id + '_main_' + this.bodyType();
    };
    Game_CostumeActor.prototype.armFrontFile = function () {
        var id = this.armId;
        /*if (this._naked) {
            id = 'a';
        }*/
        return this.baseId + 'arm_' + id + '_front_' + this.bodyType();
    };
    Game_CostumeActor.prototype.breastsFile = function () {
        var id = this.breastId();
        return this.baseId + 'breasts_' + id + '_' + this.boteId;
    };
    Game_CostumeActor.prototype.outerBackFile = function () {
        var id = this.outerId;
        if (this._naked) {
            id = 'a';
        }
        return this.baseId + 'out_' + id + '_back_' + this.boteId + '_' + this.bodyType();
    };
    Game_CostumeActor.prototype.outerShadowFile = function () {
        if (!this.hasOuter()) {
            return null;
        }
        var id = this.outerId;
        if (this._naked) {
            id = 'a';
        }
        return this.baseId + 'out_' + id + '_shadow_' + this.boteId + '_' + this.bodyType();
    };
    Game_CostumeActor.prototype.outerMainFile = function () {
        var id = this.outerId;
        if (this._naked) {
            id = 'a';
        }
        if (!this.hasOuter()) {
            return null;
        }
        return this.baseId + 'out_' + id + '_main_' + this.boteId + '_' + this.bodyType();
    };
    Game_CostumeActor.prototype.outerTopMainFile = function () {
        var id = this.outerTopId;
        if (this._naked) {
            id = 'a';
        }
        if (this.innerTopId != 'a' && this._breakId >= 2) {
            return 'a';
        }
        if (this._breakId >= 3) {
            return 'a';
        }
        return this.baseId + 'out_' + id + '_top_main_' + this.boteId + '_' + this.breastId() + '_' + this.bodyType();
    };
    Game_CostumeActor.prototype.outerTopShadowFile = function () {
        var id = this.outerTopId;
        if (this._naked) {
            id = 'a';
        }
        if (this.innerTopId != 'a' && this._breakId >= 2) {
            return 'a';
        }
        if (this._breakId >= 3) {
            return 'a';
        }
        return this.baseId + 'out_' + id + '_top_shadow_' + this.boteId + '_' + this.breastId() + '_' + this.bodyType();
    };
    Game_CostumeActor.prototype.outerBottomMainFile = function () {
        var id = this.outerBottomId;
        if (id == 'c' && !this.hasInnerBottom()) {
            return 'a';
        }
        if (this._naked) {
            id = 'a';
        }
        if (this.innerBottomId != 'a' && this._breakId >= 1) {
            return 'a';
        }
        if (this._breakId >= 2) {
            return 'a';
        }
        return this.baseId + 'out_' + id + '_bottom_main_' + this.boteId + '_' + this.bodyType();
    };
    Game_CostumeActor.prototype.outerBottomShadowFile = function () {
        var id = this.outerBottomId;
        if (this._naked) {
            id = 'a';
        }
        if (id == 'c' && !this.hasInnerBottom()) {
            return 'a';
        }
        if (this.innerBottomId != 'a' && this._breakId >= 1) {
            return 'a';
        }
        if (this._breakId >= 2) {
            return 'a';
        }
        return this.baseId + 'out_' + id + '_bottom_shadow_' + this.boteId + '_' + this.bodyType();
    };
    Game_CostumeActor.prototype.outerFrontFile = function () {
        var id = this.outerId;
        if (this._naked) {
            id = 'a';
        }
        if (!this.hasOuter()) {
            return null;
        }
        return this.baseId + 'out_' + id + '_front_' + this.boteId + '_' + this.bodyType();
    };
    Game_CostumeActor.prototype.bodyBaseFile = function () {
        var type = this.bodyType();
        return this.baseId + 'body_' + 1 + '_' + type;
    };
    Game_CostumeActor.prototype.bodyBoteFile = function () {
        if (this.boteId == 1) {
            return '';
        }
        var type = this.bodyType();
        return this.baseId + 'body_' + this.boteId + '_' + type;
    };
    Game_CostumeActor.prototype.bodyType = function () {
        var type = 'a';
        if (this.hasState(33)) {
            type = 'd';
        }
        else if (this.hasState(31)) {
            type = 'c';
        }
        else if (this.poseId == 3) {
            type = 'e';
        }
        else if (this.poseId == 2) {
            type = 'b';
        }
        return type;
    };
    Game_CostumeActor.prototype.bodyTypeB = function () {
        switch (this.innerBottomId) {
            case 'c': return 'b';
            default: return 'a';
        }
    };
    Game_CostumeActor.prototype.bodyBackFileB = function () {
        return this.baseId + 'body_' + this.boteId + '_2' + this.bodyTypeB();
    };
    Game_CostumeActor.prototype.bodyBackFileC = function () {
        var type = 'a';
        return this.baseId + 'body_' + this.boteId + '_3' + type;
    };
    Game_CostumeActor.prototype.bodyFrontFile = function () {
        if (this.hasAcce(291)) {
            return this.baseId + 'face_' + 2;
        }
        else {
            return this.baseId + 'face_' + 1;
        }
    };
    Game_CostumeActor.prototype.innerBottomFile = function () {
        if (!this.hasInnerBottom()) {
            return null;
        }
        var id = this.innerBottomId;
        if (this._naked >= 2) {
            id = 'a';
        }
        if (this.breakId >= 2) {
            id = 'a';
        }
        if (this.innerTopId == 'h') {
            id = 'a';
        }
        return this.baseId + 'in_%1_bottom_main_%2_%3'.format(id, this.boteId, 1);
    };
    Game_CostumeActor.prototype.innerBottomShadowFile = function () {
        if (!this.hasInnerBottom()) {
            return null;
        }
        var id = this.innerBottomId;
        if (this._naked >= 2) {
            id = 'a';
        }
        if (this.breakId >= 2) {
            id = 'a';
        }
        if (this.innerTopId == 'h') {
            id = 'a';
        }
        var ero = $gameSystem.getEro(this.actorId());
        return this.baseId + 'in_%1_bottom_shadow_%2_%3'.format(id, this.boteId, 1);
    };
    Game_CostumeActor.prototype.innerTopFile = function () {
        if (!this.hasInnerTop()) {
            return null;
        }
        var id = this.innerTopId;
        if (this._naked >= 2) {
            id = 'a';
        }
        if (this.breakId >= 3) {
            id = 'a';
        }
        return this.baseId + 'in_%1_top_main_%2_%3'.format(id, this.boteId, this.breastId());
    };
    Game_CostumeActor.prototype.innerTopShadowFile = function () {
        if (!this.hasInnerTop()) {
            return null;
        }
        var id = this.innerTopId;
        if (this._naked >= 2) {
            return null;
        }
        if (this.breakId >= 3) {
            id = 'a';
        }
        return this.baseId + 'in_%1_top_shadow_%2_%3'.format(id, this.boteId, this.breastId());
    };
    Game_CostumeActor.prototype.hairFile = function () {
        if (this.hasAcce(291)) {
            return this.baseId + 'hair_' + 21;
        }
        else {
            return this.baseId + 'hair_' + 1;
        }
    };
    Game_CostumeActor.prototype.hoppeFile = function () {
        if (this.hoppeId === 0) {
            return null;
        }
        return this.baseId + 'hoppe' + this.hoppeId;
    };
    Game_CostumeActor.prototype.namidaFile = function () {
        if (this.namidaId === 0) {
            return null;
        }
        return this.baseId + 'namida' + this.namidaId;
    };
    Game_CostumeActor.prototype.faceFile = function () {
        return this.baseId + this.faceId.padZero(2);
    };
    Game_CostumeActor.prototype.getBackAcceList = function () {
        var ret = [];
        var list = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['backAcce']) {
                list.push(acceItem);
            }
        }
        list = list.sort(function (a, b) {
            var orderA = 0;
            var orderB = 0;
            if (a.meta['order']) {
                orderA = parseInt(a.meta['order']);
            }
            if (b.meta['order']) {
                orderB = parseInt(b.meta['order']);
            }
            return orderA - orderB;
        });
        var bote = this.boteId;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var acceItem = list_1[_i];
            var id = parseInt(acceItem.meta['acce']);
            if (acceItem.meta['alpha']) {
                ret.push([id, parseInt(acceItem.meta['alpha'])]);
            }
            else {
                if (acceItem.meta['bote']) {
                    ret.push(id.padZero(2) + '_b' + bote);
                }
                else {
                    ret.push(id.padZero(2));
                }
            }
        }
        return ret;
    };
    Game_CostumeActor.prototype.getSkinAcceList = function () {
        var ret = [];
        var list = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['skinAcce']) {
                if (acceItem.meta['nudeTop']) {
                    if (this._naked > 1) {
                        if (this.innerTopFile()) {
                            if (this.innerTopFile().indexOf('_a_') < 0) {
                                continue;
                            }
                        }
                    }
                    else {
                        if (this.innerTopFile()) {
                            if (this.innerTopFile().indexOf('_a_') < 0) {
                                continue;
                            }
                        }
                        if (!this._naked) {
                            if (this.outerMainFile()) {
                                if (this.outerMainFile().indexOf('_a_') < 0) {
                                    continue;
                                }
                            }
                        }
                    }
                }
                list.push(acceItem);
            }
        }
        list = list.sort(function (a, b) {
            var orderA = 0;
            var orderB = 0;
            if (a.meta['order']) {
                orderA = parseInt(a.meta['order']);
            }
            if (b.meta['order']) {
                orderB = parseInt(b.meta['order']);
            }
            return orderA - orderB;
        });
        var bote = this.boteId;
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var acceItem = list_2[_i];
            var id = parseInt(acceItem.meta['acce']);
            if (acceItem.meta['alpha']) {
                ret.push([id, parseInt(acceItem.meta['alpha'])]);
            }
            else {
                if (acceItem.meta['bote']) {
                    ret.push(id.padZero(2) + '_b' + bote);
                }
                else {
                    if (acceItem.meta['breastAcce']) {
                        ret.push(id.padZero(2) + '_b' + this.breastId() + '_' + this.nyurinId());
                    }
                    else {
                        if (acceItem.meta['p']) {
                            if (this.poseId == 4) {
                                ret.push(id.padZero(2) + '_p' + 4);
                            }
                            else {
                                ret.push(id.padZero(2) + '_p' + 1);
                            }
                        }
                        else {
                            ret.push(id.padZero(2));
                        }
                    }
                }
            }
        }
        return ret;
    };
    Game_CostumeActor.prototype.getMiddleAcceList = function () {
        var list = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['middleAcce']) {
                if (this._castOffOuter || this._naked) {
                    if (acceItem.meta['castOffOuter']) {
                        continue;
                    }
                }
                if (acceItem.id == 220) {
                    if (this.hasAcce(221)) {
                        continue;
                    }
                    if (parseInt(this.poseId) > 2) {
                        continue;
                    }
                }
                /*if (acceItem.meta['noBottom2']) {
                    if (this.innerBottomId != 'a') {
                        continue;
                    }
                    if (this.outerBottomId != 'a') {
                        continue;
                    }
                }*/
                list.push(acceItem);
            }
        }
        var ret = [];
        var bote = this.boteId;
        for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
            var acceItem = list_3[_i];
            var id = parseInt(acceItem.meta['acce']).padZero(2);
            if (bote && acceItem.meta['bote']) {
                ret.push(id + '_b' + bote);
            }
            else {
                var estrus1 = parseInt(acceItem.meta['estrus1']);
                var estrus2 = parseInt(acceItem.meta['estrus2']);
                if (estrus2 <= this.estrus) {
                    ret.push(id + '_e2');
                }
                else if (estrus1 <= this.estrus) {
                    ret.push(id + '_e1');
                }
                else {
                    ret.push(id);
                }
            }
        }
        /*ret = ret.sort(function (a, b) {
            return b - a;
        });*/
        return ret;
    };
    Game_CostumeActor.prototype.getSeiekiMiddleAcceList = function () {
        var list = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['seiekiMiddle']) {
                list.push(acceItem);
            }
        }
        var zList = this._acceZ;
        list = list.sort(function (a, b) {
            var indexA = zList.indexOf(a.id);
            var indexB = zList.indexOf(b.id);
            return indexB - indexA;
        });
        return list;
    };
    Game_CostumeActor.prototype.getSeiekiFrontAcceList = function () {
        var list = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['seiekiFront']) {
                list.push(acceItem);
            }
        }
        var zList = this._acceZ;
        list = list.sort(function (a, b) {
            var indexA = zList.indexOf(a.id);
            var indexB = zList.indexOf(b.id);
            return indexB - indexA;
        });
        return list;
    };
    Game_CostumeActor.prototype.getFrontAcceList = function () {
        var ret = [];
        var list = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['frontAcce']) {
                list.push(acceItem);
            }
        }
        list = list.sort(function (a, b) {
            var orderA = a.id;
            var orderB = b.id;
            if (a.meta['order']) {
                orderA = parseInt(a.meta['order']);
            }
            if (b.meta['order']) {
                orderB = parseInt(b.meta['order']);
            }
            return orderA - orderB;
        });
        for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
            var acceItem_1 = list_4[_i];
            if (acceItem_1.meta['kuro'] && this.hasAcce(291)) {
                ret.push(acceItem_1.meta['acce'] + 'k');
            }
            else {
                var id = parseInt(acceItem_1.meta['acce']).padZero(2);
                ret.push(id);
            }
        }
        return ret;
    };
    Game_CostumeActor.prototype.acceFile = function (id) {
        if (Array.isArray(id)) {
            id = id[0];
        }
        return this.baseId + 'acce_' + id;
    };
    Game_CostumeActor.prototype.acceBackFile = function (id) {
        if (Array.isArray(id)) {
            id = id[0];
        }
        return this.baseId + 'acce_back_' + id.padZero(2);
    };
    Game_CostumeActor.prototype.acceFileAlpha = function (data) {
        if (Array.isArray(data)) {
            return data[1] / 100.0;
        }
        return 1;
    };
    Game_CostumeActor.prototype.addAcce = function (id) {
        if (isNaN(id)) {
            console.error('addAcce:' + id);
            return;
        }
        if (this.hasAcce(id)) {
            var index = this._acceZ.indexOf(parseInt(id));
            if (index >= 0) {
                this._acceZ.splice(index, 1);
                this._acceZ.push(parseInt(id));
                this.setCacheChanged();
            }
            return;
        }
        this.acceMap[id] = true;
        this._acceZ.push(parseInt(id));
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.removeGroup = function (groupId, newId) {
        var removeList = [];
        for (var i in this.acceMap) {
            if (!this.acceMap[i]) {
                continue;
            }
            var acceItem = $dataArmors[i];
            if (acceItem.meta['group']) {
                var group = parseInt(acceItem.meta['group']);
                if (group == groupId) {
                    removeList.push(i);
                }
            }
        }
        for (var _i = 0, removeList_1 = removeList; _i < removeList_1.length; _i++) {
            var i = removeList_1[_i];
            delete this.acceMap[i];
        }
        this.addAcce(newId);
    };
    Game_CostumeActor.prototype.removeAcce = function (id) {
        this.acceMap[id] = false;
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.hasAcce = function (id) {
        return this.acceMap[id];
    };
    Game_CostumeActor.prototype.removeSeiekiAcceAll = function () {
        for (var i = 231; i <= 251; i++) {
            this.acceMap[i] = false;
        }
        this.setCacheChanged();
    };
    Game_CostumeActor.prototype.isHadaka = function () {
        if (this.outerId != 'a') {
            return false;
        }
        if (this.outerTopId == 'h') {
            return false;
        }
        if (this.outerTopId == 'i') {
            return false;
        }
        if (this.outerBottomId == 'a' && this.innerBottomId == 'a') {
            return true;
        }
        if (this.outerTopId == 'a' && this.innerTopId == 'a') {
            return true;
        }
        return false;
    };
    Game_CostumeActor.prototype.isHadakaTop = function () {
        if (this.outerId != 'a') {
            return false;
        }
        if (this.outerTopId == 'a' && this.innerTopId == 'a') {
            return true;
        }
        return false;
    };
    return Game_CostumeActor;
}(Game_Actor));
