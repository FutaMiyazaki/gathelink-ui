import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { FC } from 'react'

export const PageLoading: FC = () => (
  <Stack direction='row' justifyContent='center'>
    <CircularProgress size={50} sx={{ mt: 10 }} />
  </Stack>
)
