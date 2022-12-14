import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Image } from 'mui-image'
import { FC } from 'react'

import { LinkButton } from '@/components/Elements/Button/LinkButton'

export const NotFound: FC = () => (
  <Container maxWidth='sm'>
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
      <Image
        src={`${process.env.PUBLIC_URL}/notfound.png`}
        alt='not-found-image'
        duration={0}
        style={{ pointerEvents: 'none', maxWidth: '100%' }}
      />
      <LinkButton label='トップページへ戻る' path='/' size='large' variant='text' />
    </Stack>
  </Container>
)
