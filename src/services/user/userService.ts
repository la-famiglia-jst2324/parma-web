import type { Role } from '@prisma/client'
import fetchClient from '../fetchClient'

export async function putUserAttachment(data: FormData) {
  try {
    const response = await fetchClient.put(`/api/user/pic`, data)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function postUserAttachment(data: FormData) {
  try {
    const response = await fetchClient.post(`/api/user/pic`, data)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function getUserAttachment(idToken: string) {
  try {
    const response = await fetch(`/api/user/pic`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: idToken
      }
    })
    // const response = await fetchClient.get(`/api/user/pic`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function putUsername(username?: string, role?: Role, profilePicture?: string) {
  try {
    const response = await fetchClient.put(`/api/profile`, { username, role, profilePicture })
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function getUsername() {
  try {
    const response = await fetchClient.get(`/api/profile`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}
