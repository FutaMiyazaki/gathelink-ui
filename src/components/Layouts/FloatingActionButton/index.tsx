import AddIcon from '@mui/icons-material/Add'
import { Avatar, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { actions } from '@/components/Layouts/FloatingActionButton/actions'
import { CreateFolderDialog } from '@/features/folder/components/CreateFolderDialog'
import { AddLinkDialog } from '@/features/link/components/addLinkDialog'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'

export type DialogType = 'addLink' | 'createFolder'

type OpenDialog = {
  type: DialogType
  open: boolean
}

export const FloatingActionButton: FC = () => {
  const { isMobileScreen } = useMedia()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDialog, setOpenDialog] = useState<OpenDialog>({
    type: 'addLink',
    open: false,
  })
  const isAuthenticated = useRecoilValue(isAuthenticatedState)

  const handleOpenDialog = (actionType: DialogType): void => {
    setOpenDrawer(false)
    setOpenDialog({ type: actionType, open: true })
  }

  return (
    <>
      {isAuthenticated && isMobileScreen && (
        <>
          <Box
            sx={{
              flexGrow: 1,
              position: 'fixed',
              transform: 'translateZ(0px)',
              bottom: 0,
              right: 0,
            }}
          >
            <IconButton
              onClick={() => setOpenDrawer(true)}
              size='large'
              sx={{ boxShadow: 5, position: 'absolute', bottom: 16, right: 16, p: 0 }}
            >
              <Avatar sx={{ backgroundColor: 'primary.main' }}>
                <AddIcon />
              </Avatar>
            </IconButton>
          </Box>
          <Drawer anchor='bottom' open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              spacing={1}
              sx={{ textAlign: 'center', px: 3, py: 2 }}
            >
              <Grid item xs={12}>
                <Typography variant='h6'>新規作成</Typography>
              </Grid>
              {actions.map((action) => (
                <Grid
                  key={action.name}
                  item
                  xs={6}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <IconButton onClick={() => handleOpenDialog(action.type)}>
                    {action.icon}
                  </IconButton>
                  <Button
                    label={action.name}
                    onClick={() => handleOpenDialog(action.type)}
                    variant='text'
                  />
                </Grid>
              ))}
            </Grid>
          </Drawer>
          {openDialog.type === 'addLink' && (
            <AddLinkDialog
              handleCloseDialog={() => setOpenDialog({ type: 'addLink', open: false })}
              open={openDialog.open}
            />
          )}
          {openDialog.type === 'createFolder' && (
            <CreateFolderDialog
              handleCloseDialog={() => setOpenDialog({ type: 'createFolder', open: false })}
              open={openDialog.open}
            />
          )}
        </>
      )}
    </>
  )
}
