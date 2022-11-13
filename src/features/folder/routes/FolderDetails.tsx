import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import UpdateIcon from '@mui/icons-material/Update'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { parseISO } from 'date-fns'
import { useEffect, FC, useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { DisplayTypeMenu } from '@/components/Elements/Form/RadioGroup'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { FavoriteFolderButton } from '@/features/favoriteFolder/components/FavoriteFolderButton'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { LinkCard } from '@/features/link/components/LinkCard'
import { LinkListItem } from '@/features/link/components/LinkListItem'
import { Link } from '@/features/link/types/Link'
import { NotFound } from '@/features/misc/routes/NotFound'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { folderHasLinksState } from '@/states/FolderHasLinksAtom'
import { diffTime } from '@/utils/date'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

type RouterParams = {
  folderId: string
}

export const FolderDetails: FC = () => {
  const [displayFormat, setDisplayFormat] = useState('list')
  const folderHasLinks = useRecoilValue(folderHasLinksState)
  const authenticated = useRecoilValue(isAuthenticatedState)
  const { folderId } = useParams<RouterParams>()
  const { errorMessage, fetchFolder, folder, isFeatchLoading, isOwner, resStatus } =
    useFetchFolder()

  const handleChangeDisplay = (e: ChangeEvent<HTMLInputElement>): void => {
    setDisplayFormat((e.target as HTMLInputElement).value)
  }

  useEffect(() => {
    folderId !== undefined && fetchFolder(folderId)
  }, [folderId])

  if (isFeatchLoading) return <PageLoading />

  if (!isFeatchLoading && resStatus === 404) {
    return <NotFound />
  }

  return (
    <Container maxWidth='lg'>
      {errorMessage !== '' && (
        <Alert icon={false} severity='error' sx={{ mb: 4 }}>
          {errorMessage}
        </Alert>
      )}
      <Box>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ mb: 1 }}>
          <Typography
            variant='h1'
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {folder?.name}
          </Typography>
          {authenticated ? (
            <FavoriteFolderButton
              folderId={folderId as string}
              favoritedData={folder?.folder_favorites}
            />
          ) : (
            <IconButton>
              <StarBorderRoundedIcon />
            </IconButton>
          )}
        </Stack>
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid xs={12} sm='auto'>
            <Chip
              icon={<AccountCircleOutlinedIcon />}
              label={`作成者：${folder?.user?.name as string}`}
              variant='outlined'
              sx={{
                border: 'none',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            />
          </Grid>
          <Grid>
            <Chip
              icon={<AccessTimeOutlinedIcon />}
              label={`作成：${diffTime(new Date(), parseISO(folder?.created_at as string))}`}
              variant='outlined'
              sx={{ border: 'none' }}
            />
          </Grid>
          <Grid>
            <Chip
              icon={<UpdateIcon />}
              label={`更新：${diffTime(new Date(), parseISO(folder?.updated_at as string))}`}
              variant='outlined'
              sx={{ border: 'none' }}
            />
          </Grid>
        </Grid>
        {folder?.description !== null && (
          <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap', px: 1 }}>
            {folder?.description}
          </Typography>
        )}
        {isOwner && (
          <>
            <Stack direction='row' alignItems='center' spacing={1} sx={{ mt: 2 }}>
              <Button icon={<ShareOutlinedIcon />} label='共有' variant='outlined' />
              <LinkButton
                color='secondary'
                icon={<EditOutlinedIcon />}
                label='編集'
                path={`/folder/${folderId as string}/edit`}
              />
            </Stack>
          </>
        )}
      </Box>
      {folderHasLinks.length > 0 ? (
        <>
          <Stack direction='row' justifyContent='flex-end' sx={{ mb: 1 }}>
            <DisplayTypeMenu handleChange={handleChangeDisplay} displayFormat={displayFormat} />
          </Stack>
          {displayFormat === 'list' && (
            <Stack direction='column' spacing={3} sx={{ ...whiteBackgroundProps, p: 2 }}>
              {folderHasLinks?.map((link: Link) => {
                return (
                  <LinkListItem
                    key={link.id}
                    folderId={folderId as string}
                    link={link}
                    isOwner={isOwner}
                  />
                )
              })}
            </Stack>
          )}
          {displayFormat === 'card' && (
            <Grid container columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={1}>
              {folderHasLinks?.map((link: Link) => {
                return (
                  <Grid key={link.id} xs={1}>
                    <LinkCard folderId={folderId as string} isOwner={isOwner} link={link} />
                  </Grid>
                )
              })}
            </Grid>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant='body2'>リンクはありません</Typography>
        </Box>
      )}
    </Container>
  )
}
