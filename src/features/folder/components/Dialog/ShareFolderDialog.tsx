import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Dispatch, FC, SetStateAction } from 'react'
import { useSetRecoilState } from 'recoil'

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
      fullWidth
      maxWidth='sm'
      onClose={() => setIsOpenDialog(false)}
      open={isOpenDialog}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <ShareRoundedIcon />
        </Avatar>
      </Box>
      <DialogTitle sx={{ textAlign: 'center' }}>フォルダを共有する</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          fullWidth
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
