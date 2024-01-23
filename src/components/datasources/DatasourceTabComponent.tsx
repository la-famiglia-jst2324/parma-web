import type { ScheduledTask } from '@prisma/client'
import { CompaniesTable } from './CompaniesTable'
import ScheduledTasksTable from './ScheduledTasks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const NoData: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold">No data available</h1>
    <p className="text-gray-500">No data has been collected yet</p>
  </div>
)

interface TabComponentProps {
  sourceId: string
  tasksData: ScheduledTask[]
}

export const TabComponent: React.FC<TabComponentProps> = ({ sourceId, tasksData }) => {
  return (
    <Tabs defaultValue="Companies Monitored">
      <TabsList>
        <TabsTrigger value="Companies Monitored">Companies Monitored</TabsTrigger>
        <TabsTrigger value="Scheduled Tasks">Scheduled Tasks</TabsTrigger>
      </TabsList>
      {/* Companies Monitored */}
      <TabsContent value="Companies Monitored">
        <CompaniesTable datasourceId={sourceId} />
      </TabsContent>
      {/* Scheduled Tasks */}
      <TabsContent value="Scheduled Tasks">
        <ScheduledTasksTable data={tasksData} />
      </TabsContent>
    </Tabs>
  )
}
