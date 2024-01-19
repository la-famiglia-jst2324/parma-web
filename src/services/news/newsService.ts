import fetchClient from '@/services/fetchClient'

export async function getNewsItems(page: number = 1, pageSize: number = 10) {
  try {
    const response = await fetchClient.get(`/api/news?page=${page}&pageSize=${pageSize}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}
