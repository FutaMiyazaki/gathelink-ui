type SortMenuItems = Array<{
  label: string
  sortType: string
}>

export const sortMenuItems: SortMenuItems = [
  { label: '作成日時が古い順', sortType: 'created_asc' },
  { label: '作成日時が新しい順', sortType: 'created_desc' },
  { label: '名前順 (A-Z)', sortType: 'title_asc' },
  { label: '名前順 (Z-A)', sortType: 'title_desc' },
]
