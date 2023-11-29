import { companyData } from '.././DummyCompanies'

export async function GET() {
  return new Response(JSON.stringify(companyData))
}
