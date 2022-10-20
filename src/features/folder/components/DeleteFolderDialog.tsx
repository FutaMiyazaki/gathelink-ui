import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, FC } from 'react'

import { Button } from '@/components/Elements/Button'
import { useDeleteFolder } from '@/features/folder/hooks/useDeleteFolder'
import { useMedia } from '@/hooks/useMedia'

type DeleteFolderDialogProps = {
  folderId: string
  handleCloseDialog: () => void
  open: boolean
}

export const DeleteFolderDialog: FC<DeleteFolderDialogProps> = ({
  folderId,
  handleCloseDialog,
  open,
}) => {
  const { deleteFolder, errorMessage, isLoading, resStatus } = useDeleteFolder()
  const { isMobileScreen } = useMedia()

  const onClickDeleteButton = (): void => {
    deleteFolder(folderId)
  }

  useEffect(() => {
    if (resStatus === 201) {
      handleCloseDialog()
    }
  }, [resStatus])

  return (
    <Dialog
      fullScreen={isMobileScreen}
      maxWidth='xs'
      open={open}
      onClose={() => handleCloseDialog()}
      sx={{ textAlign: 'center' }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Avatar sx={{ bgcolor: 'warning.main' }}>
          <DeleteForeverIcon />
        </Avatar>
      </Box>
      <DialogTitle>フォルダを削除しますか？</DialogTitle>
      <DialogContent>
        <Typography color='secondary.dark' variant='body2' sx={{ mb: 2 }}>
          この操作は取り消せません。
        </Typography>
        {errorMessage !== '' && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <DialogActions sx={{ mt: 3, p: 0 }}>
          <Grid container alignItems='center' justifyContent='center' spacing={1}>
            <Grid item xs={6}>
              <Button
                onClick={() => handleCloseDialog()}
                color='secondary'
                fullWidth={true}
                label='キャンセル'
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => onClickDeleteButton()}
                color='warning'
                fullWidth={true}
                isLoading={isLoading}
                label='削除する'
                type='submit'
              />
            </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
