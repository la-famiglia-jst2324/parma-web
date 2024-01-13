'use client'
import React, { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { SearchBar } from '@/components/search/Searchbar'
import SearchTabs from '@/components/search/SearchTabs'

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }

  return (
    <MainLayout>
      <SearchBar onSearchChange={handleSearchChange} />
      <SearchTabs searchTerm={searchTerm} />
    </MainLayout>
  )
}

export default SearchPage
