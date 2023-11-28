import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { upsertUserByAuth } from '../services/userService'
import { validateToken } from '../lib/firebase/auth'

export const withAuthValidation = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const headersList = req.headers
    const authorization = headersList.authorization?.replace('Bearer ', '')

    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized: Missing Authorization Header' })
    }

    let fbUser
    try {
      fbUser = await validateToken(authorization)
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid Token' })
    }

    let user
    try {
      user = await upsertUserByAuth(fbUser.uid, { name: fbUser.name ?? 'Anonymous' })
    } catch (error) {
      return res.status(401).json({ message: 'User not found!' })
    }

    return handler(req, res, user)
  }
}
