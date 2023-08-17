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
var Game_RogueTemp = /** @class */ (function (_super) {
    __extends(Game_RogueTemp, _super);
    function Game_RogueTemp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedIndex = 0;
        return _this;
    }
    Game_RogueTemp.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.ignoreFiles = {};
        this._isDebug = Utils.isOptionValid("debug");
    };
    Game_RogueTemp.prototype.isDebug = function () {
        return this._isPlaytest;
    };
    Game_RogueTemp.prototype.upEroInfo = function () {
        this._upEroInfo = this._upEroInfo || new Nore.UpEroInfo();
        return this._upEroInfo;
    };
    Game_RogueTemp.prototype.clearUpEroInfo = function () {
        this._upEroInfo = null;
    };
    Game_RogueTemp.prototype.clearSyusanList = function () {
        this.syusanList = [];
    };
    Game_RogueTemp.prototype.pushSyusanList = function (list) {
        this.syusanList.push(list);
    };
    Game_RogueTemp.prototype.addIgnoreFileSet = function (base, index) {
        for (var i = 1; i < 1000; i++) {
            var id = i;
            var idString = id + '';
            if (id < 10) {
                idString = '0' + i;
            }
            var indexStr = index;
            if (parseInt(index) < 10) {
                indexStr = '0' + index;
            }
            this.ignoreFiles[base + '_' + idString + '_' + indexStr] = true;
        }
        this.ignoreFiles2 = this.ignoreFiles2 || [];
        this.ignoreFiles2.push([base, index]);
    };
    Game_RogueTemp.prototype.addIgnoreFiles = function (list) {
        if (!list) {
            return;
        }
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var file = list_1[_i];
            this.ignoreFiles[file] = true;
        }
    };
    Game_RogueTemp.prototype.clearIgnoreFiles = function () {
        this.ignoreFiles = {};
        this.ignoreFiles2 = [];
    };
    Game_RogueTemp.prototype.setNextScenario = function (id) {
        this._nextScenario = id;
    };
    ;
    Game_RogueTemp.prototype.nextScenario = function () {
        return this._nextScenario;
    };
    ;
    Game_RogueTemp.prototype.clearNextScenario = function () {
        this._nextScenario = null;
    };
    ;
    Game_RogueTemp.prototype.hasNextScenario = function () {
        return this._nextScenario != null;
    };
    ;
    return Game_RogueTemp;
}(Game_Temp));
