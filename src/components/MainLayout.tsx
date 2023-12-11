'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { CogIcon } from '@heroicons/react/20/solid'
import Breadcrumbs from './Breadcrumbs'
import Sidebar from './Sidebar'
import { AuthContext } from '@/lib/firebase/auth'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const user = useContext(AuthContext)

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />
      {/* Navbar */}
      <div className="w-full md:pl-64">
        <div className="sticky top-0 z-50 flex items-center justify-between bg-white p-4 shadow-lg">
          <div className="flex items-center">
            <Breadcrumbs />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="inline-flex h-7 w-24 items-center justify-center rounded-md bg-gray-200">
              <Link
                href="/settings"
                className="flex cursor-pointer items-center justify-center gap-2 text-sm text-slate-700"
              >
                <CogIcon className="w-4 text-slate-700" />
                Settings
              </Link>
            </div>
            <h1 className="text-base text-gray-900">{user?.displayName}</h1>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
