import { checkSchema } from 'express-validator'

import { validate } from '@/utils/validation'
import {
  accessTokenSchema,
  confirmPasswordSchema,
  dateOfBirthSchema,
  emailLoginSchema,
  emailRegisterSchema,
  nameSchema,
  passwordSchema,
  refreshTokenSchema
} from '@/middlewares/users/users.validate'

export const loginValidator = validate(
  checkSchema(
    {
      email: emailLoginSchema,
      password: passwordSchema
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      email: emailRegisterSchema,
      password: passwordSchema,
      confirm_password: confirmPasswordSchema,
      date_of_birth: dateOfBirthSchema
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: accessTokenSchema
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: refreshTokenSchema
    },
    ['body']
  )
)
