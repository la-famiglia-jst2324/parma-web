'use client'
import Link from 'next/link'
import { Squares2X2Icon, FolderIcon, BuildingOffice2Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import UserNav from './UserNav'
import useCompanies from './hooks/useCompanies'
import useBuckets from './hooks/useBuckets'
import { Button } from './ui/button'
import CreateBucket from './buckets/createBucket'

interface SidebarLinkProps {
  href: string
  icon?: React.ElementType
  text: string
  hoverClass?: string
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  text,
  hoverClass = 'hover:bg-gray-800 hover:text-gray-300'
}) => (
  <Link className={`ml-2 flex cursor-pointer items-center rounded text-base ${hoverClass}`} href={href}>
    {Icon && <Icon className={`mr-2 h-4 w-4 text-gray-500`} />}
    <p className="text-base font-medium text-gray-300">{text}</p>
  </Link>
)

const Sidebar: React.FC = () => {
  const buckets = useBuckets()
  const companies = useCompanies()

  return (
    <div className="w-72 flex-col border-r-2 border-gray-800">
      <div className="flex grow flex-col justify-between overflow-y-auto">
        <div className="mx-4">
          <div className="my-4 flex items-center justify-between">
            <Link href="/" passHref>
              <div className="flex items-center justify-start">
                <Image width="50" height="50" className="h-10 w-10 rounded-full" src="/DALLE-logo.png" alt="" />
                <p className="text-base font-medium text-gray-300">ParmaAI</p>
              </div>
            </Link>
            <UserNav />
          </div>
          {/* Overview */}
          <div className="mb-8 flex items-center justify-between">
            <SidebarLink href="/" icon={Squares2X2Icon} text="Overview" />
            <Link href="/search">
              <Button
                variant="ghost"
                size="icon"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 text-gray-600 hover:bg-gray-900"
              >
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 hover:text-gray-400" />
              </Button>
            </Link>
          </div>
          {/* Buckets */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="ml-2 flex items-center rounded text-base">
                <FolderIcon className={`mr-2 h-4 w-4 text-gray-500`} />
                <p className="text-base font-medium text-gray-300">Buckets</p>
              </div>
              <CreateBucket></CreateBucket>
            </div>
            <div className="ml-6">
              {buckets.slice(0, 3).map((bucket) => (
                <SidebarLink key={bucket.id} href={`/buckets/${bucket.id}`} text={bucket.title} />
              ))}
            </div>
          </div>
          {/* Companies */}
          <div className="mb-8">
            <div className="ml-2 flex items-center rounded text-base">
              <BuildingOffice2Icon className={`mr-2 h-4 w-4 text-gray-500`} />
              <p className="text-base font-medium text-gray-300">Companies</p>
            </div>
            <div className="ml-6">
              {companies.slice(0, 3).map((company) => (
                <SidebarLink key={company.id} href={`/companies/${company.id}`} text={company.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
