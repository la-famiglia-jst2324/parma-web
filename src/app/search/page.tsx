import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { SearchBar } from '@/components/search/Searchbar'
import SearchTabs from '@/components/search/SearchTabs'

const SearchPage = () => {
  return (
    <MainLayout>
      <SearchBar />
      {/* Filter Tabs */}
      <SearchTabs />
    </MainLayout>
  )
}

export default SearchPage
