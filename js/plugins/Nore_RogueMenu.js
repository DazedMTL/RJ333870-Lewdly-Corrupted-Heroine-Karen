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
 */
var Nore;
(function (Nore) {
    Scene_Map.prototype.callMenu = function () {
        if (this._windowBackLog) {
            return;
        }
        if ($gameMap.isRogue()) {
            if ($gamePlayer.isDefeat()) {
                this.menuCalling = false;
                return;
            }
            if (!(Nore.phaseManager.phase() instanceof Nore.PlayerInputRogueState)) {
                this.menuCalling = false;
                return;
            }
        }
        SoundManager.playOk();
        SceneManager.push(Scene_MenuRogue);
        Window_MenuCommand.initCommandPosition();
        $gameTemp.clearDestination();
        this._waitCount = 2;
        Nore.$gameMessageRogue.hidden = true;
    };
    var _SceneManager_snapForBackground = SceneManager.snapForBackground;
    SceneManager.snapForBackground = function () {
        if (SceneManager._scene._spriteset) {
            SceneManager._scene._spriteset._rightTachie.visible = false;
            SceneManager._scene._mapNameWindow.hide();
            SceneManager._scene._spriteset._enemyInfoWindow.hide();
            SceneManager._scene._spriteset._pictureContainer.visible = false;
        }
        _SceneManager_snapForBackground.call(this);
    };
    var Scene_MenuRogue = /** @class */ (function (_super) {
        __extends(Scene_MenuRogue, _super);
        function Scene_MenuRogue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_MenuRogue.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createCommandWindow();
            this.createStatusWindow();
            this.createRightTachie();
            $gameSwitches.setValue(62, false);
            $gameSwitches.setValue(64, true);
        };
        Scene_MenuRogue.prototype.createRightTachie = function () {
            this._rightTachie = new Nore.Sprite_RightTachie();
            this.addChild(this._rightTachie);
        };
        Scene_MenuRogue.prototype.start = function () {
            if (this.isPowerUpTuto()) {
                this.popScene();
                return;
            }
            Scene_MenuBase.prototype.start.call(this);
            this._statusWindow.refresh();
        };
        Scene_MenuRogue.prototype.isPowerUpTuto = function () {
            if ($gameVariables.value(4) >= 2) {
                return false;
            }
            if (!$gameSwitches.value(120)) {
                if ($gameSwitches.value(21)) {
                    if ($gameSwitches.value(23)) {
                        return true;
                    }
                }
            }
            return false;
        };
        Scene_MenuRogue.prototype.createStatusWindow = function () {
            var rect = this.statusWindowRect();
            this._statusWindow = new Window_SimpleStatus(rect);
            this.addWindow(this._statusWindow);
            rect.x += rect.width + 10;
            rect.width = 370;
            this._questWindow = new Window_SimpleQuest(rect);
            this._questWindow.refresh();
            this.addWindow(this._questWindow);
        };
        ;
        Scene_MenuRogue.prototype.statusWindowRect = function () {
            var ww = 500;
            var wh = 220;
            var wx = 100;
            var wy = 530;
            return new Rectangle(wx, wy, ww, wh);
        };
        ;
        Scene_MenuRogue.prototype.createCommandWindow = function () {
            var rect = this.commandWindowRect();
            var commandWindow = new Window_MenuCommand(rect);
            commandWindow.setHandler("item", this.commandItem.bind(this));
            commandWindow.setHandler("item2", this.commandItem2.bind(this));
            commandWindow.setHandler("skill", this.commandSkill.bind(this));
            commandWindow.setHandler("status", this.commandStatus.bind(this));
            commandWindow.setHandler("foot", this.commandFoot.bind(this));
            commandWindow.setHandler("medal", this.commandMedal.bind(this));
            commandWindow.setHandler("powerup", this.commandPowerup.bind(this));
            commandWindow.setHandler("history", this.commandHistory.bind(this));
            commandWindow.setHandler("options", this.commandOptions.bind(this));
            commandWindow.setHandler("save", this.commandSave.bind(this));
            commandWindow.setHandler("cancel", this.popScene.bind(this));
            commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
            this.addWindow(commandWindow);
            this._commandWindow = commandWindow;
        };
        Scene_MenuRogue.prototype.commandMedal = function () {
            SceneManager.push(Nore.Scene_Medal);
        };
        Scene_MenuRogue.prototype.commandItem = function () {
            $gameTemp.footItemSeledted = false;
            SceneManager.push(Scene_ItemRogue);
        };
        Scene_MenuRogue.prototype.commandItem2 = function () {
            $gameTemp.footItemSeledted = false;
            SceneManager.push(Scene_ItemRogue2);
        };
        Scene_MenuRogue.prototype.commandSkill = function () {
            $gameTemp.phase = 'skill';
            SceneManager.pop();
            //SceneManager.push(Scene_SkillRogue);
        };
        Scene_MenuRogue.prototype.commandStatus = function () {
            SceneManager.push(Nore.Scene_EroStatus);
        };
        Scene_MenuRogue.prototype.commandEquip = function () {
            SceneManager.push(Scene_Equip);
        };
        Scene_MenuRogue.prototype.commandOptions = function () {
            SceneManager.push(Scene_Options);
        };
        Scene_MenuRogue.prototype.commandSave = function () {
            SceneManager.push(Scene_Save);
        };
        Scene_MenuRogue.prototype.commandPowerup = function () {
            //$gameSwitches.setValue(23, true);
            //SceneManager.pop();
            $gameTemp.upgradeType = UpGrade.KAREN;
            SceneManager.push(Nore.Scene_Upgrade);
        };
        Scene_MenuRogue.prototype.commandHistory = function () {
            SceneManager.push(Nore.Scene_History);
        };
        Scene_MenuRogue.prototype.commandGameEnd = function () {
            SceneManager.push(Scene_GameEnd);
        };
        Scene_MenuRogue.prototype.commandWindowRect = function () {
            var ww = 180;
            var wh = 464;
            var wx = 100;
            var wy = 62;
            return new Rectangle(wx, wy, ww, wh);
        };
        ;
        Scene_MenuRogue.prototype.commandFoot = function () {
            if (Nore.EventArranger.isStair($gamePlayer.x, $gamePlayer.y)) {
                SceneManager.pop();
                $gameMap.eventsXy($gamePlayer.x, $gamePlayer.y)[0].start();
                //$gamePlayer.startMapEvent($gamePlayer.x, $gamePlayer.y, [1, 2], true);
            }
            else {
                $gameTemp.footItemSeledted = true;
                SceneManager.push(Scene_ItemRogue);
            }
        };
        Scene_MenuRogue.prototype.createGoldWindow = function () {
            var rect = this.goldWindowRect();
            this._goldWindow = new Window_Gold(rect);
            this.addWindow(this._goldWindow);
        };
        ;
        Scene_MenuRogue.prototype.goldWindowRect = function () {
            var ww = this.mainCommandWidth();
            var wh = this.calcWindowHeight(1, true);
            var wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
            var wy = this.mainAreaBottom() - wh;
            return new Rectangle(wx, wy, ww, wh);
        };
        ;
        return Scene_MenuRogue;
    }(Scene_MenuBase));
    Nore.Scene_MenuRogue = Scene_MenuRogue;
    Window_MenuCommand.prototype.addMainCommands = function () {
        var enabled = this.areMainCommandsEnabled();
        if (this.needsCommand("item")) {
            this.addCommand(TextManager.item, "item", enabled);
            this.addCommand(TextManager.keyItem, "item2", enabled);
        }
        if (this.needsCommand("skill")) {
            var e_1 = $gameActors.mainActor().hasAnySkill();
            this.addCommand(TextManager.skill, "skill", e_1);
        }
        if (this.needsCommand("equip")) {
            this.addCommand(TextManager.equip, "equip", enabled);
        }
        if (this.needsCommand("status")) {
            this.addCommand(TextManager.status, "status", enabled);
        }
        this.addCommand(TextManager.medal, "medal", true);
        this.showTutorialArrow();
    };
    Window_MenuCommand.prototype.showTutorialArrow = function () {
        if ($gameVariables.value(10) == 211) {
            // 装備チュート
            this._arrow = new TutoArrow(10, 160);
            this._tutoSprite = this.drawLabel(10, 160, 10);
            this._tutoIndex = 0;
            this._tutoSpriteX = this._tutoSprite.x;
        }
        if ($gameSwitches.value(22) && !$gameSwitches.value(23)) {
            // パワーアップ
            this._arrow = new TutoArrow(0, 218);
            this.addChild(this._arrow);
        }
    };
    var _Window_MenuCommand_prototype_update = Window_MenuCommand.prototype.update;
    Window_MenuCommand.prototype.update = function () {
        _Window_MenuCommand_prototype_update.call(this);
        if (this._tutoSprite) {
            var xList = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1];
            this._tutoIndex++;
            var xx = xList[this._tutoIndex % xList.length];
            this._tutoSprite.x = this._tutoSpriteX + xx;
        }
    };
    var _Window_MenuCommand_prototype_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_prototype_addOriginalCommands.call(this);
        //this.addCommand('足元', "foot", EventArranger.hasFootEvent($gamePlayer.x, $gamePlayer.y));
        this.addCommand('Status', "status", true);
        this.addCommand('Enhance', "powerup", $gameSwitches.value(22));
        this.addCommand('Record', "history", $gameSwitches.value(22));
    };
    var _Window_MenuCommand_prototype_isSaveEnabled = Window_MenuCommand.prototype.isSaveEnabled;
    Window_MenuCommand.prototype.isSaveEnabled = function () {
        if ($gameTemp.isPlaytest()) {
            return true;
        }
        return _Window_MenuCommand_prototype_isSaveEnabled.call(this);
    };
    var Window_SimpleStatus = /** @class */ (function (_super) {
        __extends(Window_SimpleStatus, _super);
        function Window_SimpleStatus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_SimpleStatus.prototype.refresh = function () {
            this.contents.clear();
            this.contents.fontSize = 24;
            this.drawMedal();
            this.drawWeapon();
            //this.drawGuildRank();
        };
        Window_SimpleStatus.prototype.drawMedal = function () {
            var y = 5;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText('Nickname: ', 20, y, 200, 'left');
            this.changeTextColor(ColorManager.normalColor());
            this.drawText($gameVariables.value(99), 155, y, 260, 'left');
        };
        Window_SimpleStatus.prototype.resetFontSettings = function () {
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = 24;
            this.contents.fontBold = false;
            this.resetTextColor();
        };
        Window_SimpleStatus.prototype.drawWeapon = function () {
            var actor = $gameActors.mainActor();
            var y = 50;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.param(2), 20, y, 200, 'left');
            this.changeTextColor(ColorManager.crisisColor());
            this.drawText(actor.atk, 30, y, 100, "right");
            var weapon = actor.equips()[0];
            var textX = 188;
            if (weapon) {
                this.drawIcon(weapon.iconIndex(), 155, y);
                this.drawTextEx(weapon.name(), textX, y, 200);
            }
            this.changeTextColor(ColorManager.normalColor());
            y += 35;
            this.contents.fontSize = 24;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.param(3), 20, y, 200, 'left');
            this.changeTextColor(ColorManager.crisisColor());
            this.drawText(actor.def, 30, y, 100, "right");
            var armor = actor.equips()[2];
            if (armor) {
                this.drawIcon(armor.iconIndex(), 155, y);
                this.drawTextEx(armor.name(), textX, y, 200);
            }
            var armor2 = actor.equips()[5];
            y += 35;
            if (armor2) {
                this.drawIcon(armor2.iconIndex(), 155, y);
                this.drawTextEx(armor2.name(), textX, y, 200);
            }
            var armor3 = actor.equips()[4];
            y += 40;
            if (armor3) {
                this.drawIcon(armor3.iconIndex(), 155, y);
                this.drawTextEx(armor3.name(), textX, y, 200);
            }
        };
        return Window_SimpleStatus;
    }(Window_Base));
    var Window_SimpleQuest = /** @class */ (function (_super) {
        __extends(Window_SimpleQuest, _super);
        function Window_SimpleQuest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_SimpleQuest.prototype.refresh = function () {
            this.contents.clear();
            this.contents.fontSize = 24;
            this.drawTitle();
            this.drawQuests();
        };
        Window_SimpleQuest.prototype.drawTitle = function () {
            var y = 0;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText('Quest in Progress', 20, y, 200, 'left');
        };
        Window_SimpleQuest.prototype.resetFontSettings = function () {
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = 24;
            this.contents.fontBold = false;
            this.resetTextColor();
        };
        Window_SimpleQuest.prototype.drawQuests = function () {
            var actor = $gameActors.mainActor();
            var y = 42;
            var textX = 18;
            var clearList = $gameSystem.questManager().clearList();
            for (var _i = 0, clearList_1 = clearList; _i < clearList_1.length; _i++) {
                var q = clearList_1[_i];
                var item = q.item();
                if ($gameSystem.questManager().isGetReward(q)) {
                    continue;
                }
                this.changeTextColor(ColorManager.normalColor());
                this.drawText(item.name, textX, y, 220, 'left');
                this.changeTextColor(ColorManager.crisisColor());
                this.drawText('Report', textX + 215, y, 110, 'right');
                y += 31;
            }
            var list = $gameSystem.questManager().list();
            for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
                var q = list_1[_a];
                var item = q.item();
                this.changeTextColor(ColorManager.normalColor());
                this.drawText(item.name, textX, y, 220, 'left');
                var border = item.meta['border'];
                if (border) {
                    this.drawText(q._progress + '/' + border, textX, y, 310, 'right');
                }
                y += 31;
            }
        };
        return Window_SimpleQuest;
    }(Window_Base));
    var Scene_ItemRogueBase = /** @class */ (function (_super) {
        __extends(Scene_ItemRogueBase, _super);
        function Scene_ItemRogueBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_ItemRogueBase.prototype.create = function () {
            Scene_ItemBase.prototype.create.call(this);
            $gameSwitches.setValue(62, false);
            $gameSwitches.setValue(64, true);
        };
        Scene_ItemRogueBase.prototype.itemWindowRect = function () {
            var wx = 180;
            var wy = 186;
            var ww = 750;
            var wh = 475;
            return new Rectangle(wx, wy, ww, wh);
        };
        Scene_ItemRogueBase.prototype.helpWindowRect = function () {
            var wx = 180;
            var wy = 65;
            var ww = 750;
            var wh = 120;
            return new Rectangle(wx, wy, ww, wh);
        };
        ;
        return Scene_ItemRogueBase;
    }(Scene_ItemBase));
    var ItemCommand;
    (function (ItemCommand) {
        ItemCommand["equip"] = "equip";
        ItemCommand["discardWeapon"] = "discardWeapon";
        ItemCommand["discardArmor"] = "discardArmor";
        ItemCommand["drink"] = "drink";
        ItemCommand["use"] = "use";
        ItemCommand["throw"] = "throw";
        ItemCommand["pickup"] = "pickup";
        ItemCommand["read"] = "read";
        ItemCommand["swing"] = "swing";
        ItemCommand["putIn"] = "putIn";
        ItemCommand["put"] = "put";
        ItemCommand["rope"] = "rope";
    })(ItemCommand = Nore.ItemCommand || (Nore.ItemCommand = {}));
    function findCommand(str) {
        switch (str) {
            case 'equip': return ItemCommand.equip;
            case 'discardWeapon': return ItemCommand.discardWeapon;
            case 'discardArmor': return ItemCommand.discardArmor;
            case 'drink': return ItemCommand.drink;
            case 'use': return ItemCommand.use;
            case 'throw': return ItemCommand.throw;
            case 'pickup': return ItemCommand.pickup;
            case 'read': return ItemCommand.read;
            case 'swing': return ItemCommand.swing;
            case 'put': return ItemCommand.put;
            case 'putIn': return ItemCommand.putIn;
            case 'rope': return ItemCommand.rope;
        }
    }
    var Scene_ItemRogue2 = /** @class */ (function (_super) {
        __extends(Scene_ItemRogue2, _super);
        function Scene_ItemRogue2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_ItemRogue2.prototype.create = function () {
            _super.prototype.create.call(this);
            //this._footItem = $gameMap.itemAt($gamePlayer.x, $gamePlayer.y);
            this.createHelpWindow();
            this.createHelpBoxWindow();
            this.createItemWindow();
        };
        Scene_ItemRogue2.prototype.createHelpBoxWindow = function () {
            this._boxHelpWindow = new Window_BoxHelp(this.helpWindowRect());
            this.addWindow(this._boxHelpWindow);
        };
        Scene_ItemRogue2.prototype.categoryWindowRect = function () {
            var wx = 0;
            var wy = this.mainAreaTop();
            var ww = Graphics.boxWidth;
            var wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        Scene_ItemRogue2.prototype.footWindowRect = function () {
            var wx = 20;
            var wy = 640;
            var ww = 350;
            var wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        Scene_ItemRogue2.prototype.createItemWindow = function () {
            var rect = this.itemWindowRect();
            rect.height += 80;
            this._itemWindow = new Nore.Window_ItemList2(rect, true);
            this._itemWindow.setBoxHelpWindow(this._boxHelpWindow);
            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
            this._itemWindow.activate();
            this._itemWindow.select(0);
            this.addWindow(this._itemWindow);
        };
        Scene_ItemRogue2.prototype.user = function () {
            var members = $gameParty.movableMembers();
            var bestPha = Math.max.apply(Math, members.map(function (member) { return member.pha; }));
            return members.find(function (member) { return member.pha === bestPha; });
        };
        ;
        Scene_ItemRogue2.prototype.onItemOk = function () {
            var item = this._itemWindow.item();
            var useItem = this._itemWindow.useItem();
            if (useItem) {
                this.onSelectTargetItem(item, useItem);
                return;
            }
            this._boxHelpWindow.hide();
            this._commandWindow.setItem(item);
            this._commandWindow.show();
            this._commandWindow.activate();
            //$gameParty.setLastItem(this.item());
            //this.determineItem();
        };
        Scene_ItemRogue2.prototype.onSelectTargetItem = function (toItem, targetItem) {
            $gameTemp.targetItem = this._commandWindow.item();
            $gameTemp.toItem = toItem;
            $gameTemp.command = findCommand(this._commandWindow.currentSymbol());
            this.popScene();
            this.popScene();
        };
        Scene_ItemRogue2.prototype.onItemSelect = function () {
            $gameTemp.targetItem = this._commandWindow.item();
            $gameTemp.command = findCommand(this._commandWindow.currentSymbol());
            $gameTemp.toItem = null;
            this.popScene();
            this.popScene();
        };
        Scene_ItemRogue2.prototype.onItemCancel = function () {
            if (this._itemWindow.useItem()) {
                this._itemWindow.clearTarget();
                this._labe2.hide();
                this._itemWindow.activate();
                this._commandWindow.deactivate();
                return;
            }
            this.popScene();
        };
        Scene_ItemRogue2.prototype.playSeForItem = function () {
            SoundManager.playUseItem();
        };
        Scene_ItemRogue2.prototype.useItem = function () {
            Scene_ItemBase.prototype.useItem.call(this);
            this._itemWindow.redrawCurrentItem();
        };
        return Scene_ItemRogue2;
    }(Scene_ItemRogueBase));
    var Scene_ItemRogue = /** @class */ (function (_super) {
        __extends(Scene_ItemRogue, _super);
        function Scene_ItemRogue() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene_ItemRogue.prototype.create = function () {
            _super.prototype.create.call(this);
            //this._footItem = $gameMap.itemAt($gamePlayer.x, $gamePlayer.y);
            this.createHelpWindow();
            this.createHelpBoxWindow();
            this.createItemWindow();
            this.createFootWindow();
            this.createActorWindow();
            this.createCommandWindow();
            this.createLabel();
            this._footWindow.setItemWindow(this._itemWindow);
            this._itemWindow.setFootWindow(this._footWindow);
        };
        Scene_ItemRogue.prototype.createHelpBoxWindow = function () {
            this._boxHelpWindow = new Window_BoxHelp(this.helpWindowRect());
            this.addWindow(this._boxHelpWindow);
        };
        Scene_ItemRogue.prototype.categoryWindowRect = function () {
            var wx = 0;
            var wy = this.mainAreaTop();
            var ww = Graphics.boxWidth;
            var wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        Scene_ItemRogue.prototype.footWindowRect = function () {
            var wx = 20;
            var wy = 640;
            var ww = 350;
            var wh = this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        };
        Scene_ItemRogue.prototype.createFootWindow = function () {
            var rect = this.footWindowRect();
            this._footWindow = new Window_FootItem(rect);
            this._footWindow.setHelpWindow(this._helpWindow);
            this._footWindow.setHandler("ok", this.onFootItemOk.bind(this));
            this._footWindow.setHandler("cancel", this.onItemCancel.bind(this));
            this.addWindow(this._footWindow);
            if (this._footItem) {
                this._footWindow.setFootItem(this._footItem);
            }
            else {
                this._footWindow.hide();
            }
        };
        Scene_ItemRogue.prototype.createItemWindow = function () {
            var rect = this.itemWindowRect();
            this._itemWindow = new Nore.Window_ItemList2(rect);
            this._itemWindow.setBoxHelpWindow(this._boxHelpWindow);
            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
            this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
            this._itemWindow.activate();
            this._itemWindow.select(0);
            this.addWindow(this._itemWindow);
        };
        Scene_ItemRogue.prototype.createCommandWindow = function () {
            this._commandWindow = new Window_ItemCommand(new Rectangle(940, 350, 200, 170));
            this._commandWindow.setHandler('use', this.onItemOk.bind(this));
            this._commandWindow.setHandler(ItemCommand.equip, this.onItemSelect.bind(this));
            this._commandWindow.setHandler(ItemCommand.discardWeapon, this.onItemSelect.bind(this));
            this._commandWindow.setHandler(ItemCommand.discardArmor, this.onItemSelect.bind(this));
            this._commandWindow.setHandler(ItemCommand.throw, this.onItemSelect.bind(this));
            this._commandWindow.setHandler(ItemCommand.drink, this.onItemSelect.bind(this));
            this._commandWindow.setHandler(ItemCommand.put, this.onItemSelect.bind(this));
            this._commandWindow.setHandler(ItemCommand.putIn, this.onPutIn.bind(this));
            this._commandWindow.setHandler(ItemCommand.pickup, this.onItemSelect.bind(this));
            this._commandWindow.setHandler(ItemCommand.read, this.onRead.bind(this));
            this._commandWindow.setHandler(ItemCommand.swing, this.onItemSelect.bind(this));
            this._commandWindow.setHandler(ItemCommand.rope, this.onItemSelect.bind(this));
            this._commandWindow.setHandler('cancel', this.onCommandCancel.bind(this));
            if (this._footItem) {
                this._commandWindow.setFootItem(this._footItem.item());
            }
            this.addWindow(this._commandWindow);
            this._commandWindow.deactivate();
            this._commandWindow.hide();
        };
        Scene_ItemRogue.prototype.onRead = function () {
            var item = this._commandWindow.item();
            var action = new Game_Action($gameActors.actor(1));
            action.setItem(item.realItem().id);
            if (action.isForUser()) {
                this._itemWindow.selectTarget();
                this._commandWindow.hide();
                this._labe2.show();
            }
            else {
                this.onItemSelect();
            }
        };
        Scene_ItemRogue.prototype.onPutIn = function () {
            var item = this._commandWindow.item();
            var action = new Game_Action($gameActors.actor(1));
            action.setItem(item.realItem().id);
            this._itemWindow.selectTarget();
            this._commandWindow.hide();
            this._labe3.show();
        };
        Scene_ItemRogue.prototype.user = function () {
            var members = $gameParty.movableMembers();
            var bestPha = Math.max.apply(Math, members.map(function (member) { return member.pha; }));
            return members.find(function (member) { return member.pha === bestPha; });
        };
        ;
        Scene_ItemRogue.prototype.onItemOk = function () {
            var item = this._itemWindow.item();
            var useItem = this._itemWindow.useItem();
            if (useItem) {
                this.onSelectTargetItem(item, useItem);
                return;
            }
            this._boxHelpWindow.hide();
            this._commandWindow.setItem(item);
            this._commandWindow.show();
            this._commandWindow.activate();
            //$gameParty.setLastItem(this.item());
            //this.determineItem();
        };
        Scene_ItemRogue.prototype.onSelectTargetItem = function (toItem, targetItem) {
            $gameTemp.targetItem = this._commandWindow.item();
            $gameTemp.toItem = toItem;
            $gameTemp.command = findCommand(this._commandWindow.currentSymbol());
            this.popScene();
            this.popScene();
        };
        Scene_ItemRogue.prototype.onFootItemOk = function () {
            this._commandWindow.setItem(this._footItem.item());
            this._commandWindow.show();
            this._commandWindow.activate();
        };
        Scene_ItemRogue.prototype.onItemSelect = function () {
            $gameTemp.targetItem = this._commandWindow.item();
            $gameTemp.command = findCommand(this._commandWindow.currentSymbol());
            $gameTemp.toItem = null;
            this.popScene();
            this.popScene();
        };
        Scene_ItemRogue.prototype.onCommandCancel = function () {
            this._commandWindow.deactivate();
            this._commandWindow.hide();
            this._itemWindow.activate();
        };
        Scene_ItemRogue.prototype.onItemCancel = function () {
            if (this._itemWindow.useItem()) {
                this._itemWindow.clearTarget();
                this._labe2.hide();
                this._itemWindow.activate();
                this._commandWindow.deactivate();
                return;
            }
            this.popScene();
        };
        Scene_ItemRogue.prototype.playSeForItem = function () {
            SoundManager.playUseItem();
        };
        Scene_ItemRogue.prototype.useItem = function () {
            Scene_ItemBase.prototype.useItem.call(this);
            this._itemWindow.redrawCurrentItem();
        };
        Scene_ItemRogue.prototype.createLabel = function () {
            var label1 = new Window_Label('Shift→Sort', 580, 670);
            this.addWindow(label1);
            var labe2 = new Window_Label2('Which item do you use it for?', 180, 10);
            this.addWindow(labe2);
            this._labe2 = labe2;
            this._labe2.hide();
            var labe3 = new Window_Label2('Which item do you put in?', 180, 10);
            this.addWindow(labe3);
            this._labe3 = labe3;
            this._labe3.hide();
        };
        return Scene_ItemRogue;
    }(Scene_ItemRogueBase));
    var Window_BoxHelp = /** @class */ (function (_super) {
        __extends(Window_BoxHelp, _super);
        function Window_BoxHelp(r) {
            var _this = this;
            r.height = 284;
            r.y = 340;
            _this = _super.call(this, r) || this;
            return _this;
        }
        Window_BoxHelp.prototype.setText = function (text) {
            if (this._text !== text) {
                this._text = text;
                this.refresh();
            }
        };
        Window_BoxHelp.prototype.setItem = function (item) {
            this._item = item;
            this.refresh();
        };
        Window_BoxHelp.prototype.refresh = function () {
            if (!this._item) {
                return;
            }
            var rect = this.baseTextRect();
            this.contents.clear();
            //this.drawTextEx(this._item.item().description, rect.x, rect.y, rect.width);
            this.drawText('Box Contents', 0, 0, 400, 'center');
            var itemList = this._item.box().items();
            for (var i = 0; i < itemList.length; i++) {
                this.drawItem(i, itemList[i]);
            }
        };
        Window_BoxHelp.prototype.itemRect = function (index) {
            var maxCols = 1;
            var itemWidth = this.itemWidth();
            var itemHeight = this.itemHeight();
            var colSpacing = this.colSpacing();
            var rowSpacing = this.rowSpacing();
            var col = index % maxCols;
            var row = Math.floor(index / maxCols);
            var x = col * itemWidth + colSpacing / 2;
            var y = row * itemHeight + rowSpacing / 2 + 50;
            var width = itemWidth - colSpacing;
            var height = itemHeight - rowSpacing;
            return new Rectangle(x, y, width, height);
        };
        Window_BoxHelp.prototype.colSpacing = function () {
            return 16;
        };
        Window_BoxHelp.prototype.rowSpacing = function () {
            return 4;
        };
        ;
        Window_BoxHelp.prototype.itemRectWithPadding = function (index) {
            var rect = this.itemRect(index);
            var padding = this.itemPadding();
            rect.x += padding;
            rect.width -= padding * 2;
            return rect;
        };
        ;
        Window_BoxHelp.prototype.itemLineRect = function (index) {
            var rect = this.itemRectWithPadding(index);
            var padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding;
            rect.height -= padding * 2;
            return rect;
        };
        ;
        Window_BoxHelp.prototype.drawItem = function (index, rogueItem) {
            var item = rogueItem.item();
            var rect = this.itemLineRect(index);
            //this.changePaintOpacity(this.isEnabled(rogueItem));
            this.drawItemName(rogueItem, rect.x + 12, rect.y, rect.width);
            this.changePaintOpacity(true);
        };
        Window_BoxHelp.prototype.drawItemName = function (item, x, y, width) {
            if (item) {
                if (item.isIdentified()) {
                    if (item.isCursed) {
                        this.changeTextColor(ColorManager.cursedColor());
                    }
                    else {
                        this.changeTextColor(ColorManager.normalColor());
                    }
                }
                else {
                    this.changeTextColor(ColorManager.notIdentifiedColor());
                }
                var iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                var textMargin = ImageManager.iconWidth + 4;
                var itemWidth = Math.max(0, width - textMargin);
                this.drawIcon(item.iconIndex(), x, iconY);
                this.drawText(item.name(), x + textMargin, y, itemWidth, 'left');
                this.resetTextColor();
            }
        };
        return Window_BoxHelp;
    }(Window_Base));
    Nore.Window_BoxHelp = Window_BoxHelp;
    var Window_FootItem = /** @class */ (function (_super) {
        __extends(Window_FootItem, _super);
        function Window_FootItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_FootItem.prototype.setItemWindow = function (itemWindow) {
            this._itemWindow = itemWindow;
        };
        Window_FootItem.prototype.setHelpWindow = function (helpWindow) {
            this._helpWindow = helpWindow;
        };
        Window_FootItem.prototype.setBoxHelpWindow = function (boxHelpWindow) {
            this._boxHelpWindow = boxHelpWindow;
        };
        Window_FootItem.prototype.setFootItem = function (item) {
            this._item = item;
            this.refresh();
        };
        Window_FootItem.prototype.maxItems = function () {
            return 1;
        };
        Window_FootItem.prototype.drawItem = function (index) {
            var rogueItem = this._item.item();
            if (rogueItem) {
                var item = rogueItem.item();
                var rect = this.itemLineRect(index);
                this.drawItemName(rogueItem, rect.x + 12, rect.y, rect.width);
                if (rogueItem.isEquip()) {
                    if (this.actor().isEquipped(rogueItem)) {
                        this.drawText('E', rect.x - 8, rect.y, rect.width, 'left');
                    }
                }
            }
        };
        Window_FootItem.prototype.drawItemName = function (item, x, y, width) {
            if (item) {
                if (item.isIdentified()) {
                    if (item.isCursed) {
                        this.changeTextColor(ColorManager.cursedColor());
                    }
                    else {
                        this.changeTextColor(ColorManager.normalColor());
                    }
                }
                else {
                    this.changeTextColor(ColorManager.notIdentifiedColor());
                }
                var iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                var textMargin = ImageManager.iconWidth + 4;
                var itemWidth = Math.max(0, width - textMargin);
                this.drawIcon(item.iconIndex(), x, iconY);
                this.drawText(item.name(), x + textMargin, y, itemWidth);
                this.resetTextColor();
            }
        };
        Window_FootItem.prototype.updateHelp = function () {
            if (!this._boxHelpWindow || !this._helpWindow) {
                return;
            }
            if (this.active) {
                if (this._item) {
                    if (this._item.item() && this._item.item().isBox()) {
                        this._boxHelpWindow.setItem(this.item());
                        this._boxHelpWindow.show();
                        this._helpWindow.hide();
                    }
                    else {
                        this._helpWindow.setItem(this.item());
                        this._helpWindow.show();
                        this._boxHelpWindow.hide();
                    }
                }
            }
        };
        Window_FootItem.prototype.activate = function () {
            _super.prototype.activate.call(this);
        };
        Window_FootItem.prototype.select = function (index) {
            _super.prototype.select.call(this, index);
        };
        Window_FootItem.prototype.cursorDown = function (wrap) {
            if (this._itemWindow && this._itemWindow.visible) {
                this.select(-1);
                this.deactivate();
                this._itemWindow.select(0);
                this._itemWindow.activate();
                Input.update();
                return true;
            }
        };
        Window_FootItem.prototype.cursorUp = function (wrap) {
            if (this._itemWindow && this._itemWindow.visible) {
                this.select(-1);
                this.deactivate();
                this._itemWindow.select(Math.min(9, this._itemWindow.maxItems() - 1));
                this._itemWindow.activate();
                Input.update();
                return true;
            }
        };
        return Window_FootItem;
    }(Window_Selectable));
    Nore.Window_FootItem = Window_FootItem;
    var Window_ItemCommand = /** @class */ (function (_super) {
        __extends(Window_ItemCommand, _super);
        function Window_ItemCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Window_ItemCommand.prototype.setFootItem = function (item) {
            this._footItem = item;
        };
        Window_ItemCommand.prototype.setItem = function (item) {
            this._item = item;
            this.refresh();
        };
        Window_ItemCommand.prototype.item = function () {
            return this._item;
        };
        Window_ItemCommand.prototype.makeCommandList = function () {
            if (!this._item) {
                return;
            }
            var isRogue = $gameMap.isRogue();
            var isStay = this._item.isStay();
            if (this._item == this._footItem) {
                this.addCommand('Pick Up', ItemCommand.pickup, !$gameParty._inventory.isMax(), null);
            }
            else {
                if (this._item.isWeapon()) {
                    if (this.actor().isEquipped(this._item)) {
                        this.addCommand('Discard', ItemCommand.discardWeapon, true, null);
                    }
                    else {
                        this.addCommand('Equip', ItemCommand.equip, true, null);
                    }
                }
                if (this._item.isArmor() && !this._item.isEroItem()) {
                    if (this.actor().isEquipped(this._item)) {
                        this.addCommand('Discard', ItemCommand.discardArmor, true, null);
                    }
                    else {
                        this.addCommand('Equip', ItemCommand.equip, true, null);
                    }
                }
            }
            if (this._item.realItem().id == 38) {
                // 白旗
                this.addCommand('Use', ItemCommand.read, true, null);
                return;
            }
            var inRoom = $gamePlayer._room != null;
            if ($gamePlayer._room) {
                inRoom = $gamePlayer._room.enemyCount() > 0;
            }
            if (this._item.isPotion()) {
                this.addCommand('Drink', ItemCommand.drink, true, null);
            }
            if (this._item.isBox()) {
                this.addCommand('Insert', ItemCommand.putIn, !this._item.box().isMax(), null);
            }
            if (this._item.isScroll()) {
                this.addCommand('Read', ItemCommand.read, true, null);
            }
            if (this._item.isRod()) {
                this.addCommand('Swing', ItemCommand.swing, inRoom, null);
            }
            if (!this._item.isRope()) {
                this.addCommand('Throw', ItemCommand.throw, isRogue && !isStay && inRoom, null);
                if (this._item != this._footItem) {
                    this.addCommand('Place', ItemCommand.put, isRogue && !isStay, null);
                }
            }
            else {
                this.addCommand('Escape', ItemCommand.rope, isRogue, null);
            }
        };
        Window_ItemCommand.prototype.actor = function () {
            return $gameActors.actor(1);
        };
        return Window_ItemCommand;
    }(Window_Command));
    var Window_Label = /** @class */ (function (_super) {
        __extends(Window_Label, _super);
        function Window_Label(text, x, y) {
            var _this = _super.call(this, new Rectangle(x, y, 300, 60)) || this;
            _this.drawText(text, 0, 0, 300, 'left');
            _this.backOpacity = 0;
            return _this;
        }
        Window_Label.prototype._createFrameSprite = function () {
            this._frameSprite = new Sprite();
        };
        ;
        Window_Label.prototype._refreshFrame = function () {
        };
        return Window_Label;
    }(Window_Base));
    Nore.Window_Label = Window_Label;
    var Window_Label2 = /** @class */ (function (_super) {
        __extends(Window_Label2, _super);
        function Window_Label2(text, x, y) {
            var _this = _super.call(this, new Rectangle(x, y, 370, 60)) || this;
            _this.drawText(text, 2, 0, 370, 'left');
            return _this;
        }
        return Window_Label2;
    }(Window_Base));
    Nore.Window_Label2 = Window_Label2;
    var Window_Label3 = /** @class */ (function (_super) {
        __extends(Window_Label3, _super);
        function Window_Label3(text, x, y) {
            var _this = _super.call(this, new Rectangle(x, y, 570, 60)) || this;
            _this.changeTextColor(ColorManager.deathColor());
            _this.drawText(text, 2, 0, 570, 'left');
            return _this;
        }
        return Window_Label3;
    }(Window_Base));
    Nore.Window_Label3 = Window_Label3;
})(Nore || (Nore = {}));
;
