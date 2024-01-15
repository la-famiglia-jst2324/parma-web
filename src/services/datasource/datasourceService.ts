import fetchClient from '@/services/fetchClient'

export async function getDataSourcesByCompanyId(companyId: string) {
  try {
    const response = await fetchClient.get(`/api/companyDataSourceRelation?companyId=${companyId}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    return []
  }
}

export async function addDatasourceToCompany(companyId: string, dataSourceId: string) {
  try {
    const body = {
      dataSourceId: Number(dataSourceId),
      companyId: Number(companyId),
      isDataSourceActive: false,
      healthStatus: 'UP'
    }

    const response = await fetchClient.post('/api/companyDataSourceRelation', body)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function deleteCompanyDataSource(companyId: string, dataSourceId: string) {
  try {
    const response = await fetchClient.delete(
      `/api/companyDataSourceRelation?companyId=${companyId}&dataSourceId=${dataSourceId}`
    )
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function getDataSources() {
  try {
    const response = await fetchClient.get('/api/dataSources')
    return response.data.datasources
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function getDataSourcesPagination(page: number, size: number) {
  try {
    const res = await fetch(`/api/dataSources?page=${page}&size=${size}`, {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return {
      datasources: json.datasources,
      pagination: json.pagination
    }
  } catch (error) {
    console.error('An error has occurred: ', error)
    throw error
  }
}

export async function editDatasource(
  id: string,
  updates: {
    sourceName?: string
    isActive?: boolean
    description?: string
    invocationEndpoint?: string
  }
) {
  try {
    const response = await fetchClient.put(`/api/dataSources/${id}`, updates)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function getDatasourceById(id: string) {
  try {
    const response = await fetchClient.get(`/api/dataSources/${id}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function getScheduledTasks(dataSourceId: string) {
  return fetch(`/api/dataSources/scheduledTasks/${dataSourceId}`, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          console.log('No companies linked to this datasource!')
        }
        console.log(`HTTP error! status: ${response.status}`)
        return null
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
