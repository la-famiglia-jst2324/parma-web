'use client'
import type { FormEvent } from 'react'
import React, { useState } from 'react'
import { Select, SelectItem, Callout } from '@tremor/react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { Frequency } from '@prisma/client'
import GoBackButton from '@/components/Datasources/GoBackButton'
import { FormContent } from '@/components/FormContent'

export default function CreateDatasourcePage() {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [defaultFrequency, setDefaultFrequency] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  async function createDatasource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (!(defaultFrequency in Frequency)) {
      throw new Error(`Invalid frequency: ${defaultFrequency}`)
    }

    const frequencyEnum = Frequency[defaultFrequency as keyof typeof Frequency]

    const dataSource = {
      sourceName: formData.get('name') as string,
      isActive: true,
      defaultFrequency: frequencyEnum,
      healthStatus: 'UP',
      modifiedAt: new Date().toISOString(),
      url: formData.get('url') as string,
      description: formData.get('description') as string
    }

    fetch('/api/dataSources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataSource)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 5000)
      })
      .then((data) => console.log(data))
      .catch((error) => {
        setShowError(true)
        setTimeout(() => setShowSuccess(false), 5000)
        console.error('Error:', error)
      })
  }

  return (
    <>
      <div className="mx-6 h-screen pt-12">
        <div className="mx-auto max-w-screen-xl rounded-lg border-0 bg-white p-6 shadow-md">
          <div className="mb-3 flex items-center justify-start space-x-4">
            <GoBackButton />
            <h1 className="mb-2 text-2xl font-bold">Create Datasource</h1>
          </div>
          <p className="mb-4">Create a datasource by providing the name, URL and description.</p>
          <form role="form" data-testid="create-datasource-form" onSubmit={createDatasource}>
            <FormContent
              id="name"
              name="name"
              label="Datasource Name"
              placeholder="Please enter datasource name"
              value={name}
              type="input"
              onChange={(e) => setName(e.target.value)}
            />
            <FormContent
              id="description"
              name="description"
              label="Datasource Description"
              placeholder="Please enter datasource description"
              value={description}
              type="textarea"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="mb-4 flex flex-col">
              <label className="mb-2 block text-sm font-bold text-gray-700">Frequency</label>
              <Select value={defaultFrequency} onValueChange={setDefaultFrequency}>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
              </Select>
            </div>
            <FormContent
              id="url"
              name="url"
              label="Datasource URL"
              placeholder="Please enter datasource URL"
              value={url}
              type="input"
              onChange={(e) => setUrl(e.target.value)}
            />
            <div>
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Create Datasource
              </button>
            </div>
          </form>
        </div>
        <div className="fixed bottom-0 right-0 m-6 w-96">
          {showSuccess && (
            <Callout title="Datasource created successfully" icon={CheckCircleIcon} color="teal">
              You have successfully created a datasource. This datasource will be added to the list of datasources.
            </Callout>
          )}
          {showError && (
            <Callout title="Error creating datasource" icon={ExclamationCircleIcon} color="red">
              There was an error creating the datasource. Please try again.
            </Callout>
          )}
        </div>
      </div>
    </>
  )
}
