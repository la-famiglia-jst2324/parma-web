'use client'

import React from 'react'
import { Button } from '@tremor/react'
import { useRouter } from 'next/navigation'

const CreateDatasource = () => {
  const router = useRouter()
  const navigateToCreate = () => {
    router.push('/datasources/add-datasource')
  }

  return (
    <div>
      <Button role="button" color="blue" onClick={navigateToCreate}>
        Create Datasource
      </Button>
    </div>
  )
}

export default CreateDatasource
