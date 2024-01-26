import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserIcon, Cog8ToothIcon, RocketLaunchIcon } from '@heroicons/react/20/solid'
import { LogOutIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { AuthContext, authLogout } from '@/lib/firebase/auth'
import { getUserAttachment } from '@/services/user/userService'
import profilePic from '@/../../public/Default_pfp.jpg'

const UserNav: React.FC = () => {
  const user = useContext(AuthContext)
  const router = useRouter()
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(profilePic.toString())

  const extractInitials = (displayName: string | null | undefined): string => {
    if (!displayName) {
      return ''
    }

    const names = displayName.split(' ').filter((name) => name.trim() !== '')
    const firstName = names[0] ? names[0][0].toUpperCase() : ''
    const lastName = names.length > 1 ? names[names.length - 1][0].toUpperCase() : ''

    return `${firstName}${lastName}`
  }

  const initials = user === null || user === 'loading' ? '' : extractInitials(user?.displayName)

  const handleLogoutClick = async () => {
    if (user) {
      await authLogout()
      router.push('/')
    }
  }

  useEffect(() => {
    const fetchUserAttachment = async () => {
      try {
        const response = await getUserAttachment()
        setUserPhotoURL(response.fileUrl)
      } catch (error) {
        console.warn('No user attachment available', error)
      }
    }
    console.log('User attachment fetched')

    fetchUserAttachment()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 hover:cursor-pointer">
            <AvatarImage src={userPhotoURL || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="group flex justify-between hover:cursor-pointer"
            onClick={() => router.push('/profile')}
          >
            <div className="flex">
              <UserIcon className="ml-2 mr-4 h-6 w-4 text-gray-500 group-hover:text-gray-200" />
              Profile
            </div>
            <div className="flex-row-reverse text-xs text-gray-400">⌘P</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group flex justify-between hover:cursor-pointer"
            onClick={() => router.push('/datasources')}
          >
            <div className="flex">
              <RocketLaunchIcon className="ml-2 mr-4 h-6 w-4 text-gray-500 group-hover:text-gray-200" />
              Datasources
            </div>
            <div className="flex-row-reverse text-xs text-gray-400">⌘D</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group flex justify-between hover:cursor-pointer"
            onClick={() => router.push('/settings')}
          >
            <div className=" flex">
              <Cog8ToothIcon className="ml-2 mr-4 h-6 w-4 text-gray-500 group-hover:text-gray-200" />
              Settings
            </div>
            <div className="flex-row-reverse text-xs text-gray-400">⌘S</div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group hover:cursor-pointer" onClick={handleLogoutClick}>
          <LogOutIcon className="ml-2 mr-4 h-6 w-4 text-gray-500 group-hover:text-gray-200" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
