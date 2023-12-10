export default async function getDatasources(page: number, size: number) {
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
