import { getAuth } from 'firebase/auth'

function getCurrentUserToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      unsubscribe() // Detach the observer

      if (user) {
        try {
          const token = await user.getIdToken()
          resolve(token)
        } catch (error) {
          reject(new Error(`Failed to get ID token: ${error}`))
        }
      } else {
        reject(new Error('No user logged in'))
      }
    }, reject)
  })
}
const fetchWithAuth = async (url: string, options?: RequestInit) => {
  const token = await getCurrentUserToken()

  // Add the Authorization header to the request
  const headers = new Headers(options?.headers || {})
  headers.append('Authorization', `${token}`)

  // Return the fetch promise
  return await fetch(url, {
    ...options,
    headers
  })
}

export default fetchWithAuth
