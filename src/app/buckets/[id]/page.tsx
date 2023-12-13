'use client'

import { useEffect, useState } from 'react'
import type { Company, Bucket } from '@prisma/client'
import { Text, Button, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { useRouter } from 'next/navigation'
import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { GoBackButton } from '@/components/GoBackButton'
import EditBucketModal from '@/components/buckets/EditBucketModal'
import { Popup } from '@/components/Popup'
import { PopupType } from '@/types/popup'
import DeleteBucketModal from '@/components/buckets/DeleteBucketModal'
import BucketFunctions from '@/app/services/bucket.service'
import type { ShareBucketProps } from '@/components/buckets/ShareBucketModal'
import ShareBucketModal from '@/components/buckets/ShareBucketModal'
import { MainLayout } from '@/components/MainLayout'

const initialBucketValue = {
  id: 0,
  title: '',
  description: '',
  isPublic: true,
  ownerId: 0,
  createdAt: new Date(),
  modifiedAt: new Date()
}

export default function BucketPage({ params: { id } }: { params: { id: string } }) {
  const router = useRouter()
  const [bucket, setBucket] = useState<Bucket>(initialBucketValue)
  const [bucketCompanies, setBucketCompanies] = useState<Company[]>()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [popupText, setPopupText] = useState('')

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

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((val) => !val)
  }
  const toggleEditModal = () => {
    setIsEditModalOpen((val) => !val)
  }
  const toggleShareModal = () => {
    setIsShareModalOpen((val) => !val)
  }

  const saveBucket = (title: string, description: string | null, isPublic: boolean) => {
    BucketFunctions.updateBucket(title, description, +id, isPublic)
      .then((res) => {
        if (res) {
          setBucket(res)
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 3000)
          setPopupText('Bucket is updated successfully')
        } else {
          setShowError(true)
          setTimeout(() => setShowError(false), 3000)
          setPopupText('Failed to update bucket')
        }
      })
      .catch((e) => {
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
        setPopupText(e)
      })
  }

  const onDeleteBucket = () => {
    BucketFunctions.deleteBucket(+id)
      .then((res) => {
        if (res) {
          setPopupText('Bucket is deleted successfully')
          setShowSuccess(true)
          setTimeout(() => {
            setShowSuccess(false)
            router.push('/buckets')
          }, 1500)
        }
      })
      .catch((error) => {
        setPopupText(error)
        setShowError(true)
        setTimeout(() => setShowError(false), 3000)
      })
    setIsDeleteModalOpen(false)
  }

  const onHandleShare = (shareUsersList: ShareBucketProps[]) => {
    shareUsersList.forEach((user) => {
      BucketFunctions.shareBucket(user)
        .then((res) => {
          if (res) {
            setPopupText('Bucket is shared successfully')
            setShowSuccess(true)
            setIsShareModalOpen(false)
            setTimeout(() => {
              setShowSuccess(false)
            }, 3000)
          }
        })
        .catch((e) => {
          setPopupText(e)
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
            setIsShareModalOpen(false)
          }, 3000)
        })
    })
  }
  return (
    <MainLayout>
      <div className="mx-6 h-screen pt-12">
        <div className="mx-auto  rounded-lg border-0 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="mb-3 flex items-start justify-start space-x-4">
              <div className="mt-1">
                <GoBackButton url="/buckets"></GoBackButton>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{bucket.title}</h1>
              </div>
            </div>
            <div className="flex flex-row justify-evenly gap-2">
              <Button
                className="mr-2 flex items-center bg-transparent"
                variant="secondary"
                icon={ShareIcon}
                onClick={toggleShareModal}
              >
                Share
              </Button>
              {isShareModalOpen && (
                <ShareBucketModal
                  id={id}
                  handleShare={(shareUsersList: ShareBucketProps[]) => onHandleShare(shareUsersList)}
                  handleClose={toggleShareModal}
                ></ShareBucketModal>
              )}
              <Button
                className="mr-2 flex items-center "
                icon={PencilIcon}
                variant="secondary"
                color="gray"
                onClick={toggleEditModal}
              >
                Edit Bucket
              </Button>
              {isEditModalOpen && (
                <EditBucketModal
                  title={bucket.title}
                  description={bucket.description}
                  isPublic={bucket.isPublic}
                  handleClose={toggleEditModal}
                  handleSave={(title: string, description: string | null, isPublic: boolean) =>
                    saveBucket(title, description, isPublic)
                  }
                ></EditBucketModal>
              )}
              <Button
                icon={TrashIcon}
                variant="light"
                color="red"
                className="mr-2 flex items-center"
                onClick={toggleDeleteModal}
              >
                Delete
              </Button>
              {isDeleteModalOpen && (
                <DeleteBucketModal handleClose={toggleDeleteModal} handleDelete={onDeleteBucket}></DeleteBucketModal>
              )}
            </div>
          </div>
          <div className="mb-12 ml-8">
            <p className="mb-4  text-gray-400">{bucket.description}</p>
          </div>

          <div className="ml-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Companies in this bucket</h1>
            <div className="flex flex-row items-center gap-4"></div>
          </div>

          {bucketCompanies && bucketCompanies.length > 0 && (
            <Table className="ml-8 mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Company Name</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bucketCompanies?.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Text className="whitespace-break-spaces">{item.description}</Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {bucketCompanies && !(bucketCompanies.length > 0) && (
            <div className="ml-8 mt-4 text-gray-400">This bucket does not have any companies.</div>
          )}
        </div>
        {showSuccess && <Popup text={popupText} title="Success" popupType={PopupType.SUCCESS}></Popup>}
        {showError && <Popup text={popupText} title="Error" popupType={PopupType.ERROR}></Popup>}
      </div>
    </MainLayout>
  )
}
