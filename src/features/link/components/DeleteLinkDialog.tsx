import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Avatar from '@mui/material/Avatar'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { useEffect, FC, SetStateAction, Dispatch } from 'react'

import { Alert } from '@/components/Elements/Alert'
import { Button } from '@/components/Elements/Button'
import { Dialog } from '@/components/Elements/Dialog'
import { DialogActions } from '@/components/Elements/Dialog/DialogActions'
import { useDeleteLink } from '@/features/link/hooks/useDeleteLink'

type DeleteLinkDialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  folderId: string
  linkId: string
}

export const DeleteLinkDialog: FC<DeleteLinkDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
  folderId,
  linkId,
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
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      title='リンクを削除'
      titleIcon={
        <Avatar sx={{ mr: 1, bgcolor: 'warning.main' }}>
          <DeleteForeverIcon />
        </Avatar>
      }
      maxWidth='xs'
    >
      <DialogContent>
        <Alert message={errorMessage} />
        <Typography variant='body2' sx={{ fontWeight: 300 }}>
          リンクを削除すると、後から復元することはできません。
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
          disabled={isDeleting}
          label='削除する'
          size='large'
          type='submit'
        />
      </DialogActions>
    </Dialog>
  )
}
