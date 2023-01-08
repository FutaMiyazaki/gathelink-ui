import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded'
import Avatar from '@mui/material/Avatar'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Dispatch, FC, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'

import { Alert } from '@/components/Elements/Alert'
import { Dialog } from '@/components/Elements/Dialog'
import { colorSettings } from '@/features/folder/components/Dialog/SetColorAndIconDialog/colorSettings'
import { iconSettings } from '@/features/folder/components/Dialog/SetColorAndIconDialog/iconSettings'
import { useUpdateFolder } from '@/features/folder/hooks/useUpdateFolder'
import { Folder } from '@/features/folder/types/Folder'
import { useMedia } from '@/hooks/useMedia'
import { RouterParams } from '@/types/RouterParams'

type SetColorAndIconDialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  folder?: Folder
  setFolder: Dispatch<SetStateAction<Folder | undefined>>
}

export const SetColorAndIconDialog: FC<SetColorAndIconDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
  folder: prevFolder,
  setFolder,
}) => {
  const { updateFolder, errorMessage } = useUpdateFolder()
  const { folderId } = useParams<RouterParams>()
  const { isMobileScreen } = useMedia()

  const onClickUpdateColor = (newColor: string): void => {
    if (newColor === prevFolder?.color) return setIsOpenDialog(false)

    const folder = {
      color: newColor,
    }
    updateFolder(folder, folderId as string)
    prevFolder !== undefined && setFolder({ ...prevFolder, color: newColor })
    setIsOpenDialog(false)
  }

  const onClickUpdateIcon = (newIcon: string): void => {
    if (newIcon === prevFolder?.icon) return setIsOpenDialog(false)

    const folder = {
      icon: newIcon,
    }
    updateFolder(folder, folderId as string)
    prevFolder !== undefined && setFolder({ ...prevFolder, icon: newIcon })
    setIsOpenDialog(false)
  }

  return (
    <Dialog
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      title='フォルダの色・アイコンを設定'
      titleIcon={
        <Avatar sx={{ mr: 1 }}>
          <ColorLensRoundedIcon />
        </Avatar>
      }
      scroll={isMobileScreen ? 'body' : 'paper'}
    >
      <DialogContent>
        <Divider sx={{ mb: 2 }} />
        <Alert message={errorMessage} />
        <Typography variant='subtitle1' sx={{ fontWeight: 300 }}>
          カラーの変更
        </Typography>
        {colorSettings.map((setting) => {
          return (
            <IconButton key={setting.value} onClick={() => onClickUpdateColor(setting.value)}>
              {prevFolder?.color === setting.value ? (
                <CheckCircleRoundedIcon fontSize='large' sx={{ color: setting.value }} />
              ) : (
                <CircleRoundedIcon fontSize='large' sx={{ color: setting.value }} />
              )}
            </IconButton>
          )
        })}
        <Divider sx={{ my: 2 }} />
        <Typography variant='subtitle1' sx={{ fontWeight: 300 }}>
          アイコンの変更
        </Typography>
        {iconSettings.map((setting) => {
          return (
            <IconButton key={setting.value} onClick={() => onClickUpdateIcon(setting.value)}>
              {setting.icon}
            </IconButton>
          )
        })}
      </DialogContent>
    </Dialog>
  )
}
