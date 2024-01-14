import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteFileFromFirebaseStorage, generateFileUrl } from '../lib/utils/firebaseStorage'
import { getUserById, updateUser, deleteUser } from '@/api/db/services/userService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/user/id:
 *   get:
 *     tags:
 *       - user
 *     summary: Retrieve a user by ID
 *     description: Fetches details of a specific user based on the provided user ID.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: No User found for the provided ID.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - user
 *     summary: Delete a user
 *     description: Deletes a specific user based on the provided user ID.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - user
 *     summary: Update user information
 *     description: Updates the information of an existing user based on their user ID.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the user's information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { userId } = req.query

  switch (method) {
    case 'GET':
      try {
        // get a single user
        const user = await getUserById(Number(userId))
        let profilePictureUrl = ''
        if (user) {
          if (user.profilePicture) profilePictureUrl = await generateFileUrl(user.profilePicture)
          res.status(200).json({ ...user, profilePicture: profilePictureUrl })
        } else res.status(400).json({ error: 'No User found' })
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
          if (existingUser.profilePicture) await deleteFileFromFirebaseStorage(existingUser.profilePicture)
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
