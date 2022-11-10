import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { parseISO } from 'date-fns'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'
import { Link as LinkType } from '@/features/link/types/Link'
import { diffTime } from '@/utils/date'

type LinkCardProps = {
  folderId: string
  isOwner: boolean
  link: LinkType
}

export const LinkCard: FC<LinkCardProps> = ({ folderId, isOwner, link }) => {
  return (
    <Card variant='outlined' sx={{ borderRadius: 3 }}>
      <CardActionArea component={MuiLink} href={link.url} target='_blank' underline='none'>
        {link.image_url === null ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              backgroundColor: 'secondary.main',
            }}
          >
            <ImageNotSupportedTwoToneIcon fontSize='large' />
          </Box>
        ) : (
          <CardMedia
            component='img'
            height='100'
            image={link.image_url}
            alt={`${link.title} image`}
            sx={{ pointerEvents: 'none' }}
          />
        )}
        <Box sx={{ p: 1 }}>
          <Typography
            component='span'
            variant='subtitle2'
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              fontWeight: 'bold',
            }}
          >
            {link.title}
          </Typography>
        </Box>
      </CardActionArea>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ p: 1 }}>
        <Typography component='span' variant='body2' sx={{ color: 'secondary.dark' }}>
          {diffTime(new Date(), parseISO(link.created_at as string))}
        </Typography>
        {isOwner && (
          <Link path={`/folder/${folderId}/link/${link.id}`}>
            <IconButton component='span' size='small'>
              <EditTwoToneIcon fontSize='small' />
            </IconButton>
          </Link>
        )}
      </Stack>
    </Card>
  )
}
