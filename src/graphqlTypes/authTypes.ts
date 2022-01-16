import { IsEmail, MinLength, Validate } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'
import { EmailNotInUse } from '../services/validators/emailNotInUse'

@InputType()
export class RegisterUserInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @IsEmail({}, { message: 'Invalid email address' })
  @Validate(EmailNotInUse)
  @Field()
  email: string

  @Field()
  @MinLength(10, { message: 'Password must be at least 10 characters long' })
  password: string
}

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class LoginResponse {
  @Field()
  success: boolean
}
