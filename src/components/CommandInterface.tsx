import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon, Plus, TrendingUpIcon, Settings, User2Icon, Database } from 'lucide-react'
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

export function CommandInterface() {
  const [open, setOpen] = useState(false)
  // const [isCreateBucketOpen, setIsCreateBucketOpen] = useState(false);
  // const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push('/settings')
      } else if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push('/profile')
      } else if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push('/datasources')
      } else if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push('/')
      } else if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // open create buckets modal
      } else if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // open create companies modal
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
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SearchIcon className="mr-2" />
            <span onClick={() => router.push('/search')}>Find buckets or companies</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Buckets">
          <CommandItem>
            <Plus className="mr-2" />
            <span>Create Bucket</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        {/* {isCreateBucketOpen && <CreateBucket />} */}
        <CommandSeparator />
        <CommandGroup heading="Companies">
          <CommandItem>
            <Plus className="mr-2" />
            Create Company
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Datasources">
          <CommandItem>
            <Plus className="mr-2" />
            Create Datasource
          </CommandItem>
          <CommandItem>
            <Database className="mr-2" />
            Open Datasources
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
