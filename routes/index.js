const BattleShipRoutes = require('./battle-ship/index');

class AppRouter {
    constructor() {
        this.battleShipRoutes = new BattleShipRoutes();
    }

    attachRoutes(router) {
        this.battleShipRoutes.attachRoutes(router);
    }
}

module.exports = AppRouter;