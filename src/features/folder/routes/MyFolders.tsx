import SortIcon from '@mui/icons-material/Sort'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { DisplayTypeMenu } from '@/components/Elements/Form/RadioGroup'
import { Menu } from '@/components/Elements/Menu'
import { MenuItems } from '@/components/Elements/Menu/MenuItems'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { FoldersSortType } from '@/features/folder/types/FoldersSortType'
import { useMedia } from '@/hooks/useMedia'
import { myFoldersState } from '@/states/MyFoldersAtom'

export const MyFolders: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { errorMessage, fetchMyFolders, isFeatching } = useFetchMyFolders()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [displayFormat, setDisplayFormat] = useState('list')
  const { isDesktopScreen } = useMedia()
  const noContentsText = '作成したフォルダはありません'

  const handleChangeDisplay = (e: ChangeEvent<HTMLInputElement>): void => {
    setDisplayFormat((e.target as HTMLInputElement).value)
  }

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

  const renderContent = (
    <>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        sx={{ mb: 3, px: 1 }}
      >
        <Typography variant='h1'>マイフォルダ</Typography>
        <Box>
          <DisplayTypeMenu handleChange={handleChangeDisplay} displayFormat={displayFormat} />
          <Button
            onClick={handleOpenSortMenu}
            icon={<SortIcon />}
            label='並び順'
            variant='text'
            sx={{ color: 'secondary.dark', ml: 0.5 }}
          />
          <Menu
            anchorEl={anchorEl}
            handleCloseMenu={() => setAnchorEl(null)}
            menuItems={sortMenuItems}
          />
        </Box>
      </Stack>
      {displayFormat === 'list' && (
        <FoldersByList
          errorMessage={errorMessage}
          folders={myFolders}
          isLoading={isFeatching}
          noContentsText={noContentsText}
        />
      )}
      {displayFormat === 'card' && (
        <FoldersByCard
          errorMessage={errorMessage}
          folders={myFolders}
          isLoading={isFeatching}
          noContentsText={noContentsText}
        />
      )}
    </>
  )

  useEffect(() => {
    fetchMyFolders('old')
  }, [])

  return (
    <>
      {isDesktopScreen ? (
        <Container maxWidth='md'>{renderContent}</Container>
      ) : (
        <>{renderContent}</>
      )}
    </>
  )
}
