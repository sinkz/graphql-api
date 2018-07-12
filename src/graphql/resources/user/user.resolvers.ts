import { GraphQLResolveInfo } from "graphql";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { UserInstance } from "../../../models/UserModel";
export const userResolvers = {
    Query: {
        //Resolver os campos da query de usuarios, { db }: { db: DbConnection } necessário para tipar o db
        //se usuario n passar o first ou offset recebe um valor padrão
        users: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                });
        },
        // o {} serve para desestruturizar um obj, no caso do db era pra ser o context.db
        user: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if (!user) throw new Error(`User with id ${id} not found!`)
                    return user;
                });
        }
    }

};