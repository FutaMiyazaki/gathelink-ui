import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { FolderFavorites } from '@/features/favoriteFolder/types'
import { apiClient } from '@/lib/axios/apiClient'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseCreateFavoriteFolder = {
  createFavoriteFolder: (folderId: string) => Promise<void>
  createResStatus: number
  favoriteData: FolderFavorites | undefined
  isCreating: boolean
}

export const useCreateFavoriteFolder = (): UseCreateFavoriteFolder => {
  const [isCreating, setIsCreating] = useState(false)
  const [favoriteData, setFavoriteData] = useState()
  const [createResStatus, setCreateResStatus] = useState(0)
  const setFavoritedFolders = useSetRecoilState(favoritedFoldersState)
  const headers = authHeaders()

  const createFavoriteFolder = async (folderId: string): Promise<void> => {
    setIsCreating(true)

    await apiClient
      .post('/folder_favorites', { folder_id: folderId }, { headers })
      .then((res) => {
        setFavoriteData(res.data.favorite)
        setFavoritedFolders(res.data.folders)
        setCreateResStatus(res.status)
      })
      .catch((err) => {
        setCreateResStatus(err.status)
      })
      .finally(() => {
        setIsCreating(false)
      })
  }

  return {
    createFavoriteFolder,
    createResStatus,
    favoriteData,
    isCreating,
  }
}