import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import {
  createNotificationSubscription,
  deleteNotificationSubscription
} from '@/api/db/services/notificationSubscriptionService'
import { withAuthValidation } from '@/api/middleware/auth'
/**
 * @swagger
 * tags:
 *   - name: notificationReportSubscription
 * /api/notificationSubscription:
 *   post:
 *     tags:
 *       - notificationReportSubscription
 *     summary: Create a notification subscription
 *     description: Creates a new notification subscription for a user with the provided channel ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - channelId
 *               - channelPurpose
 *             properties:
 *               channelId:
 *                 type: integer
 *               channelPurpose:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new notification subscription.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationSubscription'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - notificationReportSubscription
 *     summary: Delete a notification subscription
 *     description: Deletes a notification subscription associated with a user for the specified channel ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - channelId
 *             properties:
 *               channelId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Notification subscription successfully deleted.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     NotificationSubscription:
 *       type: object
 *       required:
 *         - userId
 *         - channelId
 *         - channelPurpose
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         userId:
 *           type: integer
 *         channelId:
 *           type: integer
 *         channelPurpose:
 *           type: string
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  const { channelId } = req.body
  switch (method) {
    case 'POST':
      try {
        const notificationChannel = await createNotificationSubscription({ userId, ...req.body })
        if (notificationChannel) {
          res.status(201).json(notificationChannel)
        } else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        await deleteNotificationSubscription(userId, channelId)
        res.status(200).json({ message: 'Notification Subscription successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
export default withAuthValidation(handler)
