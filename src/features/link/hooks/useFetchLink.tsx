import { useState } from 'react'

import { Folder } from '@/features/folder/types/Folder'
import { Link } from '@/features/link/types/Link'
import { apiClient } from '@/lib/axios/apiClient'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchLink = {
  errorMessage: string
  fetchLink: (id: string) => Promise<void>
  link?: Link
  isFeatchLoading: boolean
  myFolders?: Folder[]
}

export const useFetchLink = (): UseFetchLink => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isFeatchLoading, setIsLoading] = useState(false)
  const [link, setLink] = useState<Link | undefined>()
  const [myFolders, setMyFolders] = useState<Folder[] | undefined>()
  const headers = authHeaders()

  const fetchLink = async (id: string): Promise<void> => {
    setIsLoading(true)
    setErrorMessage('')

    await apiClient
      .get(`/links/${id}`, { headers })
      .then((res) => {
        setLink(res.data.link)
        setMyFolders(res.data.folders)
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
    fetchLink,
    isFeatchLoading,
    link,
    myFolders,
  }
}
