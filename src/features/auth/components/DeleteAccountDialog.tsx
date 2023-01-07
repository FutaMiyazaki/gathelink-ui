import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Avatar from '@mui/material/Avatar'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { FC, Dispatch, SetStateAction } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { Dialog } from '@/components/Elements/Dialog'
import { DialogActions } from '@/components/Elements/Dialog/DialogActions'
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
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      title='アカウントを削除'
      titleIcon={
        <Avatar sx={{ mr: 1, bgcolor: 'warning.main' }}>
          <DeleteForeverIcon />
        </Avatar>
      }
      maxWidth='xs'
    >
      <DialogContent>
        <Typography variant='body2' sx={{ mb: 2, fontWeight: 300 }}>
          この操作は取り消せません。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setIsOpenDialog(false)}
          color='secondary'
          label='キャンセル'
          size='large'
        />
        <Button
          onClick={() => onClickDeleteButton()}
          color='warning'
          isLoading={isDeleting}
          disabled={currentUser.id === 1 || isDeleting}
          label='削除する'
          size='large'
          type='submit'
        />
      </DialogActions>
    </Dialog>
  )
}
