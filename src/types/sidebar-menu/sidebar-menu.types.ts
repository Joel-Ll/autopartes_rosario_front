import type { LucideIcon } from 'lucide-react'

interface NavItem {
  title: string
  url?: string
  icon: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string,
  }[]
}

export interface INavData {
  navMain: NavItem[]
}