import type { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError } from 'zod'
import type { User } from '@prisma/client'
import fileValidation from '../../lib/utils/fileValidation'
import { getCompanyByID } from '@/api/db/services/companyService'
import { createAttachment } from '@/api/db/services/attachmentService'
import { withAuthValidation } from '@/api/middleware/auth'
import formatZodErrors from '@/pages/api/lib/utils/zodCustomMessage'
import { uploadFileToFirebase } from '@/pages/api/lib/utils/firebaseStorage'

const companyAttachmentQuerySchema = z.object({
  companyId: z
    .string()
    .refine((val: string) => !isNaN(parseInt(val, 10)), {
      message: 'ID must be a number'
    })
    .transform((val: string) => parseInt(val, 10))
})

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const query = companyAttachmentQuerySchema.parse(req.query)

  const { method } = req
  const { companyId } = query

  switch (method) {
    case 'POST':
      try {
        const existingCompany = await getCompanyByID(Number(companyId))
        if (existingCompany) {
          const fileDestPrefix = `company/${companyId}/`
          const { incomingFile, name, type } = await fileValidation(req)
          const { fileDest, fileName, fileType } = await uploadFileToFirebase(incomingFile, type, name, fileDestPrefix)
          // create attachment entry in db
          const createdAttachment = await createAttachment({
            companyId: Number(companyId),
            fileType,
            fileUrl: fileDest,
            userId: user.id,
            title: fileName
          })
          const { id, title, createdAt, modifiedAt } = createdAttachment
          res.status(201).json({ id, title, fileType, companyId, createdAt, modifiedAt })
        } else res.status(404).json({ error: 'Company not Found' })
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
        else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}

export default withAuthValidation(handler)
