import type { Company, CompanyData, Datasource, Attachment } from '@/types/companies'

export const companyData: CompanyData = {
  name: 'Tesla',
  description: `Tesla, Inc., founded in 2003, is a pioneering American electric vehicle and clean energy company led by CEO Elon Musk since 2008. Renowned for its cutting-edge electric vehicles, including the Model S, Model 3, Model X, and Model Y, Tesla has revolutionized the automotive industry with high-performance capabilities and innovative features. Beyond electric cars, Tesla extends its impact to sustainable energy solutions, producing solar panels, solar roof tiles, and energy storage products like the Powerwall, Powerpack, and Megapack. Operating Gigafactories globally, including in the United States, China, and Germany, Tesla aims to scale up production. The company's commitment to autonomy and its Supercharger network for fast-charging further underscore Tesla's influence in the automotive and renewable energy sectors.`
}

export const companyAttachments: Attachment[] = [
  { id: '1', name: 'Attachment 1', filetype: 'pdf' },
  { id: '2', name: 'Attachment 2', filetype: 'jpg' }
]

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

export const dummySearchedCompanies: Company[] = [
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
    name: 'Wikipedia',
    status: 'Active',
    metrics: ['Customer satisfaction', 'Churn rate', 'Product adoption']
  },
  {
    name: 'Facebook',
    status: 'Active',
    metrics: ['User engagement', 'Ad revenue', 'Daily active users']
  },
  {
    name: 'GitHub',
    status: 'Inactive',
    metrics: ['Code commits', 'Pull requests', 'Issues closed']
  },
  {
    name: 'Twitter',
    status: 'Active',
    metrics: ['Tweet volume', 'User sentiment', 'Hashtag trends']
  },
  {
    name: 'LinkedIn',
    status: 'Inactive',
    metrics: ['Professional connections', 'Job applications', 'Profile views']
  }
]
