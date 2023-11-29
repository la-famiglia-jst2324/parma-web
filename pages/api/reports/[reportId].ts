import type { NextApiRequest, NextApiResponse } from 'next'

import { getReportById, updateReport, deleteReport } from '@/api/services/reportService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'

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
