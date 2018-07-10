import { makeExecutableSchema } from 'graphql-tools';

const users: any[] = [
    {
        id: 1,
        name: 'Diego Augusto',
        email: 'diih_augusto2@live.com'
    },
    {
        id: 2,
        name: 'Giovana',
        email: 'giovana@hotmai2l.com'
    }
]
const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query{
        allUsers: [User!]!
    }

    type Mutation {
        createUser(name: String!, email: String!): User
    }
`;

const resolvers = {
    //Resolver trivial (n é obrigatório pos user ja existe)
    User: {
        id: (user) => user.id,
        name: (user) => user.name,
        email: (user) => user.email
        
    },
    Query: {
        allUsers: () => users
    },
    Mutation: {
        createUser: (parent, args) => {
            const newUser = Object.assign({id: users.length + 1}, args);
            users.push(newUser);
            return newUser;
        }
    },
}

//mapeia os tipos e resolvers
export default makeExecutableSchema({typeDefs, resolvers})