import type { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError } from 'zod'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { getCompanyByID } from '@/api/db/services/companyService'
import { deleteAttachment, getAttachmentByID } from '@/api/db/services/attachmentService'
import { withAuthValidation } from '@/api/middleware/auth'
import formatZodErrors from '@/pages/api/lib/utils/zodCustomMessage'
import { generateFileUrl, deleteFileFromFirebaseStorage } from '@/pages/api/lib/utils/firebaseStorage'

const companyAttachmentQuerySchema = z.object({
  companyId: z
    .string()
    .refine((val: string) => !isNaN(parseInt(val, 10)), {
      message: 'ID must be a number'
    })
    .transform((val: string) => parseInt(val, 10)),
  attachmentId: z
    .string()
    .refine((val: string) => !isNaN(parseInt(val, 10)), {
      message: 'ID must be a number'
    })
    .transform((val: string) => parseInt(val, 10))
})

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = companyAttachmentQuerySchema.parse(req.query)

  const { method } = req
  const { companyId, attachmentId } = query

  switch (method) {
    case 'GET':
      try {
        const company = await getCompanyByID(Number(companyId))
        const companyAttachment = await getAttachmentByID(Number(attachmentId))
        if (company && companyAttachment) {
          const fileUrl = await generateFileUrl(companyAttachment.fileUrl)
          res.status(200).json({ ...companyAttachment, fileUrl })
        } else res.status(404).json({ error: 'Company or Attachment not Found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break
    case 'DELETE':
      try {
        const company = await getCompanyByID(Number(companyId))
        const companyAttachment = await getAttachmentByID(Number(attachmentId))
        if (company && companyAttachment) {
          const deletedCompany = await deleteAttachment(Number(attachmentId))
          await deleteFileFromFirebaseStorage(companyAttachment.fileUrl)
          const { id, companyId, fileType, title, createdAt, modifiedAt } = deletedCompany
          res.status(200).json({ message: 'Attachment deleted', id, companyId, fileType, title, createdAt, modifiedAt })
        } else res.status(404).json({ error: 'Company or Attachment not Found' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default withAuthValidation(handler)
