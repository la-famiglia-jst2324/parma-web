import type { Frequency } from '@prisma/client'

type Datasource = {
  id: number
  sourceName: string
  description: string
  isActive: boolean
  frequency: Frequency
  healthStatus: 'UP' | 'DOWN'
}

export default Datasource
