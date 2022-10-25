import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { LeadAuthorization } from '@/components/Layouts/LeadAuthorization'
import { useMedia } from '@/hooks/useMedia'

export const Home: FC = () => {
  const { isMobileScreen } = useMedia()

  return (
    <Container maxWidth='sm' sx={{ my: 4 }}>
      <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
        トップページです
      </Typography>
      {isMobileScreen && <LeadAuthorization />}
    </Container>
  )
}
