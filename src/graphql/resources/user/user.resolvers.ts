import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/User.model';
import { Transaction } from 'sequelize';

export const userResolvers = {
  User: {
    posts: (
      user: UserInstance,
      { first = 10, offset = 0 },
      { db }: { db: DbConnection }
    ) => {
      return db.Post.findAll({
        where: { author: user.get('id') },
        limit: first,
        offset
      });
    }
  },

  Query: {
    users: (
      parent,
      { first = 10, offset = 0 },
      { db }: { db: DbConnection }
    ) => {
      return db.User.findAll({
        limit: first,
        offset
      });
    },

    user: (parent, { id }: any, { db }: { db: DbConnection }) => {
      return db.User.findById(id).then((user: UserInstance) => {
        if (!user) throw new Error(`User with id ${id} not found!`);
        return user;
      });
    }
  },

  Mutation: {
    createUser: (parent, { input }, { db }: { db: DbConnection }) => {
      return db.sequelize.transaction((t: Transaction) => {
        return db.User.create(input, { transaction: t });
      });
    },

    updateUser: (parent, { id, input }, { db }: { db: DbConnection }) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.User.findById(id).then((user: UserInstance) => {
          if (!user) throw new Error(`User with id ${id} not found!`);

          return user.update(input, { transaction: t });
        });
      });
    },

    updateUserPassword: (
      parent,
      { id, input },
      { db }: { db: DbConnection }
    ) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.User.findById(id).then((user: UserInstance) => {
          if (!user) throw new Error(`User with id ${id} not found!`);

          return user
            .update(input, { transaction: t })
            .then((user: UserInstance) => !!user);
        });
      });
    },

    deleteUser: (parent, { id, input }, { db }: { db: DbConnection }) => {
      return db.sequelize.transaction((t: Transaction) => {
        return db.User.findById(id).then((user: UserInstance) => {
          if (!user) throw new Error(`User with id ${id} not found!`);
          return user.destroy({ transaction: t }).then((user: any) => !!user);
        });
      });
    }
  }
};
