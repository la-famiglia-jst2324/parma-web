import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { generateFileUrl } from '../lib/utils/firebaseStorage'
import { createUser, getAllUsers, getUserById, updateUser } from '@/api/db/services/userService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'
/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - user
 *     summary: Retrieve all users
 *     description: Fetches a list of all users.
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: No Users found.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   post:
 *     tags:
 *       - user
 *     summary: Create a new user
 *     description: Creates a new user with the details provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - authId
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               authId:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - user
 *     summary: Update a user
 *     description: Updates an existing user's information based on their user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the user's information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not Found.
 *       500:
 *         description: Internal Server Error.
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  switch (method) {
    case 'GET':
      try {
        // Gets a user
        const users = await getAllUsers()
        res.status(200).json(users)
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

    case 'PUT':
      try {
        const existingUser = await getUserById(userId)
        if (existingUser) {
          const updatedUser = await updateUser(userId, req.body)
          let profilePictureUrl = ''
          if (updatedUser.profilePicture) profilePictureUrl = await generateFileUrl(updatedUser.profilePicture)
          res.status(200).json({ ...updatedUser, profilePicture: profilePictureUrl })
        } else res.status(404).json({ error: 'User not Found' })
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
