'use client'

import { useEffect, useState } from 'react'
import type { Company, Bucket } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GoBackButton } from '@/components/GoBackButton'
import EditBucketModal from '@/components/buckets/EditBucketModal'
import DeleteBucketModal from '@/components/buckets/DeleteBucketModal'
import BucketFunctions from '@/app/services/bucket.service'
import type { ShareBucketProps } from '@/components/buckets/ShareBucketModal'
import ShareBucketModal from '@/components/buckets/ShareBucketModal'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import BucketGraph from '@/components/buckets/bucketGraph'
import AddCompaniesToBucket from '@/components/buckets/addCompanies'
import { useToast } from '@/components/ui/use-toast'

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
  const { toast } = useToast()

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

  const onSelectCheckbox = (companyId: number, value: string | boolean) => {
    if (!value) {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId))
    } else {
      setSelectedCompanies([...selectedCompanies, companyId])
    }
  }

  const saveBucket = (title: string, description: string | null, isPublic: boolean) => {
    BucketFunctions.updateBucket(title, description, +id, isPublic)
      .then((res) => {
        if (res) {
          setBucket(res)
          toast({
            title: 'Success',
            description: 'Bucket is updated successfully'
          })
        } else {
          toast({
            title: 'Error',
            description: 'Failed to update bucket',
            variant: 'destructive'
          })
        }
      })
      .catch((e) => {
        toast({
          title: 'Error',
          description: e,
          variant: 'destructive'
        })
      })
  }

  const onDeleteBucket = () => {
    BucketFunctions.deleteBucket(+id)
      .then((res) => {
        if (res) {
          toast({
            title: 'Success',
            description: 'Bucket is deleted successfully'
          })
          router.push('/')
        }
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to delete bucket',
          variant: 'destructive'
        })
      })
  }

  const onHandleShare = (shareUsersList: ShareBucketProps[]) => {
    BucketFunctions.shareBucket(shareUsersList)
      .then((res) => {
        if (res) {
          toast({
            title: 'Success',
            description: 'Bucket is shared successfully'
          })
        }
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to share the bucket',
          variant: 'destructive'
        })
      })
  }

  const removeCompanies = () => {
    BucketFunctions.deleteCompaniesFromBucket(+id, selectedCompanies)
      .then((res) => {
        if (res) {
          const filteredCompanies = bucketCompanies?.filter((company) => !res.includes(company.id))
          setBucketCompanies(filteredCompanies)
          toast({
            title: 'Success',
            description: 'Companies are deleted successfully'
          })
        }
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to  delete companies from bucket',
          variant: 'destructive'
        })
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
          toast({
            title: 'Success',
            description: 'Companies are added successfully'
          })
        }
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to add companies to bucket',
          variant: 'destructive'
        })
      })
  }
  return (
    <main className="m-4 flex h-screen flex-row items-start justify-start space-x-4" role="main">
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="mb-3 flex items-start justify-start space-x-4">
            <div className="mt-1">
              <GoBackButton url="/"></GoBackButton>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">{bucket.title}</h1>
            </div>
          </div>
          <div className="flex flex-row justify-evenly gap-2">
            <ShareBucketModal
              id={id}
              handleShare={(shareUsersList: ShareBucketProps[]) => onHandleShare(shareUsersList)}
            ></ShareBucketModal>
            <EditBucketModal
              title={bucket.title}
              description={bucket.description}
              isPublic={bucket.isPublic}
              handleSave={(title: string, description: string | null, isPublic: boolean) =>
                saveBucket(title, description, isPublic)
              }
            ></EditBucketModal>

            <DeleteBucketModal handleDelete={onDeleteBucket}></DeleteBucketModal>
          </div>
        </div>
        <div className="mb-12 ml-8">
          <div className="mb-2 text-2xl font-semibold text-gray-700">Description</div>
          <p className="mb-4">{bucket.description}</p>
        </div>

        <div className="mb-12">
          <BucketGraph companies={bucketCompanies}></BucketGraph>
        </div>
        {bucketCompanies && bucketCompanies.length > 0 && (
          <div className="ml-8 flex items-center justify-between">
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
                  className="mr-2 flex items-center gap-2 border-red-600 bg-transparent text-red-600"
                  variant="outline"
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
          <Table className="ml-8">
            <TableHeader>
              <TableRow>
                {editCompanies && <TableHead></TableHead>}
                <TableHead>Company name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Metric</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bucketCompanies.map((item) => (
                <TableRow key={item.id}>
                  {editCompanies && (
                    <TableCell>
                      <Checkbox onCheckedChange={(e) => onSelectCheckbox(item.id, e)} />
                    </TableCell>
                  )}
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
