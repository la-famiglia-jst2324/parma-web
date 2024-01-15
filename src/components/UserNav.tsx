import React, { useContext } from 'react'
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

interface UserNavProps {}

const UserNav: React.FC<UserNavProps> = () => {
  const user = useContext(AuthContext)
  const router = useRouter()

  const photoURL = user === null || user === 'loading' ? null : user.photoURL

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 transition duration-500 ease-in hover:cursor-pointer hover:shadow-[0_0_15px_15px_rgba(63,55,201,0.5)]">
            <AvatarImage src={photoURL || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" onClick={() => router.push('/profile')}>
            <div className="flex">
              <UserIcon className="ml-2 mr-4 h-6 w-4 text-[#374151]" />
              Profile
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" onClick={() => router.push('/datasources')}>
            <div className="flex">
              <RocketLaunchIcon className="ml-2 mr-4 h-6 w-4 text-[#374151]" />
              Datasources
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" onClick={() => router.push('/settings')}>
            <div className="flex">
              <Cog8ToothIcon className="ml-2 mr-4 h-6 w-4 text-[#374151]" />
              Settings
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogoutClick}>
          <LogOutIcon className="ml-2 mr-4 h-6 w-4 text-[#374151]" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
