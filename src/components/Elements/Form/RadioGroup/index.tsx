import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Menu from '@mui/material/Menu'
import Radio from '@mui/material/Radio'
import MuiRadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, MouseEvent, useState } from 'react'

import { Button } from '@/components/Elements/Button'

const displayFormatItems = [
  { value: 'list', icon: <ListIcon fontSize='small' />, label: 'リスト' },
  { value: 'card', icon: <GridViewIcon fontSize='small' />, label: 'カード' },
]

type DisplayTypeMenuProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  displayFormat: string
}

export const DisplayTypeMenu: FC<DisplayTypeMenuProps> = ({ handleChange, displayFormat }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <>
      <Button
        icon={displayFormat === 'list' ? <ListIcon /> : <GridViewIcon />}
        label='表示'
        onClick={handleOpenMenu}
        variant='text'
        sx={{ color: 'secondary.dark' }}
      />
      <Menu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} open={open} sx={{ mt: 1 }}>
        <FormControl sx={{ px: 2 }}>
          <MuiRadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={displayFormat}
            onChange={handleChange}
          >
            {displayFormatItems.map((item) => {
              return (
                <FormControlLabel
                  key={item.label}
                  value={item.value}
                  control={<Radio size='small' />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                      <Typography component='span' variant='body2' sx={{ ml: 0.5 }}>
                        {item.label}
                      </Typography>
                    </Box>
                  }
                />
              )
            })}
          </MuiRadioGroup>
        </FormControl>
      </Menu>
    </>
  )
}
