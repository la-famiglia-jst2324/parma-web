import type { NextApiRequest, NextApiResponse } from 'next'

import { createReport } from '@/api/db/services/reportService'
/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Create a new report
 *     description: Creates a new report with the details provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               # Include other required fields here
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               # Define other properties of the report here
 *     responses:
 *       201:
 *         description: Successfully created a new report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               # Define the schema for the created report object here
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const report = await createReport(req.body)
        if (report) {
          res.status(201).json(report)
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
