'use client'
import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import {
  BuildingLibraryIcon,
  CircleStackIcon,
  PresentationChartLineIcon,
  ServerIcon,
  TruckIcon,
  ArrowRightIcon
} from '@heroicons/react/20/solid'
import { Button } from '@tremor/react'
import { AuthContext, authLogout } from '@/lib/firebase/auth'

const Sidebar = () => {
  const user = useContext(AuthContext)
  const router = useRouter()
  return (
    <div className="fixed z-10 flex min-h-screen w-64 flex-col bg-primary">
      <div className="flex grow flex-col justify-between overflow-y-auto">
        <div className="ml-4">
          <div className="mb-14 mt-4">
            <Link href="/" className="cursor-pointer pt-6 text-3xl font-extrabold text-white">
              ParmaAI
            </Link>
          </div>
          <div className="flex flex-col text-white">
            <Link
              href="/"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight  hover:font-semibold"
            >
              <BuildingLibraryIcon className="h-6 w-6"></BuildingLibraryIcon>Dashboard
            </Link>
            <Link
              href="/buckets"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
            >
              <CircleStackIcon className="h-6 w-6"></CircleStackIcon> Buckets
            </Link>
            <Link
              href="/companies"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
            >
              <TruckIcon className="h-6 w-6"></TruckIcon>Companies
            </Link>
            <Link
              href="/analytics"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
            >
              <PresentationChartLineIcon className="h-6 w-6"></PresentationChartLineIcon>Analytics
            </Link>
            <Link
              href="/datasources"
              className="mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight hover:font-semibold"
            >
              <ServerIcon className="h-6 w-6"></ServerIcon> Datasources
            </Link>
          </div>
        </div>
        <Button
          className={'m-4'}
          color="indigo"
          icon={ArrowRightIcon}
          onClick={async () => {
            if (user) {
              await authLogout()
              router.push('/')
            }
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
export default Sidebar
