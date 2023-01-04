import MuiListItemIcon from '@mui/material/ListItemIcon'
import { SxProps } from '@mui/material/styles'
import { FC, ReactNode } from 'react'

type ListItemIconProps = Readonly<{
  children: ReactNode
  sx?: SxProps
}>

export const ListItemIcon: FC<ListItemIconProps> = ({ children, sx }) => (
  <MuiListItemIcon sx={{ minWidth: 40, ...sx }}>{children}</MuiListItemIcon>
)
