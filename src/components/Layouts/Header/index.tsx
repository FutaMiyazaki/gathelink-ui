import MenuIcon from '@mui/icons-material/Menu'
import StarIcon from '@mui/icons-material/Star'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { Link } from '@/components/Elements/Link'
import { HeaderAccountMenu } from '@/components/Layouts/Header/AccountMenu'
import { AddLinkDialog } from '@/features/link/components/addLinkDialog'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { isDrawerOpenedState } from '@/states/DrawerAtom'

export const Header: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const authenticated = useRecoilValue(isAuthenticatedState)
  const setIsDrawerOpened = useSetRecoilState(isDrawerOpenedState)
  const { isDesktopScreen } = useMedia()

  const handleOpenDialog = (): void => {
    setOpenDialog(true)
  }

  const handleCloseDialog = (): void => {
    setOpenDialog(false)
  }

  return (
    <AppBar
      elevation={0}
      sx={{ backgroundColor: 'secondary.light', borderBottom: 1, borderColor: '#e0e0e0' }}
    >
      <Toolbar>
        <IconButton
          onClick={() => setIsDrawerOpened(true)}
          sx={{ mr: 1, color: 'primary', display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Link path='/'>
          <Typography
            color='primary'
            component='span'
            noWrap
            variant='h6'
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
          >
            Gathelink
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        {authenticated && <HeaderAccountMenu />}
        {authenticated && isDesktopScreen && (
          <>
            <Button icon={<StarIcon />} label='リンク追加' onClick={handleOpenDialog} />
            <AddLinkDialog handleCloseDialog={handleCloseDialog} open={openDialog} />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
