import { GraphQLResolveInfo } from 'graphql';
import { PostInstance } from '../../../models/Post.model';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';

export const postResolvers = {
  Post: {
    author: (post: PostInstance, args, { db }: { db: DbConnection }) => {
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
      post: PostInstance,
      { first = 10, offset = 0 },
      { db }: { db: DbConnection }
    ) => {
      return db.Post.findAll({ limit: first, offset });
    },

    post: (post: PostInstance, { id }, { db }: { db: DbConnection }) => {
      return db.Post.findById(id).then((post: PostInstance) => {
        if (!post) throw new Error(`Post with id ${id} not found`);
        return post;
      });
    }
  }
};
