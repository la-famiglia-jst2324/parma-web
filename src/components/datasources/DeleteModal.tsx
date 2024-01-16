'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/20/solid'
import { toast } from '../ui/use-toast'
import { Button } from '../ui/button'
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
interface DeleteModalProps {
  id: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id }) => {
  const router = useRouter()

  async function deleteDatasource(id: string) {
    try {
      const res = await fetch(`/api/dataSources/${id}`, {
        method: 'DELETE',
        cache: 'no-cache'
      })
      if (!res.ok) {
        console.log('Response status:', res.status)
        throw new Error('HTTP response was not OK')
      }
      const json = await res.json()
      router.push('/datasources')
      return json
    } catch (error) {
      console.log('An error has occurred: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDatasource(id)
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
          <Button className="bg-red-800" variant="outline">
            <TrashIcon className="h-4 w-4" />
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
