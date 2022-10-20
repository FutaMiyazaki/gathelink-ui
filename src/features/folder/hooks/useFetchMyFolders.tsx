import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchMyFolders = {
  errorMessage: string
  fetchMyFolders: () => Promise<void>
  isLoading: boolean
}

export const useFetchMyFolders = (): UseFetchMyFolders => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setMyFolders = useSetRecoilState(myFoldersState)
  const headers = authHeaders()

  const fetchMyFolders = async (): Promise<void> => {
    setIsLoading(true)
    setErrorMessage('')

    await apiClient
      .get('/my_folder_list', { headers })
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
