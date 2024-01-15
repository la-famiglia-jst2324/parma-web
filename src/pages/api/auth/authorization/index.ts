import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { Role } from '@prisma/client'
import { withAuthenticatorAndAuthorizer } from '@/api/middleware/authenticatorAndAuthorizer'

type ResponseData = {
  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>, user: User) => {
  res.status(200).json({ message: `Authorized to do this action! Welcome ${user.name}!` })
}

export default withAuthenticatorAndAuthorizer(handler, Role.USER)
