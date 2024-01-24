import type { IdentifierType } from '@prisma/client'
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
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function getDataSourcesPagination(page: number, size: number) {
  try {
    const res = await fetchClient.get(`/api/dataSources?page=${page}&size=${size}`)
    const json = await res.data
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
  return fetchClient
    .get(`/api/dataSources/scheduledTasks/${dataSourceId}`)
    .then((response) => {
      return response.data
    })
    .then((data) => {
      console.log(data)
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

export async function createNewDatasource(dataSource: {
  sourceName: string
  isActive: boolean
  frequency: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY'
  healthStatus: string
  modifiedAt: string
  invocationEndpoint: string
  description: string
}) {
  try {
    const res = await fetchClient.post('/api/dataSources', dataSource)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export async function deleteDatasource(id: string) {
  try {
    const res = await fetchClient.delete(`/api/dataSources/${id}`)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

export async function getCompanyDataSourceIdentifiers(companyDataSourceId: string) {
  try {
    const res = await fetchClient.get(`/api/companyDataSourceIdentifier?companyDataSourceId=${companyDataSourceId}`)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

export async function createCompanyDataSourceIdentifier(body: {
  companyDataSourceId: number
  identifierKey: string
  identifierType: IdentifierType
  property: string
  value: string
  validity: string
}) {
  try {
    const res = await fetchClient.post(`/api/companyDataSourceIdentifier`, body)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

export async function editCompanyDataSourceIdentifier(body: {
  companyDataSourceId: number
  identifierKey: string
  identifierType: IdentifierType
  property: string
  value: string
  validity: Date
}) {
  try {
    const res = await fetchClient.put(`/api/companyDataSourceIdentifier`, body)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

export async function deleteCompanyDataSourceIdentifierById(id: string) {
  try {
    const res = await fetchClient.delete(`/api/companyDataSourceIdentifier?id=${id}`)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

export async function triggerDataSource(dataSourceId: string) {
  try {
    const res = await fetchClient.post(`/api/triggerDataSource/${dataSourceId}`)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}
