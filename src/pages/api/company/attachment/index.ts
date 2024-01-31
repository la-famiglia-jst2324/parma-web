import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { getAllAttachmentsForCompany, createAttachment } from '@/api/db/services/attachmentService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'

export const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const companyId = parseInt(req.query.companyId as string, 10)
  const userId = user.id
  switch (method) {
    case 'GET':
      try {
        // Gets attachments for a company
        const attachments = await getAllAttachmentsForCompany(companyId)
        res.status(200).json(attachments)
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        // Create a new attachment for a company
        const newAttachment = await createAttachment({ companyId, userId, ...req.body })
        if (newAttachment) {
          res.status(201).json(newAttachment)
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
