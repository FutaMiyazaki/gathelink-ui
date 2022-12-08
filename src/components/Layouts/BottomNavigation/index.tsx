import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMedia } from '@/hooks/useMedia'

type NaviAction = {
  label: string
  icon: JSX.Element
  path: string
}

export const BottomNavigation: FC = () => {
  const { isDesktopScreen } = useMedia()
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const naviActions: readonly NaviAction[] = [
    { label: 'Home', icon: <HomeRoundedIcon />, path: '' },
    { label: 'Favorite', icon: <StarRoundedIcon />, path: 'favorited' },
    { label: 'Myfolder', icon: <FolderRoundedIcon />, path: 'myfolders' },
    { label: 'Search', icon: <SearchRoundedIcon />, path: 'seacrh' },
  ]

  if (isDesktopScreen) return null

  return (
    <MuiBottomNavigation
      showLabels
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue)
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {naviActions.map((action) => {
        return (
          <BottomNavigationAction
            key={action.label}
            value={action.label}
            label={action.label}
            icon={action.icon}
            onClick={() => navigate(`/${action.path}`)}
          />
        )
      })}
    </MuiBottomNavigation>
  )
}
