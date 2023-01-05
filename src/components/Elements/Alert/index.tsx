import MuiAlert, { AlertColor } from '@mui/material/Alert'
import { SxProps } from '@mui/material/styles'
import { FC } from 'react'

type AlertProps = Readonly<{
  message?: string
  severity?: AlertColor
  sx?: SxProps
}>

export const Alert: FC<AlertProps> = ({ message, severity = 'error', sx }) => {
  if (message === '' || message === undefined) return null

  return (
    <MuiAlert icon={false} severity={severity} sx={{ mb: 2, ...sx }}>
      {message}
    </MuiAlert>
  )
}
