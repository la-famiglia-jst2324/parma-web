import type { NextApiRequest, NextApiResponse } from 'next'

import { Frequency } from '@prisma/client'
import { getAllDataSources, createDataSource, updateDataSource } from '@/api/db/services/dataSourceService'

const frequencyMapping: { [key: string]: Frequency | undefined } = {
  weekly: Frequency.WEEKLY,
  daily: Frequency.DAILY,
  hourly: Frequency.HOURLY,
  monthly: Frequency.MONTHLY
}
/**
 * @swagger
 * tags:
 *   - name: dataSource
 * /api/dataSources:
 *   get:
 *     tags:
 *       - dataSource
 *     summary: Retrieve a paginated list of data sources
 *     description: Fetches a list of data sources with optional filtering by name. Supports pagination.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of data sources.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datasources:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DataSource'
 *       400:
 *         description: No Data Sources found.
 *       500:
 *         description: Internal Server Error.
 *
 *   post:
 *     tags:
 *       - dataSource
 *     summary: Create a new data source
 *     description: Creates a new data source and registers it in the company data source relationship. It also sends a handshake request to a specified URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sourceName
 *               - isActive
 *               - frequency
 *               - healthStatus
 *               - invocationEndpoint
 *             properties:
 *               sourceName:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               frequency:
 *                 type: string
 *               healthStatus:
 *                 type: string
 *               invocationEndpoint:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new data source.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DataSource'
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal Server Error.
 * components:
 *   schemas:
 *     DataSource:
 *       type: object
 *       required:
 *         - id
 *         - sourceName
 *         - isActive
 *         - frequency
 *         - healthStatus
 *         - maxRunSeconds
 *         - version
 *         - invocationEndpoint
 *       properties:
 *         id:
 *           type: integer
 *         sourceName:
 *           type: string
 *         isActive:
 *           type: boolean
 *         frequency:
 *           type: string
 *           enum:
 *             - HOURLY
 *             - DAILY
 *             - WEEKLY
 *             - MONTHLY
 *         healthStatus:
 *           type: string
 *           enum:
 *             - UP
 *             - DOWN
 *         maxRunSeconds:
 *           type: integer
 *         version:
 *           type: string
 *         invocationEndpoint:
 *           type: string
 *         description:
 *           type: string
 *         additionalParams:
 *           type: string
 */

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { name, page, size } = req.query

  switch (method) {
    case 'GET':
      try {
        const searchString = (name as string) || ''

        const dataSourcesPagination = await getAllDataSources(
          parseInt(page as string),
          parseInt(size as string),
          searchString
        )
        if (dataSourcesPagination.datasources.length > 0) res.status(200).json(dataSourcesPagination)
        else res.status(400).json({ error: 'No Data Sources found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'POST':
      try {
        const { sourceName } = req.body
        const regex = /^[a-z0-9_-]+$/;

        if (!sourceName || !regex.test(sourceName)) {
          res.status(400).json({ error: 'Invalid request parameters: name is required and should only contain lowercase letters, numbers, underscores, and hyphens.' });
          return;
        }
        
        // Create a new data source.
        // New company data source relationships will be added for this data source with all existing companies.
        const newDataSource = await createDataSource(req.body)

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
        if (handshakeResponse.status != 201) {
          res.status(500).json({ error: 'Handshake for the data source failed, please verify the URL is correct.' })
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

export default handler // No auth
