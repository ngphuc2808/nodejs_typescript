import { Router } from 'express'

import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '@/middlewares/users/users.middlewares'
import { loginController, logoutController, registerController } from '@/controllers/users.controllers'
import { wrapRequestHandler } from '@/utils/handlers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

export default usersRouter
