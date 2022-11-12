import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { Link } from '@/components/Elements/Link'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { DeleteFolderDialog } from '@/features/folder/components/Dialog/DeleteFolderDialog'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { useUpdateFolder } from '@/features/folder/hooks/useUpdateFolder'
import { folderValidationRules } from '@/features/folder/utils/folderValidationRules'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

type Inputs = {
  name: string
  description: string
}

type RouterParams = {
  folderId: string
}

export const EditFolder: FC = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
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
    <Container maxWidth='md'>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Link path={`/folder/${folderId as string}`}>
          <IconButton component='span'>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <PageHeading text='フォルダを編集' sx={{ ml: 1 }} />
        <Button
          color='warning'
          icon={<DeleteForeverOutlinedIcon />}
          label='削除'
          onClick={() => setOpenConfirmDialog(true)}
          variant='text'
          sx={{ ml: 'auto' }}
        />
      </Box>
      {errorMessage !== '' && (
        <Alert icon={false} severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ ...whiteBackgroundProps }}
      >
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
      </Box>
      <DeleteFolderDialog
        folderId={folderId as string}
        handleCloseDialog={() => setOpenConfirmDialog(false)}
        open={openConfirmDialog}
      />
    </Container>
  )
}
