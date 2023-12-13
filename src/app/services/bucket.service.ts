import type { ShareBucketProps } from '@/components/buckets/ShareBucketModal'
import fetchWithAuth from '@/utils/fetchWithAuth'

const getAllBuckets = async (page: number, name?: string) => {
  try {
    const url = name ? `/api/bucket?page=1&pageSize=10&name=${name}` : `/api/bucket?page=${page}&pageSize=10`
    const res = await fetchWithAuth(url, {
      method: 'GET',
      cache: 'no-cache'
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

const createBucket = async (body: { title: string; description?: string; isPublic: boolean }) => {
  try {
    const res = await fetchWithAuth('/api/bucket', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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

const deleteBucket = async (id: number) => {
  try {
    const res = await fetchWithAuth(`/api/bucket/${id}`, {
      method: 'DELETE',
      cache: 'no-cache'
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

const addCompaniesToBucket = async (bucketId: number, selectedCompanies: string[]) => {
  try {
    const res = await fetchWithAuth(
      `/api/companyBucketRelation?bucketId=${bucketId}&companyId=${+selectedCompanies[0]}`,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
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

const getAllCompanies = async () => {
  try {
    const res = await fetchWithAuth('/api/company', {
      method: 'GET',
      cache: 'no-cache'
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

const getBucketById = async (id: number) => {
  try {
    const res = await fetchWithAuth(`/api/bucket/${id}`, {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (e) {}
}

const getCompaniesForBucket = async (bucketId: number) => {
  try {
    const res = await fetchWithAuth(`/api/companyBucketRelation?bucketId=${bucketId}`, {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (e) {
    return e
  }
}

const updateBucket = async (title: string, description: string | null, id: number, isPublic: boolean) => {
  try {
    const res = await fetchWithAuth(`/api/bucket/${id}`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, isPublic })
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (e) {}
}

const getUsersForBucketAccess = async () => {
  try {
    const res = await fetchWithAuth(`/api/user`, {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (e) {}
}

const shareBucket = async (body: ShareBucketProps) => {
  try {
    const res = await fetchWithAuth(`/api/bucket/share?bucketId=${body.bucketId}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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

const getInvitees = async (bucketId: number) => {
  try {
    const res = await fetchWithAuth(`/api/bucket/share/${bucketId}`, {
      method: 'GET',
      cache: 'no-cache'
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
  getAllBuckets
}
