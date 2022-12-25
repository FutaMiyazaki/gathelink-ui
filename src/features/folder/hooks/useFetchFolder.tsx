import { Dispatch, SetStateAction, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { Folder } from '@/features/folder/types/Folder'
import { apiClient } from '@/lib/axios/apiClient'
import { folderHasLinksState } from '@/states/FolderHasLinksAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchFolder = {
  errorMessage: string
  fetchFolder: (id: string, sort?: string) => Promise<void>
  folder?: Folder
  setFolder: Dispatch<SetStateAction<Folder | undefined>>
  isFeatchLoading: boolean
  isOwner: boolean
  resStatus: number
}

export const useFetchFolder = (): UseFetchFolder => {
  const [errorMessage, setErrorMessage] = useState('')
  const [folder, setFolder] = useState<Folder | undefined>()
  const [isOwner, setIsOwner] = useState(false)
  const [isFeatchLoading, setIsLoading] = useState(false)
  const [resStatus, setResStatus] = useState(0)
  const setFolderHasLinks = useSetRecoilState(folderHasLinksState)
  const headers = authHeaders()

  const fetchFolder = async (id: string, sort?: string): Promise<void> => {
    setIsLoading(true)
    setResStatus(0)
    setErrorMessage('')

    await apiClient
      .get(sort !== undefined ? `/folders/${id}?sort=${sort}` : `/folders/${id}`, { headers })
      .then((res) => {
        setResStatus(res.status)
        setIsOwner(res.data.is_owner)
        setFolder(res.data.folder)
        setFolderHasLinks(res.data.links)
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
    setFolder,
    isFeatchLoading,
    isOwner,
    resStatus,
  }
}
