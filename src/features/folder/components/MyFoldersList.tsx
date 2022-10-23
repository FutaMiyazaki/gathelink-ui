import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import SortIcon from '@mui/icons-material/Sort'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Link } from '@/components/Elements/Link'
import { sortMenuItems } from '@/features/folder/components/sortMenuItems'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { Folder } from '@/features/folder/types/Folder'
import { FoldersSortType } from '@/features/folder/types/FoldersSortType'
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
        <ListItemIcon>{active ? <FolderOpenRoundedIcon /> : <FolderRoundedIcon />}</ListItemIcon>
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleChangeSort = (sortType: FoldersSortType): void => {
    fetchMyFolders(sortType)
    setAnchorEl(null)
  }

  const handleClickSortMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  useEffect(() => {
    fetchMyFolders('old')
  }, [])

  return (
    <Box>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        sx={{ pl: 2, pr: 1 }}
      >
        <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold' }}>
          マイフォルダ
        </Typography>
        <IconButton onClick={handleClickSortMenu}>
          <SortIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} autoFocus={false} open={open} onClose={() => setAnchorEl(null)}>
          {sortMenuItems.map((item) => {
            return (
              <MenuItem
                key={item.label}
                onClick={() => handleChangeSort(item.sortType)}
                sx={{
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                {item.label}
              </MenuItem>
            )
          })}
        </Menu>
      </Stack>
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
