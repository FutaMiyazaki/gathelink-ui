import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#26a69a',
      dark: '#00766c',
      light: '#64d8cb',
    },
    secondary: {
      main: '#eeeeee',
      dark: '#9e9e9e',
      light: '#f5f5f5',
    },
    warning: {
      main: '#f44336',
      dark: '#ba000d',
      light: '#ff7961',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.65rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.25rem',
    },
    button: {
      textTransform: 'none',
    },
    fontFamily: ['Roboto', '"Noto Sans JP"', '"Helvetica"', 'Arial', 'sans-serif'].join(','),
  },
})
