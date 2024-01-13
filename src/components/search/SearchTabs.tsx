import React from 'react'
import DataTable from './SearchResultsTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

interface SearchItem {
  id: number
  name: string
  description: string
  addedBy: number
  createdAt: string
  modifiedAt: string
  type: string
}

type SearchData = {
  [key: string]: SearchItem
}

interface SearchTabsProps {
  searchData: SearchData
}

const SearchTabs: React.FC<SearchTabsProps> = ({ searchData }) => {
  const bucketData = Object.values(searchData).filter((item: SearchItem) => item.type === 'bucket')
  const companiesData = Object.values(searchData).filter((item: SearchItem) => item.type === 'company')

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="buckets">Buckets</TabsTrigger>
        <TabsTrigger value="companies">Companies</TabsTrigger>
      </TabsList>
      <Separator className="my-3 w-full" />
      <TabsContent value="all">
        {Array.isArray(searchData?.data) && searchData.data.length > 0 ? (
          <div>
            <DataTable data={searchData.data} />
          </div>
        ) : (
          <p className="flex items-center justify-center text-center text-white">
            No results matching your search query.
          </p>
        )}
      </TabsContent>
      <TabsContent value="buckets">
        {Array.isArray(bucketData) && bucketData.length > 0 ? (
          <div>
            <DataTable data={bucketData} />
          </div>
        ) : (
          <p className="flex items-center justify-center text-center text-white">No buckets found.</p>
        )}
      </TabsContent>
      <TabsContent value="companies">
        {Array.isArray(companiesData) && companiesData.length > 0 ? (
          <div>
            <DataTable data={companiesData} />
          </div>
        ) : (
          <p className="flex items-center justify-center text-center text-white">No companies found.</p>
        )}
      </TabsContent>
    </Tabs>
  )
}

export default SearchTabs
