import type { NextApiRequest, NextApiResponse } from 'next'

import { createNotificationRule } from '@/api/db/services/notificationRulesService'
import { withAuthValidation } from '@/api/middleware/auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const notificationRule = await createNotificationRule(req.body)
        if (notificationRule) {
          res.status(201).json(notificationRule)
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

export default withAuthValidation(handler)