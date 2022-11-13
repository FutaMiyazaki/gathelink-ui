import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
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
          <Typography variant='h1' sx={{ mb: 3 }}>
            {location.pathname === '/signup' ? '新規登録' : 'ログイン'}
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
