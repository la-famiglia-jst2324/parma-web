import { datasources } from './DummyDatasources'

export async function GET() {
  return new Response(JSON.stringify(datasources))
}
