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
import { useEffect, FC, SetStateAction, Dispatch } from 'react'

import { Button } from '@/components/Elements/Button'
import { useDeleteLink } from '@/features/link/hooks/useDeleteLink'

type DeleteLinkDialogProps = {
  folderId: string
  linkId: string
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}

export const DeleteLinkDialog: FC<DeleteLinkDialogProps> = ({
  folderId,
  linkId,
  setIsOpenDialog,
  isOpen,
}) => {
  const { deleteLink, errorMessage, isDeleting, resStatus } = useDeleteLink()

  const onClickDeleteButton = (): void => {
    deleteLink(folderId, linkId)
  }

  useEffect(() => {
    if (resStatus === 201) {
      setIsOpenDialog(false)
    }
  }, [resStatus])

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      onClose={() => setIsOpenDialog(false)}
      open={isOpen}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
      sx={{ textAlign: 'center' }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Avatar sx={{ bgcolor: 'warning.main' }}>
          <DeleteForeverIcon />
        </Avatar>
      </Box>
      <DialogTitle>リンクを削除しますか？</DialogTitle>
      <DialogContent>
        <Typography color='secondary.dark' variant='body2' sx={{ mb: 2 }}>
          この操作は取り消せません。
        </Typography>
        {errorMessage !== '' && (
          <Alert icon={false} severity='error' sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <DialogActions sx={{ mt: 3, p: 0 }}>
          <Grid container alignItems='center' justifyContent='center' spacing={1}>
            <Grid item xs={6}>
              <Button
                onClick={() => setIsOpenDialog(false)}
                color='secondary'
                fullWidth={true}
                label='キャンセル'
                size='large'
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => onClickDeleteButton()}
                color='warning'
                fullWidth={true}
                isLoading={isDeleting}
                disabled={isDeleting}
                label='削除する'
                size='large'
                type='submit'
              />
            </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
