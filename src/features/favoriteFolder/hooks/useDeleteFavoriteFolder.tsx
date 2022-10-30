import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseDeleteFavoriteFolder = {
  deleteFavoriteFolder: (favoriteId: number, folderId: string) => Promise<void>
  deleteResStatus: number
  isDeleting: boolean
}

export const useDeleteFavoriteFolder = (): UseDeleteFavoriteFolder => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteResStatus, setDeleteResStatus] = useState(0)
  const [favoritedFolders, setFavoritedFolders] = useRecoilState(favoritedFoldersState)

  const headers = authHeaders()

  const deleteFavoriteFolder = async (favoriteId: number, folderId: string): Promise<void> => {
    setIsDeleting(true)

    await apiClient
      .delete(`/folder_favorites/${favoriteId}`, { headers })
      .then((res) => {
        setDeleteResStatus(res.status)
        const afterFavoritedFolders = favoritedFolders.filter((folder) => {
          return folder.id.toString() !== folderId
        })
        setFavoritedFolders(afterFavoritedFolders)
      })
      .catch((err) => {
        setDeleteResStatus(err.status)
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  return {
    deleteFavoriteFolder,
    deleteResStatus,
    isDeleting,
  }
}
