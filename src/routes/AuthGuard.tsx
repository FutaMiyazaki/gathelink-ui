import React, { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { isAuthenticatedState } from '@/states/AuthAtom'

type AuthGuardProps = {
  component: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = ({ component }) => {
  const authenticated = useRecoilValue(isAuthenticatedState)

  if (!authenticated) return <Navigate to='/login' replace={true} />

  return <>{component}</>
}
