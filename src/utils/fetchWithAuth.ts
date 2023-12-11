const fetchWithAuth = async (url: string, options?: RequestInit) => {
  const token = localStorage.getItem('token')

  // Add the Authorization header to the request
  const headers = new Headers(options?.headers || {})
  headers.append('Authorization', `Bearer ${token}`)

  // Return the fetch promise
  return await fetch(url, {
    ...options,
    headers
  })
}

export default fetchWithAuth
