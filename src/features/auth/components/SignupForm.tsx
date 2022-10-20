import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/features/auth/components/InputLabel'
import { useSignup } from '@/features/auth/hooks/useSignup'
import { authValidationRules } from '@/features/auth/utils/authValidationRules'

type Inputs = {
  email: string
  password: string
  name: string
}

export const SignupForm: FC = () => {
  const { isLoading, errorMessage, signup } = useSignup()
  const { control, handleSubmit } = useForm<Inputs>()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const params = {
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
      name: data.name,
    }
    signup(params)
  }

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
  }

  return (
    <Box>
      {errorMessage?.length !== 0 && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, mb: 4 }}>
        <InputLabel
          inputRequirement='半角英数字でご利用中のメールアドレスを入力してください'
          labelTitle='メールアドレス'
        />
        <Controller
          name='email'
          control={control}
          defaultValue={''}
          rules={authValidationRules.email}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type='text'
              fullWidth
              autoComplete='email'
              autoFocus
              size='small'
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              sx={{ mb: 4 }}
            />
          )}
        />
        <InputLabel
          inputRequirement='アルファベットと数字を組み合わせて8文字以上で入力してください'
          labelTitle='パスワード'
        />
        <Controller
          name='password'
          control={control}
          defaultValue={''}
          rules={authValidationRules.password}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              hidden
              required
              fullWidth
              autoComplete='current-password'
              size='small'
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 4 }}
            />
          )}
        />
        <InputLabel
          inputRequirement='20文字以下で入力してください'
          labelTitle='名前 (ニックネーム)'
        />
        <Controller
          name='name'
          control={control}
          defaultValue={''}
          rules={authValidationRules.name}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type='text'
              fullWidth
              size='small'
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              sx={{ mb: 6 }}
            />
          )}
        />
        <Button
          disabled={isLoading}
          fullWidth={true}
          isLoading={isLoading}
          label='新規登録'
          type='submit'
        />
      </Box>
    </Box>
  )
}
