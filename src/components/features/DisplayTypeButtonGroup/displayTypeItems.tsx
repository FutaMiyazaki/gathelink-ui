import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import ListRoundedIcon from '@mui/icons-material/ListRounded'
import { ReactNode } from 'react'

export type DisplayType = 'list' | 'card'

export type DisplayTypeItem = Readonly<{
  value: DisplayType
  icon: ReactNode
  label: string
}>

export const displayTypeItems: DisplayTypeItem[] = [
  { value: 'list', icon: <ListRoundedIcon />, label: 'リスト' },
  { value: 'card', icon: <GridViewRoundedIcon />, label: 'カード' },
]
