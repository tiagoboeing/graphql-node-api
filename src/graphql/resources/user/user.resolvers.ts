import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/User.model';

export const userResolvers = {
  Query: {
    users: (
      parent,
      { first = 10, offset = 0 },
      { db }: { db: DbConnection },
      info: GraphQLResolveInfo
    ) => {
      return db.User.findAll({
        limit: first,
        offset
      });
    },

    user: (
      parent,
      { id }: any,
      { db }: { db: DbConnection },
      info: GraphQLResolveInfo
    ) => {
      return db.User.findById(id).then((user: UserInstance) => {
        if (!user) throw new Error(`User with id ${id} not found!`);
        return user;
      });
    }
  }
};
