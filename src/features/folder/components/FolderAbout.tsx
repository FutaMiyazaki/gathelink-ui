import { Alert, Box, Container, Stack, Typography } from '@mui/material'
import { parseCookies } from 'nookies'
import { useEffect, FC } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { FolderLinkButton } from '@/features/folder/components/FolderLinkButton'
import { useFetchFolder } from '@/features/folder/hooks/useFetchFolder'
import { Link } from '@/features/link/types/Link'
import { isAuthenticatedState } from '@/states/AuthAtom'

type RouterParams = {
  folderId: string
}

export const FolderAbout: FC = () => {
  const cookie = parseCookies()
  const uid = cookie.uid
  const { folderId } = useParams<RouterParams>()

  const authenticated = useRecoilValue(isAuthenticatedState)
  const { errorMessage, fetchFolder, folder, isLoading } = useFetchFolder()

  useEffect(() => {
    folderId !== undefined && fetchFolder(folderId)
  }, [folderId])

  return (
    <div>
      <Container maxWidth='sm' sx={{ mt: 4 }}>
        {!isLoading && (
          <Box>
            {errorMessage !== '' && <Alert severity='error'>{errorMessage}</Alert>}
            <Box sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 2, mb: 3 }}>
              <Typography component='h1' variant='h6' sx={{ fontWeight: 'bold' }}>
                {folder?.name}
              </Typography>
              <Typography color='secondary.dark' variant='subtitle2'>
                作成者：{folder?.user?.name}
              </Typography>
              {authenticated && folder?.user?.email === uid && (
                <Stack
                  direction='row'
                  justifyContent='flex-end'
                  alignItems='center'
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  {folderId !== undefined && (
                    <LinkButton
                      color='secondary'
                      label='編集'
                      path={`/folder/${folderId}/edit`}
                      variant='contained'
                    />
                  )}
                </Stack>
              )}
            </Box>
            {folder?.links != null && folder?.links.length > 0 ? (
              <Stack
                direction='column'
                spacing={3}
                sx={{ bgcolor: '#ffffff', borderRadius: 4, p: 2 }}
              >
                {folder?.links?.map((link: Link) => {
                  return <FolderLinkButton key={link.id} label={link.title} url={link.url} />
                })}
              </Stack>
            ) : (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant='body2'>リンクはありません</Typography>
              </Box>
            )}
          </Box>
        )}
      </Container>
    </div>
  )
}
