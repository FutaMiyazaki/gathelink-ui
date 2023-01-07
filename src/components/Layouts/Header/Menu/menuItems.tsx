import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { ReactNode } from 'react'

type MenuItems = Array<{
  readonly label: string
  readonly icon: ReactNode
  readonly path: string
  readonly value: string
}>

export const menuItems: MenuItems = [
  {
    label: 'お気に入り',
    icon: <StarRoundedIcon />,
    path: '/favorite?sort=created_asc',
    value: '/favorite',
  },
  {
    label: 'マイフォルダ',
    icon: <FolderRoundedIcon />,
    path: '/myfolders?sort=created_asc',
    value: '/myfolders',
  },
  {
    label: '全てのリンク',
    icon: <InsertLinkRoundedIcon />,
    path: '/mylinks?page=1&sort=created_asc',
    value: '/mylinks',
  },
]
