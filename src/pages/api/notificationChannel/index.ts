import type { NextApiRequest, NextApiResponse } from 'next'

import { createNotificationChannel } from '@/api/db/services/notificationChannelService'
/**
 * @swagger
 * tags:
 *   - name: channel
 * /api/notificationChannel:
 *   post:
 *     tags:
 *       - channel
 *     summary: Create a new notification channel
 *     description: Creates a new notification channel with the details provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - channelType
 *               - destination
 *             properties:
 *               channelType:
 *                 type: string
 *               destination:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new notification channel.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationChannel'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     NotificationChannel:
 *       type: object
 *       required:
 *         - id
 *         - channelType
 *         - destination
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         channelType:
 *           type: string
 *         destination:
 *           type: string
 *         apiKey:
 *           type: string
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const notificationChannel = await createNotificationChannel(req.body)
        if (notificationChannel) {
          res.status(201).json(notificationChannel)
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

export default handler // No auth
