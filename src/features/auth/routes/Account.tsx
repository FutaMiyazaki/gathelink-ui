import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Alert } from '@/components/Elements/Alert'
import { Button } from '@/components/Elements/Button'
import { DeleteAccountDialog } from '@/features/auth/components/DeleteAccountDialog'
import { EditAccount } from '@/features/auth/components/EditAccount'
import { EditPassword } from '@/features/auth/components/EditPassword'
import { currentUserState } from '@/states/CurrentUserAtom'

export const Account: FC = () => {
  const navigate = useNavigate()
  const [isOpenDeleteAccountDialog, setIsOpenDeleteAccountDialog] = useState(false)
  const currentUser = useRecoilValue(currentUserState)

  return (
    <Container maxWidth='md'>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h1'>アカウント設定</Typography>
      </Box>
      {currentUser.id === 1 && (
        <Alert message='ゲストユーザーはアカウント情報の変更・削除ができません' sx={{ mb: 3 }} />
      )}
      <EditAccount />
      <EditPassword />
      <Stack direction='row' justifyContent='center'>
        <Button
          color='warning'
          icon={<DeleteForeverOutlinedIcon />}
          label='アカウントを削除する'
          onClick={() => setIsOpenDeleteAccountDialog(true)}
          variant='text'
        />
        <DeleteAccountDialog
          isOpenDialog={isOpenDeleteAccountDialog}
          setIsOpenDialog={setIsOpenDeleteAccountDialog}
        />
      </Stack>
    </Container>
  )
}
