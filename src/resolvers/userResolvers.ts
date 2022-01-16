import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { User } from '../entity/User'
import { Context } from '../graphqlTypes/contextTypes'

@Resolver()
export class UserResolvers {
  @Query(returns => User)
  @Authorized()
  user (@Ctx() ctx: Context): Promise<User | undefined> {
    return User.findOne(ctx.req.session!.userId)
  }
}
