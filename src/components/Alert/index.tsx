import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { alertState } from '@/states/AlertAtom'

export const AppAlert: FC = () => {
  const [alert, setAlert] = useRecoilState(alertState)
  const handleClose = (): void => {
    setAlert({ isShow: false, message: '', severity: 'error' })
  }

  return (
    <Snackbar
      open={alert.isShow}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={alert.severity} variant='filled'>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}
