/**
 * @jest-environment node
 */
import { Client } from 'pg'

describe('Database connection', () => {
  it('should be reachable', async () => {
    expect(true).toBe(true)
    expect(process.env.POSTGRES_URL).toBeDefined()
    const client = new Client({
      connectionString: process.env.POSTGRES_URL
    })
    await client.connect()

    try {
      const result = await client.query("SELECT 'Hello ' || $1 || '!' AS message", ['world'])

      for (const row of result.rows) {
        expect(row.message).toBe('Hello world!')
      }
    } finally {
      await client.end()
    }
  })
})
