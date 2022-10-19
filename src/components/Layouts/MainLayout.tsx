import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { FC, ReactNode } from 'react'

import { AppAlert } from '@/components/Alert'
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
      <Container>
        <AppAlert />
      </Container>
      {children}
    </Box>
  </Box>
)
