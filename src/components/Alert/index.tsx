import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { alertState } from '@/states/AlertAtom'

export const AppAlert: FC = () => {
  const [alert, setAlert] = useRecoilState(alertState)
  const handleCloseAlert = (): void => {
    setAlert({ isShow: false, message: '', severity: 'error' })
  }

  return (
    <Snackbar
      open={alert.isShow}
      autoHideDuration={4000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mt: 10 }}
    >
      <Alert
        onClose={handleCloseAlert}
        severity={alert.severity}
        variant='filled'
        sx={{ backgroundColor: 'black', borderRadius: 2, color: 'white', fontWeight: 'bold' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}
