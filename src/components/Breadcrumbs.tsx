'use client'
import React from 'react'

import { usePathname } from 'next/navigation'

const Breadcrumbs = () => {
  const paths = usePathname()
  const pathNames = paths ? paths.split('/').filter((path) => path) : []

  return (
    <div className="px-2 text-white">
      <ul className="flex">
        {pathNames.map((link, index) => {
          const itemLink = link[0].toUpperCase() + link.slice(1, link.length)
          return (
            <React.Fragment key={index}>
              <span className="mx-2">{itemLink}</span>
              {pathNames.length !== index + 1 && <span> | </span>}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumbs
