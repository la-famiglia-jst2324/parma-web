import type { NextApiRequest, NextApiResponse } from 'next'

import { getReportById, updateReport, deleteReport } from '@/api/db/services/reportService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
/**
 * @swagger
 * /api/reports/reportId:
 *   get:
 *     tags:
 *       - report
 *     summary: Retrieve a report by ID
 *     description: Fetches details of a specific report based on the provided report ID.
 *     parameters:
 *       - in: query
 *         name: reportId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the report.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       400:
 *         description: No Report found for the provided ID.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal Server Error.
 *
 *   put:
 *     tags:
 *       - report
 *     summary: Update a report
 *     description: Updates the details of an existing report based on the provided report ID.
 *     parameters:
 *       - in: query
 *         name: reportId
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
 *               companyId:
 *                 type: string
 *               name:
 *                 type: string
 *               reportFileUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the report.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       500:
 *         description: Internal Server Error.
 *
 *   delete:
 *     tags:
 *       - report
 *     summary: Delete a report
 *     description: Deletes a specific report based on the provided report ID.
 *     parameters:
 *       - in: query
 *         name: reportId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Report successfully deleted.
 *       500:
 *         description: Internal Server Error.
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { reportId } = req.query

  switch (method) {
    case 'GET':
      try {
        const report = await getReportById(Number(reportId))
        if (report) res.status(200).json(report)
        else res.status(400).json({ error: 'No Report found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const updatedReport = await updateReport(Number(reportId), req.body)
        res.status(200).json(updatedReport)
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    case 'DELETE':
      try {
        await deleteReport(Number(reportId))
        res.status(200).json({ message: 'Report successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
