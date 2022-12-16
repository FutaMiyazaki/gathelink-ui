import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { RadioGroup } from '@/components/Elements/Form/RadioGroup'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchFavoritedFolders } from '@/features/folder/hooks/useFetchFavoritedFolders'
import { folderSortItems } from '@/features/folder/utils/folderSortItems'
import { useMedia } from '@/hooks/useMedia'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'
import { displayFormatItems } from '@/utils/displayFormatItems'

export const FavoritedFolders: FC = () => {
  const favoritedFolders = useRecoilValue(favoritedFoldersState)
  const { errorMessage, fetchFavoritedFolders, isFeatching } = useFetchFavoritedFolders()
  const [sortType, setSortType] = useState('created_asc')
  const [displayFormat, setDisplayFormat] = useState('list')
  const { isMobileScreen } = useMedia()
  const noContentsText = 'お気に入りフォルダはありません'

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>): void => {
    setSortType((e.target as HTMLInputElement).value)
  }

  const handleChangeDisplay = (e: ChangeEvent<HTMLInputElement>): void => {
    setDisplayFormat((e.target as HTMLInputElement).value)
  }

  const renderContent = (
    <>
      <Box sx={{ mx: 1.5, mb: 3 }}>
        <Typography variant='h1'>お気に入りフォルダ</Typography>
        <Stack direction='row' justifyContent='flex-end'>
          <RadioGroup
            buttonLabel='並び順'
            handleChange={handleChangeSort}
            radioGroupItems={folderSortItems}
            value={sortType}
          />
          <RadioGroup
            buttonLabel='表示形式'
            handleChange={handleChangeDisplay}
            radioGroupItems={displayFormatItems}
            value={displayFormat}
          />
        </Stack>
      </Box>
      {displayFormat === 'list' && (
        <FoldersByList
          errorMessage={errorMessage}
          folders={favoritedFolders}
          isLoading={isFeatching}
          noContentsText={noContentsText}
        />
      )}
      {displayFormat === 'card' && (
        <FoldersByCard
          errorMessage={errorMessage}
          folders={favoritedFolders}
          isLoading={isFeatching}
          noContentsText={noContentsText}
        />
      )}
    </>
  )

  useEffect(() => {
    fetchFavoritedFolders(sortType)
  }, [sortType])

  if (isMobileScreen) return <>{renderContent}</>

  return <Container maxWidth='md'>{renderContent}</Container>
}
