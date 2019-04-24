const BattleShipBLManager = require('./bl-manager');

class BattleShipController {
    async startBattleShipGame(req) {
        const battleShipBLManager = new BattleShipBLManager();
        return await battleShipBLManager.startBattleShipGame(req.body);
    }
}

module.exports = BattleShipController;