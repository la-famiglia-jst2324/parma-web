import type { NextApiRequest, NextApiResponse } from 'next'

import {
  createCompanyDataSource,
  deleteCompanyDataSource,
  getCompaniesByDataSourceId,
  getDataSourcesByCompanyId,
  updateCompanyDataSource
} from '@/api/db/services/companyDataSourceService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const dataSourceId = Number(req.query.dataSourceId)
  const companyId = Number(req.query.companyId)

  switch (method) {
    case 'GET':
      try {
        if (dataSourceId) {
          const companies = await getCompaniesByDataSourceId(dataSourceId)
          if (companies.length > 0) res.status(200).json(companies)
          else res.status(400).json({ error: 'No Companies found' })
        } else if (companyId) {
          const buckets = await getDataSourcesByCompanyId(companyId)
          if (buckets.length > 0) res.status(200).json(buckets)
          else res.status(400).json({ error: 'No Buckets found' })
        } else res.status(400).json({ error: 'Invalid Arguments' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'POST':
      try {
        const dataSource = await createCompanyDataSource(req.body)
        if (dataSource) res.status(200).json(dataSource)
        else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'PUT':
      try {
        const updatedData = await updateCompanyDataSource(companyId, dataSourceId, req.body)
        res.status(200).json(updatedData)
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break
    case 'DELETE':
      try {
        await deleteCompanyDataSource(companyId, dataSourceId)
        res.status(200).json({ message: 'Company Data Source Deleted Successfully' })
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break
  }
}
