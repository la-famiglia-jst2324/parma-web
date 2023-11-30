import { dummyCompanies } from '.././DummyCompanies'

export async function GET() {
  return new Response(JSON.stringify(dummyCompanies))
}
