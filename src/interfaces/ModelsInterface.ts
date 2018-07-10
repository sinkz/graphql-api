import { CommentModel } from './../models/CommentModel';
import { UserModel } from './../models/UserModel';
import { PostModel } from './../models/PostModel';

//Colocar todos os models aqui
export interface ModelsInterface {
    Comment: CommentModel
    Post: PostModel;
    User: UserModel;

}