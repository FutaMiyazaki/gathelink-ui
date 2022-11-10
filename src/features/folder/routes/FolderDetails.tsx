import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { parseISO } from 'date-fns'
import { parseCookies } from 'nookies'
import { useEffect, FC, useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { DisplayTypeMenu } from '@/components/Elements/Form/RadioGroup'
import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { FavoriteFolderButton } from '@/features/favoriteFolder/components/FavoriteFolderButton'
import { DeleteFolderDialog } from '@/features/folder/components/Dialog/DeleteFolderDialog'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { LinkCard } from '@/features/link/components/LinkCard'
import { LinkListItem } from '@/features/link/components/LinkListItem'
import { Link } from '@/features/link/types/Link'
import { NotFound } from '@/features/misc/routes/NotFound'
import { folderHasLinksState } from '@/states/FolderHasLinksAtom'
import { diffTime } from '@/utils/date'

type RouterParams = {
  folderId: string
}

export const FolderDetails: FC = () => {
  const folderHasLinks = useRecoilValue(folderHasLinksState)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [displayFormat, setDisplayFormat] = useState('list')
  const cookie = parseCookies()
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
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 3, mb: 4 }}>
        <Stack alignItems='flex-start' direction='row' justifyContent='space-between'>
          <Box>
            <PageHeading text={folder?.name} />
            {folder?.description !== null && (
              <Typography variant='body2' sx={{ my: 1, whiteSpace: 'pre-wrap' }}>
                {folder?.description}
              </Typography>
            )}
            <Typography color='secondary.dark' variant='body2'>
              作成者：{folder?.user?.name}
            </Typography>
            <Typography color='secondary.dark' variant='body2'>
              {diffTime(new Date(), parseISO(folder?.created_at as string))}
            </Typography>
          </Box>
          <FavoriteFolderButton
            folderId={folderId as string}
            favoritedData={folder?.folder_favorites}
          />
        </Stack>
        {isOwner && (
          <>
            <Stack
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
              spacing={2}
              sx={{ mt: 2 }}
            >
              <LinkButton
                color='secondary'
                icon={<EditOutlinedIcon />}
                label='編集'
                path={`/folder/${folderId as string}/edit`}
                variant='contained'
              />
              <Button
                color='warning'
                icon={<DeleteForeverOutlinedIcon />}
                label='削除'
                onClick={() => setOpenDialog(true)}
                variant='text'
              />
            </Stack>
            <DeleteFolderDialog
              folderId={folderId as string}
              handleCloseDialog={() => setOpenDialog(false)}
              open={openDialog}
            />
          </>
        )}
      </Box>
      <Stack direction='row' justifyContent='flex-end'>
        <DisplayTypeMenu handleChange={handleChangeDisplay} displayFormat={displayFormat} />
      </Stack>
      {folderHasLinks.length > 0 ? (
        <>
          {displayFormat === 'list' && (
            <Stack
              direction='column'
              spacing={3}
              sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 3 }}
            >
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
            <Grid container columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ mx: 0.5 }}>
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
