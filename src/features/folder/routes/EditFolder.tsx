import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { useUpdateFolder } from '@/features/folder/hooks/useUpdateFolder'
import { folderValidationRules } from '@/features/folder/utils/folderValidationRules'

type Inputs = {
  name: string
  description: string
}

type RouterParams = {
  folderId: string
}

export const EditFolder: FC = () => {
  const { control, handleSubmit } = useForm<Inputs>()
  const { folderId } = useParams<RouterParams>()
  const { fetchFolder, folder, isFeatchLoading } = useFetchFolder()
  const { updateFolder, errorMessage, isLoading } = useUpdateFolder()

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const folder = {
      name: data.name,
      description: data.description,
    }
    updateFolder(folder, folderId as string)
  }

  useEffect(() => {
    folderId !== undefined && fetchFolder(folderId)
  }, [folderId])

  if (isFeatchLoading) return <PageLoading />

  return (
    <Container maxWidth='sm'>
      <PageHeading text='フォルダを編集' sx={{ mb: 3 }} />
      {errorMessage !== '' && (
        <Alert icon={false} severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 3 }}>
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <InputLabel labelTitle='フォルダ名' />
          <Controller
            name='name'
            control={control}
            defaultValue={folder?.name}
            rules={folderValidationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='text'
                fullWidth
                autoFocus
                size='small'
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ mb: 4 }}
              />
            )}
          />
          <InputLabel labelTitle='説明' required={false} />
          <Controller
            name='description'
            control={control}
            defaultValue={folder?.description}
            rules={folderValidationRules.description}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='text'
                fullWidth
                multiline
                size='small'
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ mb: 4 }}
              />
            )}
          />
          <Button isLoading={isLoading} label='保存する' type='submit' sx={{ mr: 2 }} />
          <LinkButton
            color='secondary'
            label='キャンセル'
            path={`/folder/${folderId as string}`}
            variant='contained'
          />
        </Box>
      </Box>
    </Container>
  )
}
