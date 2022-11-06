import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Folder } from '@/features/folder/types/Folder'

type FolderCardProps = {
  folder: Folder
}

const FolderCard: FC<FolderCardProps> = ({ folder }) => (
  <Card>
    <CardActionArea component={Link} to={`/folder/${folder.id}`}>
      <Box sx={{ backgroundColor: 'secondary.main', textAlign: 'center', py: 3 }}>
        <FolderOutlinedIcon />
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography variant='subtitle1' sx={{ lineHeight: 1 }}>
          {folder.name}
        </Typography>
      </Box>
    </CardActionArea>
  </Card>
)

type FoldersByCardProps = {
  errorMessage: string
  folders: Folder[]
  isLoading: boolean
  noContentsText: string
}

export const FoldersByCard: FC<FoldersByCardProps> = ({
  errorMessage,
  folders,
  isLoading,
  noContentsText,
}) => {
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
        <Grid container columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ mx: 0.5 }}>
          {folders.map((folder: Folder) => {
            return (
              <Grid key={folder.id} xs={1}>
                <FolderCard folder={folder} />
              </Grid>
            )
          })}
        </Grid>
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
