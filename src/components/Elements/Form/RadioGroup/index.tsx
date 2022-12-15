import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Menu from '@mui/material/Menu'
import Radio from '@mui/material/Radio'
import MuiRadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, MouseEvent, useState } from 'react'

import { Button } from '@/components/Elements/Button'

type RadioGroupProps = {
  buttonLabel: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  radioGroupItems: Array<{ value: string; icon: JSX.Element; label: string }>
  value: string
}

export const RadioGroup: FC<RadioGroupProps> = ({
  buttonLabel,
  handleChange,
  radioGroupItems,
  value,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <>
      <Button
        label={buttonLabel}
        onClick={handleOpenMenu}
        variant='text'
        sx={{ color: 'secondary.dark' }}
      />
      <Menu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} open={open} sx={{ mt: 1 }}>
        <FormControl sx={{ px: 2 }}>
          <MuiRadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={value}
            onChange={handleChange}
          >
            {radioGroupItems.map((item) => {
              return (
                <FormControlLabel
                  key={item.label}
                  onClick={() => setAnchorEl(null)}
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
