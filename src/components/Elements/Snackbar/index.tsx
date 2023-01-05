import MuiAlert from '@mui/material/Alert'
import MuiSnackbar from '@mui/material/Snackbar'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { alertState } from '@/states/AlertAtom'

export const Snackbar: FC = () => {
  const [alert, setAlert] = useRecoilState(alertState)

  return (
    <MuiSnackbar
      open={alert.isShow}
      autoHideDuration={4000}
      onClose={() => setAlert({ isShow: false, message: '' })}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ mb: 9 }}
    >
      <MuiAlert
        onClose={() => setAlert({ isShow: false, message: '' })}
        icon={false}
        variant='filled'
        sx={{ backgroundColor: '#323232', borderRadius: 2, color: 'white', fontWeight: 'bold' }}
      >
        {alert.message}
      </MuiAlert>
    </MuiSnackbar>
  )
}
