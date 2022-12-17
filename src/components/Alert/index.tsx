import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { alertState } from '@/states/AlertAtom'

export const AppAlert: FC = () => {
  const [alert, setAlert] = useRecoilState(alertState)
  const handleCloseAlert = (): void => {
    setAlert({ isShow: false, message: '' })
  }

  return (
    <Snackbar
      open={alert.isShow}
      autoHideDuration={4000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ mb: 9 }}
    >
      <Alert
        onClose={handleCloseAlert}
        icon={false}
        variant='filled'
        sx={{ backgroundColor: '#323232', borderRadius: 2, color: 'white', fontWeight: 'bold' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}
