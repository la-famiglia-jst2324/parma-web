import { datasources } from '../DummyDatasources'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const datasource = datasources.find((datasource) => datasource.id === Number(id))
  if (!datasource) {
    throw new Error(`Datasource with id ${id} not found`)
  }

  return new Response(JSON.stringify(datasource))
}
