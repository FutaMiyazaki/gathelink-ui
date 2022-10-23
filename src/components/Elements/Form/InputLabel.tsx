import { Typography } from '@mui/material'
import { FC } from 'react'

type InputLabelProps = {
  inputRequirement?: string
  labelTitle: string
}

export const InputLabel: FC<InputLabelProps> = ({ inputRequirement, labelTitle }) => (
  <>
    <Typography component='label' variant='subtitle1' sx={{ fontWeight: 'bold' }}>
      {labelTitle}
    </Typography>
    <Typography component='p' variant='caption' sx={{ mb: 1 }}>
      {inputRequirement}
    </Typography>
  </>
)
