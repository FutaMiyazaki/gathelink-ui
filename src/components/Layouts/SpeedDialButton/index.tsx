import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { FC, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { actions } from '@/components/Layouts/SpeedDialButton/actions'
import { CreateFolderDialog } from '@/features/folder/components/CreateFolderDialog'
import { AddLinkDialog } from '@/features/link/components/addLinkDialog'
import { useMedia } from '@/hooks/useMedia'
import { isAuthenticatedState } from '@/states/AuthAtom'

export type DialogType = 'addLink' | 'createFolder'

type OpenDialog = {
  type: DialogType
  open: boolean
}

export const SpeedDialButton: FC = () => {
  const { isMobileScreen } = useMedia()
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
  const [openDialog, setOpenDialog] = useState<OpenDialog>({
    type: 'addLink',
    open: false,
  })
  const isAuthenticated = useRecoilValue(isAuthenticatedState)

  const handleOpenDialog = (actionType: DialogType): void => {
    setOpenSpeedDial(false)
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
            <Backdrop open={openSpeedDial} />
            <SpeedDial
              ariaLabel='App SpeedDial'
              icon={<SpeedDialIcon />}
              onClose={() => setOpenSpeedDial(false)}
              onOpen={() => setOpenSpeedDial(true)}
              open={openSpeedDial}
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  onClick={() => handleOpenDialog(action.type)}
                  tooltipOpen
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </Box>
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
