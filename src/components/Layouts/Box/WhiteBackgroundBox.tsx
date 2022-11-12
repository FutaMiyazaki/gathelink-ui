import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import { FC, ReactNode } from 'react'

type WhiteBackgroundBoxType = {
  children: ReactNode
  sx?: SxProps
}

export const WhiteBackgroundBox: FC<WhiteBackgroundBoxType> = ({ children, sx }) => (
  <Box sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 3, ...sx }}>{children}</Box>
)
