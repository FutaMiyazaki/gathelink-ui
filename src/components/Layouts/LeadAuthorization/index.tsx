import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { buttonItems } from '@/components/Layouts/LeadAuthorization/buttonItems'
import { useGuestLogin } from '@/features/auth/hooks/useGuestLogin'
import { isAuthenticatedState } from '@/states/AuthAtom'
import { whiteBackgroundProps } from '@/utils/mui/whiteBackgroundProps'

export const LeadAuthorization: FC = () => {
  const { isLoading, guestLogin } = useGuestLogin()
  const isAuthenticated = useRecoilValue(isAuthenticatedState)

  const handleClickGuestButton = (): void => {
    guestLogin()
  }

  if (isAuthenticated) return null

  return (
    <Stack direction='column' spacing={2} sx={{ ...whiteBackgroundProps }}>
      <Typography variant='body2'>
        新規登録・ログインをすると便利に Gathelink を使うことができます！
      </Typography>
      {buttonItems.map((item) => (
        <LinkButton
          key={item.label}
          fullWidth={true}
          label={item.label}
          path={item.path}
          variant={item.variant}
        />
      ))}
      <Button
        color='secondary'
        fullWidth={true}
        isLoading={isLoading}
        disabled={isLoading}
        label='ゲストユーザーでログイン'
        onClick={handleClickGuestButton}
      />
    </Stack>
  )
}
