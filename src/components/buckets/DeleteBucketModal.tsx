'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface DeleteBucketModalProps {
  handleDelete: () => void
}

const DeleteBucketModal: React.FC<DeleteBucketModalProps> = ({ handleDelete }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete this bucket</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the bucket? This will permanently remove it and this cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2"></div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDelete}>
                Delete permanently
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
export default DeleteBucketModal
