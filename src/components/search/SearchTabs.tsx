import React from 'react'
import { columns } from './Columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from '@/components/DataTable/Table'

interface SearchItem {
  id: number
  name: string
  description: string
  addedBy: number
  createdAt: string
  modifiedAt: string
  type: string
}

interface SearchTabsProps {
  hasSearched: boolean
  searchTerm: string
  searchData: SearchItem[]
}

const SearchTabs: React.FC<SearchTabsProps> = ({ searchData, searchTerm, hasSearched }) => {
  const bucketData = searchData?.filter((item: SearchItem) => item.type === 'bucket') || []
  const companiesData = searchData?.filter((item: SearchItem) => item.type === 'company') || []

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="buckets">Buckets</TabsTrigger>
        <TabsTrigger value="companies">Companies</TabsTrigger>
      </TabsList>
      <div className="mt-4">
        <TabsContent value="all">
          {hasSearched && Array.isArray(searchData) && searchData.length > 0 ? (
            <div>
              <DataTable columns={columns} data={searchData} type="search" />
            </div>
          ) : hasSearched && searchTerm ? (
            <p className="flex items-center justify-center text-center text-white">
              No results found matching "{searchTerm}".
            </p>
          ) : null}
        </TabsContent>
        <TabsContent value="buckets">
          {hasSearched && Array.isArray(bucketData) && bucketData.length > 0 ? (
            <div>
              <DataTable columns={columns} data={bucketData} type="search" />
            </div>
          ) : hasSearched && searchTerm ? (
            <p className="flex items-center justify-center text-center text-white">
              No buckets found with the name "{searchTerm}".
            </p>
          ) : null}
        </TabsContent>
        <TabsContent value="companies">
          {hasSearched && Array.isArray(companiesData) && companiesData.length > 0 ? (
            <div>
              <DataTable columns={columns} data={companiesData} type="search" />
            </div>
          ) : hasSearched && searchTerm ? (
            <p className="flex items-center justify-center text-center text-white">
              No companies found with the name "{searchTerm}".
            </p>
          ) : null}
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default SearchTabs
