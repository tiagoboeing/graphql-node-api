import { GraphQLResolveInfo } from 'graphql';
import { DbConnection } from '../../../interfaces/DbConnectionInterface';
import { CommentInstance } from '../../../models/Comment.model';
import { Transaction } from 'sequelize';
import { UserInstance } from '../../../models/User.model';
import { handleError } from '../../../utils/utils';

export const commentResolvers = {
  Comment: {
    user: (comment: CommentInstance, _args, { db }: { db: DbConnection }) => {
      return db.User.findById(comment.get('user')).catch(handleError);
    },

    post: (comment: CommentInstance, _args, { db }: { db: DbConnection }) => {
      return db.Post.findById(comment.get('post')).catch(handleError);
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
      }).catch(handleError);
    }
  },

  Mutation: {
    createComment: (_comment, { input }, { db }: { db: DbConnection }) => {
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.create(input, { transaction: t });
        })
        .catch(handleError);
    },

    updateComment: (_comment, { id, input }, { db }: { db: DbConnection }) => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.findById(id).then((comment: UserInstance) => {
            if (!comment) throw new Error(`Comment with id ${id} not found`);
            return comment.update(input, { transaction: t });
          });
        })
        .catch(handleError);
    },

    deleteComment: (_comment, { id }, { db }: { db: DbConnection }) => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.findById(id).then((comment: UserInstance) => {
            if (!comment) throw new Error(`Comment with id ${id} not found`);
            return comment
              .destroy({ transaction: t })
              .then((comment: any) => !!comment);
          });
        })
        .catch(handleError);
    }
  }
};
