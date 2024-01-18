import React from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon, Plus, Settings, User2Icon, Database } from 'lucide-react'
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
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const router = useRouter()

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <SearchIcon className="mr-2" />
            <span onClick={() => router.push('/search')}>Find buckets or companies</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Buckets">
          <CommandItem>
            <Plus className="mr-2" />
            Create Bucket
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Companies">
          <CommandItem>
            <Plus className="mr-2" />
            Create Company
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
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
