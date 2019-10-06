"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const schema_1 = __importDefault(require("./graphql/schema"));
class App {
    constructor() {
        this.express = express_1.default();
        this.middleware();
    }
    middleware() {
        this.express.use('/graphql', express_graphql_1.default({ schema: schema_1.default, graphiql: process.env.NODE_ENV === 'development' }));
    }
}
exports.default = new App().express;
