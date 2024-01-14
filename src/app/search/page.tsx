'use client'
import React, { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { SearchBar } from '@/components/search/Searchbar'
import SearchTabs from '@/components/search/SearchTabs'
import { Button } from '@/components/ui/button'
import { getSearchData } from '@/services/search/searchService'

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchData, setSearchData] = useState()
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const fetchSearchedData = async () => {
    try {
      const searchCompanies = await getSearchData(searchTerm, 1, 15)
      setSearchData(searchCompanies)
      setHasSearched(true)
    } catch (error) {
      console.error('Failed to fetch more companies:', error)
    }
  }

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
    setHasSearched(false)
  }

  return (
    <MainLayout>
      <div className="flex">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="pl-2">
          <Button
            onClick={() => {
              fetchSearchedData()
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <SearchTabs hasSearched={hasSearched} searchTerm={searchTerm} searchData={searchData || {}} />
    </MainLayout>
  )
}

export default SearchPage
