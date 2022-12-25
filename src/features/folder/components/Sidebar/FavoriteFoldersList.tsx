import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { FoldersList } from '@/features/folder/components/Sidebar/FoldersList'
import { useFetchFavoriteFolders } from '@/features/folder/hooks/useFetchFavoriteFolders'
import { favoriteFoldersState } from '@/states/FavoriteFolders'

export const FavoriteFoldersList: FC = () => {
  const favoriteFolders = useRecoilValue(favoriteFoldersState)
  const { errorMessage, fetchFavoriteFolders, isFetching } = useFetchFavoriteFolders()

  useEffect(() => {
    fetchFavoriteFolders('old')
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
        folders={favoriteFolders}
        isLoading={isFetching}
        noContentsText='お気に入りフォルダはありません'
      />
    </Box>
  )
}
