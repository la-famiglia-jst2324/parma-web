import { Client } from 'ts-postgres'

describe('Database connection', () => {
  it('should be reachable', async () => {
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT ?? '-1'),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    })
    await client.connect()

    try {
      const result = client.query("SELECT 'Hello ' || $1 || '!' AS message", ['world'])

      for await (const row of result) {
        expect(row.get('message')).toEqual('Hello world!')
      }
    } finally {
      await client.end()
    }
  })
})
