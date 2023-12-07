import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        // Get a single user by authId
        if (user) res.status(200).json(user)
        else res.status(400).json({ error: 'No User found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default withAuthValidation(handler)
