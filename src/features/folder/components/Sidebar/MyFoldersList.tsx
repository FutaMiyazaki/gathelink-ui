import FolderCopyRoundedIcon from '@mui/icons-material/FolderCopyRounded'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { ListItemIcon } from '@/components/Elements/ListItemIcon'
import { FoldersList } from '@/features/folder/components/Sidebar/FoldersList'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { myFoldersState } from '@/states/MyFoldersAtom'

export const MyFoldersList: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const { errorMessage, fetchMyFolders, isFetching } = useFetchMyFolders()

  useEffect(() => {
    isAuthenticated && fetchMyFolders('created_asc')
  }, [])

  if (!isAuthenticated) return null

  return (
    <Box>
      <ListItem dense>
        <ListItemIcon>
          <FolderCopyRoundedIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold' }}>
            マイフォルダ
          </Typography>
        </ListItemText>
      </ListItem>
      <FoldersList
        errorMessage={errorMessage}
        folders={myFolders}
        isLoading={isFetching}
        noContentsMessage='作成したフォルダはありません'
      />
    </Box>
  )
}
