import { DataTypeAbstract, Model, Sequelize } from 'sequelize';
import { BelongsTo, DataType } from 'sequelize-typescript';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface CommentAttributes {
  id?: string;
  post?: number;
  user?: number;
  createdAt?: string;
  updateAt?: string;
}

export interface CommentInstance extends Model<CommentAttributes> {}

export interface CommentModel
  extends BaseModelInterface,
    Model<CommentInstance, CommentAttributes> {}

export default (
  sequelize: Sequelize,
  _DataTypes: DataTypeAbstract
): CommentModel => {
  const comment: any = (<CommentAttributes>sequelize.define(
    'Post',
    {
      id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataType.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'comments'
    }
  )) as CommentModel;

  comment.associate = (models: ModelsInterface): void => {
    BelongsTo(models.Post.prototype, {
      foreignKey: {
        allowNull: false,
        field: 'post',
        name: 'post'
      }
    });

    BelongsTo(models.User.prototype, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user'
      }
    });
  };

  return comment;
};
