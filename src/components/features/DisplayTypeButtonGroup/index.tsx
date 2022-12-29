import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Dispatch, FC, SetStateAction } from 'react'

import {
  displayTypeItems,
  DisplayTypeItem,
  DisplayType,
} from '@/components/features/DisplayTypeButtonGroup/displayTypeItems'

type DisplayTypeButtonGroupProps = {
  displayType: DisplayType
  setDisplayType: Dispatch<SetStateAction<DisplayType>>
}

export const DisplayTypeButtonGroup: FC<DisplayTypeButtonGroupProps> = ({
  displayType,
  setDisplayType,
}) => (
  <>
    {displayTypeItems.map((item: DisplayTypeItem) => {
      return (
        <Tooltip
          key={item.value}
          arrow
          title={
            <Typography component='span' variant='subtitle2'>
              {item.label}
            </Typography>
          }
        >
          <IconButton
            onClick={() => setDisplayType(item.value)}
            color={displayType === item.value ? 'primary' : 'default'}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      )
    })}
  </>
)
