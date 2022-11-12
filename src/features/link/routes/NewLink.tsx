import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { Folder } from '@/features/folder/types/Folder'
import { useAddLink } from '@/features/link/hooks/useAddLink'
import { linkValidationRules } from '@/features/link/utils/linkValidationRules'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

type Inputs = {
  title: string
  url: string
  folder: Folder | null
}

export const NewLink: FC = () => {
  const { fetchMyFolders } = useFetchMyFolders()
  const myFolders = useRecoilValue(myFoldersState)
  const { control, handleSubmit, setValue } = useForm<Inputs>()
  const { addLink, errorMessage, isLoading } = useAddLink()

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const link = {
      title: data.title,
      url: data.url,
      folder_id: data.folder != null ? data.folder.id : 0,
    }
    addLink(link)
  }

  useEffect(() => {
    fetchMyFolders('old')
  }, [])

  return (
    <Container maxWidth='md'>
      {errorMessage !== '' && (
        <Alert icon={false} severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Typography variant='h1' sx={{ mb: 3 }}>
        リンクを追加
      </Typography>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ ...whiteBackgroundProps }}
      >
        <InputLabel
          labelTitle='タイトル'
          inputRequirement='未入力の場合は、URL のタイトルで作成されます'
          required={false}
        />
        <Controller
          control={control}
          defaultValue={''}
          name='title'
          rules={linkValidationRules.title}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              autoFocus
              error={fieldState.invalid}
              fullWidth
              helperText={fieldState.error?.message}
              size='small'
              type='text'
              sx={{ mb: 4 }}
            />
          )}
        />
        <InputLabel labelTitle='URL' />
        <Controller
          control={control}
          defaultValue={''}
          name='url'
          rules={linkValidationRules.url}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={fieldState.invalid}
              fullWidth
              helperText={fieldState.error?.message}
              size='small'
              type='text'
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
        <Stack direction='row' alignItems='flex-start'>
          <Button isLoading={isLoading} label='追加する' type='submit' />
        </Stack>
      </Box>
    </Container>
  )
}
