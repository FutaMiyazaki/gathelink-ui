import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { parseISO } from 'date-fns'
import { Image } from 'mui-image'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'
import { Link as LinkType } from '@/features/link/types/Link'
import { LINK_TEXT_COLOR } from '@/utils/const'
import { diffTime } from '@/utils/date'

type LinkCardProps = {
  folderId: string
  isOwner: boolean
  link: LinkType
}

export const LinkCard: FC<LinkCardProps> = ({ folderId, isOwner, link }) => {
  const IMAGE_HEIGHT = 130

  return (
    <Card variant='outlined' sx={{ borderRadius: 3 }}>
      <Tooltip
        followCursor
        title={
          <Typography
            component='span'
            variant='subtitle2'
            color={LINK_TEXT_COLOR}
            sx={{ textDecoration: 'underline' }}
          >
            {link.url}
          </Typography>
        }
        PopperProps={{
          sx: {
            '& .MuiTooltip-tooltip': {
              backgroundColor: '#f5f5f5',
              boxShadow: 1,
            },
          },
        }}
      >
        <CardActionArea component={MuiLink} href={link.url} target='_blank' underline='none'>
          {link.image_url === null ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: IMAGE_HEIGHT,
                backgroundColor: 'secondary.main',
              }}
            >
              <ImageNotSupportedTwoToneIcon fontSize='large' />
            </Box>
          ) : (
            <Image
              src={link.image_url as string}
              height={IMAGE_HEIGHT}
              alt={`${link.title} image`}
              duration={0}
              style={{ pointerEvents: 'none' }}
            />
          )}
          <CardContent sx={{ display: 'flex', p: 1 }}>
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
          </CardContent>
        </CardActionArea>
      </Tooltip>
      <CardActions disableSpacing sx={{ pt: 0 }}>
        <Typography component='span' variant='body2' sx={{ mr: 'auto', color: 'secondary.dark' }}>
          {diffTime(new Date(), parseISO(link.updated_at))}
        </Typography>
        {isOwner && (
          <Link path={`/folder/${folderId}/link/${link.id}`}>
            <IconButton component='span' size='small'>
              <EditTwoToneIcon fontSize='small' />
            </IconButton>
          </Link>
        )}
      </CardActions>
    </Card>
  )
}
