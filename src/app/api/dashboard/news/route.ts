import news from './DummyData'

export async function GET() {
  return new Response(JSON.stringify(news))
}
