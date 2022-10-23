import { atom } from 'recoil'

import { Link } from '@/features/link/types/Link'

type EditingLinks = Link[]

export const EditingLinksState = atom<EditingLinks>({
  key: 'editingLinksState',
  default: [
    {
      id: 0,
      title: '',
      url: '',
      updated_at: '',
    },
  ],
})
