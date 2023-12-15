import React from 'react'

const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-y-2 border-gray-900"></div>
    </div>
  )
}

export default Spinner
