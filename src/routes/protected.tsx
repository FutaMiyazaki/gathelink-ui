import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { FavoritedFolders } from '@/features/favoriteFolder/routes/FavoritedFolders'
import { EditFolder } from '@/features/folder/routes/EditFolder'
import { MyFolders } from '@/features/folder/routes/MyFolders'
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
        element: <MyFolders />,
      },
      {
        path: '/favorited',
        element: <FavoritedFolders />,
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
