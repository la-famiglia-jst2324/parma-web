import React from 'react'
import GoBackButton from '@/components/Datasources/GoBackButton'

export default function CreateDatasourcePage() {
  return (
    <>
      <div className="mx-6 h-screen pt-12">
        <div className="mx-auto max-w-screen-xl rounded-lg border-0 bg-white p-6 shadow-md">
          <div className="mb-3 flex items-center justify-start space-x-4">
            <GoBackButton />
            <h1 className="mb-2 text-2xl font-bold">Create Datasource</h1>
          </div>
          <p className="mb-4">Create a datasource by providing the name, URL and description.</p>
          <form role="form" data-testid="create-datasource-form">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="name">
                Datasource Name
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="Please enter datasource name"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="url">
                Datasource URL
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                id="url"
                name="url"
                placeholder="Please enter datasource URL"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="description">
                Datasource Description
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                id="description"
                name="description"
                placeholder="Please enter datasource description"
              />
            </div>

            <div>
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Create Datasource
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
