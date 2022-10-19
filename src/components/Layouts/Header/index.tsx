import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { FC } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { HeaderAccountMenu } from '@/components/Layouts/Header/AccountMenu'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { isDrawerOpenedState } from '@/states/DrawerAtom'

export const Header: FC = () => {
  const authenticated = useRecoilValue(isAuthenticatedState)
  const setIsDrawerOpened = useSetRecoilState(isDrawerOpenedState)

  return (
    <AppBar color='transparent' elevation={0} sx={{ borderBottom: 1, borderColor: '#e0e0e0' }}>
      <Toolbar>
        <IconButton
          onClick={() => setIsDrawerOpened(true)}
          sx={{ mr: 1, color: 'primary', display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          noWrap
          component='div'
          color='primary'
          sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
        >
          Gathelink
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {authenticated && <HeaderAccountMenu />}
      </Toolbar>
    </AppBar>
  )
}
