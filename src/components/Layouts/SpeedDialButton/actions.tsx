import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import { ReactNode } from 'react'

import { DialogType } from '@/components/Layouts/SpeedDialButton'

type ActionsType = Array<{
  icon: ReactNode
  name: string
  type: DialogType
}>

export const actions: ActionsType = [
  { icon: <AddLinkOutlinedIcon />, name: 'リンク追加', type: 'addLink' },
  { icon: <CreateNewFolderOutlinedIcon />, name: 'フォルダ作成', type: 'createFolder' },
]
