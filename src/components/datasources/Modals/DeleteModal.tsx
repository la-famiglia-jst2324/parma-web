'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { toast } from '../../ui/use-toast'
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
      toast({
        title: 'Failed to delete datasource',
        description: 'An error occurred while deleting the datasource',
        duration: 5000
      })
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            color="red"
            className="mr-2 flex items-center gap-2 border-red-600 bg-transparent text-red-600"
          >
            <Trash2 />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you really want to delete this datasource? This action cannot be undone.
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
