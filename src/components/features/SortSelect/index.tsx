import FormControl from '@mui/material/FormControl'
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
    <FormControl size='small' sx={{ mr: 1 }}>
      <Select native value={sort} onChange={handleChange} sx={{ borderRadius: 5 }}>
        {selectItems.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </Select>
    </FormControl>
  )
}
