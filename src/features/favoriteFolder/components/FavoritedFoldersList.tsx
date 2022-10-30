import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Link } from '@/components/Elements/Link'
import { useFetchFavoritedFolders } from '@/features/folder/hooks/useFetchFavoritedFolders'
import { Folder } from '@/features/folder/types/Folder'
import { Link as LinkType } from '@/features/link/types/Link'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'

type FavoritedFoldersListItemProps = {
  active: boolean
  folderLinks?: LinkType[]
  folderName?: string
}

const FavoritedFoldersListItem: FC<FavoritedFoldersListItemProps> = ({
  active,
  folderLinks,
  folderName,
}) => {
  const bgColor = active ? 'primary.main' : ''
  const textColor = active ? '#ffffff' : ''

  return (
    <ListItem
      color='#ffffff'
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
        color: textColor,
        p: 0,
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          {active ? <FolderOpenRoundedIcon sx={{ color: '#ffffff' }} /> : <FolderRoundedIcon />}
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

export const FavoritedFoldersList: FC = () => {
  const favoritedFolders = useRecoilValue(favoritedFoldersState)
  const { errorMessage, fetchFetchFavoritedFolders, isFeatching } = useFetchFavoritedFolders()
  const { folderId } = useParams<RouterParams>()

  useEffect(() => {
    fetchFetchFavoritedFolders('old')
  }, [])

  return (
    <Box sx={{ mb: 2 }}>
      <Stack alignItems='center' direction='row' sx={{ pl: 2 }}>
        <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold' }}>
          お気に入り
        </Typography>
      </Stack>
      {isFeatching ? (
        <Stack justifyContent='center'>
          <CircularProgress size={25} sx={{ mx: 'auto' }} />
        </Stack>
      ) : favoritedFolders?.length !== 0 ? (
        <List>
          {favoritedFolders.map((folder: Folder) => {
            return (
              <Link key={folder.id} color='black' path={`/folder/${folder.id}`}>
                <FavoritedFoldersListItem
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
