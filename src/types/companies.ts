export interface Company {
  id: string
  name: string
  description: string
  activeDatasources: number
  inactiveDatasources: number
}

export interface CompanyData {
  name: string
  description: string
}

export interface Attachment {
  id: string
  name: string
  filetype: string
}

export interface Datasource {
  name: string
  metrics: string[]
  status: 'Active' | 'Inactive'
}
