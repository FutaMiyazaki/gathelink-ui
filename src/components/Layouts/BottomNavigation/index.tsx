import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import Avatar from '@mui/material/Avatar'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { ListItemIcon } from '@/components/Elements/ListItemIcon'
import { Drawer } from '@/components/Layouts/BottomNavigation/Drawer'
import { naviActions } from '@/components/Layouts/BottomNavigation/naviActions'
import { menuItems } from '@/components/Layouts/Header/Menu/menuItems'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { currentUserState } from '@/states/CurrentUserAtom'

export const BottomNavigation: FC = () => {
  const [value, setValue] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)
  const [isExpandAccountMenu, setIsExpandAccountMenu] = useState<boolean>(false)
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const currentUser = useRecoilValue(currentUserState)
  const { isDesktopScreen } = useMedia()
  const { logout } = useLogout()

  const handleClickLogout = (): void => {
    setIsOpenDrawer(false)
    logout()
  }

  if (isDesktopScreen || !isAuthenticated) return null

  return (
    <>
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
              component={Link}
              to={action.path}
              value={action.label}
              label={action.label}
              icon={action.icon}
            />
          )
        })}
        <BottomNavigationAction
          onClick={() => setIsOpenDrawer(true)}
          value='メニュー'
          label='メニュー'
          icon={<MenuRoundedIcon />}
        />
      </MuiBottomNavigation>
      <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer}>
        <List disablePadding sx={{ my: 3 }}>
          <ListItemButton onClick={() => setIsExpandAccountMenu(!isExpandAccountMenu)}>
            <ListItemAvatar>
              <Avatar>
                <PersonRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={currentUser.name} />
            {isExpandAccountMenu ? <CloseRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
          </ListItemButton>
          <Collapse in={isExpandAccountMenu} timeout='auto' unmountOnExit>
            <List disablePadding component='div'>
              <ListItemButton
                onClick={() => setIsOpenDrawer(false)}
                component={Link}
                to='/account'
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <SettingsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='アカウント設定' />
              </ListItemButton>
              <ListItemButton onClick={handleClickLogout} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ExitToAppRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='ログアウト' />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider sx={{ my: 1 }} />
          {menuItems.map((item) => {
            return (
              <ListItemButton
                key={item.label}
                onClick={() => setIsOpenDrawer(false)}
                component={Link}
                to={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )
          })}
          <Divider sx={{ my: 1 }} />
          <ListItemButton
            onClick={() => setIsOpenDrawer(false)}
            component='a'
            href='https://github.com/FutaMiyazaki/gathelink-ui'
            target='_blank'
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary='GitHub' />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}
