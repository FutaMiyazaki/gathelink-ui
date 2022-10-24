import MuiLink from '@mui/material/Link'
import { ReactNode, FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = {
  children: ReactNode
  color?: string
  path: string
  underline?: 'none' | 'hover' | 'always'
}

export const Link: FC<LinkProps> = ({ children, color = 'primary', path, underline = 'none' }) => (
  <MuiLink color={color} component={RouterLink} to={path} underline={underline}>
    {children}
  </MuiLink>
)
