import { zodResolver } from '@hookform/resolvers/zod'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { string, z } from 'zod'

import { Button } from '@/components/Elements/Button'
import { useCreateFolder } from '@/features/folder/hooks/useCreateFolder'

type CreateFolderDialogProps = {
  handleCloseDialog: () => void
  open: boolean
}

const schema = z.object({
  name: string()
    .min(1, 'フォルダ名は必須です')
    .max(30, 'フォルダ名は 30 文字以下で入力してください')
    .trim(),
})

type Form = z.infer<typeof schema>

export const CreateFolderDialog: FC<CreateFolderDialogProps> = ({ handleCloseDialog, open }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })
  const { createFolder, errorMessage, isLoading, resStatus } = useCreateFolder()

  const onSubmit: SubmitHandler<Form> = (data) => {
    const folder = {
      name: data.name,
      color: '#26a69a'
    }
    createFolder(folder)
  }

  useEffect(() => {
    if (resStatus === 201) {
      reset()
      handleCloseDialog()
    }
  }, [resStatus, reset])

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={() => handleCloseDialog()}
      open={open}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <CreateNewFolderIcon />
        </Avatar>
      </Box>
      <DialogTitle sx={{ textAlign: 'center' }}>新しいフォルダを作成</DialogTitle>
      <DialogContent>
        {errorMessage !== '' && (
          <Alert icon={false} severity='error' sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Typography component='p' variant='caption' sx={{ mb: 1 }}>
            30文字以下で入力してください
          </Typography>
          <TextField
            fullWidth
            autoFocus
            placeholder='フォルダ名を入力'
            size='small'
            type='text'
            error={!(errors.name == null)}
            helperText={errors.name != null ? errors.name.message : ''}
            sx={{ mb: 3 }}
            {...register('name')}
          />
          <DialogActions sx={{ mt: 3, p: 0 }}>
            <Stack direction='row' justifyContent='flex-end' spacing={2}>
              <Button color='secondary' label='キャンセル' onClick={() => handleCloseDialog()} />
              <Button isLoading={isLoading} label='作成する' type='submit' />
            </Stack>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
