import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchemaSync } from 'type-graphql'
import { createConnection } from 'typeorm'
import express from 'express'
import session from 'express-session'
import 'reflect-metadata'

import { AuthResolvers } from './resolvers/authResolvers'
import { UserResolvers } from './resolvers/userResolvers'
import { verifiyAuthorized } from './middleware/requireAuth'

require('dotenv').config()

const app = express()

app.use(
  session({
    store: new (require('connect-pg-simple')(session))({
      createTableIfMissing: true,
      conObject: {
        user: 'postgres',
        password: '',
        host: 'localhost',
        port: 5432,
        database: 'PersonalFinanceDashboard'
      }
    }),
    secret: process.env.SESSION_SECRET as string,
    name: 'qid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 10 * 365 // default 10 years
    }
  })
)

createConnection()
  .then(async connection => {
    console.log('\nserver connected to database successfully')

    const apolloServer = new ApolloServer({
      schema: buildSchemaSync({
        resolvers: [
          AuthResolvers,
          UserResolvers
        ],
        authChecker: verifiyAuthorized
      }),
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
      ],
      context: ({ req, res }) => ({ req, res }),
      debug: process.env.NODE_ENV === 'development'
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    app.listen({ port: process.env.PORT }, () => {
      console.log(`🚀  Server ready at http://localhost:${process.env.PORT}`)
    })
  })
  .catch(console.error)

// todo
/**
 * setup auth
 * reset password with current password mutation
 * reset forgotten password
 * change db config to url? for typeorm and pg simple session
 * change validation error style to match unautheorized error style
 */
