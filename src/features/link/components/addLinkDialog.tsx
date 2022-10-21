import AddLinkIcon from '@mui/icons-material/AddLink'
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone'
import { Autocomplete } from '@mui/material'
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
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { Folder } from '@/features/folder/types/Folder'
import { useAddLink } from '@/features/link/hooks/useAddLink'
import { linkValidationRules } from '@/features/link/utils/linkValidationRules'
import { useMedia } from '@/hooks/useMedia'
import { myFoldersState } from '@/states/MyFoldersAtom'

type AddLinkDialogProps = {
  handleCloseDialog: () => void
  open: boolean
}

type Inputs = {
  title: string
  url: string
  folder: Folder | null
}

export const AddLinkDialog: FC<AddLinkDialogProps> = ({ handleCloseDialog, open }) => {
  const { control, handleSubmit, reset, setValue } = useForm<Inputs>()
  const { addLink, errorMessage, isLoading, resStatus } = useAddLink()
  const { isMobileScreen } = useMedia()
  const myFolders = useRecoilValue(myFoldersState)

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const link = {
      title: data.title,
      url: data.url,
      folder_id: data.folder != null ? data.folder.id : 0,
    }
    addLink(link)
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
    >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <AddLinkIcon />
        </Avatar>
      </Box>
      <DialogTitle sx={{ textAlign: 'center' }}>リンクを追加</DialogTitle>
      <DialogContent>
        {errorMessage !== '' && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <InputLabel labelTitle='タイトル' />
          <Controller
            name='title'
            control={control}
            defaultValue={''}
            rules={linkValidationRules.title}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='text'
                fullWidth
                size='small'
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ mb: 4 }}
              />
            )}
          />
          <InputLabel labelTitle='URL' />
          <Controller
            name='url'
            control={control}
            defaultValue={''}
            rules={linkValidationRules.url}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='text'
                fullWidth
                size='small'
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ mb: 4 }}
              />
            )}
          />
          <InputLabel inputRequirement='フォルダ名を入力して絞り込む' labelTitle='フォルダを選ぶ' />
          <Controller
            control={control}
            defaultValue={null}
            name='folder'
            rules={linkValidationRules.folder}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                fullWidth
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, value) => {
                  setValue('folder', value)
                }}
                options={myFolders}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    size='small'
                  />
                )}
                renderOption={(props, option) => (
                  <Box component='li' {...props} key={option.id}>
                    <FolderOpenTwoToneIcon sx={{ mr: 1 }} />
                    {option.name}
                  </Box>
                )}
                sx={{ mb: 6 }}
              />
            )}
          />
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
                <Button isLoading={isLoading} fullWidth={true} label='作成する' type='submit' />
              </Grid>
            </Grid>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
