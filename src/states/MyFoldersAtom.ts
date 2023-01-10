import { atom } from 'recoil'

import { Folder } from '@/features/folder/types/Folder'

type myFolders = Folder[]

export const myFoldersState = atom<myFolders>({
  key: 'myFoldersState',
  default: [
    {
      id: 0,
      name: '',
      created_at: '',
      updated_at: '',
      links: undefined,
      user: undefined,
      tags: undefined
    },
  ],
})
