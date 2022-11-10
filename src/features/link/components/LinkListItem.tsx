import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { parseISO } from 'date-fns'
import { FC } from 'react'

import { Link } from '@/components/Elements/Link'
import { Link as LinkType } from '@/features/link/types/Link'
import { diffTime } from '@/utils/date'

type LinkListItemProps = {
  folderId: string
  isOwner: boolean
  link: LinkType
}

export const LinkListItem: FC<LinkListItemProps> = ({ folderId, isOwner, link }) => (
  <ListItem
    disableGutters
    secondaryAction={
      isOwner && (
        <Link path={`/folder/${folderId}/link/${link.id}`}>
          <IconButton component='span' size='small'>
            <EditTwoToneIcon />
          </IconButton>
        </Link>
      )
    }
    sx={{ p: 0, mb: 0 }}
  >
    <ListItemAvatar>
      {link.image_url === null ? (
        <Avatar
          variant='rounded'
          sx={{ width: 48, height: 48, bgcolor: 'white', color: 'primary.main' }}
        >
          <ImageNotSupportedTwoToneIcon />
        </Avatar>
      ) : (
        <Avatar
          variant='rounded'
          src={link.image_url}
          sx={{ width: 48, height: 48, pointerEvents: 'none' }}
        />
      )}
    </ListItemAvatar>
    <ListItemText sx={{ my: 0, pr: 4 }}>
      <Typography
        component='span'
        variant='subtitle2'
        sx={{
          display: 'block',
          color: 'black',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {link.title}
      </Typography>
      <MuiLink href={link.url} target='_blank' underline='none'>
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
      </MuiLink>
      <Typography
        component='span'
        variant='caption'
        sx={{ display: 'block', mt: 0.5, color: 'secondary.dark' }}
      >
        {diffTime(new Date(), parseISO(link.created_at as string))}
      </Typography>
    </ListItemText>
  </ListItem>
)
