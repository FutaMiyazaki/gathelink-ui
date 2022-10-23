import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseUpdateLink = {
  updateLink: (link: params, linkId: string) => Promise<void>
  errorMessage: string
  isUpdating: boolean
}

type params = {
  title: string
  url: string
  folder_id: number
}

export const useUpdateLink = (): UseUpdateLink => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const setAlert = useSetRecoilState(alertState)
  const headers = authHeaders()
  const navigate = useNavigate()

  const updateLink = async (link: params, linkId: string): Promise<void> => {
    setIsUpdating(true)
    setErrorMessage('')

    await apiClient
      .patch(`/links/${linkId}`, { link }, { headers })
      .then((res) => {
        setAlert({
          isShow: true,
          message: `${res.data.title as string} リンクを更新しました`,
          severity: 'success',
        })
        navigate(`/folder/${link.folder_id}`)
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsUpdating(false)
      })
  }

  return {
    updateLink,
    errorMessage,
    isUpdating,
  }
}
