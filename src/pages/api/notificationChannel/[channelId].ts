import type { NextApiRequest, NextApiResponse } from 'next'

import {
  deleteNotificationChannel,
  getNotificationChannelById,
  updateNotificationChannel
} from '@/api/db/services/notificationChannelService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/notificationChannel/channelId:
 *   get:
 *     tags:
 *       - channel
 *     summary: Retrieve a notification channel by ID
 *     description: Fetches details of a specific notification channel based on the provided channel ID.
 *     parameters:
 *       - in: query
 *         name: channelId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the notification channel.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationChannel'
 *       400:
 *         description: No NotificationChannel found for the provided ID.
 *       404:
 *         description: NotificationChannel not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - channel
 *     summary: Update a notification channel
 *     description: Updates the details of an existing notification channel based on the provided channel ID.
 *     parameters:
 *       - in: query
 *         name: channelId
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
 *               channelType:
 *                 type: string
 *               destination:
 *                 type: string
 *               apiKey:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the notification channel.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationChannel'
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - channel
 *     summary: Delete a notification channel
 *     description: Deletes a specific notification channel based on the provided channel ID.
 *     parameters:
 *       - in: query
 *         name: channelId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: NotificationChannel successfully deleted.
 *       500:
 *         description: Internal Server Error.
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { channelId } = req.query

  switch (method) {
    case 'GET':
      try {
        const notificationChannel = await getNotificationChannelById(Number(channelId))
        if (notificationChannel) res.status(200).json(notificationChannel)
        else res.status(400).json({ error: 'No NotificationChannel found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const updatedNotificationChannel = await updateNotificationChannel(Number(channelId), req.body)
        res.status(200).json(updatedNotificationChannel)
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    case 'DELETE':
      try {
        await deleteNotificationChannel(Number(channelId))
        res.status(200).json({ message: 'NotificationChannel successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default handler // No auth
