import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'

type NaviAction = {
  label: string
  icon: JSX.Element
  path: string
}

export const BottomNavigation: FC = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const { isDesktopScreen } = useMedia()

  const naviActions: readonly NaviAction[] = [
    { label: 'ホーム', icon: <HomeRoundedIcon />, path: '' },
    { label: 'お気に入り', icon: <StarRoundedIcon />, path: 'favorited' },
    { label: 'フォルダ', icon: <FolderRoundedIcon />, path: 'myfolders' },
    { label: '探す', icon: <SearchRoundedIcon />, path: 'seacrh' },
  ]

  if (isDesktopScreen || !isAuthenticated) return null

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
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
