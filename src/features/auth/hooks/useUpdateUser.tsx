import { setCookie } from 'nookies'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { currentUserState } from '@/states/CurrentUserAtom'
import { authHeaders } from '@/utils/authHeaders'

type Params = {
  name?: string
  email?: string
  password?: string
}

type UseUpdateUser = {
  isUpdating: boolean
  updateUser: (user: Params, target: 'ユーザ情報' | 'パスワード') => Promise<void>
}

export const useUpdateUser = (): UseUpdateUser => {
  const [isUpdating, setIsUpdating] = useState(false)
  const setAlert = useSetRecoilState(alertState)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const headers = authHeaders()

  const updateUser = async (user: Params, target: 'ユーザ情報' | 'パスワード'): Promise<void> => {
    setIsUpdating(true)
    const option = {
      maxAge: 14 * 24 * 60 * 60,
      path: '/',
    }

    await apiClient
      .put('/auth', { ...user }, { headers })
      .then((res) => {
        res.headers['access-token'] != null &&
          setCookie(null, 'accessToken', res.headers['access-token'], option)
        res.headers.client != null && setCookie(null, 'client', res.headers.client, option)
        res.headers.uid != null && setCookie(null, 'uid', res.headers.uid, option)
        res.data.data.id != null && setCookie(null, 'userId', res.data.data.id, option)
        res.data.data.name != null && setCookie(null, 'userName', res.data.data.name, option)
        setCurrentUser({ ...currentUser, name: res.data.data.name })
        setAlert({ isShow: true, message: `${target}を更新しました` })
      })
      .catch(() => {
        setAlert({ isShow: true, message: `${target}の更新に失敗しました` })
      })
    setIsUpdating(false)
  }

  return {
    isUpdating,
    updateUser,
  }
}
