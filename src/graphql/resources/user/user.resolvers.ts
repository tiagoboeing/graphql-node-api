import { Transaction } from 'sequelize';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/User.model';
import { handleError } from '../../../utils/utils';

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
      }).catch(handleError);
    }
  },

  Query: {
    users: (
      _parent,
      { first = 10, offset = 0 },
      { db }: { db: DbConnection }
    ) => {
      return db.User.findAll({
        limit: first,
        offset
      }).catch(handleError);
    },

    user: (_parent, { id }: any, { db }: { db: DbConnection }) => {
      id = parseInt(id);
      return db.User.findById(id)
        .then((user: UserInstance) => {
          if (!user) throw new Error(`User with id ${id} not found!`);
          return user;
        })
        .catch(handleError);
    }
  },

  Mutation: {
    createUser: (_parent, { input }, { db }: { db: DbConnection }) => {
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.User.create(input, { transaction: t });
        })
        .catch(handleError);
    },

    updateUser: (_parent, { id, input }, { db }: { db: DbConnection }) => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.User.findById(id).then((user: UserInstance) => {
            if (!user) throw new Error(`User with id ${id} not found!`);

            return user.update(input, { transaction: t });
          });
        })
        .catch(handleError);
    },

    updateUserPassword: (
      _parent,
      { id, input },
      { db }: { db: DbConnection }
    ) => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.User.findById(id).then((user: UserInstance) => {
            if (!user) throw new Error(`User with id ${id} not found!`);

            return user
              .update(input, { transaction: t })
              .then((user: UserInstance) => !!user);
          });
        })
        .catch(handleError);
    },

    deleteUser: (_parent, { id }, { db }: { db: DbConnection }) => {
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.User.findById(id).then((user: UserInstance) => {
            if (!user) throw new Error(`User with id ${id} not found!`);
            return user.destroy({ transaction: t }).then((user: any) => !!user);
          });
        })
        .catch(handleError);
    }
  }
};
