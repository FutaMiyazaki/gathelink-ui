import { atom } from 'recoil'
type Alert = {
  isShow: boolean
  message: string
}

export const alertState = atom<Alert>({
  key: 'alertState',
  default: {
    isShow: false,
    message: '',
  },
})
