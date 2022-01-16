import { ApolloError } from 'apollo-server-core'
import { AuthChecker } from 'type-graphql'
import { Context } from '../graphqlTypes/contextTypes'

export const verifiyAuthorized: AuthChecker<Context> = async function ({ context }) {
  if (!context.req.session!.userId) throw new ApolloError('Unauthorized')

  return true
}
