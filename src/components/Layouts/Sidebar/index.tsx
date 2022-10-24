import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Button as MuiButton } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { Link } from '@/components/Elements/Link'
import { buttonItems } from '@/components/Layouts/buttonItems'
import { useGuestLogin } from '@/features/auth/hooks/useGuestLogin'
import { CreateFolderDialog } from '@/features/folder/components/CreateFolderDialog'
import { MyFoldersList } from '@/features/folder/components/MyFoldersList'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { DRAWER_WIDTH } from '@/utils/const'

export const Sidebar: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const { isDesktopScreen } = useMedia()
  const authenticated = useRecoilValue(isAuthenticatedState)
  const { isLoading, guestLogin } = useGuestLogin()

  const handleClickGuestButton = (): void => {
    guestLogin()
  }

  const handleOpenDialog = (): void => {
    setOpenDialog(true)
  }

  const handleCloseDialog = (): void => {
    setOpenDialog(false)
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
      {isDesktopScreen && (
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
            <Stack
              alignItems='center'
              direction='row'
              justifyContent='space-between'
              sx={{ pl: 2, pr: 1, mb: 3 }}
            >
              <Link path='/' underline='none'>
                <Typography component='span' color='primary' noWrap variant='h6'>
                  Gathelink
                </Typography>
              </Link>
              {authenticated && (
                <Button
                  icon={<CreateNewFolderOutlinedIcon />}
                  label='フォルダ作成'
                  onClick={handleOpenDialog}
                  size='small'
                />
              )}
            </Stack>
            <CreateFolderDialog handleCloseDialog={handleCloseDialog} open={openDialog} />
            {renderContent}
          </Box>
        </Drawer>
      )}
    </Box>
  )
}
