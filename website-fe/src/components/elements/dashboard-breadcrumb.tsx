'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export function DashboardBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1
    const label = segment.replace(/-/g, ' ')

    return (
      <Fragment key={href}>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isLast ? (
            <span className="font-medium text-black capitalize">{label}</span>
          ) : (
            <BreadcrumbLink asChild>
              <Link
                href={href}
                className="text-gray-600 capitalize underline hover:text-gray-800"
              >
                {label}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Fragment>
    )
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="text-gray-600 underline hover:text-blue-800">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
