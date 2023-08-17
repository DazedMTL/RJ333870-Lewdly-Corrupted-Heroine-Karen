/*:ja
 * @target MZ
 * @author ル
 *
 * @command plusDefeat
 * @text 敗北回数増加
 * @des 敗北回数増加
 * @arg value
 * @text 値
 * @desc 値
 *
 * @command plusChitsuTighten
 * @text 膣締まり増加
 * @des 膣締まり増加
 * @arg value
 * @text 値
 * @desc 値
 *
 * @command plusAnalTighten
 * @text アナル締まり増加
 * @des アナル締まり増加
 * @arg value
 * @default 0
 * @text 値
 * @desc 値
 *
 * @command plusBaisyun
 * @text 売春回数増加
 * @des 売春回数増加
 * @arg value
 * @default 0
 * @text 値
 * @desc 値
 *
 * @command plusKaihatsudo
 * @text 開発度増加
 * @des 開発度増加
 * @arg chitsu
 * @default 0
 * @text 膣開発度
 * @desc 膣開発度
 * @arg chikubi
 * @default 0
 * @text 乳首開発度
 * @desc 乳首開発度
 * @arg kuchi
 * @default 0
 * @text 口開発度
 * @desc 口開発度
 * @arg anal
 * @default 0
 * @text アナル開発度
 * @desc アナル開発度
 *
 * @command plusKeiken
 * @text 経験回数増加
 * @des 経験回数増加
 * @arg enemyId
 * @text エネミーID
 * @desc エネミーID
 * @arg value
 * @text 値
 * @desc 値
 */
var Nore;
(function (Nore) {
    var pluginName = 'Nore_Ero';
    PluginManager.registerCommand(pluginName, 'plusKaihatsudo', function (args) {
        var chitsu = parseInt(args.chitsu);
        var chikubi = parseInt(args.chikubi);
        var kuchi = parseInt(args.kuchi);
        var anal = parseInt(args.anal);
        var ero = $gameSystem.getEro(1);
        ero.chitsuStatus += chitsu;
        ero.chikubiStatus += chikubi * 2;
        ero.kuchiStatus += kuchi * 2;
        ero.analStatus += anal * 2;
    });
    PluginManager.registerCommand(pluginName, 'plusDefeat', function (args) {
        var value = parseInt(args.value);
        var ero = $gameSystem.getEro(1);
        ero.defeat += value;
    });
    PluginManager.registerCommand(pluginName, 'plusChitsu', function (args) {
        var value = parseInt(args.value);
        var ero = $gameSystem.getEro(1);
        ero.chitsuStatus += value;
    });
    PluginManager.registerCommand(pluginName, 'plusBaisyun', function (args) {
        var value = parseInt(args.value);
        var ero = $gameSystem.getEro(1);
        ero.baisyun += value;
    });
    PluginManager.registerCommand(pluginName, 'plusAnal', function (args) {
        var value = parseInt(args.value);
        var ero = $gameSystem.getEro(1);
        ero.analStatus += value * 2;
    });
    PluginManager.registerCommand(pluginName, 'plusChikubi', function (args) {
        var value = parseInt(args.value);
        var ero = $gameSystem.getEro(1);
        ero.chikubiStatus += value * 2;
    });
    PluginManager.registerCommand(pluginName, 'plusKuchi', function (args) {
        var value = parseInt(args.value);
        var ero = $gameSystem.getEro(1);
        ero.kuchiStatus += value * 2;
    });
    PluginManager.registerCommand(pluginName, 'plusChitsuTighten', function (args) {
        var value = parseInt(args.value);
        var ero = $gameSystem.getEro(1);
        ero.chitsuTightening += value;
    });
    PluginManager.registerCommand(pluginName, 'plusAnalTighten', function (args) {
        var value = parseInt(args.value);
        var ero = $gameSystem.getEro(1);
        ero.analTightening += value;
    });
    PluginManager.registerCommand(pluginName, 'plusKeiken', function (args) {
        var enemyId = parseInt(args.enemyId);
        var value = parseInt(args.value);
        if (isNaN(value)) {
            value = 1;
        }
        var ero = $gameSystem.getEro(1);
        ero.upKeikeni(enemyId, value);
    });
})(Nore || (Nore = {}));
var FAME_EXP = [100, 150, 200, 300, 400];
var FAME_EXP2 = [0];
for (var _i = 0, FAME_EXP_1 = FAME_EXP; _i < FAME_EXP_1.length; _i++) {
    var e = FAME_EXP_1[_i];
    var last = FAME_EXP2[FAME_EXP2.length - 1];
    FAME_EXP2.push(e + last);
}
var Erostatus = /** @class */ (function () {
    function Erostatus(actorId) {
        this.sexCount = 0;
        this._nakadashi = {};
        this._keiken = {};
        this.ninshin = 0;
        this.syusanHuman = 0;
        this.syusanMonster = 0;
        this.ninshinRate = 0;
        this.lastNinshinRate = 0;
        this.mob = {};
        this.chitsuStatus = 0;
        this.chitsuTightening = 100;
        this.analStatus = 0;
        this.analTightening = 100;
        this.kuchiStatus = 0;
        this.chikubiStatus = 0;
        this.seiekiNomu = 0;
        this.bukkake = 0;
        this.seiekiNakadashi = 0;
        this.kiss = 0;
        this.fela = 0;
        this.anal = 0;
        this.pai = 0;
        this.baisyun = 0;
        this.defeat = 0;
        this.dorei = 0;
        this._fame = 0;
        this.acme = 0;
        this.friendship = {};
        this._fameLv = 0;
        this.baby = [];
        this.actorId = actorId;
    }
    Object.defineProperty(Erostatus.prototype, "syusanTotal", {
        get: function () {
            return this.syusanHuman + this.syusanMonster;
        },
        enumerable: true,
        configurable: true
    });
    Erostatus.prototype.fameLv = function () {
        this.calcFame();
    };
    Erostatus.prototype.calcFame = function () {
        this._fame = this._fame || 0;
        this._fameLv = 1;
        for (var i = 0; i < FAME_EXP2.length; i++) {
            if (this._fameLv > FAME_EXP2[i]) {
                this._fameLv = i;
            }
            else {
                break;
            }
        }
    };
    Erostatus.prototype.upNakadashi = function (key, value) {
        if (this.isShojo()) {
            this.minusChitsuTighten(30);
            this.chitsuStatus += 200;
            $gameActors.mainActor().sikyu().hatsutaiken = key;
        }
        this._nakadashi[key] = this._nakadashi[key] || 0;
        if (this._nakadashi[key] === 0) {
            this.upKeikeni(key);
        }
        this._nakadashi[key] += value;
        this.minusChitsuTighten(1);
    };
    Erostatus.prototype.minusChitsuTighten = function (n) {
        this.chitsuTightening -= n;
    };
    Erostatus.prototype.upKeikeni = function (key, value) {
        if (value === void 0) { value = 1; }
        this._keiken[key] = this._keiken[key] || 0;
        this._keiken[key] += value;
    };
    Erostatus.prototype.nakadashi = function (type) {
        var total = 0;
        for (var key in this._nakadashi) {
            var enemyId = parseInt(key);
            var enemy = $dataEnemies[enemyId];
            if (enemy.meta['nakaType'] == type) {
                total += this._nakadashi[key];
            }
        }
        return total;
    };
    Erostatus.prototype.keiken = function (type) {
        var total = 0;
        for (var key in this._keiken) {
            var enemyId = parseInt(key);
            var enemy = $dataEnemies[enemyId];
            if (enemy.meta['nakaType'] == type) {
                if (enemy.meta['keiken']) {
                    total += this._nakadashi[key];
                }
                else {
                    total++;
                }
            }
        }
        return total;
    };
    Erostatus.prototype.keikenMonster = function () {
        return this.keiken('monster');
    };
    Erostatus.prototype.keikenPeople = function () {
        return this.keiken('people');
    };
    Erostatus.prototype.keikenTotal = function () {
        return this.keikenMonster() + this.keikenPeople();
    };
    Erostatus.prototype.isShojo = function () {
        if (this.actorId == 1) {
            return $gameActors.mainActor().sikyu().hatsutaiken == 0;
        }
        return false;
    };
    Object.defineProperty(Erostatus.prototype, "nakadashiTotal", {
        get: function () {
            var total = 0;
            for (var key in this._nakadashi) {
                total += this._nakadashi[key];
            }
            return total;
        },
        enumerable: true,
        configurable: true
    });
    return Erostatus;
}());
(function (Nore) {
    var _Game_System_prototype_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_prototype_initialize.call(this);
        this.eroStatus = {};
        for (var i = 1; i <= 12; i++) {
            this.eroStatus[i] = this.newEro(i);
        }
        this.timestamp = new Date().getTime();
    };
    var pluginName = 'Nore_Ero';
    PluginManager.registerCommand(pluginName, 'PlusKeiken', function (args) {
        var ero = $gameSystem.getEro(1);
        ero['keiken' + args.type] += args.value;
    });
    PluginManager.registerCommand(pluginName, 'PlusNakadashi', function (args) {
        $gameSystem.info().plusNakadashi(args.value, args.enemyId);
    });
    PluginManager.registerCommand(pluginName, 'PlusZasetsu', function (args) {
        $gameActors.mainActor().plusZasetsu(args.value);
        if (!$gameSwitches.value(203)) {
            $gameTemp.reserveCommonEvent(203);
        }
    });
    var UpEroInfo = /** @class */ (function () {
        function UpEroInfo() {
            this.nakadashi = 0;
            this.nakadashiMap = {};
            this.bukkake = 0;
            this.kiss = 0;
            this.iku = 0;
            this.ninshinRate = 0;
            this.gokkun = 0;
            this.kounaiSeieki = 0;
            this.fella = 0;
        }
        UpEroInfo.prototype.isChanged = function (info) {
            if (this.nakadashi != info.nakadashi) {
                return true;
            }
            if (this.bukkake != info.bukkake) {
                return true;
            }
            if (this.kiss != info.kiss) {
                return true;
            }
            if (this.iku != info.iku) {
                return true;
            }
            if (this.kounaiSeieki != info.kounaiSeieki) {
                return true;
            }
            return false;
        };
        UpEroInfo.prototype.upNakadashi = function (enemyId) {
            this.nakadashi++;
            this.nakadashiMap[enemyId] = this.nakadashiMap[enemyId] || 0;
            this.nakadashiMap[enemyId]++;
            this.ninshinRate += 6;
        };
        UpEroInfo.prototype.upKounai = function (n) {
            this.kounaiSeieki += n;
        };
        return UpEroInfo;
    }());
    Nore.UpEroInfo = UpEroInfo;
})(Nore || (Nore = {}));
