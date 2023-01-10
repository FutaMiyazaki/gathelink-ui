import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'

type NaviAction = {
  label: string
  icon: JSX.Element
  path: string
}

export const naviActions: readonly NaviAction[] = [
  { label: 'ホーム', icon: <HomeRoundedIcon />, path: '' },
  { label: 'お気に入り', icon: <StarRoundedIcon />, path: '/favorite?sort=created_asc' },
  { label: 'フォルダ', icon: <FolderRoundedIcon />, path: '/myfolders?sort=created_asc' },
]
