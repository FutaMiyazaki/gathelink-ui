import EditIcon from '@mui/icons-material/Edit'
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { parseISO } from 'date-fns'
import { Image } from 'mui-image'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Link as LinkType } from '@/features/link/types/Link'
import { useMedia } from '@/hooks/useMedia'
import { diffTime } from '@/utils/date'

type LinkListItemProps = {
  folderId: string
  isOwner: boolean
  link: LinkType
}

export const LinkListItem: FC<LinkListItemProps> = ({ folderId, isOwner, link }) => {
  const { isDesktopScreen } = useMedia()

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Image
        src={link?.image_url !== null ? (link.image_url as string) : '/notImage'}
        width={isDesktopScreen ? '10vw' : 40}
        fit={isDesktopScreen ? 'contain' : 'cover'}
        errorIcon={<ImageNotSupportedTwoToneIcon />}
        style={{ pointerEvents: 'none', minWidth: 40 }}
      />
      <CardContent sx={{ minWidth: 0, pr: 0, py: 0 }}>
        <CardActionArea
          component={MuiLink}
          href={link.url}
          target='_blank'
          underline='none'
          sx={{ minWidth: 0, mb: 1 }}
        >
          <Typography
            component='span'
            variant='subtitle2'
            sx={{
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {link.title}
          </Typography>
          <Typography
            color='#0072e5'
            component='span'
            variant='body1'
            sx={{
              display: 'block',
              textDecorationLine: 'underline',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {link.url.substring(link.url.indexOf('/') + 2)}
          </Typography>
        </CardActionArea>
        <Typography component='span' variant='caption' sx={{ color: 'secondary.dark' }}>
          {diffTime(new Date(), parseISO(link.created_at as string))}
        </Typography>
        {isOwner && (
          <Chip
            component={Link}
            to={`/folder/${folderId}/link/${link.id}`}
            icon={<EditIcon />}
            label='編集する'
            size='small'
            variant='outlined'
            clickable
            sx={{ ml: 2 }}
          />
        )}
      </CardContent>
    </Card>
  )
}
