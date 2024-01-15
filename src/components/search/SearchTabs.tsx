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
  data: SearchItem[]
  pagination: {
    currentPage: number
    pageSize: number
    totalPages: number
    totalCount: number
  }
}

interface SearchTabsProps {
  hasSearched: boolean
  searchTerm: string
  searchData: SearchData
  onPageChange: (newPage: number) => void
  onItemsPerPageChange: (newSize: number) => void
}

const SearchTabs: React.FC<SearchTabsProps> = ({
  searchData,
  searchTerm,
  hasSearched,
  onPageChange,
  onItemsPerPageChange
}) => {
  const bucketData = Object.values(searchData?.data || {}).filter((item: SearchItem) => item.type === 'bucket')
  const companiesData = Object.values(searchData?.data || {}).filter((item: SearchItem) => item.type === 'company')
  const pagination = searchData?.pagination || { currentPage: 1, totalCount: 0, totalPages: 0, pageSize: 0 }

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="buckets">Buckets</TabsTrigger>
        <TabsTrigger value="companies">Companies</TabsTrigger>
      </TabsList>
      <div className="-mx-4">
        <Separator className="my-3 w-full" />
        <TabsContent value="all">
          {hasSearched && Array.isArray(searchData?.data) && searchData.data.length > 0 ? (
            <div>
              <DataTable
                onItemsPerPageChange={onItemsPerPageChange}
                onPageChange={onPageChange}
                pagination={pagination}
                data={searchData.data}
              />
            </div>
          ) : hasSearched ? (
            <p className="flex items-center justify-center text-center text-white">
              No results found matching '{searchTerm}'.
            </p>
          ) : null}
        </TabsContent>
        <TabsContent value="buckets">
          {hasSearched && Array.isArray(bucketData) && bucketData.length > 0 ? (
            <div>
              <DataTable
                onItemsPerPageChange={onItemsPerPageChange}
                onPageChange={onPageChange}
                pagination={pagination}
                data={bucketData}
              />
            </div>
          ) : hasSearched ? (
            <p className="flex items-center justify-center text-center text-white">
              No buckets found with the name '{searchTerm}'.
            </p>
          ) : null}
        </TabsContent>
        <TabsContent value="companies">
          {hasSearched && Array.isArray(companiesData) && companiesData.length > 0 ? (
            <div>
              <DataTable
                onItemsPerPageChange={onItemsPerPageChange}
                onPageChange={onPageChange}
                pagination={pagination}
                data={companiesData}
              />
            </div>
          ) : hasSearched ? (
            <p className="flex items-center justify-center text-center text-white">
              No companies found with the name '{searchTerm}'.
            </p>
          ) : null}
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default SearchTabs
