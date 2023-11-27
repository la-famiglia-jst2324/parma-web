import type { NextApiRequest, NextApiResponse } from 'next'

import userService from '@/api/services/userService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
const { createUser, getAllUsers } = userService

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        // Gets a user
        const companies = await getAllUsers()
        if (companies.length > 0) res.status(200).json(companies)
        else res.status(400).json({ error: 'No Companies found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        // Create a new user
        const newUser = await createUser(req.body)
        if (newUser) {
          res.status(201).json(newUser)
        } else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
