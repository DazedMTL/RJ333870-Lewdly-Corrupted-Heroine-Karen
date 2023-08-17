/*:ja
 * @target MZ
 * @author ル
 */
TextManager.fame = 'Hの名声';
TextManager.frustration = '挫折 Pt';
TextManager.medal = '称号';
TextManager.anal = 'アナル';
TextManager.bukkake = 'ぶっかけ';
TextManager.nakadashi = '中出し回数';
TextManager.keikenPerson = '経験人数';
TextManager.keikenGoblin = '経験人数(ゴブリン)';
TextManager.condition = '\\C[16]獲得条件: \\C[0]';
TextManager.hasItemToDisable = '\\C[6]%1\\C[8]を所持しているため、つけ外しが可能';
TextManager.pressButton = '決定ボタンを押して判定してください';
TextManager.notEnoughMoney = '闇の力が足りません';
TextManager.notEnoughSeieki = '精液が足りません';
TextManager.kodakara = '子宝のお守りを装備しているため、１００％になります';
TextManager.kigaeError = '局部を晒した状態で確定することはできません';
TextManager.endGame = 'ゲーム終了';
TextManager.displayOperation = '操作方法表示';
TextManager.skipKey = 'メッセージスキップキー';
function getPlaceName(destId) {
    switch (destId) {
        case Destination.Town: return '魔都ソドム';
        case Destination.Forest: return '魔境の森';
        case Destination.Goblin: return 'ゴブリンの巣穴';
    }
}
function getDefeatText(dungeonId) {
    switch (dungeonId) {
        case 2: 'ゴブリンたちに輪姦され、\n何度も中出しされた';
    }
    return '';
}
function getNakadashiTarget(type) {
    switch (type) {
        case 'people': return '一般人';
        case 'enemy': return '賊や奴隷商など';
        case 'monster': return 'モンスター';
        default: return '未定義';
    }
}
function getEroName(itemId) {
    switch (itemId) {
        case Nore.SyusanCommad.VIBE: return '手マン';
        case Nore.SyusanCommad.MUCHI: return 'ムチ';
        case Nore.SyusanCommad.SEX: return 'セックス';
        case Nore.SyusanCommad.KUPAA: return 'まんこを開く';
        case Nore.SyusanCommad.BUKKAKE: return TextManager.bukkake;
        case Nore.SyusanCommad.ANAL: return TextManager.anal;
        case Nore.SyusanCommad.CHIKUBI: return '乳首つまみ';
        case Nore.SyusanCommad.CHIKUBI2: return '乳首舐め';
        case Nore.SyusanCommad.TEMAN: return '手マン';
        default: return '';
    }
}
