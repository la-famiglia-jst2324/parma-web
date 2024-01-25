import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import CreateDatasource from './CreateDatasource'

const InformationCard = () => {
  return (
    <Card className="mb-5">
      <CardHeader className="-mb-2 px-3 py-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Datasource Information</CardTitle>
          <CreateDatasource triggerButton={<Button variant="outline">Create Datasource</Button>} />
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2">
        <p className="mb-2 text-sm">
          A datasource is a location from which data is extracted or collected. In the context of data scraping, it
          refers to websites or platforms like GitHub, LinkedIn, Reddit, etc., where data is gathered.
        </p>
      </CardContent>
    </Card>
  )
}

export default InformationCard
