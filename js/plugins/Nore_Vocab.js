/*:ja
 * @target MZ
 * @author ル
 */
TextManager.fame = 'H Fame';
TextManager.frustration = 'Failure Pt';
TextManager.medal = 'Title';
TextManager.anal = 'Anal';
TextManager.bukkake = 'Bukkake';
TextManager.nakadashi = 'Creampie';
TextManager.keikenPerson = 'Humans';
TextManager.keikenGoblin = 'Goblins';
TextManager.condition = '\\C[16]Condition: \\C[0]';
TextManager.hasItemToDisable = 'Because I have C[6]%1\C[8], it is possible to attach and detach.';
TextManager.pressButton = 'Please press the "decision" button to confirm.';
TextManager.notEnoughMoney = 'Not enough darkness.';
TextManager.notEnoughSeieki = 'Not enough semen.';
TextManager.kodakara = 'Because I am equipped with a child protection charm, it becomes 100%.';
TextManager.kigaeError = 'It is not possible to determine with certainty while exposing only a part.';
TextManager.endGame = 'End Game';
TextManager.displayOperation = 'Operation Instructions';
TextManager.skipKey = 'Message Skip Key';
function getPlaceName(destId) {
    switch (destId) {
        case Destination.Town: return 'Magical City Sodom';
        case Destination.Forest: return 'Enchanted Forest';
        case Destination.Goblin: return 'Goblin Lair';
    }
}
function getDefeatText(dungeonId) {
    switch (dungeonId) {
        case 2: 'I was gang-raped by goblins and \nrepeatedly creampied.';
    }
    return '';
}
function getNakadashiTarget(type) {
    switch (type) {
        case 'people': return 'Civilians';
        case 'enemy': return 'Bandits';
        case 'monster': return 'Monsters';
        default: return 'Undefined';
    }
}
function getEroName(itemId) {
    switch (itemId) {
        case Nore.SyusanCommad.VIBE: return 'Fingering';
        case Nore.SyusanCommad.MUCHI: return 'Whip';
        case Nore.SyusanCommad.SEX: return 'Sex';
        case Nore.SyusanCommad.KUPAA: return 'Open Pussy';
        case Nore.SyusanCommad.BUKKAKE: return TextManager.bukkake;
        case Nore.SyusanCommad.ANAL: return TextManager.anal;
        case Nore.SyusanCommad.CHIKUBI: return 'Nipple Pinching';
        case Nore.SyusanCommad.CHIKUBI2: return 'Nipple Licking';
        case Nore.SyusanCommad.TEMAN: return 'Fingering';
        default: return '';
    }
}
