import { AppBar, Toolbar, Typography } from '@mui/material'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'

export const AuthHeader: FC = () => (
  <AppBar elevation={0} sx={{ backgroundColor: 'secondary.light', mb: 5 }}>
    <Toolbar>
      <Link path='/'>
        <Typography color='primary' component='span' noWrap variant='h6'>
          Gathelink
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>
)
