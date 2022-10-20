import Button from '@mui/material/Button'
import { FC, ReactNode } from 'react'

import { Link } from '@/components/Elements/Link'

type LinkButtonProps = {
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  fullWidth?: boolean
  icon?: ReactNode
  label: string
  path: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'text' | 'outlined' | 'contained'
}

export const LinkButton: FC<LinkButtonProps> = ({
  color = 'primary',
  fullWidth = false,
  icon,
  label,
  path,
  size = 'medium',
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
        sx={{ fontWeight: 'bold', borderRadius: 5 }}
      >
        {label}
      </Button>
    </Link>
  )
}
