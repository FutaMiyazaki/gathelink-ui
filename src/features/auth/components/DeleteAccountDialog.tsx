import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FC, Dispatch, SetStateAction } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { useDeleteUser } from '@/features/auth/hooks/useDeleteUser'
import { currentUserState } from '@/states/CurrentUserAtom'

type DeleteAccountDialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
}

export const DeleteAccountDialog: FC<DeleteAccountDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
}) => {
  const { isDeleting, deleteUser } = useDeleteUser()
  const currentUser = useRecoilValue(currentUserState)

  const onClickDeleteButton = (): void => {
    deleteUser()
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      onClose={() => setIsOpenDialog(false)}
      open={isOpenDialog}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
      sx={{ textAlign: 'center' }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Avatar sx={{ bgcolor: 'warning.main' }}>
          <DeleteForeverRoundedIcon />
        </Avatar>
      </Box>
      <DialogTitle>本当にアカウントを削除しますか？</DialogTitle>
      <DialogContent>
        <Typography color='secondary.dark' variant='body2' sx={{ mb: 2 }}>
          この操作は取り消せません。
        </Typography>
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
                disabled={currentUser.id === 1 || isDeleting}
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
