"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
exports.default = (sequelize, _DataTypes) => {
    const comment = sequelize.define('Comment', {
        id: {
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: sequelize_typescript_1.DataType.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'comments'
    });
    comment.associate = (models) => {
        sequelize_typescript_1.BelongsTo(models.Post.prototype, {
            foreignKey: {
                allowNull: false,
                field: 'post',
                name: 'post'
            }
        });
        sequelize_typescript_1.BelongsTo(models.User.prototype, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };
    return comment;
};
