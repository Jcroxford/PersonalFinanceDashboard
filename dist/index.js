"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var apollo_server_core_1 = require("apollo-server-core");
require("reflect-metadata");
// import { createConnection } from 'typeorm'
// import { User } from './entity/User'
require('dotenv').config();
// createConnection()
//   .then(async connection => {
//     console.log('Inserting a new user into the database...')
//     const user = new User()
//     user.firstName = 'Timber'
//     user.lastName = 'Saw'
//     user.age = 25
//     await connection.manager.save(user)
//     console.log('Saved a new user with id: ' + user.id)
//     console.log('Loading users from the database...')
//     const users = await connection.manager.find(User)
//     console.log('Loaded users: ', users)
//     console.log('Here you can setup and run express/koa/any other framework.')
//   }).catch(error => console.log(error))
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Book {\n    title: String\n    author: String\n  }\n\n  type Query {\n    books: [Book]\n  }\n"], ["\n  type Book {\n    title: String\n    author: String\n  }\n\n  type Query {\n    books: [Book]\n  }\n"])));
var books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin'
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster'
    }
];
var resolvers = {
    Query: {
        books: function () { return books; }
    }
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins: [
        (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()
    ]
});
server.listen({ port: 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at ".concat(url));
});
var templateObject_1;
//# sourceMappingURL=index.js.map