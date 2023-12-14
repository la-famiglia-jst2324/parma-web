'use client'

import { Button, Switch, MultiSelect, MultiSelectItem } from '@tremor/react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import type { Bucket, Company } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import { FormContent } from '@/components/FormContent'
import { GoBackButton } from '@/components/GoBackButton'
import { Popup } from '@/components/Popup'
import { PopupType } from '@/types/popup'
import BucketFunctions from '@/app/services/bucket.service'
import { MainLayout } from '@/components/MainLayout'

export default function AddBucketPage() {
  const [allCompaniesPaginated, setCompaniesPaginated] = useState([])

  // Bucket props
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const router = useRouter()

  const handleSwitchChange = (value: boolean) => {
    setIsPublic(value)
  }

  useEffect(() => {
    BucketFunctions.getAllCompanies()
      .then(setCompaniesPaginated)
      .catch((error) => {
        console.error('Failed to fetch companies:', error)
      })
  }, [])

  const createBucket = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const bucket = {
      title: formData.get('title') as string,
      isPublic,
      description: formData.get('description') as string
    }

    BucketFunctions.createBucket(bucket)
      .then((data: Bucket) => {
        // Add companies to the bucket
        if (selectedCompanies.length > 0) {
          BucketFunctions.addCompaniesToBucket(data.id, selectedCompanies)
            .then((data) => console.log(data))
            .catch((e) => console.log(e))
        }
        setShowSuccess(true)
        setTimeout(() => {
          router.push('/buckets')
          setShowSuccess(false)
        }, 1500) // Remove it from the screen
      })
      .catch((error) => {
        setShowError(true)
        setTimeout(() => setShowError(false), 1500) // Remove it from the screen
        console.error('Error:', error)
      })
  }
  return (
    <MainLayout>
      <div className="mx-6 h-screen pt-12">
        <div className="mx-auto max-w-screen-xl rounded-lg border-0 bg-white p-6 shadow-md">
          <div className="mb-3 flex items-start justify-start space-x-4">
            <div className="mt-1">
              <GoBackButton url="/buckets"></GoBackButton>
            </div>
            <div className="flex flex-col">
              <h1 className="mb-2 text-2xl font-bold">Create Bucket</h1>
              <p className="mb-4 text-gray-400">
                You can create a collection of companies here. Please choose companies from a list of available
                companies.
              </p>
            </div>
          </div>
          <form role="form" data-testid="create-bucket-form" className="px-8" onSubmit={createBucket}>
            <div className="mb-8">
              <FormContent
                id="title"
                name="title"
                type="input"
                value={title}
                label="Bucket title"
                placeholder="Please enter bucket title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <FormContent
                id="description"
                name="description"
                value={description}
                label="Bucket description"
                placeholder="Please enter bucket description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label className="mb-2 block text-sm font-bold text-gray-700">Companies</label>
              <MultiSelect onValueChange={(e) => setSelectedCompanies(e || [])}>
                {allCompaniesPaginated?.map((company: Company) => (
                  <MultiSelectItem key={company.id} value={`${company.id}`}>
                    {company.name}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </div>

            <div className="mb-8 flex items-center gap-4">
              <div className="font-semibold">Make this bucket public</div>
              <Switch id="switch" name="isPublic" checked={isPublic} onChange={handleSwitchChange} />
            </div>
            <div>
              <Button>
                <div className="flex items-center gap-2">
                  <CheckBadgeIcon className="h-5 w-5"></CheckBadgeIcon>
                  <div className="flex items-center gap-0.5 text-white">Create new Bucket</div>
                </div>
              </Button>
            </div>
          </form>
        </div>
        {showSuccess && (
          <Popup text="Bucket created successfully" title="Success" popupType={PopupType.SUCCESS}></Popup>
        )}
        {showError && <Popup text="Bucket creation failed" title="Error" popupType={PopupType.ERROR}></Popup>}
      </div>
    </MainLayout>
  )
}
