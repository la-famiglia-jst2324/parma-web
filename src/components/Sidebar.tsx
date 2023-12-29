'use client'
import Link from 'next/link'
import {
  BuildingLibraryIcon,
  CircleStackIcon,
  PresentationChartLineIcon,
  ServerIcon,
  TruckIcon
} from '@heroicons/react/20/solid'
import UserNav from './UserNav'

interface SidebarLinkProps {
  href: string
  icon?: React.ElementType
  text: string
  hoverClass?: string
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, text, hoverClass = 'hover:font-semibold' }) => (
  <Link
    href={href}
    passHref
    className={`mb-6 flex cursor-pointer flex-row gap-3 text-lg font-extralight ${hoverClass}`}
  >
    {Icon && <Icon className="h-6 w-6" />}
    {text}
  </Link>
)

const Sidebar: React.FC = () => {
  return (
    <div className="w-72 flex-col border-r-2 border-gray-800">
      <div className="flex grow flex-col justify-between overflow-y-auto">
        <div className="mx-4">
          <div className="my-4 flex items-center justify-between">
            <Link href="/" passHref>
              <p className="cursor-pointer text-xl font-bold text-white">ParmaAI</p>
            </Link>
            <UserNav />
          </div>
          <div className="flex flex-col text-white">
            <SidebarLink href="/" icon={BuildingLibraryIcon} text="Dashboard" />
            <SidebarLink href="/buckets" icon={CircleStackIcon} text="Buckets" />
            <SidebarLink href="/companies" icon={TruckIcon} text="Companies" />
            <SidebarLink href="/analytics" icon={PresentationChartLineIcon} text="Analytics" />
            <SidebarLink href="/datasources" icon={ServerIcon} text="Datasources" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
