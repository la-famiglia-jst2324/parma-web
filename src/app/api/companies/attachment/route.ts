import { companyAttachments } from '.././DummyCompanies'

export async function GET() {
  return new Response(JSON.stringify(companyAttachments))
}
