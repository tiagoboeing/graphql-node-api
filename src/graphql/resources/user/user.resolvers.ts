import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/User.model';

export const userResolvers = {
  Query: {
    users: (
      parent: any,
      { first = 10, offset = 0 }: any,
      { db }: { db: DbConnection | any },
      info: GraphQLResolveInfo
    ) => {
      return db.User.findAll({
        limit: first,
        offset
      });
    },

    user: (
      parent: any,
      { id }: any,
      { db }: { db: DbConnection | any },
      info: GraphQLResolveInfo
    ) => {
      return db.User.findById(id).then((user: UserInstance) => {
        if (!user) throw new Error(`User with id ${id} not found!`);
        return user;
      });
    }
  }
};
