import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { parseCookies } from 'nookies'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Link } from '@/components/Elements/Link'
import { Link as LinkType } from '@/features/link/types/Link'
import { isAuthenticatedState } from '@/states/AuthAtom'

type FolderLinkButtonProps = {
  folderId: string
  link: LinkType
  ownerId?: string
}

export const FolderLinkButton: FC<FolderLinkButtonProps> = ({ folderId, link, ownerId }) => {
  const cookie = parseCookies()
  const uid = cookie.uid
  const authenticated = useRecoilValue(isAuthenticatedState)

  return (
    <ListItem
      disableGutters
      secondaryAction={
        authenticated &&
        ownerId === uid &&
        folderId !== undefined && (
          <Link path={`/folder/${folderId}/link/${link.id}`}>
            <IconButton component='span' size='small'>
              <EditIcon />
            </IconButton>
          </Link>
        )
      }
      sx={{ p: 0, mb: 0 }}
    >
      <ListItemText sx={{ my: 0, pr: 4 }}>
        <Typography
          component='span'
          variant='subtitle2'
          sx={{
            color: 'black',
            display: 'block',
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
            color='#8AB4F8'
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
          sx={{ color: 'secondary.dark', display: 'block' }}
        >
          {moment(link.updated_at).format('YYYY/MM/DD')} 更新
        </Typography>
      </ListItemText>
    </ListItem>
  )
}
