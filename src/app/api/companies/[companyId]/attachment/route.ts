import { companyAttachments } from '../.././DummyCompanies'

export async function POST() {
  return new Response(JSON.stringify(companyAttachments))
}
