import GitHubIcon from '@mui/icons-material/GitHub'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'
import { ListItemIcon } from '@/components/Elements/ListItemIcon'
import { LeadAuthorization } from '@/components/Layouts/LeadAuthorization'
import { AccountMenu } from '@/components/Layouts/Sidebar/AccountMenu'
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
          <AccountMenu />
          <Divider sx={{ my: 2 }} />
          <FavoriteFoldersList />
          <MyFoldersList />
          <Divider sx={{ my: 2 }} />
          <ListItemButton
            component='a'
            href='https://github.com/FutaMiyazaki/gathelink-ui'
            target='_blank'
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary='GitHub' />
          </ListItemButton>
        </Box>
      </Drawer>
    </Box>
  )
}
