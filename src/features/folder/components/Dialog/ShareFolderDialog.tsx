import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import Avatar from '@mui/material/Avatar'
import MuiButton from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Dispatch, FC, SetStateAction } from 'react'
import { useSetRecoilState } from 'recoil'

import { Dialog } from '@/components/Elements/Dialog'
import { alertState } from '@/states/AlertAtom'

type ShareFolderDialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  folderName: string
  ownerName: string
}

export const ShareFolderDialog: FC<ShareFolderDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
  folderName,
  ownerName,
}) => {
  const setAlert = useSetRecoilState(alertState)
  const handleClickCopyButton = (): void => {
    navigator.clipboard.writeText(window.location.href)
    setAlert({ isShow: true, message: 'クリップボードにリンクをコピーしました' })
  }

  if (folderName === undefined || ownerName === undefined) return null

  return (
    <Dialog
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      title='フォルダを共有'
      titleIcon={
        <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
          <ShareRoundedIcon />
        </Avatar>
      }
    >
      <DialogContent>
        <Typography component='p' sx={{ mb: 1 }}>
          フォルダのURL
        </Typography>
        <TextField
          disabled
          fullWidth
          size='small'
          defaultValue={window.location.href}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClickCopyButton}>
                  <ContentCopyRoundedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <MuiButton
          disableElevation
          size='large'
          href={`https://twitter.com/intent/tweet?text=${folderName}%0A&url=${encodeURIComponent(
            window.location.href,
          )}`}
          startIcon={<TwitterIcon sx={{ color: '#1E9BF0' }} />}
          target='_blank'
          variant='text'
          sx={{ borderRadius: 5, fontWeight: 'bold', color: '#1E9BF0' }}
        >
          ツイート
        </MuiButton>
      </DialogContent>
    </Dialog>
  )
}
