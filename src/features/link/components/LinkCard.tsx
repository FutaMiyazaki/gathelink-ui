import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
import MoreVertIcon from '@mui/icons-material/MoreVert'
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
import { FC, MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { DeleteLinkDialog } from '@/features/link/components/DeleteLinkDialog'
import { Link as LinkType } from '@/features/link/types/Link'
import { alertState } from '@/states/AlertAtom'
import { LINK_TEXT_COLOR } from '@/utils/const'
import { diffTime } from '@/utils/date'

type LinkCardProps = {
  link: LinkType
  folderId: string
  isOwner?: boolean
}

export const LinkCard: FC<LinkCardProps> = ({ link, folderId, isOwner = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const setAlert = useSetRecoilState(alertState)
  const navigate = useNavigate()
  const IMAGE_HEIGHT = 130

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
          <CardContent sx={{ display: 'flex', px: 1, pt: 1, pb: 0 }}>
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
        <Typography component='span' variant='body2' sx={{ fontWeight: 300 }}>
          {diffTime(new Date(), parseISO(link.updated_at))}
        </Typography>
        <IconButton onClick={handleOpenMenu} edge='end' size='small' sx={{ ml: 'auto' }}>
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
      </CardActions>
    </Card>
  )
}
