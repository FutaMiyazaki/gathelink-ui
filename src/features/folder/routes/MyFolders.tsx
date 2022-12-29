import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { RadioGroup } from '@/components/Elements/Form/RadioGroup'
import { DisplayTypeButtonGroup } from '@/components/features/DisplayTypeButtonGroup'
import { DisplayType } from '@/components/features/DisplayTypeButtonGroup/displayTypeItems'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { folderSortItems } from '@/features/folder/utils/folderSortItems'
import { useMedia } from '@/hooks/useMedia'
import { myFoldersState } from '@/states/MyFoldersAtom'

export const MyFolders: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { errorMessage, fetchMyFolders, isFetching } = useFetchMyFolders()
  const [sortType, setSortType] = useState('created_asc')
  const [displayType, setDisplayType] = useState<DisplayType>('list')
  const { isMobileScreen } = useMedia()
  const noContentsText = '作成したフォルダはありません'

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>): void => {
    setSortType((e.target as HTMLInputElement).value)
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
      {displayType === 'list' && (
        <FoldersByList
          errorMessage={errorMessage}
          folders={myFolders}
          isLoading={isFetching}
          noContentsText={noContentsText}
        />
      )}
      {displayType === 'card' && (
        <FoldersByCard
          errorMessage={errorMessage}
          folders={myFolders}
          isLoading={isFetching}
          noContentsText={noContentsText}
        />
      )}
    </>
  )

  useEffect(() => {
    fetchMyFolders(sortType)
  }, [sortType])

  if (isMobileScreen) return <>{renderContent}</>

  return <Container maxWidth='md'>{renderContent}</Container>
}
