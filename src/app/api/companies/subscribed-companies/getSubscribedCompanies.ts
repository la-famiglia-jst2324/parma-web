async function getSubscribedCompanies(idToken: string) {
  try {
    const res = await fetch('/api/company/subscribed', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: idToken
      }
    })

    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (error) {
    console.log('An error has occurred: ', error)
    return []
  }
}
export default getSubscribedCompanies
