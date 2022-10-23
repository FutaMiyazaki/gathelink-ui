import { Button as MuiButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { FC, ReactNode } from 'react'

type ButtonProps = {
  onClick?: () => void
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  disabled?: boolean
  fullWidth?: boolean
  icon?: ReactNode
  isLoading?: boolean
  label: string
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
  variant?: 'text' | 'outlined' | 'contained'
}

export const Button: FC<ButtonProps> = ({
  onClick,
  color = 'primary',
  disabled = false,
  fullWidth = false,
  icon,
  isLoading = false,
  label,
  size = 'medium',
  type,
  variant = 'contained',
}) => {
  return (
    <MuiButton
      onClick={onClick}
      color={color}
      disabled={disabled}
      disableElevation
      fullWidth={fullWidth}
      size={size}
      startIcon={icon}
      type={type}
      variant={variant}
      sx={{ borderRadius: 5, fontWeight: 'bold' }}
    >
      {isLoading ? <CircularProgress size={25} /> : label}
    </MuiButton>
  )
}
