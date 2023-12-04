import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { z, ZodError } from 'zod'
import formatZodErrors from '../../lib/utils/zodCustomMessage'
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
