import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { parseCookies } from 'nookies'
import { useEffect, FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { FavoriteFolderButton } from '@/features/favoriteFolder/components/FavoriteFolderButton'
import { DeleteFolderDialog } from '@/features/folder/components/DeleteFolderDialog'
import { FolderLinkButton } from '@/features/folder/components/FolderLinkButton'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { Link } from '@/features/link/types/Link'
import { isAuthenticatedState } from '@/states/AuthAtom'

type RouterParams = {
  folderId: string
}

export const FolderDetails: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const cookie = parseCookies()
  const uid = cookie.uid
  const { folderId } = useParams<RouterParams>()
  const authenticated = useRecoilValue(isAuthenticatedState)
  const { errorMessage, fetchFolder, folder, isFeatchLoading } = useFetchFolder()

  useEffect(() => {
    folderId !== undefined && fetchFolder(folderId)
  }, [folderId])

  if (isFeatchLoading) return <PageLoading />

  return (
    <Container maxWidth='sm'>
      {errorMessage !== '' && (
        <Alert icon={false} severity='error' sx={{ mb: 4 }}>
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 3, mb: 4 }}>
        <Stack alignItems='flex-start' direction='row' justifyContent='space-between'>
          <Box>
            <PageHeading text={folder?.name} />
            <Typography color='secondary.dark' variant='subtitle2'>
              作成者：{folder?.user?.name}
            </Typography>
          </Box>
          <FavoriteFolderButton
            folderId={folderId as string}
            favoritedData={folder?.folder_favorites}
          />
        </Stack>
        {authenticated && folder?.user?.email === uid && folderId !== undefined && (
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
                path={`/folder/${folderId}/edit`}
                variant='contained'
              />
              <Button
                color='warning'
                icon={<DeleteForeverOutlinedIcon />}
                label='削除'
                onClick={() => setOpenDialog(true)}
                variant='outlined'
              />
            </Stack>
            <DeleteFolderDialog
              folderId={folderId}
              handleCloseDialog={() => setOpenDialog(false)}
              open={openDialog}
            />
          </>
        )}
      </Box>
      {folder?.links != null && folder?.links.length > 0 ? (
        <Stack direction='column' spacing={3} sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 3 }}>
          {folder?.links?.map((link: Link) => {
            return (
              <FolderLinkButton
                key={link.id}
                folderId={folderId as string}
                link={link}
                ownerId={folder?.user?.email}
              />
            )
          })}
        </Stack>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant='body2'>リンクはありません</Typography>
        </Box>
      )}
    </Container>
  )
}
