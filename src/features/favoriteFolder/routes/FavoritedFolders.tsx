import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { DisplayTypeMenu } from '@/components/Elements/Form/RadioGroup'
import { FoldersByCard } from '@/features/folder/components/FoldersByCard'
import { FoldersByList } from '@/features/folder/components/FoldersByList'
import { useFetchFavoritedFolders } from '@/features/folder/hooks/useFetchFavoritedFolders'
import { useMedia } from '@/hooks/useMedia'
import { favoritedFoldersState } from '@/states/FavoritedFoldersAtom'

export const FavoritedFolders: FC = () => {
  const favoritedFolders = useRecoilValue(favoritedFoldersState)
  const { errorMessage, fetchFavoritedFolders, isFeatching } = useFetchFavoritedFolders()
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
        <Typography variant='h1'>お気に入りフォルダ</Typography>
        <DisplayTypeMenu handleChange={handleChangeDisplay} displayFormat={displayFormat} />
      </Stack>
      {displayFormat === 'list' && (
        <FoldersByList
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
    fetchFavoritedFolders('old')
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
