'use client'

import Link from 'next/link'
import { CogIcon, UserIcon } from '@heroicons/react/20/solid'
import Breadcrumbs from './Breadcrumbs'
import Sidebar from './Sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
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
            <div className="mx-4 inline-flex h-9 w-10 items-center justify-center rounded-full bg-gray-200 px-6">
              <Link
                href="/profile"
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
                <UserIcon className="w-6 text-[#374151]"></UserIcon>
              </Link>
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
