import * as Sequelize from "sequelize";
import { UserAtrributes } from './UserModel';
import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import { genSaltSync, hashSync, compareSync, getSalt } from 'bcryptjs';
//import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface UserAtrributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createAt?: string;
    updatedAt?: string;
}

//Utilizar métodos de instancia dos registros e acessar diretamente os atributos, fazer pesquisa por esse cara pro save/delete/update/retrieve
export interface UserInstance extends Sequelize.Instance<UserAtrributes>, UserAtrributes {
    //Primeiro parametro é o password que ja existe o outro é o password que o usuario informa, o método verifica se o password está batendo com o que existe
    isPassword(encodedPassword: string, password: string): boolean;
}

//Interface para trabalhar com os métodos do model em si
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
                //Hooks são triggers, no sequelize são eventos de ciclo de vida, usar de acordo com o que precisar, no caso do create ele ira fazer algo antes da criação
                hooks: {
                    beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                        //Criptografar a senha do usuario, por isso é necessário fazer antes de persistir na tabela
                        const salt = genSaltSync();
                        user.password = hashSync(user.password, salt);
                    }
                }
            });
    //Fazer relação/associacao
    // User.associate = (models: ModelsInterface):void => {};

    //Usar prototipe quando é um método de instancia, vai servir para comparar os passwords, por isso precisa ser método de instância
    User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
        return compareSync(password, encodedPassword)
    }

    return User;
};