import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { FC, ReactNode } from 'react'
import { useRecoilState } from 'recoil'

import { AppAlert } from '@/components/Alert'
import { BottomNavigation } from '@/components/Layouts/BottomNavigation'
import { FloatingActionButton } from '@/components/Layouts/FloatingActionButton'
import { Header } from '@/components/Layouts/Header'
import { Sidebar } from '@/components/Layouts/Sidebar'
import { CreateFolderDialog } from '@/features/folder/components/Dialog/CreateFolderDialog'
import { isOpenCreateFolderDialogState } from '@/states/isOpenCreateFolderDialogState'

type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isOpenCreateFolderDialog, setIsOpenCreateFolderDialog] = useRecoilState(
    isOpenCreateFolderDialogState,
  )

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <Header />
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100%',
          pt: 8,
        }}
      >
        <Box sx={{ mt: 4, mb: 6 }}>
          {children}
          <Container>
            <CreateFolderDialog
              handleCloseDialog={() => setIsOpenCreateFolderDialog(false)}
              open={isOpenCreateFolderDialog}
            />
            <AppAlert />
          </Container>
        </Box>
        <FloatingActionButton />
        <BottomNavigation />
      </Box>
    </Box>
  )
}
