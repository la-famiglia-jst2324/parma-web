'use client'
import React from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Breadcrumbs = () => {
  const paths = usePathname()
  const pathNames = paths ? paths.split('/').filter((path) => path) : []

  return (
    <div className="px-2 text-white">
      <ul className="flex">
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`
          const itemLink = link[0].toUpperCase() + link.slice(1, link.length)
          return (
            <React.Fragment key={index}>
              <li className="mx-2 font-medium hover:underline">
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && <span> | </span>}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumbs
