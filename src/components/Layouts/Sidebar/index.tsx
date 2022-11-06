import GitHubIcon from '@mui/icons-material/GitHub'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Link } from '@/components/Elements/Link'
import { LeadAuthorization } from '@/components/Layouts/LeadAuthorization'
import { FavoritedFoldersList } from '@/features/favoriteFolder/components/FavoritedFoldersList'
import { MyFoldersList } from '@/features/folder/components/MyFoldersList'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { DRAWER_WIDTH } from '@/utils/const'

export const Sidebar: FC = () => {
  const authenticated = useRecoilValue(isAuthenticatedState)
  const { isDesktopScreen } = useMedia()

  const renderContent = (
    <>
      <Box sx={{ mx: 2 }}>
        <LeadAuthorization />
      </Box>
      {authenticated && (
        <>
          <FavoritedFoldersList />
          <MyFoldersList />
        </>
      )}
      <Box sx={{ m: 2 }}>
        <MuiButton
          disableElevation
          fullWidth
          href='https://github.com/FutaMiyazaki/gathelink'
          startIcon={<GitHubIcon />}
          target='_blank'
          variant='outlined'
          sx={{ borderRadius: 5, fontWeight: 'bold' }}
        >
          GitHub
        </MuiButton>
      </Box>
    </>
  )

  return (
    <Box
      sx={{
        '@media screen and (min-width:900px)': {
          flexShrinks: 0,
          width: DRAWER_WIDTH,
        },
      }}
    >
      {isDesktopScreen && (
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            borderColor: 'secondary.light',
            '& .MuiDrawer-paper': {
              bgcolor: '#f5f5f5',
              width: DRAWER_WIDTH,
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Box sx={{ pt: 3 }}>
            <Stack
              alignItems='center'
              direction='row'
              justifyContent='space-between'
              sx={{ pl: 2, pr: 1, mb: 2 }}
            >
              <Link path='/' underline='none'>
                <Typography component='span' color='primary' noWrap variant='h6'>
                  Gathelink
                </Typography>
              </Link>
            </Stack>
            {renderContent}
          </Box>
        </Drawer>
      )}
    </Box>
  )
}
