import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { CommentInstance } from '../../../models/Comment.model';

export const commentResolvers = {
  Comment: {
    user: (comment: CommentInstance, _args, { db }: { db: DbConnection }) => {
      return db.User.findById(comment.get('user'));
    },

    post: (comment: CommentInstance, _args, { db }: { db: DbConnection }) => {
      return db.Post.findById(comment.get('post'));
    }
  },

  Query: {
    commentsByPost: (
      _comment,
      { postId, first = 10, offset = 0 },
      { db }: { db: DbConnection }
    ) => {
      return db.Comment.findAll({
        where: { post: postId },
        limit: first,
        offset
      });
    }
  }
};
