import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { favoriteFoldersState } from '@/states/FavoriteFolders'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchFavoriteFolders = {
  isFetching: boolean
  errorMessage: string
  fetchFavoriteFolders: (sortType: string) => Promise<void>
}

export const useFetchFavoriteFolders = (): UseFetchFavoriteFolders => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const setFavoriteFolders = useSetRecoilState(favoriteFoldersState)
  const headers = authHeaders()

  const fetchFavoriteFolders = async (sortType: string): Promise<void> => {
    setIsFetching(true)
    setErrorMessage('')

    await apiClient
      .get(`/favorite_folders?sort=${sortType}`, { headers })
      .then((res) => {
        setFavoriteFolders(res.data)
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  return {
    isFetching,
    errorMessage,
    fetchFavoriteFolders,
  }
}
