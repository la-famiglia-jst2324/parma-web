import type NewsItem from '@/types/news'

const news: NewsItem[] = [
  {
    id: 1,
    title: 'Tesla to accept Bitcoin as payment and share price jumps',
    companyName: 'Tesla',
    datasourceName: 'LinkedIn',
    timestamp: '2021-03-24 12:00:00',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit nisl, pharetra eget nunc ac, congue sagittis lectus. Aliquam erat volutpat. Phasellus nisi libero, gravida id enim a, euismod fringilla eros. Aliquam ultricies non metus a ultrices. Duis vitae urna massa. Etiam various dui nec malesuada dapibus. Donec commodo dolor ac auctor tristique. Integer metus nisl, auctor id euismod ut, feugiat et nibh',
    link: 'link_to_full_story_1'
  },
  {
    id: 2,
    title: 'Amazon to hire 75,000 workers and pay $100 bonus if they get Covid vaccine ',
    companyName: 'Amazon',
    datasourceName: 'LinkedIn',
    timestamp: 'Timestamp 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc velit nisl, pharetra eget nunc ac, congue sagittis lectus. Aliquam erat volutpat. Phasellus nisi libero, gravida id enim a, euismod fringilla eros. Aliquam ultricies non metus a ultrices. Duis vitae urna massa. Etiam various dui nec malesuada dapibus. Donec commodo dolor ac auctor tristique. Integer metus nisl, auctor id euismod ut, feugiat et nibh',
    link: 'link_to_full_story_2'
  },
  {
    id: 3,
    title: 'Title of the News 3',
    companyName: 'Company Name 3',
    datasourceName: 'Datasource Name 3',
    timestamp: 'Timestamp 3',
    description: 'Description of the news 3',
    link: 'link_to_full_story_3'
  },
  {
    id: 4,
    title: 'Title of the News 4',
    companyName: 'Company Name 4',
    datasourceName: 'Datasource Name 4',
    timestamp: 'Timestamp 4',
    description: 'Description of the news 4',
    link: 'link_to_full_story_4'
  }
]

export default news
