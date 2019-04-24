const BattleShipController = require('../../app/modules/battle-ship');

class BattleShipRoutes {
    attachRoutes(router) {
        router.post("/start-battle-ship-game", this.startBattleShipGame);
    }

    async startBattleShipGame(req, res) {
        const battleShipController = new BattleShipController();
        res.send(await battleShipController.startBattleShipGame(req));
    }
}

module.exports = BattleShipRoutes;