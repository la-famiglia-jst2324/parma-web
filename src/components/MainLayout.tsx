'use client'

import { CogIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useContext } from 'react'
import Breadcrumbs from './Breadcrumbs'
import Sidebar from './Sidebar'
import { AuthContext } from '@/lib/firebase/auth'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const user = useContext(AuthContext)

  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <Sidebar />
      {/* Navbar */}
      <div className="w-full pl-64">
        <div className="sticky top-0 z-50 flex items-center justify-between bg-white p-4 shadow-lg">
          <div className="flex items-center">
            <Breadcrumbs />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="inline-flex h-9 w-32 items-center justify-center rounded-md bg-gray-200">
              <Link
                href="/settings"
                className="flex cursor-pointer items-center justify-center gap-3 text-lg text-[#374151]"
              >
                <CogIcon className="w-6 text-[#374151]" />
                Settings
              </Link>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">{user?.displayName}</h1>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
