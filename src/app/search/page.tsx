'use client'
import React, { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { SearchBar } from '@/components/search/Searchbar'
import SearchTabs from '@/components/search/SearchTabs'
import { Button } from '@/components/ui/button'
import { getSearchData } from '@/services/search/searchService'
import { Separator } from '@/components/ui/separator'

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchData, setSearchData] = useState()

  const fetchSearchedData = async () => {
    try {
      const searchCompanies = await getSearchData(searchTerm, 1, 20)
      setSearchData(searchCompanies)
    } catch (error) {
      console.error('Failed to fetch more companies:', error)
    }
  }

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }

  return (
    <MainLayout>
      <div className="flex">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="pl-2">
          <Button onClick={fetchSearchedData}>Search</Button>
        </div>
      </div>
      <Separator className="mb-3" />
      <SearchTabs searchData={searchData || {}} />
    </MainLayout>
  )
}

export default SearchPage
