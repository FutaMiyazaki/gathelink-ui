import Button from '@mui/material/Button'
import { SxProps } from '@mui/material/styles'
import { FC, ReactNode } from 'react'

import { Link } from '@/components/Elements/Link'

type LinkButtonProps = {
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  fullWidth?: boolean
  icon?: ReactNode
  label: string
  path: string
  size?: 'small' | 'medium' | 'large'
  sx?: SxProps
  variant?: 'text' | 'outlined' | 'contained'
}

export const LinkButton: FC<LinkButtonProps> = ({
  color = 'primary',
  fullWidth = false,
  icon,
  label,
  path,
  size = 'medium',
  sx,
  variant = 'contained',
}) => {
  return (
    <Link path={path}>
      <Button
        color={color}
        component='span'
        disableElevation
        fullWidth={fullWidth}
        size={size}
        startIcon={icon}
        variant={variant}
        sx={{ borderRadius: 5, fontWeight: 'bold', ...sx }}
      >
        {label}
      </Button>
    </Link>
  )
}
