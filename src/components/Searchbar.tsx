import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'

function SearchBar() {
  return (
    <div className="relative flex overflow-hidden rounded border border-gray-700 bg-gray-800">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <Input
        className="w-full bg-gray-800 pl-10 text-white placeholder:text-gray-400"
        placeholder="Search..."
        type="search"
      />
    </div>
  )
}

export { SearchBar }
