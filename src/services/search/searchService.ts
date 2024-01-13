import fetchClient from '@/services/fetchClient'

// export async function getSearchData(idToken: string): Promise<Company[]> {
//   try {
//     const res = await fetch(`/api/search`, {
//       method: 'GET',
//       cache: 'no-cache',
//       headers: {
//         Authorization: idToken
//       }
//     })

//     if (!res.ok) {
//       console.log('Response status:', res.status)
//       throw new Error('HTTP response was not OK')
//     }
//     const json = await res.json()
//     return json
//   } catch (error) {
//     console.log('An error has occurred: ', error)
//     return []
//   }
// }

export async function getSearchData(name?: string, page: number = 1, pageSize: number = 10) {
  try {
    const queryParams = new URLSearchParams({
      ...(name && { name }),
      page: page.toString(),
      pageSize: pageSize.toString()
    })

    const response = await fetchClient.get(`/api/search?${queryParams.toString()}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}
