import MuiDialogActions from '@mui/material/DialogActions'
import { SxProps } from '@mui/material/styles'
import { FC, ReactNode } from 'react'

type DialogActionsProps = {
  children: ReactNode
  sx?: SxProps
}

export const DialogActions: FC<DialogActionsProps> = ({ children, sx }) => (
  <MuiDialogActions sx={{ pr: 3, pb: 3, ...sx }}>{children}</MuiDialogActions>
)
