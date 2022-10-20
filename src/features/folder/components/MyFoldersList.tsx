import FolderIcon from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import {
  Alert,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Link } from '@/components/Elements/Link'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { Folder } from '@/features/folder/types/Folder'
import { Link as LinkType } from '@/features/link/types/Link'
import { isDrawerOpenedState } from '@/states/DrawerAtom'
import { myFoldersState } from '@/states/MyFoldersAtom'

type myFolderListItemProps = {
  active: boolean
  folderLinks?: LinkType[]
  folderName?: string
}

const MyFolderListItem: FC<myFolderListItemProps> = ({ active, folderLinks, folderName }) => {
  const setIsDrawerOpened = useSetRecoilState(isDrawerOpenedState)
  const bgColor = active ? 'secondary.main' : ''

  return (
    <ListItem
      onClick={() => setIsDrawerOpened(false)}
      dense
      disableGutters
      secondaryAction={
        folderLinks?.length !== undefined && (
          <Typography variant='caption' sx={{ pr: 2 }}>
            {folderLinks?.length > 0 && folderLinks?.length}
          </Typography>
        )
      }
      sx={{
        backgroundColor: bgColor,
        p: 0,
      }}
    >
      <ListItemButton>
        <ListItemIcon>{active ? <FolderOpenIcon /> : <FolderIcon />}</ListItemIcon>
        <ListItemText>
          <Typography
            variant='body2'
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {folderName}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

type RouterParams = {
  folderId: string
}

export const MyFoldersList: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { errorMessage, fetchMyFolders, isLoading } = useFetchMyFolders()
  const { folderId } = useParams<RouterParams>()

  useEffect(() => {
    fetchMyFolders()
  }, [])

  return (
    <Box>
      <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold', pl: 2 }}>
        マイフォルダ
      </Typography>
      {isLoading ? (
        <Stack justifyContent='center'>
          <CircularProgress size={25} sx={{ mx: 'auto' }} />
        </Stack>
      ) : myFolders?.length !== 0 ? (
        <List>
          {myFolders.map((folder: Folder) => {
            return (
              <Link key={folder.id} color='black' path={`/folder/${folder.id}`}>
                <MyFolderListItem
                  active={folderId !== undefined && parseInt(folderId, 10) === folder.id}
                  folderName={folder.name}
                  folderLinks={folder?.links}
                />
              </Link>
            )
          })}
        </List>
      ) : (
        <>
          {errorMessage !== '' ? (
            <Alert severity='error' sx={{ m: 2 }}>
              {errorMessage}
            </Alert>
          ) : (
            <Typography variant='body2' color='secondary.dark' sx={{ mx: 2, my: 1 }}>
              作成したフォルダはありません
            </Typography>
          )}
        </>
      )}
    </Box>
  )
}
