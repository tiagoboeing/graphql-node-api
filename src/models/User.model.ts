import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import {
  BLOB,
  CreateOptions,
  DataTypeAbstract,
  INTEGER,
  Model,
  Sequelize,
  STRING
} from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface UserAttributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
}

export interface UserInstance extends Sequelize, UserAttributes {
  isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel
  extends BaseModelInterface,
    Model<UserInstance, UserAttributes> {}

export default (
  sequelize: Sequelize,
  DataTypes: DataTypeAbstract
): UserModel => {
  const user = <UserModel>(<UserAttributes>sequelize.define(
    'User',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(128),
        allowNull: false
      },
      email: {
        type: STRING(128),
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
        type: BLOB({ length: 'long' }),
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
  ));

  user.prototype.isPassword = (
    encodedPassword: string,
    password: string
  ): boolean => compareSync(password, encodedPassword);

  return user;
};
