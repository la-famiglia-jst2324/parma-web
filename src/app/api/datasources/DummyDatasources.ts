import type Datasource from '@/types/datasource'

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisi nunc sed nunc. Nulla facil vitae aliquam nisi nunc sed nunc.'

export const datasources: Datasource[] = [
  {
    id: 1,
    sourceName: 'Datasource 1',
    description,
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },

  {
    id: 2,
    sourceName: 'Datasource 2',
    description,
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },

  {
    id: 3,
    sourceName: 'Datasource 3',
    description,
    isActive: false,
    defaultFrequency: '',
    healthStatus: 'up'
  },

  {
    id: 4,
    sourceName: 'Datasource 4',
    description,
    isActive: false,
    defaultFrequency: '',
    healthStatus: 'up'
  },

  {
    id: 5,
    sourceName: 'Datasource 5',
    description,
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },

  {
    id: 6,
    sourceName: 'Datasource 6',
    description,
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  }
]
