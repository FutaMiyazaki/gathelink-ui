import Typography from '@mui/material/Typography'
import { FC } from 'react'

type PageHeadingProps = {
  text?: string
}

export const PageHeading: FC<PageHeadingProps> = ({ text }) => (
  <Typography component='h1' variant='h6' sx={{ fontWeight: 'bold' }}>
    {text}
  </Typography>
)
