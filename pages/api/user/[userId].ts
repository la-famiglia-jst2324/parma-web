import type { NextApiRequest, NextApiResponse } from 'next'

import { getUserById, updateUser, deleteUser } from '@/pages/api/services/userService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { userId } = req.query

  switch (method) {
    case 'GET':
      try {
        // get a single user
        const user = await getUserById(Number(userId))
        if (user) res.status(200).json(user)
        else res.status(400).json({ error: 'No User found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const existingUser = await getUserById(Number(userId))
        if (existingUser) {
          // Update User
          const updatedUser = await updateUser(Number(userId), req.body)
          res.status(200).json(updatedUser)
        } else res.status(404).json({ error: 'User not Found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        const existingUser = await getUserById(Number(userId))
        // delete a user
        if (existingUser) {
          await deleteUser(Number(userId))
          res.status(200).json({ message: 'User successfully Deleted' })
        } else {
          res.status(404).json({ error: 'User not found' })
        }
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
