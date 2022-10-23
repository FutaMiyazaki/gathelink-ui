import EditIcon from '@mui/icons-material/Edit'
import {
  IconButton,
  Link as MuiLink,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
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

  const getDomain = (url: string): string | undefined => {
    const domain = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
    if (domain != null) {
      return domain[1]
    } else {
      return undefined
    }
  }

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
      <ListItemButton sx={{ px: 1 }}>
        <MuiLink href={link.url} target='_blank' underline='none'>
          <ListItemText
            primary={
              <Typography component='span' variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {link.title}
              </Typography>
            }
            secondary={
              <>
                <Typography color='black' component='span' sx={{ display: 'block', ml: 2 }}>
                  {getDomain(link.url)}
                </Typography>
                <Typography component='span' variant='caption' sx={{ display: 'block', ml: 2 }}>
                  {link.updated_at}
                </Typography>
              </>
            }
          />
        </MuiLink>
      </ListItemButton>
    </ListItem>
  )
}