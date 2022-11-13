import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { FoldersList } from '@/features/folder/components/Sidebar/FoldersList'
import { useFetchFavoritedFolders } from '@/features/folder/hooks/useFetchFavoritedFolders'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'

export const FavoritedFoldersList: FC = () => {
  const favoritedFolders = useRecoilValue(favoritedFoldersState)
  const { errorMessage, fetchFavoritedFolders, isFeatching } = useFetchFavoritedFolders()

  useEffect(() => {
    fetchFavoritedFolders('old')
  }, [])

  return (
    <Box sx={{ mb: 2 }}>
      <Stack alignItems='center' direction='row' sx={{ pl: 2 }}>
        <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold' }}>
          お気に入り
        </Typography>
      </Stack>
      <FoldersList
        errorMessage={errorMessage}
        folders={favoritedFolders}
        isLoading={isFeatching}
        noContentsText='お気に入りフォルダはありません'
      />
    </Box>
  )
}
