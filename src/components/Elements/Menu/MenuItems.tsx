import { ReactNode } from 'react'

export type MenuItems = Array<{
  icon?: ReactNode
  onClick?: () => void
  path?: string
  text: string
}>
