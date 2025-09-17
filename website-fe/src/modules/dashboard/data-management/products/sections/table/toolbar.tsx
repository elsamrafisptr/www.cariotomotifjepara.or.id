'use client'

import {
  conditionTypeOptions,
  productTypeOptions,
  statusTypeOptions
} from '@/common/types'
import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { DataTableFacetedFilter } from './faceted-filter'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('type') && (
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title="Product's Type"
            options={productTypeOptions}
          />
        )}
        {table.getColumn('condition') && (
          <DataTableFacetedFilter
            column={table.getColumn('condition')}
            title="Condition"
            options={conditionTypeOptions}
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statusTypeOptions}
          />
        )}
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()}>
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">Add Product</Button>
      </div>
    </div>
  )
}
