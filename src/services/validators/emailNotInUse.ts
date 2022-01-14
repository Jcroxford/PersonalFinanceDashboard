import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { User } from '../../entity/User'

@ValidatorConstraint({ name: 'emailInUse' })
export class EmailNotInUse implements ValidatorConstraintInterface {
  async validate (email: string, args: ValidationArguments): Promise<boolean> {
    console.log('start validate')

    const users = await User.find({ where: { email } })
    console.log('users: ', users)
    return !users.length
  }

  defaultMessage () {
    return 'An account with this email already exists'
  }
}
