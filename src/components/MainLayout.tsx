'use client'

import Link from 'next/link'
import { Cog8ToothIcon, UserIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useContext } from 'react'
import Breadcrumbs from './Breadcrumbs'
import Sidebar from './Sidebar'
import { AuthContext } from '@/lib/firebase/auth'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const user = useContext(AuthContext)
  const userPhotoURL = user?.photoURL

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
          <div className="flex items-center justify-end gap-2">
            <div className="mr-1 inline-flex h-8 w-24 items-center justify-center rounded-lg bg-gray-200">
              <Link
                href="/settings"
                className="flex cursor-pointer items-center justify-center gap-2 text-sm text-slate-700"
              >
                <Cog8ToothIcon className="w-3.5 text-slate-700" />
                Settings
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/profile"
                className="flex cursor-pointer flex-row items-center justify-center gap-3 text-lg text-[#374151]"
              >
                {userPhotoURL ? (
                  <Image
                    className="block rounded-full"
                    src={userPhotoURL}
                    width={30}
                    height={30}
                    alt={user?.displayName || 'Profile'}
                  />
                ) : (
                  <div className="flex items-center justify-center rounded-full bg-gray-200 p-2">
                    <UserIcon className="w-6 text-[#374151]" />
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
