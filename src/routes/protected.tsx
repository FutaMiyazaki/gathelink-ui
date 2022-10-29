import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { EditFolder } from '@/features/folder/routes/EditFolder'
import { MyFoldersList } from '@/features/folder/routes/MyFoldersList'
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
        path: '/myfolders',
        element: <MyFoldersList />,
      },
      {
        path: '/folder/:folderId/edit',
        element: <EditFolder />,
      },
      {
        path: '/folder/:folderId/link/:linkId',
        element: <EditLink />,
      },
    ],
  },
]
