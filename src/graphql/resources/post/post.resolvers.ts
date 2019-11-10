import { GraphQLResolveInfo } from 'graphql';
import { PostInstance } from '../../../models/Post.model';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { Transaction } from 'sequelize';

export const postResolvers = {
  Post: {
    author: (post: PostInstance, _args, { db }: { db: DbConnection }) => {
      return db.User.findById(post.get('author'));
    },

    comments: (
      post: PostInstance,
      { first = 10, offset = 0 },
      { db }: { db: DbConnection }
    ) => {
      return db.Comment.findAll({
        where: { post: post.get('id') },
        limit: first,
        offset
      });
    }
  },

  Query: {
    posts: (
      _post: PostInstance,
      { first = 10, offset = 0 },
      { db }: { db: DbConnection }
    ) => {
      return db.Post.findAll({ limit: first, offset });
    },

    post: (_post: PostInstance, { id }, { db }: { db: DbConnection }) => {
      return db.Post.findById(id).then((post: PostInstance) => {
        if (!post) throw new Error(`Post with id ${id} not found`);
        return post;
      });
    }
  },

  Mutation: {
    createPost: (
      _post: PostInstance,
      { input },
      { db }: { db: DbConnection }
    ) => {
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post.create(input, { transaction: t });
      });
    },

    updatePost: (
      _post: PostInstance,
      { id, input },
      { db }: { db: DbConnection }
    ) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post.findById(id).then((post: PostInstance) => {
          if (!post) throw new Error(`Post with id ${id} not found`);
          return post.update(input, { transaction: t });
        });
      });
    },

    deletePost: (_post: PostInstance, { id }, { db }: { db: DbConnection }) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post.findById(id).then((post: PostInstance) => {
          if (!post) throw new Error(`Post with id ${id} not found`);
          return post.destroy({ transaction: t }).then((post: any) => !!post);
        });
      });
    }
  }
};
