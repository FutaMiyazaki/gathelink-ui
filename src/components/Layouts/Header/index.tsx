import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FC, MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { Link } from '@/components/Elements/Link'
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
  const navigate = useNavigate()

  const handleOpenMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const headerAddActions: MenuItems = [
    {
      icon: <AddLinkOutlinedIcon sx={{ mr: 1 }} />,
      onClick: () => {
        navigate('/new/link')
        setAnchorEl(null)
      },
      text: 'リンクを追加',
    },
    {
      icon: <CreateNewFolderOutlinedIcon sx={{ mr: 1 }} />,
      onClick: () => {
        setIsOpenCreateFolderDialog(true)
        setAnchorEl(null)
      },
      text: 'フォルダを作成',
    },
  ]

  return (
    <AppBar
      elevation={0}
      sx={{ backgroundColor: 'secondary.light', borderBottom: 1, borderColor: '#e0e0e0' }}
    >
      <Toolbar variant={isDesktopScreen ? 'regular' : 'dense'}>
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
        {isAuthenticated && isDesktopScreen && (
          <>
            <Button
              icon={<CreateOutlinedIcon />}
              label='追加'
              onClick={handleOpenMenu}
              variant='contained'
              sx={{ ml: 38 }}
            />
            <Menu
              anchorEl={anchorEl}
              handleCloseMenu={() => setAnchorEl(null)}
              menuItems={headerAddActions}
            />
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
