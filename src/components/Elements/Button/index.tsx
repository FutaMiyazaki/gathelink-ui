import MuiButton from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { SxProps } from '@mui/material/styles'
import { FC, MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  disabled?: boolean
  fullWidth?: boolean
  icon?: ReactNode
  isLoading?: boolean
  label: string
  size?: 'small' | 'medium' | 'large'
  sx?: SxProps
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
  sx,
  type,
  variant = 'contained',
}) => (
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
    sx={{ borderRadius: 5, fontWeight: 'bold', ...sx }}
  >
    {isLoading ? <CircularProgress size={25} /> : label}
  </MuiButton>
)
