import type { NextApiRequest, NextApiResponse } from 'next'
import { getAttachmentByID, deleteAttachment } from '@/api/db/services/attachmentService'
import { ItemNotFoundError } from '@/api/utils/errorUtils'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { attachmentId } = req.query

  switch (method) {
    case 'GET':
      try {
        const attachment = await getAttachmentByID(Number(attachmentId))
        if (attachment) res.status(200).json(attachment)
        else res.status(404).json({ error: `No attachment with id: ${attachmentId} found` })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        const existingAttachment = await getAttachmentByID(Number(attachmentId))
        // delete an attachment
        if (existingAttachment) {
          await deleteAttachment(Number(attachmentId))
          res.status(200).json({ message: 'attachment successfully Deleted' })
        } else {
          res.status(204).json({ error: `No attachment with id: ${attachmentId} found` })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default handler // No auth
