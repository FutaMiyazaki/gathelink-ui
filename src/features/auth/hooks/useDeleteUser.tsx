import { destroyCookie } from 'nookies'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseDeleteUser = {
  isDeleting: boolean
  deleteUser: () => Promise<void>
}

export const useDeleteUser = (): UseDeleteUser => {
  const [isDeleting, setIsDeleting] = useState(false)
  const setAuthenticated = useSetRecoilState(isAuthenticatedState)
  const setAlert = useSetRecoilState(alertState)
  const headers = authHeaders()
  const navigate = useNavigate()

  const deleteUser = async (): Promise<void> => {
    setIsDeleting(true)
    const option = {
      path: '/',
    }

    await apiClient
      .delete('/auth', { headers })
      .then(() => {
        destroyCookie(null, 'accessToken', option)
        destroyCookie(null, 'client', option)
        destroyCookie(null, 'uid', option)
        destroyCookie(null, 'userId', option)
        destroyCookie(null, 'userName', option)
        setAuthenticated(false)
        setAlert({ isShow: true, message: 'アカウントを削除しました' })
      })
      .catch(() => {
        setAlert({ isShow: true, message: 'アカウントの削除に失敗しました' })
      })
    setIsDeleting(false)
    navigate('/')
  }

  return {
    isDeleting,
    deleteUser,
  }
}
