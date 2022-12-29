import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { number, string, z } from 'zod'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { Link } from '@/components/Elements/Link'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { DeleteLinkDialog } from '@/features/link/components/DeleteLinkDialog'
import { useFetchLink } from '@/features/link/hooks/useFetchLink'
import { useUpdateLink } from '@/features/link/hooks/useUpdateLink'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { RouterParams } from '@/types/RouterParams'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

const schema = z.object({
  url: string()
    .min(1, 'URL は必須です')
    .max(1000, 'URL は 1000 文字以下で入力してください')
    .url('URL の形式に誤りがあります')
    .trim(),
  title: string().max(100, 'タイトルは 100 文字以下で入力してください').trim(),
  folderId: number().positive('フォルダは必須です'),
})

type Form = z.infer<typeof schema>

export const EditLink: FC = () => {
  const { folderId, linkId } = useParams<RouterParams>()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })
  const { fetchMyFolders, isFetching: isFetchingMyFolders } = useFetchMyFolders()
  const myFolders = useRecoilValue(myFoldersState)
  const { fetchLink, isFetching: isFetchingLink, link } = useFetchLink()
  const { updateLink, errorMessage, isUpdating } = useUpdateLink()
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

  const onSubmit: SubmitHandler<Form> = (data) => {
    const link = {
      title: data.title,
      url: data.url,
      folder_id: data.folderId,
    }
    updateLink(link, linkId as string)
  }

  useEffect(() => {
    linkId !== undefined && fetchLink(linkId)
  }, [linkId])

  useEffect(() => {
    fetchMyFolders('old')
  }, [])

  useEffect(() => {
    if (link !== undefined) {
      setValue('url', link.url)
      setValue('title', link?.title)
      setValue('folderId', link.folder_id)
    }
  }, [myFolders])

  if (isFetchingLink || isFetchingMyFolders) <PageLoading />

  return (
    <Container maxWidth='md'>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Link path={`/folder/${folderId as string}`}>
          <IconButton component='span'>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant='h1'>リンクを編集</Typography>
        <Button
          color='warning'
          icon={<DeleteForeverOutlinedIcon />}
          label='削除'
          onClick={() => setIsOpenDialog(true)}
          variant='text'
          sx={{ ml: 'auto' }}
        />
      </Box>
      {folderId !== undefined && linkId !== undefined && (
        <DeleteLinkDialog
          folderId={folderId}
          linkId={linkId}
          setIsOpenDialog={setIsOpenDialog}
          isOpenDialog={isOpenDialog}
        />
      )}
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
        <InputLabel labelTitle='URL' />
        <TextField
          fullWidth
          size='small'
          type='text'
          error={!(errors.url == null)}
          helperText={errors.url != null ? errors.url.message : ''}
          sx={{ mb: 4 }}
          {...register('url')}
        />
        <InputLabel
          labelTitle='タイトル'
          inputRequirement='未入力の場合は、URL のタイトルで保存されます'
          required={false}
        />
        <TextField
          fullWidth
          size='small'
          type='text'
          error={!(errors.title == null)}
          helperText={errors.title != null ? errors.title.message : ''}
          sx={{ mb: 4 }}
          {...register('title')}
        />
        <InputLabel labelTitle='フォルダを選ぶ' />
        {link != null && (
          <Select
            fullWidth
            defaultValue={link.folder_id}
            size='small'
            error={!(errors.folderId == null)}
            {...register('folderId')}
          >
            {myFolders.map((folder) => {
              return (
                <MenuItem key={folder.id} value={folder.id}>
                  {folder.name}
                </MenuItem>
              )
            })}
          </Select>
        )}
        {errors.folderId != null && (
          <FormHelperText error>{errors.folderId.message}</FormHelperText>
        )}
        <Stack direction='row' sx={{ mt: 4 }}>
          <Button
            isLoading={isUpdating}
            disabled={isUpdating}
            label='保存する'
            size='large'
            type='submit'
          />
        </Stack>
      </Box>
    </Container>
  )
}
