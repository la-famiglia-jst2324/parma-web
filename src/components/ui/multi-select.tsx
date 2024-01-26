import * as React from 'react'
import { Check, X, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/utils'

import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export type OptionType = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: OptionType[]
  selected: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  className?: string
  placeholder?: string
  width?: string
}

function MultiSelect({
  options,
  selected,
  onChange,
  className,
  placeholder = 'Search ...',
  width,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${width || 'w-full'} justify-between ${selected.length > 1 ? 'h-full' : 'h-10'}`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap items-center gap-1">
            {selected.map((item) => (
              <Badge variant="secondary" key={item} className="mb-1 mr-1" onClick={() => handleUnselect(item)}>
                {options.find((option) => option.value === item)?.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(item)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            {selected.length === 0 ? <p className="text-gray-400">{placeholder}</p> : null}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${width || 'w-full'} p-0`}>
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          {options?.length > 0 ? (
            <CommandGroup className="max-h-64 overflow-auto">
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      selected.includes(option.value)
                        ? selected.filter((item) => item !== option.value)
                        : [...selected, option.value]
                    )
                    setOpen(true)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', selected.includes(option.value) ? 'opacity-100' : 'opacity-0')}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
