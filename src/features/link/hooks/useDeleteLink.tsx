import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseDeleteLink = {
  deleteLink: (folderId: string, linkId: string) => Promise<void>
  errorMessage: string
  isLoading: boolean
  resStatus: number
}

export const useDeleteLink = (): UseDeleteLink => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [resStatus, setResStatus] = useState(0)
  const setAlert = useSetRecoilState(alertState)
  const headers = authHeaders()
  const navigate = useNavigate()

  const deleteLink = async (folderId: string, linkId: string): Promise<void> => {
    setIsLoading(true)

    await apiClient
      .delete(`/links/${linkId}`, { headers })
      .then((res) => {
        setResStatus(res.status)
        navigate(`/folder/${folderId}`)
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
    deleteLink,
    errorMessage,
    isLoading,
    resStatus,
  }
}
