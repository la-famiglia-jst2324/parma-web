'use client'

import { useEffect, useState } from 'react'
import { $Enums, type User } from '@prisma/client'
import { Share2, X } from 'lucide-react'
import { ShowToast } from '../ShowToast'
import { MultiSelect } from '../ui/multi-select'
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
  isChanged?: boolean
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
  const [multiSelectUsers, setMultiSelectUers] = useState<{ value: string; label: string }[]>([]) // User data in multiselect
  const [selectedUsersId, setSelectedUsersId] = useState<string[]>([]) // User ids that are selected

  useEffect(() => {
    BucketFunctions.getUsersForBucketAccess()
      .then((res: User[]) => {
        setUsers(res)

        const multiSelectData = res.map((user) => {
          return {
            value: String(user.id),
            label: user.name
          }
        })
        setMultiSelectUers(multiSelectData)
      })
      .catch((err) => console.log(err))
  }, [])

  const getInvitees = () => {
    BucketFunctions.getInvitees(+id)
      .then((res) => {
        res.map((item: Invitee[]) => {
          return { ...item, isEdit: false }
        })
        const filteredUsers = users.filter((user) => res.every((item: Invitee) => item.inviteeId !== user.id))
        const multiSelectData = filteredUsers.map((user) => {
          return {
            value: String(user.id),
            label: user.name
          }
        })
        setMultiSelectUers(multiSelectData)
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
      if (!listToPost.some((item) => item.inviteeId === user.id)) {
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
  }

  useEffect(() => {
    if (selectedUsersId) {
      selectedUsersId.forEach((id) => {
        addUserToShareList(id)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUsersId])

  const changeInvitePermission = (val: string, invitee: Invitee) => {
    setInvitees((prev) =>
      prev.map((item) => {
        if (item.inviteeId === invitee.inviteeId) {
          return { ...item, permission: val, isChanged: !item.isChanged }
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
        ShowToast('Success', 'Invitee is updated successfully')
      })
      .catch(() => {
        ShowToast('Error', 'Failed to update invitee', 'destructive')
      })
  }

  const deleteInvitee = (inviteeId: number) => {
    BucketFunctions.deleteInvitee(+id, inviteeId)
      .then((res) => {
        if (res) {
          setInvitees((prev) => prev.filter((item) => item.inviteeId !== inviteeId))
        }
        ShowToast('Success', 'Invitee deleted successfully')
      })
      .catch(() => {
        ShowToast('Error', 'Failed to delete invitee', 'destructive')
      })
  }
  const onShareBucket = () => {
    invitees.forEach((invitee) => {
      if (invitee.isChanged) {
        updateInvitee(invitee)
      }
    })
    setInvitees([])
    handleShare(listToPost)
    setListToPost([])
  }

  const removeUserFromShareList = (user: User) => {
    setListToPost((prev) => prev.filter((item) => item.inviteeId !== user.id))
    setUsersToShare((prev) => prev.filter((item) => item.id !== user.id))
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger
          asChild
          onClick={() => {
            getInvitees()
            setSelectedUsersId([])
            setUsersToShare([])
          }}
        >
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="mt-1 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Bucket</DialogTitle>
            <DialogDescription>
              Private bucket can be shared with specific users. Public bucket is visible for everyone.
            </DialogDescription>
          </DialogHeader>
          <div>
            <p className="mb-1 text-sm text-muted-foreground">
              Search for user names to whom you want to share this bucket with.
            </p>

            <div className="flex flex-row items-center gap-4">
              <MultiSelect
                options={multiSelectUsers}
                selected={selectedUsersId}
                onChange={setSelectedUsersId}
                placeholder="Select users to share"
                width="w-[460px]"
              />
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
                      <div className="flex items-center gap-2">
                        <Select
                          value={invitee.permission}
                          onValueChange={(val) => changeInvitePermission(val, invitee)}
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
                        <X
                          className="h-4 w-16 cursor-pointer"
                          onClick={() => {
                            deleteInvitee(invitee.inviteeId)
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="mt-2" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="mt-2" onClick={onShareBucket} variant="secondary">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default ShareBucketModal
