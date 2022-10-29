import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone'
import SortIcon from '@mui/icons-material/Sort'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { Link } from '@/components/Elements/Link'
import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { Folder } from '@/features/folder/types/Folder'
import { FoldersSortType } from '@/features/folder/types/FoldersSortType'
import { useMedia } from '@/hooks/useMedia'
import { myFoldersState } from '@/states/MyFoldersAtom'

export const MyFoldersList: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { errorMessage, fetchMyFolders, isLoading } = useFetchMyFolders()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { isDesktopScreen } = useMedia()

  const handleChangeSort = (sortType: FoldersSortType): void => {
    fetchMyFolders(sortType)
    setAnchorEl(null)
  }

  const handleOpenSortMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  const sortMenuItems: MenuItems = [
    { onClick: () => handleChangeSort('old'), text: '作成日時が古い順' },
    { onClick: () => handleChangeSort('latest'), text: '作成日時が新しい順' },
  ]

  useEffect(() => {
    fetchMyFolders('old')
  }, [])

  if (isDesktopScreen) return null

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ px: 1.5 }}>
        <PageHeading text='マイフォルダ' />
        <IconButton onClick={handleOpenSortMenu}>
          <SortIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          handleCloseMenu={() => setAnchorEl(null)}
          menuItems={sortMenuItems}
        />
      </Stack>
      {isLoading ? (
        <Stack justifyContent='center'>
          <CircularProgress size={25} sx={{ mx: 'auto' }} />
        </Stack>
      ) : myFolders?.length !== 0 ? (
        <List>
          <Divider />
          {myFolders.map((folder: Folder) => {
            return (
              <Link key={folder.id} color='black' path={`/folder/${folder.id}`}>
                <ListItem
                  color='#ffffff'
                  dense
                  disableGutters
                  secondaryAction={
                    folder?.links?.length !== undefined && (
                      <Typography variant='caption' sx={{ pr: 2 }}>
                        {folder?.links.length > 0 && folder?.links.length}
                      </Typography>
                    )
                  }
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <FolderTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant='body2'
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {folder?.name}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <Divider />
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
