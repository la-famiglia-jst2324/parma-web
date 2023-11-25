import React from 'react'

export const CompaniesTable = () => {
  const companies = [
    {
      name: 'Company 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nibh eu massa eleifend porttitor. Duis tempor sed turpis venenatis suscipit. ',
      status: 'up'
    },
    {
      name: 'Company 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nibh eu massa eleifend porttitor. Duis tempor sed turpis venenatis suscipit. ',
      status: 'down'
    },
    {
      name: 'Company 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nibh eu massa eleifend porttitor. Duis tempor sed turpis venenatis suscipit. ',
      status: 'unknown'
    }
  ]

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {companies.map((company) => (
                  <tr key={company.name}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{company.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{company.description}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          company.status === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
