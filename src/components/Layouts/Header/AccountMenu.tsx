import Logout from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Avatar,
  CircularProgress,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useState, FC } from 'react'

import { useLogout } from '@/features/auth/hooks/useLogout'

export const HeaderAccountMenu: FC = () => {
  const { isLoading, logout } = useLogout()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }
  const handleClickLogout = (): void => {
    logout()
  }

  return (
    <div>
      <IconButton onClick={handleClick} size='small'>
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='body2'>設定</Typography>
        </MenuItem>
        <MenuItem onClick={handleClickLogout}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              <Typography variant='body2'>ログアウト</Typography>
            </>
          )}
        </MenuItem>
      </Menu>
    </div>
  )
}
