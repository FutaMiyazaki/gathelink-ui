import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Alert } from '@/components/Elements/Alert'
import { RadioGroup } from '@/components/Elements/Form/RadioGroup'
import { Pagination } from '@/components/Elements/Pagination'
import { DisplayTypeButtonGroup } from '@/components/features/DisplayTypeButtonGroup'
import { DisplayType } from '@/components/features/DisplayTypeButtonGroup/displayTypeItems'
import { PageLoading } from '@/components/Layouts/PageLoading'
import { folderSortItems } from '@/features/folder/utils/folderSortItems'
import { LinkCard } from '@/features/link/components/LinkCard'
import { LinkListItem } from '@/features/link/components/LinkListItem'
import { useFetchMyLinks } from '@/features/link/hooks/useFetchMyLinks'
import { Link as LinkType } from '@/features/link/types/Link'
import { useMedia } from '@/hooks/useMedia'
import { SortType } from '@/types/SortType'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

export const MyLinks: FC = () => {
  const { errorMessage, fetchMyLinks, isFetching, myLinks, totalPages } = useFetchMyLinks()
  const [sortType, setSortType] = useState<SortType>('created_asc')
  const [displayType, setDisplayType] = useState<DisplayType>('list')
  const [searchParams, setSearchParams] = useSearchParams()
  const { isMobileScreen } = useMedia()
  const noContentsText = '作成したリンクはありません'

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>): void => {
    const newSortType = (e.target as HTMLInputElement).value as SortType
    setSortType(newSortType)
    setSearchParams({ page: '1', sort: newSortType })
  }

  const renderContent = (
    <>
      <Box sx={{ mx: 1.5, mb: 3 }}>
        <Typography variant='h1'>全てのリンク</Typography>
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
      {isFetching ? (
        <PageLoading />
      ) : (
        <>
          <Alert message={errorMessage} />
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
      )}
    </>
  )

  useEffect(() => {
    fetchMyLinks(searchParams.get('page') as string, sortType)
  }, [searchParams, sortType])

  if (isMobileScreen) return <>{renderContent}</>

  return <Container maxWidth='md'>{renderContent}</Container>
}
