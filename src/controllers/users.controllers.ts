import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import usersService from '@/services/users.services'
import User from '@/models/schemas/User.schema'
import { IRegisterReqBody, ILoginReqBody, ILogoutReqBody } from '@/models/requests/User.requests'
import { USERS_MESSAGES } from '@/constants/messages'

export const loginController = async (req: Request<{}, {}, ILoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  res.json({ message: USERS_MESSAGES.LOGIN_SUCCESS, result })
  return
}

export const registerController = async (req: Request<{}, {}, IRegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  res.json({ message: USERS_MESSAGES.REGISTER_SUCCESS, result })
  return
}

export const logoutController = async (req: Request<{}, {}, ILogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  res.json({ message: USERS_MESSAGES.LOGOUT_SUCCESS, result })
  return
}
