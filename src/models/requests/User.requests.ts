import { JwtPayload } from 'jsonwebtoken'

import { TokenType, UserVerifyStatus } from '@/constants/enums'

export interface ILoginReqBody {
  email: string
  password: string
}

export interface IRegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: Date
}

export interface ILogoutReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}
