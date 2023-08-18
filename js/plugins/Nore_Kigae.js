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
 * @command Kigae
 * @text 着替え
 * @des 着替え
 */
var Nore;
(function (Nore) {
    var pluginName = 'Nore_Kigae';
    PluginManager.registerCommand(pluginName, 'Kigae', function (args) {
        SceneManager.push(Scene_Kigae);
    });
    var Scene_Kigae = /** @class */ (function (_super) {
        __extends(Scene_Kigae, _super);
        function Scene_Kigae() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_Kigae.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.saveLastCos();
            this.createKigaeSlotWindow();
            this.createKigaeCommandWindow();
            this.createKigaeActorWindow();
            this.createKigaeLabel();
            this.createConfirmWindow();
            this.updateActor();
            this.onCommandChange();
        };
        Scene_Kigae.prototype.createConfirmWindow = function () {
            this._confirmWindow = new Nore.Window_Confirm();
            this._confirmWindow.setText('キャンセルしますか？');
            this._confirmWindow.setHandler('ok', this.onConfirmOk.bind(this));
            this._confirmWindow.setHandler('cancel', this.onConfirmCancel.bind(this));
            this._confirmWindow.deactivate();
            this.addChild(this._confirmWindow);
            this._confirmWindow.hide();
        };
        Scene_Kigae.prototype.onConfirmOk = function () {
            this._actor.resetFace();
            this._actor.setNaked(0);
            this._actor.putOnOuter();
            this._lastCos.restoreCostume();
            this._actor.setCacheChanged();
            $gamePlayer.refresh();
            this.popScene();
        };
        Scene_Kigae.prototype.onConfirmCancel = function () {
            this._confirmWindow.hide();
            this._confirmWindow.deactivate();
            this._kigaeCommandWindow.activate();
        };
        Scene_Kigae.prototype.saveLastCos = function () {
            this._lastCos = new CostumeSaver();
            this._lastCos.saveCostume();
        };
        Scene_Kigae.prototype.createKigaeLabel = function () {
            this._label1 = new Nore.Window_Label3(TextManager.kigaeError, 600, 20);
            this._label1.visible = false;
            this.addWindow(this._label1);
        };
        Scene_Kigae.prototype.createBackground = function () {
            /*this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(this._backgroundSprite);*/
        };
        Scene_Kigae.prototype.createKigaeSlotWindow = function () {
            this._kigaeSlotWindow = new Window_KigaeSlot('cos');
            this._kigaeSlotWindow.setHandler('ok', this.onOk.bind(this));
            this._kigaeSlotWindow.setHandler('change', this.onChange.bind(this));
            this._kigaeSlotWindow.setHandler('cancel', this.onCancelSlot.bind(this));
            this.addWindow(this._kigaeSlotWindow);
            this._kigaeSlotWindow2 = new Window_KigaeSlot('face');
            this._kigaeSlotWindow2.setHandler('ok', this.onOk2.bind(this));
            this._kigaeSlotWindow2.setHandler('change', this.onChange.bind(this));
            this._kigaeSlotWindow2.setHandler('cancel', this.onCancelSlot.bind(this));
            this.addWindow(this._kigaeSlotWindow2);
        };
        Scene_Kigae.prototype.createKigaeCommandWindow = function () {
            this._kigaeCommandWindow = new Window_KigaeCommand(new Rectangle(20, 20, 180, 160));
            this._kigaeCommandWindow.setHandler('change', this.onCommandChange.bind(this));
            this._kigaeCommandWindow.setHandler('ok', this.onDecide.bind(this));
            this._kigaeCommandWindow.setHandler('cancel', this.onCancel.bind(this));
            this._kigaeCommandWindow.setHandler('cos', this.onCos.bind(this));
            this._kigaeCommandWindow.setHandler('face', this.onFace.bind(this));
            this.addWindow(this._kigaeCommandWindow);
        };
        Scene_Kigae.prototype.onCancelSlot = function () {
            this._kigaeSlotWindow.deactivate();
            this._kigaeSlotWindow2.deactivate();
            this._kigaeCommandWindow.activate();
        };
        Scene_Kigae.prototype.onCos = function () {
            this._kigaeSlotWindow.activate();
        };
        Scene_Kigae.prototype.onFace = function () {
            this._kigaeSlotWindow2.activate();
        };
        Scene_Kigae.prototype.onCommandChange = function () {
            if (this._kigaeCommandWindow.currentSymbol() == 'cos') {
                this._kigaeSlotWindow.show();
                this._kigaeSlotWindow2.hide();
            }
            else if (this._kigaeCommandWindow.currentSymbol() == 'face') {
                this._kigaeSlotWindow2.show();
                this._kigaeSlotWindow.hide();
            }
            else {
                this._kigaeSlotWindow.hide();
                this._kigaeSlotWindow2.hide();
            }
            this._kigaeActorWindow.setNaked(0);
        };
        Scene_Kigae.prototype.onDecide = function () {
            this._actor.resetFace();
            this._actor.setNaked(0);
            this._actor.putOnOuter();
            this._actor.setCacheChanged();
            $gamePlayer.refresh();
            this.popScene();
        };
        Scene_Kigae.prototype.onCancel = function () {
            this._confirmWindow.setInfo(true);
            this._confirmWindow.show();
            this._confirmWindow.activate();
        };
        Scene_Kigae.prototype.createKigaeActorWindow = function () {
            this._kigaeActorWindow = new Window_KigaeActor();
            this.addWindow(this._kigaeActorWindow);
        };
        Scene_Kigae.prototype.updateActor = function () {
            _super.prototype.updateActor.call(this);
            this._actor.putOnOuter();
            this._actor.setCacheChanged();
            if (this._kigaeActorWindow) {
                this._kigaeSlotWindow.setActor(this._actor);
                this._kigaeSlotWindow2.setActor(this._actor);
                this._kigaeActorWindow.setActor(this._actor);
            }
        };
        Scene_Kigae.prototype.onOk = function () {
            this._actor.setCacheChanged();
            this._kigaeSlotWindow.decide();
            this._kigaeSlotWindow.refresh();
            this._kigaeActorWindow.refresh();
            this._kigaeSlotWindow.activate();
            this.updateCanOk();
        };
        Scene_Kigae.prototype.onOk2 = function () {
            this._actor.setCacheChanged();
            this._kigaeSlotWindow2.decide();
            this._kigaeSlotWindow2.refresh();
            this._kigaeActorWindow.refresh();
            this._kigaeSlotWindow2.activate();
        };
        Scene_Kigae.prototype.updateCanOk = function () {
            this._label1.visible = !this.isCanOk();
            this._kigaeCommandWindow.setCanOk(this.isCanOk());
        };
        Scene_Kigae.prototype.isCanOk = function () {
            if ($gameMedals.hasMedal(920)) {
                return true;
            }
            if (this._actor.outerId != 'a') {
                return true;
            }
            if (this._actor.outerTopId == 'h') {
                return true;
            }
            if (this._actor.outerTopId == 'i') {
                return true;
            }
            if (this._actor.outerBottomId == 'a' && this._actor.innerBottomId == 'a') {
                return false;
            }
            if (this._actor.outerTopId == 'a' && this._actor.innerTopId == 'a') {
                return false;
            }
            return true;
        };
        Scene_Kigae.prototype.onChange = function () {
            this._kigaeActorWindow.drawTexts('');
            var acceId = this._kigaeSlotWindow.acceId();
            var armor = this._kigaeSlotWindow.armor();
            if (acceId) {
                this._kigaeActorWindow.setNaked(2);
                if (armor.meta['ninshin']) {
                    var ero = $gameSystem.getEro(this._actor.actorId());
                    if (ero.ninshin < parseInt(armor.meta['ninshin'])) {
                        this._kigaeActorWindow.drawTexts('妊娠回数が%1回に達していないため装着できません'.format(armor.meta['ninshin']));
                    }
                }
                if (armor.meta['syusan']) {
                    var ero = $gameSystem.getEro(this._actor.actorId());
                    if (ero.syusan < parseInt(armor.meta['syusan'])) {
                        this._kigaeActorWindow.drawTexts('出産回数が%1回に達していないため装着できません'.format(armor.meta['syusan']));
                    }
                }
                return;
            }
            if (!this._kigaeSlotWindow.isEnabled(armor)) {
                var before = $dataArmors[parseInt(armor.meta['lock'])];
                if (this._kigaeSlotWindow.isLocked(armor)) {
                    this._kigaeActorWindow.drawTexts('%1の性癖を所持していないため、装着できません'.format(before.name));
                }
                else if (this._kigaeSlotWindow.isChinpoError(armor)) {
                    this._kigaeActorWindow.drawTexts('ふたなりちんぽと同時には装着できません');
                }
            }
            if (this.isNaked()) {
                this._kigaeActorWindow.setNaked(1);
                return;
            }
            else {
            }
            this._kigaeActorWindow.setNaked(0);
        };
        Scene_Kigae.prototype.isNaked = function () {
            var window = this._kigaeSlotWindow;
            if (window.outerId() || window.outerTopId() || window.outerBottomId()) {
                return false;
            }
            if (window.armId() || window.legId() || window.faceId()) {
                return false;
            }
            return true;
        };
        return Scene_Kigae;
    }(Scene_MenuBase));
    var Window_KigaeCommand = /** @class */ (function (_super) {
        __extends(Window_KigaeCommand, _super);
        function Window_KigaeCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._canOk = true;
            return _this;
        }
        Window_KigaeCommand.prototype.setCanOk = function (b) {
            if (this._canOk == b) {
                return;
            }
            this._canOk = b;
            this.refresh();
        };
        Window_KigaeCommand.prototype.makeCommandList = function () {
            this.addCommand('Costume', 'cos', true, null);
            this.addCommand('Face', 'face', true, null);
            this.addCommand('Confirm', 'ok', this._canOk, null);
        };
        return Window_KigaeCommand;
    }(Window_Command));
    var Window_KigaeSlot = /** @class */ (function (_super) {
        __extends(Window_KigaeSlot, _super);
        function Window_KigaeSlot(_type) {
            var _this = _super.call(this, new Rectangle(210, 20, 360, 726)) || this;
            _this._type = _type;
            return _this;
        }
        Window_KigaeSlot.prototype.initialize = function (rect) {
            _super.prototype.initialize.call(this, rect);
            this.initTexture();
            this.makeItemList();
            this.refresh();
            this.select(0);
            this.initMask();
        };
        Window_KigaeSlot.prototype.initMask = function () {
            var myMask = new PIXI.Graphics();
            myMask.beginFill(999, 1);
            var m = this.margin + 1;
            myMask.drawRect(0, this.y + this.margin + 6, 300, 706);
            myMask.endFill();
            this._windowContentsSprite.mask = myMask;
        };
        Window_KigaeSlot.prototype.update = function () {
            _super.prototype.update.call(this);
            this._windowContentsSprite.y = -this.scrollY() + this.scrollBaseY();
        };
        Window_KigaeSlot.prototype.initTexture = function () {
        };
        Window_KigaeSlot.prototype.refresh = function () {
            this._windowContentsSprite.destroyAndRemoveChildren();
            _super.prototype.refresh.call(this);
        };
        Window_KigaeSlot.prototype.drawAllItems = function () {
            this._windowContentsSprite.destroyAndRemoveChildren();
            _super.prototype.drawAllItems.call(this);
        };
        Window_KigaeSlot.prototype.setActor = function (actor) {
            this._actor = actor;
            this.makeItemList();
            this.refresh();
        };
        Window_KigaeSlot.prototype.makeItemList = function () {
            this._itemList = [];
            if (!this._actor) {
                return;
            }
            var armors = $gameParty.armors();
            for (var _i = 0, armors_1 = armors; _i < armors_1.length; _i++) {
                var armor = armors_1[_i];
                if (this._type == 'face') {
                    if (armor.meta['face']) {
                        this._itemList.push(armor);
                    }
                    if (armor.meta['hoppe']) {
                        this._itemList.push(armor);
                    }
                    continue;
                }
                if (parseInt(armor.meta['acce']) > 0) {
                    this._itemList.push(armor);
                }
                if (armor.meta['outer']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['pose']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['innerTop']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['innerBottom']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['outerTop']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['outerBottom']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['arm']) {
                    this._itemList.push(armor);
                }
                if (armor.meta['leg']) {
                    this._itemList.push(armor);
                }
            }
            this._itemList = this._itemList.sort(function (a, b) {
                if (a.meta['acce'] && !b.meta['acce']) {
                    return 1;
                }
                if (!a.meta['acce'] && b.meta['acce']) {
                    return -1;
                }
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
        };
        Window_KigaeSlot.prototype.maxItems = function () {
            if (!this._itemList) {
                return 0;
            }
            return this._itemList.length;
        };
        Window_KigaeSlot.prototype.drawItem = function (index) {
            var armor = this._itemList[index];
            var rect = this.itemRect(index);
            if (!this._actor) {
                return;
            }
            this.changePaintOpacity(this.isEnabled(armor));
            rect.x += 40;
            var acceIndex = parseInt(armor.meta['acce']);
            if (acceIndex > 0) {
                this.drawTextEx('\\C[0]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.acceMap[armor.id]) {
                    this.drawEquip(rect.y);
                }
            }
            var ero = $gameSystem.getEro(this._actor.actorId());
            var outerId = armor.meta['outer'];
            if (outerId) {
                this.drawTextEx('\\C[24]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.outerId == outerId) {
                    this.drawEquip(rect.y);
                }
            }
            var outerTopId = armor.meta['outerTop'];
            if (outerTopId) {
                this.drawTextEx('\\C[23]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.outerTopId == outerTopId) {
                    this.drawEquip(rect.y);
                }
            }
            var outerBottomId = armor.meta['outerBottom'];
            if (outerBottomId) {
                this.drawTextEx('\\C[24]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.outerBottomId == outerBottomId) {
                    this.drawEquip(rect.y);
                }
            }
            var faceId = parseInt(armor.meta['face']);
            if (faceId) {
                this.drawTextEx('\\C[6]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.defaultFaceId == faceId) {
                    this.drawEquip(rect.y);
                }
            }
            var armId = armor.meta['arm'];
            if (armId) {
                this.drawTextEx('\\C[6]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.armId == armId) {
                    this.drawEquip(rect.y);
                }
            }
            var legId = armor.meta['leg'];
            if (legId) {
                this.drawTextEx('\\C[5]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.legId == legId) {
                    this.drawEquip(rect.y);
                }
            }
            var poseId = parseInt(armor.meta['pose']);
            if (poseId) {
                this.drawTextEx('\\C[12]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.defaultPoseId == poseId) {
                    this.drawEquip(rect.y);
                }
            }
            var hoppeId = parseInt(armor.meta['hoppe']);
            if (hoppeId) {
                this.drawTextEx('\\C[12]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.defaultHoppeId == hoppeId) {
                    this.drawEquip(rect.y);
                }
            }
            var innerTopId = armor.meta['innerTop'];
            if (ero.bote && armor.meta['innerTopBote']) {
                innerTopId = armor.meta['innerTopBote'];
            }
            if (innerTopId) {
                this.drawTextEx('\\C[14]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.innerTopId == innerTopId) {
                    this.drawEquip(rect.y);
                }
            }
            var innerBottomId = armor.meta['innerBottom'];
            if (ero.bote && armor.meta['innerBottomBote']) {
                innerBottomId = armor.meta['innerBottomBote'];
            }
            if (innerBottomId) {
                this.drawTextEx('\\C[14]' + armor.name + '\\C[0]', rect.x, rect.y, 200);
                if (this._actor.innerBottomId == innerBottomId) {
                    this.drawEquip(rect.y);
                }
            }
        };
        Window_KigaeSlot.prototype.drawEquip = function (y) {
            var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 36, 66, 36));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = 16;
            sprite.y = y + 14;
            this._windowContentsSprite.addChild(sprite);
        };
        Window_KigaeSlot.prototype.getBaseTexture = function () {
            var baseTexture = PIXI.utils.BaseTextureCache['system/skill_tree'];
            if (!baseTexture) {
                var bitmap = ImageManager.loadSystem('skill_tree');
                if (!bitmap.isReady()) {
                    return;
                }
                baseTexture = new PIXI.BaseTexture(bitmap._image);
                baseTexture.resource.url = 'system/skill_tree';
                PIXI.utils.BaseTextureCache['system/skill_tree'] = baseTexture;
            }
            return baseTexture;
        };
        Window_KigaeSlot.prototype.isEnabled = function (armor) {
            if (this.isLocked(armor)) {
                return false;
            }
            if (this.isChinpoError(armor)) {
                return false;
            }
            return true;
        };
        Window_KigaeSlot.prototype.isChinpoError = function (armor) {
            if (!armor.meta['chinpo']) {
                return false;
            }
            return $gameActors.mainActor().hasAcce(221);
        };
        Window_KigaeSlot.prototype.isLocked = function (armor) {
            if (!armor.meta['lock']) {
                return false;
            }
            var target = parseInt(armor.meta['lock']);
            return !$gameParty.hasItem($dataArmors[target]);
        };
        Window_KigaeSlot.prototype.decide = function () {
            var armor = this._itemList[this.index()];
            if (!this.isEnabled(armor)) {
                SoundManager.playBuzzer();
                return;
            }
            var group = parseInt(armor.meta['group']);
            var acceId = parseInt(armor.meta['acce']);
            if (acceId > 0) {
                if (armor.meta['ninshin']) {
                    var ero = $gameSystem.getEro(this._actor.actorId());
                    var ero = $gameSystem.getEro(this._actor.actorId());
                    if (ero.ninshin < parseInt(armor.meta['ninshin'])) {
                        return;
                    }
                }
                if (armor.meta['syusan']) {
                    var ero = $gameSystem.getEro(this._actor.actorId());
                    var ero = $gameSystem.getEro(this._actor.actorId());
                    if (ero.syusan < parseInt(armor.meta['syusan'])) {
                        return;
                    }
                }
                if (acceId == 21) {
                    this._actor.removeChinpoCos();
                }
            }
            if (group > 0) {
                this._actor.removeGroup(group, armor.id);
                return;
            }
            if (acceId > 0) {
                this._actor.acceMap[armor.id] = !this._actor.acceMap[armor.id];
            }
            var outerId = armor.meta['outer'];
            var ero = $gameSystem.getEro(this._actor.actorId());
            if (outerId) {
                this._actor.setOuterId(outerId);
            }
            var outerTopId = armor.meta['outerTop'];
            if (outerTopId) {
                this._actor.setOuterId('a');
                this._actor.setOuterTopId(outerTopId);
            }
            var outerBottomId = armor.meta['outerBottom'];
            if (outerBottomId) {
                this._actor.setOuterId('a');
                this._actor.setOuterBottomId(outerBottomId);
            }
            var faceId = parseInt(armor.meta['face']);
            if (faceId > 0) {
                this._actor.setDefaultFaceId(faceId);
            }
            var hoppeId = parseInt(armor.meta['hoppe']);
            if (hoppeId >= 0) {
                this._actor.setDefaultHoppeId(hoppeId);
                this._actor.resetFace();
            }
            var poseId = parseInt(armor.meta['pose']);
            if (poseId > 0) {
                this._actor.defaultPoseId = poseId;
            }
            var innerTopId = armor.meta['innerTop'];
            if (ero.bote && armor.meta['innerTopBote']) {
                innerTopId = armor.meta['innerTopBote'];
            }
            if (innerTopId) {
                this._actor.setInnerTopId(innerTopId);
            }
            var innerBottomId = armor.meta['innerBottom'];
            if (ero.bote && armor.meta['innerBottomBote']) {
                innerBottomId = armor.meta['innerBottomBote'];
            }
            if (innerBottomId) {
                this._actor.setInnerBottomId(innerBottomId);
            }
            var armId = armor.meta['arm'];
            if (armId) {
                this._actor.setArmId(armId);
            }
            var legId = armor.meta['leg'];
            if (legId) {
                this._actor.setLegId(legId);
            }
        };
        Window_KigaeSlot.prototype.armor = function () {
            return this._itemList[this.index()];
        };
        Window_KigaeSlot.prototype.outerId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['outer'];
        };
        Window_KigaeSlot.prototype.outerTopId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['outerTop'];
        };
        Window_KigaeSlot.prototype.outerBottomId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['outerBottom'];
        };
        Window_KigaeSlot.prototype.armId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['arm'];
        };
        Window_KigaeSlot.prototype.legId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['leg'];
        };
        Window_KigaeSlot.prototype.acceId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['acce'];
        };
        Window_KigaeSlot.prototype.faceId = function () {
            var armor = this._itemList[this.index()];
            return armor.meta['face'];
        };
        Window_KigaeSlot.prototype.playOkSound = function () {
            SoundManager.playCursor();
        };
        return Window_KigaeSlot;
    }(Window_Selectable));
    var Window_KigaeActor = /** @class */ (function (_super) {
        __extends(Window_KigaeActor, _super);
        function Window_KigaeActor() {
            var _this = _super.call(this, new Rectangle(570, 0, 800, 768)) || this;
            _this.opacity = 0;
            return _this;
        }
        Window_KigaeActor.prototype.setActor = function (actor) {
            this._actor = actor;
            this.refresh();
        };
        Window_KigaeActor.prototype.setNaked = function (b) {
            var changed = this._actor.setNaked(b);
            if (changed) {
                this.refresh();
            }
        };
        Window_KigaeActor.prototype.setNoInner = function (b) {
            if (this._noInner != b) {
                this._noInner = b;
                this._actor.setCacheChanged();
                this.refresh();
            }
        };
        Window_KigaeActor.prototype.refresh = function () {
            this.contents.clear();
            this._windowContentsSprite.destroyAndRemoveChildren();
            //var actor = JsonEx.makeDeepCopy(this._actor);
            var actor = this._actor;
            if (this._noInner) {
                actor.setInnerTopId('a');
                actor.setInnerBottomId('a');
            }
            actor.setPoseId(actor.defaultPoseId);
            this.drawTachieActor(actor, this._windowContentsSprite, 40, 50, null, actor.defaultFaceId, 1, false);
        };
        Window_KigaeActor.prototype.drawTexts = function (text) {
            this.contents.clearRect(40, 10, 580, 30);
            this.changeTextColor(ColorManager.textColor(2));
            this.drawText(text, 40, 10, 580, 'left');
        };
        return Window_KigaeActor;
    }(Window_Base));
})(Nore || (Nore = {}));
