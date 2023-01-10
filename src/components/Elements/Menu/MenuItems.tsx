import { ReactNode } from 'react'

export type MenuItem = Readonly<{
  onClick?: () => void
  text: string
  icon: ReactNode
  path?: string
  isShow: boolean
}>

export type MenuItems = MenuItem[]
