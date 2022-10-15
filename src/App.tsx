import { ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { theme } from '@/lib/mui/theme'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography>トップページです</Typography>
        <Button variant='contained'>テスト</Button>
        <Typography>It is never too late to be what you might have been.</Typography>
        <Typography>なりたかった自分になるのに遅すぎるということはない。</Typography>
      </Container>
    </ThemeProvider>
  )
}

export default App
