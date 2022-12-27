import GitHubIcon from '@mui/icons-material/GitHub'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'
import { LeadAuthorization } from '@/components/Layouts/LeadAuthorization'
import { FavoriteFoldersList } from '@/features/folder/components/Sidebar/FavoriteFoldersList'
import { MyFoldersList } from '@/features/folder/components/Sidebar/MyFoldersList'
import { useMedia } from '@/hooks/useMedia'
import { DRAWER_WIDTH } from '@/utils/const'

export const Sidebar: FC = () => {
  const { isMobileScreen } = useMedia()

  if (isMobileScreen) return null

  return (
    <Box
      sx={{
        '@media screen and (min-width:900px)': {
          flexShrinks: 0,
          width: DRAWER_WIDTH,
        },
      }}
    >
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
          <Box sx={{ mx: 2 }}>
            <LeadAuthorization />
          </Box>
          <FavoriteFoldersList />
          <MyFoldersList />
          <Box sx={{ mx: 2, mt: 4, mb: 2 }}>
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
        </Box>
      </Drawer>
    </Box>
  )
}
