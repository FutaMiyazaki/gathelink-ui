import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Box from '@mui/material/Box'
import MuiDialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { Dispatch, FC, ReactNode, SetStateAction } from 'react'

type DialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  title: string
  titleIcon: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Dialog: FC<DialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
  title,
  titleIcon,
  children,
  maxWidth = 'sm',
}) => {
  return (
    <MuiDialog
      fullWidth
      maxWidth={maxWidth}
      onClose={() => setIsOpenDialog(false)}
      open={isOpenDialog}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
    >
      <DialogTitle>
        <Stack direction='row' justifyContent='space-between'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {titleIcon}
            <span>{title}</span>
          </Box>
          <IconButton onClick={() => setIsOpenDialog(false)} edge='end'>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      {children}
    </MuiDialog>
  )
}
