'use client'
import Link from 'next/link'
import { Squares2X2Icon, FolderIcon, BuildingOffice2Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ChevronRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import UserNav from './UserNav'
import useCompanies from './hooks/useCompanies'
import useBuckets from './hooks/useBuckets'
import { Button } from './ui/button'
import CreateBucket from './buckets/createBucket'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

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
  const [clickBucket, setClickBucket] = useState(false)
  const [clickCompany, setClickCompany] = useState(false)
  return (
    <div className="w-72 flex-col border-r-2 border-gray-800">
      <div className="flex grow flex-col justify-between overflow-y-auto">
        <div className="mx-4">
          <div className="my-4 flex items-center justify-between">
            <Link href="/" passHref>
              <div className="flex items-center justify-start">
                <Image width="75" height="75" className="h-10 w-10 rounded-full" src="/DALLE-logo.png" alt="" />
                <p className="font-mono text-2xl font-bold tracking-wide	">ParmaAI</p>
              </div>
            </Link>
            <UserNav />
          </div>

          {/* Overview */}
          <div className="mb-4 mt-8 flex items-center justify-between">
            {/* <SidebarLink href="/" icon={Newspaper} text="Newsfeed" /> */}
            <Link href="/">
              <Button variant="ghost" className="group flex w-40 justify-start rounded text-base">
                <Squares2X2Icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-200" />
                <p className="text-base font-medium text-gray-300">Newsfeed</p>
              </Button>
            </Link>
            <Link href="/search">
              {/* <Button
                variant="link"
                size="icon"
               className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-600 text-gray-600 hover:bg-gray-900"
              > */}
              <MagnifyingGlassIcon className="hover:text-gray-20 mr-2 h-4 w-4 cursor-pointer text-gray-500" />
              {/* </Button> */}
            </Link>
          </div>
          {/* Buckets */}
          <Collapsible>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <CollapsibleTrigger>
                  <Button
                    variant="ghost"
                    className="group flex w-40 justify-start rounded text-base hover:text-white"
                    onClick={() => setClickBucket(!clickBucket)}
                  >
                    <FolderIcon className={`mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-200`} />
                    <p className="text-base font-medium text-gray-300">Buckets </p>
                    {clickBucket ? (
                      <ChevronDown className="ml-2 h-3 w-3 text-gray-500" />
                    ) : (
                      <ChevronRight className="ml-2 h-3 w-3 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CreateBucket></CreateBucket>
              </div>
              <CollapsibleContent>
                <div className="ml-6">
                  <ScrollArea className="mt-2 h-32 w-full">
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
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
          {/* Companies */}
          <Collapsible>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <CollapsibleTrigger>
                  <Button
                    variant="ghost"
                    className="groupn flex w-40 shrink-0 justify-start text-base  hover:text-white"
                    onClick={() => setClickCompany(!clickCompany)}
                  >
                    <BuildingOffice2Icon className="mr-2 h-4 w-6 text-gray-500 group-hover:text-gray-200" />
                    <p className="text-base font-medium text-gray-300">Companies</p>
                    {clickCompany ? (
                      <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="ml-2 h-6 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="ml-8">
                  <ScrollArea className="mt-2 h-32 w-full">
                    <div className="pl-2">
                      {companies.map((company) => (
                        <>
                          <div key={company.id}>
                            <SidebarLink
                              key={company.id}
                              href={`/companies/${company.id}`}
                              text={company.name}
                              size="text-sm text-slate-300"
                            />
                          </div>
                          <Separator className="my-2" />
                        </>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
