import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchMyFolders = {
  errorMessage: string
  fetchMyFolders: (sortType: string) => Promise<void>
  isFeatching: boolean
}

export const useFetchMyFolders = (): UseFetchMyFolders => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isFeatching, setIsFeatching] = useState(false)
  const setMyFolders = useSetRecoilState(myFoldersState)
  const headers = authHeaders()

  const fetchMyFolders = async (sortType: string): Promise<void> => {
    setIsFeatching(true)
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
        setIsFeatching(false)
      })
  }

  return {
    errorMessage,
    fetchMyFolders,
    isFeatching,
  }
}
