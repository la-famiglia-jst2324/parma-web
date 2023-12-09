import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import { OfficeBuildingIcon, PresentationChartLineIcon, ShieldCheckIcon } from '@heroicons/react/outline'
import { CompaniesTable } from './CompaniesTable'

export const NoData: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold">No data available</h1>
    <p className="text-gray-500">No data has been collected yet</p>
  </div>
)

interface TabComponentProps {
  sourceId: string
}

export const TabComponent: React.FC<TabComponentProps> = ({ sourceId }) => {
  return (
    <TabGroup>
      <TabList className="mt-8" variant="solid">
        <Tab icon={OfficeBuildingIcon}>Companies Monitored</Tab>
        <Tab icon={ShieldCheckIcon}>Datasource Health</Tab>
        <Tab icon={PresentationChartLineIcon}>Scheduling Tasks</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CompaniesTable datasourceId={sourceId} />
        </TabPanel>
        <TabPanel>
          <NoData />
        </TabPanel>
        <TabPanel>
          <NoData />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
