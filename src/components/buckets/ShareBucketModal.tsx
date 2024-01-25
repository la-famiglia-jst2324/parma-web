'use client'

import { useEffect, useState } from 'react'
import { $Enums, type User } from '@prisma/client'
import { Share2, Pencil, Check, Trash2, X, CheckIcon, ChevronDown } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import BucketFunctions from '@/app/services/bucket.service'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { cn } from '@/utils/utils'
interface ShareBucketModalProps {
  handleShare: (shareUsersList: ShareBucketProps[]) => void
  id: string
}

export interface ShareBucketProps {
  bucketId: number
  inviteeId: number
  permission: string
}

interface Invitee {
  bucketId: number
  createdAt: Date
  modifiedAt: Date
  inviteeId: number
  permission: string
  user: User
  isEdit?: boolean
}
const initialValue: User[] = [
  {
    id: 0,
    authId: '',
    name: '',
    username: '',
    profilePicture: null,
    role: $Enums.Role.USER,
    createdAt: new Date(),
    modifiedAt: new Date()
  }
]

const ShareBucketModal: React.FC<ShareBucketModalProps> = ({ handleShare, id }) => {
  const [users, setUsers] = useState<User[]>(initialValue)
  const [usersToShare, setUsersToShare] = useState<User[]>([])
  const [listToPost, setListToPost] = useState<ShareBucketProps[]>([])
  const [invitees, setInvitees] = useState<Invitee[]>([])
  const [open, setOpen] = useState(false)
  const [userValue, setUserValue] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    BucketFunctions.getUsersForBucketAccess()
      .then((res: User[]) => setUsers(res))
      .catch((err) => console.log(err))
  }, [])

  const getInvitees = () => {
    BucketFunctions.getInvitees(+id)
      .then((res) => {
        res.map((item: Invitee[]) => {
          return { ...item, isEdit: false }
        })
        setInvitees(res)
      })
      .catch((err) => console.log(err))
  }

  const addUserToShareList = (userId: string) => {
    const user = users.find((user) => user.id === +userId)
    if (user) {
      const uniqueArray = [...usersToShare, user].filter(
        (function () {
          const seenIds = new Set()
          return function (object) {
            if (seenIds.has(object.id)) {
              return false
            } else {
              seenIds.add(object.id)
              return true
            }
          }
        })()
      )
      setUsersToShare(uniqueArray)
      setListToPost((prev) => [
        ...prev,
        {
          bucketId: +id,
          inviteeId: user.id,
          permission: 'VIEWER'
        }
      ])
    }
  }

  const handleEditInviteeClick = (invitee: Invitee) => {
    setInvitees((prev) =>
      prev.map((item) => {
        if (item.inviteeId === invitee.inviteeId) {
          return { ...item, isEdit: !invitee.isEdit }
        }
        return item
      })
    )
  }

  const changeInvitePermission = (val: string, invitee: Invitee) => {
    setInvitees((prev) =>
      prev.map((item) => {
        if (item.inviteeId === invitee.inviteeId) {
          return { ...item, permission: val }
        }
        return item
      })
    )
  }

  const updateInvitee = (invitee: Invitee) => {
    BucketFunctions.updateInvitee(+id, invitee.inviteeId, invitee.permission)
      .then((res) => {
        setInvitees((prev) =>
          prev.map((item) => {
            if (item.inviteeId === res.inviteeId) {
              return { ...item, permission: res.permission }
            }
            return item
          })
        )
        toast({
          title: 'Success',
          description: 'Invitee is updated successfully'
        })
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to update invitee',
          variant: 'destructive'
        })
      })
  }

  const deleteInvitee = (inviteeId: number) => {
    BucketFunctions.deleteInvitee(+id, inviteeId)
      .then((res) => {
        if (res) {
          setInvitees((prev) => prev.filter((item) => item.inviteeId !== inviteeId))
        }
        toast({
          title: 'Success',
          description: 'Invitee is deleted successfully'
        })
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to delete invitee',
          variant: 'destructive'
        })
      })
  }
  const onShareBucket = () => {
    setInvitees([])
    setUsersToShare([])
    setUserValue('')
    handleShare(listToPost)
  }

  const removeUserFromShareList = (user: User) => {
    if (+userValue === user.id) {
      setUserValue('')
    }
    setListToPost((prev) => prev.filter((item) => item.inviteeId !== user.id))
    setUsersToShare((prev) => prev.filter((item) => item.id !== user.id))
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild onClick={getInvitees}>
          <Button className="mr-2 flex items-center gap-2" variant="secondary">
            <Share2 />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="m-2 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share this bucket</DialogTitle>
            <DialogDescription>
              Only private buckets can be shared with others. Please make the bucket private if you want to share it
              with other people. People can already search public buckets.
            </DialogDescription>
          </DialogHeader>
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              Search for user names to whom you want to share this bucket with.
            </p>

            <div className="flex flex-row items-center gap-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {userValue ? usersToShare.find((user) => +user.id === +userValue)?.name : 'Select users to share'}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[450px] p-0">
                  <Command>
                    <CommandInput placeholder="Select users..." className="h-9" />
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.id}
                          value={user.id + ''}
                          onSelect={(currentValue) => {
                            addUserToShareList(currentValue)
                            setUserValue(currentValue)
                            setOpen(false)
                          }}
                        >
                          {user.name}
                          <CheckIcon
                            className={cn('ml-auto h-4 w-4', user.id === +userValue ? 'opacity-100' : 'opacity-0')}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-8 h-[200px] max-h-[400px] overflow-auto pr-2 pt-2">
              <div>
                <h2 className="mb-3 text-lg font-semibold">Invitees</h2>
                {usersToShare.map((user) => (
                  <div className="mb-4 flex flex-row items-center justify-between" key={user.id}>
                    {user.name}
                    <div className="flex items-center gap-2">
                      <Select
                        value={listToPost.find((item) => item.inviteeId === user.id)?.permission || 'VIEWER'}
                        onValueChange={(val) =>
                          setListToPost((prev) =>
                            prev.map((item) => (item.inviteeId === user.id ? { ...item, permission: val } : item))
                          )
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Permission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem key={'MODERATOR'} value="MODERATOR">
                              Moderator
                            </SelectItem>
                            <SelectItem key={'VIEWER'} value="VIEWER">
                              Viewer
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <X className="h-4 w-16 cursor-pointer" onClick={() => removeUserFromShareList(user)} />
                    </div>
                  </div>
                ))}
                {invitees?.length > 0 &&
                  invitees.map((invitee) => (
                    <div className="mb-4 flex flex-row items-center justify-between" key={invitee.user.id}>
                      {invitee.user.name}
                      <div className="flex w-2/3 flex-row items-center justify-end gap-2">
                        <Select
                          value={invitee.permission}
                          onValueChange={(val) => changeInvitePermission(val, invitee)}
                          disabled={!invitee.isEdit}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Permission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem key={'MODERATOR'} value="MODERATOR">
                                Moderator
                              </SelectItem>
                              <SelectItem key={'VIEWER'} value="VIEWER">
                                Viewer
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {invitee.isEdit ? (
                          <div className="flex w-16 flex-row gap-2">
                            <Check
                              color="green"
                              className="cursor-pointer"
                              onClick={() => {
                                updateInvitee(invitee)
                                handleEditInviteeClick(invitee)
                              }}
                            />
                            <Trash2
                              color="red"
                              className="cursor-pointer"
                              onClick={() => {
                                deleteInvitee(invitee.inviteeId)
                                handleEditInviteeClick(invitee)
                              }}
                            />
                            <X className="cursor-pointer" onClick={() => handleEditInviteeClick(invitee)} />
                          </div>
                        ) : (
                          <Pencil className="h-4 w-16 cursor-pointer" onClick={() => handleEditInviteeClick(invitee)} />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="mt-2" onClick={onShareBucket}>
                Save
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="submit"
                className="mt-2"
                variant="secondary"
                onClick={() => {
                  setUsersToShare([])
                  setUserValue('')
                }}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default ShareBucketModal
