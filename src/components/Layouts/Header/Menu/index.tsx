import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { menuItems } from '@/components/Layouts/Header/Menu/menuItems'

export const HeaderMenu: FC = () => {
  const location = useLocation()

  return (
    <Tabs value={false} variant='scrollable' scrollButtons={false}>
      {menuItems.map((item) => {
        return (
          <Tab
            key={item.label}
            component={Link}
            label={item.label}
            to={item.path}
            sx={{
              borderBottom: location.pathname === item.path ? 2 : 0,
              borderColor: 'secondary.dark',
              color: location.pathname === item.path ? 'primary.main' : 'secondary.dark',
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
