import { MultiSelect, MultiSelectItem } from '@tremor/react'
import { useEffect, useState } from 'react'
import type { Company } from '@prisma/client'
import { DialogHeader, DialogFooter } from '../ui/dialog'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import BucketFunctions from '@/app/services/bucket.service'

interface AddCompaniesToBucketProps {
  handleSave: (companyIds: string[]) => void
  bucketCompanies?: Company[]
}
const AddCompaniesToBucket: React.FC<AddCompaniesToBucketProps> = ({ handleSave, bucketCompanies }) => {
  const [allCompanies, setAllCompanies] = useState<Company[]>([])
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>()
  useEffect(() => {
    BucketFunctions.getAllCompanies()
      .then((res) => {
        res = res.filter((company: Company) => !bucketCompanies?.some((item) => item.id === company.id))
        setAllCompanies(res)
      })
      .catch((error) => {
        console.error('Failed to fetch companies:', error)
      })
  }, [])

  const onSaveClick = () => {
    handleSave(selectedCompanies || [])
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mr-2 flex items-center gap-2 border-blue-600 bg-transparent text-blue-600"
            variant="outline"
          >
            Add New Companies
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add companies to this bucket</DialogTitle>
            <DialogDescription>Search and select companies you want to add in this bucket.</DialogDescription>
          </DialogHeader>
          <div>
            <div className="mb-8">
              <h1 className="mb-2 block text-sm font-bold text-gray-700">Add companies to the bucket</h1>
              <MultiSelect onValueChange={(e) => setSelectedCompanies(e || [])}>
                {allCompanies?.map((company: Company) => (
                  <MultiSelectItem key={company.id} value={`${company.id}`}>
                    {company.name}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button variant="default" onClick={onSaveClick}>
                Save
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddCompaniesToBucket
