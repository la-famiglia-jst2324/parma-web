import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const SearchTabs = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="buckets">Buckets</TabsTrigger>
        <TabsTrigger value="companies">Companies</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div>Filter Content</div>
        <div>Sort Content</div>
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
