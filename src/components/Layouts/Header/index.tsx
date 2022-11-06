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
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { Link } from '@/components/Elements/Link'
import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { GlobalMenu } from '@/components/Layouts/GlobamMenu'
import { HeaderAccountMenu } from '@/components/Layouts/Header/AccountMenu'
import { buttonItems } from '@/components/Layouts/LeadAuthorization/buttonItems'
import { CreateFolderDialog } from '@/features/folder/components/CreateFolderDialog'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'

export const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openFolderDialog, setOpenFolderDialog] = useState(false)
  const authenticated = useRecoilValue(isAuthenticatedState)
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
        setOpenFolderDialog(true)
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
        {authenticated && isDesktopScreen && (
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
            <CreateFolderDialog
              handleCloseDialog={() => setOpenFolderDialog(false)}
              open={openFolderDialog}
            />
          </>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {isDesktopScreen && <GlobalMenu />}
        {authenticated && <HeaderAccountMenu />}
        {!authenticated && !isDesktopScreen && (
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
