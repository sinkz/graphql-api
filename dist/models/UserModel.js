"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
exports.default = (sequelize, DataTypes) => {
    //Primeiro atributo do define é o nome da model, segundo são os atributos que serão iseridos no banco
    const User = sequelize.define('User', {
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
            beforeCreate: (user, options) => {
                //Criptografar a senha do usuario, por isso é necessário fazer antes de persistir na tabela
                const salt = bcryptjs_1.genSaltSync();
                user.password = bcryptjs_1.hashSync(user.password, salt);
            }
        }
    });
    //Usar prototipe quando é um método de instancia
    User.prototype.isPassword = (encodedPassword, password) => {
        return bcryptjs_1.compareSync(password, encodedPassword);
    };
    return User;
};
