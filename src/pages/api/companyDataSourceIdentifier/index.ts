import type { NextApiRequest, NextApiResponse } from 'next'
import { ItemNotFoundError } from '@/api/utils/errorUtils'
import { withAuthValidation } from '@/api/middleware/auth'
import {
  createCompanyDataSourceIdentifier,
  getCompanyDataSourceIdentifierById,
  updateCompanyDataSourceIdentifier,
  deleteCompanyDataSourceIdentifier,
  getCompanyDataSourceIdentifiersByDataSourceId,
  getAllCompanyDataSourceIdentifiers
} from '@/api/db/services/companyDataSourceIdentifierService'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { id, companyDataSourceId, page = '1', pageSize = '10' } = req.query

  switch (method) {
    case 'GET':
      try {
        if (id) {
          const identifier = await getCompanyDataSourceIdentifierById(parseInt(id as string))
          if (identifier) res.status(200).json(identifier)
          else res.status(400).json({ error: 'No Identifier found' })
        } else if (companyDataSourceId) {
          const identifiers = await getCompanyDataSourceIdentifiersByDataSourceId(
            parseInt(companyDataSourceId as string)
          )
          if (identifiers) res.status(200).json(identifiers)
          else res.status(400).json({ error: 'No Identifiers found' })
        } else {
          const identifiers = await getAllCompanyDataSourceIdentifiers(
            parseInt(page as string),
            parseInt(pageSize as string)
          )
          if (identifiers) res.status(200).json(identifiers)
          else res.status(400).json({ error: 'No Identifiers found' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError)
          res.status(200).json({ message: `There is no identifier with the id you provide` })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'POST':
      try {
        const newIdentifier = await createCompanyDataSourceIdentifier({ ...req.body })
        if (newIdentifier) {
          res.status(201).json(newIdentifier)
        } else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        if (id) {
          const updatedIdentifier = await updateCompanyDataSourceIdentifier(parseInt(id as string), req.body)
          if (updatedIdentifier) {
            res.status(200).json(updatedIdentifier)
          } else res.status(400).json({ error: 'Invalid request parameters' })
        } else {
          res.status(400).json({ error: 'Invalid request parameters' })
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'DELETE':
      try {
        if (id) {
          await deleteCompanyDataSourceIdentifier(parseInt(id as string))
          res.status(200).json({ message: 'Identifier deleted successfully' })
        } else {
          res.status(400).json({ error: 'Invalid request parameters' })
        }
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
