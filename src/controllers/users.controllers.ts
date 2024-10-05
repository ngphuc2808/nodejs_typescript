import { Request, Response } from 'express'

import usersService from '@/services/users.services'
import { IRegisterReqBody } from '@/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'admin' && password === 'admin') {
    res.status(200).json({ message: 'Login successful' })
  } else {
    res.status(400).json({ message: 'Login failed' })
  }
}

export const registerController = async (req: Request<{}, {}, IRegisterReqBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    res.json({ message: 'Register success', result })
    return
  } catch (error) {
    res.status(400).json({ message: 'Register failed' })
    return
  }
}
