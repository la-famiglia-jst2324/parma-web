import news from './DummyData'
import TopBuckets from './DummyTopBuckets'

export async function GET() {
  const data = {
    topBuckets: TopBuckets,
    news
  }
  return new Response(JSON.stringify(data))
}
