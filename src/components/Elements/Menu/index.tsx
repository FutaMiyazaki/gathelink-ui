import MuiMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { MenuItems } from '@/components/Elements/Menu/MenuItems'

type MenuProps = {
  anchorEl: null | HTMLElement
  handleCloseMenu: () => void
  menuItems: MenuItems
}

export const Menu: FC<MenuProps> = ({ anchorEl, handleCloseMenu, menuItems }) => {
  const open = Boolean(anchorEl)

  return (
    <MuiMenu anchorEl={anchorEl} onClose={handleCloseMenu} open={open}>
      {menuItems.map((item) => {
        return (
          <MenuItem
            key={item.text}
            onClick={item.onClick}
            sx={{
              '&:hover': {
                color: 'white',
                backgroundColor: 'primary.main',
              },
            }}
          >
            {item.icon}
            <Typography component='span' variant='body2'>
              {item.text}
            </Typography>
          </MenuItem>
        )
      })}
    </MuiMenu>
  )
}
