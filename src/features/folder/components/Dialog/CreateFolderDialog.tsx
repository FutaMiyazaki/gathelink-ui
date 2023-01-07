import { zodResolver } from '@hookform/resolvers/zod'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { string, z } from 'zod'

import { Alert } from '@/components/Elements/Alert'
import { Button } from '@/components/Elements/Button'
import { Dialog } from '@/components/Elements/Dialog'
import { DialogActions } from '@/components/Elements/Dialog/DialogActions'
import { usePostFolder } from '@/features/folder/hooks/usePostFolder'

type CreateFolderDialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
}

const schema = z.object({
  name: string()
    .min(1, 'フォルダ名は必須です')
    .max(30, 'フォルダ名は 30 文字以下で入力してください')
    .trim(),
})

type Form = z.infer<typeof schema>

export const CreateFolderDialog: FC<CreateFolderDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })
  const { postFolder, errorMessage, isPosting, resStatus } = usePostFolder()

  const onSubmit: SubmitHandler<Form> = (data) => {
    const folder = {
      name: data.name,
      color: '#26a69a',
    }
    postFolder(folder)
  }

  useEffect(() => {
    if (resStatus === 201) {
      reset()
      setIsOpenDialog(false)
    }
  }, [resStatus, reset])

  return (
    <Dialog
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      title='フォルダを作成'
      titleIcon={
        <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
          <CreateNewFolderIcon />
        </Avatar>
      }
    >
      <DialogContent>
        <Alert message={errorMessage} />
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Typography component='p' sx={{ mb: 1 }}>
            フォルダ名を30文字以下で入力してください。
          </Typography>
          <TextField
            fullWidth
            size='small'
            type='text'
            placeholder='フォルダ名'
            error={!(errors.name == null)}
            helperText={errors.name != null ? errors.name.message : ''}
            {...register('name')}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size='large'
          color='secondary'
          label='キャンセル'
          onClick={() => setIsOpenDialog(false)}
        />
        <Button
          size='large'
          isLoading={isPosting}
          disabled={isPosting}
          label='作成する'
          type='submit'
        />
      </DialogActions>
    </Dialog>
  )
}
