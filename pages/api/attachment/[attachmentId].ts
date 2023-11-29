import type { NextApiRequest, NextApiResponse } from 'next'
import attachmentService from '@/api/services/attachmentService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'

const { getAttachmentByID, deleteAttachment, updateAttachment } = attachmentService

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const attachmentId = parseInt(req.query.attachmentId as string, 10)

  switch (method) {
    case 'GET':
      try {
        // Gets attachments for a company
        const attachment = await getAttachmentByID(attachmentId)
        res.status(200).json(attachment)
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        // Delete attachments for a company
        await deleteAttachment(attachmentId)
        res.status(204).end() // Assuming successful deletion
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        // Update attachments for a company
        const { id, ...data } = req.body
        console.log(req.body)
        await updateAttachment(id, { ...data, id: attachmentId })
        res.status(200).json({ message: 'Attachments updated successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
