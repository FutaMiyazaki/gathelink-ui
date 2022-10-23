import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseDeleteFolder = {
  deleteFolder: (id: string) => Promise<void>
  errorMessage: string
  isLoading: boolean
  resStatus: number
}

export const useDeleteFolder = (): UseDeleteFolder => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [resStatus, setResStatus] = useState(0)
  const setAlert = useSetRecoilState(alertState)
  const [myFolders, setMyFolders] = useRecoilState(myFoldersState)
  const headers = authHeaders()
  const navigate = useNavigate()

  const deleteFolder = async (id: string): Promise<void> => {
    setIsLoading(true)

    await apiClient
      .delete(`/folders/${id}`, { headers })
      .then((res) => {
        const afterFolders = myFolders.filter((link) => {
          return link.id.toString() !== id
        })
        setResStatus(res.status)
        setMyFolders(afterFolders)
        navigate('/')
        setAlert({
          isShow: true,
          message: 'フォルダを削除しました',
          severity: 'success',
        })
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setResStatus(err.status)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    deleteFolder,
    errorMessage,
    isLoading,
    resStatus,
  }
}
