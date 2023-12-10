export default async function getSubscribedCompanies() {
  const res = await fetch('/api/companies/subscribed-companies', {
    method: 'GET',
    cache: 'no-cache'
  })
  if (!res.ok) {
    console.error('Response status:', res.status)
    throw new Error('HTTP response was not OK')
  }

  return await res.json()
}
