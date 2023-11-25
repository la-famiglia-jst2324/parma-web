import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import { CompaniesTable } from './CompaniesTable'

export const TabComponent = () => {
  return (
    <>
      <TabGroup className="rounded-md p-4">
        <TabList className="mb-4 border-b-2 border-gray-200">
          <Tab className="mr-8 border-b-2 border-transparent pb-2 hover:border-blue-500">Companies Monitored</Tab>
          <Tab className="mr-8 border-b-2 border-transparent pb-2 hover:border-blue-500">Scraping Information</Tab>
          <Tab className="mr-8 border-b-2 border-transparent pb-2 hover:border-blue-500">Datasource Health</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="rounded-md bg-white p-4 shadow-md">
            <div className="mt-4">
              <h2 className="mb-3 text-2xl font-semibold text-black">Companies Monitored by this Datasource</h2>
              <CompaniesTable />
            </div>
          </TabPanel>
          <TabPanel className="rounded-md bg-white p-4 shadow-md">
            <div className="mt-10"></div>
          </TabPanel>
          <TabPanel className="rounded-md bg-white p-4 shadow-md">
            <div className="mt-10"></div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  )
}
