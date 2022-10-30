import { atom } from 'recoil'

import { Folder } from '@/features/folder/types/Folder'

type FavoritedFolders = Folder[]

export const favoritedFoldersState = atom<FavoritedFolders>({
  key: 'favoritedFoldersState',
  default: [
    {
      id: 0,
      name: '',
      updated_at: '',
      links: undefined,
      user: undefined,
    },
  ],
})
