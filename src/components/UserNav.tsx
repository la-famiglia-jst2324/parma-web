import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  const displayName = user === null || user === 'loading' ? '' : user?.displayName
  const email = user === null || user === 'loading' ? '' : user?.email

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
          <Avatar className="h-8 w-8">
            <AvatarImage src={photoURL || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
