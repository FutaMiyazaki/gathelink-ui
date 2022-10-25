import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/Elements/Button'
import { useCreateFolder } from '@/features/folder/hooks/useCreateFolder'
import { folderValidationRules } from '@/features/folder/utils/folderValidationRules'
import { useMedia } from '@/hooks/useMedia'

type CreateFolderDialogProps = {
  handleCloseDialog: () => void
  open: boolean
}

type Inputs = {
  name: string
}

export const CreateFolderDialog: FC<CreateFolderDialogProps> = ({ handleCloseDialog, open }) => {
  const { control, handleSubmit, reset } = useForm<Inputs>()
  const { createFolder, errorMessage, isLoading, resStatus } = useCreateFolder()
  const { isMobileScreen } = useMedia()

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const folder = {
      name: data.name,
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
      fullScreen={isMobileScreen}
      fullWidth
      maxWidth='xs'
      onClose={() => handleCloseDialog()}
      open={open}
      sx={{ textAlign: 'center' }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <CreateNewFolderIcon />
        </Avatar>
      </Box>
      <DialogTitle>新しいフォルダを作成</DialogTitle>
      <DialogContent>
        {errorMessage !== '' && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            defaultValue={''}
            rules={folderValidationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='text'
                fullWidth
                autoFocus
                placeholder='フォルダ名を入力'
                size='small'
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <DialogActions sx={{ mt: 3, p: 0 }}>
            <Grid container alignItems='center' justifyContent='center' spacing={1}>
              <Grid item xs={6}>
                <Button
                  color='secondary'
                  fullWidth={true}
                  label='キャンセル'
                  onClick={() => handleCloseDialog()}
                />
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth={true} isLoading={isLoading} label='作成する' type='submit' />
              </Grid>
            </Grid>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
