import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { ListItemIcon } from '@/components/Elements/ListItemIcon'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { currentUserState } from '@/states/CurrentUserAtom'

export const AccountMenu: FC = () => {
  const [isExpandAccountMenu, setIsExpandAccountMenu] = useState<boolean>(false)
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const currentUser = useRecoilValue(currentUserState)
  const { logout } = useLogout()

  if (!isAuthenticated) return null

  return (
    <Box sx={{ mb: 3 }}>
      <ListItemButton
        dense
        onClick={() => setIsExpandAccountMenu(!isExpandAccountMenu)}
        sx={{ px: 2 }}
      >
        <ListItemIcon>
          <AccountCircleRoundedIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold' }}>
            {currentUser.name}
          </Typography>
        </ListItemText>
        {isExpandAccountMenu ? <CloseRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
      </ListItemButton>
      <Collapse in={isExpandAccountMenu} timeout='auto' unmountOnExit>
        <List disablePadding component='div'>
          <ListItemButton dense component={Link} to='/account' sx={{ pl: 4 }}>
            <ListItemIcon>
              <SettingsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='アカウント設定' />
          </ListItemButton>
          <ListItemButton dense onClick={async () => await logout()} sx={{ pl: 4 }}>
            <ListItemIcon>
              <ExitToAppRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='ログアウト' />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  )
}
