import type { NextApiRequest, NextApiResponse } from 'next'

import { createReport } from '@/api/services/reportService'

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
