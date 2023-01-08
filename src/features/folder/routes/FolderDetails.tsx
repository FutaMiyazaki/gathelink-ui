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
import List from '@mui/material/List'
import { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { parseISO } from 'date-fns'
import { useEffect, FC, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { DisplayTypeButtonGroup } from '@/components/features/DisplayTypeButtonGroup'
import { DisplayType } from '@/components/features/DisplayTypeButtonGroup/displayTypeItems'
import { SortSelect } from '@/components/features/SortSelect'
import { sortItems } from '@/components/features/SortSelect/sortItems'
import { NoContents } from '@/components/Layouts/NoContents'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { FavoriteFolderButton } from '@/features/favoriteFolder/components/FavoriteFolderButton'
import { SetColorAndIconDialog } from '@/features/folder/components/Dialog/SetColorAndIconDialog'
import { ShareFolderDialog } from '@/features/folder/components/Dialog/ShareFolderDialog'
import { DynamicIcon } from '@/features/folder/components/DynamicIcon'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { LinkCard } from '@/features/link/components/LinkCard'
import { LinkListItem } from '@/features/link/components/LinkListItem'
import { Link } from '@/features/link/types/Link'
import { NotFound } from '@/features/misc/routes/NotFound'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { folderHasLinksState } from '@/states/FolderHasLinksAtom'
import { RouterParams } from '@/types/RouterParams'
import { SortType } from '@/types/SortType'
import { diffTime } from '@/utils/date'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

export const FolderDetails: FC = () => {
  const [sortType, setSortType] = useState<SortType>('created_asc')
  const [displayType, setDisplayType] = useState<DisplayType>('list')
  const [isOpenShareFolderDialog, setIsOpenShareFolderDialog] = useState(false)
  const [isOpenSetColorDialog, setIsOpenSetColorDialog] = useState(false)
  const folderHasLinks = useRecoilValue(folderHasLinksState)
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const { folderId } = useParams<RouterParams>()
  const { errorMessage, fetchFolder, folder, setFolder, isFetching, isOwner, resStatus } =
    useFetchFolder()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangeSort = (e: SelectChangeEvent): void => {
    const newSortType = (e.target as HTMLInputElement).value as SortType
    setSortType(newSortType)
    setSearchParams({ sort: newSortType })
  }

  useEffect(() => {
    folderId !== undefined && fetchFolder(folderId, sortType)
  }, [folderId, sortType])

  if (isFetching) return <PageLoading />

  if (!isFetching && resStatus === 404) return <NotFound />

  return (
    <Container maxWidth='xl'>
      {errorMessage !== '' && (
        <Alert icon={false} severity='error' sx={{ mb: 4 }}>
          {errorMessage}
        </Alert>
      )}
      <Box>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip
              title={
                <Typography component='span' variant='subtitle2'>
                  色・アイコンを変更
                </Typography>
              }
              arrow
            >
              <IconButton onClick={() => setIsOpenSetColorDialog(true)}>
                {DynamicIcon(folder?.icon, 'large', folder?.color)}
              </IconButton>
            </Tooltip>
            <SetColorAndIconDialog
              isOpenDialog={isOpenSetColorDialog}
              setIsOpenDialog={setIsOpenSetColorDialog}
              folder={folder}
              setFolder={setFolder}
            />
            <Typography
              variant='h1'
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                ml: 1,
              }}
            >
              {folder?.name}
            </Typography>
          </Box>
          {isAuthenticated ? (
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
                color: 'secondary.dark',
                fontWeight: 'bold',
              }}
            />
          </Grid>
          <Grid>
            <Chip
              icon={<AccessTimeOutlinedIcon />}
              label={`作成：${diffTime(new Date(), parseISO(folder?.created_at as string))}`}
              variant='outlined'
              sx={{ border: 'none', color: 'secondary.dark', fontWeight: 'bold' }}
            />
          </Grid>
          <Grid>
            <Chip
              icon={<UpdateIcon />}
              label={`更新：${diffTime(new Date(), parseISO(folder?.updated_at as string))}`}
              variant='outlined'
              sx={{ border: 'none', color: 'secondary.dark', fontWeight: 'bold' }}
            />
          </Grid>
        </Grid>
        {folder?.description !== null && (
          <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap', px: 1 }}>
            {folder?.description}
          </Typography>
        )}
        <Stack direction='row' alignItems='center' spacing={1} sx={{ mt: 2, mb: 3 }}>
          {folder?.user !== undefined && (
            <>
              <Button
                onClick={() => setIsOpenShareFolderDialog(true)}
                icon={<ShareOutlinedIcon />}
                label='共有'
                variant='outlined'
              />
              <ShareFolderDialog
                isOpenDialog={isOpenShareFolderDialog}
                setIsOpenDialog={setIsOpenShareFolderDialog}
                folderName={folder.name}
                ownerName={folder.user.name}
              />
            </>
          )}
          {isOwner && (
            <LinkButton
              color='secondary'
              icon={<EditOutlinedIcon />}
              label='編集'
              path={`/folder/${folderId as string}/edit`}
            />
          )}
        </Stack>
      </Box>
      {folderHasLinks.length > 0 ? (
        <>
          <Stack direction='row' justifyContent='flex-end' alignItems='center' sx={{ mb: 3 }}>
            <SortSelect sort={sortType} selectItems={sortItems} handleChange={handleChangeSort} />
            <DisplayTypeButtonGroup displayType={displayType} setDisplayType={setDisplayType} />
          </Stack>
          {displayType === 'list' && (
            <List sx={{ ...whiteBackgroundProps, pl: 1, pr: 0, py: 2 }}>
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
            </List>
          )}
          {displayType === 'card' && (
            <Grid container columns={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3}>
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
        <NoContents message='作成したリンクはありません' />
      )}
    </Container>
  )
}
