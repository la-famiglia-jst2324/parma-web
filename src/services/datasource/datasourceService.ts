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
