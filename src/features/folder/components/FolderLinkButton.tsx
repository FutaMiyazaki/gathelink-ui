import { Button } from '@mui/material'
import { FC } from 'react'

type FolderLinkButtonProps = {
  label: string
  url: string
}

export const FolderLinkButton: FC<FolderLinkButtonProps> = ({ label, url }) => {
  return (
    <Button
      disableElevation
      fullWidth
      href={url}
      target='_blank'
      variant='outlined'
      sx={{
        borderRadius: 5,
        fontWeight: 'bold',
        '&:hover': {
          color: 'white',
          backgroundColor: 'primary.main',
        },
      }}
    >
      {label}
    </Button>
  )
}
