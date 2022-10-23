import { FoldersSortType } from '@/features/folder/types/FoldersSortType'

type SortMenuItems = Array<{
  label: string
  sortType: FoldersSortType
}>

export const sortMenuItems: SortMenuItems = [
  { label: '作成日時が古い順', sortType: 'old' },
  { label: '作成日時が新しい順', sortType: 'latest' },
]
