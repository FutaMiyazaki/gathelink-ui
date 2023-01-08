import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Avatar from '@mui/material/Avatar'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { useEffect, FC, Dispatch, SetStateAction } from 'react'

import { Alert } from '@/components/Elements/Alert'
import { Button } from '@/components/Elements/Button'
import { Dialog } from '@/components/Elements/Dialog'
import { DialogActions } from '@/components/Elements/Dialog/DialogActions'
import { useDeleteFolder } from '@/features/folder/hooks/useDeleteFolder'

type DeleteFolderDialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  folderId: string
}

export const DeleteFolderDialog: FC<DeleteFolderDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
  folderId,
}) => {
  const { deleteFolder, errorMessage, isDeleting, resStatus } = useDeleteFolder()

  const onClickDeleteButton = (): void => {
    deleteFolder(folderId)
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
      title='フォルダを削除'
      titleIcon={
        <Avatar sx={{ mr: 1, bgcolor: 'warning.main' }}>
          <DeleteForeverIcon />
        </Avatar>
      }
    >
      <DialogContent>
        <Alert message={errorMessage} />
        <Typography variant='body2' sx={{ fontWeight: 300 }}>
          フォルダを削除すると、後から復元することはできません。
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
