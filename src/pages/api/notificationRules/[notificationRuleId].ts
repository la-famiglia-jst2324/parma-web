import type { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError } from 'zod'
import formatZodErrors from '@/pages/api/lib/utils/zodCustomMessage'
import {
  getNotificationRuleById,
  updateNotificationRule,
  deleteNotificationRule
} from '@/api/db/services/notificationRulesService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'

const notificationRuleIdtQuerySchema = z.object({
  notificationRuleId: z
    .string()
    .refine((val: string) => !isNaN(parseInt(val, 10)), {
      message: 'ID must be a number'
    })
    .transform((val: string) => parseInt(val, 10))
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = notificationRuleIdtQuerySchema.parse(req.query)

  const { method } = req
  const { notificationRuleId } = query

  switch (method) {
    case 'GET':
      try {
        const notificationRule = await getNotificationRuleById(Number(notificationRuleId))
        if (notificationRule) res.status(200).json(notificationRule)
        else res.status(400).json({ error: 'No NotificationRule found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const updatedNotificationRule = await updateNotificationRule(Number(notificationRuleId), req.body)
        res.status(200).json(updatedNotificationRule)
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    case 'DELETE':
      try {
        await deleteNotificationRule(Number(notificationRuleId))
        res.status(200).json({ message: 'NotificationRule successfully Deleted' })
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else res.status(500).json({ error })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default withAuthValidation(handler)
