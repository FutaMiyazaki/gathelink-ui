import { SxProps } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

type PageHeadingProps = {
  text?: string
  sx?: SxProps
}

export const PageHeading: FC<PageHeadingProps> = ({ text, sx }) => (
  <Typography component='h1' variant='h6' sx={{ fontWeight: 'bold', ...sx }}>
    {text}
  </Typography>
)
