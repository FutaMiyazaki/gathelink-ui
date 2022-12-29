import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logout from '@mui/icons-material/Logout'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useState, FC, MouseEvent } from 'react'

import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { useLogout } from '@/features/auth/hooks/useLogout'

export const HeaderAccountMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { logout } = useLogout()

  const handleOpenMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = (): void => setAnchorEl(null)

  const handleClickLogout = (): void => {
    logout()
  }

  const accountMenuItems: MenuItems = [
    {
      icon: <SettingsOutlinedIcon fontSize='small' sx={{ mr: 1 }} />,
      onClick: handleCloseMenu,
      text: '設定',
    },
    {
      icon: <Logout fontSize='small' sx={{ mr: 1 }} />,
      onClick: handleClickLogout,
      text: 'ログアウト',
    },
  ]

  return (
    <Box>
      <IconButton onClick={handleOpenMenu} size='small'>
        <AccountCircleIcon color='primary' sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} menuItems={accountMenuItems} />
    </Box>
  )
}
