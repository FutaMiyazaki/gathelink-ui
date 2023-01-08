import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { string, z } from 'zod'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { Link } from '@/components/Elements/Link'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { DeleteFolderDialog } from '@/features/folder/components/Dialog/DeleteFolderDialog'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { useUpdateFolder } from '@/features/folder/hooks/useUpdateFolder'
import { RouterParams } from '@/types/RouterParams'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

const schema = z.object({
  name: string()
    .min(1, 'フォルダ名は必須です')
    .max(30, 'フォルダ名は 30 文字以下で入力してください')
    .trim(),
  description: string().max(200, '説明は 200 文字以下で入力してください').trim(),
})

type Form = z.infer<typeof schema>

export const EditFolder: FC = () => {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })
  const { folderId } = useParams<RouterParams>()
  const { fetchFolder, folder, isFetching } = useFetchFolder()
  const { updateFolder, errorMessage, isLoading } = useUpdateFolder()

  const onSubmit: SubmitHandler<Form> = (data) => {
    const folder = {
      name: data.name,
      description: data.description,
    }
    updateFolder(folder, folderId as string)
  }

  useEffect(() => {
    folderId !== undefined && fetchFolder(folderId)
  }, [folderId])

  useEffect(() => {
    folder !== undefined && setValue('name', folder.name)
    folder?.description !== undefined && folder?.description !== null
      ? setValue('description', folder.description)
      : setValue('description', '')
  }, [folder])

  if (isFetching) return <PageLoading />

  return (
    <Container maxWidth='md'>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Link path={`/folder/${folderId as string}`}>
          <IconButton component='span'>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant='h1' sx={{ ml: 1 }}>
          フォルダを編集
        </Typography>
        <Button
          color='warning'
          icon={<DeleteForeverOutlinedIcon />}
          label='削除'
          onClick={() => setIsOpenConfirmDialog(true)}
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
        <InputLabel labelTitle='フォルダ名' inputRequirement='最大 30 文字' isShowChip={true} />
        <TextField
          fullWidth
          size='small'
          type='text'
          error={!(errors.name == null)}
          helperText={errors.name != null ? errors.name.message : ''}
          sx={{ mb: 4 }}
          {...register('name')}
        />
        <InputLabel labelTitle='説明' isShowChip={true} required={false} />
        <TextField
          fullWidth
          size='small'
          type='text'
          error={!(errors.description == null)}
          helperText={errors.description != null ? errors.description.message : ''}
          sx={{ mb: 4 }}
          {...register('description')}
        />
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          label='保存する'
          size='large'
          type='submit'
          sx={{ mr: 2 }}
        />
      </Box>
      <DeleteFolderDialog
        folderId={folderId as string}
        isOpenDialog={isOpenConfirmDialog}
        setIsOpenDialog={setIsOpenConfirmDialog}
      />
    </Container>
  )
}
