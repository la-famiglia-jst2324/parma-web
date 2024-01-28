import { readFileSync, readdirSync } from 'fs'
import { Client } from 'ts-postgres'

const createFunctions = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? '-1'),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  })
  await client.connect()

  try {
    for (const file of readdirSync('./src/api/db/prisma/manual/')) {
      console.log(
        await client.execute({
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
