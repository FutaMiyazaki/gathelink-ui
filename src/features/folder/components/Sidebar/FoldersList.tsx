import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Link } from '@/components/Elements/Link'
import { Folder } from '@/features/folder/types/Folder'
import { Link as LinkType } from '@/features/link/types/Link'
import { RouterParams } from '@/types'

type myFolderListItemProps = {
  active: boolean
  folderLinks?: LinkType[]
  folderName?: string
}

const MyFolderListItem: FC<myFolderListItemProps> = ({ active, folderLinks, folderName }) => {
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
          {active ? <FolderOpenRoundedIcon sx={{ color: '#ffffff' }} /> : <FolderTwoToneIcon />}
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

type FoldersListProps = {
  errorMessage: string
  folders: Folder[]
  isLoading: boolean
  noContentsText: string
}

export const FoldersList: FC<FoldersListProps> = ({
  errorMessage,
  folders,
  isLoading,
  noContentsText,
}) => {
  const { folderId } = useParams<RouterParams>()

  if (isLoading) {
    return (
      <Stack justifyContent='center'>
        <CircularProgress size={25} sx={{ mx: 'auto' }} />
      </Stack>
    )
  }

  return (
    <>
      {folders?.length !== 0 ? (
        <List>
          {folders.map((folder: Folder) => {
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
      ) : errorMessage !== '' ? (
        <Alert icon={false} severity='error' sx={{ m: 2 }}>
          {errorMessage}
        </Alert>
      ) : (
        <Typography variant='body2' color='secondary.dark' sx={{ mx: 2, my: 1 }}>
          {noContentsText}
        </Typography>
      )}
    </>
  )
}
