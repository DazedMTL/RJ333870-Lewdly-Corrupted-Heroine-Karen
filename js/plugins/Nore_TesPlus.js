/*:ja
 * @target MZ
 * @author ル
 *
 * @command Run
 * @text 実行
 * @des イベントファイルの実行。
 *
 * @command ReserveEvent
 * @text イベントの予約
 * @des イベントファイルの実行。
 * @arg placeId
 * @text 場所ID
 * @desc 場所ID
 * @arg fileId
 * @text ファイルID
 * @desc ファイルID
 *
 * @command RunReservedEvent
 * @text 予約されたイベントの実行
 * @des イベントファイルの実行。
 * @arg id
 * @text 場所ID
 * @desc 場所ID
 *
 * @command RunReservedBarEvent
 * @text 酒場イベントの実行
 * @des 酒場イベントの実行
 *
 *
 * @command RunReservedInnEvent
 * @text 宿屋イベントの実行
 * @des 宿屋イベントの実行
 *
 *
 * @command ReserveBarEvent
 * @text 酒場イベントの予約
 * @des 酒場イベントファイルの実行。
 * @arg fileId
 * @text ファイルID
 * @desc ファイルID
 *
 * @command ReserveInnEvent
 * @text 宿屋イベントの予約
 * @des 宿屋イベントファイルの実行。
 * @arg fileId
 * @text ファイルID
 * @desc ファイルID
 * @arg first
 * @text 最初にねじこむ？
 * @desc 最初にねじこむ？
 * @type boolean
 * @default false
 *
 * @command ChoiceZasetsu
 * @text 挫折ポイントが必要な選択肢の制御
 * @des 挫折ポイントが必要な選択肢の制御
 * @arg value
 * @text 必要ポイント
 * @desc 必要ポイント
 */
var Nore;
(function (Nore) {
    var Tes;
    (function (Tes) {
        Tes.CG_PICTURE_ID1 = 15;
        var CG_PICTURE_ID2 = 16;
        Game_System.prototype.reserveEvent = function (id, file) {
            this._reservedEvent = this._reservedEvent || {};
            this._reservedEvent[id] = this._reservedEvent[id] || [];
            this._reservedEvent[id].push(file);
        };
        Game_System.prototype.getReservedEvent = function (id) {
            this._reservedEvent = this._reservedEvent || {};
            this._reservedEvent[id] = this._reservedEvent[id] || [];
            if (this._reservedEvent[id].length > 0) {
                return this._reservedEvent[id].shift();
            }
            return null;
        };
        var pluginName = 'Nore_TesPlus';
        PluginManager.registerCommand(pluginName, 'Run', function (args) {
            var id = $gameTemp.nextScenario();
            var list = $dataScenario[id.normalize('NFC')];
            if (!list) {
                throw new Error('id:' + id + ' のデータが見つかりません');
            }
            $gameTemp.clearNextScenario();
            console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + id);
            this.setupChild(list, this._eventId);
        });
        PluginManager.registerCommand(pluginName, 'RunReservedEvent', function (args) {
            var id = args.id;
            var fileId = $gameSystem.getReservedEvent(id);
            if (!fileId) {
                return;
            }
            var list = $dataScenario[fileId.normalize('NFC')];
            if (!list) {
                throw new Error('id:' + fileId + ' のデータが見つかりません');
            }
            $gameTemp.clearNextScenario();
            console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + fileId);
            this.setupChild(list, this._eventId);
        });
        PluginManager.registerCommand(pluginName, 'RunReservedBarEvent', function (args) {
            var fileId = $gameSystem.getReservedBarEvent();
            if (!fileId) {
                return;
            }
            var list = $dataScenario[fileId.normalize('NFC')];
            if (!list) {
                throw new Error('id:' + fileId + ' のデータが見つかりません');
            }
            $gameTemp.clearNextScenario();
            console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + fileId);
            this.setupChild(list, this._eventId);
        });
        PluginManager.registerCommand(pluginName, 'RunReservedInnEvent', function (args) {
            var fileId = $gameSystem.getReservedInnEvent();
            if (!fileId) {
                return;
            }
            var list = $dataScenario[fileId.normalize('NFC')];
            if (!list) {
                throw new Error('id:' + fileId + ' のデータが見つかりません');
            }
            $gameTemp.clearNextScenario();
            console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + fileId);
            this.setupChild(list, this._eventId);
        });
        PluginManager.registerCommand(pluginName, 'ReserveEvent', function (args) {
            var placeId = args.placeId;
            var fileId = args.fileId;
            $gameSystem.reserveEvent(placeId, fileId);
        });
        PluginManager.registerCommand(pluginName, 'ReserveBarEvent', function (args) {
            var fileId = args.fileId;
            $gameSystem.reserveBarEvent(fileId);
        });
        PluginManager.registerCommand(pluginName, 'ReserveInnEvent', function (args) {
            var fileId = args.fileId;
            var first = (args.first == 'true');
            $gameSystem.reserveInnEvent(fileId, first);
        });
        PluginManager.registerCommand(pluginName, 'ChoiceZasetsu', function (args) {
            var value = args.value;
            $gameVariables.setValue(40, value);
        });
        var _Scenario_Converter_prototype_initFile = Tes.Scenario_Converter.prototype.initFile;
        Tes.Scenario_Converter.prototype.initFile = function () {
            _Scenario_Converter_prototype_initFile.call(this);
            this.defaultPosMap = {
                1: Nore.Tachie.RIGHT_POS, 2: Nore.Tachie.LEFT_POS, 3: Nore.Tachie.LEFT_POS, 4: Nore.Tachie.LEFT_POS,
                5: Nore.Tachie.LEFT_POS, 6: Nore.Tachie.LEFT_POS, 7: Nore.Tachie.LEFT_POS, 8: Nore.Tachie.LEFT_POS, 9: Nore.Tachie.LEFT_POS,
                11: Nore.Tachie.RIGHT_POS, 12: Nore.Tachie.CENTER_POS, 13: Nore.Tachie.LEFT_POS, 14: Nore.Tachie.CENTER_POS, 15: Nore.Tachie.RIGHT_POS, 16: Nore.Tachie.LEFT_POS, 17: Nore.Tachie.CENTER_POS, 18: Nore.Tachie.CENTER_POS, 19: Nore.Tachie.CENTER_POS
            };
            this._taneoyaId = 0;
        };
        var _Scenario_Converter_prototype_convertCommand = Tes.Scenario_Converter.prototype.convertCommand;
        Tes.Scenario_Converter.prototype.convertCommand = function (file, list, block) {
            var headerList = block.header.split(/\s/g);
            var command = headerList[0].substr(1);
            var header = this.parseHeader(headerList, false);
            var cos = /cos(\d+)/.exec(command);
            try {
                if (cos) {
                    var context = new Tes.Context(file, block.lineNumber, command, list, header, block.data);
                    this.validate(context);
                    this['convertCommand_cos'](parseInt(cos[1]), context);
                    return;
                }
            }
            catch (e) {
                console.error(command + 'のコマンドでエラーが発生しました');
                console.log(e);
                console.log(e.stack);
                throw e;
            }
            _Scenario_Converter_prototype_convertCommand.call(this, file, list, block);
        };
        Tes.Scenario_Converter.prototype.convertCommand_hide = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'hide', null, {}] });
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'hide', null, {}] });
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'resetFace', null, { actorId: 1 }] });
        };
        var _Scenario_Converter_prototype_convertCommand_m = Tes.Scenario_Converter.prototype.convertCommand_m;
        Tes.Scenario_Converter.prototype.convertCommand_m = function (mobId, context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'deactivateAll', null, {}] });
            _Scenario_Converter_prototype_convertCommand_m.call(this, mobId, context);
        };
        Tes.Scenario_Converter.prototype.convertCommand_n = function (actorId, context) {
            if (actorId == 0) {
                this.convertCommand_messages(context);
                return;
            }
            var position = this.defaultPosMap[actorId] || Nore.Tachie.LEFT_POS;
            ;
            switch (context.header['position']) {
                case 'right':
                    position = Nore.Tachie.RIGHT_POS;
                    break;
                case 'center':
                    position = Nore.Tachie.CENTER_POS;
                    break;
                case 'left':
                    position = Nore.Tachie.LEFT_POS;
                    break;
            }
            if (context.header['pose']) {
                var pose = parseInt(context.header['pose']);
                context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'pose', null, { 'actorId': actorId, 'poseId': pose }] });
            }
            if (actorId > 0) {
                var hoppe = context.headerInt('hoppe', 0);
                var namida = context.headerInt('namida', 0);
                context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'hoppe', null, { 'actorId': actorId, 'hoppeId': hoppe }] });
                context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'namida', null, { 'actorId': actorId, 'namidaId': namida }] });
            }
            var x = 0;
            var y = 0;
            var tachieActor = actorId;
            if (actorId >= 10) {
                tachieActor = 14;
            }
            if (position === Nore.Tachie.LEFT_POS) {
                context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'showLeft', null, { 'actorId': tachieActor, 'x': x, 'y': y, 'opacity': 100 }] });
            }
            else if (position === Nore.Tachie.CENTER_POS) {
                context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'showCenter', null, { 'actorId': tachieActor, 'x': x, 'y': y, 'opacity': 100 }] });
            }
            else {
                context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'showRight', null, { 'actorId': tachieActor, 'x': x, 'y': y, 'opacity': 100 }] });
            }
            var actor = $gameActors.actor(actorId);
            var name = actor ? '\\N[' + actorId + ']' : null;
            if (context.header['name']) {
                name = context.header['name'];
            }
            if (context.header['noname']) {
                name = null;
            }
            var face = null;
            if (context.header['actor']) {
                face = context.header['actor'];
            }
            var index = 0;
            if (context.header['index']) {
                index = context.headerInt('index');
            }
            if (context.header['face']) {
                index = context.headerInt('face') - 1;
            }
            if (actorId == 13) {
                index = 2;
            }
            if (actor) {
                context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Tachie', 'face', null, { 'actorId': tachieActor, 'faceId': index + 1 }] });
            }
            var giza = false;
            if (context.header['giza']) {
                giza = true;
            }
            this.convertCommand_messages(context, actorId, '', index, name, giza);
        };
        Tes.Scenario_Converter.prototype.convertCommand_messages = function (context, faceActorId, argFaceFile, argFaceIndex, argName, gizagiza) {
            if (faceActorId === void 0) { faceActorId = 0; }
            if (argFaceFile === void 0) { argFaceFile = null; }
            if (argFaceIndex === void 0) { argFaceIndex = null; }
            if (argName === void 0) { argName = null; }
            if (gizagiza === void 0) { gizagiza = false; }
            var faceName = '';
            var faceIndex = 0;
            var actorName = '';
            if (faceActorId > 0) {
                var actor = $gameActors.actor(faceActorId);
                if (!actor) {
                    console.error('IDが' + faceActorId + 'のアクターが登録されていません');
                }
                actorName = actor.name();
                faceName = actor.faceName();
                faceIndex = actor.faceIndex();
                if (argFaceIndex != null) {
                    faceIndex = argFaceIndex;
                }
            }
            if (argFaceFile != null) {
                faceName = argFaceFile;
            }
            if (argFaceIndex) {
                faceIndex = argFaceIndex;
            }
            if (argName) {
                actorName = argName;
            }
            var back = context.headerInt('back', 0);
            var pos = this.convertPosMz(context.headerInt('pos', 0));
            context.push({ 'code': 101, 'indent': this.indent, 'parameters': [faceName, faceIndex, back, pos, actorName, gizagiza] });
            for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
                var msg = _a[_i];
                context.push({ 'code': 401, 'indent': this.indent, 'parameters': [this.replaceMessage(msg)] });
            }
        };
        Tes.Scenario_Converter.prototype.convertCommand_ero = function (context) {
            var file = context.headerStr('file');
            var wait = context.headerInt('wait', 0);
            var scale = 100;
            var id;
            if (this._eroIndex === -1) {
                this._eroIndex = 1;
                id = Tes.CG_PICTURE_ID1;
                context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, Nore.webpPrefix + file, 0, 0, 0, 0, scale, scale, 0, 0] });
                context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                this._eroIndex = 0;
            }
            else if (this._eroIndex === 0) {
                id = CG_PICTURE_ID2;
                if (wait > 0) {
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, Nore.webpPrefix + file, 0, 0, 0, 0, scale, scale, 0, 0] });
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                }
                else {
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, Nore.webpPrefix + file, 0, 0, 0, 0, scale, scale, 255, 0] });
                    context.push({ 'code': 235, 'indent': this.indent, 'parameters': [Tes.CG_PICTURE_ID1] });
                }
                this._eroIndex = 1;
            }
            else {
                id = Tes.CG_PICTURE_ID1;
                context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, Nore.webpPrefix + file, 0, 0, 0, 0, scale, scale, 255, 0] });
                id = CG_PICTURE_ID2;
                if (wait > 0) {
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, 2, true] });
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, wait, true] });
                }
                else {
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 10, 0, 1, true] });
                    context.push({ 'code': 235, 'indent': this.indent, 'parameters': [id] });
                }
                this._eroIndex = 0;
            }
        };
        Tes.Scenario_Converter.prototype.convertCommand_eroAnime = function (context) {
            var files = context.headerStr('files').split(',');
            var wait = context.headerInt('wait', 0);
            var se = context.header['se'] ? JSON.parse(context.headerStr('se')) : '';
            var seIndex = context.headerInt('seIndex', -1);
            var reverse = context.headerBool('reverse', true);
            var once = context.headerBool('once', false);
            var json = {};
            json.wait = wait;
            json.seIndex = seIndex;
            json.once = once;
            json.se = se;
            var fileList = [];
            for (var i = 0; i < files.length; i++) {
                var f = files[i];
                fileList.push(f);
            }
            if (reverse) {
                for (var i = files.length - 1; i >= 1; i--) {
                    var f = files[i];
                    fileList.push(f);
                }
            }
            json.pic = fileList;
            var jsonStr = JSON.stringify(json);
            var scale = 100;
            var id;
            if (this._eroIndex === -1) {
                this._eroIndex = 1;
                id = Tes.CG_PICTURE_ID1;
                context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, Nore.webpPrefix + jsonStr, 0, 0, 0, 0, scale, scale, 0, 0] });
                context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                this._eroIndex = 0;
            }
            else if (this._eroIndex === 0) {
                id = CG_PICTURE_ID2;
                if (false && wait > 0) {
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, Nore.webpPrefix + jsonStr, 0, 0, 0, 0, scale, scale, 0, 0] });
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, wait, true] });
                }
                else {
                    context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, Nore.webpPrefix + jsonStr, 0, 0, 0, 0, scale, scale, 255, 0] });
                    context.push({ 'code': 235, 'indent': this.indent, 'parameters': [Tes.CG_PICTURE_ID1] });
                }
                this._eroIndex = 1;
            }
            else {
                id = Tes.CG_PICTURE_ID1;
                context.push({ 'code': 231, 'indent': this.indent, 'parameters': [id, Nore.webpPrefix + jsonStr, 0, 0, 0, 0, scale, scale, 255, 0] });
                id = CG_PICTURE_ID2;
                if (false && wait > 0) {
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 255, 0, 2, true] });
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, wait, true] });
                }
                else {
                    context.push({ 'code': 232, 'indent': this.indent, 'parameters': [id, 0, 0, 0, 0, 0, scale, scale, 0, 0, 1, true] });
                    context.push({ 'code': 235, 'indent': this.indent, 'parameters': [id] });
                }
                this._eroIndex = 0;
            }
        };
        Tes.Scenario_Converter.prototype.convertCommand_load_ero = function (context) {
            var file = context.headerStr('file');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_EroImg', 'PreloadWebp', null, { file: file }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_release_ero = function (context) {
            var file = context.headerStr('file');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_EroImg', 'ReleaseWebp', null, { file: file }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_shojo = function (context) {
            this.indent++;
            var ifnum = 0;
            var id = 3;
            var flag = 1;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_taikenban = function (context) {
            this.indent++;
            var ifnum = 0;
            var id = 990;
            var flag = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_manko = function (context) {
            this.indent++;
            var ifnum = 1;
            var id = 65;
            var value = context.headerInt('value');
            var type = 0; //0:数値 1:変数
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, value, 0] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_taneoya = function (context) {
            this.indent++;
            var ifnum = 1;
            var id = 76;
            var value = context.headerStr('value');
            var type = 0; //0:数値 1:変数
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, value, 0] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_not_taneoya = function (context) {
            this.indent++;
            var ifnum = 1;
            var id = 76;
            var value = context.headerStr('value');
            var type = 0; //0:数値 1:変数
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, value, 5] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_bibote = function (context) {
            this.indent++;
            var ifnum = 1;
            var id = 24;
            var value = 1;
            var type = 0; //0:数値 1:変数
            var op = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, value, op] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_bote = function (context) {
            this.indent++;
            var ifnum = 1;
            var actorId = context.headerInt('actor', 1);
            var id = actorId == 1 ? 24 : 77;
            var value = 2;
            var type = 0; //0:数値 1:変数
            var op = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, value, op] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_bote_or_bibote = function (context) {
            this.indent++;
            var ifnum = 1;
            var actorId = context.headerInt('actor', 1);
            var id = actorId == 1 ? 24 : 77;
            var value = 1;
            var type = 0; //0:数値 1:変数
            var op = 1;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, value, op] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_bibibote = function (context) {
            this.indent++;
            var ifnum = 0;
            var id = 55;
            var flag = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_not_bote = function (context) {
            this.indent++;
            var ifnum = 1;
            var id = 24;
            var value = 0;
            var type = 0; //0:数値 1:変数
            var op = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, type, value, op] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_not_shojo = function (context) {
            this.indent++;
            var ifnum = 0;
            var id = 3;
            var flag = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_yuruman = function (context) {
            this.indent++;
            var ifnum = 0;
            var id = 81;
            var flag = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_kitsuman = function (context) {
            this.indent++;
            var ifnum = 0;
            var id = 81;
            var flag = 1;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_seiheki = function (context) {
            var id = context.headerInt('id');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Seiheki', 'Show', null, { id: id }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_acce = function (context) {
            var id = context.headerInt('id');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Seiheki', 'Show', null, { id: id }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_acce = function (context) {
            var id = context.headerInt('id') + 100;
            this.indent++;
            var ifnum = 0;
            var flag = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_not_acce = function (context) {
            var id = context.headerInt('id') + 100;
            this.indent++;
            var ifnum = 0;
            var flag = 1;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_seiheki = function (context) {
            var id = context.headerInt('id') - 100;
            this.indent++;
            var ifnum = 0;
            var flag = 0;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_if_not_seiheki = function (context) {
            var id = context.headerInt('id') - 100;
            this.indent++;
            var ifnum = 0;
            var flag = 1;
            context.push({ 'code': 111, 'indent': this.indent - 1, 'parameters': [ifnum, id, flag] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_se_sounyu = function (context) {
            var name = 'sounyu1';
            var volume = context.headerInt('volume', 100);
            var pitch = context.headerInt('pitch', 100);
            var pan = context.headerInt('pan', 0);
            var se = { name: name, volume: volume, pitch: pitch, pan: pan };
            context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_se_shojomaku = function (context) {
            var name = 'shojomaku';
            var volume = context.headerInt('volume', 100);
            var pitch = context.headerInt('pitch', 100);
            var pan = context.headerInt('pan', 0);
            var se = { name: name, volume: volume, pitch: pitch, pan: pan };
            context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_se_nugi = function (context) {
            var name = 'Equip2';
            var volume = context.headerInt('volume', 100);
            var pitch = context.headerInt('pitch', 100);
            var pan = context.headerInt('pan', 0);
            var se = { name: name, volume: volume, pitch: pitch, pan: pan };
            context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_nakadashi = function (context) {
            var name = 'syasei1';
            var volume = context.headerInt('volume', 100);
            var pitch = context.headerInt('pitch', 100);
            var pan = context.headerInt('pan', 0);
            var value = context.headerInt('value', 1);
            var se = { name: name, volume: volume, pitch: pitch, pan: pan };
            var enemyId = this._taneoyaId;
            if (context.headerInt('enemyId')) {
                enemyId = context.headerInt('enemyId');
            }
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'Syasei', null, { enemyId: enemyId, value: value }] });
            context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
            context.push({ 'code': 117, 'indent': this.indent, 'parameters': [28] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_syasei = function (context) {
            var name = 'syasei1';
            var volume = context.headerInt('volume', 100);
            var pitch = context.headerInt('pitch', 100);
            var pan = context.headerInt('pan', 0);
            var se = { name: name, volume: volume, pitch: pitch, pan: pan };
            context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
            context.push({ 'code': 117, 'indent': this.indent, 'parameters': [28] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_end_nakadashi = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'EndSyasei', null, {}] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_chinpoNuku = function (context) {
            var name = 'sounyu1';
            var volume = context.headerInt('volume', 100);
            var pitch = context.headerInt('pitch', 100);
            var pan = context.headerInt('pan', 0);
            var value = context.headerInt('value', 1);
            var se = { name: name, volume: volume, pitch: pitch, pan: pan };
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'ChinpoNuku', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_iku = function (context) {
            var name = 'syasei1';
            var volume = context.headerInt('volume', 100);
            var pitch = context.headerInt('pitch', 100);
            var pan = context.headerInt('pan', 0);
            var value = context.headerInt('value', 1);
            //const se: RPG.AudioFile = { name: name, volume: volume, pitch: pitch, pan: pan };
            //context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Ero', 'PlusNakadashi', null, {value: value}]});
            //context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
            context.push({ 'code': 117, 'indent': this.indent, 'parameters': [27] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_plus_zasetsu = function (context) {
            var value = context.headerInt('value', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Ero', 'PlusZasetsu', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_taneoya = function (context) {
            this._taneoyaId = context.headerInt('id');
        };
        Tes.Scenario_Converter.prototype.convertCommand_plus_keiken = function (context) {
            var value = context.headerInt('value', 1);
            var type = context.headerStr('type', 'Person');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Ero', 'PlusKeiken', null, { value: value, type: type }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_plus_nakadashi = function (context) {
            var value = context.headerInt('value', 1);
            var enemyId = context.headerInt('enemyId', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Ero', 'PlusNakadashi', null, { value: value, enemyId: enemyId }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_plus_seieki = function (context) {
            var value = context.headerInt('value', 1);
            var enemyId = context.headerInt('enemyId', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Ninshin', 'plusSeieki', null, { value: value, enemyId: enemyId }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_plus_syusanSeieki = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Syusan', 'plusSeieki', null, {}] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_cos = function (context) {
            var outer = context.headerStr('outer');
            var outerTop = context.headerStr('outerTop');
            var outerBottom = context.headerStr('outerBottom');
            var innerBottom = context.headerStr('innerBottom');
            var innerTop = context.headerStr('innerTop');
            var arm = context.headerStr('arm');
            var leg = context.headerStr('leg');
            var actorId = context.headerInt('actor', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Cos', 'change', null, { actorId: actorId, outerId: outer, outerTopId: outerTop, innerBottomId: innerBottom, outerBottomId: outerBottom, innerTopId: innerTop, armId: arm, legId: leg }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_estrus = function (context) {
            var value = context.headerStr('value');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'Estrus', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_acceOff = function (context) {
            var acceId = context.headerStr('id');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Cos', 'acceOff', null, { actorId: 1, acceId: acceId }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_acceOn = function (context) {
            var acceId = context.headerStr('id');
            var actorId = context.headerInt('actor', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Cos', 'acceOn', null, { actorId: actorId, acceId: acceId }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_addEroAction = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'AddEroAction', null, { id: context.headerStr('action') }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_removeEroAction = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'RemoveEroAction', null, { id: 'teman' }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_skill = function (context) {
            var id = context.headerStr('id');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_ItemLogWindow', 'Show', null, { id: id }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_sexAnime = function (context) {
            var id = context.headerStr('id');
            var outFrame = context.headerInt('out');
            var inFrame = context.headerInt('in');
            var outStart = context.headerBool('outStart', false);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'SexAnime', null, { id: id, outFrame: outFrame, inFrame: inFrame, outStart: outStart }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_endSex = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'EndSex', null, {}] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_startKunni = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'StartKunni', null, {}] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_endKunni = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'EndKunni', null, {}] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_endKunni = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'EndKunni', null, {}] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_minus_zasetsu = function (context) {
            var value = context.headerInt('value', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'MinusZasetsu', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_choice_zasetsu = function (context) {
            var value = context.headerInt('value', 0);
            //context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_TesPlus', 'ChoiceZasetsu', null, {value: value}]});
        };
        Tes.Scenario_Converter.prototype.convertCommand_effect = function (context) {
            var value = context.headerStr('file');
            var layer = 18;
            var file = '0effect_' + value;
            var origin = context.header['origin'] === 'center' ? 1 : 0;
            var type = context.header['type'] === 'var' ? 1 : 0;
            var x = context.headerInt('x', 0);
            var y = context.headerInt('y', 0);
            var zoomX = context.headerInt('zoom_x', 100);
            var zoomy = context.headerInt('zoom_y', 100);
            var opacity = context.headerInt('transparent', 255);
            var blend = context.headerInt('blend', 0);
            context.push({ 'code': 231, 'indent': this.indent, 'parameters': [layer, file, origin, type, x, y, zoomX, zoomy, opacity, blend] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_hide_effect = function (context) {
            var layer = 18;
            context.push({ 'code': 235, 'indent': this.indent, 'parameters': [layer] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_position = function (context) {
            var actorId = context.headerInt('actor', 0);
            var position = context.headerStr('position', 'left');
            var pos = Nore.Tachie.LEFT_POS;
            switch (position) {
                case 'center':
                    pos = Nore.Tachie.CENTER_POS;
                    break;
                case 'right':
                    pos = Nore.Tachie.RIGHT_POS;
                    break;
            }
            this.defaultPosMap[actorId] = pos;
        };
        Tes.Scenario_Converter.prototype.convertCommand_sikyuShow = function (context) {
            var x = context.headerInt('x', 0);
            var y = context.headerInt('y', 0);
            var scale = context.headerInt('scale', 100);
            var type = context.headerInt('type', 1);
            var angle = context.headerInt('angle', 0);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_SikyuSprite', 'Show', null, { x: x, y: y, scale: scale, type: type, angle: angle }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_sikyuChinpo = function (context) {
            var chinpoType = context.headerStr('chinpoType', 'human');
            var chinpoSize = context.headerInt('chinpoSize', 1);
            var chinpoIn = context.headerInt('chinpoIn', 0);
            var chinpoOut = context.headerInt('chinpoOut', 0);
            var outStart = context.headerBool('outStart', false);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_SikyuSprite', 'StartChinpo', null, { chinpoType: chinpoType, chinpoSize: chinpoSize, chinpoIn: chinpoIn, chinpoOut: chinpoOut, outStart: outStart }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_sikyuSyasei = function (context) {
            var value = context.headerInt('value', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_SikyuSprite', 'Syasei', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_sikyuEndSyasei = function (context) {
            var value = context.headerInt('value', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_SikyuSprite', 'EndSyasei', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_plus_ether = function (context) {
            var value = context.headerInt('value', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Actor', 'plusEther', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_sikyuSeieki = function (context) {
            var value = context.headerInt('value', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_SikyuSprite', 'Seieki', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_sikyuHide = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_SikyuSprite', 'Hide', null, {}] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_sikyuChinpoHide = function (context) {
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_SikyuSprite', 'EndChinpo', null, {}] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_showLayer = function (context) {
            var id = context.headerStr('id');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Syusan', 'showLayer', null, { id: id }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_plus_sanke = function (context) {
            var value = context.headerInt('value');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Syusan', 'plusSanke', null, { value: value }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_hideLayer = function (context) {
            var id = context.headerStr('id');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Syusan', 'hideLayer', null, { id: id }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_setTaneoya = function (context) {
            var id = context.headerStr('id');
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Syusan', 'setTaneoya', null, { id: id }] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_se_muchi = function (context) {
            var name = 'sen_fa_muchi04';
            var volume = context.headerInt('volume', 100);
            var pitch = context.headerInt('pitch', 100);
            var pan = context.headerInt('pan', 0);
            var se = { name: name, volume: volume, pitch: pitch, pan: pan };
            context.push({ 'code': 250, 'indent': this.indent, 'parameters': [se] });
        };
        Tes.Scenario_Converter.prototype.convertCommand_face = function (context) {
            var value = context.headerInt('face', 1);
            context.push({ 'code': 357, 'indent': this.indent, 'parameters': ['Nore_Syusan', 'face', null, { face: value }] });
        };
        Tes.validates['ero'] = {
            'file': Tes.notEmpty(),
        };
        Tes.validates['load_ero'] = {
            'file': Tes.notEmpty(),
        };
        Tes.validates['release_ero'] = {
            'file': Tes.notEmpty(),
        };
        Tes.validates['eroAnime'] = {
            'files': Tes.notEmpty(),
        };
        Tes.validates['face'] = {
            'face': Tes.notEmpty(),
        };
        Tes.validates['nakadashi'] = {};
        Tes.validates['plus_ether'] = {
            'value': Tes.notEmpty(),
        };
        Tes.validates['if_manko'] = Tes.validates['if_taneoya'] = Tes.validates['if_not_taneoya'] = {
            'value': Tes.notEmpty(),
        };
        Tes.validates['plus_seieki'] = {
            'enemyId': Tes.notEmpty(),
            'value': Tes.notEmpty(),
        };
        Tes.validates['if_seiheki'] = Tes.validates['if_not_seiheki'] = Tes.validates['if_acce'] = Tes.validates['if_not_acce'] = Tes.validates['seiheki'] = Tes.validates['acce'] = {
            'id': Tes.notEmpty(),
        };
        Tes.validates['if_shojo'] = Tes.validates['if_bote'] = Tes.validates['if_not_bote'] = Tes.validates['if_bibibote'] = Tes.validates['se_sounyu'] = Tes.validates['se_shojomaku'] = Tes.validates['syasei'] = Tes.validates['plus_keiken'] = Tes.validates['plus_nakadashi'] = {};
        Tes.validates['if_not_shojo'] = Tes.validates['cos'] = Tes.validates['se_nugi'] = Tes.validates['plus_zasetsu'] = Tes.validates['acceOff']
            = Tes.validates['acceOn'] = Tes.validates['iku'] = Tes.validates['skill'] = Tes.validates['addEroAction'] = Tes.validates['removeEroAction']
            = Tes.validates['startKunni'] = Tes.validates['endKunni'] = Tes.validates['choice_zasetsu'] = Tes.validates['end_nakadashi']
            = Tes.validates['chinpoNuku'] = Tes.validates['taneoya'] = Tes.validates['estrus'] = Tes.validates['sexAnime'] = Tes.validates['endSex'] = Tes.validates['minus_zasetsu']
            = Tes.validates['effect'] = Tes.validates['hide_effect'] = Tes.validates['position'] = Tes.validates['sikyuChinpoHide'] = Tes.validates['plus_sanke']
            = Tes.validates['se_muchi'] = Tes.validates['plus_syusanSeieki'] = Tes.validates['setTaneoya'] = Tes.validates['if_taikenban']
            = Tes.validates['if_yuruman'] = Tes.validates['if_kitsuman']
            = Tes.validates['sikyuEndSyasei'] = Tes.validates['if_bibote'] = Tes.validates['if_bote_or_bibote'] = Tes.validates['showLayer'] = Tes.validates['hideLayer']
            = Tes.validates['sikyuShow'] = Tes.validates['sikyuHide'] = Tes.validates['sikyuChinpo'] = Tes.validates['sikyuSyasei'] = Tes.validates['sikyuSeieki'] = {};
    })(Tes = Nore.Tes || (Nore.Tes = {}));
})(Nore || (Nore = {}));
