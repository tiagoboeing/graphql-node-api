import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import {
  CreateOptions,
  DataTypeAbstract,
  Model,
  Sequelize,
  STRING
} from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface UserAttributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
}

export interface UserInstance extends Model<UserAttributes> {
  isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel
  extends BaseModelInterface,
    Model<UserInstance, UserAttributes> {}

export default (
  sequelize: Sequelize,
  _DataTypes: DataTypeAbstract
): UserModel => {
  const user = (<UserAttributes>sequelize.define(
    'User',
    {
      id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataType.STRING(128),
        allowNull: false
      },
      email: {
        type: DataType.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      photo: {
        type: DataType.BLOB({ length: 'long' }),
        allowNull: true,
        defaultValue: null
      }
    },
    {
      tableName: 'users',
      hooks: {
        beforeCreate: (
          user: UserInstance | any,
          _options: CreateOptions
        ): void => {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt);
        }
      }
    }
  )) as UserModel;

  user.prototype.isPassword = (
    encodedPassword: string,
    password: string
  ): boolean => compareSync(password, encodedPassword);

  return user;
};
