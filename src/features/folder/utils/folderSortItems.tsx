import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import NorthRoundedIcon from '@mui/icons-material/NorthRounded'
import SouthRoundedIcon from '@mui/icons-material/SouthRounded'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded'

export const folderSortItems = [
  {
    value: 'created_asc',
    icon: <HistoryRoundedIcon fontSize='small' />,
    label: '作成日時が古い順',
  },
  {
    value: 'created_desc',
    icon: <UpdateRoundedIcon fontSize='small' />,
    label: '作成日時が新しい順',
  },
  {
    value: 'name_asc',
    icon: <NorthRoundedIcon fontSize='small' />,
    label: '名前順 (A-Z)',
  },
  {
    value: 'name_desc',
    icon: <SouthRoundedIcon fontSize='small' />,
    label: '名前順 (Z-A)',
  },
]
