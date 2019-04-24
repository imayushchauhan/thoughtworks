const Express = require('express');
const Config = require('config');
const Router = require('router');
const BodyParser = require('body-parser');
const AppRouter = require('../routes');

class App {
    constructor() {
        this.app = Express();
        this.app.use(BodyParser.text());
        this.router = Router();
        this.app.use(this.router);
        this.env = process.env.NODE_ENV || 'development';
        this.port = Config.get(this.env + '.appConfig.port');
    }

    async startServer() {
        await this.app.listen(this.port, () => console.log(`App listening on port ${this.port}!!!`))
    }

    attachRoutes() {
        let appRouter = new AppRouter();
        appRouter.attachRoutes(this.router);
    }
}

module.exports = App;