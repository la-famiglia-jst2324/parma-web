'use client'
import Link from 'next/link'
import { Squares2X2Icon, FolderIcon, BuildingOffice2Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ChevronRight, ChevronDown, Plus } from 'lucide-react'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import UserNav from './UserNav'
import { Button } from './ui/button'
import CreateBucket from './buckets/createBucket'
import CreateCompanyModal from './companies/CreateCompanyModal'
import { SideBarContext } from './SidebarContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { AuthContext } from '@/lib/firebase/auth'
import BucketFunctions from '@/app/services/bucket.service'

const Sidebar: React.FC = () => {
  const { companies, setCompanies, buckets, setBuckets } = useContext(SideBarContext)
  const [clickBucket, setClickBucket] = useState(false)
  const [clickCompany, setClickCompany] = useState(false)

  const user = useContext(AuthContext)
  const uid = user !== 'loading' && user !== null ? user.uid : ''

  const lenBuckets = buckets?.length * 8
  let height = 60
  if (lenBuckets < 60) height = lenBuckets

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        try {
          const companiesData = await BucketFunctions.getAllCompanies()
          setCompanies(companiesData)
        } catch (error) {
          console.log('Failed to fetch companies')
        }
      }
    }
    fetchData()
  }, [uid])

  useEffect(() => {
    const fetchBuckets = async () => {
      if (uid) {
        try {
          const bucketsData = await BucketFunctions.getMyOwnBuckets()
          setBuckets(bucketsData)
        } catch (error) {
          console.log('Error in fetching buckets')
        }
      }
    }
    fetchBuckets()
  }, [uid])

  return (
    <div className="fixed h-full w-72 flex-col overflow-hidden border-r-2 border-gray-800">
      <div className="">
        <div className="mx-4">
          <div className="my-4 flex items-center justify-between">
            <Link href="/" passHref>
              <div className="flex items-center justify-start">
                <Image width="75" height="75" className="h-10 w-10 rounded-full" src="/DALLE-logo.png" alt="" />
                <p className="text-2xl font-bold">ParmaAI</p>
              </div>
            </Link>
            <UserNav />
          </div>

          {/* Newsfeed */}
          <div className="mb-4 mt-8 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="group flex w-40 justify-start rounded text-base">
                <Squares2X2Icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-200" />
                <p className="text-base font-medium text-gray-200">Newsfeed</p>
              </Button>
            </Link>
            <Link href="/search">
              <MagnifyingGlassIcon className="mr-2 h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-200" />
            </Link>
          </div>
          {/* Buckets */}
          <Collapsible>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <CollapsibleTrigger disabled={!buckets || buckets?.length === 0}>
                  <div
                    className="group inline-flex h-10 w-40 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setClickBucket(!clickBucket)}
                  >
                    <FolderIcon className={`mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-200`} />
                    <p className="text-base font-medium text-gray-200">Buckets </p>
                    {clickBucket ? (
                      <ChevronDown className="ml-2 h-3 w-3 text-gray-500" />
                    ) : (
                      <ChevronRight className="ml-2 h-3 w-3 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CreateBucket
                  triggerButton={<Plus className="mr-2 h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-200" />}
                />
              </div>
              <CollapsibleContent>
                <div className="ml-8">
                  <ScrollArea className={`h-${height} mt-2 w-full`}>
                    <div className="pl-2">
                      {buckets?.length > 0 &&
                        buckets?.map((bucket) => (
                          <div key={bucket.id}>
                            <Link href={`/buckets/${bucket.id}`} passHref>
                              <Button
                                variant="ghost"
                                className="group flex h-5 w-full justify-start rounded px-3 text-base"
                              >
                                <p className="text-sm font-medium text-slate-400 group-hover:text-gray-200">
                                  {bucket.title}
                                </p>
                              </Button>
                            </Link>
                            <Separator className="my-2" />
                          </div>
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
                <CollapsibleTrigger disabled={!companies || companies?.length === 0}>
                  <div
                    className="group inline-flex h-10 w-40 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  disabled:opacity-50"
                    onClick={() => setClickCompany(!clickCompany)}
                  >
                    <BuildingOffice2Icon className="mr-2 h-4 w-6 text-gray-500 group-hover:text-gray-200" />
                    <p className="text-base font-medium text-gray-200">Companies</p>
                    {clickCompany ? (
                      <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="ml-2 h-6 w-4 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CreateCompanyModal
                  triggerButton={<Plus className="mr-2 h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-200" />}
                />
              </div>
              <CollapsibleContent>
                <div className="ml-8">
                  <ScrollArea className="mt-2 h-60 w-full">
                    <div className="pl-2">
                      {companies?.length > 0 &&
                        companies.map((company) => (
                          <div key={company.id}>
                            <Link href={`/companies/${company.id}`} passHref>
                              <Button
                                variant="ghost"
                                className="group flex h-5 w-full justify-start rounded px-3 text-base"
                              >
                                <p className="text-sm font-medium text-slate-400 group-hover:text-gray-200">
                                  {company.name}
                                </p>
                              </Button>
                            </Link>
                            <Separator className="my-2" />
                          </div>
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
