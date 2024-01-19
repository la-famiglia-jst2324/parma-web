'use client'
import Link from 'next/link'
import { Squares2X2Icon, FolderIcon, BuildingOffice2Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import UserNav from './UserNav'
import useCompanies from './hooks/useCompanies'
import useBuckets from './hooks/useBuckets'
import { Button } from './ui/button'
import CreateBucket from './buckets/createBucket'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface SidebarLinkProps {
  href: string
  icon?: React.ElementType
  text: string
  hoverClass?: string
  size?: string
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  text,
  hoverClass = 'hover:bg-gray-800',
  size
}) => (
  <Link className={`ml-2 flex cursor-pointer items-center rounded text-base ${hoverClass}`} href={href}>
    {Icon && <Icon className={`mr-2 h-4 w-4 text-gray-500`} />}
    <p className={`text-base font-medium text-gray-300 ${size}`}>{text}</p>
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
                <p className="text-base font-semibold">ParmaAI</p>
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
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 text-gray-600 hover:bg-gray-900"
              >
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 hover:text-gray-400" />
              </Button>
            </Link>
          </div>
          {/* Buckets */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <SidebarLink href="/buckets" icon={FolderIcon} text="Buckets" />
              <CreateBucket></CreateBucket>
            </div>
            <div className="ml-6">
              <ScrollArea className="mt-2 h-24 w-full">
                <div className="pl-2">
                  {buckets.map((bucket) => (
                    <>
                      <div key={bucket.id}>
                        <SidebarLink
                          key={bucket.id}
                          href={`/buckets/${bucket.id}`}
                          text={bucket.title}
                          size="text-sm text-slate-300"
                        />
                      </div>
                      <Separator className="my-2" />
                    </>
                  ))}
                </div>
              </ScrollArea>
              {/* {buckets.slice(0, 3).map((bucket) => (
                <SidebarLink key={bucket.id} href={`/buckets/${bucket.id}`} text={bucket.title} />
              ))} */}
            </div>
          </div>
          {/* Companies */}
          <div className="mb-8">
            <SidebarLink href="/companies" icon={BuildingOffice2Icon} text="Companies" />
            <div className="ml-6">
              <ScrollArea className="mt-2 h-24 w-full">
                <div className="pl-2">
                  {companies.map((company) => (
                    <>
                      <div key={company.id}>
                        <SidebarLink
                          key={company.id}
                          href={`/buckets/${company.id}`}
                          text={company.name}
                          size="text-sm text-slate-300"
                        />
                      </div>
                      <Separator className="my-2" />
                    </>
                  ))}
                </div>
              </ScrollArea>
              {/* {companies.slice(0, 3).map((company) => (
                <SidebarLink key={company.id} href={`/companies/${company.id}`} text={company.name} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
