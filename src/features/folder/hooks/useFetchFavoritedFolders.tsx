import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchFavoritedFolders = {
  errorMessage: string
  fetchFavoritedFolders: (sortType: string) => Promise<void>
  isFeatching: boolean
}

export const useFetchFavoritedFolders = (): UseFetchFavoritedFolders => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isFeatching, setIsFeatching] = useState(false)
  const setFavoritedFolders = useSetRecoilState(favoritedFoldersState)
  const headers = authHeaders()

  const fetchFavoritedFolders = async (sortType: string): Promise<void> => {
    setIsFeatching(true)
    setErrorMessage('')

    await apiClient
      .get(`/favorited_folders_list?sort=${sortType}`, { headers })
      .then((res) => {
        setFavoritedFolders(res.data)
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsFeatching(false)
      })
  }

  return {
    errorMessage,
    fetchFavoritedFolders,
    isFeatching,
  }
}
