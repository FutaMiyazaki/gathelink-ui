import Logout from '@mui/icons-material/Logout'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useState, FC, MouseEvent } from 'react'

import { Menu } from '@/components/Elements/Menu'
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

  const accountMenuItems = [
    { icon: <SettingsOutlinedIcon fontSize='small' />, onClick: handleCloseMenu, text: '設定' },
    { icon: <Logout fontSize='small' />, onClick: handleClickLogout, text: 'ログアウト' },
  ]

  return (
    <Box>
      <IconButton onClick={handleOpenMenu} size='small'>
        <Avatar sx={{ width: 32, height: 32 }}>
          <PersonOutlineOutlinedIcon />
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} menuItems={accountMenuItems} />
    </Box>
  )
}
