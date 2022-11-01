import { Container } from '@mui/material'
import Stack from '@mui/material/Stack'
import { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { PageHeading } from '@/components/Elements/Heading/PageHeading'
import { FoldersListForMobile } from '@/features/folder/components/FoldersListForMobile'
import { useFetchFavoritedFolders } from '@/features/folder/hooks/useFetchFavoritedFolders'
import { useMedia } from '@/hooks/useMedia'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'

export const FavoritedFolders: FC = () => {
  const favoritedFolders = useRecoilValue(favoritedFoldersState)
  const { errorMessage, fetchFetchFavoritedFolders, isFeatching } = useFetchFavoritedFolders()
  const { isDesktopScreen } = useMedia()

  const renderContent = (
    <>
      <Stack alignItems='center' direction='row' sx={{ px: 1.5 }}>
        <PageHeading text='お気に入りフォルダ' />
      </Stack>
      <FoldersListForMobile
        errorMessage={errorMessage}
        folders={favoritedFolders}
        isLoading={isFeatching}
        noContentsText='お気に入りフォルダはありません'
      />
    </>
  )

  useEffect(() => {
    fetchFetchFavoritedFolders('old')
  }, [])

  return (
    <>
      {isDesktopScreen ? (
        <Container maxWidth='sm'>{renderContent}</Container>
      ) : (
        <>{renderContent}</>
      )}
    </>
  )
}
