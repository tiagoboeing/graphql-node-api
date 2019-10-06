"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id: {
            type: sequelize_1.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize_1.STRING(128),
            allowNull: false
        },
        email: {
            type: sequelize_1.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: sequelize_1.BLOB({ length: 'long' }),
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'users',
        hooks: {
            beforeCreate: (user, _options) => {
                const salt = bcryptjs_1.genSaltSync();
                user.password = bcryptjs_1.hashSync(user.password, salt);
            }
        }
    });
    user.prototype.isPassword = (encodedPassword, password) => bcryptjs_1.compareSync(password, encodedPassword);
    return user;
};
