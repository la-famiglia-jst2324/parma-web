import React from 'react'
import GoBackButton from '@/components/Datasources/GoBackButton'
import { FormContent } from '@/components/FormContent'
import { MainLayout } from '@/components/MainLayout'

export default function CreateDatasourcePage() {
  return (
    <>
      <MainLayout>
        <div className="mx-6 h-screen pt-12">
          <div className="mx-auto max-w-screen-xl rounded-lg border-0 bg-white p-6 shadow-md">
            <div className="mb-3 flex items-center justify-start space-x-4">
              <GoBackButton />
              <h1 className="mb-2 text-2xl font-bold">Create Datasource</h1>
            </div>
            <p className="mb-4">Create a datasource by providing the name, URL and description.</p>
            <form role="form" data-testid="create-datasource-form">
              <FormContent id="name" name="name" label="Datasource Name" placeholder="Please enter datasource name" />
              <FormContent id="url" name="url" label="Datasource URL" placeholder="Please enter datasource URL" />
              <FormContent
                id="description"
                name="description"
                label="Datasource Description"
                placeholder="Please enter datasource description"
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
        </div>
      </MainLayout>
    </>
  )
}
