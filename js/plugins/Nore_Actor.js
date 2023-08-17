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
 * @command AddEroAction
 * @text エロアクションの追加
 * @des エロアクションの追加
 * @arg id
 * @text エロアクションID
 * @desc エロアクションID
 *
 * @command AddSexAction
 * @text SEXアクションの追加
 * @des SEXアクションの追加
 * @arg id
 * @text SEXアクションID
 * @desc SEXアクションID
 *
 * @command RemoveEroAction
 * @text エロアクションの削除
 * @des エロアクションの削除
 * @arg id
 * @text エロアクションID
 * @desc エロアクションID
 *
 * @command Syasei
 * @text 射精
 * @des 射精
 * @arg enemyId
 * @text エネミーID
 * @desc エネミーID
 *
 * @command Estrus
 * @text 発情
 * @des 発情
 * @arg value
 * @text 値
 * @desc 値
 *
 * @command Face
 * @text 表情
 * @des 表情
 * @arg faceId
 * @text faceId
 * @desc faceId
 * @arg hoppeId
 * @text hoppeId
 * @desc hoppeId
 *
 * @command SexAnime
 * @text セックスアニメ
 * @des セックスアニメ
 * @arg id
 * @text エネミーID
 * @desc エネミーID
 * @arg inFrame
 * @text inFrame
 * @desc inFrame
 * @arg outFrame
 * @text outFrame
 * @desc outFrame
 * @arg outStart
 * @text outStart
 * @desc outStart
 *
 * @command BreakId
 * @text ブレイク
 * @des ブレイク
 * @arg breakId
 * @text ブレイクID
 * @desc ブレイクID
 *
 * @command MinusZasetsu
 * @text 挫折ポイント増減
 * @des 挫折ポイント増減
 * @arg value
 * @text 値
 * @desc 値
 *
 * @command plusEther
 * @text エーテル増加
 * @des エーテル増加
 * @arg value
 * @text 値
 * @desc 値
 */
var pluginName = 'Nore_Actor';
PluginManager.registerCommand(pluginName, 'AddEroAction', function (args) {
    var id = args.id;
    var skill = null;
    var parts;
    switch (id) {
        case 'teman':
            skill = $dataSkills[103];
            parts = Parts.manko;
            break;
        case 'teman2':
            skill = $dataSkills[118];
            parts = Parts.manko;
            break;
        case 'vibe':
            skill = $dataSkills[119];
            parts = Parts.manko;
            break;
    }
    if (!skill) {
        console.error('skill not found.' + id);
    }
    $gameActors.mainActor().addEroAction(skill, parts, new Game_Enemy(1, 1, 1));
});
PluginManager.registerCommand(pluginName, 'plusEther', function (args) {
    var value = parseInt(args.value);
    $gameParty.gainEther(value);
});
PluginManager.registerCommand(pluginName, 'AddSexAction', function (args) {
    var id = args.id;
    var enemyId;
    for (var i = 1; i < 500; i++) {
        var enemyData = $dataEnemies[i];
        if (enemyData && enemyData.meta['chinpo']) {
            var chinpo = enemyData.meta['chinpo'];
            if (chinpo == id) {
                enemyId = i;
                break;
            }
        }
    }
    if (!enemyId) {
        console.error('enemy not found.' + id);
        enemyId = 1;
    }
    $gameActors.mainActor().startSex(new Game_Enemy(enemyId, 1, 1));
});
PluginManager.registerCommand(pluginName, 'RemoveEroAction', function (args) {
    var id = args.id;
    var parts;
    switch (id) {
        case 'teman':
            parts = Parts.manko;
            break;
    }
    if (!parts) {
        console.error('parts not found.' + id);
    }
    $gameActors.mainActor().removePartsEroAction(parts, null);
});
PluginManager.registerCommand(pluginName, 'SexAnime', function (args) {
    var enemyId = args.id;
    var outFrame = args.outFrame;
    var inFrame = args.inFrame;
    var outStart = args.outStart;
    $gameActors.mainActor().startSex(new Game_Enemy(enemyId, 1, 1), inFrame, outFrame, outStart);
});
PluginManager.registerCommand(pluginName, 'BreakId', function (args) {
    var breakId = args.breakId;
    $gameActors.mainActor()._breakId = breakId;
});
PluginManager.registerCommand(pluginName, 'Syasei', function (args) {
    var enemyId = args.enemyId;
    var value = args.value;
    $gameActors.mainActor().syasei(new Game_Enemy(enemyId, 0, 0), value);
});
PluginManager.registerCommand(pluginName, 'EndSyasei', function (args) {
    $gameActors.mainActor().endSyasei();
});
PluginManager.registerCommand(pluginName, 'Estrus', function (args) {
    var value = args.value;
    $gameActors.mainActor().setEstrus(value);
});
PluginManager.registerCommand(pluginName, 'Face', function (args) {
    var value = parseInt(args.faceId);
    $gameActors.mainActor().setFaceId(value);
    var hoppe = parseInt(args.hoppeId);
    $gameActors.mainActor().setHoppeId(hoppe);
});
PluginManager.registerCommand(pluginName, 'EndSex', function (args) {
    $gameActors.mainActor().endSex();
});
PluginManager.registerCommand(pluginName, 'StartKunni', function (args) {
    $gameActors.mainActor().startKunni();
});
PluginManager.registerCommand(pluginName, 'EndKunni', function (args) {
    $gameActors.mainActor().endKunni();
});
PluginManager.registerCommand(pluginName, 'ChinpoNuku', function (args) {
    $gameActors.mainActor().endSex();
});
PluginManager.registerCommand(pluginName, 'MinusZasetsu', function (args) {
    var value = args.value;
    $gameActors.mainActor().plusZasetsu(-value);
});
Game_Actors.prototype.actor = function (actorId) {
    if ($dataActors[actorId]) {
        if (!this._data[actorId]) {
            if (actorId == 1) {
                this._data[actorId] = new Game_MainActor(actorId);
            }
            else {
                this._data[actorId] = new Game_CostumeActor(actorId);
            }
        }
        return this._data[actorId];
    }
    return null;
};
Game_Actors.prototype.mainActor = function () {
    return this.actor(1);
};
var Game_MainActor = /** @class */ (function (_super) {
    __extends(Game_MainActor, _super);
    function Game_MainActor(actorId) {
        var _this = _super.call(this, actorId) || this;
        _this._ikuCount = 0;
        _this._armor = 0;
        _this._maxArmor = 0;
        _this._minusArmor = 0;
        _this._zasetsu = 0;
        _this._fame = 0;
        _this._eroPower = 0;
        _this._lastSeiekiCount = 0;
        _this._inFrame = 0;
        _this._outFrame = 0;
        _this._outStart = false;
        return _this;
    }
    Object.defineProperty(Game_MainActor.prototype, "headId", {
        get: function () {
            if (this.hasAcce(202)) {
                return 'e';
            }
            if (this.hasAcce(225)) {
                return 'd';
            }
            return 'a';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_MainActor.prototype, "headId2", {
        get: function () {
            if (this.hasAcce(201)) {
                return 'b';
            }
            if (this.hasAcce(219)) {
                return 'c';
            }
            return 'a';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_MainActor.prototype, "mhp", {
        get: function () {
            var value = Math.min(this.param(0), 999);
            for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
                var a = _a[_i];
                value += a.params[0];
            }
            return Math.min(value, 999);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_MainActor.prototype, "mmp", {
        get: function () {
            var value = Math.min(this.param(1), 999);
            for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
                var a = _a[_i];
                value += a.params[1];
            }
            return Math.min(value, 99);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_MainActor.prototype, "atk", {
        get: function () {
            var value = Math.min(this.param(2), 999);
            for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
                var a = _a[_i];
                value += a.params[2];
            }
            if (!this._sikyu.isEmpty()) {
                value += 1;
            }
            value += this.getStateParams('atk');
            return value;
        },
        enumerable: true,
        configurable: true
    });
    Game_MainActor.prototype.getStateParams = function (param) {
        var n = 0;
        for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.meta[param]) {
                n += parseInt(s.meta[param]);
            }
        }
        return n;
    };
    Object.defineProperty(Game_MainActor.prototype, "def", {
        get: function () {
            var value = this.param(3);
            if (!this._sikyu.isEmpty()) {
                value += 1;
            }
            return value;
        },
        enumerable: true,
        configurable: true
    });
    Game_MainActor.prototype.onDungeonStart = function () {
        this._sikyu.onDungeonStart();
        this.calcArmor();
        this.clearEstrus();
    };
    Game_MainActor.prototype.onDungeonEnd = function () {
        this._estrus = 0;
        this._sikyu.reduceSeieki();
    };
    Game_MainActor.prototype.taneoyaId = function () {
        return this.sikyu().taneoyaId;
    };
    Game_MainActor.prototype.isNinshin = function () {
        return this.taneoyaId() > 0;
    };
    Object.defineProperty(Game_MainActor.prototype, "estrus", {
        get: function () {
            return this._estrus;
        },
        enumerable: true,
        configurable: true
    });
    Game_MainActor.prototype.calcArmor = function () {
        this._maxArmor = this.calcMaxArmor();
        this._minusArmor = 0;
        this._armor = this._maxArmor;
        this._breakId = 0;
        this.setFaceId(this.calcBattleFaceId());
        this.setPoseId(1);
    };
    Game_MainActor.prototype.calcMaxArmor = function () {
        return 0;
        var n = 10;
        for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.meta['armorPlus']) {
                n += parseInt(a.meta['armorPlus']);
            }
        }
        return n;
    };
    Game_MainActor.prototype.minusArmor = function () {
        return this._minusArmor;
    };
    Game_MainActor.prototype.plusZasetsu = function (n) {
        this._zasetsu += n;
    };
    Object.defineProperty(Game_MainActor.prototype, "zasetsu", {
        get: function () {
            return this._zasetsu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_MainActor.prototype, "eroPower", {
        get: function () {
            return this._eroPower;
        },
        enumerable: true,
        configurable: true
    });
    Game_MainActor.prototype.plusEroPower = function (n) {
        this._eroPower += n;
    };
    Game_MainActor.prototype.minusEroPower = function (n) {
        this._eroPower -= n;
    };
    Object.defineProperty(Game_MainActor.prototype, "maxZasetsu", {
        get: function () {
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    Game_MainActor.prototype.plusFame = function (n) {
        this._fame += n;
    };
    Object.defineProperty(Game_MainActor.prototype, "fame", {
        get: function () {
            return this._fame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game_MainActor.prototype, "maxFame", {
        get: function () {
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    Game_MainActor.prototype.armor = function () {
        return this._armor;
    };
    Game_MainActor.prototype.maxArmor = function () {
        return this._maxArmor - this._minusArmor;
    };
    Game_MainActor.prototype.gainHp = function (n) {
        if (n > 0 || this._armor == 0) {
            _super.prototype.gainHp.call(this, n);
        }
        else {
            this._result.hpDamage = -n;
            this._result.hpAffected = true;
            this._armor += n;
            if (this._armor < 0) {
                if (true) {
                    _super.prototype.gainHp.call(this, this._armor);
                }
            }
            this._armor = Math.max(this._armor, 0);
        }
    };
    Game_MainActor.prototype.recoverArmor = function () {
        /*this._minusArmor += Math.floor((this._maxArmor - this._armor) * 0.30);
        if (this._minusArmor >= this._maxArmor) {
            return;
        }
        this._armor += (this._maxArmor - this._armor - this._minusArmor);*/
        this._armor += 5;
        this._armor = Math.min(this._armor, this.maxArmor());
        this._breakId = 0;
        this.setFaceId(this.calcBattleFaceId());
        this.setPoseId(1);
        this.updateBreakId();
        this.setCacheChanged();
    };
    Game_MainActor.prototype.updateBreakId = function () {
        var totalDamage = $gameVariables.value(12);
        var mhp = this.mhp;
        var last = this._breakId;
        if (mhp / 4 < totalDamage) {
            //this.progressBreakId(1);
        }
        if (mhp * 1 / 3 < totalDamage) {
            this.progressBreakId(2);
        }
        if (mhp * 3 / 5 <= totalDamage || this.isDead()) {
            this.progressBreakId(3);
        }
        if (this.hasCursedEroItem()) {
            this.progressBreakId(3);
        }
        /*
        if (this._maxArmor == 0) {
            this.progressBreakId(0);
            return;
        }
        if (this._maxArmor * 2 / 3 >= this._armor || this._minusArmor > 0) {
            this.progressBreakId(1);
        }
        if (this._maxArmor * 2 / 5 >= this._armor) {
            this.progressBreakId(2);
        }
        if (this._armor == 0) {
            this.progressBreakId(3);
        }
        */
        return last != this._breakId;
    };
    Game_MainActor.prototype.addCursedEroItem = function (rogueItem) {
        var item = rogueItem.realItem();
        if (item.meta['curse_acce']) {
            this.addAcce(parseInt(item.meta['curse_acce']));
        }
    };
    Game_MainActor.prototype.hasCursedEroItem = function () {
        for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
            var e_1 = _a[_i];
            if (e_1 && e_1.realItem().meta['curse']) {
                return true;
            }
        }
        return false;
    };
    Game_MainActor.prototype.setBattleFaceId = function (n) {
        if (this._battleFaceId === n) {
            return;
        }
        this._battleFaceId = n;
        this.setFaceId(this.calcBattleFaceId());
        this.setDirty();
    };
    Game_MainActor.prototype.progressBreakId = function (n) {
        if (this.breakId >= n) {
            return;
        }
        this._breakId = n;
        if (this._minusArmor == 0) {
            this._minusArmor = Math.floor(this._maxArmor * 1 / 3);
        }
        if (this.breakId == 3) {
            this._minusArmor = Math.floor(this._maxArmor * 2 / 3);
        }
        switch (this.breakId) {
            case 2:
                this.setPoseId(2);
                break;
            case 3:
                this.setPoseId(3);
                break;
        }
        this.setDirty();
        this.setCacheChanged();
        this.setFaceId(this.calcBattleFaceId());
        this._battleFaceId = 0;
    };
    Game_MainActor.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._eroActionList = [];
        this._estrus = 0;
        this._battleFaceId = 0;
        this._isEroActionChanged = false;
        this._sexType = SexType.none;
        this._sikyu = new Sikyu();
        this.setDirty();
    };
    Game_MainActor.prototype.clearBattleFaceId = function () {
        this._battleFaceId = 0;
    };
    Game_MainActor.prototype.upEstrus = function (n, notIku) {
        if (notIku === void 0) { notIku = false; }
        if (n > 0) {
            this._estrus += n;
            if (this._estrus >= 100) {
                if (notIku) {
                    this._estrus = 99;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };
    Game_MainActor.prototype.resetEstrus = function () {
        if (!$gameSystem.info()) {
            return;
        }
        if (this._estrus >= 100) {
            $gameTemp.upEroInfo().iku++;
            $gameSystem.info().plusIku(1);
            this._ikuCount++;
            //let minus = (100 - this._ikuCount * 12);
            this._estrus = 0; // -= minus;
        }
    };
    Game_MainActor.prototype.setEstrus = function (n) {
        if (this._estrus == n) {
            return;
        }
        this._estrus = n;
        this.setCacheChanged();
    };
    Game_MainActor.prototype.clearEstrus = function () {
        this._ikuCount = 0;
        this._estrus = 0;
    };
    Game_MainActor.prototype.clearInOut = function () {
        this._inFrame = 0;
        this._outFrame = 0;
        this._outStart = false;
    };
    /**
     * エロアクション
     */
    Game_MainActor.prototype.cancelEroAction = function (subject) {
        for (var _i = 0, _a = this.eroActionList(); _i < _a.length; _i++) {
            var action = _a[_i];
            if (action.subject() == subject) {
                this.eroActionList().splice(this.eroActionList().indexOf(action), 1);
                this._isEroActionChanged = true;
                return;
            }
        }
    };
    Game_MainActor.prototype.clearEroActionList = function () {
        this._eroActionList = this.remainingEroActionList();
        this._sexType = SexType.none;
        this._isEroActionChanged = true;
    };
    Game_MainActor.prototype.remainingEroActionList = function () {
        var ret = [];
        var equipSkillList = [];
        for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
            var e_2 = _a[_i];
            if (!e_2) {
                continue;
            }
            var realItem = e_2.realItem();
            if (realItem.meta['ero']) {
                equipSkillList.push(parseInt(realItem.meta['ero']));
            }
        }
        for (var _b = 0, _c = this._eroActionList; _b < _c.length; _b++) {
            var action = _c[_b];
            if (equipSkillList.contains(action.itemId())) {
                ret.push(action);
            }
        }
        return ret;
    };
    Game_MainActor.prototype.updateCursedEquip = function () {
        this._eroEquipCount = this.calcCursedEquipCount();
    };
    Game_MainActor.prototype.calcCursedEquipCount = function () {
        var n = 0;
        for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
            var e_3 = _a[_i];
            if (!e_3) {
                continue;
            }
            var realItem = e_3.realItem();
            if (realItem.meta['ero']) {
                n++;
            }
        }
        return n;
    };
    Game_MainActor.prototype.removePartsEroAction = function (parts, subject) {
        for (var _i = 0, _a = this.eroActionList(); _i < _a.length; _i++) {
            var action = _a[_i];
            if (action.parts() == parts /* || action.subject() == subject*/) {
                this.eroActionList().splice(this.eroActionList().indexOf(action), 1);
                this._isEroActionChanged = true;
                return;
            }
        }
    };
    Game_MainActor.prototype.addEroAction = function (item, parts, subject) {
        this.removePartsEroAction(parts, subject);
        var ero = $gameSystem.getEro(1);
        if (item.meta['shita']) {
            var shitaType = Shita.human;
            if (item.meta['shita'] == 'goblin') {
                shitaType = Shita.goblin;
            }
            if (parts == Parts.kiss) {
                $gameTemp.upEroInfo().kiss++;
                $gameSystem.info().plusKiss(1);
                ero.kuchiStatus += Math.randomInt(30) + 30;
            }
            else if (parts == Parts.chikubiLeft || parts == Parts.chikubiRight) {
                ero.chikubiStatus += Math.randomInt(30) + 30;
            }
            this.addShitaAction(shitaType, parts, subject);
        }
        else if (item.meta['teman']) {
            var temanType = Teman.human;
            if (item.meta['teman'] == 'goblin') {
                temanType = Teman.goblin;
            }
            ero.chitsuStatus += Math.randomInt(30) + 30;
            this.addTemanAction(temanType, parts, subject);
        }
        else if (item.meta['slime']) {
            this.addSlimeAction(parts, subject);
        }
        else if (item.meta['oshitaoshi']) {
            $gameSwitches.setValue(31, false);
        }
        else if (item.meta['bukkake']) {
            var acceId = 231 + Math.randomInt(20);
            this.addAcce(acceId);
            $gameSystem.info().plusBukkake(1);
            $gameTemp.upEroInfo().bukkake++;
        }
        else if (item.meta['sex']) {
            this.startSex(subject);
        }
        else if (item.meta['syasei']) {
            this.syasei(subject, 1);
            $gameTemp.upEroInfo().upNakadashi(subject.enemyId());
        }
        else if (item.meta['fella']) {
            this.addAcce(292);
            this.setBattleFaceId(13);
            var seieki = parseInt(subject.enemy().meta['seieki']);
            if (!seieki) {
                console.error('フェラの精液が設定されていません');
                return;
            }
            var up = seieki * (100 - (Math.randomInt(30) - 15)) / 100;
            up = Math.floor(up);
            $gameTemp.upEroInfo().upKounai(up);
            $gameSystem.info().plusKounai(up);
        }
        else if (item.meta['vibe']) {
            this.addVibeAction(item.id, parts);
        }
        else {
            console.error(item);
        }
    };
    Game_MainActor.prototype.startSex = function (enemy, inFrame, outFrame, outStart) {
        if (inFrame === void 0) { inFrame = 0; }
        if (outFrame === void 0) { outFrame = 0; }
        if (outStart === void 0) { outStart = true; }
        this._sexType = SexType.sex;
        enemy.addState(35);
        var ero = $gameSystem.getEro(1);
        ero.chitsuStatus += Math.randomInt(20) + 20;
        this._isEroActionChanged = true;
        this.sexEnemy = enemy;
        this._inFrame = inFrame;
        this._outFrame = outFrame;
        this._outStart = outStart;
    };
    Game_MainActor.prototype.startKunni = function (enemy) {
        this._sexType = SexType.shita;
        this.sexEnemy = enemy;
        var ero = $gameSystem.getEro(1);
        ero.chitsuStatus += Math.randomInt(20) + 20;
    };
    Game_MainActor.prototype.inFrame = function () {
        return this._inFrame;
    };
    Game_MainActor.prototype.outFrame = function () {
        return this._outFrame;
    };
    Game_MainActor.prototype.outStart = function () {
        return this._outStart;
    };
    Game_MainActor.prototype.endSex = function () {
        this._sexType = SexType.none;
        this.sexEnemy = null;
    };
    Game_MainActor.prototype.endKunni = function () {
        this._sexType = SexType.none;
        this.sexEnemy = null;
    };
    Game_MainActor.prototype.sexType = function () {
        return this._sexType;
    };
    Game_MainActor.prototype.seiekiCount = function () {
        return this._sikyu.seiekiCount();
    };
    Game_MainActor.prototype.lastSikyuSeiekiCount = function () {
        return Math.min(this._lastSeiekiCount, 4);
    };
    Game_MainActor.prototype.sikyu = function () {
        return this._sikyu;
    };
    /*sikyuSeieki() {
        return this._sikyuSeieki;
    }*/
    Game_MainActor.prototype.plusSeieki = function (subject, value) {
        this._lastSeiekiCount = this.seiekiCount();
        this._sikyu.plusSeieki(subject, value);
        this.updateSeiekiAcce();
        this._isEroActionChanged = true;
    };
    Game_MainActor.prototype.updateSeiekiAcce = function () {
        var seiekiCouunt = this.seiekiCount();
        if (seiekiCouunt >= 4) {
            this.addAcce(261);
            this.addAcce(266);
        }
        if (seiekiCouunt >= 5) {
            this.addAcce(262);
            this.addAcce(267);
        }
        if (seiekiCouunt >= 6) {
            this.addAcce(263);
            this.addAcce(268);
        }
        if (seiekiCouunt >= 7) {
            this.addAcce(264);
            this.addAcce(269);
        }
        if (seiekiCouunt >= 8) {
            this.addAcce(265);
            this.addAcce(270);
        }
    };
    Game_MainActor.prototype.removeSeiekiAcce = function () {
        this.removeAcce(261);
        this.removeAcce(266);
        this.removeAcce(262);
        this.removeAcce(267);
        this.removeAcce(263);
        this.removeAcce(268);
        this.removeAcce(264);
        this.removeAcce(269);
        this.removeAcce(265);
        this.removeAcce(270);
    };
    Game_MainActor.prototype.syasei = function (subject, value) {
        this.sexEnemy = subject;
        $gameSystem.info().plusNakadashi(1, subject.enemyId());
        this._sexType = SexType.syasei;
        if (subject) {
            subject.removeState(35);
        }
    };
    Game_MainActor.prototype.endSyasei = function () {
        this._sexType = SexType.endSyasei;
    };
    Game_MainActor.prototype.sikyuSeiekiCount = function () {
        return Math.min(this.seiekiCount(), 4);
    };
    Game_MainActor.prototype.addVibeAction = function (itemId, parts) {
        this.eroActionList().push(new VibeEroAction(itemId, parts));
        this._isEroActionChanged = true;
    };
    Game_MainActor.prototype.addShitaAction = function (type, parts, subject) {
        this.eroActionList().push(new ShitaEroAction(type, parts, 2, subject));
        this._isEroActionChanged = true;
    };
    Game_MainActor.prototype.addSlimeAction = function (parts, subject) {
        this.eroActionList().push(new SlimeEroAction(parts, 5, subject));
        this._isEroActionChanged = true;
    };
    Game_MainActor.prototype.addTemanAction = function (type, parts, subject) {
        var index = 2;
        if (type == Teman.human) {
            index = 1;
        }
        this.eroActionList().push(new TemanEroAction(type, parts, index, subject));
        this._isEroActionChanged = true;
    };
    Game_MainActor.prototype.addMomiAction = function (type, parts) {
        this._eroActionList = this._eroActionList || [];
    };
    Game_MainActor.prototype.eroActionList = function () {
        return this._eroActionList;
    };
    Game_MainActor.prototype.isEroActionChanged = function () {
        return this._isEroActionChanged;
    };
    Game_MainActor.prototype.clearEroActionChanged = function () {
        this._isEroActionChanged = false;
    };
    Game_MainActor.prototype.onTurnEnd = function () {
        _super.prototype.onTurnEnd.call(this);
        this.updateEroActionList();
        this.upEstrusByEroEquips();
    };
    Game_MainActor.prototype.updateEroActionList = function () {
        var removeList = [];
        for (var _i = 0, _a = this.eroActionList(); _i < _a.length; _i++) {
            var action = _a[_i];
            if (action.onTurnEnd()) {
                removeList.push(action);
            }
        }
        for (var _b = 0, removeList_1 = removeList; _b < removeList_1.length; _b++) {
            var action = removeList_1[_b];
            this.eroActionList().splice(this.eroActionList().indexOf(action), 1);
        }
    };
    Game_MainActor.prototype.upEstrusByEroEquips = function () {
        for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.meta['estrus']) {
                this.upEstrus(parseInt(s.meta['estrus']));
            }
        }
    };
    Game_MainActor.prototype.calcBattleFaceId = function () {
        if (!$gameSwitches.value(1)) {
            // ボテ腹
            if ($gameSystem.getEro(1).bote > 0) {
                return 9;
            }
            // 町中
            if ($gameSwitches.value(12)) {
                // よる
                return 9;
            }
            return 6;
        }
        if (this._battleFaceId) {
            return this._battleFaceId;
        }
        if (this._eroEquipCount > 0) {
            return 21;
        }
        switch (this.breakId) {
            case 1: return 17;
            case 2: return 13;
            case 3: return 18;
        }
        return 6;
    };
    Game_MainActor.prototype.recoverOnStair = function () {
        //this.gainHp(this.mhp / 3);
        //this.gainMp(this.mmp);
    };
    Game_MainActor.prototype.isStateAddable = function (stateId) {
        if ($dataStates[stateId].meta['ero']) {
            //p(stateId)
            return true;
        }
        return _super.prototype.isStateAddable.call(this, stateId);
    };
    Game_MainActor.prototype.arrowAtk = function () {
        return this.atk;
    };
    Game_MainActor.prototype.bareHandsAnimationId = function () {
        return 128;
    };
    Game_MainActor.prototype.regenerateHp = function () {
        var minRecover = -this.maxSlipDamage();
        var value = Math.max(Math.floor(this.mhp * this.hrg), minRecover);
        if (value !== 0) {
            if (value < 0) {
                value = -1;
            }
            this.gainHp(value);
        }
    };
    Game_MainActor.prototype.maxSlipDamage = function () {
        return $dataSystem.optSlipDeath ? this.hp : Math.max(this.hp - 1, 0);
    };
    Game_MainActor.prototype.addState = function (stateId) {
        var state = $dataStates[stateId];
        if (state.meta['selfState']) {
            return _super.prototype.addState.call(this, parseInt(state.meta['selfState']));
        }
        else {
            return _super.prototype.addState.call(this, stateId);
        }
    };
    Game_MainActor.prototype.changeExp = function (exp, show) {
        this._exp[this._classId] = Math.max(exp, 0);
        var lastLevel = this._level;
        var lastSkills = this.skills();
        while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
            this.levelUp();
        }
        var n = 0;
        while (this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
            this.plusEroPower(50);
            this._exp[this._classId] -= (this.nextLevelExp() - this.currentLevelExp());
            n += 50;
        }
        if (n > 0) {
            var text = 'カレンはLV上限突破ボーナスとして闇の力%1を獲得した！'.format(n);
            if ($gameSwitches.value(40)) {
                $gameMessage.add(text);
            }
            else {
                Nore.$gameMessageRogue.add(text);
            }
        }
        while (this.currentExp() < this.currentLevelExp()) {
            this.levelDown();
        }
        if (show && this._level > lastLevel) {
            this.displayLevelUp(this.findNewSkills(lastSkills));
        }
        this.refresh();
    };
    Game_MainActor.prototype.displayLevelUp = function (newSkills) {
        AudioManager.playMe({ name: 'Like', volume: 100, pitch: 100, pan: 0 });
        var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
        if ($gameSwitches.value(40)) {
            $gameMessage.add(text);
        }
        else {
            Nore.$gameMessageRogue.add(text);
        }
    };
    Game_MainActor.prototype.levelUpByItem = function (count) {
        for (var i = 0; i < count; i++) {
            var lastMhp = this.mhp;
            this.changeExp(this.nextLevelExp(), true);
            var up = this.mhp - lastMhp;
            if (up > 0) {
                this.gainHp(up);
                this.result().hpDamage = 0;
            }
        }
    };
    Game_MainActor.prototype.levelUp = function () {
        var lastMhp = this.mhp;
        this._level++;
        for (var _i = 0, _a = this.currentClass().learnings; _i < _a.length; _i++) {
            var learning = _a[_i];
            if (learning.level === this._level) {
                this.learnSkill(learning.skillId);
            }
        }
        this.plusEroPower(50);
        var up = this.mhp - lastMhp;
        if (up > 0) {
            this.gainHp(up);
            this.result().hpDamage = 0;
        }
        $gameMedals.checkGet('level');
    };
    Game_MainActor.prototype.levelDownByItem = function (count) {
        for (var i = 0; i < count; i++) {
            if (this._level == 1) {
                Nore.$gameMessageRogue.add(Nore.makeNoEffectText());
                return;
            }
            this.changeExp(this.currentLevelExp() - 1, true);
            Nore.displayActorLevelDown(this._level);
        }
    };
    Game_MainActor.prototype.onSyusan = function (eroId) {
        this.sikyu()._sikyuSeieki = [];
        $gameSystem.addSyusanResult(eroId, this.sikyu().taneoyaId);
        this.sikyu().onSyusan();
        this.setPoseId(1);
        $gameSystem.getEro(this.actorId()).bote = 0;
    };
    Game_MainActor.prototype.isEquipTuto = function () {
        var total = 0;
        for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
            var e_4 = _a[_i];
            if (e_4) {
                total++;
            }
        }
        return total >= 2;
    };
    Game_MainActor.prototype.releaseUnequippableItems = function (forcing) {
    };
    Game_MainActor.prototype.attackAnimationId1 = function () {
        if (this.hasNoWeapons()) {
            return this.bareHandsAnimationId();
        }
        else {
            var weapons = this.weapons();
            return weapons[0] ? weapons[0].animationId() : 0;
        }
    };
    Game_MainActor.prototype.weapons = function () {
        var weapon = this.equips()[0];
        if (weapon) {
            return [weapon];
        }
        else {
            return [];
        }
    };
    Game_MainActor.prototype.weapon = function () {
        var weapon = this.equips()[0];
        return weapon;
    };
    Game_MainActor.prototype.shield = function () {
        return this.equips()[1];
    };
    Game_MainActor.prototype.hasAnySkill = function () {
        return this._skills.length > 0;
    };
    Game_MainActor.prototype.gainTrainingExp = function () {
        this.gainExp(this.getTrainingExp());
    };
    Game_MainActor.prototype.getTrainingExp = function () {
        return ($gameActors.mainActor().nextLevelExp() - $gameActors.mainActor().currentLevelExp());
    };
    Game_MainActor.prototype.gainTreasureExp = function () {
        var exp = this.getTreasureExp();
        if ($gameVariables.value(100) == 2) {
            // すごく簡単
            exp *= 2;
        }
        this.gainExp(exp);
        Nore.$gameMessageRogue.add('宝箱獲得によって %1EXP を獲得した！'.format(exp));
    };
    Game_MainActor.prototype.getTreasureExp = function () {
        var rate = 6;
        switch ($gameVariables.value(1)) {
            case 2:
                if ($gameSwitches.value(702)) {
                    rate = 15;
                }
                break;
            case 3:
                if ($gameSwitches.value(704)) {
                    rate = 12;
                }
                break;
            case 5:
                if ($gameSwitches.value(706)) {
                    rate = 10;
                }
                break;
        }
        return Math.floor(($gameActors.mainActor().nextLevelExp() - $gameActors.mainActor().currentLevelExp()) / rate);
    };
    Game_MainActor.prototype.toutekiRate = function () {
        if ($gameParty.hasItem($dataArmors[186])) {
            return 1.4;
        }
        return 2;
    };
    return Game_MainActor;
}(Game_CostumeActor));
