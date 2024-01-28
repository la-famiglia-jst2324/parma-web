import { readFileSync, readdirSync } from 'fs'
import { Client } from 'pg'

const createFunctions = async () => {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL
  })
  await client.connect()

  try {
    for (const file of readdirSync('./src/api/db/prisma/manual/')) {
      console.log(
        await client.query({
          text: readFileSync(`./src/api/db/prisma/manual/${file}`, 'utf8')
        })
      )
    }
  } catch (error) {
    console.log(error)
  } finally {
    await client.end()
  }
}

createFunctions()
