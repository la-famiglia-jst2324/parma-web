import { searchCompaniesAndBuckets } from '@/api/db/services/searchService'

describe('searchCompaniesAndBuckets', () => {
  it('returns combined and paginated results', async () => {
    const result = await searchCompaniesAndBuckets('', 1, 2)

    // Check the result
    expect(result.data.length).toBeGreaterThan(0)
    expect(result.pagination.currentPage).toEqual(1)
    expect(result.pagination.pageSize).toEqual(2)
  })
})
