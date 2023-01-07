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
import { PageLoading } from '@/components/Layouts/PageLoading'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { SortType } from '@/types/SortType'

export const MyFolders: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { isFetching, errorMessage, fetchMyFolders } = useFetchMyFolders()
  const [sortType, setSortType] = useState<SortType>('created_asc')
  const [displayType, setDisplayType] = useState<DisplayType>('list')
  const [searchParams, setSearchParams] = useSearchParams()
  const noContentsMessage = '作成したフォルダはありません'

  const handleChangeSort = (e: SelectChangeEvent): void => {
    const newSortType = (e.target as HTMLInputElement).value as SortType
    setSortType(newSortType)
    setSearchParams({ sort: newSortType })
  }

  useEffect(() => {
    fetchMyFolders(sortType)
  }, [sortType])

  return (
    <Container maxWidth='md'>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h1'>マイフォルダ</Typography>
        {myFolders !== undefined && myFolders.length > 0 && (
          <Stack direction='row' justifyContent='flex-end' alignItems='center' sx={{ mt: 3 }}>
            <SortSelect sort={sortType} selectItems={sortItems} handleChange={handleChangeSort} />
            <DisplayTypeButtonGroup displayType={displayType} setDisplayType={setDisplayType} />
          </Stack>
        )}
      </Box>
      {isFetching ? (
        <PageLoading />
      ) : (
        <>
          {displayType === 'list' && (
            <FoldersByList
              errorMessage={errorMessage}
              folders={myFolders}
              isLoading={isFetching}
              noContentsMessage={noContentsMessage}
            />
          )}
          {displayType === 'card' && (
            <FoldersByCard
              errorMessage={errorMessage}
              folders={myFolders}
              isLoading={isFetching}
              noContentsMessage={noContentsMessage}
            />
          )}
        </>
      )}
    </Container>
  )
}
