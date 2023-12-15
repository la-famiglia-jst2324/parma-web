const { PrismaClient, Role } = require('@prisma/client')

const companies = [
  {
    name: 'Forto',
    description:
      'Creates scalable logistics solutions powered by technology that allows customers to run resilient and flexible supply chains that serve their business objectives.',
    createdAt: '2023-12-13T19:58:01.897Z',
    modifiedAt: '2023-12-13T19:58:01.897Z'
  },
  {
    name: 'Personio',
    description:
      'Personio covers all core HR tasks, like personnel administration, recruiting, and payroll, in one software and ensures cross-departmental, automated processes, seamless integrations, and customizable HR reports.',
    createdAt: '2023-12-13T19:59:14.824Z',
    modifiedAt: '2023-12-13T19:59:14.824Z'
  },
  {
    name: 'Luminovo',
    description:
      'Luminovo is your all-in-one solution for monitoring, quoting and procuring electronic printed circuit board assemblies (PCBAs).',
    createdAt: '2023-12-13T20:00:04.716Z',
    modifiedAt: '2023-12-13T20:00:04.716Z'
  },
  {
    name: 'Langfuse',
    description:
      'Langfuse is an open source observability & analytics solution for LLM-based applications. It is mostly geared towards production usage but some users also use it for local development of their LLM applications.',
    createdAt: '2023-12-13T20:00:55.155Z',
    modifiedAt: '2023-12-13T20:00:55.155Z'
  },
  {
    name: 'Y42',
    description:
      'Y42 is the first fully managed Modern DataOps Cloud for production-ready data pipelines on top of Google BigQuery and Snowflake.',
    createdAt: '2023-12-13T20:01:39.898Z',
    modifiedAt: '2023-12-13T20:01:39.898Z'
  }
]

async function main() {
  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findFirst()
    if (!user) {
      console.error('No users found in the database.')
      return
    }
    for (const companyData of companies) {
      const company = await prisma.company.create({
        data: {
          name: companyData.name,
          description: companyData.description,
          addedBy: user.id,
          createdAt: new Date(companyData.createdAt),
          modifiedAt: new Date(companyData.modifiedAt)
        }
      })
      console.log(`Added company with ID ${company.id}`)
    }
  } catch (error) {
    console.error('Error adding data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
