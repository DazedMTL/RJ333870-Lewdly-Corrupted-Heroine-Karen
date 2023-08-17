var ERO_UP_MAP = {
    1: { eroPower: 50, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 149, ct: 0, at: 0 },
    53: { eroPower: 100, seieki: 50, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 123, anal: 0, chikubi: 0, kuchi: 0, ct: -17, at: 0 },
    824: { eroPower: 100, seieki: 50, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 183, anal: 0, chikubi: 0, kuchi: 0, ct: -17, at: 0 },
    3: { eroPower: 100, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 30, kuchi: 214, ct: 0, at: 0 },
    38: { eroPower: 100, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 74, kuchi: 210, ct: 0, at: 0 },
    34: { eroPower: 100, seieki: 20, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 312, anal: 0, chikubi: 157, kuchi: 0, ct: -7, at: 0 },
    834: { eroPower: 100, seieki: 20, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 312, anal: 0, chikubi: 157, kuchi: 0, ct: -7, at: 0 },
    37: { eroPower: 100, seieki: 20, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 312, anal: 0, chikubi: 122, kuchi: 0, ct: -7, at: 0 },
    51: { eroPower: 100, seieki: 20, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 312, anal: 0, chikubi: 157, kuchi: 0, ct: -7, at: 0 },
    5: { eroPower: 0, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: 0, at: 0 },
    98: { eroPower: 500, seieki: 150, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 250, anal: 0, chikubi: 0, kuchi: 0, ct: -12, at: 0 },
    7: { eroPower: 185, seieki: 0, acme: 0, analMin: 14, analMax: 24, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 421, chikubi: 0, kuchi: 0, ct: 0, at: -23 },
    4: { eroPower: 0, seieki: 0, acme: 0, analMin: 3, analMax: 4, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 121, anal: 0, chikubi: 120, kuchi: 0, ct: -8, at: -12 },
    44: { eroPower: 0, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: -12, at: 0 },
    45: { eroPower: 550, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 321, anal: 74, chikubi: 42, kuchi: 84, ct: -25, at: -3 },
    24: { eroPower: 350, seieki: 40, acme: 1, analMin: 5, analMax: 6, kissMin: 17, kissMax: 31, felaMin: 3, felaMax: 6, chitsu: 51, anal: 62, chikubi: 120, kuchi: 52, ct: -3, at: 0 },
    27: { eroPower: 0, seieki: 50, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: -10, at: 0 },
    8: { eroPower: 240, seieki: 0, acme: 1, analMin: 12, analMax: 21, kissMin: 36, kissMax: 73, felaMin: 5, felaMax: 12, chitsu: 635, anal: 125, chikubi: 26, kuchi: 63, ct: -12, at: -14 },
    23: { eroPower: 250, seieki: 0, acme: 1, analMin: 6, analMax: 8, kissMin: 12, kissMax: 24, felaMin: 3, felaMax: 6, chitsu: 83, anal: 19, chikubi: 98, kuchi: 64, ct: -13, at: 0 },
    9: { eroPower: 65, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 107, anal: 0, chikubi: 105, kuchi: 0, ct: -2, at: 0 },
    2: { eroPower: 150, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 183, anal: 0, chikubi: 50, kuchi: 0, ct: -26, at: -16 },
    25: { eroPower: 150, seieki: 50, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 104, anal: 43, chikubi: 68, kuchi: 0, ct: -38, at: 0 },
    47: { eroPower: 0, seieki: 40, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: -15, at: 0 },
    26: { eroPower: 150, seieki: 45, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: -12, at: 0 },
    46: { eroPower: 0, seieki: 0, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: -12, at: 0 },
    831: { eroPower: 0, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: -4, at: 0 },
    11: { eroPower: 75, seieki: 0, acme: 1, analMin: 2, analMax: 5, kissMin: 12, kissMax: 35, felaMin: 2, felaMax: 4, chitsu: 124, anal: 96, chikubi: 112, kuchi: 89, ct: -9, at: -14 },
    511: { eroPower: 75, seieki: 0, acme: 1, analMin: 2, analMax: 5, kissMin: 12, kissMax: 35, felaMin: 2, felaMax: 4, chitsu: 124, anal: 96, chikubi: 112, kuchi: 89, ct: -9, at: -14 },
    12: { eroPower: 55, seieki: 0, acme: 0, analMin: 1, analMax: 1, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 354, chikubi: 0, kuchi: 0, ct: 0, at: -30 },
    840: { eroPower: 55, seieki: 0, acme: 0, analMin: 1, analMax: 1, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 437, chikubi: 0, kuchi: 0, ct: 0, at: -40 },
    841: { eroPower: 55, seieki: 0, acme: 0, analMin: 1, analMax: 1, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 512, chikubi: 0, kuchi: 0, ct: 0, at: -40 },
    842: { eroPower: 55, seieki: 0, acme: 0, analMin: 1, analMax: 1, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 205, chikubi: 0, kuchi: 0, ct: 0, at: -40 },
    14: { eroPower: 80, seieki: 0, acme: 0, analMin: 12, analMax: 15, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 211, anal: 253, chikubi: 0, kuchi: 0, ct: -14, at: -22 },
    15: { eroPower: 75, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 137, anal: 0, chikubi: 60, kuchi: 0, ct: -4, at: 0 },
    13: { eroPower: 105, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 255, kuchi: 0, ct: 0, at: 0 },
    19: { eroPower: 150, seieki: 0, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: -9, at: 0 },
    49: { eroPower: 120, seieki: 80, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 176, anal: 0, chikubi: 0, kuchi: 0, ct: -10, at: 0 },
    16: { eroPower: 75, seieki: 45, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 42, anal: 0, chikubi: 75, kuchi: 43, ct: -8, at: 0 },
    42: { eroPower: 80, seieki: 80, acme: 1, analMin: 0, analMax: 0, kissMin: 2, kissMax: 5, felaMin: 1, felaMax: 2, chitsu: 0, anal: 0, chikubi: 15, kuchi: 97, ct: -5, at: 0 },
    43: { eroPower: 80, seieki: 80, acme: 1, analMin: 0, analMax: 0, kissMin: 3, kissMax: 5, felaMin: 1, felaMax: 2, chitsu: 0, anal: 0, chikubi: 32, kuchi: 120, ct: -5, at: 0 },
    838: { eroPower: 80, seieki: 80, acme: 1, analMin: 0, analMax: 0, kissMin: 3, kissMax: 5, felaMin: 1, felaMax: 2, chitsu: 0, anal: 0, chikubi: 32, kuchi: 120, ct: -5, at: 0 },
    17: { eroPower: 104, seieki: 0, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 121, anal: 0, chikubi: 0, kuchi: 0, ct: -12, at: 0 },
    18: { eroPower: 125, seieki: 80, acme: 1, analMin: 0, analMax: 0, kissMin: 2, kissMax: 3, felaMin: 0, felaMax: 0, chitsu: 36, anal: 0, chikubi: 53, kuchi: 34, ct: -7, at: 0 },
    21: { eroPower: 25, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 142, anal: 63, chikubi: 32, kuchi: 0, ct: 0, at: 0 },
    28: { eroPower: 0, seieki: 80, acme: 2, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: 0, at: 0 },
    41: { eroPower: 50, seieki: 46, acme: 1, analMin: 0, analMax: 2, kissMin: 4, kissMax: 10, felaMin: 2, felaMax: 5, chitsu: 0, anal: 0, chikubi: 55, kuchi: 0, ct: -3, at: 0 },
    29: { eroPower: 0, seieki: 80, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: 0, at: 0 },
    30: { eroPower: 120, seieki: 80, acme: 1, analMin: 0, analMax: 0, kissMin: 2, kissMax: 2, felaMin: 0, felaMax: 0, chitsu: 90, anal: 47, chikubi: 75, kuchi: 24, ct: -12, at: 0 },
    32: { eroPower: 140, seieki: 80, acme: 1, analMin: 0, analMax: 0, kissMin: 3, kissMax: 3, felaMin: 0, felaMax: 0, chitsu: 120, anal: 129, chikubi: 82, kuchi: 0, ct: -10, at: 0 },
    31: { eroPower: 120, seieki: 100, acme: 1, analMin: 0, analMax: 0, kissMin: 3, kissMax: 5, felaMin: 0, felaMax: 0, chitsu: 114, anal: 73, chikubi: 85, kuchi: 27, ct: -10, at: 0 },
    33: { eroPower: 120, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 1, felaMax: 1, chitsu: 0, anal: 0, chikubi: 79, kuchi: 267, ct: 0, at: 0 },
    39: { eroPower: 150, seieki: 56, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 264, anal: 0, chikubi: 76, kuchi: 0, ct: -8, at: 0 },
    22: { eroPower: 150, seieki: 75, acme: 16, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 224, anal: 0, chikubi: 83, kuchi: 41, ct: -8, at: 0 },
    35: { eroPower: 30, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 124, kuchi: 0, ct: 0, at: 0 },
    36: { eroPower: 125, seieki: 100, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: 0, at: 0 },
    538: { eroPower: 100, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 52, kuchi: 264, ct: 0, at: 0 },
    99: { eroPower: 150, seieki: 45, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 264, anal: 0, chikubi: 45, kuchi: 0, ct: -8, at: 0 },
    48: { eroPower: 120, seieki: 0, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 50, anal: 0, chikubi: 58, kuchi: 0, ct: 0, at: 0 },
    851: { eroPower: 50, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: 0, at: 0 },
    850: { eroPower: 0, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 100, kuchi: 0, ct: 0, at: 0 },
    853: { eroPower: 50, seieki: 0, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 205, kuchi: 0, ct: 0, at: 0 },
    202: { eroPower: 100, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 1, felaMax: 1, chitsu: 0, anal: 0, chikubi: 52, kuchi: 150, ct: 0, at: 0 },
    206: { eroPower: 100, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 3, felaMax: 3, chitsu: 0, anal: 0, chikubi: 32, kuchi: 150, ct: 0, at: 0 },
    203: { eroPower: 125, seieki: 50, acme: 1, analMin: 0, analMax: 0, kissMin: 3, kissMax: 5, felaMin: 0, felaMax: 0, chitsu: 123, anal: 0, chikubi: 120, kuchi: 37, ct: -17, at: 0 },
    204: { eroPower: 150, seieki: 50, acme: 1, analMin: 0, analMax: 0, kissMin: 3, kissMax: 5, felaMin: 0, felaMax: 0, chitsu: 123, anal: 0, chikubi: 0, kuchi: 50, ct: -17, at: 0 },
    829: { eroPower: 150, seieki: 50, acme: 1, analMin: 0, analMax: 0, kissMin: 3, kissMax: 5, felaMin: 0, felaMax: 0, chitsu: 123, anal: 0, chikubi: 0, kuchi: 50, ct: -17, at: 0 },
    205: { eroPower: 150, seieki: 50, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 143, anal: 0, chikubi: 0, kuchi: 0, ct: -19, at: 0 },
    209: { eroPower: 125, seieki: 50, acme: 1, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 123, anal: 0, chikubi: 0, kuchi: 0, ct: -17, at: 0 },
    301: { eroPower: 0, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: 0, at: 0 },
    302: { eroPower: 0, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: 0, at: 0 },
    303: { eroPower: 0, seieki: 100, acme: 0, analMin: 0, analMax: 0, kissMin: 0, kissMax: 0, felaMin: 0, felaMax: 0, chitsu: 0, anal: 0, chikubi: 0, kuchi: 0, ct: 0, at: 0 },
};
function createEroUpText(eroId) {
    var map = ERO_UP_MAP[eroId];
    var ero = $gameSystem.getEro(1);
    var actor = $gameActors.mainActor();
    actor.plusEroPower(map['eroPower']);
    if (map['seieki'] > 0) {
        var value = map['seieki'];
        $gameParty.gainEther(value);
    }
    if (map['chitsu'] > 0) {
        var value = map['chitsu'];
        ero.chitsuStatus += value;
    }
    if (map['anal'] > 0) {
        var value = map['anal'];
        ero.analStatus += value * 2;
    }
    if (map['chikubi'] > 0) {
        var value = map['chikubi'];
        ero.chikubiStatus += value * 2;
    }
    if (map['kuchi'] > 0) {
        var value = map['kuchi'];
        ero.kuchiStatus += value * 2;
    }
    if (map['ct'] != 0) {
        var value = map['ct'];
        ero.chitsuTightening += value;
    }
    if (map['at'] != 0) {
        var value = map['at'];
        ero.analTightening += value;
    }
}
var KUCHI_LV = {
    'G': "I haven't used it much for sexual things",
    'F': "I don't dislike it that much",
    'E': "French kissing is also okay",
    'D': "I can also drink the other person's saliva",
    'C': "I love kissing",
    'B': "Just kissing makes me feel naughty",
    'A': "Please French kiss me!",
};
var CHIKUBI_LV = {
    'G': "Nipples are embarrassing to be seen",
    'F': "It feels weird when touched...",
    'E': "It feels good when my nipples are played with",
    'D': "I even play with my own nipples",
    'C': "Nipples are one of my erogenous zones",
    'B': "I learn to have nipple orgasms",
    'A': "Nipples are the second clitoris",
};
var CHITSU_LV = {
    'G': "A beautiful vagina that looks like a clean shell",
    'F': "A rarely used, clean vagina",
    'E': "It's starting to get experienced. A regular woman's vagina",
    'D': "Well-used, with the labia majora opening up",
    'C': "Starting to deform, visibly showing signs of use",
    'B': "Saggy labia majora that have also darkened",
    'A': "Overused to the point of becoming grotesque and unattractive",
};
var ANAL_LV = {
    'G': "I still can't derive pleasure from my butt",
    'F': "It feels strange and foreign when penetrated, but not necessarily unpleasant",
    'E': "The anal hole might feel good too",
    'D': "I learn to have anal orgasms", 
  	'C': "Actively serving as a second vagina", 
  	'B': "I love anal orgasms", 
  	'A': "My anus is so sensitive it drives me crazy"
};
var CHITSU_TIGHTENING = {
    '1': "Tightness is the best, top-notch vagina",
    '2': "Tight vagina",
    '3': "Average tightness of the vagina. Neither good nor bad",
    '4': "Loose vagina. It's disappointing when a pretty face has a loose one",
    '5': "Very loose vagina. Ejaculation is difficult due to its looseness...",
};
var ANAL_TIGHTENING = {
    '1': "Tight asshole, just like brand new",
    '2': "Tightly clenched anus",
    '3': "Average tightness of the anus. Neither good nor bad",
    '4': "Loose anus. The penis easily goes in and out",
  	'5': "Very loose anus. It expands even during normal times"
};
