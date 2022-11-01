import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ReactNode, FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { theme } from '@/lib/mui/theme'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RecoilRoot>
      <BrowserRouter>{children}</BrowserRouter>
    </RecoilRoot>
  </ThemeProvider>
)
