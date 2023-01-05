import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { string, z } from 'zod'

import { Alert } from '@/components/Elements/Alert'
import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { DeleteAccountDialog } from '@/features/auth/components/DeleteAccountDialog'
import { EditPassword } from '@/features/auth/components/EditPassword'
import { useFetchUser } from '@/features/auth/hooks/useFetchUser'
import { useUpdateUser } from '@/features/auth/hooks/useUpdateUser'
import { currentUserState } from '@/states/CurrentUserAtom'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

const schema = z.object({
  name: string().min(1, '名前は必須です').max(20, '名前は 20 文字以下で入力してください').trim(),
  email: string().min(1, 'メールアドレスは必須です').email().trim(),
})

type Form = z.infer<typeof schema>

export const Account: FC = () => {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)
  const navigate = useNavigate()
  const { fetchUser, isFetching, currentUserData } = useFetchUser()
  const { isUpdating, updateUser } = useUpdateUser()
  const currentUser = useRecoilValue(currentUserState)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Form> = (data) => {
    const user = {
      name: data.name,
      email: data.email,
    }
    updateUser(user, 'ユーザ情報')
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (currentUserData !== undefined) {
      setValue('name', currentUserData.name)
      setValue('email', currentUserData.email)
    }
  }, [currentUserData])

  if (isFetching) return <PageLoading />

  return (
    <Container maxWidth='md'>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h1'>アカウント設定</Typography>
      </Box>
      {currentUser.id === 1 && (
        <Alert message='ゲストユーザーはアカウント情報の変更・削除ができません' sx={{ mb: 3 }} />
      )}
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ ...whiteBackgroundProps }}
      >
        <InputLabel labelTitle='ユーザー名' required={false} />
        <TextField
          fullWidth
          size='small'
          type='text'
          error={!(errors.name == null)}
          helperText={errors.name != null ? errors.name.message : ''}
          sx={{ mb: 4 }}
          {...register('name')}
        />
        <InputLabel labelTitle='メールアドレス' required={false} />
        <TextField
          fullWidth
          size='small'
          type='text'
          error={!(errors.email == null)}
          helperText={errors.email != null ? errors.email.message : ''}
          sx={{ mb: 4 }}
          {...register('email')}
        />
        <Stack direction='row'>
          <Button
            disabled={currentUser.id === 1 || isUpdating}
            isLoading={isUpdating}
            label='更新する'
            size='large'
            type='submit'
          />
        </Stack>
      </Box>
      <EditPassword />
      <Stack direction='row' justifyContent='center'>
        <Button
          color='warning'
          icon={<DeleteForeverOutlinedIcon />}
          label='アカウントを削除する'
          onClick={() => setIsOpenConfirmDialog(true)}
          variant='text'
        />
        <DeleteAccountDialog
          isOpenDialog={isOpenConfirmDialog}
          setIsOpenDialog={setIsOpenConfirmDialog}
          currentUserId={currentUser.id}
        />
      </Stack>
    </Container>
  )
}
