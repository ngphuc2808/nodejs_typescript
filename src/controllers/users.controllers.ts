import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import usersService from '@/services/users.services'
import User from '@/models/schemas/User.schema'
import {
  IRegisterReqBody,
  ILoginReqBody,
  ILogoutReqBody,
  TokenPayload,
  IRefreshTokenReqBody
} from '@/models/requests/User.requests'
import { USERS_MESSAGES } from '@/constants/messages'

export const loginController = async (req: Request<object, object, ILoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login({ user_id: user_id.toString(), verify: user.verify })
  res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
  return
}

export const registerController = async (req: Request<object, object, IRegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
  return
}

export const logoutController = async (req: Request<object, object, ILogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  res.json({ message: USERS_MESSAGES.LOGOUT_SUCCESS, result })
  return
}

export const refreshTokenController = async (req: Request<object, object, IRefreshTokenReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const { user_id, verify, exp } = req.decoded_refresh_token as TokenPayload
  const result = await usersService.refreshToken({ user_id, refresh_token, verify, exp })
  res.json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
  return
}
