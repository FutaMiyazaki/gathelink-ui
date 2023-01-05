import { setCookie } from 'nookies'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { currentUserState } from '@/states/CurrentUserAtom'

type Params = {
  email: string
  password: string
}

type UseLogin = {
  isLoading: boolean
  errorMessage: string
  login: (params: Params) => Promise<void>
}

export const useLogin = (): UseLogin => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const setAuthenticated = useSetRecoilState(isAuthenticatedState)
  const setCurrentUser = useSetRecoilState(currentUserState)
  const setAlert = useSetRecoilState(alertState)

  const login = async (params: Params): Promise<void> => {
    setIsLoading(true)
    const option = {
      maxAge: 14 * 24 * 60 * 60,
      path: '/',
    }

    await apiClient
      .post('/auth/sign_in', params)
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
        setAlert({ isShow: true, message: 'ログインに成功しました' })
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errors.full_messages)
      })
    setIsLoading(false)
  }

  return {
    isLoading,
    errorMessage,
    login,
  }
}
