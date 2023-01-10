import SellRoundedIcon from '@mui/icons-material/SellRounded'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Tag } from '@/features/folder/types/Tag'

type TagListProps = {
  tags?: Tag[]
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  if (tags === undefined || tags.length === 0) return null

  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <SellRoundedIcon sx={{ ml: 0.5, color: 'secondary.dark' }} />
      {tags.map((tag) => {
        return (
          <Chip
            key={tag.id}
            label={tag.name}
            variant='outlined'
            clickable
            component={Link}
            to={`/tag/${tag.id}?page=1&sort=created_asc`}
          />
        )
      })}
    </Stack>
  )
}
