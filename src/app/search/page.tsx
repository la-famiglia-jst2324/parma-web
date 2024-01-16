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
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 10, totalPages: 0, totalCount: 0 })

  const handlePageChange = (newPage: number) => {
    setPagination((prevState) => ({ ...prevState, currentPage: newPage }))
  }

  const handleItemsPerPageChange = (newSize: number) => {
    setPagination((prevState) => ({ ...prevState, pageSize: newSize }))
  }

  const fetchSearchedData = async () => {
    try {
      const searchedData = await getSearchData(searchTerm, 1, 10)
      setSearchData(searchedData)
      setHasSearched(true)
    } catch (error) {
      console.error('Failed to fetch search data:', error)
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
      <SearchTabs
        hasSearched={hasSearched}
        searchTerm={searchTerm}
        searchData={searchData || { data: [], pagination }}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </MainLayout>
  )
}

export default SearchPage
