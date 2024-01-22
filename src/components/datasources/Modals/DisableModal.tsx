import React from 'react'
import { Power, PowerOff } from 'lucide-react'
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
interface ModalComponentProps {
  sourceName: string
  isActive: boolean
  description: string
  url: string
  handleSave: (updates: {
    newName: string
    newDescription: string
    newUrl: string
    newStatus: boolean
  }) => Promise<void>
}

const ModalComponent: React.FC<ModalComponentProps> = ({ sourceName, description, url, isActive, handleSave }) => {
  const handleDisable = async () => {
    await handleSave({
      newName: sourceName,
      newDescription: description,
      newUrl: url,
      newStatus: !isActive
    }).catch((error) => {
      console.error('An error occurred:', error)
    })
  }

  return (
    <>
      {isActive ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-red-500" variant="secondary">
              <PowerOff className="mr-2 h-4 w-4" color="#ef4444" />
              Disable
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to disable the datasource? This will disable it for all active companies.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDisable}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button className="text-green-500" variant="secondary" onClick={handleDisable}>
          <Power className="mr-2 h-4 w-4" color="#22c55e" />
          Enable
        </Button>
      )}
    </>
  )
}

export default ModalComponent
