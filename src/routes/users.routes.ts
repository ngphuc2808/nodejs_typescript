import { Router } from 'express'

import { loginValidator, registerValidator } from '@/middlewares/users/users.middlewares'
import { loginController, registerController } from '@/controllers/users.controllers'
import { wrapRequestHandler } from '@/utils/handlers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRouter
