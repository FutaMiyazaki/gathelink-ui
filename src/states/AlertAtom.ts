import { atom } from 'recoil'
type Alert = {
  isShow: boolean
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
}

export const alertState = atom<Alert>({
  key: 'alertState',
  default: {
    isShow: false,
    message: '',
    severity: 'error',
  },
})
