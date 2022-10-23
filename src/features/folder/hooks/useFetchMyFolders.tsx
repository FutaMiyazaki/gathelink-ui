import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { FoldersSortType } from '@/features/folder/types/FoldersSortType'
import { apiClient } from '@/lib/axios/apiClient'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchMyFolders = {
  errorMessage: string
  fetchMyFolders: (sortType: FoldersSortType) => Promise<void>
  isLoading: boolean
}

export const useFetchMyFolders = (): UseFetchMyFolders => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setMyFolders = useSetRecoilState(myFoldersState)
  const headers = authHeaders()

  const fetchMyFolders = async (sortType: FoldersSortType): Promise<void> => {
    setIsLoading(true)
    setErrorMessage('')

    await apiClient
      .get(`/my_folder_list?sort=${sortType}`, { headers })
      .then((res) => {
        setMyFolders(res.data)
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    errorMessage,
    fetchMyFolders,
    isLoading,
  }
}
