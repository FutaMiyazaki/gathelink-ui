import MuiPagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { SortType } from '@/types/SortType'

type PaginationProps = {
  currentPage?: number
  totalPages?: number
  sortType: SortType
}

export const Pagination: FC<PaginationProps> = ({ currentPage = 1, totalPages, sortType }) => {
  if (totalPages === 1) return null

  return (
    <Stack justifyContent='center' sx={{ my: 5 }}>
      <MuiPagination
        page={currentPage}
        count={totalPages}
        color='primary'
        size='large'
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/mylinks?page=${item.page?.toString() as string}&sort=${sortType}`}
            {...item}
          />
        )}
        sx={{ mx: 'auto' }}
      />
    </Stack>
  )
}
