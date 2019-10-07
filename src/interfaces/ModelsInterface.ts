import { PostModel } from '../models/Post.model';
import { UserModel } from '../models/User.model';
import { CommentModel } from '../models/Comment.model';

export interface ModelsInterface {
  Post: PostModel;
  User: UserModel;
  Comment: CommentModel;
}
