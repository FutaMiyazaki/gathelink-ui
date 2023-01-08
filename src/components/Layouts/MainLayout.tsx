import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { FC, ReactNode } from 'react'
import { useRecoilState } from 'recoil'

import { Snackbar } from '@/components/Elements/Snackbar'
import { BottomNavigation } from '@/components/Layouts/BottomNavigation'
import { FloatingActionButton } from '@/components/Layouts/FloatingActionButton'
import { Header } from '@/components/Layouts/Header'
import { Sidebar } from '@/components/Layouts/Sidebar'
import { CreateFolderDialog } from '@/features/folder/components/Dialog/CreateFolderDialog'
import { useMedia } from '@/hooks/useMedia'
import { isOpenCreateFolderDialogState } from '@/states/isOpenCreateFolderDialogState'

type MainLayoutProps = Readonly<{
  children: ReactNode
}>

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isOpenCreateFolderDialog, setIsOpenCreateFolderDialog] = useRecoilState(
    isOpenCreateFolderDialogState,
  )
  const { isDesktopScreen } = useMedia()

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
        }}
      >
        <Box sx={{ mt: isDesktopScreen ? 12 : 10, mb: 12 }}>
          {children}
          <Container>
            <CreateFolderDialog
              isOpenDialog={isOpenCreateFolderDialog}
              setIsOpenDialog={setIsOpenCreateFolderDialog}
            />
            <Snackbar />
          </Container>
        </Box>
        <FloatingActionButton />
        <BottomNavigation />
      </Box>
    </Box>
  )
}
