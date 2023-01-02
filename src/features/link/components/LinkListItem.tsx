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
import { useSetRecoilState } from 'recoil'

import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { DeleteLinkDialog } from '@/features/link/components/DeleteLinkDialog'
import { Link as LinkType } from '@/features/link/types/Link'
import { useMedia } from '@/hooks/useMedia'
import { alertState } from '@/states/AlertAtom'
import { diffTime } from '@/utils/date'

type LinkListItemProps = {
  divider?: boolean
  folderId: string
  isOwner?: boolean
  link: LinkType
}

export const LinkListItem: FC<LinkListItemProps> = ({ folderId, isOwner = false, link }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const setAlert = useSetRecoilState(alertState)
  const { isDesktopScreen } = useMedia()

  const navigate = useNavigate()

  const handleOpenMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const ownerMenuItems: MenuItems = [
    {
      onClick: () => {
        navigator.clipboard.writeText(link.url)
        setAlert({ isShow: true, message: 'クリップボードにリンクをコピーしました' })
        setAnchorEl(null)
      },
      text: 'クリップボードにリンクをコピー',
    },
    {
      onClick: () => {
        navigate(`/folder/${folderId}/link/${link.id}`)
        setAnchorEl(null)
      },
      text: '編集',
    },
    {
      onClick: () => {
        setIsOpenDialog(true)
        setAnchorEl(null)
      },
      text: '削除',
    },
  ]

  const notOwnerMenuItems: MenuItems = [
    {
      onClick: () => {
        navigator.clipboard.writeText(link.url)
        setAlert({ isShow: true, message: 'クリップボードにリンクをコピーしました' })
        setAnchorEl(null)
      },
      text: 'クリップボードにリンクをコピー',
    },
  ]

  return (
    <ListItem disableGutters disablePadding>
      <ListItemButton
        component={MuiLink}
        href={link.url}
        target='_blank'
        underline='none'
        sx={{ borderRadius: 3, pl: 1, pr: 0 }}
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
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
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
      <IconButton onClick={handleOpenMenu} edge='end' size='small' sx={{ mr: 0.5 }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        handleCloseMenu={() => setAnchorEl(null)}
        menuItems={isOwner ? ownerMenuItems : notOwnerMenuItems}
      />
      {isOwner && folderId !== undefined && link.id !== undefined && (
        <DeleteLinkDialog
          folderId={folderId}
          linkId={link.id.toString()}
          setIsOpenDialog={setIsOpenDialog}
          isOpenDialog={isOpenDialog}
        />
      )}
    </ListItem>
  )
}
