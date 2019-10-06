"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const sequelize_typescript_1 = require("sequelize-typescript");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;
if (!db) {
    db = {};
    const sequelize = new sequelize_typescript_1.Sequelize(config.database, config.username, config.password, config);
    fs.readdirSync(__dirname)
        .filter((file) => (file.indexOf('.') !== 0 && file !== basename && file.slice(-3)) ===
        '.js')
        .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model['name']] = model;
    });
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate)
            db[modelName].associate(db);
    });
}
exports.default = db;
