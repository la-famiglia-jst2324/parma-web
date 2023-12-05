import { companyAttachments } from '../../.././DummyCompanies'

export async function GET() {
  return new Response(JSON.stringify(companyAttachments))
}

export async function DELETE() {
  companyAttachments.splice(1, 1)
  return new Response(JSON.stringify(companyAttachments))
}
