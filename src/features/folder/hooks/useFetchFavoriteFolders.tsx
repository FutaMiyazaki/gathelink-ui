import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { favoriteFoldersState } from '@/states/FavoriteFolders'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchFavoriteFolders = {
  errorMessage: string
  fetchFavoriteFolders: (sortType: string) => Promise<void>
  isFetching: boolean
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
      .get(`/favorited_folders_list?sort=${sortType}`, { headers })
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
    errorMessage,
    fetchFavoriteFolders,
    isFetching,
  }
}
