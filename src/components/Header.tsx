import React from 'react'
import Breadcrumbs from './Breadcrumbs'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-gray-800">
      <div className="flex h-14 items-center">
        <Breadcrumbs />
      </div>
    </header>
  )
}

export default Header
