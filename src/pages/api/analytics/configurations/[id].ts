import type { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError } from 'zod'
import formatZodErrors from '../../lib/utils/zodCustomMessage'
import { deleteUserCustomization } from '@/api/db/services/userCustomizationService'
import { withAuthValidation } from '@/api/middleware/auth'

const customizaitonDeleteQuerySchema = z.object({
  id: z
    .string()
    .refine((val: string) => !isNaN(parseInt(val, 10)), {
      message: 'ID must be a number'
    })
    .transform((val: string) => parseInt(val, 10))
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  try {
    switch (method) {
      case 'DELETE': {
        // Note the indentation here
        const { id } = customizaitonDeleteQuerySchema.parse(req.query)
        await deleteUserCustomization(id)
        res.status(200).json({ message: `Customization with id ${id} deleted successfully` })
        break
      }
      default:
        res.status(405).json({ error: 'Method Not Allowed' })
        break
    }
  } catch (error) {
    if (error instanceof ZodError) res.status(400).json({ error: formatZodErrors(error) })
    else if (error instanceof Error) res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}

export default withAuthValidation(handler)
