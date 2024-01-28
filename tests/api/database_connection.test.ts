/**
 * @jest-environment node
 */
import { Client } from 'pg'

describe('Database connection', () => {
  it('should be reachable', async () => {
    expect(true).toBe(true)
    expect('postgresql://parma-prod-db:parma-prod-db@localhost:9000/parma-prod-db').toBeDefined()
    const client = new Client({
      connectionString: 'postgresql://parma-prod-db:parma-prod-db@localhost:9000/parma-prod-db'
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
