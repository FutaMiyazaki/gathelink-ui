import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { FoldersList } from '@/features/folder/components/Sidebar/FoldersList'
import { useFetchMyFolders } from '@/features/folder/hooks/useFetchMyFolders'
import { myFoldersState } from '@/states/MyFoldersAtom'

export const MyFoldersList: FC = () => {
  const myFolders = useRecoilValue(myFoldersState)
  const { errorMessage, fetchMyFolders, isFeatching } = useFetchMyFolders()

  useEffect(() => {
    fetchMyFolders('created_asc')
  }, [])

  return (
    <Box>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        sx={{ pl: 2, pr: 1 }}
      >
        <Typography variant='subtitle1' color='secondary.dark' sx={{ fontWeight: 'bold' }}>
          マイフォルダ
        </Typography>
      </Stack>
      <FoldersList
        errorMessage={errorMessage}
        folders={myFolders}
        isLoading={isFeatching}
        noContentsText='作成したフォルダはありません'
      />
    </Box>
  )
}
