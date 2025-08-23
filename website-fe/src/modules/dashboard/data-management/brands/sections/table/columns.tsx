'use client'

import Image from 'next/image'
import Link from 'next/link'

import { BrandSchema } from '@/common/types'
import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './column-header'
import { DataTableRowActions } from './row-actions'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<BrandSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Number" />,
    cell: ({ row }) => <div className="w-fit">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'imageUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand's Image" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue<string>('imageUrl')

      if (!imageUrl) {
        return (
          <div className="flex h-10 w-16 items-center justify-center rounded bg-gray-100 text-xs text-gray-500">
            No Image
          </div>
        )
      }

      return (
        <div className="flex h-10 w-16 items-center">
          <Image
            src={imageUrl}
            alt={row.getValue('name') || 'Brand'}
            width={64}
            height={64}
            className="aspect-video rounded border object-cover"
          />
        </div>
      )
    }
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand's Name" />
    ),
    cell: ({ row }) => {
      return <div className="flex gap-2">{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand's Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center gap-2">
          <Badge variant="outline" className="rounded-full capitalize">
            {row.getValue('type')}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand's Site Preview" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-start gap-2">
          <Button asChild variant="link" size="sm" className="px-0">
            <Link
              className="text-left text-sm font-normal text-sky-500 hover:text-sky-600"
              href={'/brands' + row.getValue('url')}
            >
              Go to {row.getValue('name')} Page
            </Link>
          </Button>
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'aspect-square size-1 rounded-full',
              row.original.status === 'moderation' && 'bg-blue-600',
              row.original.status === 'active' && 'bg-green-600',
              row.original.status === 'hidden' && 'bg-gray-600',
              row.original.status === 'disabled' && 'bg-red-600',
              row.original.status === 'dissaproved' && 'bg-orange-600'
            )}
          ></div>
          <p className="text-xs capitalize">{row.getValue('status')}</p>
        </div>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
