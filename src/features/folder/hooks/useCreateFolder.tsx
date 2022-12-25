import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseCreateFolder = {
  createFolder: (folder: params) => Promise<void>
  errorMessage: string
  isLoading: boolean
  resStatus: number
}

type params = {
  name: string
}

export const useCreateFolder = (): UseCreateFolder => {
  const [isLoading, setIsLoading] = useState(false)
  const [resStatus, setResStatus] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const setAlert = useSetRecoilState(alertState)
  const setMyFolders = useSetRecoilState(myFoldersState)
  const headers = authHeaders()

  const createFolder = async (folder: params): Promise<void> => {
    setIsLoading(true)
    setResStatus(0)
    setErrorMessage('')

    await apiClient
      .post('/folders', { folder }, { headers })
      .then((res) => {
        setAlert({
          isShow: true,
          message: 'フォルダを作成しました',
        })
        setResStatus(res.status)
        setMyFolders((prevMyFolders) => {
          const newMyFolders = [...prevMyFolders, res.data]
          return newMyFolders
        })
      })
      .catch((err) => {
        setErrorMessage(err.response.data.base[0])
        setResStatus(err.status)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    createFolder,
    errorMessage,
    isLoading,
    resStatus,
  }
}
