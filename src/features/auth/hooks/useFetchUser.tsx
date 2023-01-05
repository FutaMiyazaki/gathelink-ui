import { useState } from 'react'

import { apiClient } from '@/lib/axios/apiClient'
import { authHeaders } from '@/utils/authHeaders'

type UserData = {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

type UseFetchUser = {
  fetchUser: () => Promise<void>
  isFetching: boolean
  currentUserData?: UserData
}

export const useFetchUser = (): UseFetchUser => {
  const [isFetching, setIsFetching] = useState(false)
  const headers = authHeaders()
  const [currentUserData, setCurrentUserData] = useState<UserData>()

  const fetchUser = async (): Promise<void> => {
    setIsFetching(true)

    await apiClient
      .get('/auth/show_current_user', { headers })
      .then((res) => {
        setCurrentUserData({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          created_at: res.data.created_at,
          updated_at: res.data.updated_at,
        })
      })
      .catch(() => {})
      .finally(() => {
        setIsFetching(false)
      })
  }

  return {
    fetchUser,
    isFetching,
    currentUserData,
  }
}
