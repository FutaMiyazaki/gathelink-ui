import { setCookie } from 'nookies'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { isAuthenticatedState } from '@/states/AuthAtom'

type USEGuestLogin = {
  isLoading: boolean
  guestLogin: () => Promise<void>
}

export const useGuestLogin = (): USEGuestLogin => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setAuthenticated = useSetRecoilState(isAuthenticatedState)
  const setAlert = useSetRecoilState(alertState)

  const guestLogin = async (): Promise<void> => {
    setIsLoading(true)
    const option = {
      maxAge: 1 * 24 * 60 * 60,
      path: '/',
    }

    await apiClient
      .post('/auth/guest_sign_in')
      .then((res) => {
        res.headers['access-token'] != null &&
          setCookie(null, 'accessToken', res.headers['access-token'], option)
        res.headers.client != null && setCookie(null, 'client', res.headers.client, option)
        res.headers.uid != null && setCookie(null, 'uid', res.headers.uid, option)
        setAuthenticated(true)
        navigate('/')
        setAlert({ isShow: true, message: 'ゲストユーザーでログインしました', severity: 'success' })
      })
      .catch(() => {
        setAlert({
          isShow: true,
          message: 'ログインに失敗しました。管理者までご連絡ください。',
          severity: 'error',
        })
      })
    setIsLoading(false)
  }

  return {
    isLoading,
    guestLogin,
  }
}
