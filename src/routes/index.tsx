import { parseCookies } from 'nookies'
import { FC, useEffect } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { AuthHeader } from '@/features/auth/components/Header'
import { AuthLayout } from '@/features/auth/components/Layout'
import { Login } from '@/features/auth/routes/Login'
import { Signup } from '@/features/auth/routes/Signup'
import { FavoriteFolders } from '@/features/favoriteFolder/routes/FavoriteFolders'
import { EditFolder } from '@/features/folder/routes/EditFolder'
import { FolderDetails } from '@/features/folder/routes/FolderDetails'
import { MyFolders } from '@/features/folder/routes/MyFolders'
import { EditLink } from '@/features/link/routes/EditLink'
import { MyLinks } from '@/features/link/routes/MyLink'
import { NewLink } from '@/features/link/routes/NewLink'
import { Home } from '@/features/misc/routes/Home'
import { NotFound } from '@/features/misc/routes/NotFound'
import { AuthGuard } from '@/routes/AuthGuard'
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
  }, [])

  const MainLayoutPage: FC = () => {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    )
  }

  const AuthPage: FC = () => {
    if (authenticated) return <Navigate to='/myfolders' replace={false} />

    return (
      <>
        <AuthHeader />
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </>
    )
  }

  return (
    <Routes>
      <Route element={<AuthPage />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route element={<MainLayoutPage />}>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/folder/:folderId' element={<FolderDetails />} />
        <Route path='/myfolders' element={<AuthGuard component={<MyFolders />} />} />
        <Route path='/favorite' element={<AuthGuard component={<FavoriteFolders />} />} />
        <Route path='/folder/:folderId/edit' element={<AuthGuard component={<EditFolder />} />} />
        <Route path='/new/link' element={<AuthGuard component={<NewLink />} />} />
        <Route
          path='/folder/:folderId/link/:linkId'
          element={<AuthGuard component={<EditLink />} />}
        />
        <Route path='/mylinks' element={<AuthGuard component={<MyLinks />} />} />
      </Route>
    </Routes>
  )
}
