import MuiDrawer from '@mui/material/Drawer'
import { Dispatch, FC, ReactNode, SetStateAction } from 'react'

type DrawerProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const Drawer: FC<DrawerProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <MuiDrawer
      anchor='bottom'
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        style: { borderTopLeftRadius: 15, borderTopRightRadius: 15 },
      }}
    >
      {children}
    </MuiDrawer>
  )
}
