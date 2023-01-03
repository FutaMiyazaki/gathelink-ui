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
import { PageLoading } from '@/components/Layouts/PageLoading'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { folderSortItems } from '@/features/folder/utils/folderSortItems'
import { useMedia } from '@/hooks/useMedia'
import { myFoldersState } from '@/states/MyFoldersAtom'
import { SortType } from '@/types/SortType'

export const MyFolders: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { isFetching, errorMessage, fetchMyFolders } = useFetchMyFolders()
  const [sortType, setSortType] = useState<SortType>('created_asc')
  const [displayType, setDisplayType] = useState<DisplayType>('list')
  const [searchParams, setSearchParams] = useSearchParams()
  const { isMobileScreen } = useMedia()
  const noContentsMessage = '作成したフォルダはありません'

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>): void => {
    const newSortType = (e.target as HTMLInputElement).value as SortType
    setSortType(newSortType)
    setSearchParams({ sort: newSortType })
  }

  const renderContent = (
    <>
      <Box sx={{ mx: 1.5, mb: 3 }}>
        <Typography variant='h1'>マイフォルダ</Typography>
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
    </>
  )

  useEffect(() => {
    fetchMyFolders(sortType)
  }, [sortType])

  if (isMobileScreen) return <>{renderContent}</>

  return <Container maxWidth='md'>{renderContent}</Container>
}
