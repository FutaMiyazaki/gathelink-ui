import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/Elements/Button'
import { LinkButton } from '@/components/Elements/Button/LinkButton'
import { buttonItems } from '@/components/Layouts/LeadAuthorization/buttonItems'
import { useGuestLogin } from '@/features/auth/hooks/useGuestLogin'
import { isAuthenticatedState } from '@/states/AuthAtom'

export const LeadAuthorization: FC = () => {
  const { isLoading, guestLogin } = useGuestLogin()
  const authenticated = useRecoilValue(isAuthenticatedState)

  const handleClickGuestButton = (): void => {
    guestLogin()
  }

  if (authenticated) return null

  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 4,
        p: 3,
      }}
    >
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
        label='ゲストユーザーでログイン'
        onClick={handleClickGuestButton}
      />
    </Stack>
  )
}
