import fetchClient from '@/services/fetchClient'

export async function getSearchData(name?: string, page?: number, pageSize?: number) {
  try {
    const queryParams = new URLSearchParams({
      ...(name && { name }),
      ...(page && { page: page.toString() }),
      ...(pageSize && { pageSize: pageSize.toString() })
    })

    const response = await fetchClient.get(`/api/search?${queryParams.toString()}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}
