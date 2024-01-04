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
/**
 * @swagger
 * /api/analytics/configurations/id:
 *   delete:
 *     tags:
 *       - analytics
 *     summary: Delete a user customization
 *     description: Deletes a user customization by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user customization to delete.
 *     responses:
 *       200:
 *         description: Customization deleted successfully. Returns a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customization with id 123 deleted successfully"
 *       400:
 *         description: Bad request, typically due to validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       405:
 *         description: Method not allowed, if an unsupported method is used.
 *       500:
 *         description: Internal server error, typically for unhandled exceptions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  try {
    switch (method) {
      case 'DELETE': {
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
