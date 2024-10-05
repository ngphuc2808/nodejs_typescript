import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'

import usersService from '@/services/users.services'
import { USERS_MESSAGES } from '@/constants/messages'
import { validate } from '@/utils/validation'
import {
  confirmPasswordSchema,
  dateOfBirthSchema,
  nameSchema,
  passwordSchema
} from '@/middlewares/users/users.validate'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ message: 'Username or password is missing' })
    return
  }
  next()
}

export const registerValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      email: {
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await usersService.checkEmailExist(value)
            if (isExistEmail) {
              throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
            }
            return true
          }
        }
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema,
      date_of_birth: dateOfBirthSchema
    },
    ['body']
  )
)
