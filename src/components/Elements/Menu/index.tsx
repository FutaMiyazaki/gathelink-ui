import MuiMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Dispatch, FC, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

import { ListItemIcon } from '@/components/Elements/ListItemIcon'
import { MenuItem as MenuItemType, MenuItems } from '@/components/Elements/Menu/MenuItems'

type MenuProps = {
  anchorEl: null | HTMLElement
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
  menuItems: MenuItems
}

export const Menu: FC<MenuProps> = ({ anchorEl, setAnchorEl, menuItems }) => {
  const isOpen = Boolean(anchorEl)

  return (
    <MuiMenu
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={isOpen}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
    >
      {menuItems.map((item: MenuItemType) => {
        return item.path !== undefined
          ? item.isShow && (
              <MenuItem key={item.text} component={Link} to={item.path} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography component='span' variant='body2'>
                  {item.text}
                </Typography>
              </MenuItem>
            )
          : item.isShow && (
              <MenuItem key={item.text} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography component='span' variant='body2'>
                  {item.text}
                </Typography>
              </MenuItem>
            )
      })}
    </MuiMenu>
  )
}
