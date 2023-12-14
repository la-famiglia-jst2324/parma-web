import axios from 'axios'
import { getAuth } from 'firebase/auth'

const fetchClient = (() => {
  const getAuthToken = async () => {
    const user = getAuth()
    try {
      return await user.currentUser?.getIdToken()
    } catch (err) {
      console.log('getAuthToken', err)
      return null
    }
  }

  const instance = axios.create({})

  instance.interceptors.request.use(async (config) => {
    config.headers.Authorization = await getAuthToken()
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('An error has occurred: ', error)
      return Promise.reject(error)
    }
  )

  return instance
})()

export default fetchClient
