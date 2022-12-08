import { atom } from 'recoil'

import { Link } from '@/features/link/types/Link'

type FolderHasLinks = Link[]

export const folderHasLinksState = atom<FolderHasLinks>({
  key: 'folderHasLinksState',
  default: [
    {
      id: 0,
      title: '',
      url: '',
      folder_id: 0,
      updated_at: '',
    },
  ],
})
