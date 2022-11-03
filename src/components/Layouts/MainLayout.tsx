import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { FC, ReactNode } from 'react'

import { AppAlert } from '@/components/Alert'
import { FloatingActionButton } from '@/components/Layouts/FloatingActionButton'
import { GlobalMenu } from '@/components/Layouts/GlobamMenu'
import { Header } from '@/components/Layouts/Header'
import { Sidebar } from '@/components/Layouts/Sidebar'

type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
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
      <Box
        sx={{
          borderBottom: 1,
          borderColor: '#e0e0e0',
          display: { sx: 'flex', md: 'none' },
        }}
      >
        <GlobalMenu />
      </Box>
      <Box sx={{ mt: 4, mb: 6 }}>
        {children}
        <Container>
          <AppAlert />
        </Container>
      </Box>
      <FloatingActionButton />
    </Box>
  </Box>
)
