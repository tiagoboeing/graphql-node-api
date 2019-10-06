"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.express = express_1.default();
        this.middleware();
    }
    middleware() {
        this.express.use('/hello', (req, res, next) => {
            res.send({ hello: 'hello' });
        });
    }
}
exports.default = new App().express;
