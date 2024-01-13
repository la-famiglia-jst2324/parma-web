import { SearchIcon } from 'lucide-react'
import type { ChangeEvent } from 'react'
import React from 'react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  onSearchChange: (newSearchTerm: string) => void
  searchTerm: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, searchTerm }) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value
    onSearchChange(newSearchTerm)
  }

  return (
    <div className="relative mb-4 flex grow overflow-hidden rounded border border-gray-700 bg-gray-800">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <Input
        className="w-full bg-gray-800 pl-10 text-white placeholder:text-gray-400"
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export { SearchBar }
