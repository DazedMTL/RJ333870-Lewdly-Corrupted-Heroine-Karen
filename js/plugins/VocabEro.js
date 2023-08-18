var ERO_REACTION_MAP = {
    乳首_1_1: { desc: 'Karen: "Hey! Dont touch me there!"', face: 20 },
    乳首_1_2: { desc: 'Karen: "Mmm! That spot is sensitive!"', face: 24 },
    乳首_1_3: { desc: 'Karen: "Ahh... right there..."', face: 19 },
    乳首_2_1: { desc: 'Karen: "Stop touching my breasts!!"', face: 26 },
    乳首_2_2: { desc: 'Karen: "Haa! Youre making me feel good again"', face: 24 },
    乳首_2_3: { desc: 'Karen: "There, that spot feels so good!"', face: 22 },
    乳首_3_1: { desc: 'Karen squirmed in pleasure!', face: 25 },
    乳首_3_2: { desc: 'Karen squirmed in pleasure!', face: 24 },
    乳首_3_3: { desc: 'Karen writhed in pleasure!', face: 19 },
    乳首_4_1: { desc: 'Karen: "Ugh, someone like you!"', face: 13 },
    乳首_4_2: { desc: 'Karen: "Mmm, embarrassing"', face: 18 },
    乳首_4_3: { desc: 'Karen: "Ahhh, play with my nipples more!"', face: 19 },
    股間_1_1: { desc: 'Karen: "T-Thats off-limits!"', face: 22 },
    股間_1_2: { desc: 'Karen: "Hey, d-don\'t touch th-there!"', face: 23 },
    股間_1_3: { desc: 'Karen: "Haa... haa... feels good..."', face: 19 },
    股間_2_1: { desc: 'Karen: "Thats my private area! Stop!"', face: 24 },
    股間_2_2: { desc: 'Karen: "Youre touching my embarrassing part!"', face: 25 },
    股間_2_3: { desc: 'Karen: "Touch my pleasurable spot..."', face: 18 },
    股間_3_1: { desc: 'Karen squirmed in disgust!', face: 21 },
    股間_3_2: { desc: 'Karen writhed in pleasure!', face: 18 },
    股間_3_3: { desc: 'Karen offered her hips and surrendered to pleasure!', face: 10 },
    股間_4_1: { desc: 'Karen: "Uhh, to someone like you!"', face: 21 },
    股間_4_2: { desc: 'Karen: "Aahh! Im being made to come by a loser...!"', face: 24 },
    股間_4_3: { desc: 'Karen: "Touch me... more..."', face: 10 },
    キス_1_1: { desc: 'Karen: "Stop! Its disgusting!"', face: 21 },
    キス_1_2: { desc: 'Karen: "Mmm! My mouth is being violated!"', face: 29 },
    キス_1_3: { desc: 'Karen: "Alright, let\'s exchange saliva..."', face: 27 },
    キス_2_1: { desc: 'Karen: "Mmm! I hate kissing!"', face: 24 },
    キス_2_2: { desc: 'Karen: "Nn... Ah..."', face: 27 },
    キス_2_3: { desc: 'Karen: "Haa... Ahh..."', face: 28 },
    キス_3_1: { desc: 'Karen helplessly had her mouth violated!', face: 24 },
    キス_3_2: { desc: 'Karen offered her mouth!', face: 29 },
    キス_3_3: { desc: 'Karen stuck out her tongue and accepted it!', face: 27 },
    キス_4_1: { desc: 'Karen: "Uhh, it smells!"', face: 22 },
    キス_4_2: { desc: 'Karen: "Ah... It smells but... Mmm..."', face: 29 },
    キス_4_3: { desc: 'Karen: "Mmm... The smell is addictive..."', face: 27 },
    イク_1_1: { desc: 'Karen: "Y-Yaahhh!"', face: 23 },
    イク_1_2: { desc: 'Karen: "Aahh! Im going to come!"', face: 23 },
    イク_1_3: { desc: 'Karen: "Mm! It feels amazing!"', face: 16 },
    イク_2_1: { desc: 'Karen: "To someone like you... making me feel good... Aahh!!"', face: 17 },
    イク_2_2: { desc: 'Karen: "Ah... Its coming... Aahh!!"', face: 24 },
    イク_2_3: { desc: 'Karen: "Im coming!! Im coming!!!"', face: 29 },
    イク_3_1: { desc: 'Karen: "Stop! Im going to climax! Nooo!!"', face: 24 },
    イク_3_2: { desc: 'Karen: "A-Again! Im going to come! Ummphh!!"', face: 12 },
    イク_3_3: { desc: 'Karen: "Im coming! Im coming! Im coming!!"', face: 24 },
    イク_4_1: { desc: 'Karen: "N-No way! It feels... good..."', face: 21 },
    イク_4_2: { desc: 'Karen: "Uhh! Even though I hate it... Mybody is responding!"', face: 17 },
    イク_4_3: { desc: 'Karen: "Aahh... Right there... It feels too good!"', face: 19 },
    フェラ_1_1: { desc: 'Karen: "Uhh! Its smelly!"', face: 23 },
    フェラ_1_2: { desc: 'Karen: "Ngh, its being forced in!"', face: 23 },
    フェラ_1_3: { desc: 'Karen: "Mmm! It feels good!"', face: 16 },
    フェラ_2_1: { desc: 'Karen: "To someone like you!!"', face: 17 },
    フェラ_2_2: { desc: 'Karen: "Ah... Its coming out...!"', face: 24 },
    フェラ_2_3: { desc: 'Karen: "Cumming! Cumming!"', face: 29 },
    フェラ_3_1: { desc: 'Karen helplessly had her mouth violated!', face: 24 },
    フェラ_3_2: { desc: 'Karen offered her mouth!', face: 12 },
    フェラ_3_3: { desc: 'Karen stuck out her tongue and accepted it!', face: 24 },
    フェラ_4_1: { desc: 'Karen: "Its disgusting... Like this...!"', face: 21 },
    フェラ_4_2: { desc: 'Karen: "Uhh! Even though I hate it!"', face: 17 },
    フェラ_4_3: { desc: 'Karen: "Aahh... My mouth is being violated..."', face: 19 },
};
var ERO_TITLES = {
    1: 'オーガに敗北',
    53: 'オーガに再度敗北',
    824: 'オーガの子を出産',
    3: '宿屋でフェラ',
    38: '宿屋で再度フェラ',
    34: '宿屋の主人のお酌',
    834: '宿屋の主人のお酌、再び',
    37: '宿屋の主人のお酌',
    51: '宿屋の主人のお酌',
    5: '　',
    98: '出産',
    7: 'アナル調教（魔術師）',
    4: '山賊のアジト(敗北)',
    44: 'アジトで強制出産',
    45: '山賊による種付け',
    24: '公開セックス（山賊）',
    27: '山賊にまた敗れて…',
    8: '孕まされた挙げ句晒し者',
    23: '性奴隷オークション',
    9: 'ゴブリンの巣穴(敗北)',
    2: 'ゴブリンに再び敗北',
    25: 'ゴブリンの孕み袋',
    47: 'ゴブリンの孕み袋',
    26: 'ゴブリンによる種付け',
    46: 'ゴブリンの孕み袋',
    831: '荷物運びのバイト',
    11: '売春宿でセックス',
    511: '売春宿でセックス',
    12: 'アナル拡張',
    840: 'アナル拡張 次の段階',
    841: 'アナル拡張 最終段階',
    842: 'アナル拡張訓練',
    14: '精液便所のバイト',
    15: 'メイヴィス調教１回目',
    13: 'メイヴィス調教２回目',
    19: 'メイヴィス調教３回目',
    49: 'メイヴィス調教４回目',
    16: 'マークさんとのエッチ',
    42: 'マークさんとまたエッチ',
    43: 'マークさんとまたエッチ',
    838: '妊娠中にマークさんとエッチ',
    17: 'ブタによる種付け',
    18: '娼館で初H',
    21: 'ベルナの森(クリア)',
    28: '娼館で騎乗位H',
    41: '娼館で中出しH',
    29: '　',
    30: '浮浪者の家でH',
    32: '浮浪者の家でH２回目',
    31: '浮浪者の家で過ごす日々',
    33: '教会で神父にフェラ',
    39: '教会で神父とエッチ',
    22: '教会で神父とエッチ',
    35: '　',
    36: 'コレットさんとセックス',
    538: '宿屋でフェラ',
    99: 'ボテ腹で神父とエッチ',
    48: '公衆便所のバイト',
    851: '酒場でバイト',
    850: '　',
    853: '　',
    202: 'テオくんにフェラ',
    206: 'テオくんにフェラ',
    203: 'テオくんとセックス',
    204: 'テオくんと騎乗位',
    829: '3人で順番にＨ',
    205: 'テオくんと後背位',
    209: 'テオくんとボテ腹正常位',
    301: '　',
    302: '　',
    303: '　',
};
var ERO_TEXTS = {
    1: "After being defeated, I was taken to the Ogre's lair.\nThere, I was stripped of my belongings and forced\nto consume large amounts of semen.\nAfterwards, I managed to find an opportunity \nand escape using a magic rope.",
    53: "After another defeat, I was taken to the Ogre's lair.\nThere, I was aggressively violated and had semen injected into my uterus multiple times...",
    824: "After being defeated, I was taken to the Ogre's lair.\nDespite being pregnant, I was once again violently violated\nand forced to give birth to the Ogre's child that had already been impregnated.",
    3: "I was made to suck Andrei-san's penis.\nForcefully, his penis was shoved into my mouth,\nand I was ejaculated deep in my throat...",  
    38: "I was made to suck Andrei-san's penis again.\nHis penis was forcefully shoved into my mouth,\nand once again I was ejaculated deep in my throat...",
    34: "I accompanied Andrei-san's evening drink,\nand ended up falling asleep.\nIt's embarrassing to fall asleep in front of others.\nI wonder what kind of face I made while sleeping...",
    834: "I accompanied Andrei-san's evening drink again,\nand ended up falling asleep.\nI must be weak against alcohol...\nI hope my sleeping posture wasn't too bad...",
    37: "I accompanied Andrei-san's evening drink again,\nand ended up falling asleep.\nI must be weak against alcohol...\nI'm sorry for causing trouble even with this belly...",
    51: "I accompanied Andrei-san's evening drink again,\nand ended up falling asleep.\nI must be weak against alcohol...\nI hope my sleeping posture wasn't too bad...",
    5: "",
    98: "I gave birth to %1's child.\nTo give birth in a church, in front of such a large crowd...\n",
    7: "After defeat, I was captured by the volcano mage\nand subjected to anal training all day long.\nAs a result, my anus became stretched wide\nand could even accommodate massive dildos.",
    4: "After defeat, I was gang-raped by bandits\nand repeatedly filled with their seed...\nThreatened with a knife, I couldn't resist.\nAnd I became a tool for the bandits' sexual desires...",
    10004: "After defeat, my virginity was taken by bandits.\nOnce the bandits learned I was a virgin,\nthey delighted in tormenting and gang-raping me.\nThey repeatedly filled me with their seed...",
    44: "Defeated by bandits, I was forcibly made to give birth\nto the child I was carrying in their hideout.\nThe parent of the child was %1.\nAnd I was impregnated by the bandits once again...",
    45: "I was defeated by bandits and spent 4 days\nas a sex slave in their hideout.\nI was repeatedly subjected to intense insemination\nbythe bandits, resulting in me being impregnated with their child...",
    24: "After being defeated by the Daress Bandit Gang,\nI endured humiliation and abuse for several days.\nI was eventually released after being impregnated,\nbut it was followed by the shame of public sex in the village...",
    27: "I was defeated once again by the Daress Bandit Gang and captured.\nI was subjected to thorough humiliation and forced impregnation...\nI was impregnated with a child as a proof of my defeat...",
    8: "After being defeated, I was gang-raped by bandits for three days\nand once again impregnated.\nFurthermore, I was taken to the village that requested the bandit's subjugation,\nand forced to entertain the villagers...",
    23: "After being defeated by the Daress Bandit Group,\nI was impregnated through breeding sex.\nAfterwards, I was put up for a sexual slave auction\nbut fortunately, Theo-kun won the bid and I was able to return.",
    9: "After being defeated, I had my private parts licked by goblins.\nWith their long tongues, they thoroughly explored inside my vagina...\nTo my shame, I couldn't help but feel pleasure from it,\nand was made to climax twice just with their tongues...",
    2: "After being defeated, I was gang-raped by goblins,\nrepeatedly filled with their semen.\nI cried out and resisted, but it was futile,\nI was forced to satisfy all the goblins in their lair...",
    10002: "After my defeat, I had my virginity taken by a Goblin...\nFurthermore, I was repeatedly impregnated with multiple creampies.\nCrying and resisting were futile, as I was forced to mate with all the Goblins in the nest...",
    25: "I became the breeding bag for Goblins,\nbeing impregnated multiple times and giving birth to triplets...\nAfterward, I was even branded with a mark to indicate my status as a breeding bag...",
    47: "After giving birth to Goblin offspring, I was immediately subjected to the next impregnation,\nhelpless to resist and once again impregnated. The following day, under the watch of the Goblins,\nI gave birth to quadruplets.",
    26: "I was defeated by a Goblin and once again turned into a breeding bag.\nI was forced to endure multiple inseminations and have their semen poured inside my vagina.\nHelp arrived the next day.",
    46: "I became a goblin's breeding bag and spent three days.\nBefore being rescued by Lady Eris,\nI was made to give birth to a total of %4 goblins...",
    831: "I headed to the lord's mansion for a baggage carrying job.\nOn the way, I underwent a thorough body search\nat the checkpoint, even inside there...",
    11: "For training purposes, I ended up working at a cheap brothel.\nThey prioritized servicing multiple men\nand I was forced to engage in sexual acts with different men over and over again...",
    511: "For training purposes, I ended up working at a cheap brothel.\nThey prioritized servicing multiple men\nand I was forced to engage in sexual acts with different men over and over again...",
    12: "I studied under a person called Anal Sensei\nand received anal stretching training.\nIt was tight at first, but with diligent training,\nmy anus started to widen.",
    840: "I received anal stretching training from Anal Sensei once again.\nThrough careful guidance, I was able to accommodate an even thicker\npenis this time, expanding further.",
    841: "I continued to receive anal stretching training from Anal Sensei.\nWith further instruction, I was able to take in a huge ball\nand expel it by myself.\nApparently, I have now achieved mastery.",
    842: "I received anal stretching training from Anal Sensei once again.\nIf I continue to train my anus more,\nI can advance to the next stage.\nI have to do my best!",
    14: "I worked a part-time job as a semen toilet.\nI was fixed in a position with only my buttocks sticking out,\nand I was repeatedly creampied by men whose faces I couldn't see...",
    15: "I was vigorously fingered by Mavis-san,\nstopped just before climaxing multiple times. Unable to endure\nthe teasing, I begged to be brought to orgasm,\nand reached climax twice while squirting.",
    13: "I was trained on my nipples by Mistress Mavis,\nand was brought to orgasm multiple times just from my nipples.\nAfterward, I was adorned with nipple piercings\nas a mark of being a sexual slave.",
    19: "I was penetrated from behind by Mistress Mavis,\nand was brought to orgasm multiple times.\nWhat a pleasurable movement of her hips it was.\nIt was a day that reaffirmed my masochistic nature.",
    49: "I took fertility drugs and received a creampie from the pig chosen by Lady Mavis.\nWith that much being released, there is no escaping pregnancy...",
    10049: "I was taken from behind by Lady Mavis and had my virginity taken.\nIt was a day that reminded me of my masochistic nature.",
    16: "I was invited by Mark-san to an inn.\nUnder the influence of alcohol, I engaged in sexual activity.\nI was kissed deeply in the missionary position,\nand in the end, he ejaculated inside me...",
    10016: "I was invited by Mark-san to an inn.\nUnder the influence of alcohol, I felt good and ended up on the bed.\nMy virginity was taken from me.\nAnd I was kissed deeply in the missionary position,\nand in the end, he ejaculated inside me...",
    42: "I drank alcohol with Mark-san again,\nand got a belly button piercing.\nAnd in the heat of the moment, we had sex.\nSure enough, this time too, I was filled with plenty inside...",
    43: "I was invited by Mark-san to the inn again.\nAfter drinking alcohol and getting in the mood,\nwe had unprotected sex while kissing.",
    838: "Even with this belly, I went to the inn with Mark-san again.\nDespite having a baby inside my belly, we engaged in sexual activity\nand I became pleasured. To make matters worse, he ejaculated inside me...",
    17: "After being defeated, I was pinned down by a pig\nand impregnated with a drill-like penis.\nThick, sticky semen was poured in large amounts...",
    18: "I took my first customer at the brothel and engaged in sexual activity.\nEven though it's work, I'm worried about being ejaculated inside...",
    10018: "I took my first customer at the brothel and offered my virginity.\nEven though it's work, I'm worried about being ejaculated inside...",
    21: "After being defeated, I was penetrated anally by a monster,\nmy clitoris was relentlessly stimulated and I was made to orgasm %2 times.\nAnd I ended up showing a shameful side begging for forgiveness\nfrom the unfamiliar sensations...",
    28: "I took a client at a high-class brothel.\nOnce again, I wholeheartedly served the client\nand earned a lot of money by receiving multiple creampie ejaculations, totaling %3G.",
    41: "I took a client at a high-class brothel.\nI wholeheartedly served the client\nand earned a lot of money by receiving multiple creampie ejaculations, totaling %3G.",
    29: "",
    30: "I was begged by a homeless old man and ended up having sex.\nI was shocked by the smell in the room and the old man,\nbut my body turned that humiliation into pleasure...",
    32: "Once again, I stayed at the homeless old man's house\nand had sex in the doggy style position.\nThe old man ended up urinating inside my vagina in the end...",
    31: "While staying at the homeless old man's house,\nhaving sex with the old man became a daily occurrence.\nToday, we even played with urine,\nand I found myself awakening to new perverted acts...",
    33: "When I went to deliver lunch to the church, I witnessed\nthe priest and Colette-san having sex.\nI made a deal with the priest to be a substitute for Colette-san\nand performed oral service...",
    39: "I went to the church and had sex with the priest instead of Colette-san.\nThe priest placed an erotic mark on me, making me easily susceptible to pregnancy through his magic...",
    10039: "I went to the church and had sex with the priest instead of Colette-san.\nMy virginity was taken away...\nFurthermore, the priest placed an erotic mark on me, making me easily susceptible to pregnancy through his magic...",
    22: "I went to the church and had sex with the priest instead of Colette-san.\nI couldn't withstand the pleasure from the priest,\nreaching climax multiple times and being repeatedly creampied...",
    35: "",
    36: "I grew a penis and had Colette-san accompany me.\nTo my surprise, I couldn't resist the overwhelming pleasure\nand ejaculated inside Colette-san to my heart's content.",
    538: "I sucked Andrei-san's penis for him.\nI bobbed on his penis with my throat,\nand got a plentiful ejaculation.\nHis penis is strong and enjoyable to suck.",
    99: "I went to the church and had sex with the priest\nin place of Colette-san. Even though I had a baby in my belly,\nthe priest passionately ravished my body...",
    48: "I worked as a public restroom attendant at a bar,\nand true to its name, the 'public restroom',\nI had lots of pee poured on my vagina...",
    851: "I worked as a waitress at a bar.\nHaving to serve customers with my lower body exposed,\nI faced a lot of sexual harassment. It was a tough job.",
    850: "",
    853: "",
    202: "I gave Theo-kun a blowjob.\nUsually he's so aloof, but when we're being intimate,\nhis cute expressions and voice when he's feeling it...\nwere just adorable...",
    206: "I gave Theo-kun a blowjob again.\nAs usual, he was cute and writhing in pleasure.\nEspecially his expression at the moment of ejaculation was cute...",
    203: "I had my first sexual experience with Theo-kun.\nHe thrusted his hips with such pleasure,\nand ejaculated into my uterus multiple times.\nIt's clear that Theo-kun is indeed a boy...",
    204: "I had sex with Theo-kun in the cowgirl position.\nAs he made pleasurable expressions while thrusting his hips,\nit got me aroused...\nAnd I ended up pleasuring Theo-kun multiple times.",
    829: "After the H with Colette-san, I had another H session with Teo-kun.\nDespite being quite tired, he stayed hard for me, which made me happy.",
    205: "Teo-kun penetrated me from behind.\nTeo-kun was burning with desire, and he ejaculated inside me multiple times, trying to impregnate me...\n...I felt strangely happy about it.",
    209: "I had sex with Teo-kun with my pregnant belly.\nEven though there's a baby inside my belly,\nTeo-kun was more intense than usual, maybe?",
    301: "",
    302: "",
    303: "",
};
function selectEroReaction(item, eroLevel) {
    var partsStr;
    if (item.meta['chikubiRight'] || item.meta['chikubiLeft']) {
        partsStr = '乳首';
    }
    else if (item.meta['kiss']) {
        partsStr = 'キス';
    }
    else if (item.meta['fella']) {
        partsStr = 'フェラ';
    }
    else if (item.meta['manko'] || item.meta['teman'] || item.meta['sex']) {
        partsStr = '股間';
    }
    var dice = Math.randomInt(4) + 1;
    var key = '%1_%2_%3'.format(partsStr, dice, eroLevel);
    return ERO_REACTION_MAP[key];
}
function selectIkuReaction(eroLevel) {
    var partsStr = 'イク';
    var dice = Math.randomInt(4) + 1;
    var key = '%1_%2_%3'.format(partsStr, dice, eroLevel);
    return ERO_REACTION_MAP[key];
}
function getEroTitle(eroId, count) {
    if (ERO_TITLES[eroId]) {
        return ERO_TITLES[eroId];
    }
    ;
    console.error('ero title not found.' + eroId);
    switch (eroId) {
        case -2: return 'Slave Life';
        case -1: return 'Pregnancy';
        case 2: return 'Goblin Defeat';
        case 3: return 'Blowjob at the Inn';
        case 7: return 'Anal Training at the Tower';
        case 8: return 'Impregnated and Exposed';
        case 831: return 'Parcel Delivery Part-time Job';
        case 11:
        case 511: return 'Sex at the Brothel';
        case 12: return 'Anal Stretching';
        case 840: return 'Next Stage of Anal Stretching';
        case 841: return 'Final Stage of Anal Stretching';
        case 842: return 'Anal Stretching Training';
        case 13: return 'Training Round 2'.format(count);
        case 14: return 'Toilet Cleaning Part-time Job';
        case 15: return 'Training Round 1'.format(count);
        case 16: return 'First Night with Mark';
        case 17: return 'Breeding by Boars';
        case 18: return 'First Sex at the Brothel';
        case 19: return 'Training Round3'.format(count);
        case 23: return 'Sex Slave Auction';
        case 24: return 'Public Sex';
        case 25: return 'Goblin Seed Bag';
        case 26: return 'Breeding by Goblins';
        case 27: return 'Bandit Defeat';
        case 28: return 'Cowgirl Sex at the Brothel';
        case 30: return 'Sex at the Beggars House';
        case 31: return 'Days at the Beggars House';
        case 32: return 'Second Round of Sex at the Beggars House';
        case 33: return 'Blowjob to the Priest at the Church';
        case 34:
        case 37:
        case 35: return 'Serving the Innkeeper at the Inn';
        case 36: return 'Sex with Colette';
        case 38: return 'Blowjob at the Inn';
        case 538: return 'Blowjob at the Inn';
        case 39: return 'Sex with the Priest at the Church';
        case 99: return 'Pregnant and Sex with the Priest';
        case 41: return 'Creampie Sex at theBrothel';
        case 42: return 'Another Sex with Mark';
        case 43: return 'Sex with Mark';
        case 838: return 'Sex with Mark while Pregnant';
        case 44: return 'Forced Labor in Hideout';
        case 45: return 'Breeding by Bandits';
        case 47: return 'Second Day of Goblin Seed Bag';
        case 49: return 'Training Round 4'.format(count);
        case 202: return 'Blowjob to Theo';
        case 203: return 'Sex with Theo';
        case 204: return 'Cowgirl with Theo';
        case 205: return 'Doggy Style with Theo';
        case 209: return 'Pregnant Sex in Missionary Position with Theo';
        case 851: return 'Working at the Tavern';
        default:
            console.error(eroId + ' が見つかりません');
            return '';
    }
}
function getTaneoyaNameAuto3() {
    var enemyId = 0;
    switch ($gameVariables.value(74)) {
        case 0:
            // 神父
            enemyId = 308;
            break;
        case 1:
            // あらくれ
            enemyId = 330;
            break;
        case 2:
            // ロリコン
            enemyId = 331;
            break;
        case 3:
            // カレン
            enemyId = 334;
            break;
        case 4:
            // テオ
            enemyId = 309;
            break;
    }
    return getTaneoyaName($dataEnemies[enemyId]);
}
function isTaneoyaSanzoku() {
    var enemy = $dataEnemies[$gameActors.mainActor().sikyu().taneoyaId];
    if (!enemy) {
        console.error('種親がみつかりません');
        return false;
    }
    if (enemy.meta['sanzoku']) {
        return true;
    }
    return false;
}
function isTaneoyaGoblin() {
    var enemy = $dataEnemies[$gameActors.mainActor().sikyu().taneoyaId];
    if (!enemy) {
        console.error('種親がみつかりません');
        return false;
    }
    if (enemy.meta['goblin']) {
        return true;
    }
    return false;
}
function getTaneoyaNameAuto() {
    return getTaneoyaName($dataEnemies[$gameActors.mainActor().sikyu().taneoyaId]);
}
function getTaneoyaName(enemy) {
    if (!enemy) {
        console.error('種親がみつかりません');
        return '';
    }
    var enemyName = enemy.name;
    if (enemy.meta['taneoya']) {
        enemyName = enemy.meta['taneoya'];
    }
    return enemyName;
}
function getEroTitles(eroId, eroResult) {
    var syusan = eroResult.syusanMonster + eroResult.syusanHuman;
    switch (eroId) {
        case -3:
            if (eroResult.enemyId > 0) {
                var enemy = $dataEnemies[eroResult.enemyId];
                return ['I got pregnant.', '%1 is the father.'.format(getTaneoyaName(enemy))];
            }
            else {
                return ['I got pregnant.', 'I don\'t know who the father is yet.'];
            }
        case -2: return ['I got sold as a slave to the bandits'];
        case -1: return ['I feel like I gained some weight'];
        default:
            console.error(eroId + ' not found');
            return ['', ''];
    }
}
function getEroText(eroResult) {
    var enemy = $dataEnemies[eroResult.enemyId];
    var enemyName = '';
    if (!enemy) {
        //console.error('enemy が見つかりません');
        //p(eroResult)
    }
    else {
        enemyName = '\\C[6]' + getTaneoyaName(enemy) + '\\C[0]';
    }
    var eroId = eroResult.eroId();
    var isShojo = eroResult.isShojoSoushitsu();
    var syusan = eroResult.syusanMonster + eroResult.syusanHuman;
    var iku = eroResult.iku;
    var gold = eroResult.gold();
    if (ERO_TEXTS[eroId]) {
        if (isShojo && ERO_TEXTS[eroId + 10000]) {
            return ERO_TEXTS[eroId + 10000].format(enemyName, iku, gold, syusan);
        }
        return ERO_TEXTS[eroId].format(enemyName, iku, gold, syusan);
    }
    console.error('text not found' + eroId);
    switch (eroId) {
        case -3:
        case -1:
            /*if (eroResult.taneoyaId() > 0) {
                enemyName = $dataEnemies[eroResult.taneoyaId()].name;
                return '妊娠が発覚してしまった。\n%1が種親だろう'.format(enemyName);
            } else {-1
                return '妊娠が発覚してしまった。\n誰が親なのかはまだわからない';
            }*/
            return '';
        default:
            console.error('eroText fot found ' + eroId);
            return 'not found';
    }
}
function getNinshinTitle(n) {
    return 'Have I gained some weight?'.format(n);
    return '妊娠発覚%1回目'.format(n);
}
function getNinshinTitle2(n) {
    return 'Pregnancy Confirmed'.format(n);
}
function getSyusanTitle(eroId, n) {
    return 'Delivery'.format(n);
    return '出産%1回目'.format(n);
}
function getEroParamTitle(label) {
    switch (label) {
        case 'nakadashiTotal': return 'Creampies';
        case 'anal': return 'Anal SEX';
        case 'baisyun': return 'Prostitution';
        case 'dorei': return 'Enslaved';
        case 'defeat': return 'Rape';
        case 'bukkake': return 'Bukkake';
        case 'seiekiNomu': return 'Semen';
        case 'seiekiNakadashi': return 'Creampie Amount';
        case 'syusanHuman': return 'Births (Human)';
        case 'syusanMonster': return 'Births (Monster)';
        case 'fela': return 'Fellatio';
        case 'acme': return 'Climaxes';
    }
    return '';
}
function getEroStatusTitle(label) {
    switch (label) {
        case 'chitsu': return 'Pussy';
        case 'anal': return 'Anal';
        case 'kuchi': return 'Mouth';
        case 'chikubi': return 'Nipples';
        case 'defeat': return 'Rape';
        case 'syusanHuman': return 'Births (Human)';
        case 'syusanMonster': return 'Births (Monster)';
        case 'fela': return 'Fellatio';
    }
    return '';
}
