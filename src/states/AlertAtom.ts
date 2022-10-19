import { AlertColor } from '@mui/material'
import { atom } from 'recoil'
type Alert = {
  isShow: boolean
  message: string
  severity: AlertColor
}

export const alertState = atom<Alert>({
  key: 'alertState',
  default: {
    isShow: false,
    message: '',
    severity: 'error',
  },
})
