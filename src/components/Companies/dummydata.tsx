// dummyData.ts

export interface Attachment {
  id: number
  name: string
  filetype: string
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

export interface Company {
  name: string
  description: string
  activeDatasources: number
  inactiveDatasources: number
}

export interface Datasource {
  name: string
  metrics: Metric[]
}

export const companyData: CompanyData = {
  name: 'Tesla',
  description: `tiam tincidunt arcu bibendum velit viverra laoreet eu accumsan orci. Cras non nisl finibus, aliquam lectus ac,
    ultricies urna. Nullam dolor sem, dapibus vitae quam volutpat, commodo bibendum nulla. tiam tincidunt arcu
    bibendum velit viverra laoreet eu accumsan orci. Cras non nisl finibus, aliquam lectus ac, ultricies urna.
    Nullam dolor sem, dapibus vitae quam volutpat, commodo bibendum nulla. tiam tincidunt arcu bibendum velit
    viverra laoreet eu accumsan orci. Cras non nisl finibus, aliquam lectus ac, ultricies urna. Nullam dolor sem,
    dapibus vitae quam volutpat, commodo bibendum nulla. tiam tincidunt arcu bibendum velit viverra laoreet eu
    accumsan orci. Cras non nisl finibus, aliquam lectus ac, ultricies urna. Nullam dolor sem, dapibus vitae quam
    volutpat, commodo bibendum nulla. tiam tincidunt arcu bibendum velit viverra laoreet eu accumsan orci. Cras
    non nisl finibus, aliquam lectus ac, ultricies urna. Nullam dolor sem, dapibus vitae quam volutpat, commodo
    bibendum nulla.`,
  attachments: [
    { id: 1, name: 'Attachment 1', filetype: 'pdf' },
    { id: 2, name: 'Attachment 2', filetype: 'jpg' }
  ]
}

export const dummyCompanies: Company[] = [
  {
    name: 'Pharmaceutical Company A',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue lacus odio, in molestie neque cursus at. Name consequat lobortis nulla, id consectetur eros iaculis in. Sed rhoncus ac ante id placerat. Sed quis velit luctus, convallis arcu eu, posuere turpis. Name id vehicula ante. ',
    activeDatasources: 10,
    inactiveDatasources: 2
  },
  {
    name: 'Tech Innovators Inc.',
    description:
      'Maecenas auctor velit sed arcu vehicula, vitae aliquam sem pellentesque. Curabitur venenatis, sapien ac laoreet semper, diam quam placerat ex, id auctor orci risus aliquet odio. Aenean dignissim lacinia tincidunt.',
    activeDatasources: 8,
    inactiveDatasources: 4
  },
  {
    name: 'Global Services Ltd.',
    description:
      'tiam tincidunt arcu bibendum velit viverra laoreet eu accumsan orci. Cras non nisl finibus, aliquam lectus ac, ultricies urna. Nullam dolor sem, dapibus vitae quam volutpat, commodo bibendum nulla.',
    activeDatasources: 12,
    inactiveDatasources: 1
  }
]

export const moreDummyCompanies: Company[] = Array.from({ length: 12 }, (_, index) => ({
  name: `Company ${index + 4}`,
  description:
    'Maecenas auctor velit sed arcu vehicula, vitae aliquam sem pellentesque. Curabitur venenatis, sapien ac laoreet semper, diam quam placerat ex, id auctor orci risus aliquet odio. Aenean dignissim lacinia tincidunt.',
  activeDatasources: 5,
  inactiveDatasources: 3
}))

export const dummyDatasourceHealth: Datasource[] = [
  {
    name: 'DataBridge',
    metrics: [
      {
        name: 'Customer lifetime value',
        status: 'Active'
      },
      {
        name: 'Retention rate',
        status: 'Inactive'
      },
      {
        name: 'Net promoter score',
        status: 'Active'
      }
    ]
  },
  {
    name: 'Wikipedia',
    metrics: [
      {
        name: 'Customer satisfaction',
        status: 'Active'
      },
      {
        name: 'Churn rate',
        status: 'Inactive'
      },
      {
        name: 'Product adoption',
        status: 'Active'
      }
    ]
  },
  {
    name: 'WhatsApp',
    metrics: [
      {
        name: 'Revenue growth',
        status: 'Active'
      },
      {
        name: 'Customer engagement',
        status: 'Inactive'
      },
      {
        name: 'Employee satisfaction',
        status: 'Active'
      }
    ]
  },
  {
    name: 'Facebook',
    metrics: [
      {
        name: 'Market share',
        status: 'Active'
      },
      {
        name: 'Customer support satisfaction',
        status: 'Inactive'
      },
      {
        name: 'Productivity index',
        status: 'Active'
      }
    ]
  },
  {
    name: 'LinkedIn',
    metrics: [
      {
        name: 'Profit margin',
        status: 'Active'
      },
      {
        name: 'Customer feedback',
        status: 'Inactive'
      },
      {
        name: 'Innovation index',
        status: 'Active'
      }
    ]
  }
]
