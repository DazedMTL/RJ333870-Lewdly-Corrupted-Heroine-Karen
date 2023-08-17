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
var CostumeSaver = /** @class */ (function () {
    function CostumeSaver(_saveBote) {
        if (_saveBote === void 0) { _saveBote = false; }
        this._saveBote = _saveBote;
        this.saveCostume();
    }
    CostumeSaver.prototype.saveCostume = function () {
        var actor = $gameActors.mainActor();
        this._outerId = actor.outerId;
        this._outerTopId = actor.outerTopId;
        this._outerBottomId = actor.outerBottomId;
        this._armId = actor.armId;
        this._legId = actor.legId;
        this._innerTopId = actor.innerTopId;
        this._innerBottomId = actor.innerBottomId;
        this._poseId = actor.poseId;
        this._faceId = actor.faceId;
        this._breakId = actor.breakId;
        this._hoppeId = actor.hoppeId;
        this._boteId = actor.boteId;
        this._acceMap = JsonEx.makeDeepCopy(actor.acceMap);
    };
    CostumeSaver.prototype.restoreCostume = function (restoreBast) {
        if (restoreBast === void 0) { restoreBast = false; }
        var actor = $gameActors.mainActor();
        var acce281 = actor.hasAcce(281);
        var acce282 = actor.hasAcce(282);
        var acce283 = actor.hasAcce(283);
        actor.setOuterId(this._outerId);
        actor.setOuterTopId(this._outerTopId);
        actor.setOuterBottomId(this._outerBottomId);
        actor.setArmId(this._armId);
        actor._legId = this._legId;
        actor._innerTopId = this._innerTopId;
        actor._innerBottomId = this._innerBottomId;
        actor.setFaceId(this._faceId);
        actor.setBreakId(this._breakId);
        actor.setHoppeId(this._hoppeId);
        if (this._saveBote) {
            actor.setPoseId(this._poseId);
            actor.setBoteId(this._boteId);
        }
        actor.acceMap = JsonEx.makeDeepCopy(this._acceMap);
        if (!restoreBast) {
            this.restoreAcce(actor, 281, acce281);
            this.restoreAcce(actor, 282, acce282);
            this.restoreAcce(actor, 283, acce283);
        }
        actor.setCacheChanged();
    };
    CostumeSaver.prototype.restoreAcce = function (actor, id, b) {
        if (b) {
            actor.addAcce(id);
        }
        else {
            actor.removeAcce(id);
        }
    };
    return CostumeSaver;
}());
var ScenarioEvent = /** @class */ (function () {
    function ScenarioEvent(file, ero, forEro) {
        this.file = file;
        this.ero = ero;
        this.forEro = forEro;
    }
    return ScenarioEvent;
}());
var Game_RogueSystem = /** @class */ (function (_super) {
    __extends(Game_RogueSystem, _super);
    function Game_RogueSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._historyList = [];
        _this._colletList = [];
        _this._lastCostumeList = [];
        _this._reservedBarEvents = [];
        _this._reservedInnEvents = [];
        return _this;
    }
    Game_RogueSystem.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._questManager = new QuestManager();
        this._nextId = 0;
        this._gameId = this.initGameId();
    };
    Game_RogueSystem.prototype.colletList = function () {
        return this._colletList || [];
    };
    Game_RogueSystem.prototype.pushColletSyusan = function (id) {
        // 0 神父
        // 1 あらくれ
        // 2 かねもち
        // 3 カレン
        this._colletList = this._colletList || [];
        this._colletList.push(id);
    };
    Game_RogueSystem.prototype.initGameId = function () {
        var d = new Date();
        var yy = d.getFullYear();
        var m = d.getMonth() + 1;
        var dd = d.getDay();
        var hh = d.getHours();
        var mm = d.getMinutes();
        var ss = d.getSeconds();
        return yy + '-' + m + '-' + dd + '_' + hh + '_' + mm + '_' + ss;
    };
    Game_RogueSystem.prototype.gameId = function () {
        return this._gameId;
    };
    Game_RogueSystem.prototype.addAcce = function (acceId) {
        var actor = $gameActors.mainActor();
        for (var i = 1; i <= 3; i++) {
            this.restoreCostume(i);
            actor.addAcce(acceId);
            this.saveCostume(i);
        }
    };
    Game_RogueSystem.prototype.saveCostume = function (slot) {
        this._lastCostumeList[slot] = new CostumeSaver();
    };
    Game_RogueSystem.prototype.restoreCostume = function (slot) {
        if (!this._lastCostumeList[slot]) {
            console.error('costume not found:' + slot);
            return false;
        }
        this._lastCostumeList[slot].restoreCostume();
        return true;
    };
    Game_RogueSystem.prototype.finishDungeon = function (clear, defeatEnemyId, eroId, faceId) {
        if (!this._dungeonInfo) {
            console.error('info not found');
        }
        var result = new DungeonResult(this._dungeonInfo, clear, defeatEnemyId, eroId, faceId);
        result.upEro(this.getEro(1));
        this.historyList().push(result);
        this._dungeonInfo = null;
    };
    Game_RogueSystem.prototype.finishDefeatEro = function () {
        this._dungeonInfo.finishEro($gameVariables.value(3));
        $gameTemp.clearUpEroInfo();
        var upEroPower = this._dungeonInfo.calcEroPower();
        $gameActors.mainActor().plusEroPower(upEroPower);
    };
    Game_RogueSystem.prototype.historyList = function () {
        return this._historyList;
    };
    Game_RogueSystem.prototype.syusanList = function () {
        var result = [];
        for (var _i = 0, _a = this.historyList(); _i < _a.length; _i++) {
            var r = _a[_i];
            if (r.isSyusan()) {
                result.push(r);
            }
        }
        return result;
    };
    Game_RogueSystem.prototype.dungeonInfo = function () {
        return this._dungeonInfo;
    };
    Game_RogueSystem.prototype.info = function () {
        return this._eroInfo || this._dungeonInfo;
    };
    Game_RogueSystem.prototype.createDungeonInfo = function (dungeonId) {
        this._dungeonInfo = new DungeonInfo(dungeonId);
    };
    Game_RogueSystem.prototype.createEroInfo = function (eroId) {
        this._eroInfo = new EroInfo(eroId);
    };
    Game_RogueSystem.prototype.lastDungeonResult = function () {
        return this._historyList[this._historyList.length - 1];
    };
    Game_RogueSystem.prototype.questManager = function () {
        return this._questManager;
    };
    Game_RogueSystem.prototype.saveEroStatus = function () {
        this._lastEro = JsonEx.makeDeepCopy(this.getEro(1));
        var actor = $gameActors.mainActor();
        this._lastEroPower = actor.eroPower;
        this._lastSeieki = $gameParty.ether();
    };
    Game_RogueSystem.prototype.saveSeieki = function () {
        this._lastSeieki = $gameParty.ether();
    };
    Game_RogueSystem.prototype.writeToVariables = function () {
        if (!this._lastEro) {
            console.error('saveEroStatus が呼ばれていません');
        }
        var ero = $gameSystem.getEro(1);
        var actor = $gameActors.mainActor();
        var text = '';
        if ($gameParty.ether() > this._lastSeieki) {
            text += 'Obtained %1 cc of semen!\n'.format($gameParty.ether() - this._lastSeieki);
        }
        if (actor.eroPower > this._lastEroPower) {
            text += 'Dark power increased by %1!\n'.format(actor.eroPower - this._lastEroPower);
        }
        if (ero.chitsuStatus > this._lastEro.chitsuStatus) {
            text += 'Vaginal development increased by %1!\n'.format(ero.chitsuStatus - this._lastEro.chitsuStatus);
        }
        if (ero.analStatus > this._lastEro.analStatus) {
            text += 'Anal development increased by %1!\n'.format(ero.analStatus - this._lastEro.analStatus);
        }
        if (ero.chikubiStatus > this._lastEro.chikubiStatus) {
            text += 'Nipple development increased by %1!\n'.format(ero.chikubiStatus - this._lastEro.chikubiStatus);
        }
        if (ero.kuchiStatus > this._lastEro.kuchiStatus) {
            text += 'Oral development increased by %1!\n'.format(ero.kuchiStatus - this._lastEro.kuchiStatus);
        }
        if (ero.keikenPeople() > this._lastEro.keikenPeople()) {
            text += 'Sex with Humans increased by %1!\n'.format(ero.keikenPeople() - this._lastEro.keikenPeople());
        }
        if (ero.anal > this._lastEro.anal) {
            text += 'Number of anal sex increased by %1!\n'.format(ero.anal - this._lastEro.anal);
        }
        if (ero.fela > this._lastEro.fela) {
            text += 'Number of blowjobs increased by %1!\n'.format(ero.fela - this._lastEro.fela);
        }
        if (ero.keikenMonster() > this._lastEro.keikenMonster()) {
            text += 'Sex with Monsters increased by %1!\n'.format(ero.keikenMonster() - this._lastEro.keikenMonster());
        }
        if (ero.chitsuTightening > this._lastEro.chitsuTightening) {
            text += 'Vaginal tightness increased by %1!\n'.format(ero.chitsuTightening - this._lastEro.chitsuTightening);
        }
        if (ero.chitsuTightening < this._lastEro.chitsuTightening) {
            text += 'Vaginal tightness decreased by %1!\n'.format(Math.abs(ero.chitsuTightening - this._lastEro.chitsuTightening));
        }
        if (ero.analTightening > this._lastEro.analTightening) {
            text += 'Anal tightness increased by %1!\n'.format(ero.analTightening - this._lastEro.analTightening);
        }
        if (ero.analTightening < this._lastEro.analTightening) {
            text += 'Anal tightness decreased by %1!\n'.format(Math.abs(ero.analTightening - this._lastEro.analTightening));
        }
        $gameVariables.setValue(20, text);
    };
    Game_RogueSystem.prototype.finishEroResult = function (enemyId, faceId) {
        if (!this._lastEro) {
            console.error('saveEroStatus が呼ばれていません');
        }
        if (!this._eroInfo) {
            console.error('createEroInfo が呼ばれていません');
        }
        var count = this.calcEroCount(this._eroInfo.eroId());
        var eroResult = new EroResult(this._eroInfo, enemyId, faceId, count);
        eroResult.upEro(this.getEro(1));
        //let nakadashi = this.getEro(1).nakadashi - this._lastEro.nakadashi;
        //p('nakadashi:' + nakadashi)
        this.historyList().push(eroResult);
        this._eroInfo = null;
    };
    Game_RogueSystem.prototype.calcEroCount = function (eroId) {
        var count = 0;
        for (var _i = 0, _a = this.historyList(); _i < _a.length; _i++) {
            var result = _a[_i];
            if (result.eroId() == eroId) {
                count++;
            }
        }
        return count + 1;
    };
    Game_RogueSystem.prototype.addNinshinResult = function (result) {
        var eroResult = new NinshinEroResult(result);
        this._historyList.push(eroResult);
    };
    Game_RogueSystem.prototype.addNinshinResult2 = function () {
        var eroResult = new NinshinEroResult2();
        this._historyList.push(eroResult);
    };
    Game_RogueSystem.prototype.addSyusanResult = function (eroId, taneoyaId) {
        var eroResult = new SyusanResult(eroId, taneoyaId);
        eroResult.upEro($gameSystem.getEro(1));
        this._historyList.push(eroResult);
    };
    Game_RogueSystem.prototype.getEro = function (actorId) {
        this.eroStatus[actorId] = this.eroStatus[actorId] || this.newEro(actorId);
        return this.eroStatus[actorId];
    };
    Game_RogueSystem.prototype.newEro = function (actorId) {
        var ero = new Erostatus(actorId);
        var actor = $dataActors[actorId];
        /*if (actor) {
            if (actor.meta['経験人数']) {
                ero.sexCount = parseInt(actor.meta['経験人数']);
            }
            if (actor.meta['中出し回数']) {
                ero.nakadashi = parseInt(actor.meta['中出し回数']);
            }
            if (actor.meta['妊娠回数']) {
                ero.ninshin = parseInt(actor.meta['妊娠回数']);
            }
            if (actor.meta['出産回数']) {
                ero.syusan = parseInt(actor.meta['出産回数']);
            }
            if (actor.meta['ゴム本番回数']) {
                ero.gum = parseInt(actor.meta['ゴム本番回数']);
            }
            if (actor.meta['アナル回数']) {
                ero.anal = parseInt(actor.meta['アナル回数']);
            }
            if (actor.meta['パイズリ回数']) {
                ero.pai = parseInt(actor.meta['パイズリ回数']);
            }
            if (actor.meta['手コキ回数']) {
                ero.tekoki = parseInt(actor.meta['手コキ回数']);
            }
    
    
            if (actor.meta['キス回数']) {
                ero.kiss = parseInt(actor.meta['キス回数']);
            }
    
            if (actor.meta['絶頂']) {
                ero.iki = parseInt(actor.meta['絶頂']);
            }
    
        }*/
        return ero;
    };
    Game_RogueSystem.prototype.nextId = function () {
        this._nextId = this._nextId || 0;
        this._nextId++;
        return this._nextId;
    };
    Game_RogueSystem.prototype.getDefeatExp = function () {
        return Math.floor(($gameActors.mainActor().nextLevelExp() - $gameActors.mainActor().currentLevelExp()) * 2.2);
    };
    Game_RogueSystem.prototype.getReturnExp = function () {
        return Math.floor(($gameActors.mainActor().nextLevelExp() - $gameActors.mainActor().currentLevelExp()) * 1.1);
    };
    Game_RogueSystem.prototype.getClearExp = function () {
        return Math.floor(($gameActors.mainActor().nextLevelExp() - $gameActors.mainActor().currentLevelExp()) * 20.1);
    };
    Game_RogueSystem.prototype.reserveBarEvent = function (file) {
        this._reservedBarEvents = this._reservedBarEvents || [];
        this._reservedBarEvents.push(file);
    };
    Game_RogueSystem.prototype.isBarEventReserved = function () {
        this._reservedBarEvents = this._reservedBarEvents || [];
        return this._reservedBarEvents.length > 0;
    };
    Game_RogueSystem.prototype.getReservedBarEvent = function () {
        return this._reservedBarEvents.shift();
    };
    Game_RogueSystem.prototype.reserveInnEvent = function (file, first) {
        this._reservedInnEvents = this._reservedInnEvents || [];
        if (first) {
            this._reservedInnEvents.unshift(file);
        }
        else {
            this._reservedInnEvents.push(file);
        }
    };
    Game_RogueSystem.prototype.isInnEventReserved = function () {
        this._reservedInnEvents = this._reservedInnEvents || [];
        return this._reservedInnEvents.length > 0;
    };
    Game_RogueSystem.prototype.getReservedInnEvent = function () {
        return this._reservedInnEvents.shift();
    };
    Game_RogueSystem.prototype.isEventReserved = function (actorId) {
        this._eventReservation = this._eventReservation || {};
        this._eventReservation[actorId] = this._eventReservation[actorId] || [];
        return this._eventReservation[actorId].length > 0;
    };
    Game_RogueSystem.prototype.isEroEventReserved = function (actorId) {
        this._eventReservation = this._eventReservation || {};
        this._eventReservation[actorId] = this._eventReservation[actorId] || [];
        if (this._eventReservation[actorId].length === 0) {
            return false;
        }
        return this._eventReservation[actorId][0].ero;
    };
    Game_RogueSystem.prototype.endEvent = function (file) {
        this._finishedEvents = this._finishedEvents || {};
        this._finishedEvents[file] = true;
    };
    Game_RogueSystem.prototype.restoreEvent = function (file) {
        this._finishedEvents = this._finishedEvents || {};
        p('restore:' + file + ' ' + this._finishedEvents[file]);
        this._finishedEvents[file] = false;
    };
    Game_RogueSystem.prototype.isEndEvent = function (file) {
        this._finishedEvents = this._finishedEvents || {};
        return this._finishedEvents[file];
    };
    Game_RogueSystem.prototype.getReservedActorEvent = function (actorId) {
        this._eventReservation = this._eventReservation || {};
        this._eventReservation[actorId] = this._eventReservation[actorId] || [];
        if (this._eventReservation[actorId][0]) {
            return this._eventReservation[actorId][0].file;
        }
        return null;
    };
    Game_RogueSystem.prototype.reserveActorEvent = function (actorId, scenarioId, ero, forEro) {
        if (this.isEndEvent(scenarioId)) {
            //p('end' + scenarioId)
            return;
        }
        this._eventReservation = this._eventReservation || {};
        this._eventReservation[actorId] = this._eventReservation[actorId] || [];
        this._eventReservation[actorId].push(new ScenarioEvent(scenarioId, ero, forEro));
    };
    Game_RogueSystem.prototype.clearReservedEvent = function () {
        this._eventReservation = {};
    };
    return Game_RogueSystem;
}(Game_System));
