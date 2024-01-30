'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Button } from '../../ui/button'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { deleteDatasource } from '@/services/datasource/datasourceService'
import { ShowToast } from '@/components/ShowToast'

interface DeleteModalProps {
  id: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id }) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteDatasource(id)
      router.push('/datasources')
    } catch (error) {
      console.error('Failed to delete datasource:', error)
      ShowToast('Failed to delete datasource', 'An error occurred while deleting the datasource')
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="h-5 w-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this datasource</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this datasource from the system and this action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteModal
