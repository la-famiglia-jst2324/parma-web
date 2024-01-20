'use client'
import React, { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { SearchBar } from '@/components/search/Searchbar'
import SearchTabs from '@/components/search/SearchTabs'
import { getSearchData } from '@/services/search/searchService'

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchData, setSearchData] = useState()
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  useEffect(() => {
    const fetchSearchedData = async () => {
      try {
        const searchedData = await getSearchData(searchTerm)
        setSearchData(searchedData)
        setHasSearched(true)
      } catch (error) {
        console.error('Failed to fetch search data:', error)
      }
    }

    fetchSearchedData()
  }, [searchTerm])

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
    setHasSearched(false)
  }

  return (
    <MainLayout>
      <div className="flex">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>
      <SearchTabs hasSearched={hasSearched} searchTerm={searchTerm} searchData={searchData || []} />
    </MainLayout>
  )
}

export default SearchPage
