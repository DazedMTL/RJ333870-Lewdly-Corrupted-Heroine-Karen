var Nore;
(function (Nore) {
    function calcBaisyunPrice() {
        var price = 500;
        var actor = $gameActors.mainActor();
        var ero = $gameSystem.getEro(1);
        price += ero.chitsuTightening * 10;
        price += ero.analTightening * 10;
        price -= ero.keikenTotal();
        price = Math.max(price, 1000);
        if ($gameParty.hasItem($dataArmors[918])) {
            price *= 1.5;
        }
        $gameVariables.setValue(64, Math.round(price));
    }
    Nore.calcBaisyunPrice = calcBaisyunPrice;
})(Nore || (Nore = {}));
