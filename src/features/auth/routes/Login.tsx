import { zodResolver } from '@hookform/resolvers/zod'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { LoginForm, loginFormSchema } from '@/features/auth/types/LoginForm'
import { isAuthenticatedState } from '@/states/AuthAtom'

export const Login: FC = () => {
  const { isLoading, errorMessage, login } = useLogin()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  })
  const [showPassword, setShowPassword] = useState(false)
  const isAuthenticated = useRecoilValue(isAuthenticatedState)

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    const params = {
      email: data.email,
      password: data.password,
    }
    login(params)
  }

  if (isAuthenticated) return <Navigate to='/myfolders?sort=created_asc' replace={false} />

  return (
    <Box>
      {errorMessage?.length !== 0 && (
        <Alert icon={false} severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, mb: 4 }}>
        <InputLabel
          inputRequirement='半角英数字でご利用中のメールアドレスを入力してください'
          labelTitle='メールアドレス'
        />
        <TextField
          fullWidth
          required
          autoComplete='email'
          size='small'
          type='email'
          error={!(errors.email == null)}
          helperText={errors.email != null ? errors.email.message : ''}
          sx={{ mb: 3 }}
          {...register('email')}
        />
        <InputLabel labelTitle='パスワード' />
        <TextField
          fullWidth
          hidden
          required
          autoComplete='current-password'
          size='small'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!(errors.password == null)}
          helperText={errors.password != null ? errors.password.message : ''}
          sx={{ mb: 6 }}
          {...register('password')}
        />
        <Button
          disabled={isLoading}
          fullWidth={true}
          isLoading={isLoading}
          label='ログイン'
          size='large'
          type='submit'
        />
      </Box>
    </Box>
  )
}
