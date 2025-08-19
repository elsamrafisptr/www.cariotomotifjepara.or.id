'use client'

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
      title: 'Dashboard',
      url: '/',
      icon: SquareTerminal,
      isActive: true,
      items: []
    },
    {
      title: 'Data Management',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Products',
          url: '#'
        },
        {
          title: 'Brands',
          url: '#'
        },
        {
          title: 'Categories',
          url: '#'
        }
      ]
    },
    {
      title: 'Content Management',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Blog Content',
          url: '#'
        }
      ]
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#'
        },
        {
          title: 'Personal',
          url: '#'
        },
        {
          title: 'Credit & Changelog',
          url: '#'
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
