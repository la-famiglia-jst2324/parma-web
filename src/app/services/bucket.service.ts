import type { ShareBucketProps } from '@/components/buckets/ShareBucketModal'
import fetchClient from '@/services/fetchClient'

const getAllBuckets = async (page: number, name?: string) => {
  try {
    const url = name ? `/api/bucket?page=1&pageSize=10&name=${name}` : `/api/bucket?page=${page}&pageSize=10`
    const res = await fetchClient.get(url)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

const createBucket = async (body: { title: string; description?: string; isPublic: boolean }) => {
  try {
    const res = await fetchClient.post('/api/bucket', body)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

const deleteBucket = async (id: number) => {
  try {
    const res = await fetchClient.delete(`/api/bucket/${id}`)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

const addCompaniesToBucket = async (bucketCompanies: { bucketId: string; companyId: string }[]) => {
  try {
    const res = await fetchClient.post(`/api/companyBucketRelation`, bucketCompanies)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

const getAllCompanies = async () => {
  try {
    const res = await fetchClient.get('/api/company')
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

const getBucketById = async (id: number) => {
  try {
    const res = await fetchClient.get(`/api/bucket/${id}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getCompaniesForBucket = async (bucketId: number) => {
  try {
    const res = await fetchClient.get(`/api/companyBucketRelation?bucketId=${bucketId}`)
    return res.data
  } catch (e) {
    return e
  }
}

const updateBucket = async (title: string, description: string | null, id: number, isPublic: boolean) => {
  try {
    const res = await fetchClient.put(`/api/bucket/${id}`, { title, description, isPublic })
    return res.data
  } catch (e) {}
}

const getUsersForBucketAccess = async () => {
  try {
    const res = await fetchClient.get(`/api/user`)
    return res.data
  } catch (e) {}
}

const shareBucket = async (body: ShareBucketProps[]) => {
  try {
    const res = await fetchClient.post(`/api/bucket/share`, body)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

const getInvitees = async (bucketId: number) => {
  try {
    const res = await fetchClient.get(`/api/bucket/share/${bucketId}`)
    return res.data
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

const getMyOwnBuckets = async () => {
  try {
    const response = await fetchClient.get(`/api/bucket/own`)
    return response.data
  } catch (error) {
    console.log('An error has occurred: ', error)
    throw error
  }
}

const deleteCompaniesFromBucket = async (bucketId: number, companies: number[]) => {
  try {
    const companiesQuery = companies.map((companyId) => `companyId=${companyId}`).join('&')
    const response = await fetchClient.delete(`/api/companyBucketRelation?bucketId=${bucketId}&${companiesQuery}`)
    return response.data
  } catch (e) {}
}

const updateInvitee = async (bucketId: number, inviteeId: number, permission: string) => {
  try {
    const response = await fetchClient.put(`/api/bucket/share/${bucketId}`, {
      inviteeId,
      permission
    })
    return response.data
  } catch (e) {}
}

const deleteInvitee = async (bucketId: number, inviteeId: number) => {
  try {
    const response = await fetchClient.delete(`/api/bucket/share/${bucketId}`, { data: { inviteeId } })
    return response.data
  } catch (e) {}
}

export default {
  createBucket,
  deleteBucket,
  addCompaniesToBucket,
  getAllCompanies,
  getBucketById,
  getCompaniesForBucket,
  updateBucket,
  getUsersForBucketAccess,
  shareBucket,
  getInvitees,
  getAllBuckets,
  getMyOwnBuckets,
  deleteCompaniesFromBucket,
  updateInvitee,
  deleteInvitee
}
