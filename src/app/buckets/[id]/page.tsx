'use client'

import { useEffect, useState } from 'react'
import type { Company, Bucket } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import DeleteBucketModal from '@/components/buckets/DeleteBucketModal'
import BucketFunctions from '@/app/services/bucket.service'
import type { ShareBucketProps } from '@/components/buckets/ShareBucketModal'
import ShareBucketModal from '@/components/buckets/ShareBucketModal'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import BucketGraph from '@/components/buckets/bucketGraph'
import AddCompaniesToBucket from '@/components/buckets/addCompanies'
import { DataTable } from '@/components/DataTable/Table'
import { columns } from '@/components/buckets/bucketColumns'
import BucketDescriptionCard from '@/components/buckets/bucketDescriptionCard'
import { ShowToast } from '@/components/ShowToast'

const initialBucketValue = {
  id: 0,
  title: '',
  description: '',
  isPublic: true,
  ownerId: 0,
  createdAt: new Date(),
  modifiedAt: new Date()
}

const BucketPage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter()
  const [bucket, setBucket] = useState<Bucket>(initialBucketValue)
  const [bucketCompanies, setBucketCompanies] = useState<Company[]>()
  const [editCompanies, setEditCompanies] = useState(false)
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])

  useEffect(() => {
    BucketFunctions.getBucketById(+id)
      .then((data) => {
        setBucket(data)
        BucketFunctions.getCompaniesForBucket(+id)
          .then((res) => {
            setBucketCompanies(res)
          })
          .catch((e) => {
            console.log(e)
          })
      })
      .catch((e) => {
        console.log(e)
      })
  }, [id])

  const onSelectCheckbox = (companyId: number | number[]) => {
    if (!Array.isArray(companyId)) {
      if (selectedCompanies.includes(companyId)) {
        setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId))
      } else {
        setSelectedCompanies([...selectedCompanies, companyId])
      }
    } else {
      setSelectedCompanies(companyId)
    }
  }
  const onDeleteBucket = () => {
    BucketFunctions.deleteBucket(+id)
      .then((res) => {
        if (res) {
          ShowToast('Success', 'Bucket deleted successfully')
          router.push('/')
        }
      })
      .catch(() => {
        ShowToast('Error', 'Failed to delete bucket', 'destructive')
      })
  }

  const onHandleShare = (shareUsersList: ShareBucketProps[]) => {
    BucketFunctions.shareBucket(shareUsersList)
      .then((res) => {
        if (res) {
          ShowToast('Success', 'Bucket is shared successfully')
        }
      })
      .catch(() => {
        ShowToast('Error', 'Failed to share the bucket', 'destructive')
      })
  }

  const removeCompanies = () => {
    if (selectedCompanies.length === 0) {
      ShowToast('Error', 'Please select at least one company', 'destructive')
      return
    }
    BucketFunctions.deleteCompaniesFromBucket(+id, selectedCompanies)
      .then((res) => {
        if (res) {
          const filteredCompanies = bucketCompanies?.filter((company) => !res.includes(company.id))
          setBucketCompanies(filteredCompanies)
          ShowToast('Success', 'Companies deleted successfully from the bucket')
        }
      })
      .catch(() => {
        ShowToast('Error', 'Failed to remove companies from the bucket', 'destructive')
      })
  }

  const addCompaniesToBucket = (companies: string[]) => {
    const updatedCompanies = companies.map((c) => {
      return { bucketId: id, companyId: c }
    })
    BucketFunctions.addCompaniesToBucket(updatedCompanies)
      .then((res) => {
        if (res) {
          setBucketCompanies((oldValue) => {
            if (oldValue) {
              return [...oldValue, ...res]
            }
            return undefined
          })
          ShowToast('Success', 'Companies added successfully')
        }
      })
      .catch(() => {
        ShowToast('Error', 'Failed to add companies to bucket', 'destructive')
      })
  }
  return (
    <main className="m-4 flex h-screen flex-row items-start justify-start space-x-4" role="main">
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="mb-3 flex items-start justify-start space-x-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">{bucket.title}</h1>
            </div>
          </div>
          <div className="flex flex-row justify-evenly gap-2">
            <ShareBucketModal
              id={id}
              handleShare={(shareUsersList: ShareBucketProps[]) => onHandleShare(shareUsersList)}
            ></ShareBucketModal>
            <DeleteBucketModal handleDelete={onDeleteBucket}></DeleteBucketModal>
          </div>
        </div>
        <div className="mb-12">
          <BucketDescriptionCard handleSave={(val) => setBucket(val)} bucket={bucket}></BucketDescriptionCard>
        </div>

        <div className="mb-12">
          <BucketGraph companies={bucketCompanies}></BucketGraph>
        </div>
        {bucketCompanies && bucketCompanies.length > 0 && (
          <div className="flex items-center justify-between">
            <h1 className="mb-8 text-2xl font-bold">All companies in this bucket</h1>
            <div className="flex flex-row items-center gap-4">
              {!editCompanies && (
                <Button
                  className="mr-2 flex items-center border-gray-500"
                  variant="outline"
                  color="gray"
                  onClick={() => setEditCompanies(true)}
                >
                  Edit Companies
                </Button>
              )}
              {editCompanies && (
                <AddCompaniesToBucket
                  bucketCompanies={bucketCompanies}
                  handleSave={(val) => addCompaniesToBucket(val)}
                ></AddCompaniesToBucket>
              )}
              {editCompanies && (
                <Button
                  className="mr-2 flex items-center gap-2"
                  variant="destructive"
                  color="gray"
                  onClick={removeCompanies}
                >
                  Remove Companies
                </Button>
              )}
              {editCompanies && (
                <Button
                  className="mr-2 flex items-center border-gray-500"
                  variant="outline"
                  color="gray"
                  onClick={() => setEditCompanies(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}

        {bucketCompanies && bucketCompanies.length > 0 && (
          <div>
            <DataTable
              columns={columns}
              data={bucketCompanies}
              type="companies"
              toggleColumn={{ columnId: 'select', value: editCompanies }}
              sendDataToParent={onSelectCheckbox}
            ></DataTable>
          </div>
        )}

        {bucketCompanies && !(bucketCompanies.length > 0) && (
          <div className="flex items-center justify-between">
            <div className="ml-8 mt-4 text-gray-400">This bucket does not have any companies.</div>
            <AddCompaniesToBucket
              bucketCompanies={bucketCompanies}
              handleSave={(val) => addCompaniesToBucket(val)}
            ></AddCompaniesToBucket>
          </div>
        )}
      </div>
    </main>
  )
}

export default MainLayoutWrapper(BucketPage)
