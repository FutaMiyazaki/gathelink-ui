import SortIcon from '@mui/icons-material/Sort'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { FoldersList } from '@/features/folder/components/FoldersList'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { FoldersSortType } from '@/features/folder/types/FoldersSortType'
import { myFoldersState } from '@/states/MyFoldersAtom'

export const MyFoldersList: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { errorMessage, fetchMyFolders, isFeatching } = useFetchMyFolders()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleChangeSort = (sortType: FoldersSortType): void => {
    fetchMyFolders(sortType)
    setAnchorEl(null)
  }

  const handleCloseMenu = (): void => setAnchorEl(null)

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

  return (
    <Box>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        sx={{ pl: 2, pr: 1 }}
      >
        <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold' }}>
          マイフォルダ
        </Typography>
        <IconButton onClick={handleOpenSortMenu}>
          <SortIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} menuItems={sortMenuItems} />
      </Stack>
      <FoldersList
        errorMessage={errorMessage}
        folders={myFolders}
        isLoading={isFeatching}
        noContentsText='作成したフォルダはありません'
      />
    </Box>
  )
}
