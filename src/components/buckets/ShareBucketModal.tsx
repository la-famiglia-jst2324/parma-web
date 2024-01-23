'use client'

import { SearchSelect, SearchSelectItem, Select, SelectItem } from '@tremor/react'
import { useEffect, useState } from 'react'
import { $Enums, type User } from '@prisma/client'
import { Share2 } from 'lucide-react'
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

  useEffect(() => {
    BucketFunctions.getUsersForBucketAccess()
      .then((res: User[]) => setUsers(res))
      .catch((err) => console.log(err))
  }, [])

  const getInvitees = () => {
    BucketFunctions.getInvitees(+id)
      .then((res) => setInvitees(res))
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
        <DialogContent className="m-2 sm:max-w-[440px]">
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

            <div className="mt-8 h-[200px] max-h-[400px] overflow-auto">
              {usersToShare.map((user) => (
                <div className="mb-4 flex flex-row items-center justify-between" key={user.id}>
                  {user.name}
                  <Select
                    placeholder="Permission"
                    className="w-1/2"
                    onValueChange={(val) => prepareUserListToShare(user, val)}
                  >
                    <SelectItem key={'MODERATOR'} value="MODERATOR">
                      MODERATOR
                    </SelectItem>
                    <SelectItem key={'VIEWER'} value="VIEWER">
                      VIEWER
                    </SelectItem>
                  </Select>
                </div>
              ))}

              {invitees?.length > 0 && (
                <div>
                  <h2 className="mb-3 text-lg font-semibold">Invitees</h2>
                  {invitees.map((invitee) => (
                    <div className="mb-4 flex flex-row items-center justify-between" key={invitee.user.id}>
                      {invitee.user.name}
                      <p>{invitee.permission}</p>
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
