import { setCookie } from 'nookies'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { currentUserState } from '@/states/CurrentUserAtom'

type UseGuestLogin = {
  isLoading: boolean
  guestLogin: () => Promise<void>
}

export const useGuestLogin = (): UseGuestLogin => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setAuthenticated = useSetRecoilState(isAuthenticatedState)
  const setCurrentUser = useSetRecoilState(currentUserState)
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
        res.data.data.id != null && setCookie(null, 'userId', res.data.data.id, option)
        res.data.data.name != null && setCookie(null, 'userName', res.data.data.name, option)
        setAuthenticated(true)
        setCurrentUser({ id: res.data.data.id, name: res.data.data.name })
        navigate('/')
        setAlert({ isShow: true, message: 'ゲストユーザーでログインしました' })
      })
      .catch(() => {
        setAlert({
          isShow: true,
          message: 'ログインに失敗しました。管理者までご連絡ください。',
        })
      })
    setIsLoading(false)
  }

  return {
    isLoading,
    guestLogin,
  }
}
