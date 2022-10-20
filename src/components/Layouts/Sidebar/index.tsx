import GitHubIcon from '@mui/icons-material/GitHub'
import { Button as MuiButton } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { Link } from '@/components/Elements/Link'
import { buttonItems } from '@/components/Layouts/Sidebar/buttonItems'
import { useGuestLogin } from '@/features/auth/hooks/useGuestLogin'
import { MyFoldersList } from '@/features/folder/components/MyFoldersList'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { isDrawerOpenedState } from '@/states/DrawerAtom'
import { DRAWER_WIDTH } from '@/utils/const'

export const Sidebar: FC = () => {
  const { isDesktopScreen } = useMedia()
  const [isDrawerOpened, setIsDrawerOpened] = useRecoilState(isDrawerOpenedState)
  const authenticated = useRecoilValue(isAuthenticatedState)
  const { isLoading, guestLogin } = useGuestLogin()

  const handleClickGuestButton = (): void => {
    guestLogin()
  }

  const renderContent = (
    <>
      {!authenticated && (
        <Stack
          direction='column'
          spacing={2}
          sx={{
            backgroundColor: 'secondary.light',
            borderRadius: 3,
            p: 2,
            mx: 2,
          }}
        >
          <Typography variant='body2'>
            新規登録・ログインをすると便利に Gathelink を使うことができます
          </Typography>
          {buttonItems.map((item) => (
            <LinkButton
              key={item.label}
              fullWidth={true}
              label={item.label}
              path={item.path}
              variant={item.variant}
            />
          ))}
          <Button
            onClick={handleClickGuestButton}
            isLoading={isLoading}
            fullWidth={true}
            label='ゲストログインはこちら'
            variant='text'
          />
        </Stack>
      )}
      {authenticated && <MyFoldersList />}
      <Box sx={{ m: 2 }}>
        <MuiButton
          disableElevation
          fullWidth
          href='https://github.com/FutaMiyazaki/gathelink'
          startIcon={<GitHubIcon width={22} height={22} />}
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
      {isDesktopScreen ? (
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            borderColor: 'secondary.light',
            bgcolor: '#f5f5f5',
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Box sx={{ pt: 3 }}>
            <Link path='/' underline='none'>
              <Typography
                variant='h6'
                noWrap
                color='primary'
                sx={{ pl: 2, mb: 2, display: { xs: 'none', md: 'flex' } }}
              >
                Gathelink
              </Typography>
            </Link>
            {renderContent}
          </Box>
        </Drawer>
      ) : (
        <Drawer
          open={isDrawerOpened}
          onClose={() => setIsDrawerOpened(false)}
          PaperProps={{ sx: { width: DRAWER_WIDTH } }}
        >
          <Box sx={{ py: 2 }}>{renderContent}</Box>
        </Drawer>
      )}
    </Box>
  )
}
