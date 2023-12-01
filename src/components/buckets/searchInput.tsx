'use client'
import { SearchIcon } from '@heroicons/react/outline'
import { TextInput } from '@tremor/react'
import { useState, useEffect } from 'react'

function SearchInput({ inputValue }: { inputValue: (searchTerm: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  useEffect(() => {
    inputValue(debouncedTerm)
  }, [debouncedTerm])

  return (
    <TextInput
      icon={SearchIcon}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
      className="mb-8 w-1/3"
    />
  )
}

export default SearchInput
