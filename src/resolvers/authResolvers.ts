import { Context } from '../graphqlTypes/contextTypes'
import { compare } from 'bcryptjs'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../entity/User'
import { LoginInput, LoginResponse, RegisterUserInput } from '../graphqlTypes/authTypes'

@Resolver()
export class AuthResolvers {
  @Query(returns => String)
  helloWorld (): string { return 'hello test' }

  @Mutation(returns => LoginResponse)
  async registerUser (
    @Arg('input') userInput: RegisterUserInput,
    @Ctx() ctx: Context
  ): Promise<LoginResponse> {
    const user = new User()
    user.firstName = userInput.firstName
    user.lastName = userInput.lastName
    user.email = userInput.email
    user.password = userInput.password
    await user.save()

    ctx.req.session!.userId = user.id

    return { success: true }
  }

  @Mutation(returns => LoginResponse)
  async login (
    @Arg('input') { email, password }: LoginInput,
    @Ctx() ctx: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } })

    if (!user) throw new Error('Invalid email or password')

    const correctPasswordGiven = await compare(password, user.password)
    if (!correctPasswordGiven) throw new Error('Invalid email or password')

    ctx.req.session!.userId = user.id

    return await { success: true }
  }

  @Mutation(returns => LoginResponse)
  async logout (@Ctx() ctx: Context): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      ctx.req.session!.destroy(err => {
        if (err) {
          console.error(err)
          return reject(err)
        }

        ctx.res.clearCookie('qid')
        return resolve({ success: true })
      })
    })
  }
}
