import type NewsItem from '@/types/news'

const news: NewsItem[] = [
  {
    id: 1,
    title: 'Tesla Unveils Revolutionary Solar-Powered Electric Car',
    companyName: 'Tesla',
    datasourceName: 'LinkedIn',
    bucketName: 'Technology',
    timestamp: '2023-03-24 12:00:00',
    measureName: 'Growth Rate',
    measureValue: 4.8,
    description:
      'In a surprising move, Tesla announces the launch of a groundbreaking solar-powered electric car that promises to redefine the future of sustainable transportation. The vehicle boasts impressive performance metrics and is set to reshape the electric car market.',
    icon: '/tesla.svg'
  },
  {
    id: 2,
    title: 'Amazon Launches Eco-Friendly Packaging Initiative',
    companyName: 'Amazon',
    datasourceName: 'LinkedIn',
    bucketName: 'Sustainability',
    timestamp: '1 week ago',
    measureName: 'Growth Rate',
    measureValue: 7.2,
    description:
      'In a bid to further its commitment to sustainability, Amazon introduces a new initiative focused on eco-friendly packaging. The company aims to significantly reduce its environmental footprint by implementing innovative packaging solutions across its vast network.',
    icon: '/amazon.svg'
  },
  {
    id: 3,
    title: "Microsoft's AI Breakthrough: Chatbot Passes Turing Test in Real-world Scenario",
    companyName: 'Microsoft',
    datasourceName: 'AI Advances Journal',
    bucketName: 'Technology',
    timestamp: '5 hours ago',
    measureName: 'MoM Growth',
    measureValue: 2.1,
    description:
      'Microsoft achieves a significant milestone as their latest AI chatbot successfully passes the Turing Test in a real-world scenario, demonstrating unprecedented conversational capabilities. This breakthrough could have far-reaching implications for the field of artificial intelligence.',
    icon: '/microsoft.svg'
  },
  {
    id: 4,
    title: "OpenAI's Latest Language Model Sets New Records in Natural Language Understanding",
    companyName: 'OpenAI',
    datasourceName: 'Twitter',
    bucketName: 'Artificial Intelligence',
    timestamp: '2022-09-15 10:00',
    measureName: 'Rating',
    measureValue: 9.8,
    description:
      "OpenAI's cutting-edge language model, GPT-4, achieves remarkable results in natural language understanding, surpassing previous benchmarks. This development opens up new possibilities for applications ranging from virtual assistants to content generation.",
    icon: '/openai.svg'
  }
]

export default news
