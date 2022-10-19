import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { AuthHeader } from '@/features/auth/components/Header'
import { AuthLayout } from '@/features/auth/components/Layout'
import { Login } from '@/features/auth/routes/Login'
import { Signup } from '@/features/auth/routes/Signup'

const Auth: FC = () => (
  <>
    <AuthHeader />
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  </>
)

export const publicRoutes = [
  {
    element: <Auth />,
    children: [
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
    ],
  },
]
