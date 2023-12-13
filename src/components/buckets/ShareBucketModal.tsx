'use client'

import { Button, SearchSelect, SearchSelectItem, Select, SelectItem } from '@tremor/react'
import { useEffect, useState } from 'react'
import { $Enums, type User } from '@prisma/client'
import BucketFunctions from '@/app/services/bucket.service'

interface ShareBucketModalProps {
  handleClose: () => void
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
    profilePicture: null,
    role: $Enums.Role.USER,
    createdAt: new Date(),
    modifiedAt: new Date()
  }
]

const ShareBucketModal: React.FC<ShareBucketModalProps> = ({ handleClose, handleShare, id }) => {
  const [users, setUsers] = useState<User[]>(initialValue)
  const [usersToShare, setUsersToShare] = useState<User[]>([])
  const [listToPost, setListToPost] = useState<ShareBucketProps[]>([])
  const [invitees, setInvitees] = useState<Invitee[]>([])

  useEffect(() => {
    BucketFunctions.getUsersForBucketAccess()
      .then((res: User[]) => setUsers(res))
      .catch((err) => console.log(err))

    BucketFunctions.getInvitees(+id)
      .then((res) => setInvitees(res))
      .catch((err) => console.log(err))
  }, [id])

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
    handleShare(listToPost)
  }
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
      {/* Modal */}
      <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        {/* Close button */}
        <Button className="absolute right-0 top-0 m-3" variant="light" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
        <div className="h-[500px] overflow-auto px-4 py-5 sm:p-6 sm:pb-5">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">Share this bucket</h3>
          <div className="mb-4 mt-2">
            <p className="text-sm text-gray-400">
              Only private buckets can be shared with others. Please make the bucket private if you want to share it
              with other people. People can already search public buckets
            </p>
          </div>
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

            <div className="mt-8">
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

              {invitees.length > 0 && (
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
        </div>
        <div className="px-4 py-5 sm:p-6 sm:pb-5">
          <div className="flex gap-2 px-4 py-3 sm:flex-row-reverse sm:px-5">
            <Button className="mt-2" onClick={onShareBucket}>
              Share
            </Button>
            <Button className="mt-2" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ShareBucketModal
