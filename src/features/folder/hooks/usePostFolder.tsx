import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UsePostFolder = {
  postFolder: (folder: params) => Promise<void>
  errorMessage: string
  isPosting: boolean
  resStatus: number
}

type params = {
  name: string
  color: string
  tags: string[]
}

export const usePostFolder = (): UsePostFolder => {
  const [isPosting, setIsPosting] = useState(false)
  const [resStatus, setResStatus] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const setAlert = useSetRecoilState(alertState)
  const setMyFolders = useSetRecoilState(myFoldersState)
  const headers = authHeaders()

  const postFolder = async (folder: params): Promise<void> => {
    setIsPosting(true)
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
        setIsPosting(false)
      })
  }

  return {
    postFolder,
    errorMessage,
    isPosting,
    resStatus,
  }
}
