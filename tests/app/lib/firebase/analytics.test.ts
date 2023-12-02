import { analytics } from '@/lib/firebase/analytics'

describe('Smoke testing firebase analytics connection', () => {
  it('should be able to connect to firebase analytics', async () => {
    const a = await analytics
    expect(a).toBeDefined()
    expect(a).toBeNull()
  })
})
