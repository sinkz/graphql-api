import * as Sequelize from "sequelize";
import { UserAtrributes } from './UserModel';
import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import { genSaltSync, hashSync, compareSync, getSalt } from 'bcryptjs';
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface UserAtrributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createAt?: string;
    updatedAt?: string;
}

//Utilizar métodos de instancia dos registros e acessar diretamente os atributos
export interface UserInstance extends Sequelize.Instance<UserAtrributes>, UserAtrributes{
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAtrributes> {
    
}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    //Primeiro atributo do define é o nome da model, segundo são os atributos que serão iseridos no banco
    const User: UserModel = 
        sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            photo: {
                type: DataTypes.BLOB({
                    length: 'long'
                }),
                allowNull: true,
                defaultValue: null
            }
        }, {
            tableName: 'users',
            hooks: {
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void =>{
                    //Criptografar a senha do usuario, por isso é necessário fazer antes de persistir na tabela
                    const salt = genSaltSync();
                    user.password = hashSync(user.password, salt);
                }
            }
        });

        //Usar prototipe quando é um método de instancia
        User.prototype.isPassword = (encodedPassword: string, password: string): boolean =>{
            return compareSync(password, encodedPassword)
        }

    return User;
};