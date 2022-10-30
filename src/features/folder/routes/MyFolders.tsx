import SortIcon from '@mui/icons-material/Sort'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { FoldersListForMobile } from '@/features/folder/components/FoldersListForMobile'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { FoldersSortType } from '@/features/folder/types/FoldersSortType'
import { useMedia } from '@/hooks/useMedia'
import { myFoldersState } from '@/states/MyFoldersAtom'

export const MyFolders: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { errorMessage, fetchMyFolders, isFeatching } = useFetchMyFolders()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { isDesktopScreen } = useMedia()

  const handleChangeSort = (sortType: FoldersSortType): void => {
    fetchMyFolders(sortType)
    setAnchorEl(null)
  }

  const handleOpenSortMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  const sortMenuItems: MenuItems = [
    { onClick: () => handleChangeSort('old'), text: '作成日時が古い順' },
    { onClick: () => handleChangeSort('latest'), text: '作成日時が新しい順' },
  ]

  useEffect(() => {
    fetchMyFolders('old')
  }, [])

  if (isDesktopScreen) return null

  return (
    <Box>
      <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ px: 1.5 }}>
        <PageHeading text='マイフォルダ' />
        <IconButton onClick={handleOpenSortMenu}>
          <SortIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          handleCloseMenu={() => setAnchorEl(null)}
          menuItems={sortMenuItems}
        />
      </Stack>
      <FoldersListForMobile
        errorMessage={errorMessage}
        folders={myFolders}
        isLoading={isFeatching}
        noContentsText='作成したフォルダはありません'
      />
    </Box>
  )
}
