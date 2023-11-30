'use client'

import { CogIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Breadcrumbs from './Breadcrumbs'
import Sidebar from './Sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <Sidebar />
      {/* Navbar */}
      <div className="w-full">
        <div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-white p-4 shadow-lg">
          <Breadcrumbs />
          <div className="mr-4 inline-flex h-9 w-32 items-center justify-center rounded-md bg-gray-200">
            <Link
              href="/settings"
              className="
                flex
                cursor-pointer
                flex-row
                items-center
                justify-center
                gap-3
                text-lg
                text-[#374151]
              "
            >
              <CogIcon className="w-6 text-[#374151]"></CogIcon>Settings
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
