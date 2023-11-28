import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { withAuthValidation } from './middleware'

type ResponseData = {
  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>, user: User) => {
  res.status(200).json({ message: `Success! Welcome ${user.name}!` })
}

export default withAuthValidation(handler)
