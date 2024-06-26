import type { NextApiRequest, NextApiResponse } from 'next'

import { getNotificationById, updateNotification, deleteNotification } from '@/api/db/services/notificationService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/notification/notificationId:
 *   get:
 *     tags:
 *       - notification
 *     summary: Retrieve a notification by ID
 *     description: Fetches details of a specific notification based on the provided notification ID.
 *     parameters:
 *       - in: query
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: No Notification found for the provided ID.
 *       404:
 *         description: Notification not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - notification
 *     summary: Update a notification
 *     description: Updates the details of an existing notification based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: notificationId
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
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - notification
 *     summary: Delete a notification
 *     description: Deletes a specific notification based on the provided ID.
 *     parameters:
 *       - in: query
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification successfully deleted.
 *       500:
 *         description: Internal Server Error.
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { notificationId } = req.query

  switch (method) {
    case 'GET':
      try {
        const notification = await getNotificationById(Number(notificationId))
        if (notification) res.status(200).json(notification)
        else res.status(400).json({ error: 'No Notification found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const updatedNotification = await updateNotification(Number(notificationId), req.body)
        res.status(200).json(updatedNotification)
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    case 'DELETE':
      try {
        await deleteNotification(Number(notificationId))
        res.status(200).json({ message: 'Notification successfully Deleted' })
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
