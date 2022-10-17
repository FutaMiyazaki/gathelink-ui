import { Button as MuiButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { FC } from 'react'

type ButtonProps = {
  onClick?: () => void
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  disabled?: boolean
  fullWidth?: boolean
  isLoading?: boolean
  label: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'text' | 'outlined' | 'contained'
}

export const Button: FC<ButtonProps> = ({
  onClick,
  color = 'primary',
  disabled = false,
  fullWidth = false,
  isLoading = false,
  label,
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
      type={type}
      variant={variant}
      sx={{ borderRadius: 5, fontWeight: 'bold' }}
    >
      {isLoading ? <CircularProgress size={25} /> : label}
    </MuiButton>
  )
}
