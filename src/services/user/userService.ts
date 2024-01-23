import type { Role } from '@prisma/client'
import fetchClient from '../fetchClient'

export async function postCompanyAttachment(companyId: string, data: FormData) {
  try {
    const response = await fetchClient.post(`/api/company/${companyId}/attachment`, data)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function putUserAttachment(data: FormData) {
  try {
    const response = await fetchClient.put(`/api/user/pic`, data)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function getUserAttachment() {
  try {
    const response = await fetchClient.get(`/api/user/pic`)
    console.log('d', response.data)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

export async function putUsername(name?: string, role?: Role, profilePicture?: string) {
  try {
    const response = await fetchClient.put(`/api/profile`, { name, role, profilePicture })
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
