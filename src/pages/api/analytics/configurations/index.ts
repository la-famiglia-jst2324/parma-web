import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { z, ZodError } from 'zod'
import formatZodErrors from '@/pages/api/lib/utils/zodCustomMessage'
import { createUserCustomization, getUserCustomizations } from '@/api/db/services/userCustomizationService'
import {
  createUserCompanyCustomization,
  getCompanyCustomizationsByCustomizationId
} from '@/api/db/services/userCompanyCustomizationService'
import {
  createUserMetricCustomization,
  getAllUserMetricsByCustomizationId
} from '@/api/db/services/userMetricCustomizationService'
import { withAuthValidation } from '@/api/middleware/auth'

// Input Validation Schema
const createUserCustomizationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required and cannot be empty.' }),
  companyIds: z
    .array(z.number().int({ message: 'Company IDs must be integers.' }))
    .min(1, { message: 'At least one company ID is required.' }),
  metricIds: z.array(z.number().int({ message: 'Metric ID must be an integer.' }))
})

interface UserCustomizationData {
  id: number
  userId: number // Add more properties as needed
  name: string
  companyIds: number[]
  metrics: Array<{
    metricId: number
    dataSourceId: number
  }>
}

interface MetricDataSourceMappingType {
  metricId: number
  dataSourceId: number
}
/**
 * @swagger
 * /api/analytics/configurations:
 *   post:
 *     tags:
 *       - analytics
 *     summary: Create a new user customization
 *     description: This endpoint allows the creation of a new user customization with specified company and metric IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - companyIds
 *               - metricIds
 *             properties:
 *               name:
 *                 type: string
 *               companyIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               metricIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Successfully created the user customization.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCustomization'
 *       400:
 *         description: Bad request, validation error.
 *       500:
 *         description: Internal server error.
 *
 *   get:
 *     summary: Retrieve all user customizations
 *     description: Fetches all user customizations for the logged-in user.
 *     responses:
 *       200:
 *         description: An array of user customizations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   companyIds:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   metrics:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         metricId:
 *                           type: integer
 *                         dataSourceId:
 *                           type: integer
 *       500:
 *         description: Internal server error.
 *
 * components:
 *   schemas:
 *     UserCompanyCustomization:
 *       type: object
 *       required:
 *         - id
 *         - customizationId
 *         - companyId
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         customizationId:
 *           type: integer
 *         companyId:
 *           type: integer
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 *
 *     UserCustomization:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - userId
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         userId:
 *           type: integer
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 *
 *     UserMetricCustomization:
 *       type: object
 *       required:
 *         - id
 *         - customizationId
 *         - sourceMeasurementId
 *         - createdAt
 *         - modifiedAt
 *       properties:
 *         id:
 *           type: integer
 *         customizationId:
 *           type: integer
 *         sourceMeasurementId:
 *           type: integer
 *         createdAt:
 *           type: string
 *         modifiedAt:
 *           type: string
 */

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
  const { method } = req
  const userId = user.id
  switch (method) {
    case 'POST':
      try {
        const parsedBody = createUserCustomizationSchema.parse(req.body)
        const { name, companyIds, metricIds } = parsedBody

        // create User Customization
        const userCustomization = await createUserCustomization({ name, userId })
        const customizationId = userCustomization.id

        // create User Company Customization
        for (let i = 0; i < companyIds.length; i++) {
          const companyId = companyIds[i]
          await createUserCompanyCustomization({ customizationId, companyId })
        }

        // create User Metric Customizations
        for (let i = 0; i < metricIds.length; ++i) {
          const measurementId = metricIds[i]
          await createUserMetricCustomization({ customizationId, sourceMeasurementId: measurementId })
        }
        res.status(201).json(userCustomization)
      } catch (error) {
        if (error instanceof ZodError) res.status(400).json({ errors: formatZodErrors(error) })
        else if (error instanceof Error)
          res.status(500).json({ error: error.message || 'An unexpected error occurred' })
      }
      break
    case 'GET':
      try {
        // get all user customizations
        const response = []
        const userCustomizations = await getUserCustomizations(userId)
        for (let i = 0; i < userCustomizations.length; ++i) {
          const { id: customizationId, name: customizationName } = userCustomizations[i]
          const userCustomizationData: UserCustomizationData = {
            id: customizationId,
            userId,
            name: customizationName,
            companyIds: [],
            metrics: []
          }
          const userCustomizationCompanyIds: number[] = []

          // get company ids for the current customization id
          const userCustomizationCompanies = await getCompanyCustomizationsByCustomizationId(customizationId)
          for (let j = 0; j < userCustomizationCompanies.length; ++j) {
            const companyId = userCustomizationCompanies[j].companyId
            userCustomizationCompanyIds.push(companyId)
          }
          userCustomizationData.companyIds = userCustomizationCompanyIds

          // get all metric ids for user customization
          const metricsIds = await getAllUserMetricsByCustomizationId(customizationId)
          const metricDataSourceMapping: MetricDataSourceMappingType[] = []
          for (let j = 0; j < metricsIds.length; ++j) {
            const metricId = metricsIds[j].sourceMeasurement.id
            const dataSourceId = metricsIds[j].sourceMeasurement.dataSource.id
            metricDataSourceMapping.push({
              metricId,
              dataSourceId
            })
          }
          userCustomizationData.metrics = metricDataSourceMapping
          response.push(userCustomizationData)
        }
        res.status(200).json(response)
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
