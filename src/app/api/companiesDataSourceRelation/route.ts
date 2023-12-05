import { dummyDatasourceHealth } from './DummyCompanies'

export async function GET() {
  return new Response(JSON.stringify(dummyDatasourceHealth))
}
