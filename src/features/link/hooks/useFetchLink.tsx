import { useState } from 'react'

import { Folder } from '@/features/folder/types/Folder'
import { Link } from '@/features/link/types/Link'
import { apiClient } from '@/lib/axios/apiClient'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchLink = {
  errorMessage: string
  fetchLink: (id: string) => Promise<void>
  link?: Link
  isFetching: boolean
  myFolders?: Folder[]
}

export const useFetchLink = (): UseFetchLink => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [link, setLink] = useState<Link | undefined>()
  const [myFolders, setMyFolders] = useState<Folder[] | undefined>()
  const headers = authHeaders()

  const fetchLink = async (id: string): Promise<void> => {
    setIsFetching(true)
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
        setIsFetching(false)
      })
  }

  return {
    errorMessage,
    fetchLink,
    isFetching,
    link,
    myFolders,
  }
}
