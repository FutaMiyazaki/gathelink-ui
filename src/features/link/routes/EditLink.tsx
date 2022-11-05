import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { Link } from '@/components/Elements/Link'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { Folder } from '@/features/folder/types/Folder'
import { DeleteLinkDialog } from '@/features/link/components/DeleteLinkDialog'
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
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const link = {
      title: data.title,
      url: data.url,
      folder_id: data.folder != null ? data.folder.id : 0,
    }
    updateLink(link, linkId as string)
  }

  const handleOpenDialog = (): void => {
    setOpenDialog(true)
  }

  const handleCloseDialog = (): void => {
    setOpenDialog(false)
  }

  const setDefaultFolder = (myFolders: Folder[]): Folder => {
    let defaultFolder: Folder = { id: 0, name: '', updated_at: '' }
    myFolders.forEach((folder) => {
      if (folder.id === parseInt(folderId as string, 10)) {
        defaultFolder = folder
      }
    })
    return defaultFolder
  }

  useEffect(() => {
    linkId !== undefined && fetchLink(linkId)
  }, [linkId])

  if (isFeatchLoading) <PageLoading />

  return (
    <Container maxWidth='sm'>
      <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ mb: 3 }}>
        <Box sx={{ alignItems: 'center', display: 'flex', mb: 3 }}>
          <Link path={`/folder/${folderId as string}`}>
            <IconButton component='span'>
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <PageHeading text='リンクを編集' sx={{ ml: 1 }} />
        </Box>
        <Button
          color='warning'
          icon={<DeleteForeverOutlinedIcon />}
          label='削除'
          onClick={handleOpenDialog}
          variant='text'
        />
      </Stack>
      {folderId !== undefined && linkId !== undefined && (
        <DeleteLinkDialog
          folderId={folderId}
          linkId={linkId}
          handleCloseDialog={handleCloseDialog}
          open={openDialog}
        />
      )}
      {errorMessage !== '' && (
        <Alert icon={false} severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 3 }}>
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            labelTitle='タイトル'
            inputRequirement='未入力の場合は、URL のタイトルで作成されます'
            required={false}
          />
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
              defaultValue={setDefaultFolder(myFolders)}
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
          <Button isLoading={isUpdating} label='保存する' type='submit' sx={{ mr: 2 }} />
        </Box>
      </Box>
    </Container>
  )
}
