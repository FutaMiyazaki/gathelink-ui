import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { Folder } from '@/features/folder/types/Folder'
import { apiClient } from '@/lib/axios/apiClient'
import { EditingLinksState } from '@/states/EditingLinksAtom'

type UseFetchFolder = {
  errorMessage: string
  fetchFolder: (id: string) => Promise<void>
  folder?: Folder
  isFeatchLoading: boolean
  resStatus: number
}

export const useFetchFolder = (): UseFetchFolder => {
  const [isFeatchLoading, setIsLoading] = useState(false)
  const [resStatus, setResStatus] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [folder, setFolder] = useState<Folder | undefined>()
  const setEditingLinks = useSetRecoilState(EditingLinksState)

  const fetchFolder = async (id: string): Promise<void> => {
    setIsLoading(true)
    setResStatus(0)
    setErrorMessage('')

    await apiClient
      .get(`/folders/${id}`)
      .then((res) => {
        setResStatus(res.status)
        setFolder(res.data)
        setEditingLinks(res.data.links)
      })
      .catch((err) => {
        setResStatus(err.response.status)
        setErrorMessage(err.response.data.error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    errorMessage,
    fetchFolder,
    folder,
    isFeatchLoading,
    resStatus,
  }
}
