import fetchClient from '@/services/fetchClient'

export async function getMeasurements() {
  try {
    const response = await fetchClient.get(`/api/measurements`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    return []
  }
}

export async function getMeasurementDataById(measurementId: string) {
  try {
    const response = await fetchClient.get(`/api/measurements/${measurementId}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    return []
  }
}

export async function getAnalyticsDataForCompany(measurementId: string, companyId: string) {
  try {
    const response = await fetchClient.get(`/api/analytics?measurementId=${measurementId}&companies=${companyId}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    return []
  }
}
