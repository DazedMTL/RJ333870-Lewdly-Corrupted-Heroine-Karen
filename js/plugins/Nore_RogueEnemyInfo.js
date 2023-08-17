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
var Nore;
(function (Nore) {
    var Window_EnemyInfo = /** @class */ (function (_super) {
        __extends(Window_EnemyInfo, _super);
        function Window_EnemyInfo() {
            var _this = _super.call(this, new Rectangle(700, 120, 278, 340)) || this;
            _this._event = null;
            _this.visible = false;
            _this.frameVisible = false;
            _this.backOpacity = 0;
            return _this;
        }
        Window_EnemyInfo.prototype.update = function () {
            _super.prototype.update.call(this);
            if ($gamePlayer.isDefeat() || $gameActors.mainActor().isDead()) {
                this.visible = false;
                return;
            }
            if ($gameTemp.infoEnemy && $gameTemp.infoEnemy.enemy().isDead()) {
                $gameTemp.infoEnemy = null;
            }
            if (this.isChanged()) {
                this.showEnemy($gameTemp.infoEnemy);
            }
            else {
                if (this.isHpChanged()) {
                    this.redrawHp();
                }
                if (this.isStateChanged()) {
                    this.redrawState();
                }
            }
            this.x = -10;
            /*if ($gamePlayer.screenX() > 600) {
                this.x = 0;
            } else {
                this.x = 700;
            }
            */
        };
        Window_EnemyInfo.prototype.isChanged = function () {
            if (this._event !== $gameTemp.infoEnemy) {
                return true;
            }
            if (this._event && this._event.enemy().enemyId() != this._lastEnemyId) {
                return true;
            }
            return false;
        };
        Window_EnemyInfo.prototype.showEnemy = function (event) {
            this._event = event;
            if (event) {
                this._lastEnemyId = event.enemy().enemyId();
            }
            this.refresh();
        };
        Window_EnemyInfo.prototype.refresh = function () {
            this.contents.clear();
            this.refreshBg();
            if (this._hpGauge) {
                this.removeChild(this._hpGauge);
                this._hpGauge = null;
            }
            if (!$gameSwitches.value(1)) {
                this.visible = false;
                return;
            }
            if (!this._event) {
                this.visible = false;
                return;
            }
            this.visible = true;
            this.resetFontSettings();
            this.drawEnemyImage();
            this.drawEnemyName();
            this.drawEnemyState();
            this.drawEnemyHp();
            //this.drawEnemyMp();
            this.drawEnemyStatus();
            this.drawEnemyDescription();
            //this.drawEnemySkill();
        };
        Window_EnemyInfo.prototype.refreshBg = function () {
            this._contentsBackSprite.removeChildren();
            var baseTexture = Nore.getSystemBaseTexture('enemyInfo_01');
            var texture = new PIXI.Texture(baseTexture);
            var sprite = new PIXI.Sprite(texture);
            sprite.x = -0;
            sprite.y = -0;
            this._contentsBackSprite.addChild(sprite);
        };
        Window_EnemyInfo.prototype.clear = function () {
            this._event = null;
        };
        Window_EnemyInfo.prototype.drawEnemyImage = function () {
            var image = ImageManager.loadCharacter(this._event.characterName());
            var index = this._event.characterIndex();
            var isBigCharacter = ImageManager.isBigCharacter(this._event.characterName());
            var pw = this.patternWidth(image);
            var ph = this.patternHeight(image);
            var sx = 0;
            if (!isBigCharacter) {
                sx = ((index % 4) * 3 + 1) * pw;
            }
            var sy = 0;
            if (!isBigCharacter) {
                sy = Math.floor(index / 4) * 4 * ph;
            }
            var dx = 0;
            var dy = 0;
            if (pw == 32) {
                dx = 8;
                dy = 8;
            }
            if (pw == 96) {
                dx = -20;
                dy = -20;
            }
            if (pw == 120) {
                pw = 60;
                ph = 60;
                sx += 20;
                dx -= 0;
                dy -= 10;
            }
            this.contents.blt(image, sx, sy, pw, ph, dx + 10, dy + 25);
        };
        Window_EnemyInfo.prototype.isStateChanged = function () {
            if (!this._lastStates) {
                return false;
            }
            if (!this._event) {
                return false;
            }
            var enemy = this._event.enemy();
            var count1 = 0;
            var count2 = 0;
            for (var s in enemy._stateTurns) {
                count1++;
                if (this._lastStates[s] != enemy._stateTurns[s]) {
                    return true;
                }
            }
            for (var s in this._lastStates) {
                count2++;
            }
            return count1 != count2;
        };
        Window_EnemyInfo.prototype.redrawState = function () {
            this.contents.clearRect(190, 84, 50, 40);
            this.drawEnemyState();
        };
        Window_EnemyInfo.prototype.drawEnemyState = function () {
            var x = 190;
            var y = 84;
            var enemy = this._event.enemy();
            this._lastStates = JsonEx.makeDeepCopy(enemy._stateTurns);
            this.contents.fontSize = 15;
            for (var _i = 0, _a = enemy.states(); _i < _a.length; _i++) {
                var s = _a[_i];
                this.drawIcon(s.iconIndex, x, y);
                var turn = enemy._stateTurns[s.id];
                if (turn > 0) {
                    this.drawText(turn, x + 14, y + 6, 30, 'right');
                }
                break;
                x += 32;
            }
        };
        Window_EnemyInfo.prototype.patternWidth = function (image) {
            var isBigCharacter = ImageManager.isBigCharacter(this._event.characterName());
            if (isBigCharacter) {
                return image.width / 3;
            }
            else {
                return image.width / 12;
            }
        };
        Window_EnemyInfo.prototype.patternHeight = function (image) {
            var isBigCharacter = ImageManager.isBigCharacter(this._event.characterName());
            if (isBigCharacter) {
                return image.height / 4;
            }
            else {
                return image.height / 8;
            }
        };
        Window_EnemyInfo.prototype.drawEnemyName = function () {
            var enemy = this._event.enemy();
            this.contents.fontSize = 22;
            this.drawText(enemy.name(), 70, 43, 160, 'left');
        };
        Window_EnemyInfo.prototype.isHpChanged = function () {
            if (!this._event) {
                return;
            }
            var enemy = this._event.enemy();
            return this._lastHp != enemy.hp;
        };
        Window_EnemyInfo.prototype.redrawHp = function () {
            var enemy = this._event.enemy();
            var x = 10;
            this.contents.fontSize = 24;
            this.contents.clearRect(60, 80, 40, 30);
            this.drawText(Math.floor(enemy.hp), x + 10, 80, 80, 'right');
        };
        Window_EnemyInfo.prototype.drawEnemyHp = function () {
            var enemy = this._event.enemy();
            this._lastHp = enemy.hp;
            var x = 20;
            this.contents.fontSize = 22;
            this.drawText('HP', x, 80, 100, 'left');
            this.drawText(Math.floor(enemy.hp), x + 0, 80, 80, 'right');
            this.drawText('/', x + 90, 80, 60, 'left');
            this.drawText(enemy.mhp, x + 80, 80, 60, 'right');
            var sprite = new Nore.Sprite_GaugeEnemyHp();
            sprite.setup(enemy, 'hp');
            sprite.move(x + 10, 126);
            sprite.show();
            this._hpGauge = sprite;
            this.addChild(this._hpGauge);
        };
        Window_EnemyInfo.prototype.drawEnemyMp = function () {
            var enemy = this._event.enemy();
            this._lastHp = enemy.hp;
            var x = 170;
            this.contents.fontSize = 22;
            this.drawText('SP', x, 50, 100, 'left');
            this.drawText(Math.floor(enemy.mp), x + 10, 50, 30, 'right');
            this.drawText('/', x + 40, 50, 60, 'left');
            this.drawText(enemy.mmp, x + 10, 50, 60, 'right');
            /*
            const sprite = new Sprite_GaugeEnemyHp();
            sprite.setup(enemy, 'hp');
            sprite.move(x + 10, 96);
            sprite.show();
            this._hpGauge = sprite;
            this.addChild(this._hpGauge);
            */
        };
        Window_EnemyInfo.prototype.drawEnemyStatus = function () {
            var enemy = this._event.enemy();
            if (!enemy) {
                return;
            }
            this.contents.fontSize = 18;
            var y = 138;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.param(2), 24, y, 200, 'left');
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(enemy.param(2), 30, y, 100, "right");
            var actor = $gameActors.actor(1);
            var action1 = new Game_Action(enemy);
            action1.setAttack();
            var damage1 = action1.makeDamageValue(actor, false);
            this.drawTextEx('\\C[2](%1 DMG)\\C[0]'.format(damage1), 140, y + 4, 100);
            y += 32;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.param(3), 24, y, 200, 'left');
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(enemy.param(3), 30, y, 100, "right");
            var action2 = new Game_Action(actor);
            action2.setAttack();
            var damage2 = action2.makeDamageValue(enemy, false);
            this.drawTextEx('\\C[6](%1 DMG)\\C[0]'.format(damage2), 140, y + 4, 100);
        };
        Window_EnemyInfo.prototype.resetFontSettings = function () {
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = 18;
            this.resetTextColor();
        };
        Window_EnemyInfo.prototype.drawEnemyDescription = function () {
            var enemy = this._event.enemy();
            this.contents.fontSize = 18;
            var y = 210;
            for (var i = 1; i <= 3; i++) {
                var line = enemy.enemy().meta['desc' + i];
                if (line) {
                    this.drawText(line, 24, y, 260, 'left');
                    y += 26;
                }
            }
        };
        Window_EnemyInfo.prototype.drawEnemySkill = function () {
            var enemy = this._event.enemy();
            var y = 240;
            this.contents.fontSize = 16;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText('スキル', 0, y, 200, 'left');
            y += 26;
            this.changeTextColor(ColorManager.normalColor());
            this.contents.fontSize = 18;
            for (var _i = 0, _a = enemy.enemy().actions; _i < _a.length; _i++) {
                var action = _a[_i];
                if (action.skillId <= 3) {
                    continue;
                }
                var skill = $dataSkills[action.skillId];
                var text = skill.name;
                if (enemy.currentAction() && enemy.currentAction().waitCount() > 0 && enemy.currentAction().item().id == action.skillId) {
                    text = '\\C[6]' + text;
                }
                var actor = $gameActors.actor(1);
                var action1 = new Game_Action(enemy);
                action1.setSkill(skill.id);
                var damage1 = action1.makeDamageValue(actor, false);
                text += '\\C[2] (%1ダメ)'.format(damage1);
                this.drawIcon(skill.iconIndex, 0, y);
                this.drawTextEx(text, 40, y, 200);
                y += 32;
                for (var i = 0; i < 1; i++) {
                    this.drawTextEx(skill.description, 10, y, 100, "left");
                }
                //this.drawTextEx('(与ダメ \\C[6]%1\\C[0])'.format(damage2), 130, y, 100, "left");
            }
        };
        return Window_EnemyInfo;
    }(Window_Base));
    Nore.Window_EnemyInfo = Window_EnemyInfo;
})(Nore || (Nore = {}));
