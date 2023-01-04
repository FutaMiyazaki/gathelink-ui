import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FC } from 'react'

import { SortType } from '@/types/SortType'

type SortSelectProps = {
  sort: SortType
  selectItems: Array<{ value: SortType; icon: JSX.Element; label: string }>
  handleChange: (e: SelectChangeEvent) => void
}

export const SortSelect: FC<SortSelectProps> = ({ sort, selectItems, handleChange }) => {
  return (
    <>
      <FormControl size='small' sx={{ mr: 1 }}>
        <Select value={sort} onChange={handleChange} sx={{ borderRadius: 5 }}>
          {selectItems.map((item) => {
            return (
              <MenuItem key={item.value} dense divider value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </>
  )
}
