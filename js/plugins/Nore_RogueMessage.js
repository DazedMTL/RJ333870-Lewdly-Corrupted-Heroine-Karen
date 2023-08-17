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
var Game_MessageRogue = /** @class */ (function (_super) {
    __extends(Game_MessageRogue, _super);
    function Game_MessageRogue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Game_MessageRogue.prototype.add = function (t, isNewLine) {
        if (isNewLine === void 0) { isNewLine = true; }
        if (!t) {
            return;
        }
        /*for (const tt of t.split('\n')) {
            super.add(tt);
        }*/
        _super.prototype.add.call(this, t);
        this.hidden = false;
        this.isNewLine = isNewLine;
        if (Nore.BackLog) {
            Nore.BackLog.$gameBackLog.addLog('', t);
        }
    };
    Object.defineProperty(Game_MessageRogue.prototype, "isNewLine", {
        get: function () {
            return this._isNewLine;
        },
        set: function (b) {
            this._isNewLine = b;
        },
        enumerable: true,
        configurable: true
    });
    Game_MessageRogue.prototype.nextText = function () {
        return this._texts.shift();
    };
    ;
    return Game_MessageRogue;
}(Game_Message));
var Nore;
(function (Nore) {
    function hankaku2Zenkaku(str) {
        return (str + '').replace(/[A-Za-z0-9]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
        });
    }
    Nore.hankaku2Zenkaku = hankaku2Zenkaku;
    function makeEroDamageText(target, action) {
        var result = target.result();
        var damage = result.hpDamage;
        var isActor = target.isActor();
        var fmt;
        fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
        var attackMsg = '';
        if (action.item().message1) {
            attackMsg = action.item().message1.format('\\C[6]' + action.subject().name() + '\\C[0]', '\\C[6]' + target.name() + '\\C[0]');
        }
        return attackMsg;
    }
    Nore.makeEroDamageText = makeEroDamageText;
    ;
    function makeHpDamageText(target, action) {
        var result = target.result();
        var damage = result.hpDamage;
        var isActor = target.isActor();
        var fmt;
        if (result.mhpPlus > 0) {
            return "%1's maximum HP increased by %2!".format(target.name(), result.mhpPlus);
        }
        else if (damage > 0 && result.drain) {
            fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
            return action.item().message1.format('\\C[6]' + action.subject().name()) + '\\C[0]' + fmt.format(target.name(), TextManager.hp, damage, action.subject().name());
        }
        else if (damage > 0) {
            fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
            var attackMsg = '';
            if (action.item().message1) {
                attackMsg = action.item().message1.format('\\C[6]' + action.subject().name() + '\\C[0]', action.item().name) + '\n';
            }
            return attackMsg + fmt.format(target.name(), damage);
        }
        else if (damage < 0) {
            fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
            return fmt.format('\\C[6]' + target.name() + '\\C[0]', TextManager.hp, -damage);
        }
        else {
            //fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
            //return fmt.format(target.name());
        }
    }
    Nore.makeHpDamageText = makeHpDamageText;
    ;
    function makeMissText(target, action) {
        var isActor = target.isActor();
        var fmt = isActor ? TextManager.actorNoHit : TextManager.enemyNoHit;
        return action.item().message1.format(action.subject().name()) + '\n' + fmt.format(target.name());
    }
    Nore.makeMissText = makeMissText;
    function itemGetText(rogueItem) {
        var text = rogueItem.name();
        if (!rogueItem.isIdentified()) {
            text = '\\C[32]' + text + '\\C[0]';
        }
        return TextManager.obtainItem.format(text);
    }
    Nore.itemGetText = itemGetText;
    function arrowGetText(count) {
        return 'Obtained %1 arrows!'.format(count);
    }
    Nore.arrowGetText = arrowGetText;
    function cannotGetText(name) {
        return 'Unable to carry %1 due to full inventory.'.format(name);
    }
    Nore.cannotGetText = cannotGetText;
    function rideOnItemText(name) {
        return 'Riding on %1!'.format(name);
    }
    Nore.rideOnItemText = rideOnItemText;
    function makeDispelText() {
        return 'Curse on equipped weapons and armor has been lifted!';
    }
    Nore.makeDispelText = makeDispelText;
    function makeEquipWeaponText(item, lastAtk, newAtk) {
        var text = 'Equipped \\C[29]%1!\\C[0]'.format(item.name());
        if (item.isCursed) {
            text += makeCursedText(item);
        }
        else {
            text += '\n';
        }
        if (lastAtk < newAtk) {
            return text + makeUpAtkText(lastAtk, newAtk);
        }
        else if (lastAtk > newAtk) {
            return text + makeDownAtkText(lastAtk, newAtk);
        }
        else {
            return text + 'My attack power remained unchanged at %1!'.format(lastAtk);
        }
    }
    Nore.makeEquipWeaponText = makeEquipWeaponText;
    function makeEquipCursedArmorText(item) {
        return "However, due to my penis, I couldn't equip it!";
    }
    Nore.makeEquipCursedArmorText = makeEquipCursedArmorText;
    function makeEquipArmorText(item, lastAtk, newAtk, lastDef, newDef) {
        var text = 'Equipped \\C[3]%1\\C[0]!'.format(item.name());
        if (item.isCursed) {
            text += makeCursedText(item);
        }
        else {
            text += '\n';
        }
        if (lastAtk < newAtk) {
            text += makeUpAtkText(lastAtk, newAtk) + '\n';
        }
        else if (lastAtk > newAtk) {
            text += makeDownAtkText(lastAtk, newAtk) + '\n';
        }
        if (lastDef < newDef) {
            return text + 'Defense power increased from %1 to \\C[4]%2\\C[0]!'.format(hankaku2Zenkaku(lastDef), hankaku2Zenkaku(newDef));
        }
        else if (lastDef > newDef) {
            return text + 'Defense power decreased from %1 to \\C[2]%2\\C[0]!'.format(hankaku2Zenkaku(lastDef), hankaku2Zenkaku(newDef));
        }
        else {
            return text + 'Defense power remained unchanged at %1!'.format(lastDef);
        }
    }
    Nore.makeEquipArmorText = makeEquipArmorText;
    function makeUpAtkText(lastAtk, newAtk) {
        return 'Attack power increased from %1 to \\C[4]%2\\C[0]!'.format(hankaku2Zenkaku(lastAtk), hankaku2Zenkaku(newAtk));
    }
    function makeDownAtkText(lastAtk, newAtk) {
        return 'Attack power decreased from %1 to \\C[2]%2\\C[0]!'.format(hankaku2Zenkaku(lastAtk), hankaku2Zenkaku(newAtk));
    }
    function makeDownDefText(lastDef, newDef) {
        return 'Defense power decreased from %1 to \\C[4]%2\\C[0]!'.format(hankaku2Zenkaku(lastDef), hankaku2Zenkaku(newDef));
    }
    function makeDiscardEquipWeaponText(item, lastAtk, newAtk) {
        return 'Unequipped \\C[3]%1\\C[0]!\nAttack power decreased from %2 to \\C[2]%3\\C[0]!'.format(item.name(), hankaku2Zenkaku(lastAtk), hankaku2Zenkaku(newAtk));
    }
    Nore.makeDiscardEquipWeaponText = makeDiscardEquipWeaponText;
    function makeDiscardEquipArmorText(item, lastAtk, newAtk, lastDef, newDef) {
        var text = '\\C[3]%1\\C[0] Removed!\n'.format(item.name());
        if (lastDef > newDef) {
            return text + makeDownDefText(lastDef, newDef);
        }
        if (lastAtk > newAtk) {
            return text + makeDownAtkText(lastAtk, newAtk);
        }
        return text;
    }
    Nore.makeDiscardEquipArmorText = makeDiscardEquipArmorText;
    function makeCursedText(item) {
        return '　\\C[29]%1\\C[0] was cursed!\n'.format(item.name());
    }
    Nore.makeCursedText = makeCursedText;
    function makeCannotEquipWeaponText(item) {
        var text = 'You cannot change your equipment because \\C[3]%1\\C[0] is cursed.\n'.format(item.name());
        ;
        return text;
    }
    Nore.makeCannotEquipWeaponText = makeCannotEquipWeaponText;
    function makePutItemText(item) {
        var text = 'I placed C[3]%1\C[0] at my feet!\n'.format(item.name());
        return text;
    }
    Nore.makePutItemText = makePutItemText;
    function makeCannotDiscardEquipText(item) {
        var text = "\\C[3]%1\\C[0] can't be removed because it's cursed!\n".format(item.name());
        return text;
    }
    Nore.makeCannotDiscardEquipText = makeCannotDiscardEquipText;
    function makeDrinkText(rogueItem) {
        var text = rogueItem.name();
        if (!rogueItem.isIdentified()) {
            text = '\\C[32]' + text + '\\C[0]';
        }
        return 'Drank %1!'.format(text);
    }
    Nore.makeDrinkText = makeDrinkText;
    function makePutInText(boxItem, rogueItem) {
        var text = rogueItem.name();
        var box = boxItem.name();
        /*if (! rogueItem.isIdentified()) {
            text = '\\C[32]' + text + '\\C[0]';
        }*/
        return 'I put %2 into %1!'.format(box, text);
    }
    Nore.makePutInText = makePutInText;
    function makeReadText(rogueItem) {
        var text = rogueItem.name();
        if (rogueItem.realItem().id == 38) {
            return '%2 used %1!'.format(text, $gameActors.actor(1).name());
        }
        if (!rogueItem.isIdentified()) {
            text = '\\C[32]' + text + '\\C[0]';
        }
        return 'I read %1 %2!'.format(text, $gameActors.actor(1).name());
    }
    Nore.makeReadText = makeReadText;
    function makeIdentifyText(rogueItem) {
        var item1 = '\\C[32]' + rogueItem.name() + '\\C[0]';
        var item2 = rogueItem.identifiedName();
        return '%1 was %2!'.format(item1, item2);
    }
    Nore.makeIdentifyText = makeIdentifyText;
    function makeNoEffectText() {
        return 'But it had no effect!';
    }
    Nore.makeNoEffectText = makeNoEffectText;
    ;
    function makeNoEffectToIdentifyText() {
        return 'However, the target item has already been identified!';
    }
    Nore.makeNoEffectToIdentifyText = makeNoEffectToIdentifyText;
    ;
    function makePowerUpText(rogueItem) {
        var text = '\\C[3]%1\\C[0]\ has been enhanced!'.format(rogueItem.name(), rogueItem.plus);
        if (rogueItem.isCursed) {
            text += '\n\\C[3]%1\\C[0]\ curse has been lifted!'.format(rogueItem.name());
        }
        return text;
    }
    Nore.makePowerUpText = makePowerUpText;
    ;
    function makeSwingText(rogueItem) {
        return 'I shook %1!'.format(rogueItem.name());
    }
    Nore.makeSwingText = makeSwingText;
    ;
    function displayStateText(target, isNewLine) {
        if (isNewLine === void 0) { isNewLine = true; }
        var result = target.result();
        var states1 = result.addedStateObjects();
        for (var _i = 0, states1_1 = states1; _i < states1_1.length; _i++) {
            var state = states1_1[_i];
            var stateText = target.isActor() ? state.message1 : state.message2;
            Nore.$gameMessageRogue.add(stateText.format(target.name()), isNewLine);
        }
        var states2 = result.removedStateObjects();
        for (var _a = 0, states2_1 = states2; _a < states2_1.length; _a++) {
            var state = states2_1[_a];
            Nore.$gameMessageRogue.add(state.message4.format(target.name()), isNewLine);
        }
    }
    Nore.displayStateText = displayStateText;
    function displayCurrentState(subject) {
        var stateText = subject.mostImportantStateText();
        if (stateText) {
            p(stateText);
            Nore.$gameMessageRogue.add(stateText.format(subject.name()));
        }
    }
    Nore.displayCurrentState = displayCurrentState;
    function displayEnemyLevelUp(result) {
        if (!result.beforeEnemy && !result.afterEnemy) {
            return;
        }
        var beforeEnemy = $dataEnemies[result.beforeEnemy];
        var afterEnemy = $dataEnemies[result.afterEnemy];
        var text;
        if (parseInt(beforeEnemy.meta['rank']) < parseInt(afterEnemy.meta['rank'])) {
            text = '%1 has leveled up and become Lv %2!'.format(beforeEnemy.name, afterEnemy.name);
        }
        else {
            text = '%2 has leveled down and become Lv %2!'.format(beforeEnemy.name, afterEnemy.name);
        }
        Nore.$gameMessageRogue.add(text);
    }
    Nore.displayEnemyLevelUp = displayEnemyLevelUp;
    function displayActorLevelDown(level) {
        Nore.$gameMessageRogue.add('%1 has decreased in level and become Lv %2!'.format($gameActors.actor(1).name(), level));
    }
    Nore.displayActorLevelDown = displayActorLevelDown;
    var Window_MessageRogue = /** @class */ (function (_super) {
        __extends(Window_MessageRogue, _super);
        function Window_MessageRogue(r) {
            var _this = _super.call(this, r) || this;
            _this.startInput = function () {
                if (Nore.$gameMessageRogue.isChoice()) {
                    this._choiceListWindow.start();
                    return true;
                }
                else if (Nore.$gameMessageRogue.isNumberInput()) {
                    this._numberInputWindow.start();
                    return true;
                }
                else if (Nore.$gameMessageRogue.isItemChoice()) {
                    this._eventItemWindow.start();
                    return true;
                }
                else {
                    return false;
                }
            };
            _this.doesContinue = function () {
                return (Nore.$gameMessageRogue.hasText() &&
                    !Nore.$gameMessageRogue.scrollMode() &&
                    !this.areSettingsChanged());
            };
            _this.updateInput = function () {
                if (this.isAnySubWindowActive()) {
                    return true;
                }
                /*if (this.pause) {
                    Input.update();
                    this.pause = false;
                    if (!this._textState) {
                        this.terminateMessage();
                    }
                    return true;
                }*/
                return false;
            };
            _this._updatePauseSign = function () {
                this._pauseSignSprite.visible = false;
            };
            _this.frameVisible = false;
            _this._lastY = 0;
            _this._scrollX = 0;
            _this._scrollY = 0;
            _this._scrollBaseX = 0;
            _this._scrollBaseY = 0;
            _this._latestTexts = [];
            _this.clearScrollStatus();
            return _this;
        }
        Window_MessageRogue.prototype._createBackSprite = function () {
            this._backSprite = new Sprite();
            this._container.addChild(this._backSprite);
            var baseTexture = Nore.getSystemBaseTexture('messageWindow');
            var texture = new PIXI.Texture(baseTexture);
            var sprite = new PIXI.Sprite(texture);
            sprite.x = -0;
            sprite.y = -0;
            this._backSprite.addChild(sprite);
        };
        Window_MessageRogue.prototype._refreshBack = function () {
        };
        Window_MessageRogue.prototype.canStart = function () {
            return Nore.$gameMessageRogue.hasText() && !Nore.$gameMessageRogue.scrollMode();
        };
        Window_MessageRogue.prototype.contentsHeight = function () {
            return 600;
        };
        Window_MessageRogue.prototype.scrollBlockHeight = function () {
            return 600;
        };
        Window_MessageRogue.prototype.updateArrows = function () {
        };
        ;
        Window_MessageRogue.prototype.startMessage = function () {
            if (Nore.$gameMessageRogue.isNewLine) {
                Nore.$gameMessageRogue.isNewLine = false;
                this.visible = true;
                this._hiddenFrame = 0;
                this._visibleFrame = 0;
                this._lastY = 24;
                this._latestTexts = [];
                this.contents.clear();
            }
            var text = Nore.$gameMessageRogue.nextText();
            if (text) {
                this.visible = true;
                for (var _i = 0, _a = text.split('\n'); _i < _a.length; _i++) {
                    var tt = _a[_i];
                    this._latestTexts.push(tt);
                }
                if (this._isDefeat) {
                    while (this._latestTexts.length > 7) {
                        this._latestTexts.shift();
                    }
                }
                else {
                    while (this._latestTexts.length > 4) {
                        this._latestTexts.shift();
                    }
                }
            }
            if (this._lastY == 0) {
                this.contents.clear();
                this.scrollTo(0, 0);
            }
            if (this._isDefeat) {
                if (this._lastY >= this.height - 10) {
                    this.contents.clear();
                    this.scrollTo(0, 0);
                    var yy = 0;
                    for (var i = 0; i < 6; i++) {
                        this.drawTextEx(this._latestTexts[i], 4 + 36, yy);
                        yy += 30;
                    }
                    this._lastY = this.height - 40 - 30;
                }
            }
            else {
                if (this._lastY >= 90) {
                    this.contents.clear();
                    this.scrollTo(0, 0);
                    var yy = 30;
                    for (var i = 1; i < 3; i++) {
                        this.drawTextEx(this._latestTexts[i], 4 + 36, yy);
                        yy += 30;
                    }
                    this._lastY = 90;
                }
            }
            var textState = this.createTextState(text, 0, this._lastY, 0);
            textState.x = this.newLineX(textState);
            textState.startX = textState.x;
            this._textState = textState;
            this.newPage(this._textState);
            this.updatePlacement();
            this.updateBackground();
            this.open();
            this._nameBoxWindow.start();
            //$gameMessageRogue.clear();
        };
        Window_MessageRogue.prototype.updateMessage2 = function () {
            while (!this.isOpening() && !this.isClosing()) {
                if (this.updateWait()) {
                    //p('updateWait' + this._waitCount)
                    return;
                }
                else if (this.updateLoading()) {
                    //p('updateLoading')
                    return;
                }
                else if (this.updateInput()) {
                    //p('updateInput')
                    return;
                }
                else if (this.updateMessage()) {
                    //p('updateMessage')
                    return;
                }
                else if (this.canStart()) {
                    //p('startMessage')
                    this.startMessage();
                }
                else {
                    //p('startInput')
                    this.startInput();
                    return;
                }
            }
        };
        Window_MessageRogue.prototype.update = function () {
            if ($gameSwitches.value(17)) {
                this.visible = false;
                return;
            }
            if ($gameMessage.hasText()) {
                this.visible = false;
                return;
            }
            /*if (this._isDefeat) {
                this.x = 10;
            } else {
                this.x = 160;
            }*/
            this.checkDefeat();
            this.checkToNotClose();
            Window_Scrollable.prototype.update.call(this);
            this.updateMessage2();
            this.updateMessage2();
            if (Nore.$gameMessageRogue.hidden) {
                if (this._hiddenFrame == 0) {
                    if (this._visibleFrame > 40) {
                        this.visible = false;
                        this.scrollTo(0, 0);
                        return;
                    }
                    this._hiddenFrame = 40;
                }
                Nore.$gameMessageRogue.hidden = false;
            }
            else {
                this._visibleFrame++;
            }
            if (this._hiddenFrame > 0) {
                this._hiddenFrame--;
                if (this._hiddenFrame == 0) {
                    this.visible = false;
                    this.scrollTo(0, 0);
                }
            }
        };
        Window_MessageRogue.prototype.checkDefeat = function () {
            /*if ($gamePlayer.isDefeat() && ! this._isDefeat) {
                this.changeToDefeatWindow();
            }
            if (! $gamePlayer.isDefeat() && this._isDefeat) {
                this.contents.clear();
                this.visible = false;
                this.changeToNormalWindow();
            }*/
        };
        Window_MessageRogue.prototype.changeToDefeatWindow = function () {
            this.height = 260;
            this.width = Graphics.boxWidth - 650;
            this.y = Graphics.height - this._height;
            this._isDefeat = true;
        };
        Window_MessageRogue.prototype.changeToNormalWindow = function () {
            this.height = 146;
            this.width = Graphics.boxWidth - 600;
            this.y = Graphics.height - this._height;
            this._isDefeat = false;
        };
        Window_MessageRogue.prototype.updateMessage = function () {
            var textState = this._textState;
            if (textState) {
                if (this._isDefeat) {
                    if (textState.y > 30 * 6) {
                        this.scrollTo(0, textState.y - 30 * 6);
                    }
                }
                else {
                    if (textState.y > 36 * 2 - 14) {
                        this.scrollTo(0, textState.y - 36 * 2 - 14);
                    }
                }
                while (!this.isEndOfText(textState)) {
                    if (this.needsNewPage(textState)) {
                        this.newPage(textState);
                    }
                    this.updateShowFast();
                    this.processCharacter(textState);
                    if (this.shouldBreakHere(textState)) {
                        break;
                    }
                }
                this.flushTextState(textState);
                if (this.isEndOfText(textState)) {
                    this.onEndOfText();
                }
                return true;
            }
            else {
                return false;
            }
        };
        Window_MessageRogue.prototype.maxScrollY = function () {
            return 1000;
        };
        Window_MessageRogue.prototype.processNewLine = function (textState) {
            textState.x = textState.startX;
            textState.y += textState.height;
            //p(textState.y + '  ' + textState.height)
            if (this._isDefeat) {
                if (textState.y > 30 * 12) {
                    this.scrollTo(0, textState.y - 30 * 12);
                }
            }
            else {
                if (textState.y > 36 * 3) {
                    this.scrollTo(0, textState.y - 36 * 3);
                }
            }
            textState.height = this.calcTextHeight(textState);
        };
        ;
        Window_MessageRogue.prototype.onEndOfText = function () {
            if (!this.startInput()) {
                if (!this._pauseSkip) {
                    this.startPause();
                }
                else {
                    this.terminateMessage();
                }
            }
            this._lastY += this._textState.height * (this._textState.text.split('\n').length);
            this._textState = null;
        };
        ;
        Window_MessageRogue.prototype.newPage = function (textState) {
            //this._contentsSprite.y -= 50
            this.resetFontSettings();
            this.clearFlags();
            this.updateSpeakerName();
            this.loadMessageFace();
            if (textState.y == 0) {
                textState.y = 24;
            }
            textState.x = textState.startX;
            textState.height = this.calcTextHeight(textState);
        };
        Window_MessageRogue.prototype.processNewPage = function (textState) {
            if (textState.text[textState.index] === "\n") {
                textState.index++;
            }
            this.startPause();
        };
        ;
        Window_MessageRogue.prototype.resetFontSettings = function () {
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = $gameSystem.mainFontSize() - 4;
            this.resetTextColor();
        };
        ;
        Window_MessageRogue.prototype.newLineX = function (textState) {
            var faceExists = Nore.$gameMessageRogue.faceName() !== "";
            var faceWidth = ImageManager.faceWidth;
            var spacing = 20;
            var margin = faceExists ? faceWidth + spacing : 4;
            return (textState.rtl ? this.innerWidth - margin : margin) + 36;
        };
        ;
        Window_MessageRogue.prototype.updatePlacement = function () {
            var goldWindow = this._goldWindow;
            this._positionType = Nore.$gameMessageRogue.positionType();
            this.y = (this._positionType * (Graphics.boxHeight - this.height)) / 2;
            if (goldWindow) {
                goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - goldWindow.height;
            }
        };
        Window_MessageRogue.prototype.updateBackground = function () {
            this._background = Nore.$gameMessageRogue.background();
            this.setBackgroundType(this._background);
        };
        ;
        Window_MessageRogue.prototype.terminateMessage = function () {
            //this.close();
            this._goldWindow.close();
            Nore.$gameMessageRogue.clear();
        };
        Window_MessageRogue.prototype.lineHeight = function () {
            return 34;
        };
        Window_MessageRogue.prototype.areSettingsChanged = function () {
            return (this._background !== Nore.$gameMessageRogue.background() ||
                this._positionType !== Nore.$gameMessageRogue.positionType());
        };
        ;
        Window_MessageRogue.prototype.updateSpeakerName = function () {
            this._nameBoxWindow.setName(Nore.$gameMessageRogue.speakerName());
        };
        Window_MessageRogue.prototype.loadMessageFace = function () {
            this._faceBitmap = ImageManager.loadFace(Nore.$gameMessageRogue.faceName());
        };
        Window_MessageRogue.prototype.drawMessageFace = function () {
            var faceName = Nore.$gameMessageRogue.faceName();
            var faceIndex = Nore.$gameMessageRogue.faceIndex();
            var rtl = Nore.$gameMessageRogue.isRTL();
            var width = ImageManager.faceWidth;
            var height = this.innerHeight;
            var x = rtl ? this.innerWidth - width - 4 : 4;
            this.drawFace(faceName, faceIndex, x, 0, width, height);
        };
        return Window_MessageRogue;
    }(Window_Message2));
    var _Scene_Message_prototype_createMessageWindow = Scene_Message.prototype.createMessageWindow;
    Scene_Message.prototype.createMessageWindow = function () {
        _Scene_Message_prototype_createMessageWindow.call(this);
        var rect = this.messageWindowRectRogue();
        this._messageWindowRogue = new Window_MessageRogue(rect);
        this.addWindow(this._messageWindowRogue);
        this._messageWindowFukidashi = new Window_Fukidashi();
        this.addWindow(this._messageWindowFukidashi);
    };
    Scene_Message.prototype.associateWindows = function () {
        var messageWindow = this._messageWindow;
        messageWindow.setGoldWindow(this._goldWindow);
        messageWindow.setNameBoxWindow(this._nameBoxWindow);
        messageWindow.setChoiceListWindow(this._choiceListWindow);
        messageWindow.setNumberInputWindow(this._numberInputWindow);
        messageWindow.setEventItemWindow(this._eventItemWindow);
        this._nameBoxWindow.setMessageWindow(messageWindow);
        this._choiceListWindow.setMessageWindow(messageWindow);
        this._numberInputWindow.setMessageWindow(messageWindow);
        this._eventItemWindow.setMessageWindow(messageWindow);
        this._messageWindowFukidashi.setNameBoxWindow(this._nameBoxWindow);
        this._messageWindowRogue.setGoldWindow(this._goldWindow);
        this._messageWindowRogue.setNameBoxWindow(this._nameBoxWindow);
        this._messageWindowRogue.setChoiceListWindow(this._choiceListWindow);
        this._messageWindowRogue.setNumberInputWindow(this._numberInputWindow);
        this._messageWindowRogue.setEventItemWindow(this._eventItemWindow);
    };
    Scene_Message.prototype.messageWindowRectRogue = function () {
        var ww = Graphics.boxWidth - 636;
        var wh = 160;
        var wx = 194;
        if (ConfigManager.displayOperation) {
            wx = 214;
        }
        var wy = 0;
        return new Rectangle(wx, wy, ww, wh);
    };
    Window_ChoiceList.prototype.windowY = function () {
        return 608 - this.windowHeight();
        /*const messageY = this._messageWindow.y - 10;
        if (messageY >= Graphics.boxHeight / 2) {
            return messageY - this.windowHeight();
        } else {
            return messageY + this._messageWindow.height;
        }
        */
    };
})(Nore || (Nore = {}));
