'use client'

import { useEffect, useState } from 'react'
import type { User, BucketAccess, Company } from '@prisma/client'
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
import { getUsername } from '@/services/user/userService'
import Spinner from '@/components/Spinner'

const initialBucketValue = {
  id: 0,
  title: '',
  description: '',
  isPublic: true,
  ownerId: 0,
  createdAt: new Date(),
  modifiedAt: new Date()
}

interface BucketPageProps {
  id: number
  title: string
  description: string | null
  isPublic: boolean
  ownerId: number
  createdAt: Date
  modifiedAt: Date
  permissions?: BucketAccess[]
}
const BucketPage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter()
  const [bucket, setBucket] = useState<BucketPageProps>(initialBucketValue)
  const [bucketCompanies, setBucketCompanies] = useState<Company[]>()
  const [editCompanies, setEditCompanies] = useState(false)
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])
  const [loggedInUser, setLoggedInUser] = useState<User>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    BucketFunctions.getBucketById(+id)
      .then((data) => {
        setBucket(data)
        BucketFunctions.getCompaniesForBucket(+id)
          .then((res) => {
            setBucketCompanies(res)
            setLoading(false)
          })
          .catch((e) => {
            console.log(e)
            setLoading(false)
          })
      })
      .catch((e) => {
        console.log(e)
        if (e.response.status === 400) {
          ShowToast('Error', 'Bucket not found', 'destructive')
          router.push('/')
        }
      })
  }, [id])

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUsername()
        setLoggedInUser(response)
        return response
      } catch (error) {
        console.log('Error fetching userName')
      }
    }
    getUser()
  }, [])

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

  const isModerator = () => {
    if (loggedInUser) {
      if (loggedInUser.id === bucket.ownerId) {
        return true
      }
      if (bucket.permissions?.length) {
        const invitee = bucket.permissions.find((permission) => permission.inviteeId === loggedInUser.id)
        if (invitee && invitee.permission === 'MODERATOR') {
          return true
        }
      }
    }
    return false
  }

  return (
    <main className="flex h-screen flex-row items-start justify-start space-x-4" role="main">
      {!loading ? (
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <div className="mb-3 flex items-start justify-start space-x-4">
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{bucket.title}</h1>
              </div>
            </div>
            {isModerator() && (
              <div className="flex flex-row justify-evenly gap-3 px-2">
                <ShareBucketModal
                  id={id}
                  handleShare={(shareUsersList: ShareBucketProps[]) => onHandleShare(shareUsersList)}
                ></ShareBucketModal>
                <DeleteBucketModal handleDelete={onDeleteBucket}></DeleteBucketModal>
              </div>
            )}
          </div>
          <div>
            <BucketDescriptionCard
              handleSave={(val) => setBucket(val)}
              bucket={bucket}
              isModerator={isModerator()}
            ></BucketDescriptionCard>
          </div>

          <div className="mb-12">
            <BucketGraph companies={bucketCompanies}></BucketGraph>
          </div>
          {bucketCompanies && bucketCompanies.length > 0 && (
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-lg font-bold">All companies in this bucket</h1>
              {isModerator() && (
                <div className="flex flex-row items-center gap-4">
                  {!editCompanies && (
                    <Button variant="outline" onClick={() => setEditCompanies(true)}>
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
                    <Button variant="destructive" onClick={removeCompanies}>
                      Remove Companies
                    </Button>
                  )}
                  {editCompanies && (
                    <Button variant="outline" onClick={() => setEditCompanies(false)}>
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {bucketCompanies && bucketCompanies.length > 0 && (
            <div className="mb-8">
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
              {isModerator() && (
                <AddCompaniesToBucket
                  bucketCompanies={bucketCompanies}
                  handleSave={(val) => addCompaniesToBucket(val)}
                ></AddCompaniesToBucket>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </main>
  )
}

export default MainLayoutWrapper(BucketPage)
