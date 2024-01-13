import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getSearchData } from '@/services/search/searchService'

interface SearchItem {
  id: number
  name: string
  // Add other properties as needed
}

interface SearchTabsProps {
  searchTerm: string
}

const SearchTabs: React.FC<SearchTabsProps> = ({ searchTerm }) => {
  const [searchData, setSearchData] = useState<SearchItem[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSearchData(searchTerm, 1, 10)
        setSearchData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="buckets">Buckets</TabsTrigger>
        <TabsTrigger value="companies">Companies</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        {Array.isArray(searchData) && (
          <div>
            <h2>All Content</h2>
            {searchData.map((item: SearchItem) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent value="buckets">
        <div>Buckets</div>
      </TabsContent>
      <TabsContent value="companies">
        <div>Companies</div>
      </TabsContent>
    </Tabs>
  )
}

export default SearchTabs
