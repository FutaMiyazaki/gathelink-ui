import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

type InputLabelProps = Readonly<{
  inputRequirement?: string
  labelTitle: string
  isShowChip?: boolean
  required?: boolean
}>

export const InputLabel: FC<InputLabelProps> = ({
  inputRequirement,
  labelTitle,
  isShowChip = false,
  required = true,
}) => (
  <>
    <Typography component='label' variant='subtitle1' sx={{ fontWeight: 'bold', mr: 2 }}>
      {labelTitle}
    </Typography>
    {isShowChip &&
      (required ? (
        <Chip color='warning' label='必須' size='small' variant='outlined' />
      ) : (
        <Chip label='任意' size='small' variant='outlined' />
      ))}
    <Typography component='p' variant='caption' sx={{ mb: 1 }}>
      {inputRequirement}
    </Typography>
  </>
)
