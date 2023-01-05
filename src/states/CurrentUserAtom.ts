import { atom } from 'recoil'
type CurrentUser = {
  id: number
  name: string,
}

export const currentUserState = atom<CurrentUser>({
  key: 'currentUserState',
  default: {
    id: -1,
    name: '',
  },
})
