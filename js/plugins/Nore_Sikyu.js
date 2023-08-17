/*:ja
 * @target MZ
 * @author ル
 *
 * @command nextDay
 * @text 次の日へ
 * @des 次の日へ
 * @arg count
 *
 */
var Nore;
(function (Nore) {
    var pluginName = 'Nore_Sikyu';
    PluginManager.registerCommand(pluginName, 'nextDay', function (args) {
        var count = parseInt(args.count);
        for (var i = 0; i < count; i++) {
            $gameActors.mainActor().sikyu().reduceSeieki();
        }
    });
})(Nore || (Nore = {}));
var SikyuSeieki = /** @class */ (function () {
    function SikyuSeieki(_enemyId, _value) {
        this._enemyId = _enemyId;
        this._value = _value;
        this._elapsedDay = 0;
    }
    SikyuSeieki.prototype.value = function () {
        var n = this._value;
        switch (this._elapsedDay) {
            case 0: return n;
            case 1: return Math.round(n * 0.5);
            case 2: return Math.round(n * 0.35);
            case 3: return Math.round(n * 0.15);
        }
        return 0;
    };
    SikyuSeieki.prototype.plus = function (n) {
        this._value += n;
    };
    SikyuSeieki.prototype.enemyId = function () {
        return this._enemyId;
    };
    SikyuSeieki.prototype.update = function () {
        this._elapsedDay = this._elapsedDay || 0;
        this._elapsedDay++;
    };
    SikyuSeieki.prototype.isNew = function () {
        return this._elapsedDay == 0;
    };
    SikyuSeieki.prototype.isFinished = function () {
        return this.value() <= 0;
        /*const enemy = $dataEnemies[this._enemyId];
        const lifetime = parseInt(enemy.meta['seiekiLifetime']);
        return lifetime <= this._elapsedDay;*/
    };
    return SikyuSeieki;
}());
var NinshinResult = /** @class */ (function () {
    function NinshinResult(ninshin, taneoyaIndex, taneoyaId) {
        this.ninshin = ninshin;
        this.taneoyaIndex = taneoyaIndex;
        this.taneoyaId = taneoyaId;
    }
    return NinshinResult;
}());
var Sikyu = /** @class */ (function () {
    function Sikyu() {
        this._sikyuSeieki = [];
        this._currentSeieki = 0;
        this._ninshinTestCount = 0;
        this.taneoyaId = -1;
        this.hatsutaiken = 0;
    }
    Sikyu.prototype.onDungeonStart = function () {
        this._currentSeieki = Math.min(1, this._sikyuSeieki.length);
    };
    Sikyu.prototype.seiekiCount = function () {
        return this._currentSeieki;
    };
    Sikyu.prototype.seiekiList = function () {
        return this._sikyuSeieki;
    };
    Sikyu.prototype.seiekiListMini = function () {
        if (this._sikyuSeieki.length <= 5) {
            return this.seiekiList();
        }
        var other = new SikyuSeieki(301, 0);
        var result = [];
        for (var i = 0; i < this._sikyuSeieki.length; i++) {
            var s = this._sikyuSeieki[i];
            if (i < 4) {
                result.push(s);
            }
            else {
                other.plus(s.value());
            }
        }
        result.push(other);
        return result;
    };
    Sikyu.prototype.isEmpty = function () {
        return this._sikyuSeieki.length == 0;
    };
    Sikyu.prototype.clearAndGainSeieki = function () {
        var n = 0;
        for (var _i = 0, _a = this._sikyuSeieki; _i < _a.length; _i++) {
            var seieki = _a[_i];
            n += seieki.value();
            $gameParty.gainEther(seieki.value());
        }
        this.clear();
        $gameVariables.setValue(20, n);
    };
    Sikyu.prototype.plusSeieki = function (subject, value) {
        p('plusSeieki:' + value);
        if (!value) {
            return;
        }
        var seieki = this.findSeieki(subject.enemyId());
        if (seieki) {
            seieki.plus(value);
        }
        else {
            this._sikyuSeieki.push(new SikyuSeieki(subject.enemyId(), value));
        }
        this._currentSeieki++;
        if (!this.hatsutaiken) {
            this.hatsutaiken = subject.enemyId();
            p('初体験:' + this.hatsutaiken);
        }
    };
    Sikyu.prototype.findSeieki = function (enemyId) {
        for (var _i = 0, _a = this._sikyuSeieki; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.isNew() && s.enemyId() == enemyId) {
                return s;
            }
        }
        return null;
    };
    Sikyu.prototype.maxSikyuSeieki = function () {
        return 6;
    };
    Sikyu.prototype.calcTotalNinshinRate = function () {
        var totalRate = 1;
        if ($gameSwitches.value(25)) {
            return 100;
        }
        if (this.isNotNinshin()) {
            return 0;
        }
        for (var _i = 0, _a = this._sikyuSeieki; _i < _a.length; _i++) {
            var s = _a[_i];
            var rate = this.ninshinRate(s.enemyId());
            totalRate *= (1000 - rate) / 1000;
        }
        return Math.round((1 - totalRate) * 1000) / 10;
    };
    Sikyu.prototype.checkNinshin = function () {
        if ($gameSwitches.value(990)) {
            return new NinshinResult(false, -1, -1);
        }
        if (this.isAlwaysNinshin()) {
            return this.cehckAlwaysNinshin();
        }
        var index = 0;
        var list = Nore.shuffle(this._sikyuSeieki.concat());
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var s = list_1[_i];
            var rate = this.ninshinRate(s.enemyId());
            var dice = Math.randomInt(1000);
            if ($gameSwitches.value(25)) {
                dice = 1;
            }
            if (dice < rate) {
                this.resetTestCount();
                return new NinshinResult(true, index, s.enemyId());
            }
            index++;
        }
        //$gameSwitches.setValue(20, false);
        this.upTestCount();
        return new NinshinResult(false, -1, -1);
    };
    Sikyu.prototype.cehckAlwaysNinshin = function () {
        var roulette = [];
        for (var _i = 0, _a = this._sikyuSeieki; _i < _a.length; _i++) {
            var s = _a[_i];
            for (var i = 0; i <= s.value(); i++) {
                roulette.push(s.enemyId());
            }
        }
        var enemyId = roulette[Math.randomInt(roulette.length)];
        var index = 0;
        for (var _b = 0, _c = this._sikyuSeieki; _b < _c.length; _b++) {
            var s = _c[_b];
            if (s.enemyId() == enemyId) {
                return new NinshinResult(true, index, enemyId);
            }
            index++;
        }
        return new NinshinResult(true, 0, enemyId);
    };
    Sikyu.prototype.ninshinRate = function (enemyId) {
        if ($gameSwitches.value(25)) {
            return 1000;
        }
        if ($gameSwitches.value(990)) {
            return 0;
        }
        if (this.isAlwaysNinshin()) {
            return 1000;
        }
        if (this.isNotNinshin()) {
            return 0;
        }
        var rate = this.countRate();
        var enemy = $dataEnemies[enemyId];
        var rank = enemy.meta['ninshin'];
        switch (rank) {
            case 'S': return 152 * rate;
            case 'A': return 122 * rate;
            case 'B': return 84 * rate;
            case 'C': return 68 * rate;
            case 'D': return 42 * rate;
            case 'E': return 0;
        }
    };
    Sikyu.prototype.isAlwaysNinshin = function () {
        return $gamePlayer.isAlwaysNinshin();
    };
    Sikyu.prototype.isNotNinshin = function () {
        var armor = $gameActors.mainActor().equips()[5];
        return armor && armor.itemId == 22;
    };
    Sikyu.prototype.upTestCount = function () {
        this._ninshinTestCount++;
    };
    Sikyu.prototype.resetTestCount = function () {
        this._ninshinTestCount = 0;
    };
    Sikyu.prototype.countRate = function () {
        switch (this._ninshinTestCount) {
            case 0: return 1;
            case 1: return 1.2;
            case 2: return 1.5;
            case 3: return 1.75;
            default: return 2;
        }
    };
    Sikyu.prototype.reduceSeieki = function () {
        var removeList = [];
        for (var _i = 0, _a = this._sikyuSeieki; _i < _a.length; _i++) {
            var seieki = _a[_i];
            seieki.update();
            if (seieki.isFinished()) {
                removeList.push(seieki);
            }
        }
        for (var _b = 0, removeList_1 = removeList; _b < removeList_1.length; _b++) {
            var seieki = removeList_1[_b];
            this._sikyuSeieki.splice(this._sikyuSeieki.indexOf(seieki), 1);
        }
    };
    Sikyu.prototype.onSyusan = function () {
        this.taneoyaId = 0;
        this._sikyuSeieki = [];
    };
    Sikyu.prototype.clear = function () {
        this._sikyuSeieki = [];
    };
    Sikyu.prototype.clearCurrentSeieki = function () {
        this._currentSeieki = 0;
    };
    return Sikyu;
}());
