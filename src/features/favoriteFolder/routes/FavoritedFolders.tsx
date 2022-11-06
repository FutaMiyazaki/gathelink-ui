import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { DisplayTypeMenu } from '@/components/Elements/Form/RadioGroup'
import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersListForMobile } from '@/features/folder/components/FoldersListForMobile'
import { useFetchFavoritedFolders } from '@/features/folder/hooks/useFetchFavoritedFolders'
import { useMedia } from '@/hooks/useMedia'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'

export const FavoritedFolders: FC = () => {
  const favoritedFolders = useRecoilValue(favoritedFoldersState)
  const { errorMessage, fetchFetchFavoritedFolders, isFeatching } = useFetchFavoritedFolders()
  const [displayFormat, setDisplayFormat] = useState('list')
  const { isDesktopScreen } = useMedia()

  const noContentsText = 'お気に入りフォルダはありません'

  const handleChangeDisplay = (e: ChangeEvent<HTMLInputElement>): void => {
    setDisplayFormat((e.target as HTMLInputElement).value)
  }

  const renderContent = (
    <>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        sx={{ mb: 3, px: 1.5 }}
      >
        <PageHeading text='お気に入りフォルダ' />
        <DisplayTypeMenu handleChange={handleChangeDisplay} displayFormat={displayFormat} />
      </Stack>
      {displayFormat === 'list' && (
        <FoldersListForMobile
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
    fetchFetchFavoritedFolders('old')
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
