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
import { string, z } from 'zod'

import { Button } from '@/components/Elements/Button'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { useLogin } from '@/features/auth/hooks/useLogin'

const schema = z.object({
  email: string()
    .min(1, 'メールアドレスは必須です')
    .email('メールアドレスの形式が正しくありません')
    .trim(),
  password: string()
    .min(1, 'パスワードは必須です')
    .min(8, 'パスワードは 8 文字以上で入力してください')
    .max(32, 'パスワードは 32 文字以下で入力してください')
    .trim(),
})

type Form = z.infer<typeof schema>

export const LoginForm: FC = () => {
  const { isLoading, errorMessage, login } = useLogin()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit: SubmitHandler<Form> = (data) => {
    const params = {
      email: data.email,
      password: data.password,
    }
    login(params)
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
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
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
