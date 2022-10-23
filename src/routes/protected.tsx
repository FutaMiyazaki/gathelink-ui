import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { FolderEdit } from '@/features/folder/routes/edit'
import { EditLink } from '@/features/link/routes/EditLink'

const Main: FC = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
)

export const protectedRoutes = [
  {
    element: <Main />,
    children: [
      {
        path: '/folder/:folderId/edit',
        element: <FolderEdit />,
      },
      {
        path: '/folder/:folderId/link/:linkId',
        element: <EditLink />,
      },
    ],
  },
]
