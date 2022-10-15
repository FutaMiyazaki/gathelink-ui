import { ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { theme } from '@/lib/mui/theme'
import logo from '@/logo.svg'

import '@/App.css'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
        <Button variant='contained'>テスト</Button>
        <Typography>It is never too late to be what you might have been.</Typography>
        <Typography>なりたかった自分になるのに遅すぎるということはない。</Typography>
      </div>
    </ThemeProvider>
  )
}

export default App
