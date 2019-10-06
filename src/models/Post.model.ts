import { DataTypeAbstract, Model, Sequelize } from 'sequelize';
import { DataType, BelongsTo } from 'sequelize-typescript';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface PostAttributes {
  id?: number;
  title?: string;
  content?: string;
  photo?: string;
  author?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostInstance extends Model<PostAttributes> {}

export interface PostModel
  extends BaseModelInterface,
    Model<PostInstance, PostAttributes> {}

export default (
  sequelize: Sequelize,
  _DataTypes: DataTypeAbstract
): PostModel => {
  const post: any = (<PostAttributes>sequelize.define(
    'Post',
    {
      id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataType.STRING,
        allowNull: false
      },
      content: {
        type: DataType.TEXT,
        allowNull: false
      },
      photo: {
        type: DataType.BLOB({ length: 'long' }),
        allowNull: false
      }
    },
    {
      tableName: 'posts'
    }
  )) as PostModel;

  post.associate = (models: ModelsInterface): void => {
    BelongsTo(models.Post.prototype, {
      foreignKey: {
        allowNull: false,
        field: 'author',
        name: 'author'
      }
    });
  };

  return post;
};
