import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Alert } from '@/components/Elements/Alert'
import { Link } from '@/components/Elements/Link'
import { ListItemIcon } from '@/components/Elements/ListItemIcon'
import { DynamicIcon } from '@/features/folder/components/DynamicIcon'
import { Folder } from '@/features/folder/types/Folder'
import { Link as LinkType } from '@/features/link/types/Link'
import { RouterParams } from '@/types/RouterParams'

type FolderListItemProps = {
  active: boolean
  folderLinks?: LinkType[]
  folderName?: string
  folderColor?: string
  folderIcon?: string
}

const FolderListItem: FC<FolderListItemProps> = ({
  active,
  folderLinks,
  folderName,
  folderColor,
  folderIcon = '',
}) => {
  const bgColor = active ? folderColor : ''
  const textColor = active ? '#ffffff' : ''

  return (
    <ListItem
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
        <ListItemIcon sx={{ color: active ? '#ffffff' : folderColor }}>
          {DynamicIcon(folderIcon)}
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
  noContentsMessage: string
}

export const FoldersList: FC<FoldersListProps> = ({
  errorMessage,
  folders,
  isLoading,
  noContentsMessage,
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
      <Alert message={errorMessage} />
      {folders?.length !== 0 ? (
        <List sx={{ py: 0 }}>
          {folders.map((folder: Folder) => {
            return (
              <Link key={folder.id} color='black' path={`/folder/${folder.id}`}>
                <FolderListItem
                  active={folderId !== undefined && parseInt(folderId, 10) === folder.id}
                  folderName={folder.name}
                  folderColor={folder?.color}
                  folderIcon={folder?.icon}
                  folderLinks={folder?.links}
                />
              </Link>
            )
          })}
        </List>
      ) : (
        <Typography variant='body2' color='secondary.dark' sx={{ mx: 2, my: 1 }}>
          {noContentsMessage}
        </Typography>
      )}
    </>
  )
}
