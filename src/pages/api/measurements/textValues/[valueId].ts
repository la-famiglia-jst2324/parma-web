import type { NextApiRequest, NextApiResponse } from 'next'

import { getTextValueByID, updateTextValue, deleteTextValue } from '@/api/db/services/textValueService'

import { ItemNotFoundError } from '@/api/utils/errorUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { valueId } = req.query

  switch (method) {
    case 'GET':
      try {
        const value = await getTextValueByID(Number(valueId))
        if (value) res.status(200).json(value)
        else res.status(400).json({ error: 'No Measurement  Value found' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'PUT':
      try {
        const existingValue = await getTextValueByID(Number(valueId))
        if (existingValue) {
          const updatedValue = await updateTextValue(Number(valueId), req.body)
          res.status(200).json(updatedValue)
        } else {
          res.status(404).json({ error: 'Measurement Value not found' })
        }
      } catch (error) {
        if (error instanceof ItemNotFoundError) res.status(404).json({ error: error.message })
        else res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    case 'DELETE':
      try {
        await deleteTextValue(Number(valueId))
        res.status(200).json({ message: 'Measurement Value successfully Deleted' })
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
      break

    default:
      res.status(405).json({ error: 'Method Not Allowed' })
      break
  }
}
