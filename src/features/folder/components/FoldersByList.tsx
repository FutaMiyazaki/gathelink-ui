import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { parseISO } from 'date-fns'
import { FC } from 'react'

import { Alert } from '@/components/Elements/Alert'
import { Link } from '@/components/Elements/Link'
import { ListItemIcon } from '@/components/Elements/ListItemIcon'
import { NoContents } from '@/components/Layouts/NoContents'
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
          <FolderRoundedIcon sx={{ color: folder.color }} />
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
  noContentsMessage: string
}

export const FoldersByList: FC<FoldersByListProps> = ({
  errorMessage,
  folders,
  isLoading,
  noContentsMessage,
}) => {
  if (isLoading) return <PageLoading />

  return (
    <>
      <Alert message={errorMessage} />
      {folders?.length !== 0 ? (
        <List>
          <Divider />
          {folders.map((folder: Folder) => {
            return <FolderListItem key={folder.id} folder={folder} />
          })}
        </List>
      ) : (
        <>
          <NoContents message={noContentsMessage} />
        </>
      )}
    </>
  )
}
