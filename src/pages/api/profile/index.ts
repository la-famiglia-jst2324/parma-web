import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { updateUser, getUserById } from '@/api/db/services/userService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update user information
 *     description: Updates the information of an existing user based on their user ID.
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
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - authId
 *         - name
 *         - role
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         authId:
 *           type: string
 *         name:
 *           type: string
 *         profilePicture:
 *           type: string
 *         role:
 *           type: string
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id

  switch (method) {
    case 'PUT':
      try {
        const existingUser = await getUserById(Number(userId))
        if (existingUser) {
          const updatedUser = await updateUser(Number(userId), req.body)
          res.status(200).json(updatedUser)
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
