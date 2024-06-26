import type { Company } from '@prisma/client'
import fetchClient from '@/services/fetchClient'

export async function getAllCompanies(idToken: string): Promise<Company[]> {
  try {
    const res = await fetch(`/api/company`, {
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
    console.log('An error has occurred in getAllCompanies')
    return []
  }
}

export async function getSubscribedCompanies() {
  try {
    const response = await fetchClient.get('/api/company/subscribed')
    return response.data
  } catch (error) {
    console.log('An error has occurred in getSubscribedCompanies')
    throw error
  }
}

export async function postCompanySubscription(companyId: string, subscribe: boolean) {
  try {
    const response = await fetchClient.post(`/api/company/subscribed?subscribe=${subscribe}`, {
      companyId: Number(companyId)
    })

    return response.data
  } catch (error) {
    console.log('An error has occurred in postCompanySubscription')
    throw error
  }
}

export async function getCompanyData(companyId: string) {
  try {
    const response = await fetchClient.get(`/api/company/${companyId}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred in getCompanyData')
    throw error
  }
}

export async function getCompanyAttachments(companyId: string) {
  try {
    const response = await fetchClient.get(`/api/company/attachment?companyId=${companyId}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred in getCompanyAttachments')
    throw error
  }
}

export async function deleteCompanyAttachment(companyId: string, attachmentId: string) {
  try {
    const response = await fetchClient.delete(`/api/company/${companyId}/attachment/${attachmentId}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred in deleteCompanyAttachment')
    throw error
  }
}

export async function getCompanyAttachmentData(companyId: string, attachmentId: string) {
  try {
    const response = await fetchClient.get(`/api/company/${companyId}/attachment/${attachmentId}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred in getCompanyAttachmentData')
    throw error
  }
}

export async function postCompanyAttachment(companyId: string, data: FormData) {
  try {
    const response = await fetchClient.post(`/api/company/${companyId}/attachment`, data)
    return response.data
  } catch (error) {
    console.log('An error has occurred in postCompanyAttachment')
    throw error
  }
}

export async function postCompany(companyName: string, companyDescription: string) {
  try {
    const body = {
      name: companyName,
      description: companyDescription
    }

    const response = await fetchClient.post('/api/company', body)

    return response.data
  } catch (error) {
    console.log('An error has occurred in postCompany')
    throw error
  }
}

export async function editCompany(companyId: string, companyName: string, companyDescription: string) {
  try {
    const body = {
      name: companyName,
      description: companyDescription
    }
    const response = await fetchClient.put(`/api/company/${companyId}`, body)
    return response.data
  } catch (error) {
    console.log('An error has occurred in editCompany')
    throw error
  }
}

export async function getCompanies(offset: number, pageSize: number) {
  try {
    const response = await fetchClient.get(`/api/company?page=${offset}&pageSize=${pageSize}`)
    return response.data?.companies || []
  } catch (error) {
    console.log('An error has occurred in getCompanies')
    return []
  }
}

export async function getCompaniesByName(companyName: string) {
  try {
    const response = await fetchClient.get(`/api/company?page=1&pageSize=100&name=${companyName}`)
    console.log(response)
    return response.data?.company || []
  } catch (error) {
    console.log('An error has occurred in getCompaniesByName')
    return []
  }
}

export async function getExportData(companyId: string) {
  try {
    const response = await fetchClient.get(`/api/company/${companyId}/rawData`)
    return response.data
  } catch (error) {
    console.log('An error has occurred in getExportData')
    return ''
  }
}

export async function getCompaniesByDatasourceId(dataSourceId: string) {
  try {
    const response = await fetchClient.get(`/api/companyDataSourceRelation?dataSourceId=${dataSourceId}`)
    return response.data
  } catch (error) {
    console.log('An error has occurred in getCompaniesByDatasourceId')
  }
}

export async function getCompanyDataSourceId(dataSourceId: string, companyId: string) {
  try {
    const response = await fetchClient.get(
      `/api/companyDataSourceRelation?companyId=${companyId}&dataSourceId=${dataSourceId}`
    )
    return response.data
  } catch (error) {
    console.log('An error has occurred in getCompanyDataSourceId')
  }
}
