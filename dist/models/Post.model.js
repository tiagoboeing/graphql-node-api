"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
exports.default = (sequelize, _DataTypes) => {
    const post = sequelize.define('Post', {
        id: {
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        },
        content: {
            type: sequelize_typescript_1.DataType.TEXT,
            allowNull: false
        },
        photo: {
            type: sequelize_typescript_1.DataType.BLOB({ length: 'long' }),
            allowNull: false
        }
    }, {
        tableName: 'posts'
    });
    post.associate = (models) => {
        sequelize_typescript_1.BelongsTo(models.Post.prototype, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        });
    };
    return post;
};
