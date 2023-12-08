import type { NextApiRequest, NextApiResponse } from 'next'
import type { User, Role } from '@prisma/client'
import { withAuthValidation } from '@/api/middleware/auth'
import { withAuthorizationValidation } from '@/api/middleware/authorization'

export const withAuthenticatorAndAuthorizer = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => Promise<void>,
  authorizedRoles: Role[]
) => {
  return withAuthValidation(async (req, res, user) => {
    return withAuthorizationValidation(handler)(req, res, user, authorizedRoles)
  })
}

export default withAuthenticatorAndAuthorizer
