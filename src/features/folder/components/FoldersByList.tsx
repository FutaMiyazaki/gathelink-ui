import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { parseISO } from 'date-fns'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { Folder } from '@/features/folder/types/Folder'
import { diffTime } from '@/utils/date'

type FolderListItemProps = {
  folder: Folder
}

const FolderListItem: FC<FolderListItemProps> = ({ folder }) => (
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
      sx={{ p: 0 }}
    >
      <ListItemButton>
        <ListItemIcon>
          <FolderTwoToneIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant='subtitle1'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {folder?.name}
            </Typography>
          }
          secondary={
            <Typography component='span' variant='body2' sx={{ color: 'secondary.dark' }}>
              {diffTime(new Date(), parseISO(folder.created_at))}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
    <Divider />
  </Link>
)

type FoldersByListProps = {
  errorMessage: string
  folders: Folder[]
  isLoading: boolean
  noContentsText: string
}

export const FoldersByList: FC<FoldersByListProps> = ({
  errorMessage,
  folders,
  isLoading,
  noContentsText,
}) => {
  if (isLoading) return <PageLoading />

  return (
    <>
      {folders?.length !== 0 ? (
        <List>
          <Divider />
          {folders.map((folder: Folder) => {
            return <FolderListItem key={folder.id} folder={folder} />
          })}
        </List>
      ) : (
        <>
          {errorMessage !== '' ? (
            <Alert icon={false} severity='error' sx={{ m: 2 }}>
              {errorMessage}
            </Alert>
          ) : (
            <Typography variant='body2' color='secondary.dark' sx={{ mx: 2, my: 1 }}>
              {noContentsText}
            </Typography>
          )}
        </>
      )}
    </>
  )
}
