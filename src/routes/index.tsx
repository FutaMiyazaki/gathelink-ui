import { FC } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { AuthHeader } from '@/features/auth/components/Header'
import { AuthLayout } from '@/features/auth/components/Layout'
import { Login } from '@/features/auth/routes/Login'
import { Signup } from '@/features/auth/routes/Signup'
import { Home } from '@/features/misc/routes/Home'

export const AppRoutes: FC = () => {
  const Main: FC = () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )

  const Auth: FC = () => (
    <>
      <AuthHeader />
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </>
  )

  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<Auth />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>
    </Routes>
  )
}
