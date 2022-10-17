import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { parseCookies } from 'nookies'
import { FC, ReactNode, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { AppAlert } from '@/components/Alert'
import { Header } from '@/components/Layouts/Header'
import { Sidebar } from '@/components/Layouts/Sidebar'
import { isAuthenticatedState } from '@/states/AuthAtom'

type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useRecoilState(isAuthenticatedState)
  const cookie = parseCookies()

  useEffect(() => {
    if (
      !authenticated &&
      cookie.uid !== undefined &&
      cookie.client !== undefined &&
      cookie.accessToken !== undefined
    ) {
      setAuthenticated(true)
    }
  }, [])

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
        <Container>
          <AppAlert />
        </Container>
        {children}
      </Box>
    </Box>
  )
}
