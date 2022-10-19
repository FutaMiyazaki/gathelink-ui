import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { FolderAbout } from '@/features/folder/routes/about'
import { Home } from '@/features/misc/routes/Home'

const Main: FC = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
)

export const commonRoutes = [
  {
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/folder', element: <FolderAbout /> },
    ],
  },
]
