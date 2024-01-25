import React from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import CreateDatasource from './CreateDatasource'

const InformationCard = () => {
  return (
    <Card className="mb-5">
      <CardHeader className="-mb-2 px-3 py-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Datasource Information</CardTitle>
          <CreateDatasource
            triggerButton={
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2">
        <p className="mb-2 text-sm">
          A datasource refers to the origin from which data is procured or aggregated. Within the scope of data
          scraping, it pertains to online platforms or websites, such as GitHub, LinkedIn, Reddit, among others, from
          which data is systematically extracted for analysis or other purposes.
        </p>
      </CardContent>
    </Card>
  )
}

export default InformationCard
