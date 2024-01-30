import { useEffect, useState } from 'react'
import type { Company } from '@prisma/client'
import { Plus } from 'lucide-react'
import { DialogHeader, DialogFooter } from '../ui/dialog'
import { MultiSelect } from '../ui/multi-select'
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
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
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

  const data = allCompanies?.map((company) => {
    return {
      value: String(company?.id),
      label: company.name
    }
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-2 flex items-center gap-2" variant="outline">
          <Plus className="h-4 w-4" />
          Company
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add companies to this bucket</DialogTitle>
          <DialogDescription>Search and select companies you want to add in this bucket.</DialogDescription>
        </DialogHeader>

        <MultiSelect
          options={data}
          selected={selectedCompanies}
          onChange={setSelectedCompanies}
          placeholder="Select companies"
          width="w-[460px]"
        />
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="secondary" onClick={onSaveClick}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddCompaniesToBucket
