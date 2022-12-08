import { zodResolver } from '@hookform/resolvers/zod'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { number, string, z } from 'zod'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { useAddLink } from '@/features/link/hooks/useAddLink'
import { isOpenCreateFolderDialogState } from '@/states/isOpenCreateFolderDialogState'
import { myFoldersState } from '@/states/MyFoldersAtom'
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

export const NewLink: FC = () => {
  const { fetchMyFolders, isFeatching } = useFetchMyFolders()
  const myFolders = useRecoilValue(myFoldersState)
  const setIsOpenCreateFolderDialog = useSetRecoilState(isOpenCreateFolderDialogState)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })
  const { addLink, errorMessage, isLoading } = useAddLink()

  const onSubmit: SubmitHandler<Form> = (data) => {
    const link = {
      url: data.url,
      title: data.title,
      folder_id: data.folderId,
    }
    addLink(link)
  }

  useEffect(() => {
    fetchMyFolders('old')
    myFolders.length !== 0 && setValue('folderId', myFolders[0].id)
  }, [])

  useEffect(() => {
    myFolders.length !== 0 && setValue('folderId', myFolders[0].id)
  }, [myFolders])

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
        <InputLabel labelTitle='URL' />
        <TextField
          fullWidth
          autoFocus
          size='small'
          type='text'
          error={!(errors.url == null)}
          helperText={errors.url != null ? errors.url.message : ''}
          sx={{ mb: 4 }}
          {...register('url')}
        />
        <InputLabel
          labelTitle='タイトル'
          inputRequirement='未入力の場合は、URL のタイトルで作成されます'
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
        {isFeatching ? (
          <CircularProgress size={25} />
        ) : myFolders.length > 0 ? (
          <Select
            fullWidth
            defaultValue={myFolders[0].id}
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
        ) : (
          <Button
            label='新しいフォルダを作成する'
            icon={<CreateNewFolderOutlinedIcon />}
            variant='text'
            onClick={() => setIsOpenCreateFolderDialog(true)}
          />
        )}
        {errors.folderId != null && (
          <FormHelperText error>{errors.folderId.message}</FormHelperText>
        )}
        <Stack direction='row' sx={{ mt: 6 }}>
          <Button
            disabled={myFolders.length === 0}
            isLoading={isLoading}
            label='追加する'
            type='submit'
          />
        </Stack>
      </Box>
    </Container>
  )
}
