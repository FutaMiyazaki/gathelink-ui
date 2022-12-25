import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { FolderFavorites } from '@/features/favoriteFolder/types'
import { apiClient } from '@/lib/axios/apiClient'
import { favoriteFoldersState } from '@/states/FavoriteFolders'
import { authHeaders } from '@/utils/authHeaders'

type UsePostFavoriteFolder = {
  postFavoriteFolder: (folderId: string) => Promise<void>
  createResStatus: number
  favoriteData: FolderFavorites | undefined
  isCreating: boolean
}

export const usePostFavoriteFolder = (): UsePostFavoriteFolder => {
  const [isCreating, setIsCreating] = useState(false)
  const [favoriteData, setFavoriteData] = useState()
  const [createResStatus, setCreateResStatus] = useState(0)
  const setFavoriteFolders = useSetRecoilState(favoriteFoldersState)
  const headers = authHeaders()

  const postFavoriteFolder = async (folderId: string): Promise<void> => {
    setIsCreating(true)

    await apiClient
      .post('/folder_favorites', { folder_id: folderId }, { headers })
      .then((res) => {
        setFavoriteData(res.data.favorite)
        setFavoriteFolders(res.data.folders)
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
    postFavoriteFolder,
    createResStatus,
    favoriteData,
    isCreating,
  }
}
