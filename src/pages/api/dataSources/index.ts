import type { NextApiRequest, NextApiResponse } from 'next'

import { Frequency } from '@prisma/client'
import { getAllDataSources, createDataSource, updateDataSource } from '@/api/db/services/dataSourceService'
import { addCompanyDataSourceRelationshipForDatasource } from '@/api/db/services/companyDataSourceService'

const frequencyMapping: { [key: string]: Frequency | undefined } = {
  weekly: Frequency.WEEKLY,
  daily: Frequency.DAILY,
  hourly: Frequency.HOURLY,
  monthly: Frequency.MONTHLY
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const name = (req.query.name as string) || ''
        const page = parseInt(req.query.page as string, 10) || 1
        const size = parseInt(req.query.size as string, 10) || 10

        const dataSourcesPagination = await getAllDataSources(page, size, name)
        if (dataSourcesPagination.datasources.length > 0) res.status(200).json(dataSourcesPagination)
        else res.status(400).json({ error: 'No Data Sources found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        // Create a new data source.
        const newDataSource = await createDataSource(req.body)
        // Register the new data source in the companyDataSource relationship.
        await addCompanyDataSourceRelationshipForDatasource(newDataSource.id)

        let analyticsUrl = process.env.PARMA_ANALYTICS_BASE_URL
        if (!analyticsUrl) {
          throw new Error('PARMA_ANALYTICS_URL is not defined in the environment.')
        }
        analyticsUrl = analyticsUrl.endsWith('/') ? analyticsUrl.substring(0, analyticsUrl.length - 1) : analyticsUrl
        const { id, invocationEndpoint } = newDataSource
        // send a request to parma-analytics to perform handshake
        const handshakeUrl = new URL('/handshake', analyticsUrl)
        handshakeUrl.searchParams.append('invocation_endpoint', invocationEndpoint)
        handshakeUrl.searchParams.append('data_source_id', id.toString())

        const handshakeResponse = await fetch(handshakeUrl.href)
        // Check the handshake response
        if (!handshakeResponse.ok) {
          throw new Error('Handshake for the data source failed.')
        }
        // update frequency of the data source after the handshake
        const handshakeData = await handshakeResponse.json()
        const frequency = handshakeData.frequency
        // convert frequency to the format used in the database

        const frequencyInDB: Frequency | undefined = frequencyMapping[frequency.toLowerCase()]

        if (!frequencyInDB) {
          await updateDataSource(id, { isActive: false, healthStatus: 'DOWN' })
          throw new Error(`The frequency '${frequency}' is not recognized.`)
        }

        const updatedDataSource = await updateDataSource(id, {
          frequency: frequencyInDB,
          isActive: true,
          healthStatus: 'UP'
        })
        if (updatedDataSource) {
          res.status(201).json(updatedDataSource)
        } else res.status(400).json({ error: 'Invalid request parameters' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
