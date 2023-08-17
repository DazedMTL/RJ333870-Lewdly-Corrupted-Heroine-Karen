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
var CaptureTemp = /** @class */ (function () {
    function CaptureTemp(fileIndex, x, y, scale, rotation, effectList) {
        this.fileIndex = fileIndex;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.rotation = rotation;
        this.effectList = effectList;
    }
    return CaptureTemp;
}());
var CaptureEffect = /** @class */ (function () {
    function CaptureEffect(i) {
        this.index = 0;
        this.fileIndex = 0;
        this.scale = 90;
        this.x = 325;
        this.y = 225;
        this.rotation = 0;
        this.enabled = false;
        this.index = i;
        this.makeList();
    }
    CaptureEffect.prototype.pictureFile = function () {
        if (!this.enabled) {
            return '';
        }
        return this._list[this.fileIndex];
    };
    CaptureEffect.prototype.effectOn = function () {
        this.enabled = true;
    };
    CaptureEffect.prototype.effectOff = function () {
        this.enabled = false;
    };
    CaptureEffect.prototype.maxFileIndex = function () {
        return this._list.length - 1;
    };
    CaptureEffect.prototype.nextFile = function () {
        this.fileIndex++;
        var max = this.maxFileIndex();
        if (this.fileIndex > max) {
            this.fileIndex = max;
        }
    };
    CaptureEffect.prototype.previousFile = function () {
        this.fileIndex--;
        if (this.fileIndex < 0) {
            this.fileIndex = 0;
        }
    };
    CaptureEffect.prototype.pictureIndex = function () {
        return Nore.Tes.CG_PICTURE_ID1 + this.index;
    };
    CaptureEffect.prototype.small = function () {
        this.scale -= 5;
        this.scale = Math.max(this.scale, this.minScale());
    };
    CaptureEffect.prototype.big = function () {
        this.scale += 5;
        this.scale = Math.min(this.scale, 200);
    };
    CaptureEffect.prototype.minScale = function () {
        return 40;
    };
    CaptureEffect.prototype.maxScale = function () {
        return 250;
    };
    CaptureEffect.prototype.canSmall = function () {
        return this.minScale() < this.scale;
    };
    CaptureEffect.prototype.canBig = function () {
        return this.maxScale() > this.scale;
    };
    return CaptureEffect;
}());
var CaptureEffectGion = /** @class */ (function (_super) {
    __extends(CaptureEffectGion, _super);
    function CaptureEffectGion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptureEffectGion.prototype.makeList = function () {
        this._list = [
            '0effect_byuru1_1',
            '0effect_byuru2_1',
            '0effect_byuru3_1',
            '0effect_pan1_1',
            '0effect_pan2_1',
            '0effect_pan3_1',
            '0effect_dopu1',
            '0effect_gichi1_1',
            '0effect_zubu1',
            '0effect_zubu2',
        ];
    };
    return CaptureEffectGion;
}(CaptureEffect));
var CaptureEffectSerif = /** @class */ (function (_super) {
    __extends(CaptureEffectSerif, _super);
    function CaptureEffectSerif() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptureEffectSerif.prototype.makeList = function () {
        this._list = [
            '0effect_a1',
            '0effect_a2',
            '0effect_iku1_1',
            '0effect_iku1_2',
            '0effect_kore1',
            '0effect_minai1',
            '0effect_muri1',
            '0effect_soko1',
            '0effect_soko2',
            '0effect_sugoi1',
        ];
    };
    return CaptureEffectSerif;
}(CaptureEffect));
var CaptureEffectObj = /** @class */ (function (_super) {
    __extends(CaptureEffectObj, _super);
    function CaptureEffectObj() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptureEffectObj.prototype.makeList = function () {
        this._list = [
            '0effect_seieki1',
            '0effect_seieki2',
            '0effect_seieki3',
            '0effect_ase1',
            '0effect_ase2',
            '0effect_paso1',
            '0effect_nori1',
            '0effect_nori2',
            '0effect_frame1',
            '0effect_seito1',
            '0effect_yuge1',
            '0effect_yuge2',
            '0effect_heart1',
            '0effect_heart2',
            '0effect_heart3',
            '0effect_jusei_1',
            '0effect_jusei_2',
        ];
    };
    return CaptureEffectObj;
}(CaptureEffect));
var Nore;
(function (Nore) {
    var SWAP = {
        46: 26,
        834: 34,
        41: 18,
        44: 6,
        43: 16,
        838: 16,
        49: 19,
        99: 39,
        209: 203,
        206: 202,
        840: 12,
        841: 12,
        842: 12,
        538: 38,
        829: 204,
        511: 11,
        831: 10,
        824: 53,
    };
    var EroFile = /** @class */ (function () {
        function EroFile(_index, _x, _y, _scale, _fileList) {
            this._index = _index;
            this._x = _x;
            this._y = _y;
            this._scale = _scale;
            this._fileList = _fileList;
        }
        EroFile.prototype.index = function () {
            return this._index;
        };
        EroFile.prototype.x = function () {
            return this._x;
        };
        EroFile.prototype.y = function () {
            return this._y;
        };
        EroFile.prototype.scale = function () {
            return this._scale;
        };
        EroFile.prototype.fileList = function () {
            return this._fileList;
        };
        EroFile.prototype.setFileList = function (l) {
            this._fileList = l;
        };
        return EroFile;
    }());
    var ERO_FILE_LIST = {
        1: new EroFile(12, 338, 430, 65, [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 21, 22, 31, 32, 33, 34]),
        2: new EroFile(0, 320, 512, 80, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 21, 31, 41, 51, 61, 62, 71, 81]),
        3: new EroFile(8, 318, 716, 95, [1, 2, 3, 5, 6, 7, 113, 213, 313, 413]),
        4: new EroFile(8, 264, 440, 65, [1, 2, 3, 11, 21, 31, 41, 51, 61, 62, 71, 81, 91, 101]),
        6: new EroFile(0, 308, 444, 65, [1, 2, 3, 4, 11, 12, 14, 20, 21, 22, 23, 24, 25, 31]),
        7: new EroFile(10, 380, 498, 65, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 21, 31, 41, 51, 101, 102, 103, 104, 105, 111]),
        8: new EroFile(8, 320, 506, 65, [1, 2, 3, 5, 19, 29, 39, 49, 8]),
        9: new EroFile(0, 366, 582, 95, [1, 2, 6, 7, 8, 9, 11, 29, 39, 59, 69, 79]),
        831: new EroFile(2, 320, 428, 55, [100, 101, 102, 111]),
        11: new EroFile(0, 314, 216, 45, [1, 2, 3, 10]),
        511: new EroFile(0, 314, 216, 45, [11, 12, 20]),
        12: new EroFile(3, 386, 448, 60, [1, 2, 3, 4, 5]),
        840: new EroFile(4, 386, 448, 60, [1, 11, 12, 13, 14, 15]),
        841: new EroFile(3, 386, 448, 60, [21, 22, 23, 24, 25]),
        842: new EroFile(3, 386, 448, 60, [1, 2, 3, 4, 5]),
        13: new EroFile(5, 392, 392, 75, [1, 2, 3, 4, 10, 11]),
        14: new EroFile(8, 318, 466, 60, [1, 2, 3, 4, 11, 12, 13, 21, 31, 32]),
        15: new EroFile(4, 394, 528, 75, [1, 2, 3, 4, 5, 11, 21, 31, 41, 50, 51, 52, 53, 61, 71, 81]),
        16: new EroFile(7, 254, 508, 65, [1, 2, 4, 5, 11, 21, 31, 41, 50, 51, 52, 53, 61, 71, 81]),
        838: new EroFile(2, 254, 508, 65, [101, 111, 121, 131]),
        17: new EroFile(6, 384, 48, 65, [1, 2, 3, 18, 28, 38, 48, 58, 68, 78]),
        18: new EroFile(9, 392, 236, 70, [1, 2, 3, 4, 5, 101, 115, 215, 315, 415, 515, 615, 715, 815, 11]),
        41: new EroFile(9, 392, 236, 70, [1, 2, 3, 4, 5, 101, 115, 215, 315, 415, 515, 615, 715, 815, 11]),
        19: new EroFile(2, 342, 428, 55, [1, 2, 113]),
        21: new EroFile(0, 320, 540, 75, [1, 2, 3, 4, 6, 7, 11, 22, 33, 8, 9, 44]),
        22: new EroFile(9, 396, 434, 70, [1, 2, 3, 4, 5, 6, 7, 10, 20, 30, 40]),
        23: new EroFile(1, 366, 472, 60, [1, 2, 3]),
        24: new EroFile(4, 366, 248, 60, [1, 2, 18, 28, 38, 48]),
        25: new EroFile(4, 258, 332, 55, [1, 2, 3, 4, 11, 12, 13, 21, 31, 32, 33, 34]),
        26: new EroFile(6, 354, 380, 65, [1, 2, 3, 4, 10, 20, 30, 40, 5, 6, 9]),
        27: new EroFile(0, 344, 438, 55, [1, 11, 21, 31, 41, 51, 61, 71, 81, 91]),
        28: new EroFile(5, 288, 422, 55, [1, 11, 29, 39, 49, 59, 69]),
        30: new EroFile(4, 386, 210, 60, [1, 11, 21, 31, 41, 51, 52]),
        31: new EroFile(4, 368, 222, 55, [1, 2, 3, 4, 11]),
        32: new EroFile(0, 338, 276, 50, [9, 19, 29, 39, 49, 59, 69, 79, 89]),
        33: new EroFile(5, 328, 192, 50, [1, 2, 10, 18, 28, 38, 48, 58, 60, 61, 62]),
        34: new EroFile(8, 222, 374, 65, [1, 2, 3, 4, 11, 21, 31, 41, 51, 8]),
        834: new EroFile(8, 222, 374, 65, [1, 2, 3, 4, 11, 21, 31, 41, 51, 8]),
        51: new EroFile(5, 222, 374, 65, [1, 11, 21, 31, 41, 51, 8]),
        36: new EroFile(0, 372, 428, 55, [1, 19, 29, 39, 49, 59, 69]),
        37: new EroFile(8, 222, 374, 65, [1, 2, 3, 4, 11, 21, 31, 41, 51, 8]),
        38: new EroFile(0, 276, 658, 90, [1, 2, 3, 5, 6, 7, 113, 213, 313, 413]),
        538: new EroFile(5, 276, 658, 90, [11, 12, 15, 613, 713, 18, 19]),
        39: new EroFile(12, 392, 230, 75, [1, 2, 3, 4, 5, 6, 115, 215, 315, 415, 515, 615, 715, 811, 915, 935]),
        43: new EroFile(7, 254, 508, 65, [1, 2, 4, 5, 11, 21, 31, 41, 50, 51, 52, 53, 61, 71, 81]),
        44: new EroFile(3, 300, 444, 65, [40, 41, 42, 43, 20, 21, 22, 23, 24, 25, 31]),
        45: new EroFile(3, 300, 310, 50, [1, 2, 12, 13, 14, 15]),
        46: new EroFile(0, 356, 424, 75, [91, 92, 93, 94, 95, 96, 97]),
        47: new EroFile(0, 320, 512, 80, [11, 21, 31, 41, 51, 1, 2, 3]),
        48: new EroFile(5, 306, 526, 70, [1, 2, 3, 4, 5, 6, 11, 12, 13]),
        49: new EroFile(1, 342, 428, 55, [1, 213]),
        50: new EroFile(0, 308, 444, 65, [1]),
        53: new EroFile(3, 338, 430, 65, [1, 2, 3, 10, 20, 30]),
        824: new EroFile(3, 338, 430, 65, [1, 2, 3, 10, 20, 30]),
        98: new EroFile(0, 308, 444, 65, [1]),
        99: new EroFile(0, 392, 230, 75, [1, 2, 3, 4, 5, 6, 115, 215, 315, 915, 935]),
        202: new EroFile(5, 342, 428, 55, [1, 2, 3, 4, 10, 18, 28, 38, 48, 58, 8]),
        206: new EroFile(5, 342, 428, 55, [1, 2, 3, 4, 10, 18, 28, 38, 48, 58, 8]),
        203: new EroFile(0, 342, 428, 55, [10, 18, 28, 38, 48, 58, 68, 78, 88, 89, 87]),
        204: new EroFile(0, 342, 428, 55, [10, 20, 30, 31, 32, 40, 50, 60, 70, 71, 72, 73, 74, 80, 90]),
        829: new EroFile(0, 342, 428, 55, [10, 20, 30, 31, 32, 40, 50, 60, 70, 71, 72, 73, 74, 80, 90]),
        205: new EroFile(0, 358, 428, 55, [18, 28, 38, 48, 58, 68, 78, 88, 98, 101, 102, 118, 103]),
        209: new EroFile(0, 342, 428, 55, [10, 18, 28, 38, 48, 58, 68, 78, 88, 89, 87]),
    };
    var Scene_Capture = /** @class */ (function (_super) {
        __extends(Scene_Capture, _super);
        function Scene_Capture() {
            return _super.call(this) || this;
        }
        Scene_Capture.prototype.create = function () {
            this._result = $gameTemp.currentHistory || $gameTemp.dungeonResult || $gameSystem.lastDungeonResult();
            $gameVariables.setValue(5, 0);
            $gameVariables.setValue(6, 0);
            _super.prototype.create.call(this);
            this.createWindowLayer();
            this.createCaptureWindow();
            this.createCommandWindow();
        };
        Scene_Capture.prototype.createBackground = function () {
        };
        Scene_Capture.prototype.createCaptureWindow = function () {
            this._window = new Window_Capture(this._result);
            this.addChild(this._window);
            /*
                        const g = new PIXI.Graphics();
                        g.beginFill(999, 1);
                        g.drawRect(0, 0, 200, this.height);
                        g.endFill();
                        this.addChild(g);*/
        };
        Scene_Capture.prototype.createCommandWindow = function () {
            this._commandWindow = new Window_CaptureCommand(new Rectangle(310, 10, 300, 470));
            this._commandWindow.setHandler('move', this.onMove.bind(this));
            this._commandWindow.setHandler('next', this.onNext.bind(this));
            this._commandWindow.setHandler('previous', this.onPrevious.bind(this));
            this._commandWindow.setHandler('small', this.onSmall.bind(this));
            this._commandWindow.setHandler('big', this.onBig.bind(this));
            this._commandWindow.setHandler('right', this.onRight.bind(this));
            this._commandWindow.setHandler('right90', this.onRight90.bind(this));
            this._commandWindow.setHandler('left90', this.onLeft90.bind(this));
            this._commandWindow.setHandler('left', this.onLeft.bind(this));
            this._commandWindow.setHandler('reset', this.onReset.bind(this));
            this._commandWindow.setHandler('cancel', this.onCommandCancel.bind(this));
            this._commandWindow.deactivate();
            this._commandWindow.setCaptureWindow(this._window);
            this.addChild(this._commandWindow);
            this._effectWindow = new Window_EffectCommand(new Rectangle(310, 10, 300, 400));
            this._effectWindow.setHandler('on', this.onEffectOn.bind(this));
            this._effectWindow.setHandler('off', this.onEffectOff.bind(this));
            this._effectWindow.setHandler('move', this.onMove.bind(this));
            this._effectWindow.setHandler('next', this.onEffectNext.bind(this));
            this._effectWindow.setHandler('previous', this.onEffectPrevious.bind(this));
            this._effectWindow.setHandler('small', this.onEffectSmall.bind(this));
            this._effectWindow.setHandler('big', this.onEffectBig.bind(this));
            this._effectWindow.setHandler('right', this.onEffectRight.bind(this));
            this._effectWindow.setHandler('left', this.onEffectLeft.bind(this));
            this._effectWindow.setHandler('reset', this.onReset.bind(this));
            this._effectWindow.setHandler('cancel', this.onCommandCancel.bind(this));
            this._effectWindow.deactivate();
            this._effectWindow.setCaptureWindow(this._window);
            this._effectWindow.hide();
            this.addChild(this._effectWindow);
            this._itemWindow = new Window_ItemCommand(new Rectangle(10, 10, 300, 470));
            this._itemWindow.setHandler('ero', this.onEro.bind(this));
            this._itemWindow.setHandler('effect1', this.onEffect1.bind(this));
            this._itemWindow.setHandler('effect2', this.onEffect1.bind(this));
            this._itemWindow.setHandler('effect3', this.onEffect1.bind(this));
            this._itemWindow.setHandler('effect4', this.onEffect1.bind(this));
            this._itemWindow.setHandler('effect5', this.onEffect1.bind(this));
            this._itemWindow.setHandler('effect6', this.onEffect1.bind(this));
            this._itemWindow.setHandler('effect7', this.onEffect1.bind(this));
            this._itemWindow.setHandler('effect8', this.onEffect1.bind(this));
            this._itemWindow.setHandler('change', this.onItemChange.bind(this));
            this._itemWindow.setHandler('ok', this.onOk.bind(this));
            this._itemWindow.setCaptureWindow(this._window);
            this.addChild(this._itemWindow);
        };
        Scene_Capture.prototype.onCommandCancel = function () {
            this._commandWindow.deactivate();
            this._effectWindow.deactivate();
            this._itemWindow.activate();
        };
        Scene_Capture.prototype.onItemChange = function () {
            switch (this._itemWindow.currentSymbol()) {
                case 'ero':
                    this._commandWindow.show();
                    this._effectWindow.hide();
                    break;
                case 'effect1':
                    this._effectWindow.show();
                    this._commandWindow.hide();
                    this._effectWindow.setEffectIndex(0);
                    break;
                case 'effect2':
                    this._effectWindow.show();
                    this._commandWindow.hide();
                    this._effectWindow.setEffectIndex(1);
                    break;
                case 'effect3':
                    this._effectWindow.show();
                    this._commandWindow.hide();
                    this._effectWindow.setEffectIndex(2);
                    break;
                case 'effect4':
                    this._effectWindow.show();
                    this._commandWindow.hide();
                    this._effectWindow.setEffectIndex(3);
                    break;
                case 'effect5':
                    this._effectWindow.show();
                    this._commandWindow.hide();
                    this._effectWindow.setEffectIndex(4);
                    break;
                case 'effect6':
                    this._effectWindow.show();
                    this._commandWindow.hide();
                    this._effectWindow.setEffectIndex(5);
                    break;
                case 'effect7':
                    this._effectWindow.show();
                    this._commandWindow.hide();
                    this._effectWindow.setEffectIndex(6);
                    break;
                case 'effect8':
                    this._effectWindow.show();
                    this._commandWindow.hide();
                    this._effectWindow.setEffectIndex(7);
                    break;
            }
        };
        Scene_Capture.prototype.effectIndex = function () {
            switch (this._itemWindow.currentSymbol()) {
                case 'effect1': return 0;
                case 'effect2': return 1;
                case 'effect3': return 2;
                case 'effect4': return 3;
                case 'effect5': return 4;
                case 'effect6': return 5;
                case 'effect7': return 6;
                case 'effect8': return 7;
            }
            return -1;
        };
        Scene_Capture.prototype.onEffectOn = function () {
            this._window.effectOn(this.effectIndex());
            this._effectWindow.refresh();
            this._effectWindow.activate();
            this._itemWindow.refresh();
        };
        Scene_Capture.prototype.onEffectOff = function () {
            this._window.effectOff(this.effectIndex());
            this._effectWindow.refresh();
            this._effectWindow.activate();
            this._itemWindow.refresh();
        };
        Scene_Capture.prototype.onEffectNext = function () {
            this._window.nextEffect(this.effectIndex());
            this._effectWindow.refresh();
            this._effectWindow.activate();
        };
        Scene_Capture.prototype.onEffectPrevious = function () {
            this._window.previousEffect(this.effectIndex());
            this._effectWindow.refresh();
            this._effectWindow.activate();
        };
        Scene_Capture.prototype.onEffectSmall = function () {
            this._window.smallEffect(this.effectIndex());
            this._effectWindow.refresh();
            this._effectWindow.activate();
        };
        Scene_Capture.prototype.onEffectBig = function () {
            this._window.bigEffect(this.effectIndex());
            this._effectWindow.refresh();
            this._effectWindow.activate();
        };
        Scene_Capture.prototype.onEffectRight = function () {
            this._window.rotateRightEffect(this.effectIndex());
            this._effectWindow.refresh();
            this._effectWindow.activate();
        };
        Scene_Capture.prototype.onEffectLeft = function () {
            this._window.rotateLeftEffect(this.effectIndex());
            this._effectWindow.refresh();
            this._effectWindow.activate();
        };
        Scene_Capture.prototype.onEro = function () {
            this._commandWindow.activate();
            this._itemWindow.deactivate();
        };
        Scene_Capture.prototype.onEffect1 = function () {
            this._commandWindow.deactivate();
            this._effectWindow.activate();
        };
        Scene_Capture.prototype.onReset = function () {
            this._window.reset();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.onOk = function () {
            var self = this;
            this._window.save(this._result, function () {
                self.update();
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1 + 1);
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1 + 2);
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1 + 3);
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1 + 4);
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1 + 5);
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1 + 6);
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1 + 7);
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1 + 8);
                SceneManager.pop();
            });
        };
        Scene_Capture.prototype.onMove = function () {
        };
        Scene_Capture.prototype.onSmall = function () {
            this._window.small();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.onBig = function () {
            this._window.big();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.onNext = function () {
            this._window.next();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.onPrevious = function () {
            this._window.previous();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.onRight = function () {
            this._window.rotateRight();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.onLeft = function () {
            this._window.rotateLeft();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.onRight90 = function () {
            this._window.rotateRight90();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.onLeft90 = function () {
            this._window.rotateLeft90();
            this._commandWindow.refresh();
            this._commandWindow.activate();
        };
        Scene_Capture.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this._itemWindow.active) {
                return;
            }
            if (this._commandWindow.currentSymbol() == 'move' && !this._commandWindow.active && this._commandWindow.visible) {
                this.updateMove();
            }
            if (this._effectWindow.currentSymbol() == 'move' && !this._effectWindow.active && this._effectWindow.visible) {
                this.updateMoveEffect();
            }
        };
        Scene_Capture.prototype.updateMove = function () {
            if (Input.isTriggered('ok') || Input.isTriggered('cancel')) {
                this._commandWindow.activate();
                SoundManager.playOk();
                return;
            }
            if (Input.isPressed('left')) {
                this._window.left();
            }
            if (Input.isPressed('up')) {
                this._window.up();
            }
            if (Input.isPressed('down')) {
                this._window.down();
            }
            if (Input.isPressed('right')) {
                this._window.right();
            }
        };
        Scene_Capture.prototype.updateMoveEffect = function () {
            if (Input.isTriggered('ok') || Input.isTriggered('cancel')) {
                this._effectWindow.activate();
                SoundManager.playOk();
                return;
            }
            if (Input.isPressed('left')) {
                this._window.leftEffect(this.effectIndex());
            }
            if (Input.isPressed('up')) {
                this._window.upEffect(this.effectIndex());
            }
            if (Input.isPressed('down')) {
                this._window.downEffect(this.effectIndex());
            }
            if (Input.isPressed('right')) {
                this._window.rightEffect(this.effectIndex());
            }
        };
        return Scene_Capture;
    }(Scene_MenuBase));
    Nore.Scene_Capture = Scene_Capture;
    var Scene_CaptureSave = /** @class */ (function (_super) {
        __extends(Scene_CaptureSave, _super);
        function Scene_CaptureSave() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_CaptureSave.prototype.create = function () {
            _super.prototype.create.call(this);
            this._commandWindow.hide();
            this._effectWindow.hide();
            this._itemWindow.hide();
            this.onOk();
        };
        return Scene_CaptureSave;
    }(Scene_Capture));
    Nore.Scene_CaptureSave = Scene_CaptureSave;
    var Window_Capture = /** @class */ (function (_super) {
        __extends(Window_Capture, _super);
        function Window_Capture(result) {
            var _this = this;
            var x = 620;
            _this = _super.call(this, new Rectangle(x, 10, 650, 450)) || this;
            _this._result = result;
            _this._area = new Rectangle(25, 25, 600, 400);
            _this._scale = 100;
            _this.initFileList();
            _this._fileIndex = _this._eroFile.index();
            _this.reset();
            _this._rotation = 0;
            _this.restoreTemp();
            _this.createEroSprite();
            _this.initEffects();
            _this.createGraphics();
            _this.refresh();
            return _this;
        }
        Window_Capture.prototype.restoreTemp = function () {
            this._effectList = [
                new CaptureEffectGion(1),
                new CaptureEffectGion(2),
                new CaptureEffectSerif(3),
                new CaptureEffectSerif(4),
                new CaptureEffectObj(5),
                new CaptureEffectObj(6),
                new CaptureEffectObj(7),
                new CaptureEffectObj(8),
            ];
            if ($gameTemp.captureTemp) {
                this._scale = $gameTemp.captureTemp.scale;
                this._px = $gameTemp.captureTemp.x;
                this._py = $gameTemp.captureTemp.y;
                this._fileIndex = $gameTemp.captureTemp.fileIndex;
                this._rotation = $gameTemp.captureTemp.rotation;
                this._effectList = $gameTemp.captureTemp.effectList;
            }
        };
        Window_Capture.prototype.initEffects = function () {
            for (var i = 1; i <= this._effectList.length; i++) {
                this['_pictureSprite' + i] = new Sprite_Picture(Nore.Tes.CG_PICTURE_ID1 + i);
                this.addChild(this['_pictureSprite' + i]);
                var myMask = new PIXI.Graphics();
                myMask.beginFill(999, 1);
                var m = this.margin + 1;
                myMask.drawRect(this.x + m, m + 10, this.width - m * 2, this.height - m * 2);
                myMask.endFill();
                this['_pictureSprite' + i].mask = myMask;
            }
        };
        Window_Capture.prototype.nextEffect = function (index) {
            var cap = this._effectList[index];
            cap.nextFile();
            this.refresh();
        };
        Window_Capture.prototype.previousEffect = function (index) {
            var cap = this._effectList[index];
            cap.previousFile();
            this.refresh();
        };
        Window_Capture.prototype.effectOn = function (index) {
            var cap = this._effectList[index];
            cap.effectOn();
            this.refresh();
        };
        Window_Capture.prototype.effectOff = function (index) {
            var cap = this._effectList[index];
            cap.effectOff();
            this.refresh();
        };
        Window_Capture.prototype.smallEffect = function (index) {
            var cap = this._effectList[index];
            cap.small();
            this.refresh();
        };
        Window_Capture.prototype.bigEffect = function (index) {
            var cap = this._effectList[index];
            cap.big();
            this.refresh();
        };
        Window_Capture.prototype.rotateRightEffect = function (index) {
            var cap = this._effectList[index];
            cap.rotation += 2;
            this.refresh();
        };
        Window_Capture.prototype.rotateLeftEffect = function (index) {
            var cap = this._effectList[index];
            cap.rotation -= 2;
            this.refresh();
        };
        Window_Capture.prototype.leftEffect = function (index) {
            var cap = this._effectList[index];
            cap.x -= 2;
            this.refresh();
        };
        Window_Capture.prototype.rightEffect = function (index) {
            var cap = this._effectList[index];
            cap.x += 2;
            this.refresh();
        };
        Window_Capture.prototype.downEffect = function (index) {
            var cap = this._effectList[index];
            cap.y += 2;
            this.refresh();
        };
        Window_Capture.prototype.upEffect = function (index) {
            var cap = this._effectList[index];
            cap.y -= 2;
            this.refresh();
        };
        Window_Capture.prototype.isOnEffect = function (index) {
            var cap = this._effectList[index];
            return cap.enabled;
        };
        Window_Capture.prototype.maxEffectIndex = function () {
            return 7;
        };
        Window_Capture.prototype.initFileList = function () {
            this._eroFile = ERO_FILE_LIST[this._result.eroId()];
            if (this._result.eroId() === 98) {
                this._eroFile.setFileList($gameTemp.syusanList);
            }
            if (!this._eroFile) {
                console.error(this._result.eroId());
            }
        };
        Window_Capture.prototype.reset = function () {
            this._px = this._eroFile.x();
            this._py = this._eroFile.y();
            this._scale = this._eroFile.scale();
            this._rotation = 0;
            this.refresh();
        };
        Window_Capture.prototype.save = function (result, func) {
            $gameTemp.captureTemp = new CaptureTemp(this._fileIndex, this._px, this._py, this._scale, this._rotation, this._effectList);
            p($gameTemp.captureTemp);
            this.visible = false;
            this._pictureSprite.mask = null;
            this._pictureSprite1.mask = null;
            this._pictureSprite2.mask = null;
            this._pictureSprite3.mask = null;
            this._pictureSprite4.mask = null;
            this._pictureSprite5.mask = null;
            this._pictureSprite6.mask = null;
            this._pictureSprite7.mask = null;
            this._pictureSprite8.mask = null;
            var fileName = result.imageFile();
            if (!fileName) {
                fileName = $gameSystem.gameId() + '_' + $gameVariables.value(4);
                if ($gameSwitches.value(12)) {
                    // 夜
                    fileName += '_n';
                }
            }
            ImageManager.removeHistory(fileName);
            saveCanvas([this._pictureSprite, this._pictureSprite1, this._pictureSprite2, this._pictureSprite3, this._pictureSprite4, this._pictureSprite5, this._pictureSprite6, this._pictureSprite7, this._pictureSprite8], this._area, fileName, function () {
                result.setImageFile(fileName);
                $gameScreen.erasePicture(Nore.Tes.CG_PICTURE_ID1);
                func();
            });
        };
        Window_Capture.prototype.createEroSprite = function () {
            this._pictureSprite = new Sprite_Picture(Nore.Tes.CG_PICTURE_ID1);
            this.addChild(this._pictureSprite);
            var myMask = new PIXI.Graphics();
            myMask.beginFill(999, 1);
            var m = this.margin + 1;
            myMask.drawRect(this.x + m, m + 10, this.width - m * 2, this.height - m * 2);
            myMask.endFill();
            this._pictureSprite.mask = myMask;
        };
        Window_Capture.prototype.createGraphics = function () {
            this.removeChild(this._glayImage1);
            this.removeChild(this._glayImage2);
            this.removeChild(this._glayImage3);
            this.removeChild(this._glayImage4);
            var offset = 25;
            this.createGray(1, 0, 0, this._area.width + offset, offset);
            this.createGray(2, 0, offset, offset, this._area.height);
            this.createGray(3, 0, this._area.height + offset, this._area.width + offset, offset);
            this.createGray(4, offset + this._area.width, 0, offset, this._area.height + offset * 2);
            this._areaImage = new PIXI.Graphics();
            this._areaImage.lineStyle(3, 0xD82257, 1);
            this._areaImage.drawRect(0, 0, this._area.width, this._area.height);
            this.updateRectPosition();
            this.addChild(this._areaImage);
        };
        Window_Capture.prototype.createGray = function (index, x, y, w, h) {
            var glayImage = new PIXI.Graphics();
            glayImage.beginFill(0x000000, 0.6);
            glayImage.drawRect(x, y, w, h);
            glayImage.endFill();
            this.addChild(glayImage);
            this['_glayImage' + index] = glayImage;
        };
        Window_Capture.prototype.left = function () {
            this._px -= 2;
            this.refresh();
        };
        Window_Capture.prototype.right = function () {
            this._px += 2;
            this.refresh();
        };
        Window_Capture.prototype.down = function () {
            this._py += 2;
            this.refresh();
        };
        Window_Capture.prototype.up = function () {
            this._py -= 2;
            this.refresh();
        };
        Window_Capture.prototype.rotateRight = function () {
            this._rotation += 0.5;
            this.refresh();
        };
        Window_Capture.prototype.rotateLeft = function () {
            this._rotation -= 0.5;
            this.refresh();
        };
        Window_Capture.prototype.rotateRight90 = function () {
            this._rotation += 22.5;
            this.refresh();
        };
        Window_Capture.prototype.rotateLeft90 = function () {
            this._rotation -= 22.5;
            this.refresh();
        };
        Window_Capture.prototype.updateRectPosition = function () {
            this._areaImage.x = this._area.x;
            this._areaImage.y = this._area.y;
        };
        Window_Capture.prototype.refresh = function () {
            //this.drawActor();
            var eroFile = this._eroFile;
            var eroId2 = this._result.eroId();
            var actorId = 1;
            if (SWAP[eroId2]) {
                eroId2 = SWAP[eroId2];
            }
            if (eroId2 > 200) {
                actorId = Math.floor(eroId2 / 100);
                eroId2 = eroId2 % 100;
            }
            if (eroId2 == 98) {
                this.refreshSyusan();
                return;
            }
            var eroId = eroId2.padZero(2);
            var fileId = eroFile.fileList()[this._fileIndex].padZero(2);
            var file = '0%1_%2_%3'.format(actorId, eroId, fileId);
            p(file);
            var id = Nore.Tes.CG_PICTURE_ID1;
            var scale = this._scale;
            $gameScreen.showPicture(id, Nore.webpPrefix + file, 50, this._px, this._py, scale, scale, 255, 0, this._rotation);
            if (!this._effectList) {
                return;
            }
            for (var i = 0; i < this._effectList.length; i++) {
                var cap = this._effectList[i];
                $gameScreen.showPicture(cap.pictureIndex(), cap.pictureFile(), 50, cap.x, cap.y, cap.scale, cap.scale, 255, 0, cap.rotation);
            }
        };
        Window_Capture.prototype.refreshSyusan = function () {
            var eroFile = this._eroFile;
            var fileList = eroFile.fileList()[this._fileIndex];
            //let file = '0%1_%2_%3'.format(1, 50, fileId);
            p(fileList);
            var id = Nore.Tes.CG_PICTURE_ID1;
            var scale = this._scale;
            $gameScreen.showPicture(id, fileList, 50, this._px, this._py, scale, scale, 255, 0, this._rotation);
            if (!this._effectList) {
                return;
            }
            for (var i = 0; i < this._effectList.length; i++) {
                var cap = this._effectList[i];
                $gameScreen.showPicture(cap.pictureIndex(), cap.pictureFile(), 50, cap.x, cap.y, cap.scale, cap.scale, 255, 0, cap.rotation);
            }
        };
        Window_Capture.prototype.drawActor = function () {
            var actor = $gameActors.mainActor();
            var faceId = actor.calcBattleFaceId();
            this.drawTachie(1, this._tachieLayer, 0, 0, null, faceId);
        };
        Window_Capture.prototype.canGoNextEffect = function (effectIndex) {
            var cap = this._effectList[effectIndex];
            return cap.fileIndex < cap.maxFileIndex();
        };
        Window_Capture.prototype.canGoPreviousEffect = function (effectIndex) {
            var cap = this._effectList[effectIndex];
            return cap.fileIndex > 0;
        };
        Window_Capture.prototype.canGoNext = function () {
            return this._fileIndex < this._eroFile.fileList().length - 1;
        };
        Window_Capture.prototype.canGoPrevious = function () {
            return this._fileIndex > 0;
        };
        Window_Capture.prototype.next = function () {
            this._fileIndex++;
            this.refresh();
        };
        Window_Capture.prototype.previous = function () {
            this._fileIndex--;
            this.refresh();
        };
        Window_Capture.prototype.canSmall = function () {
            return this.minScale() < this._scale;
        };
        Window_Capture.prototype.canBig = function () {
            return this.maxScale() > this._scale;
        };
        Window_Capture.prototype.minScale = function () {
            return 40;
        };
        Window_Capture.prototype.maxScale = function () {
            return 250;
        };
        Window_Capture.prototype.small = function () {
            this._scale -= 5;
            this._scale = Math.max(this._scale, this.minScale());
            this.refresh();
        };
        Window_Capture.prototype.big = function () {
            this._scale += 5;
            this._scale = Math.min(this._scale, 200);
            this.refresh();
        };
        return Window_Capture;
    }(Window_Base));
    var Window_ItemCommand = /** @class */ (function (_super) {
        __extends(Window_ItemCommand, _super);
        function Window_ItemCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._effectIndex = 0;
            return _this;
        }
        Window_ItemCommand.prototype.setCaptureWindow = function (window) {
            this._window = window;
            this.refresh();
        };
        Window_ItemCommand.prototype.makeCommandList = function () {
            if (!this._window) {
                return;
            }
            this.addCommand('エロ画像', 'ero', true, null);
            this.addCommand('擬音1', 'effect1', true, null);
            this.addCommand('擬音2', 'effect2', true, null);
            this.addCommand('セリフ1', 'effect3', true, null);
            this.addCommand('セリフ2', 'effect4', true, null);
            this.addCommand('エフェクト1', 'effect5', true, null);
            this.addCommand('エフェクト2', 'effect6', true, null);
            this.addCommand('エフェクト3', 'effect7', true, null);
            this.addCommand('エフェクト4', 'effect8', true, null);
            this.addCommand('確定', 'ok', true, null);
        };
        Window_ItemCommand.prototype.setEffectIndex = function (index) {
            this._effectIndex = index;
        };
        Window_ItemCommand.prototype.drawItem = function (index) {
            var rect = this.itemLineRect(index);
            var align = this.itemTextAlign();
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
            if (index >= 1 && index <= 8) {
                if (this._window.isOnEffect(index - 1)) {
                    this.drawText('ON', rect.x, rect.y, 30, 'left');
                }
            }
        };
        ;
        return Window_ItemCommand;
    }(Window_Command));
    var Window_CaptureCommand = /** @class */ (function (_super) {
        __extends(Window_CaptureCommand, _super);
        function Window_CaptureCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_CaptureCommand.prototype.setCaptureWindow = function (window) {
            this._window = window;
            this.refresh();
        };
        Window_CaptureCommand.prototype.makeCommandList = function () {
            if (!this._window) {
                return;
            }
            this.addCommand('位置調整', 'move', true, null);
            this.addCommand('次の画像', 'next', this._window.canGoNext(), null);
            this.addCommand('前の画像', 'previous', this._window.canGoPrevious(), null);
            this.addCommand('拡大', 'big', this._window.canBig(), null);
            this.addCommand('縮小', 'small', this._window.canSmall(), null);
            this.addCommand('右回転(1度)', 'right', true, null);
            this.addCommand('左回転(1度)', 'left', true, null);
            this.addCommand('右回転(45度)', 'right90', true, null);
            this.addCommand('左回転(45度)', 'left90', true, null);
            this.addCommand('リセット', 'reset', true, null);
        };
        return Window_CaptureCommand;
    }(Window_Command));
    var Window_EffectCommand = /** @class */ (function (_super) {
        __extends(Window_EffectCommand, _super);
        function Window_EffectCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._effectIndex = 0;
            return _this;
        }
        Window_EffectCommand.prototype.setCaptureWindow = function (window) {
            this._window = window;
            this.refresh();
        };
        Window_EffectCommand.prototype.setEffectIndex = function (index) {
            this._effectIndex = index;
            this.refresh();
        };
        Window_EffectCommand.prototype.makeCommandList = function () {
            if (!this._window) {
                return;
            }
            var isOn = this._window.isOnEffect(this._effectIndex);
            if (isOn) {
                this.addCommand('オン状態', 'off', true, null);
            }
            else {
                this.addCommand('オフ状態', 'on', true, null);
            }
            this.addCommand('位置調整', 'move', isOn, null);
            this.addCommand('次の画像', 'next', isOn && this._window.canGoNextEffect(this._effectIndex), null);
            this.addCommand('前の画像', 'previous', isOn && this._window.canGoPreviousEffect(this._effectIndex), null);
            this.addCommand('拡大', 'big', isOn && this._window.canBig(), null);
            this.addCommand('縮小', 'small', isOn && this._window.canSmall(), null);
            this.addCommand('右回転', 'right', isOn, null);
            this.addCommand('左回転', 'left', isOn, null);
            //this.addCommand('右回転(90度)', 'right90',  true, null);
            //this.addCommand('左回転(90度)', 'left90',  true, null);
            //this.addCommand('リセット', 'reset',  true, null);
        };
        return Window_EffectCommand;
    }(Window_Command));
    function screenShot() {
        var bitmap = Bitmap.snap(SceneManager._scene);
        AudioManager.playSe({ name: 'pis6', volume: 90, pitch: 100, pan: 0 });
        var filename = getFileName();
        var fs = require('fs');
        var canvas_to_base64 = function (canvas) {
            return canvas.toDataURL().split(',')[1];
        };
        var dirPath = getSsDir();
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        var decode_and_copy = function (string, filename, callback) {
            p('decode_and_copy');
            var buffer = new Buffer(string, 'base64');
            var f = dirPath + '/' + filename;
            fs.writeFile(f, buffer, callback);
        };
        decode_and_copy(canvas_to_base64(bitmap._canvas), filename, callback);
        function callback() {
            p('screenShot');
            bitmap.destroy();
        }
    }
    Nore.screenShot = screenShot;
    function getFileName() {
        var d = new Date();
        var yy = d.getFullYear();
        var m = d.getMonth() + 1;
        var dd = d.getDay();
        var hh = d.getHours();
        var mm = d.getMinutes();
        var ss = d.getSeconds();
        return yy + '-' + m + '-' + dd + ' ' + hh + '_' + mm + '_' + ss + '.png';
    }
    function saveCanvas(spriteList, rect, name, callback) {
        var bitmap = new Bitmap(rect.width, rect.height);
        var context = bitmap._context;
        var renderTexture = PIXI.RenderTexture.create(rect.width, rect.height);
        var ss = new PIXI.Sprite();
        for (var _i = 0, spriteList_1 = spriteList; _i < spriteList_1.length; _i++) {
            var sprite = spriteList_1[_i];
            sprite.x -= rect.x;
            sprite.y -= rect.y;
            sprite.worldTransform.identity();
            ss.addChild(sprite);
        }
        Graphics.app.renderer.render(ss, renderTexture);
        var canvas = Graphics.app.renderer.extract.canvas(renderTexture);
        context.drawImage(canvas, 0, 0);
        renderTexture.destroy();
        //bitmap._setDirty();
        if (Utils.isNwjs()) {
            var fs = require('fs');
            var canvas_to_base64 = function (canvas) {
                return canvas.toDataURL().split(',')[1];
            };
            var dirPath = getHistoryDir();
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            var decode_and_copy = function (string, filename, callback) {
                p('decode_and_copy');
                var buffer = new Buffer(string, 'base64');
                var f = dirPath + '/' + filename + '.png';
                fs.writeFile(f, buffer, callback);
            };
            decode_and_copy(canvas_to_base64(bitmap._canvas), name, callback);
        }
    }
    Nore.saveCanvas = saveCanvas;
})(Nore || (Nore = {}));
function getSsDir() {
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    var dirPath = path.join(base, 'screenshot/');
    return dirPath;
}
function getHistoryDir() {
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    var dirPath = path.join(base, 'history/');
    return dirPath;
}
Bitmap.prototype._startLoading = function () {
    this._image = new Image();
    this._image.onload = this._onLoad.bind(this);
    this._image.onerror = this._onError.bind(this);
    this._destroyCanvas();
    this._loadingState = "loading";
    if (Utils.hasEncryptedImages() && this._url.indexOf('history') < 0) {
        this._startDecrypting();
    }
    else {
        this._image.src = this._url;
    }
};
