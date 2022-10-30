import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { Folder } from '@/features/folder/types/Folder'

type FoldersListProps = {
  errorMessage: string
  folders: Folder[]
  isLoading: boolean
  noContentsText: string
}

export const FoldersListForMobile: FC<FoldersListProps> = ({
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
              {noContentsText}
            </Typography>
          )}
        </>
      )}
    </>
  )
}
