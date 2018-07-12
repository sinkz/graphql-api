"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = {
    Query: {
        //Resolver os campos da query de usuarios, { db }: { db: DbConnection } necessário para tipar o db
        //se usuario n passar o first ou offset recebe um valor padrão
        users: (parent, { first = 10, offset = 0 }, { db }, info) => {
            return db.User
                .findAll({
                limit: first,
                offset: offset
            });
        },
        // o {} serve para desestruturizar um obj, no caso do db era pra ser o context.db
        user: (parent, { id }, { db }, info) => {
            return db.User
                .findById(id)
                .then((user) => {
                if (!user)
                    throw new Error(`User with id ${id} not found!`);
                return user;
            });
        }
    }
};
