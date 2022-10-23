import StarIcon from '@mui/icons-material/Star'
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { Link } from '@/components/Elements/Link'
import { HeaderAccountMenu } from '@/components/Layouts/Header/AccountMenu'
import { buttonItems } from '@/components/Layouts/Sidebar/buttonItems'
import { AddLinkDialog } from '@/features/link/components/addLinkDialog'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'

export const Header: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const authenticated = useRecoilValue(isAuthenticatedState)
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
        {!authenticated && !isDesktopScreen && (
          <Stack alignItems='center' direction='row' spacing={1}>
            {buttonItems.map((item) => (
              <LinkButton
                key={item.label}
                fullWidth={true}
                label={item.label}
                path={item.path}
                variant={item.variant}
              />
            ))}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}
