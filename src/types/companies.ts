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
  attachments: Attachment[]
}

export interface Metric {
  name: string
  status: 'Active' | 'Inactive'
}

export interface Attachment {
  id: number
  name: string
  filetype: string
}

export interface Datasource {
  name: string
  metrics: Metric[]
}
