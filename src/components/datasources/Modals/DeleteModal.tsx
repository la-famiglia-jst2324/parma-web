'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import type { AxiosError } from 'axios'
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
interface ErrorResponse {
  error: string
}

interface DeleteModalProps {
  id: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id }) => {
  const router = useRouter()
  const [deleteBlocked, setDeleteBlocked] = useState<boolean>(false)

  const handleDelete = async () => {
    try {
      setDeleteBlocked(true)
      const response = await deleteDatasource(id)
      if (response.message === 'Data Source successfully Deleted') {
        setDeleteBlocked(false)
        router.push('/datasources')
        ShowToast('Datasource deleted successfully', 'The datasource has been successfully deleted.', 'default')
      } else {
        handleErrorResponse(response)
        setDeleteBlocked(false)
      }
    } catch (error) {
      const axiosError = error as AxiosError
      handleErrorResponse(axiosError)
    }
  }

  const handleErrorResponse = (error: AxiosError) => {
    const errorResponse = error?.response?.data as ErrorResponse
    const errorMessage = errorResponse?.error
    ShowToast(
      'Failed to delete datasource',
      errorMessage || 'An error occurred while deleting the datasource',
      'destructive'
    )
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={deleteBlocked}>
            {deleteBlocked && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
