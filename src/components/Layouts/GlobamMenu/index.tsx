import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { tabItems } from '@/components/Layouts/GlobamMenu/tabItems'

export const GlobalMenu: FC = () => {
  const location = useLocation()

  return (
    <Tabs value={false} variant='scrollable' scrollButtons={false}>
      {tabItems.map((item) => {
        return (
          <Tab
            key={item.label}
            component={Link}
            label={item.label}
            to={item.to}
            sx={{
              borderBottom: location.pathname === item.to ? 2 : 0,
              borderColor: 'secondary.dark',
              color: location.pathname === item.to ? 'primary.main' : 'secondary.dark',
              mx: 1,
              '&:hover': {
                backgroundColor: 'secondary.main',
              },
            }}
          />
        )
      })}
    </Tabs>
  )
}
