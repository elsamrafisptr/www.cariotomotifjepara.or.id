'use client'

import { PAGE_ROUTES } from '@/common/constants'
import { User } from '@/common/types'
import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react'
import { ComponentProps } from 'react'

import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  userData: Partial<User>
}

const data = {
  navMain: [
    {
      title: PAGE_ROUTES.main.dashboard.root.label,
      url: PAGE_ROUTES.main.dashboard.root.path,
      icon: SquareTerminal,
      isActive: true,
      items: []
    },
    {
      title: 'Data Management',
      url: PAGE_ROUTES.main.dashboard['data-management'].root.path,
      icon: Bot,
      items: [
        {
          title: 'Products',
          url: PAGE_ROUTES.main.dashboard['data-management'].products.path
        },
        {
          title: 'Brands',
          url: PAGE_ROUTES.main.dashboard['data-management'].brands.path
        },
        {
          title: 'Categories',
          url: PAGE_ROUTES.main.dashboard['data-management'].categories.path
        }
      ]
    },
    {
      title: 'Content Management',
      url: PAGE_ROUTES.main.dashboard['content-management'].root.path,
      icon: BookOpen,
      items: [
        {
          title: 'Blog Content',
          url: PAGE_ROUTES.main.dashboard['content-management'].blog.path
        }
      ]
    },
    {
      title: 'Settings',
      url: PAGE_ROUTES.main.dashboard.settings.root.path,
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: PAGE_ROUTES.main.dashboard.settings.general.path
        },
        {
          title: 'Personal',
          url: PAGE_ROUTES.main.dashboard.settings.personal.path
        },
        {
          title: 'Credit & Changelog',
          url: PAGE_ROUTES.main.dashboard.settings.changelog.path
        }
      ]
    }
  ]
}

export function AppSidebar({ userData, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
