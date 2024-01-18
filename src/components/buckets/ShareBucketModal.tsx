'use client'

import { SearchSelect, SearchSelectItem } from '@tremor/react'
import { useEffect, useState } from 'react'
import { $Enums, type User } from '@prisma/client'
import { Share2, Pencil, Check, Trash2, X } from 'lucide-react'
import { useToast } from '../ui/use-toast'
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
    }
  }

  const prepareUserListToShare = (user: User, permission: string) => {
    setListToPost((prev) => [
      ...prev,
      {
        bucketId: +id,
        inviteeId: user.id,
        permission
      }
    ])
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
    handleShare(listToPost)
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild onClick={getInvitees}>
          <Button
            className="mr-2 flex items-center gap-2 border-blue-600 bg-transparent text-blue-600"
            variant="outline"
          >
            <Share2 />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="m-2 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share this bucket</DialogTitle>
            <DialogDescription>
              Only private buckets can be shared with others. Please make the bucket private if you want to share it
              with other people. People can already search public buckets
            </DialogDescription>
          </DialogHeader>
          <div>
            <p className="mb-4 text-lg text-gray-400">Search for emails to whom you want to share this bucket with</p>

            <div className="flex flex-row items-center gap-4">
              <SearchSelect onValueChange={(val) => addUserToShareList(val)}>
                {users?.map((user) => (
                  <SearchSelectItem value={user.id + ''} key={user.id}>
                    {user.name}
                  </SearchSelectItem>
                ))}
              </SearchSelect>
            </div>

            <div className="mt-8 h-[200px] max-h-[400px] overflow-auto pr-2 pt-2">
              {usersToShare.map((user) => (
                <div className="mb-4 flex flex-row items-center justify-between" key={user.id}>
                  {user.name}
                  <Select onValueChange={(val) => prepareUserListToShare(user, val)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem key={'MODERATOR'} value="MODERATOR">
                          MODERATOR
                        </SelectItem>
                        <SelectItem key={'VIEWER'} value="VIEWER">
                          VIEWER
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ))}

              {invitees?.length > 0 && (
                <div>
                  <h2 className="mb-3 text-lg font-semibold">Invitees</h2>
                  {invitees.map((invitee) => (
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
                                MODERATOR
                              </SelectItem>
                              <SelectItem key={'VIEWER'} value="VIEWER">
                                VIEWER
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
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="mt-2" onClick={onShareBucket}>
                Share
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button type="submit" className="mt-2" variant="secondary" onClick={() => setUsersToShare([])}>
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
