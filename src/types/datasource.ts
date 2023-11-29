type Datasource = {
  id: number
  sourceName: string
  description: string
  isActive: boolean
  defaultFrequency: string
  healthStatus: 'up' | 'down' | 'unknown'
}

export default Datasource
