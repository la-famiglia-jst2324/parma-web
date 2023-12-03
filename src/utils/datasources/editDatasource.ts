export async function editDatasource(
  id: string,
  sourceName: string,
  isActive: boolean,
  description: string,
  url: string
) {
  try {
    console.log(url)
    const res = await fetch(`/api/dataSources/${id}`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sourceName, isActive, description })
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
