import { useMediaQuery } from '@mui/material'

type UseMedia = {
  isDesktopScreen: boolean
  isMobileScreen: boolean
}

export const useMedia = (): UseMedia => {
  const isDesktopScreen = useMediaQuery('(min-width:900px)')
  const isMobileScreen = useMediaQuery('(max-width:900px)')

  return { isDesktopScreen, isMobileScreen }
}
