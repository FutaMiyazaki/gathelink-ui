import { useState } from 'react'

import { Folder } from '@/features/folder/types/Folder'
import { apiClient } from '@/lib/axios/apiClient'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchTagFolders = {
  isFetching: boolean
  errorMessage: string
  fetchTagFolders: (tagId: string, page: string, sortType: string) => Promise<void>
  tag?: string
  folders?: Folder[]
  totalPages?: number
}

export const useFetchTagFolders = (): UseFetchTagFolders => {
  const [isFetching, setIsFetching] = useState(false)
  const [tag, setTag] = useState('')
  const [folders, setFolders] = useState<Folder[] | undefined>()
  const [totalPages, setTotalPages] = useState<number>()
  const [errorMessage, setErrorMessage] = useState('')
  const headers = authHeaders()

  const fetchTagFolders = async (tagId: string, page: string, sortType: string): Promise<void> => {
    setIsFetching(true)
    setErrorMessage('')

    await apiClient
      .get(`/folders/${tagId}/by_tag?page=${page}&sort=${sortType}`, { headers })
      .then((res) => {
        setTag(res.data.tag.name)
        setFolders(res.data.folders)
        setTotalPages(res.data.pagy.pages)
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  return {
    isFetching,
    errorMessage,
    fetchTagFolders,
    tag,
    folders,
    totalPages,
  }
}
