import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Divider, Stack } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { Link } from '@/components/Elements/Link'

type AuthLayoutProps = {
  children: ReactNode
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const location = useLocation()

  return (
    <>
      <Container component='main' maxWidth='xs' sx={{ my: 10 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
            {location.pathname === '/signup' && '新規登録'}
            {location.pathname === '/login' && 'ログイン'}
          </Typography>
        </Box>
        {children}
        <Stack direction='column' justifyContent='center' sx={{ textAlign: 'center' }}>
          <LinkButton
            color='secondary'
            fullWidth={true}
            label='パスワードを忘れた場合はこちら'
            path='/reset_password'
            variant='contained'
          />
          <Divider sx={{ my: 4 }} />
          <Link path={location.pathname === '/signup' ? '/login' : '/signup'} underline='always'>
            {location.pathname === '/signup' ? 'ログイン' : '新規登録'}はこちら
          </Link>
        </Stack>
      </Container>
    </>
  )
}
