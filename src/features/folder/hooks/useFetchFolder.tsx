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
}

export const useFetchFolder = (): UseFetchFolder => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isFeatchLoading, setIsLoading] = useState(false)
  const [folder, setFolder] = useState<Folder | undefined>()
  const setEditingLinks = useSetRecoilState(EditingLinksState)

  const fetchFolder = async (id: string): Promise<void> => {
    setIsLoading(true)
    setErrorMessage('')

    await apiClient
      .get(`/folders/${id}`)
      .then((res) => {
        setFolder(res.data)
        setEditingLinks(res.data.links)
      })
      .catch((err) => {
        setErrorMessage(err.message)
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
  }
}
