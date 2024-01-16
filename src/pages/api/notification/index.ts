import type { NextApiRequest, NextApiResponse } from 'next'

import { createNotification } from '@/api/db/services/notificationService'
/**
 * @swagger
 * tags:
 *   - name: notification
 * /api/notification:
 *   post:
 *     tags:
 *       - notification
 *     summary: Create a new notification
 *     description: Creates a new notification with the given details in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - companyId
 *               - dataSourceId
 *             properties:
 *               message:
 *                 type: string
 *               companyId:
 *                 type: integer
 *               dataSourceId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created a new notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - id
 *         - message
 *         - companyId
 *         - dataSourceId
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         message:
 *           type: string
 *         companyId:
 *           type: integer
 *         dataSourceId:
 *           type: integer
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const notification = await createNotification(req.body)
        if (notification) {
          res.status(201).json(notification)
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
