import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { useUpdateFolder } from '@/features/folder/hooks/useUpdateFolder'
import { folderValidationRules } from '@/features/folder/utils/folderValidationRules'

type Inputs = {
  name: string
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
    }
    updateFolder(folder, folderId as string)
  }

  useEffect(() => {
    folderId !== undefined && fetchFolder(folderId)
  }, [folderId])

  if (isFeatchLoading) return <PageLoading />

  return (
    <Container maxWidth='sm'>
      <Typography component='h1' variant='h6' sx={{ fontWeight: 'bold', mb: 3 }}>
        フォルダの編集
      </Typography>
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
                variant='standard'
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ mb: 4, px: 2 }}
              />
            )}
          />
          <Stack direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
            <InputLabel labelTitle='非公開にする' />
            <Switch checked={true} />
          </Stack>
          <InputLabel labelTitle='説明' />
          <TextField fullWidth multiline size='small' variant='standard' sx={{ mb: 4, px: 2 }} />
          <Grid container alignItems='center' justifyContent='center' spacing={1}>
            <Grid item xs={6}>
              <LinkButton
                color='secondary'
                fullWidth={true}
                label='キャンセル'
                path={`/folder/${folderId as string}`}
                variant='contained'
              />
            </Grid>
            <Grid item xs={6}>
              <Button isLoading={isLoading} fullWidth={true} label='保存する' type='submit' />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
