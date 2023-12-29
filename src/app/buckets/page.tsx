'use client'
import { Button, TextInput } from '@tremor/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Bucket } from '@prisma/client'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import BucketCard from '@/components/buckets/bucketCard'
import BucketFunctions from '@/app/services/bucket.service'
import { dummyBuckets } from '@/utils/stub/dummy_data/buckets'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'

interface BucketsPaginated {
  buckets: Bucket[]
  pagination: {
    currentPage: number
    pageSize: number
    totalPages: number
    totalCount: number
  }
}

const Buckets = () => {
  const myBuckets: Bucket[] = Object.assign([], dummyBuckets)
  // TODO call API

  const [allBuckets, setAllBuckets] = useState<BucketsPaginated>({
    buckets: [],
    pagination: {
      currentPage: 1,
      pageSize: 0,
      totalPages: 0,
      totalCount: 0
    }
  })
  const [clearSearchDisable, setClearSearchDisable] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    BucketFunctions.getAllBuckets(page)
      .then((res: BucketsPaginated) => {
        if (allBuckets) {
          const moreBuckets = {
            buckets: [...allBuckets.buckets, ...res.buckets],
            pagination: allBuckets?.pagination
          }
          setAllBuckets(moreBuckets)
        } else {
          setAllBuckets(res)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [page])

  useEffect(() => {
    if (searchTerm === '') {
      BucketFunctions.getAllBuckets(1)
        .then((res: BucketsPaginated) => {
          setAllBuckets(res)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [searchTerm])

  const filterBuckets = (searchTerm: string) => {
    if (searchTerm !== '') {
      setClearSearchDisable(false)
    }

    BucketFunctions.getAllBuckets(page, searchTerm)
      .then((res) => {
        setAllBuckets(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onClearResultClick = () => {
    setPage(1)
    setSearchTerm('')
    setClearSearchDisable(true)
  }

  const getMoreBuckets = () => {
    setPage(page + 1)
  }

  return (
    <main className="m-4 flex h-[68em] flex-row items-start justify-start space-x-4" role="main">
      <div className="m-4 rounded-md bg-white p-8">
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-3xl font-semibold">My Buckets</h1>
          <Button>
            <Link href={'/buckets/add-bucket'} className="flex items-center gap-0.5 text-white">
              <PlusCircleIcon className="mr-2 h-5 w-5" />
              Create new bucket
            </Link>
          </Button>
        </div>
        <div className="pointer-events-none mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {myBuckets.map((bucket) => (
            <BucketCard key={bucket.id} bucket={bucket} />
          ))}
        </div>
        <div>
          <h1 className="mb-4 text-2xl font-semibold">Search for trending buckets</h1>
          <div className="mb-8 flex flex-row gap-4">
            <TextInput
              // icon={SearchIcon}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-1/3"
            />
            <div className="flex flex-row  gap-4">
              <Button onClick={() => filterBuckets(searchTerm)} size="xs" disabled={searchTerm === ''}>
                Search
              </Button>
              <Button onClick={onClearResultClick} color="red" size="xs" disabled={clearSearchDisable}>
                Clear Results
              </Button>
            </div>
          </div>
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {allBuckets?.buckets.map((bucket) => <BucketCard key={bucket.id} bucket={bucket} />)}
          </div>
          <div className="flex flex-row items-center justify-center">
            <Button onClick={() => getMoreBuckets()} size="xs" disabled={searchTerm !== ''}>
              View more
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainLayoutWrapper(Buckets)
