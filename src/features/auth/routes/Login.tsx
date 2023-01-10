import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { LoginForm } from '@/features/auth/components/LoginForm'
import { isAuthenticatedState } from '@/states/AuthAtom'

export const Login: FC = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState)

  if (isAuthenticated) return <Navigate to='/myfolders?sort=created_asc' replace={false} />

  return <LoginForm />
}
