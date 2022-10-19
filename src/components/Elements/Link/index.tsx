import { Link as MuiLink } from '@mui/material'
import { ReactNode, FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = {
  children: ReactNode
  path: string
  underline?: 'none' | 'hover' | 'always'
}

export const Link: FC<LinkProps> = ({ children, path, underline='none' }) => (
  <MuiLink component={RouterLink} to={path} underline={underline}>
    {children}
  </MuiLink>
)
