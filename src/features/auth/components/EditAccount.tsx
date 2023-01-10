import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { string, z } from 'zod'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { useFetchUser } from '@/features/auth/hooks/useFetchUser'
import { useUpdateUser } from '@/features/auth/hooks/useUpdateUser'
import { currentUserState } from '@/states/CurrentUserAtom'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

const schema = z.object({
  name: string().min(1, '名前は必須です').max(20, '名前は 20 文字以下で入力してください').trim(),
  email: string().min(1, 'メールアドレスは必須です').email().trim(),
})

type Form = z.infer<typeof schema>

export const EditAccount: FC = () => {
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
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ ...whiteBackgroundProps, mb: 3 }}
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
  )
}
