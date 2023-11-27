import type Datasource from '@/types/datasource'

const datasources: Datasource[] = [
  {
    id: 1,
    sourceName: 'Datasource 1',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 2,
    sourceName: 'Datasource 2',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 3,
    sourceName: 'Datasource 3',
    description: 'description',
    isActive: false,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 4,
    sourceName: 'Datasource 4',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 5,
    sourceName: 'Datasource 5',
    description: 'description',
    isActive: false,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 6,
    sourceName: 'Datasource 6',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  }
]

export async function GET() {
  return new Response(JSON.stringify(datasources))
}
