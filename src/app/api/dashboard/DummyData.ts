import type NewsItem from '@/types/news'

const news: NewsItem[] = [
  {
    id: 1,
    title: 'Tesla Unveils Revolutionary Solar-Powered Electric Car',
    companyName: 'Tesla',
    datasourceName: 'LinkedIn',
    timestamp: '2023-03-24 12:00:00',
    description:
      'In a surprising move, Tesla announces the launch of a groundbreaking solar-powered electric car that promises to redefine the future of sustainable transportation. The vehicle boasts impressive performance metrics and is set to reshape the electric car market.',
    link: 'link_to_full_story_1',
    icon: '/tesla.svg'
  },
  {
    id: 2,
    title: 'Amazon Launches Eco-Friendly Packaging Initiative',
    companyName: 'Amazon',
    datasourceName: 'LinkedIn',
    timestamp: '1 week ago',
    description:
      'In a bid to further its commitment to sustainability, Amazon introduces a new initiative focused on eco-friendly packaging. The company aims to significantly reduce its environmental footprint by implementing innovative packaging solutions across its vast network.',
    link: 'link_to_full_story_2',
    icon: '/amazon.svg'
  },
  {
    id: 3,
    title: "Microsoft's AI Breakthrough: Chatbot Passes Turing Test in Real-world Scenario",
    companyName: 'Microsoft',
    datasourceName: 'AI Advances Journal',
    timestamp: '5 hours ago',
    description:
      'Microsoft achieves a significant milestone as their latest AI chatbot successfully passes the Turing Test in a real-world scenario, demonstrating unprecedented conversational capabilities. This breakthrough could have far-reaching implications for the field of artificial intelligence.',
    link: 'link_to_full_story_3',
    icon: '/microsoft.svg'
  },
  {
    id: 4,
    title: "OpenAI's Latest Language Model Sets New Records in Natural Language Understanding",
    companyName: 'OpenAI',
    datasourceName: 'Twitter',
    timestamp: '2022-09-15 10:00',
    description:
      "OpenAI's cutting-edge language model, GPT-4, achieves remarkable results in natural language understanding, surpassing previous benchmarks. This development opens up new possibilities for applications ranging from virtual assistants to content generation.",
    link: 'link_to_full_story_4',
    icon: '/openai.svg'
  }
]

export default news
