import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { favoriteFoldersState } from '@/states/FavoriteFolders'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseUpdateFolder = {
  updateFolder: (folder: params, folderId: string) => Promise<void>
  errorMessage: string
  isLoading: boolean
}

type params = {
  name?: string
  description?: string
  color?: string
  icon?: string
}

export const useUpdateFolder = (): UseUpdateFolder => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setAlert = useSetRecoilState(alertState)
  const setMyFolders = useSetRecoilState(myFoldersState)
  const setFavoriteFolders = useSetRecoilState(favoriteFoldersState)
  const headers = authHeaders()
  const navigate = useNavigate()

  const updateFolder = async (folder: params, folderId: string): Promise<void> => {
    setIsLoading(true)
    setErrorMessage('')

    await apiClient
      .patch(`/folders/${folderId}`, { folder }, { headers })
      .then(() => {
        setAlert({
          isShow: true,
          message: 'フォルダを更新しました',
        })
        setMyFolders((prevMyFolders) => {
          return prevMyFolders.map((prevFolder) =>
            prevFolder.id.toString() === folderId ? { ...prevFolder, ...folder } : prevFolder,
          )
        })
        setFavoriteFolders((prevFavoriteFolders) => {
          return prevFavoriteFolders.map((prevFolder) =>
            prevFolder.id.toString() === folderId ? { ...prevFolder, ...folder } : prevFolder,
          )
        })
        navigate(`/folder/${folderId}`)
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    updateFolder,
    errorMessage,
    isLoading,
  }
}
