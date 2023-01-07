import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Alert } from '@/components/Elements/Alert'
import { Pagination } from '@/components/Elements/Pagination'
import { DisplayTypeButtonGroup } from '@/components/features/DisplayTypeButtonGroup'
import { DisplayType } from '@/components/features/DisplayTypeButtonGroup/displayTypeItems'
import { SortSelect } from '@/components/features/SortSelect'
import { sortItems } from '@/components/features/SortSelect/sortItems'
import { NoContents } from '@/components/Layouts/NoContents'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { LinkCard } from '@/features/link/components/LinkCard'
import { LinkListItem } from '@/features/link/components/LinkListItem'
import { useFetchMyLinks } from '@/features/link/hooks/useFetchMyLinks'
import { Link as LinkType } from '@/features/link/types/Link'
import { SortType } from '@/types/SortType'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

export const MyLinks: FC = () => {
  const { errorMessage, fetchMyLinks, isFetching, myLinks, totalPages } = useFetchMyLinks()
  const [sortType, setSortType] = useState<SortType>('created_asc')
  const [displayType, setDisplayType] = useState<DisplayType>('list')
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangeSort = (e: SelectChangeEvent): void => {
    const newSortType = (e.target as HTMLInputElement).value as SortType
    setSortType(newSortType)
    setSearchParams({ page: '1', sort: newSortType })
  }

  useEffect(() => {
    fetchMyLinks(searchParams.get('page') as string, sortType)
  }, [searchParams, sortType])

  return (
    <Container maxWidth='md'>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h1'>全てのリンク</Typography>
        {myLinks !== undefined && myLinks.length > 0 && (
          <Stack direction='row' justifyContent='flex-end' alignItems='center' sx={{ mt: 3 }}>
            <SortSelect sort={sortType} selectItems={sortItems} handleChange={handleChangeSort} />
            <DisplayTypeButtonGroup displayType={displayType} setDisplayType={setDisplayType} />
          </Stack>
        )}
      </Box>
      <Alert message={errorMessage} />
      {isFetching ? (
        <PageLoading />
      ) : myLinks !== undefined && myLinks.length > 0 ? (
        <>
          {displayType === 'list' && (
            <List sx={{ ...whiteBackgroundProps, pl: 1, pr: 0, py: 2 }}>
              {myLinks?.map((link: LinkType) => {
                return (
                  <LinkListItem
                    key={link.id}
                    link={link}
                    folderId={link.folder_id.toString()}
                    isOwner={true}
                  />
                )
              })}
            </List>
          )}
          {displayType === 'card' && (
            <Grid container columns={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3}>
              {myLinks?.map((link: LinkType) => {
                return (
                  <Grid key={link.id} xs={1}>
                    <LinkCard link={link} folderId={link.folder_id.toString()} isOwner={true} />
                  </Grid>
                )
              })}
            </Grid>
          )}
          <Pagination
            currentPage={parseInt(searchParams.get('page') as string)}
            totalPages={totalPages}
            sortType={sortType}
          />
        </>
      ) : (
        <NoContents message='作成したリンクはありません' />
      )}
    </Container>
  )
}
