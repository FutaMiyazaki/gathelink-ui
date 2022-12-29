import { atom } from 'recoil'

import { Folder } from '@/features/folder/types/Folder'

type FavoriteFolders = Folder[]

export const favoriteFoldersState = atom<FavoriteFolders>({
  key: 'favoriteFoldersState',
  default: [
    {
      id: 0,
      name: '',
      created_at: '',
      updated_at: '',
      links: undefined,
      user: undefined,
    },
  ],
})
