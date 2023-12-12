import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import { BuildingOffice2Icon, PresentationChartLineIcon, ShieldCheckIcon } from '@heroicons/react/20/solid'
import { CompaniesTable } from './CompaniesTable'
import ScheduledTasksTable from './ScheduledTasks'

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
        <Tab icon={BuildingOffice2Icon}>Companies Monitored</Tab>
        <Tab icon={ShieldCheckIcon}>Datasource Health</Tab>
        <Tab icon={PresentationChartLineIcon}>Scheduled Tasks</Tab>
      </TabList>
      <TabPanels>
        {/* Companies Monitored */}
        <TabPanel>
          <CompaniesTable datasourceId={sourceId} />
        </TabPanel>
        {/* Source Health */}
        <TabPanel>
          <NoData />
        </TabPanel>
        {/* Scheduled Tasks */}
        <TabPanel>
          <ScheduledTasksTable datasourceId={sourceId} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
