export default async function getDatasource(id: string) {
  try {
    const res = await fetch(`/api/dataSources/${id}`, {
      method: 'GET',
      cache: 'no-store'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}
