import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Image } from 'mui-image'
import { FC } from 'react'

type NoContentsProps = {
  readonly message?: string
}

export const NoContents: FC<NoContentsProps> = ({ message }) => {
  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='center'
      spacing={3}
      sx={{ mt: 3 }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          component='p'
          variant='subtitle1'
          color='secondary.dark'
          sx={{ fontWeight: 'bold' }}
        >
          {message}
        </Typography>
      </Box>
      <Image
        src={`${process.env.PUBLIC_URL}/thinking.png`}
        alt='no-content-image'
        duration={0}
        style={{ pointerEvents: 'none', maxWidth: '400px' }}
      />
    </Stack>
  )
}
