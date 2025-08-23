'use client'

import { useRouter } from 'next/navigation'

import { brandSchema } from '@/common/types'
import { Row } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { statusTypeOptions } from '@/common/types/schema-type'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)

  const parsedData = brandSchema.safeParse(row.original)

  if (!parsedData.success) {
    console.error('Failed to parse row data:', parsedData.error)
    return null
  }

  const row_data = parsedData.data

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === row_data.status) return

    setIsLoading(true)
    startTransition(async () => {
      try {
        const response = await fetch(`/api/v1/brands/${row_data.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus })
        })

        if (!response.ok) {
          throw new Error('Failed to update brand')
        }

        router.refresh()
        toast.success(`Brand status updated to "${newStatus}"`)
      } catch (error) {
        console.error('Status update failed:', error)
        toast.error('Failed to update brand status.')
      } finally {
        setIsLoading(false)
      }
    })
  }

  const handleDelete = async () => {
    setIsLoading(true)
    startTransition(async () => {
      try {
        const response = await fetch(`/api/v1/brands/${row_data.id}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        router.refresh()
        toast.success('Brand deleted successfully.')
      } catch (error) {
        console.error('Delete failed:', error)
        toast.error('Failed to delete brand.')
      } finally {
        setIsLoading(false)
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-muted size-8"
          disabled={isPending || isLoading}
        >
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>View Data</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={row_data.status}
              onValueChange={handleStatusChange}
            >
              {statusTypeOptions.map(label => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={event => {
            event.preventDefault()
            handleDelete()
          }}
          variant="destructive"
          disabled={isPending || isLoading}
        >
          {isPending || isLoading ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
            </span>
          ) : (
            'Delete'
          )}
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
