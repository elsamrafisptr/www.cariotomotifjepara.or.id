'use client'

import { ProductSchema } from '@/common/types'
import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './column-header'
import { DataTableRowActions } from './row-actions'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<ProductSchema>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-full gap-2">
          <span className="w-full min-w-96 truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product's Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full capitalize">
            {row.getValue('type')}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'condition',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Condition" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full capitalize">
            {row.getValue('condition')}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'brandId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Brand" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full capitalize">
            {row.getValue('condition')}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'categoryId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full capitalize">
            {row.getValue('condition')}
          </Badge>
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
