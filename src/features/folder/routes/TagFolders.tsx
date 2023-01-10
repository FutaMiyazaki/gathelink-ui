import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { Pagination } from '@/components/Elements/Pagination'
import { DisplayTypeButtonGroup } from '@/components/features/DisplayTypeButtonGroup'
import { DisplayType } from '@/components/features/DisplayTypeButtonGroup/displayTypeItems'
import { SortSelect } from '@/components/features/SortSelect'
import { sortItems } from '@/components/features/SortSelect/sortItems'
import { NoContents } from '@/components/Layouts/NoContents'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchTagFolders } from '@/features/folder/hooks/useFetchTagFolders'
import { RouterParams } from '@/types/RouterParams'
import { SortType } from '@/types/SortType'

export const TagFolders: FC = () => {
  const [sortType, setSortType] = useState<SortType>('created_asc')
  const [displayType, setDisplayType] = useState<DisplayType>('list')
  const [searchParams, setSearchParams] = useSearchParams()
  const { tagId } = useParams<RouterParams>()
  const noContentsMessage = '作成したフォルダはありません'
  const { isFetching, errorMessage, fetchTagFolders, tag, folders, totalPages } =
    useFetchTagFolders()

  const handleChangeSort = (e: SelectChangeEvent): void => {
    const newSortType = (e.target as HTMLInputElement).value as SortType
    setSortType(newSortType)
    setSearchParams({ page: '1', sort: newSortType })
  }

  useEffect(() => {
    tagId !== undefined && fetchTagFolders(tagId, searchParams.get('page') as string, sortType)
  }, [tagId, searchParams, sortType])

  return (
    <Container maxWidth='md'>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h1'>タグ「{tag}」のフォルダ</Typography>
        {folders !== undefined && folders.length > 0 && (
          <Stack direction='row' justifyContent='flex-end' alignItems='center' sx={{ mt: 3 }}>
            <SortSelect sort={sortType} selectItems={sortItems} handleChange={handleChangeSort} />
            <DisplayTypeButtonGroup displayType={displayType} setDisplayType={setDisplayType} />
          </Stack>
        )}
      </Box>
      {isFetching ? (
        <PageLoading />
      ) : folders !== undefined && folders.length > 0 ? (
        <>
          {displayType === 'list' && (
            <FoldersByList
              errorMessage={errorMessage}
              folders={folders}
              isLoading={isFetching}
              noContentsMessage={noContentsMessage}
            />
          )}
          {displayType === 'card' && (
            <FoldersByCard
              errorMessage={errorMessage}
              folders={folders}
              isLoading={isFetching}
              noContentsMessage={noContentsMessage}
            />
          )}
          <Pagination
            currentPage={parseInt(searchParams.get('page') as string)}
            totalPages={totalPages}
            sortType={sortType}
          />
        </>
      ) : (
        <NoContents message='該当タグのフォルダは存在しません' />
      )}
    </Container>
  )
}
