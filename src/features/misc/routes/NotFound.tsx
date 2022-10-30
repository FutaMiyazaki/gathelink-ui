import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { AuthHeader } from '@/features/auth/components/Header'
import NotFoundModule from '@/features/misc/css/NotFound.module.css'

export const NotFound: FC = () => (
  <Box
    sx={{
      display: 'flex',
      minHeight: '100%',
      overflow: 'hidden',
    }}
  >
    <AuthHeader />
    <Container maxWidth='sm' sx={{ my: 8 }}>
      <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={3}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography component='p' variant='h2' sx={{ fontWeight: 900 }}>
            404
          </Typography>
          <Typography component='p' variant='h6'>
            Page Not Found
          </Typography>
        </Box>
        <Typography component='h1' variant='subtitle1'>
          このページはすでに削除されているか、URLが間違っている可能性があります。
        </Typography>
        <img
          src={`${process.env.PUBLIC_URL}/notfound.png`}
          alt='not-found-image'
          className={NotFoundModule['Not-found-image']}
        />
        <LinkButton label='トップページへ戻る' path='/' />
      </Stack>
    </Container>
  </Box>
)
