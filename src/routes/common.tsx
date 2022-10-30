import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { FolderDetails } from '@/features/folder/routes/FolderDetails'
import { Home } from '@/features/misc/routes/Home'
import { NotFound } from '@/features/misc/routes/NotFound'

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
      {
        path: '/folder/:folderId',
        element: <FolderDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
