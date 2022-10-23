import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { Folder } from '@/features/folder/types/Folder'
import { useFetchLink } from '@/features/link/hooks/useFetchLink'
import { useUpdateLink } from '@/features/link/hooks/useUpdateLink'
import { linkValidationRules } from '@/features/link/utils/linkValidationRules'

type Inputs = {
  title: string
  url: string
  folder: Folder | null
}

type RouterParams = {
  folderId: string
  linkId: string
}

export const EditLink: FC = () => {
  const { control, handleSubmit, setValue } = useForm<Inputs>()
  const { folderId, linkId } = useParams<RouterParams>()
  const { fetchLink, isFeatchLoading, link, myFolders } = useFetchLink()
  const { updateLink, errorMessage, isUpdating } = useUpdateLink()

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const link = {
      title: data.title,
      url: data.url,
      folder_id: data.folder != null ? data.folder.id : 0,
    }
    updateLink(link, linkId as string)
  }

  useEffect(() => {
    linkId !== undefined && fetchLink(linkId)
  }, [linkId])

  if (isFeatchLoading) {
    return <PageLoading />
  }

  return (
    <Container maxWidth='sm' sx={{ mt: 4 }}>
      <Typography component='h1' variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
        リンクの編集
      </Typography>
      {errorMessage?.length !== 0 && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 2, mb: 3 }}>
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <InputLabel labelTitle='タイトル' />
          <Controller
            name='title'
            control={control}
            defaultValue={link?.title}
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
            defaultValue={link?.url}
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
          {myFolders !== undefined && (
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
          )}
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
              <Button isLoading={isUpdating} fullWidth={true} label='保存する' type='submit' />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}