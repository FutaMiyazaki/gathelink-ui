import MuiLink from '@mui/material/Link'
import { SxProps } from '@mui/material/styles'
import { ReactNode, FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = {
  children: ReactNode
  color?: string
  path: string
  sx?: SxProps
  underline?: 'none' | 'hover' | 'always'
}

export const Link: FC<LinkProps> = ({
  children,
  color = 'primary',
  path,
  sx,
  underline = 'none',
}) => (
  <MuiLink color={color} component={RouterLink} to={path} underline={underline} sx={{ ...sx }}>
    {children}
  </MuiLink>
)
