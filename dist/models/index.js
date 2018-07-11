"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
let env = process.env.NODE_ENV.trim() || 'development';
//Pega a config que queremos a partir do env
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;
console.log(config);
if (!db) {
    db = {};
    const operatorsAliases = false;
    config = Object.assign({ operatorsAliases }, config);
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    //Necessário para ler nossos models
    fs
        .readdirSync(__dirname)
        .filter((file) => {
        //Arquivo n pode começar com ponto, n pode ser igual nosso index e tem que terminar com .js
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
        .forEach((file) => {
        //Dessa forma a gente importa um model pronto do sequelize, pra conseguir acessar ele posteriormente
        const model = sequelize.import(path.join(__dirname, file));
        //estamos fazendo isso db.User = model
        db[model['name']] = model; //Ex User, Post
    });
    Object.keys(db).forEach((modelName) => {
        //Verifica se tem o associate, ou seja, se tem relação. Se tiver a gente chama e passa os models que são os associados
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    //Serve pra sincronizar o sequelize e o msysql
    db['sequelize'] = sequelize;
}
exports.default = db;
