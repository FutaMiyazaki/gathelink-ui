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

import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { DeleteLinkDialog } from '@/features/link/components/DeleteLinkDialog'
import { Link as LinkType } from '@/features/link/types/Link'
import { LINK_TEXT_COLOR } from '@/utils/const'
import { diffTime } from '@/utils/date'

type LinkCardProps = {
  folderId: string
  isOwner: boolean
  link: LinkType
}

export const LinkCard: FC<LinkCardProps> = ({ folderId, isOwner, link }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const navigate = useNavigate()
  const IMAGE_HEIGHT = 130

  const handleOpenMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const headerAddActions: MenuItems = [
    {
      onClick: () => {
        navigator.clipboard.writeText(link.url)
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
        setOpenDialog(true)
        setAnchorEl(null)
      },
      text: '削除',
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
          <>
            <IconButton onClick={handleOpenMenu} edge='end' size='small'>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              handleCloseMenu={() => setAnchorEl(null)}
              menuItems={headerAddActions}
            />
            {folderId !== undefined && link.id !== undefined && (
              <DeleteLinkDialog
                folderId={folderId}
                linkId={link.id.toString()}
                handleCloseDialog={() => setOpenDialog(false)}
                open={openDialog}
              />
            )}
          </>
        )}
      </CardActions>
    </Card>
  )
}
