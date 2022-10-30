type ButtonItems = Array<{
  label: string
  path: string
  variant: 'text' | 'outlined' | 'contained'
}>

export const buttonItems: ButtonItems = [
  {
    label: '新規登録',
    path: '/signup',
    variant: 'contained',
  },
  {
    label: 'ログイン',
    path: '/login',
    variant: 'outlined',
  },
]
