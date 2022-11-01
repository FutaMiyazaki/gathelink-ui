import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { EditingLinksState } from '@/states/EditingLinksAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseAddLink = {
  addLink: (link: params) => Promise<void>
  errorMessage: string
  isLoading: boolean
  resStatus: number
}

type params = {
  title: string
  url: string
  folder_id: number
}

export const useAddLink = (): UseAddLink => {
  const [isLoading, setIsLoading] = useState(false)
  const [resStatus, setResStatus] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const setAlert = useSetRecoilState(alertState)
  const setEditingLinks = useSetRecoilState(EditingLinksState)
  const headers = authHeaders()

  const addLink = async (link: params): Promise<void> => {
    setIsLoading(true)
    setResStatus(0)
    setErrorMessage('')

    await apiClient
      .post('/links', { link }, { headers })
      .then((res) => {
        setResStatus(res.status)
        setAlert({
          isShow: true,
          message: 'リンクを追加しました',
          severity: 'success',
        })
        setEditingLinks(res.data.links)
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
    addLink,
    errorMessage,
    isLoading,
    resStatus,
  }
}
