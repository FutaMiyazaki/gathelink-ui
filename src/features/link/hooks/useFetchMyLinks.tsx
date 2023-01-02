import { useState } from 'react'

import { Link } from '@/features/link/types/Link'
import { apiClient } from '@/lib/axios/apiClient'
import { SortType } from '@/types/SortType'
import { authHeaders } from '@/utils/authHeaders'

type UseFetchMyLinks = {
  fetchMyLinks: (page: string, sortType: SortType) => Promise<void>
  isFetching: boolean
  errorMessage: string
  myLinks?: Link[]
  totalPages?: number
}

export const useFetchMyLinks = (): UseFetchMyLinks => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [myLinks, setMyLinks] = useState<Link[] | undefined>()
  const [totalPages, setTotalPages] = useState<number>()
  const headers = authHeaders()

  const fetchMyLinks = async (page: string, sortType: SortType): Promise<void> => {
    setIsFetching(true)
    setErrorMessage('')

    await apiClient
      .get(`/my_links?page=${page}&sort=${sortType}`, { headers })
      .then((res) => {
        setMyLinks(res.data.links)
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
    errorMessage,
    fetchMyLinks,
    isFetching,
    myLinks,
    totalPages,
  }
}
