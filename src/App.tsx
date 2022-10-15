import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import { FC } from 'react'

import logo from '@/logo.svg'
import '@/App.css'

const App: FC = () => {
  return (
    <>
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
        <Button variant='contained'>こんにちは</Button>
      </div>
    </>
  )
}

export default App
