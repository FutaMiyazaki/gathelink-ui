import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { parseISO } from 'date-fns'
import { Image } from 'mui-image'
import { FC, MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { Link as LinkType } from '@/features/link/types/Link'
import { useMedia } from '@/hooks/useMedia'
import { diffTime } from '@/utils/date'

type LinkListItemProps = {
  divider?: boolean
  folderId: string
  isOwner: boolean
  link: LinkType
}

export const LinkListItem: FC<LinkListItemProps> = ({ folderId, isOwner, link }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { isDesktopScreen } = useMedia()
  const navigate = useNavigate()

  const handleOpenMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const headerAddActions: MenuItems = [
    {
      icon: <EditOutlinedIcon sx={{ mr: 1 }} />,
      onClick: () => {
        navigate(`/folder/${folderId}/link/${link.id}`)
        setAnchorEl(null)
      },
      text: '編集',
    },
  ]

  return (
    <ListItem disableGutters disablePadding>
      <ListItemButton
        component={MuiLink}
        href={link.url}
        target='_blank'
        underline='none'
        sx={{ borderRadius: 3 }}
      >
        <ListItemAvatar sx={{ mr: 1 }}>
          <Image
            src={link?.image_url !== null ? (link.image_url as string) : '/notImage'}
            width={isDesktopScreen ? '2vw' : '6vw'}
            height='3vh'
            fit='contain'
            errorIcon={<ImageNotSupportedTwoToneIcon />}
            alt={`${link.title} image`}
            duration={0}
            style={{ pointerEvents: 'none', minWidth: 40, minHeight: 40 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
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
          }
          secondary={
            <>
              <Typography
                component='span'
                variant='body2'
                sx={{ color: 'secondary.dark', fontWeight: 'bold', mr: 2 }}
              >
                {link.url.replace(/\\/g, '/').match(/\/\/([^/]*)/)?.[1]}
              </Typography>
              <Typography component='span' variant='body2' sx={{ color: 'secondary.dark' }}>
                {diffTime(new Date(), parseISO(link.updated_at))}
              </Typography>
            </>
          }
        />
      </ListItemButton>
      {isOwner && (
        <>
          <IconButton onClick={handleOpenMenu} edge='end' size='small'>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            handleCloseMenu={() => setAnchorEl(null)}
            menuItems={headerAddActions}
          />
        </>
      )}
    </ListItem>
  )
}
