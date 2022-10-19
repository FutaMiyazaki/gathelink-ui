import { parseCookies } from 'nookies'
import { FC, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { commonRoutes } from '@/routes/common'
import { protectedRoutes } from '@/routes/protected'
import { publicRoutes } from '@/routes/public'
import { isAuthenticatedState } from '@/states/AuthAtom'

export const AppRoutes: FC = () => {
  const cookie = parseCookies()
  const [authenticated, setAuthenticated] = useRecoilState(isAuthenticatedState)

  useEffect(() => {
    if (
      !authenticated &&
      cookie.uid !== undefined &&
      cookie.client !== undefined &&
      cookie.accessToken !== undefined
    ) {
      setAuthenticated(true)
    }
  }, [authenticated])

  const routes = authenticated ? protectedRoutes : publicRoutes
  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
