import type { NextApiRequest, NextApiResponse } from 'next'
import type { User, Role } from '@prisma/client'

export const withAuthorizationValidation = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse, user: User, authorizedRoles: Role[]) => {
    const userRoles = user.roles
    const isAuthorized = userRoles.some((role) => authorizedRoles.includes(role))

    if (isAuthorized) {
      return handler(req, res, user)
    } else {
      return res.status(401).json({
        message:
          'Unauthorized: None of your assigned roles grant you the rights to perform this action! Please review your role permissions or contact your administrator if you require access to this feature.'
      })
    }
  }
}
