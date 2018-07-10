import * as Sequelize from "sequelize";
import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import { PostModel } from './PostModel';
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface PostAttributes {
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number;
    createAt?: string;
    updatedAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes> { };

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttributes> { };

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {
    const Post: PostModel = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: false
        }
    }, {
            tableName: 'posts'
        });

    Post.associate = (models: ModelsInterface): void => {
        //Um Post pertence á um usuario
        Post.belongsTo(models.User, {
            //Configurar chave estrangeira
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        });
    };
    return Post;
};