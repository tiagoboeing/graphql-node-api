import { Transaction } from 'sequelize';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { PostInstance } from '../../../models/Post.model';
import { handleError } from '../../../utils/utils';

export const postResolvers = {
  Post: {
    author: (post: PostInstance, _args, { db }: { db: DbConnection }) => {
      return db.User.findById(post.get('author')).catch(handleError);
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
      }).catch(handleError);
    }
  },

  Query: {
    posts: (
      _post: PostInstance,
      { first = 10, offset = 0 },
      { db }: { db: DbConnection }
    ) => {
      return db.Post.findAll({ limit: first, offset }).catch(handleError);
    },

    post: (_post: PostInstance, { id }, { db }: { db: DbConnection }) => {
      id = parseInt(id);
      return db.Post.findById(id)
        .then((post: PostInstance) => {
          if (!post) throw new Error(`Post with id ${id} not found`);
          return post;
        })
        .catch(handleError);
    }
  },

  Mutation: {
    createPost: (
      _post: PostInstance,
      { input },
      { db }: { db: DbConnection }
    ) => {
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Post.create(input, { transaction: t });
        })
        .catch(handleError);
    },

    updatePost: (
      _post: PostInstance,
      { id, input },
      { db }: { db: DbConnection }
    ) => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Post.findById(id).then((post: PostInstance) => {
            if (!post) throw new Error(`Post with id ${id} not found`);
            return post.update(input, { transaction: t });
          });
        })
        .catch(handleError);
    },

    deletePost: (_post: PostInstance, { id }, { db }: { db: DbConnection }) => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Post.findById(id).then((post: PostInstance) => {
            if (!post) throw new Error(`Post with id ${id} not found`);
            return post.destroy({ transaction: t }).then((post: any) => !!post);
          });
        })
        .catch(handleError);
    }
  }
};
