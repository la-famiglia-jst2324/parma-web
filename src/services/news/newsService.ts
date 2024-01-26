import fetchClient from '@/services/fetchClient'

export async function getNewsItems(page?: number, pageSize?: number) {
  try {
    let url = '/api/news'
    const params = new URLSearchParams()

    if (page) {
      params.append('page', page.toString())
    }

    if (pageSize) {
      params.append('pageSize', pageSize.toString())
    }

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const response = await fetchClient.get(url)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}
