import type { NextApiRequest, NextApiResponse } from 'next'

import { createReport } from '@/api/db/services/reportService'
/**
 * @swagger
 * tags:
 *   - name: report
 * /api/reports:
 *   post:
 *     tags:
 *       - report
 *     summary: Create a new report
 *     description: Creates a new report with the details provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *               - name
 *               - reportFileUrl
 *             properties:
 *               companyId:
 *                 type: string
 *               name:
 *                 type: string
 *               reportFileUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new report.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - id
 *         - companyId
 *         - name
 *         - reportFileUrl
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         companyId:
 *           type: integer
 *         name:
 *           type: string
 *         reportFileUrl:
 *           type: string
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
