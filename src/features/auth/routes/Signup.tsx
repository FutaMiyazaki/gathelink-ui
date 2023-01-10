import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { SignupForm } from '@/features/auth/components/SignupForm'
import { isAuthenticatedState } from '@/states/AuthAtom'

export const Signup: FC = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState)

  if (isAuthenticated) return <Navigate to='/myfolders?sort=created_asc' replace={false} />

  return <SignupForm />
}
