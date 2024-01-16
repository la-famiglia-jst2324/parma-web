import type { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '@prisma/client'
import type { User } from '@prisma/client'

const isAuthorized = (userRole: Role, authorizedRole: Role) => {
  if (authorizedRole === Role.USER) {
    return [Role.USER, Role.ADMIN].includes(userRole)
  } else if (authorizedRole === Role.ADMIN) {
    return userRole === Role.ADMIN
  }
  return false
}

export const withAuthorizationValidation = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse, user: User, authorizedRole: Role) => {
    if (isAuthorized(user.role, authorizedRole)) {
      return handler(req, res, user)
    } else {
      return res.status(401).json({
        message: "Unauthorized: Your role doesn't grant you the rights to perform this action!"
      })
    }
  }
}
