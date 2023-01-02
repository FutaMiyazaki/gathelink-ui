import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { RadioGroup } from '@/components/Elements/Form/RadioGroup'
import { DisplayTypeButtonGroup } from '@/components/features/DisplayTypeButtonGroup'
import { DisplayType } from '@/components/features/DisplayTypeButtonGroup/displayTypeItems'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchFavoriteFolders } from '@/features/folder/hooks/useFetchFavoriteFolders'
import { folderSortItems } from '@/features/folder/utils/folderSortItems'
import { useMedia } from '@/hooks/useMedia'
import { favoriteFoldersState } from '@/states/FavoriteFolders'
import { SortType } from '@/types/SortType'

export const FavoriteFolders: FC = () => {
  const favoriteFolders = useRecoilValue(favoriteFoldersState)
  const { errorMessage, fetchFavoriteFolders, isFetching } = useFetchFavoriteFolders()
  const [sortType, setSortType] = useState<SortType>('created_asc')
  const [displayType, setDisplayType] = useState<DisplayType>('list')
  const [searchParams, setSearchParams] = useSearchParams()
  const { isMobileScreen } = useMedia()
  const noContentsText = 'お気に入りフォルダはありません'

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>): void => {
    const newSortType = (e.target as HTMLInputElement).value as SortType
    setSortType(newSortType)
    setSearchParams({ sort: newSortType })
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
          <DisplayTypeButtonGroup displayType={displayType} setDisplayType={setDisplayType} />
        </Stack>
      </Box>
      {displayType === 'list' && (
        <FoldersByList
          errorMessage={errorMessage}
          folders={favoriteFolders}
          isLoading={isFetching}
          noContentsText={noContentsText}
        />
      )}
      {displayType === 'card' && (
        <FoldersByCard
          errorMessage={errorMessage}
          folders={favoriteFolders}
          isLoading={isFetching}
          noContentsText={noContentsText}
        />
      )}
    </>
  )

  useEffect(() => {
    fetchFavoriteFolders(sortType)
  }, [sortType])

  if (isMobileScreen) return <>{renderContent}</>

  return <Container maxWidth='md'>{renderContent}</Container>
}
