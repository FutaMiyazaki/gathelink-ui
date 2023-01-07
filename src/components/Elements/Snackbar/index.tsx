import MuiAlert from '@mui/material/Alert'
import Slide, { SlideProps } from '@mui/material/Slide'
import MuiSnackbar from '@mui/material/Snackbar'
import { TransitionProps } from '@mui/material/transitions'
import { FC, JSXElementConstructor, ReactElement } from 'react'
import { useRecoilState } from 'recoil'

import { alertState } from '@/states/AlertAtom'

const SlideTransition: JSXElementConstructor<
  TransitionProps & { children: ReactElement<any, any> }
> = (props: SlideProps) => <Slide {...props} direction='up' />

export const Snackbar: FC = () => {
  const [alert, setAlert] = useRecoilState(alertState)

  return (
    <MuiSnackbar
      open={alert.isShow}
      autoHideDuration={3000}
      onClose={() => setAlert({ isShow: false, message: '' })}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
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
