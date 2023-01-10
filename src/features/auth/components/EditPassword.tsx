import { zodResolver } from '@hookform/resolvers/zod'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { string, z } from 'zod'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { useUpdateUser } from '@/features/auth/hooks/useUpdateUser'
import { currentUserState } from '@/states/CurrentUserAtom'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

const schema = z.object({
  password: string()
    .min(8, 'パスワードは 8 文字以上で入力してください')
    .max(32, 'パスワードは 32 文字以下で入力してください')
    .trim(),
})

type Form = z.infer<typeof schema>

export const EditPassword: FC = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const { isUpdating, updateUser } = useUpdateUser()
  const currentUser = useRecoilValue(currentUserState)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Form> = (data) => {
    const user = {
      password: data.password,
    }
    updateUser(user, 'パスワード')
  }

  return (
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ ...whiteBackgroundProps, mb: 6 }}
    >
      <InputLabel labelTitle='パスワード' required={false} />
      <TextField
        fullWidth
        hidden
        required
        autoComplete='current-password'
        size='small'
        type={isShowPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setIsShowPassword(!isShowPassword)} edge='end'>
                {isShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!(errors.password == null)}
        helperText={errors.password != null ? errors.password.message : ''}
        sx={{ mb: 3 }}
        {...register('password')}
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
