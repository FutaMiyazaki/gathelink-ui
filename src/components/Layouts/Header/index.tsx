import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FC, MouseEvent, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { Link as AppLink } from '@/components/Elements/Link'
import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { HeaderMenu } from '@/components/Layouts/Header/Menu'
import { buttonItems } from '@/components/Layouts/LeadAuthorization/buttonItems'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { isOpenCreateFolderDialogState } from '@/states/isOpenCreateFolderDialogState'

export const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const setIsOpenCreateFolderDialog = useSetRecoilState(isOpenCreateFolderDialogState)
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const { isDesktopScreen } = useMedia()

  const handleOpenMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const menuItems: MenuItems = [
    {
      onClick: () => {
        setAnchorEl(null)
      },
      text: 'リンクを追加',
      icon: <AddLinkOutlinedIcon />,
      path: '/new/link',
      isShow: true,
    },
    {
      onClick: () => {
        setIsOpenCreateFolderDialog(true)
        setAnchorEl(null)
      },
      text: 'フォルダを作成',
      icon: <CreateNewFolderOutlinedIcon />,
      isShow: true,
    },
  ]

  return (
    <AppBar
      elevation={0}
      sx={{ backgroundColor: 'secondary.light', borderBottom: 1, borderColor: '#e0e0e0' }}
    >
      <Toolbar variant={isDesktopScreen ? 'regular' : 'dense'}>
        <AppLink path='/'>
          <Typography
            color='primary'
            component='span'
            noWrap
            variant='h6'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontFamily: '-apple-system',
              fontWeight: 'bold',
            }}
          >
            Gathelink
          </Typography>
        </AppLink>
        {isAuthenticated && isDesktopScreen && (
          <>
            <Button
              icon={<CreateOutlinedIcon />}
              label='追加'
              onClick={handleOpenMenu}
              variant='contained'
              sx={{ ml: 38 }}
            />
            <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuItems={menuItems} />
          </>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {isAuthenticated && isDesktopScreen && <HeaderMenu />}
        {!isAuthenticated && !isDesktopScreen && (
          <Stack alignItems='center' direction='row' spacing={1}>
            {buttonItems.map((item) => (
              <LinkButton
                key={item.label}
                fullWidth={true}
                label={item.label}
                path={item.path}
                size='small'
                variant={item.variant}
              />
            ))}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}
