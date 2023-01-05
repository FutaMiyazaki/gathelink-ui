import StarRoundedIcon from '@mui/icons-material/StarRounded'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { ListItemIcon } from '@/components/Elements/ListItemIcon'
import { FoldersList } from '@/features/folder/components/Sidebar/FoldersList'
import { useFetchFavoriteFolders } from '@/features/folder/hooks/useFetchFavoriteFolders'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { favoriteFoldersState } from '@/states/FavoriteFolders'

export const FavoriteFoldersList: FC = () => {
  const favoriteFolders = useRecoilValue(favoriteFoldersState)
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const { errorMessage, fetchFavoriteFolders, isFetching } = useFetchFavoriteFolders()

  useEffect(() => {
    isAuthenticated && fetchFavoriteFolders('old')
  }, [])

  if (!isAuthenticated) return null

  return (
    <Box sx={{ mb: 2 }}>
      <ListItem dense>
        <ListItemIcon>
          <StarRoundedIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold' }}>
            お気に入り
          </Typography>
        </ListItemText>
      </ListItem>
      <FoldersList
        errorMessage={errorMessage}
        folders={favoriteFolders}
        isLoading={isFetching}
        noContentsMessage='お気に入りフォルダはありません'
      />
    </Box>
  )
}
