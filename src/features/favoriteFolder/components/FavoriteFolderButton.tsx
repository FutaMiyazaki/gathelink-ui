import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import { parseCookies } from 'nookies'
import { FC, useEffect, useState } from 'react'

import { useDeleteFavoriteFolder } from '@/features/favoriteFolder/hooks/useDeleteFavoriteFolder'
import { usePostFavoriteFolder } from '@/features/favoriteFolder/hooks/usePostFavoriteFolder'
import { FolderFavorites } from '@/features/favoriteFolder/types'

type FavoriteFolderButtonProps = {
  folderId: string
  favoritedData?: FolderFavorites[]
}

export const FavoriteFolderButton: FC<FavoriteFolderButtonProps> = ({
  folderId,
  favoritedData,
}) => {
  const cookie = parseCookies()
  const userId = cookie.userId
  const [isFavorited, setIsFavorited] = useState(
    favoritedData?.some((data) => data.user_id === parseInt(userId, 10)),
  )
  const [favorite, setFavorite] = useState(
    favoritedData?.find((data) => data.user_id === parseInt(userId, 10)),
  )
  const { postFavoriteFolder, createResStatus, favoriteData, isCreating } = usePostFavoriteFolder()
  const { deleteFavoriteFolder, isDeleting } = useDeleteFavoriteFolder()

  const handleCreateFavorite = (): void => {
    postFavoriteFolder(folderId)
    setIsFavorited(true)
  }

  const handleDeleteFavorite = (): void => {
    favorite !== undefined && deleteFavoriteFolder(favorite.id, folderId)
    setIsFavorited(false)
  }

  useEffect(() => {
    if (createResStatus === 201) {
      setFavorite(favoriteData)
    }
  }, [createResStatus, favoriteData])

  if (isCreating || isDeleting) return <CircularProgress size={30} />

  return (
    <IconButton
      onClick={
        isFavorited !== undefined && isFavorited ? handleDeleteFavorite : handleCreateFavorite
      }
    >
      {isFavorited !== undefined && isFavorited ? (
        <StarRoundedIcon sx={{ color: '#fdd835' }} />
      ) : (
        <StarBorderRoundedIcon />
      )}
    </IconButton>
  )
}
