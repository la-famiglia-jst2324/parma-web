export default async function editDatasource(
  id: string,
  updates: {
    sourceName?: string
    isActive?: boolean
    description?: string
    invocationEndpoint?: string
  }
) {
  try {
    const res = await fetch(`/api/dataSources/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
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
