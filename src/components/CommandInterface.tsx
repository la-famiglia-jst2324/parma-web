import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon, Plus, TrendingUpIcon, Settings, User2Icon, Database } from 'lucide-react'
import CreateBucket from './buckets/createBucket'
import CreateCompanyModal from './companies/CreateCompanyModal'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import CreateDatasource from '@/components/datasources/CreateDatasource'

export function CommandInterface() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push('/settings')
      } else if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push('/search')
      } else if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push('/profile')
      } else if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push('/datasources')
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [router])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <TrendingUpIcon className="mr-2" />
            <span onClick={() => router.push('/')}>Trending News</span>
          </CommandItem>
          <CommandItem>
            <SearchIcon className="mr-2" />
            <span onClick={() => router.push('/search')}>Find buckets or companies</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Buckets">
          <CommandItem>
            <CreateBucket
              triggerButton={
                <div className="flex items-center">
                  <Plus className="mr-2 cursor-pointer" />
                  <span>Create Bucket</span>
                </div>
              }
            />
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Companies">
          <CommandItem>
            <CreateCompanyModal
              triggerButton={
                <div className="flex items-center">
                  <Plus className="mr-2" />
                  <span>Create Company</span>
                </div>
              }
            />
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Datasources">
          <CommandItem>
            <CreateDatasource
              triggerButton={
                <div className="flex items-center">
                  <Plus className="mr-2" />
                  <span>Create Datasource</span>
                </div>
              }
            />
          </CommandItem>
          <CommandItem>
            <Database className="mr-2" />
            <span onClick={() => router.push('/settings')}>Open Datasources</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Settings className="mr-2" />
            <span onClick={() => router.push('/settings')}>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <User2Icon className="mr-2" />
            <span onClick={() => router.push('/profile')}>Edit Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
