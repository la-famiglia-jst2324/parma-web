import type Datasource from '@/types/datasource'

const datasources: Datasource[] = [
  {
    id: 1,
    sourceName: 'datasource 1',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 2,
    sourceName: 'datasource 2',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 3,
    sourceName: 'datasource 3',
    description: 'description',
    isActive: false,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 4,
    sourceName: 'datasource 4',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 5,
    sourceName: 'datasource 5',
    description: 'description',
    isActive: false,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 6,
    sourceName: 'datasource 6',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  }
]

export async function GET() {
  return new Response(JSON.stringify(datasources))
}
