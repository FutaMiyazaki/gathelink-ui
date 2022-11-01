import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
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
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resStatus, setResStatus] = useState(0)
  const setAlert = useSetRecoilState(alertState)
  const headers = authHeaders()

  const createFolder = async (folder: params): Promise<void> => {
    setIsLoading(true)
    setErrorMessage('')

    await apiClient
      .post('/folders', { folder }, { headers })
      .then((res) => {
        setAlert({
          isShow: true,
          message: 'フォルダを作成しました',
          severity: 'success',
        })
        setResStatus(res.status)
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
