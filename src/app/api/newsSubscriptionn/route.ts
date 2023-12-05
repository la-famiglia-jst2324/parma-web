import { NextResponse } from 'next/server'

export async function POST(req: Request): Promise<Response> {
  const body = await req.json()
  return NextResponse.json({ prompt: body.prompt })
}

export async function GET() {
  const data = {
    subscribed: false
  }
  return new Response(JSON.stringify(data))
}
