import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
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
