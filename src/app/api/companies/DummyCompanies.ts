import type { Company, CompanyData, Datasource } from '@/types/companies'

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
    id: '1',
    name: 'Pfizer Inc.',
    description:
      "Pfizer Inc. is a multinational pharmaceutical company headquartered in New York City. It is one of the world's largest pharmaceutical companies, known for its contributions to the development of various vaccines and medications.",
    activeDatasources: 10,
    inactiveDatasources: 2
  },
  {
    id: '2',
    name: 'Apple Inc.',
    description:
      'Apple Inc. is a technology company known for designing, manufacturing, and selling consumer electronics, computer software, and online services. It is a global innovator in the tech industry.',
    activeDatasources: 8,
    inactiveDatasources: 4
  },
  {
    id: '3',
    name: 'Johnson & Johnson',
    description:
      'Johnson & Johnson is a multinational healthcare company that focuses on pharmaceuticals, medical devices, and consumer goods. It is one of the largest and most well-known healthcare companies globally.',
    activeDatasources: 10,
    inactiveDatasources: 2
  },
  {
    id: '4',
    name: 'Microsoft Corporation',
    description:
      'Microsoft Corporation is a leading technology company that develops, licenses, and sells computer software, consumer electronics, and other personal computing and communications products and services.',
    activeDatasources: 8,
    inactiveDatasources: 4
  },
  {
    id: '5',
    name: 'Merck & Co. Inc.',
    description:
      'Merck & Co. Inc. is a global healthcare company that operates in the areas of pharmaceuticals, vaccines, biologic therapies, and animal health products. It is committed to improving health worldwide.',
    activeDatasources: 10,
    inactiveDatasources: 2
  },
  {
    id: '6',
    name: 'Google LLC.',
    description:
      'Google LLC. is a multinational technology company that specializes in Internet-related services and products. It is known for its search engine, online advertising technologies, and various other tech innovations.',
    activeDatasources: 8,
    inactiveDatasources: 4
  },
  {
    id: '7',
    name: 'Accenture plc',
    description:
      'Accenture plc is a global professional services company that provides a broad range of services and solutions in strategy, consulting, digital, technology, and operations. It is one of the largest consulting firms in the world.',
    activeDatasources: 12,
    inactiveDatasources: 1
  }
]

export const moreDummyCompanies: Company[] = [
  {
    id: '8',
    name: 'Amazon.com, Inc.',
    description:
      "Amazon.com, Inc. is an American multinational technology and e-commerce company based in Seattle, Washington. It is one of the world's largest online retailers and providers of various cloud services.",
    activeDatasources: 5,
    inactiveDatasources: 3
  },
  {
    id: '9',
    name: 'Facebook, Inc.',
    description:
      'Facebook, Inc. is a social media and technology company headquartered in Menlo Park, California. It is known for its social networking platform, Facebook, and other acquisitions in the tech industry.',
    activeDatasources: 5,
    inactiveDatasources: 3
  },
  {
    id: '10',
    name: 'Samsung Electronics Co., Ltd.',
    description:
      'Samsung Electronics Co., Ltd. is a South Korean multinational electronics company. It is a leading manufacturer of smartphones, televisions, home appliances, and various other electronic products.',
    activeDatasources: 5,
    inactiveDatasources: 3
  },
  {
    id: '11',
    name: 'The Coca-Cola Company',
    description:
      'The Coca-Cola Company is a multinational beverage corporation headquartered in Atlanta, Georgia. It is known for its flagship product, Coca-Cola, and a wide range of other non-alcoholic beverages.',
    activeDatasources: 5,
    inactiveDatasources: 3
  },
  {
    id: '12',
    name: 'IBM Corporation',
    description:
      'IBM Corporation is an American multinational technology and consulting company. It offers a range of technology and consulting services, including artificial intelligence, cloud computing, and data analytics.',
    activeDatasources: 5,
    inactiveDatasources: 3
  },
  {
    id: '13',
    name: 'Netflix, Inc.',
    description:
      'Netflix, Inc. is an American subscription-based streaming service offering a wide variety of TV shows, movies, documentaries, and original content. It has gained widespread popularity in the entertainment industry.',
    activeDatasources: 6,
    inactiveDatasources: 2
  },
  {
    id: '14',
    name: 'Adobe Inc.',
    description:
      'Adobe Inc. is a multinational software company known for its creative software products. It is a leader in graphic design, video editing, web development, and other digital media solutions.',
    activeDatasources: 7,
    inactiveDatasources: 1
  },
  {
    id: '15',
    name: 'Nike, Inc.',
    description:
      "Nike, Inc. is a multinational corporation known for its athletic footwear, apparel, and sports equipment. It is one of the world's largest suppliers of athletic shoes and apparel.",
    activeDatasources: 8,
    inactiveDatasources: 2
  },
  {
    id: '16',
    name: 'SpaceX',
    description:
      'Space Exploration Technologies Corp., better known as SpaceX, is an American aerospace manufacturer and space transportation company founded by Elon Musk. It is known for its ambitious goals in space exploration.',
    activeDatasources: 4,
    inactiveDatasources: 1
  },
  {
    id: '17',
    name: 'Procter & Gamble Co.',
    description:
      'Procter & Gamble Co. is a multinational consumer goods corporation. It offers a wide range of products, including cleaning agents, personal care products, beauty and grooming products, and more.',
    activeDatasources: 9,
    inactiveDatasources: 3
  },
  {
    id: '18',
    name: 'Uber Technologies, Inc.',
    description:
      'Uber Technologies, Inc. is a multinational ride-hailing company known for its mobile app that connects passengers with drivers. It has expanded its services to include food delivery and other transportation solutions.',
    activeDatasources: 6,
    inactiveDatasources: 2
  }
]

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
