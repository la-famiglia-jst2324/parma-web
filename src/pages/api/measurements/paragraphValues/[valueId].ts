import type { NextApiRequest, NextApiResponse } from 'next'

import { getParagraphValueByID } from '@/api/db/services/paragraphValueService'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { valueId } = req.query

  switch (method) {
    case 'GET':
      try {
        const value = await getParagraphValueByID(Number(valueId))
        if (value) res.status(200).json(value)
        else res.status(400).json({ error: 'No Measurement  Value found' })
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
