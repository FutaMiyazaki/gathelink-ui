import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { Folder } from '@/features/folder/types/Folder'
import { apiClient } from '@/lib/axios/apiClient'
import { folderHasLinksState } from '@/states/FolderHasLinksAtom'

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
  const setFolderHasLinks = useSetRecoilState(folderHasLinksState)

  const fetchFolder = async (id: string): Promise<void> => {
    setIsLoading(true)
    setResStatus(0)
    setErrorMessage('')

    await apiClient
      .get(`/folders/${id}`)
      .then((res) => {
        setResStatus(res.status)
        setFolder(res.data)
        setFolderHasLinks(res.data.old_order_links)
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
