import StarIcon from '@mui/icons-material/Star'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { Link } from '@/components/Elements/Link'
import { HeaderAccountMenu } from '@/components/Layouts/Header/AccountMenu'
import { buttonItems } from '@/components/Layouts/LeadAuthorization/buttonItems'
import { AddLinkDialog } from '@/features/link/components/addLinkDialog'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'

export const Header: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const authenticated = useRecoilValue(isAuthenticatedState)
  const { isDesktopScreen } = useMedia()

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
            <Button icon={<StarIcon />} label='リンク追加' onClick={() => setOpenDialog(true)} />
            <AddLinkDialog handleCloseDialog={() => setOpenDialog(false)} open={openDialog} />
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
