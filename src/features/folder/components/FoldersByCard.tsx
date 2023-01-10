import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { parseISO } from 'date-fns'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Alert } from '@/components/Elements/Alert'
import { NoContents } from '@/components/Layouts/NoContents'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { DynamicIcon } from '@/features/folder/components/DynamicIcon'
import { Folder } from '@/features/folder/types/Folder'
import { diffTime } from '@/utils/date'

type FolderCardProps = {
  folder: Folder
}

const FolderCard: FC<FolderCardProps> = ({ folder }) => {
  return (
    <Card variant='outlined'>
      <CardActionArea component={Link} to={`/folder/${folder.id}`}>
        <Box sx={{ backgroundColor: 'background.default', textAlign: 'center', py: 2 }}>
          {DynamicIcon(folder?.icon, 'large', folder?.color)}
        </Box>
        <Box sx={{ p: 1 }}>
          <Typography
            component='span'
            variant='subtitle1'
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              lineHeight: 1.5,
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            {folder.name}
          </Typography>
          <Typography component='span' variant='body2' sx={{ fontWeight: 300 }}>
            {diffTime(new Date(), parseISO(folder.created_at))}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}

type FoldersByCardProps = {
  errorMessage: string
  folders: Folder[]
  isLoading: boolean
  noContentsMessage: string
}

export const FoldersByCard: FC<FoldersByCardProps> = ({
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
        <Grid container columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ mx: 0.5 }}>
          {folders.map((folder: Folder) => {
            return (
              <Grid key={folder.id} xs={1}>
                <FolderCard folder={folder} />
              </Grid>
            )
          })}
        </Grid>
      ) : (
        <NoContents message={noContentsMessage} />
      )}
    </>
  )
}
