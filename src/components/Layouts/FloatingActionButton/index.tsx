import AddIcon from '@mui/icons-material/Add'
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { isOpenCreateFolderDialogState } from '@/states/isOpenCreateFolderDialogState'
import { RouterParams } from '@/types/RouterParams'

export type DialogType = 'addLink' | 'createFolder'

export const FloatingActionButton: FC = () => {
  const { isMobileScreen } = useMedia()
  const [openDrawer, setOpenDrawer] = useState(false)
  const setIsOpenNewFolderDialog = useSetRecoilState(isOpenCreateFolderDialogState)
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const navigate = useNavigate()
  const location = useLocation()
  const { folderId, linkId } = useParams<RouterParams>()

  const actions = [
    {
      icon: <AddLinkOutlinedIcon sx={{ color: 'secondary.dark' }} />,
      name: 'リンクを追加',
      onClick: () => {
        navigate('/new/link')
        setOpenDrawer(false)
      },
    },
    {
      icon: <CreateNewFolderOutlinedIcon sx={{ color: 'secondary.dark' }} />,
      name: 'フォルダを作成',
      onClick: () => {
        setOpenDrawer(false)
        setIsOpenNewFolderDialog(true)
      },
    },
  ]

  if (
    !isAuthenticated ||
    !isMobileScreen ||
    location.pathname === '/new/link' ||
    location.pathname === `/folder/${folderId as string}/edit` ||
    location.pathname === `/folder/${folderId as string}/link/${linkId as string}`
  )
    return null

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: 'fixed',
          transform: 'translateZ(0px)',
          bottom: 60,
          right: 0,
        }}
      >
        <Fab
          color='primary'
          onClick={() => setOpenDrawer(true)}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          <AddIcon sx={{ fontWeight: 'bold' }} />
        </Fab>
      </Box>
      <Drawer
        anchor='bottom'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          style: { borderTopLeftRadius: 15, borderTopRightRadius: 15 },
        }}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          sx={{ textAlign: 'center', p: 3 }}
        >
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant='h6'>新規作成</Typography>
          </Grid>
          {actions.map((item) => {
            return (
              <Grid
                key={item.name}
                item
                xs={6}
                onClick={item.onClick}
                sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
              >
                <Avatar
                  sx={{
                    backgroundColor: 'white',
                    border: 1,
                    borderColor: 'secondary.dark',
                    mb: 1,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography color='primary' variant='subtitle1'>
                  {item.name}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </Drawer>
    </>
  )
}
