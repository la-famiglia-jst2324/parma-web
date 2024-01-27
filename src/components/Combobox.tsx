'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon, Plus, TrendingUpIcon, Settings, User2Icon, Database } from 'lucide-react'
import CreateBucket from './buckets/createBucket'
import CreateCompanyModal from './companies/CreateCompanyModal'
import { Popover } from '@/components/ui/popover'
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

export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [showCompanyModal, setShowCompanyModal] = React.useState(false)
  const [showBucketModal, setShowBucketModal] = React.useState(false)
  const [showDatasourceModal, setShowDatasourceModal] = React.useState(false)
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
    <Popover>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandList>
          <CommandInput placeholder="Search command..." />
          <CommandEmpty>No command found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                router.push('/')
                setOpen(false)
              }}
            >
              <TrendingUpIcon className="mr-2" />
              <span onClick={() => router.push('/')}>Trending News</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/search')
                setOpen(false)
              }}
            >
              <SearchIcon className="mr-2" />
              <span onClick={() => router.push('/search')}>Find buckets or companies</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Buckets">
            <CommandItem
              onSelect={() => {
                setShowBucketModal(true)
              }}
            >
              <div className="flex items-center">
                <Plus className="mr-2 cursor-pointer" />
                <span>Create Bucket</span>
              </div>
            </CommandItem>
            <CreateBucket isOpen={showBucketModal} setOpen={setShowBucketModal} />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Companies">
            <CommandItem
              onSelect={() => {
                setShowCompanyModal(true)
              }}
            >
              <div className="flex items-center">
                <Plus className="mr-2" />
                <span>Create Company</span>
              </div>
            </CommandItem>
            <CreateCompanyModal isOpen={showCompanyModal} setOpen={setShowCompanyModal} />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Datasources">
            <CommandItem
              onSelect={() => {
                setShowDatasourceModal(true)
              }}
            >
              <div className="flex items-center">
                <Plus className="mr-2" />
                <span>Create Datasource</span>
              </div>
            </CommandItem>
            <CreateDatasource isOpen={showDatasourceModal} setOpen={setShowDatasourceModal} />
            <CommandItem
              onSelect={() => {
                router.push('/datasources')
                setOpen(false)
              }}
            >
              <Database className="mr-2" />
              <span onClick={() => router.push('/datasources')}>Open Datasources</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() => {
                router.push('/settings')
                setOpen(false)
              }}
            >
              <Settings className="mr-2" />
              <span onClick={() => router.push('/settings')}>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/profile')
                setOpen(false)
              }}
            >
              <User2Icon className="mr-2" />
              <span onClick={() => router.push('/profile')}>Edit Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Popover>
  )
}
