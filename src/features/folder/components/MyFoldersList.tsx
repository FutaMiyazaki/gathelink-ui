import FolderIcon from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import {
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
import { useLocation } from 'react-router-dom'
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
        <Typography variant='caption' color='secondary.dark' sx={{ pr: 2 }}>
          {folderLinks?.length}
        </Typography>
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

export const MyFoldersList: FC = () => {
  const location = useLocation()
  const myFolders = useRecoilValue(myFoldersState)
  const { errorMessage, fetchMyFolders, isLoading } = useFetchMyFolders()

  useEffect(() => {
    fetchMyFolders()
  }, [])

  console.log(location)

  return (
    <Box>
      <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold', pl: 2 }}>
        マイフォルダ
      </Typography>
      {isLoading ? (
        <Stack justifyContent='center'>
          <CircularProgress size={25} sx={{ mx: 'auto' }} />
        </Stack>
      ) : myFolders[0]?.name !== undefined ? (
        <List>
          {myFolders.map((folder: Folder) => {
            return (
              <Link key={folder.id} color='black' path={`/folder/${folder.id}`}>
                <MyFolderListItem
                  active={folder.id === 10}
                  folderName={folder.name}
                  folderLinks={folder?.links}
                />
              </Link>
            )
          })}
        </List>
      ) : (
        <>
          {errorMessage !== undefined ? (
            <Typography variant='body2' color='red'>
              {errorMessage}
            </Typography>
          ) : (
            <Typography variant='body2' color='secondary.dark'>
              作成・保存したフォルダはありません
            </Typography>
          )}
        </>
      )}
    </Box>
  )
}
