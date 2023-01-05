import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { DisplayTypeButtonGroup } from '@/components/features/DisplayTypeButtonGroup'
import { DisplayType } from '@/components/features/DisplayTypeButtonGroup/displayTypeItems'
import { SortSelect } from '@/components/features/SortSelect'
import { sortItems } from '@/components/features/SortSelect/sortItems'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchFavoriteFolders } from '@/features/folder/hooks/useFetchFavoriteFolders'
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
  const noContentsMessage = 'お気に入りフォルダはありません'

  const handleChangeSort = (e: SelectChangeEvent): void => {
    const newSortType = (e.target as HTMLInputElement).value as SortType
    setSortType(newSortType)
    setSearchParams({ sort: newSortType })
  }

  const renderContent = (
    <>
      <Box sx={{ mx: 1.5, mb: 3 }}>
        <Typography variant='h1'>お気に入りフォルダ</Typography>
        {favoriteFolders !== undefined && favoriteFolders.length > 0 && (
          <Stack direction='row' justifyContent='flex-end' alignItems='center'>
            <SortSelect sort={sortType} selectItems={sortItems} handleChange={handleChangeSort} />
            <DisplayTypeButtonGroup displayType={displayType} setDisplayType={setDisplayType} />
          </Stack>
        )}
      </Box>
      {displayType === 'list' && (
        <FoldersByList
          errorMessage={errorMessage}
          folders={favoriteFolders}
          isLoading={isFetching}
          noContentsMessage={noContentsMessage}
        />
      )}
      {displayType === 'card' && (
        <FoldersByCard
          errorMessage={errorMessage}
          folders={favoriteFolders}
          isLoading={isFetching}
          noContentsMessage={noContentsMessage}
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
