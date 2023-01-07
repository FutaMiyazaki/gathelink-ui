import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded'
import Avatar from '@mui/material/Avatar'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { Dispatch, FC, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'

import { Alert } from '@/components/Elements/Alert'
import { Dialog } from '@/components/Elements/Dialog'
import { useUpdateFolder } from '@/features/folder/hooks/useUpdateFolder'
import { Folder } from '@/features/folder/types/Folder'
import { RouterParams } from '@/types/RouterParams'

type SetColorDialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  folder?: Folder
  setFolder: Dispatch<SetStateAction<Folder | undefined>>
}

const colorSettings = [
  { value: '#C7243A' },
  { value: '#DA4F1A' },
  { value: '#EDAD0D' },
  { value: '#F6CA09' },
  { value: '#FFE602' },
  { value: '#D8E212' },
  { value: '#A4C520' },
  { value: '#22AC0F' },
  { value: '#009250' },
  { value: '#26a69a' },
  { value: '#0386AB' },
  { value: '#007AB7' },
  { value: '#3261AB' },
  { value: '#5D639E' },
  { value: '#744199' },
  { value: '#932574' },
  { value: '#A52075' },
  { value: '#B61973' },
  { value: '#BF1F55' },
]

export const SetColorDialog: FC<SetColorDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
  folder: prevFolder,
  setFolder,
}) => {
  const { updateFolder, errorMessage } = useUpdateFolder()
  const { folderId } = useParams<RouterParams>()

  const onClickUpdateColor = (newColor: string): void => {
    if (newColor === prevFolder?.color) return setIsOpenDialog(false)

    const folder = {
      color: newColor,
    }
    updateFolder(folder, folderId as string)
    prevFolder !== undefined && setFolder({ ...prevFolder, color: newColor })
    setIsOpenDialog(false)
  }

  return (
    <Dialog
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      title='フォルダの色を設定'
      titleIcon={
        <Avatar sx={{ mr: 1 }}>
          <ColorLensRoundedIcon />
        </Avatar>
      }
    >
      <DialogContent>
        <Alert message={errorMessage} />
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
      </DialogContent>
    </Dialog>
  )
}
