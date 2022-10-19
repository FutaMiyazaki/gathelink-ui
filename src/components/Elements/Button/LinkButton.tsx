import Button from '@mui/material/Button'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'

type LinkButtonProps = {
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  fullWidth?: boolean
  label: string
  path: string
  variant?: 'text' | 'outlined' | 'contained'
}

export const LinkButton: FC<LinkButtonProps> = ({
  color = 'primary',
  fullWidth = false,
  label,
  path,
  variant = 'contained',
}) => {
  return (
    <Link path={path}>
      <Button
        color={color}
        component='span'
        disableElevation
        fullWidth={fullWidth}
        variant={variant}
        sx={{ fontWeight: 'bold', borderRadius: 5 }}
      >
        {label}
      </Button>
    </Link>
  )
}
