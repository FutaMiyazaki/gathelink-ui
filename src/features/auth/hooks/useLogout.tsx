import { destroyCookie } from 'nookies'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseLogout = {
  isLoading: boolean
  logout: () => Promise<void>
}

export const useLogout = (): UseLogout => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setAuthenticated = useSetRecoilState(isAuthenticatedState)
  const setAlert = useSetRecoilState(alertState)
  const headers = authHeaders()

  const logout = async (): Promise<void> => {
    setIsLoading(true)
    const option = {
      path: '/',
    }

    await apiClient
      .delete('/auth/sign_out', { headers })
      .then(() => {
        setAuthenticated(false)
        setAlert({ isShow: true, message: 'ログアウトに成功しました' })
        destroyCookie(null, 'accessToken', option)
        destroyCookie(null, 'client', option)
        destroyCookie(null, 'uid', option)
        destroyCookie(null, 'userId', option)
        destroyCookie(null, 'userName', option)
      })
      .catch(() => {
        setAlert({ isShow: true, message: 'ログアウトに失敗しました' })
      })
    setIsLoading(false)
    navigate('/')
  }

  return {
    isLoading,
    logout,
  }
}
